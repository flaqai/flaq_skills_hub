"""Read Flaq public pages without credentials; extract model specs, links and examples.

Run in the skill directory:
  python3 scripts/read_page.py 'https://flaq.ai/model-market/'
  python3 scripts/read_page.py 'DETAIL_PAGE_URL' --text-limit 30000
  python3 scripts/read_page.py 'DOCS_URL_WITH_PAGE_QUERY' --text-limit 60000
Requires requests. URLs must come from Flaq navigation; do not guess model slugs.
"""
import argparse
import json
import sys
from html.parser import HTMLParser
from urllib.parse import urljoin, urlsplit, urldefrag

from common import SkillError, https_url, run, session

HOSTS = {'flaq.ai', 'www.flaq.ai'}


class PageParser(HTMLParser):
    def __init__(self, url):
        super().__init__(convert_charrefs=True)
        self.url = url
        self.parts, self.links, self.code_blocks = [], [], []
        self.spec_chunks = []
        self.in_script = False
        self.spec_script = False
        self.ignore = 0
        self.anchor = None
        self.pre = None
        self.public_spec = None
        self.spec_error = False

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == 'script':
            self.in_script = True
            self.spec_script = attrs.get('id') == 'flaq-model-public-spec' and attrs.get('type') == 'application/json'
        if tag in ('style', 'noscript'):
            self.ignore += 1
        if self.in_script or self.ignore:
            return
        if tag == 'a':
            self.anchor = {'url': urldefrag(urljoin(self.url, attrs.get('href', '')))[0], 'text': ''}
        if tag == 'pre':
            self.pre = []
        if tag in ('p', 'div', 'li', 'tr', 'h1', 'h2', 'h3', 'pre', 'br'):
            self.parts.append('\n')
        if tag in ('td', 'th'):
            self.parts.append(' | ')

    def handle_endtag(self, tag):
        if tag == 'script':
            if self.spec_script:
                try:
                    value = json.loads(''.join(self.spec_chunks))
                    if not isinstance(value, dict):
                        raise ValueError('Not an object')
                    self.public_spec = value
                except ValueError:
                    self.spec_error = True
            self.in_script = self.spec_script = False
            return
        if tag in ('style', 'noscript'):
            self.ignore = max(0, self.ignore - 1)
        if self.in_script or self.ignore:
            return
        if tag == 'a' and self.anchor:
            parsed = urlsplit(self.anchor['url'])
            if parsed.scheme == 'https' and parsed.hostname in HOSTS:
                self.anchor['text'] = ' '.join(self.anchor['text'].split())
                self.links.append(self.anchor)
            self.anchor = None
        if tag == 'pre' and self.pre is not None:
            self.code_blocks.append(''.join(self.pre))
            self.pre = None
        if tag in ('p', 'div', 'li', 'tr', 'h1', 'h2', 'h3', 'pre'):
            self.parts.append('\n')

    def handle_data(self, data):
        if self.spec_script:
            self.spec_chunks.append(data)
        if self.in_script or self.ignore:
            return
        self.parts.append(data)
        if self.anchor is not None:
            self.anchor['text'] += data
        if self.pre is not None:
            self.pre.append(data)

    def result(self, limit):
        text = '\n'.join(line.strip() for line in ''.join(self.parts).splitlines() if line.strip())
        unique = {link['url']: link for link in self.links}
        links = list(unique.values())
        return {'url': self.url, 'public_spec': self.public_spec,
                'public_spec_parse_error': self.spec_error,
                'model_links': [link for link in links if '/models/' in urlsplit(link['url']).path],
                'docs_links': [link for link in links if '/docs' in urlsplit(link['url']).path],
                'links': links, 'code_blocks': self.code_blocks,
                'text': text[:limit], 'text_truncated': len(text) > limit,
                'notice': 'One retrieved page only. Check pagination, availability and matching Docs; links are not a verified available-model list.'}


def fetch_page(url, client):
    for _ in range(6):
        https_url(url, HOSTS)
        try:
            with client.get(url, allow_redirects=False, timeout=(15, 45), stream=True) as response:
                if response.status_code in (301, 302, 303, 307, 308):
                    location = response.headers.get('Location')
                    if not location:
                        raise SkillError('INVALID_REDIRECT', 'Public page returned a redirect without a destination.')
                    url = urljoin(url, location)
                    continue
                if response.status_code != 200:
                    raise SkillError('PAGE_HTTP_ERROR', 'Could not read the public page. Use the host browser to inspect access requirements.', http_status=response.status_code)
                if 'text/html' not in response.headers.get('Content-Type', ''):
                    raise SkillError('NOT_HTML', 'The URL did not return an HTML page.')
                chunks, size = [], 0
                for chunk in response.iter_content(65536):
                    size += len(chunk)
                    if size > 8 * 1024 * 1024:
                        raise SkillError('PAGE_TOO_LARGE', 'Page exceeds the 8 MiB read limit; inspect it in the host browser.')
                    chunks.append(chunk)
                return url, b''.join(chunks).decode('utf-8', errors='replace')
        except SkillError:
            raise
        except Exception:
            raise SkillError('PAGE_NETWORK_ERROR', 'Page fetch failed. Check network access or use the host browser; no credentials were sent.') from None
    raise SkillError('TOO_MANY_REDIRECTS', 'Public page exceeded the redirect limit.')


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('url')
    parser.add_argument('--text-limit', type=int, default=30000)
    args = parser.parse_args()
    if args.text_limit < 1:
        raise SkillError('INVALID_LIMIT', 'text-limit must be positive.')
    with session() as client:
        url, html = fetch_page(args.url, client)
    page = PageParser(url)
    page.feed(html)
    return page.result(args.text_limit)


if __name__ == '__main__':
    sys.exit(run(main))
