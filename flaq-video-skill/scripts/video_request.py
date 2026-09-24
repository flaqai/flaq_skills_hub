"""Send model-independent Flaq video requests using a locally configured Key.

Run in the skill directory (Windows: use py -3):
  python3 scripts/video_request.py submit --request request.json --confirmed
  python3 scripts/video_request.py submit --request request.json --files files.json --confirmed
  python3 scripts/video_request.py get TASK_ID
  python3 scripts/video_request.py wait TASK_ID --timeout 300
  python3 scripts/video_request.py download 'RESULT_URL' --output video.mp4
Read the chosen model's live Docs before preparing request.json or files.json.
Requires requests; saved credentials additionally require keyring.
"""
import argparse
from contextlib import ExitStack
import json
import mimetypes
from pathlib import Path
import re
import sys
import time
from urllib.parse import quote

from common import SkillError, https_url, read_json, run, session
from credentials import get_api_key

API = 'https://api.flaq.ai/api/v1/video/'


def validate_request(body):
    if not isinstance(body, dict) or not isinstance(body.get('model_name'), str) or not body['model_name'].strip():
        raise SkillError('MODEL_REQUIRED', 'Fill model_name from the selected model Docs; the empty template cannot be submitted.')
    if any(name.lower() in ('authorization', 'api_key', 'client_key', 'token') for name in body):
        raise SkillError('KEY_IN_REQUEST', 'Keep credentials out of request JSON; the script supplies the request header.')
    # Intentionally no per-model field table: current official Docs define the payload.
    return body


def multipart(body, manifest, stack):
    if not isinstance(manifest, list) or not manifest:
        raise SkillError('INVALID_FILES', 'files.json must be a nonempty array of {field, path} entries.')
    files, media_fields = [], set()
    for entry in manifest:
        if not isinstance(entry, dict) or set(entry) != {'field', 'path'} or not isinstance(entry['field'], str) or not re.fullmatch(r'[a-z][a-z0-9_]*', entry['field']):
            raise SkillError('INVALID_FILES', 'Each file entry needs a documented field name and an absolute file path.')
        if not isinstance(entry['path'], str) or not Path(entry['path']).is_absolute():
            raise SkillError('INVALID_FILE_PATH', 'File paths must be absolute.')
        path = Path(entry['path'])
        if not path.is_file():
            raise SkillError('FILE_UNREADABLE', 'An input file does not exist or is not a regular file.')
        media_fields.add(entry['field'])
        handle = stack.enter_context(path.open('rb'))
        files.append((entry['field'], (path.name, handle, mimetypes.guess_type(path.name)[0] or 'application/octet-stream')))
    fields = []
    for name, value in body.items():
        if name in media_fields:
            raise SkillError('FILE_FIELD_CONFLICT', 'A multipart file field is also present in request.json; avoid duplicate scalar inputs. For mixed URL/file arrays use the documented format with a custom request.')
        if isinstance(value, (dict, list, bool)) or value is None:
            value = json.dumps(value, ensure_ascii=False)
        else:
            value = str(value)
        fields.append((name, value))
    return fields, files


def api_request(client, method, path, key, **kwargs):
    try:
        response = client.request(method, API + path,
                                  headers={'Authorization': 'Bearer ' + key, 'Accept': 'application/json'},
                                  allow_redirects=False, timeout=(15, 60), **kwargs)
    except Exception:
        raise SkillError('SUBMISSION_UNCERTAIN' if method == 'POST' else 'QUERY_NETWORK_ERROR',
                         'Request did not complete. Do not automatically resubmit a paid task; recover a known task ID or check Flaq first.') from None
    try:
        with response:
            if not 200 <= response.status_code < 300:
                raise SkillError('API_HTTP_ERROR', 'Flaq returned an HTTP error; the upstream body is omitted to protect credentials.', http_status=response.status_code)
            try:
                body = response.json()
            except ValueError:
                raise SkillError('INVALID_API_RESPONSE', 'Flaq did not return JSON. A submitted task may still exist; do not resubmit automatically.') from None
    except SkillError:
        raise
    if not isinstance(body, dict) or str(body.get('code')) != '0':
        code = body.get('code') if isinstance(body, dict) else None
        details = {'business_code': code} if isinstance(code, int) or (isinstance(code, str) and code.isdigit()) else {}
        raise SkillError('API_BUSINESS_ERROR', 'Flaq reported an unsuccessful business response. Check authentication, quota and the model Docs before retrying.', **details)
    data = body.get('data')
    if not isinstance(data, dict) or not isinstance(data.get('task_id'), str) or not data['task_id'] or data.get('task_status') not in ('submitted', 'processing', 'succeed', 'failed'):
        raise SkillError('INVALID_TASK_RESPONSE', 'Missing or unrecognized task data. Do not resubmit automatically.')
    # Only return the task fields needed to resume or deliver; do not echo arbitrary upstream data.
    result = {'task_id': data['task_id'], 'task_status': data['task_status']}
    videos = data.get('task_result', {}).get('videos') if isinstance(data.get('task_result'), dict) else None
    if isinstance(videos, list):
        result['videos'] = [{'url': item['url']} for item in videos if isinstance(item, dict) and isinstance(item.get('url'), str) and key not in item['url']]
    if key in result['task_id']:
        raise SkillError('INVALID_TASK_RESPONSE', 'Unexpected task identifier.')
    return result


