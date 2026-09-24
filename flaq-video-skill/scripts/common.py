"""Shared JSON output and HTTP helpers for the Flaq Video Skill scripts.

Imported by the executable scripts; no standalone command.
Usage examples: python3 scripts/read_page.py --help
                python3 scripts/video_request.py --help
"""
import json
import sys
from urllib.parse import urlsplit


class SkillError(Exception):
    def __init__(self, code, message, **details):
        super().__init__(message)
        self.code = code
        self.details = details


def run(main):
    try:
        data = main()
        print(json.dumps({'ok': True, 'data': data}, ensure_ascii=False))
    except SkillError as error:
        print(json.dumps({'ok': False, 'error': {
            'code': error.code, 'message': str(error), **error.details,
        }}, ensure_ascii=False), file=sys.stderr)
        return 1
    except KeyboardInterrupt:
        print(json.dumps({'ok': False, 'error': {'code': 'INTERRUPTED', 'message': 'Stopped locally; remote tasks are not cancelled.'}}), file=sys.stderr)
        return 130
    except Exception:
        # Do not echo exceptions that might contain headers, credentials or request bodies.
        print(json.dumps({'ok': False, 'error': {'code': 'LOCAL_ERROR', 'message': 'Operation failed. Check files, dependencies and local permissions.'}}), file=sys.stderr)
        return 1
    return 0


def https_url(url, hosts=None):
    try:
        parsed = urlsplit(url)
        valid = parsed.scheme == 'https' and bool(parsed.hostname) and not parsed.username and not parsed.password and not parsed.fragment
        if hosts is not None:
            valid = valid and parsed.hostname in hosts and parsed.port in (None, 443)
    except ValueError:
        valid = False
    if not valid:
        raise SkillError('INVALID_URL', 'Use an HTTPS URL on the permitted host, without embedded credentials or a fragment.')
    return url


def session():
    try:
        import requests
    except ImportError:
        raise SkillError('DEPENDENCY_MISSING', 'Install the packages listed in requirements.txt with your chosen Python interpreter.') from None
    client = requests.Session()
    # Do not implicitly attach .netrc credentials to public pages or downloads.
    client.trust_env = False
    client.headers['User-Agent'] = 'FlaqVideoSkill/1.0'
    return client


def read_json(path):
    try:
        with open(path, encoding='utf-8') as source:
            return json.load(source)
    except (OSError, ValueError):
        raise SkillError('INVALID_JSON_FILE', 'Provide a readable UTF-8 JSON file.') from None
