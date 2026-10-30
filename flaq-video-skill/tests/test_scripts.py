"""Offline behavior checks; no real credentials or paid API calls.

Run from the skill directory: python3 -m unittest discover -s tests -v
"""
from contextlib import ExitStack
import io
import json
import os
from pathlib import Path
import sys
import tempfile
import unittest
from unittest.mock import MagicMock, patch

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / 'scripts'))
import credentials
from common import SkillError, https_url, run
from read_page import PageParser, fetch_page, read_docs, read_market
from video_request import api_request, download, main, multipart, validate_request


class ScriptsTest(unittest.TestCase):
    def response(self, body=None, status=200):
        response = MagicMock()
        response.__enter__.return_value = response
        response.status_code = status
        response.json.return_value = body
        return response

    def test_page_keeps_docs_query_spec_and_hidden_code(self):
        page = PageParser('https://flaq.ai/models/vendor/example/')
        page.feed('''<script>secret irrelevant hydration</script>
<script id="flaq-model-public-spec" type="application/json">{"model":"actual-model","parameters":{"duration":["8s"]}}</script>
<a href="/docs?page=api/example&amp;lang=en">Documentation</a>
<div hidden><pre><code>POST /api/v1/video/task\n{&quot;model_name&quot;:&quot;actual-model&quot;}</code></pre></div>''')
        result = page.result(10000)
        self.assertEqual(result['public_spec']['model'], 'actual-model')
        self.assertEqual(result['docs_links'][0]['url'], 'https://flaq.ai/docs?page=api/example&lang=en')
        self.assertIn('\n{"model_name"', result['code_blocks'][0])
        self.assertNotIn('hydration', result['text'])

    def test_public_redirect_cannot_leave_flaq(self):
        client = MagicMock()
        response = self.response(status=302)
        response.headers = {'Location': 'https://untrusted.example/'}
        client.get.return_value = response
        with self.assertRaises(SkillError):
            fetch_page('https://flaq.ai/docs/', client)
        self.assertEqual(client.get.call_count, 1)
        self.assertNotIn('headers', client.get.call_args.kwargs)

    def test_credential_override_never_accesses_keyring(self):
        with patch.dict(os.environ, {'FLAQ_CLIENT_KEY': 'test-canary'}, clear=True), patch.object(credentials, 'stored_key') as stored:
            self.assertEqual(credentials.get_api_key(), 'test-canary')
            self.assertTrue(credentials.status()['configured'])
            self.assertNotIn('test-canary', json.dumps(credentials.status()))
            stored.assert_not_called()

    def test_docs_json_preserves_page_locale_and_reports_truncation(self):
        client = MagicMock()
        response = self.response()
        response.headers = {'Content-Type': 'application/json'}
        response.iter_content.return_value = [json.dumps({'content': '# Full document', 'restrictedFallback': False}).encode()]
        client.get.return_value = response
        result = read_docs('https://flaq.ai/zh/docs/?page=api%2Fexample', client, 6)
        self.assertEqual(result['page'], 'api/example')
        self.assertEqual(result['locale'], 'zh')
        self.assertEqual(result['content'], '# Full')
        self.assertTrue(result['content_truncated'])
        self.assertEqual(client.get.call_args.args[0], 'https://flaq.ai/api/docs/?page=api%2Fexample&locale=zh')
        self.assertNotIn('headers', client.get.call_args.kwargs)

    def test_docs_restrictions_and_missing_content_are_not_success(self):
        for body, code in [({'content': '', 'restrictedFallback': True}, 'DOCS_RESTRICTED'),
                           ({'content': ''}, 'DOCS_CONTENT_MISSING')]:
            with patch('read_page.fetch_json', return_value=('https://flaq.ai/api/docs/', body)):
                with self.assertRaises(SkillError) as error:
                    read_docs('https://flaq.ai/docs/?page=api/example', MagicMock(), 30000)
                self.assertEqual(error.exception.code, code)
        client = MagicMock()
        with self.assertRaises(SkillError):
            read_docs('https://flaq.ai/models/vendor/model/', client, 30000)
        client.get.assert_not_called()

    def test_market_lookup_posts_filters_and_preserves_pagination(self):
        client = MagicMock()
        response = self.response()
        response.headers = {'Content-Type': 'application/json'}
        records = [{'models': ['example-model'], 'provider': 'example'}]
        response.iter_content.return_value = [json.dumps({'code': 200, 'data': {'records': records, 'total': 23}}).encode()]
        client.post.return_value = response
        result = read_market(client, 2, 20, ['video'], ['example'])
        self.assertEqual(result['records'], records)
        self.assertEqual(result['total'], 23)
        self.assertEqual(client.post.call_args.args[0], 'https://flaq.ai/api/model-market/')
        self.assertEqual(client.post.call_args.kwargs['json'], {'pageNum': 2, 'pageSize': 20, 'media_type': ['video'], 'provider': ['example']})
        self.assertFalse(client.post.call_args.kwargs['allow_redirects'])
        self.assertNotIn('headers', client.post.call_args.kwargs)

    def test_market_lookup_rejects_redirect_failure_and_bad_pagination(self):
        client = MagicMock()
        client.post.return_value = self.response(status=307)
        with self.assertRaises(SkillError) as error:
            read_market(client, 1, 20)
        self.assertEqual(error.exception.code, 'PUBLIC_API_REDIRECT')
        self.assertEqual(client.post.call_count, 1)
        for body, code in [({'code': 500}, 'MARKET_LOOKUP_FAILED'),
                           ({'code': 200, 'data': {'records': []}}, 'INVALID_MARKET_RESPONSE')]:
            with patch('read_page.fetch_json', return_value=('https://flaq.ai/api/model-market/', body)):
                with self.assertRaises(SkillError) as error:
                    read_market(client, 1, 20)
                self.assertEqual(error.exception.code, code)
        with self.assertRaises(SkillError) as error:
            read_market(client, 0, 20)
        self.assertEqual(error.exception.code, 'INVALID_PAGINATION')

    def test_saved_key_can_be_read_without_environment_and_failure_is_sanitized(self):
        backend = MagicMock()
        backend.get_password.return_value = 'saved-test-key'
        with patch.dict(os.environ, {}, clear=True), patch.object(credentials, 'credential_backend', return_value=backend):
            self.assertEqual(credentials.get_api_key(), 'saved-test-key')
            backend.get_password.side_effect = RuntimeError('private-canary')
            with self.assertRaises(SkillError) as error:
                credentials.get_api_key()
            self.assertNotIn('canary', str(error.exception))

    def test_submit_requires_approval_before_reading_key(self):
        with patch.object(sys, 'argv', ['video_request.py', 'submit', '--request', 'unused.json']), patch('video_request.get_api_key') as key:
            with self.assertRaises(SkillError) as error:
                main()
            self.assertEqual(error.exception.code, 'CONFIRMATION_REQUIRED')
            key.assert_not_called()
        with self.assertRaises(SkillError):
            validate_request({'model_name': ''})
        self.assertEqual(validate_request({'model_name': 'from-current-docs', 'new_parameter': {'x': 1}})['new_parameter'], {'x': 1})

    def test_api_uses_bearer_no_redirect_and_returns_only_task_fields(self):
        client = MagicMock()
        client.request.return_value = self.response({'code': 0, 'data': {'task_id': 't-1', 'task_status': 'submitted', 'echo': 'private-canary'}})
        result = api_request(client, 'POST', 'task', 'private-canary', json={'model_name': 'example'})
        self.assertEqual(result, {'task_id': 't-1', 'task_status': 'submitted'})
        self.assertFalse(client.request.call_args.kwargs['allow_redirects'])
        self.assertEqual(client.request.call_args.kwargs['headers']['Authorization'], 'Bearer private-canary')
        client.request.side_effect = RuntimeError('private-canary')
        with self.assertRaises(SkillError) as error:
            api_request(client, 'POST', 'task', 'private-canary')
        self.assertEqual(error.exception.code, 'SUBMISSION_UNCERTAIN')
        self.assertNotIn('private-canary', str(error.exception))

    def test_files_are_closed_and_download_preserves_existing_file(self):
        parent = ROOT / '.test-work'
        parent.mkdir(exist_ok=True)
        with tempfile.TemporaryDirectory(dir=parent) as directory:
            source = Path(directory) / 'input.png'
            source.write_bytes(b'image')
            with ExitStack() as stack:
                fields, files = multipart({'model_name': 'example', 'sound': False}, [{'field': 'image_url', 'path': str(source)}], stack)
                self.assertIn(('sound', 'false'), fields)
                handle = files[0][1][1]
                self.assertFalse(handle.closed)
            self.assertTrue(handle.closed)
            response = self.response()
            response.headers = {'Content-Type': 'video/mp4'}
            response.iter_content.return_value = [b'video']
            client = MagicMock()
            client.get.return_value = response
            with self.assertRaises(SkillError):
                download(client, 'https://cdn.example/video.mp4', str(source))
            self.assertEqual(source.read_bytes(), b'image')
            download(client, 'https://cdn.example/video.mp4', str(Path(directory) / 'result.mp4'))
            self.assertNotIn('headers', client.get.call_args.kwargs)

    def test_error_output_does_not_echo_unexpected_secrets(self):
        with patch('sys.stderr', new_callable=io.StringIO) as stderr:
            def fail():
                raise RuntimeError('private-canary')
            self.assertEqual(run(fail), 1)
            self.assertNotIn('private-canary', stderr.getvalue())


if __name__ == '__main__':
    unittest.main()
