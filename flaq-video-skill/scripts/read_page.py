"""Read Flaq public pages without credentials; extract model specs, links and examples.

Run in the skill directory:
  python3 scripts/read_page.py 'https://flaq.ai/model-market/'
  python3 scripts/read_page.py 'DETAIL_PAGE_URL' --text-limit 30000
  python3 scripts/read_page.py 'DOCS_URL_WITH_PAGE_QUERY' --text-limit 60000
  python3 scripts/read_page.py 'DOCS_URL_WITH_PAGE_QUERY' --docs-json
  python3 scripts/read_page.py --market --media-type video --page-num 1 --page-size 20
  python3 scripts/read_page.py --market --media-type video --provider bytedance
Requires requests. URLs must come from Flaq navigation; do not guess model slugs.
"""
import argparse
import json
import sys
from html.parser import HTMLParser
from urllib.parse import urljoin, urlsplit, urldefrag, parse_qs, urlencode

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


def fetch_public(url, client, payload=None, json_response=False):
    for _ in range(6):
        https_url(url, HOSTS)
        try:
            request = client.get if payload is None else client.post
            kwargs = {} if payload is None else {'json': payload}
            with request(url, allow_redirects=False, timeout=(15, 45), stream=True, **kwargs) as response:
                if response.status_code in (301, 302, 303, 307, 308):
                    if payload is not None:
                        raise SkillError('PUBLIC_API_REDIRECT', 'Public lookup redirected. Verify the endpoint before retrying; do not switch to computer use automatically.')
                    location = response.headers.get('Location')
                    if not location:
                        raise SkillError('INVALID_REDIRECT', 'Public page returned a redirect without a destination.')
                    url = urljoin(url, location)
                    continue
                if response.status_code != 200:
                    raise SkillError('PAGE_HTTP_ERROR', 'Could not read the public URL. Check HTTP access and report missing information; do not switch to computer use automatically.', http_status=response.status_code)
                expected_type = 'application/json' if json_response else 'text/html'
                if expected_type not in response.headers.get('Content-Type', ''):
                    raise SkillError('NOT_JSON' if json_response else 'NOT_HTML', 'The URL did not return the expected content type. Verify the URL and use the documented direct reading mode.')
                chunks, size = [], 0
                for chunk in response.iter_content(65536):
                    size += len(chunk)
                    if size > 8 * 1024 * 1024:
                        raise SkillError('PAGE_TOO_LARGE', 'Response exceeds the 8 MiB read limit. Use the Docs JSON mode or a smaller market page where applicable; otherwise report the limitation.')
                    chunks.append(chunk)
                return url, b''.join(chunks).decode('utf-8', errors='replace')
        except SkillError:
            raise
        except Exception:
            raise SkillError('PAGE_NETWORK_ERROR', 'Public fetch failed. Check network access and report the blocker if unresolved; no credentials were sent. Do not switch to computer use automatically.') from None
    raise SkillError('TOO_MANY_REDIRECTS', 'Public page exceeded the redirect limit.')


def fetch_page(url, client):
    return fetch_public(url, client)


def fetch_json(url, client, payload=None):
    url, content = fetch_public(url, client, payload=payload, json_response=True)
    try:
        data = json.loads(content)
        if not isinstance(data, dict):
            raise ValueError('Expected an object')
    except ValueError:
        raise SkillError('INVALID_PUBLIC_JSON', 'Public lookup did not return a JSON object. Verify the endpoint and report missing information.') from None
    return url, data


def read_docs(url, client, limit, locale=None):
    https_url(url, HOSTS)
    parsed = urlsplit(url)
    parts = parsed.path.strip('/').split('/')
    pages = parse_qs(parsed.query).get('page', [])
    if parts[-1] != 'docs' or len(parts) not in (1, 2) or len(pages) != 1 or not pages[0]:
        raise SkillError('INVALID_DOCS_URL', 'Provide the actual Flaq Docs link with its page query; do not derive a document slug from a model ID.')
    locale = locale or (parts[0] if len(parts) == 2 else 'en')
    endpoint = f'https://{parsed.netloc}/api/docs/?' + urlencode({'page': pages[0], 'locale': locale})
    endpoint, data = fetch_json(endpoint, client)
    if data.get('restrictedFallback') is True:
        raise SkillError('DOCS_RESTRICTED', 'This document is restricted. Report the missing information; computer use requires necessity and explicit user authorization under SKILL.md.')
    content = data.get('content')
    if not isinstance(content, str) or not content.strip():
        raise SkillError('DOCS_CONTENT_MISSING', 'The Docs endpoint returned no usable content. Verify the original Docs URL; do not guess parameters.')
    return {'url': endpoint, 'source_url': url, 'page': pages[0], 'locale': locale,
            'content': content[:limit], 'content_truncated': len(content) > limit,
            'restrictedFallback': False}


def read_market(client, page_num, page_size, media_types=None, providers=None):
    if page_num < 1 or page_size < 1:
        raise SkillError('INVALID_PAGINATION', 'page-num and page-size must be positive.')
    payload = {'pageNum': page_num, 'pageSize': page_size}
    if media_types:
        payload['media_type'] = media_types
    if providers:
        payload['provider'] = providers
    url, data = fetch_json('https://flaq.ai/api/model-market/', client, payload)
    if data.get('code') != 200:
        raise SkillError('MARKET_LOOKUP_FAILED', 'The public model market lookup failed. Verify filters and availability; do not guess model routes or switch to computer use automatically.')
    result = data.get('data')
    if not isinstance(result, dict) or not isinstance(result.get('records'), list) or type(result.get('total')) is not int or result['total'] < 0:
        raise SkillError('INVALID_MARKET_RESPONSE', 'The model market response is missing records or a valid total.')
    return {'url': url, 'request': payload, 'records': result['records'], 'total': result['total'],
            'notice': 'One market page only. total counts groups, not individual models. Follow actual detail links; model IDs are not URL slugs. Verify availability and exact operation Docs before generation.'}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('url', nargs='?')
    parser.add_argument('--text-limit', type=int, default=30000)
    modes = parser.add_mutually_exclusive_group()
    modes.add_argument('--docs-json', action='store_true')
    modes.add_argument('--market', action='store_true')
    parser.add_argument('--locale')
    parser.add_argument('--page-num', type=int)
    parser.add_argument('--page-size', type=int)
    parser.add_argument('--media-type', action='append', choices=['image', 'video', 'llm', 'content', 'music', '3d'])
    parser.add_argument('--provider', action='append')
    args = parser.parse_args()
    if (args.market and args.url) or (not args.market and not args.url):
        parser.error('Provide a URL for HTML/Docs reading, or use --market without a URL.')
    if args.locale and not args.docs_json:
        parser.error('--locale requires --docs-json.')
    if not args.market and any(value is not None for value in (args.page_num, args.page_size, args.media_type, args.provider)):
        parser.error('Pagination and filter options require --market.')
    if args.text_limit < 1:
        raise SkillError('INVALID_LIMIT', 'text-limit must be positive.')
    with session() as client:
        if args.market:
            return read_market(client, args.page_num if args.page_num is not None else 1,
                               args.page_size if args.page_size is not None else 20, args.media_type, args.provider)
        if args.docs_json:
            return read_docs(args.url, client, args.text_limit, args.locale)
        url, html = fetch_page(args.url, client)
    page = PageParser(url)
    page.feed(html)
    return page.result(args.text_limit)


if __name__ == '__main__':
    sys.exit(run(main))