def download(client, url, output):
    https_url(url)
    path = Path(output)
    if path.exists():
        raise SkillError('OUTPUT_EXISTS', 'Choose a new output path; existing files are never overwritten.')
    created = False
    try:
        # A fresh session has no API Authorization header, including on CDN downloads.
        with client.get(url, allow_redirects=False, timeout=(15, 60), stream=True) as response:
            if response.status_code != 200:
                raise SkillError('DOWNLOAD_HTTP_ERROR', 'Result download failed; redirects are not followed automatically.', http_status=response.status_code)
            content_type = response.headers.get('Content-Type', '').split(';')[0]
            if not content_type.startswith('video/') and content_type != 'application/octet-stream':
                raise SkillError('UNEXPECTED_RESULT_TYPE', 'Result is not served as a video or binary file.')
            with path.open('xb') as target:
                created = True
                count = 0
                for chunk in response.iter_content(65536):
                    target.write(chunk)
                    count += len(chunk)
            if not count:
                raise SkillError('EMPTY_RESULT', 'Downloaded result is empty.')
        return {'path': str(path.resolve()), 'bytes': count, 'content_type': content_type}
    except FileExistsError:
        raise SkillError('OUTPUT_EXISTS', 'Choose a new output path; existing files are never overwritten.') from None
    except Exception:
        if created:
            path.unlink(missing_ok=True)
        raise


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    commands = parser.add_subparsers(dest='action', required=True)
    submit = commands.add_parser('submit')
    submit.add_argument('--request', required=True)
    submit.add_argument('--files')
    submit.add_argument('--confirmed', action='store_true')
    for action in ('get', 'wait'):
        command = commands.add_parser(action)
        command.add_argument('task_id')
        if action == 'wait':
            command.add_argument('--timeout', type=int, default=300)
            command.add_argument('--interval', type=int, default=10)
    command = commands.add_parser('download')
    command.add_argument('url')
    command.add_argument('--output', required=True)
    args = parser.parse_args()
    if args.action == 'submit' and not args.confirmed:
        raise SkillError('CONFIRMATION_REQUIRED', 'Use --confirmed only after the user has authorized this paid generation.')
    if args.action == 'wait' and (args.timeout < 1 or args.interval < 1):
        raise SkillError('INVALID_WAIT', 'timeout and interval must be positive seconds.')
    with session() as client:
        if args.action == 'download':
            return download(client, args.url, args.output)
        if args.action == 'submit':
            body = validate_request(read_json(args.request))
            with ExitStack() as stack:
                if args.files:
                    fields, files = multipart(body, read_json(args.files), stack)
                    result = api_request(client, 'POST', 'task', get_api_key(), data=fields, files=files)
                else:
                    result = api_request(client, 'POST', 'task', get_api_key(), json=body)
            return result
        if not args.task_id.strip():
            raise SkillError('TASK_ID_REQUIRED', 'Provide a task ID.')
        key = get_api_key()
        path = quote(args.task_id, safe='')
        deadline = time.monotonic() + (args.timeout if args.action == 'wait' else 0)
        while True:
            result = api_request(client, 'GET', path, key)
            if result['task_status'] == 'failed':
                raise SkillError('GENERATION_FAILED', 'Remote generation failed. Inspect the task in Flaq; no resubmission was performed.', task_id=args.task_id)
            if args.action == 'get' or result['task_status'] == 'succeed':
                return result
            remaining = deadline - time.monotonic()
            if remaining <= 0:
                return {**result, 'wait_timed_out': True, 'resume': 'Query this task ID again; do not submit another task.'}
            time.sleep(min(args.interval, remaining))


if __name__ == '__main__':
    sys.exit(run(main))
