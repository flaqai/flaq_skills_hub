# Script usage

Run commands from the skill directory or replace script paths with absolute paths. Store request files and video results in the user's chosen working directory; do not modify the templates themselves.

## Environment and first-time setup

Use Python 3.10+. On macOS/Linux, the command is typically `python3`; on Windows, use `py -3`. Keep using the same interpreter afterward.

The scripts require `requests` and `keyring`. If either is missing, provide the following installation command for the user to run in their chosen Python environment. The scripts do not install dependencies or change environments automatically:

```sh
python3 -m pip install -r requirements.txt
python3 scripts/credentials.py set
python3 scripts/credentials.py status
```

The user runs `set` in an interactive terminal. Input is hidden, and the command does not accept a Key argument. Run it again to replace the Key. `clear` removes the Key saved by this skill.

The Key is saved in macOS Keychain, Windows Credential Manager, or Linux Secret Service under service `ai.flaq.video-skill` and account `https://api.flaq.ai`. Configure it once for repeated use on the same device and OS account; configure it again on a different device. The OS may require access authorization or an unlock. Linux requires a running, unlocked Secret Service. Unavailable storage produces an explicit error, with no plaintext-file or in-memory fallback.

`FLAQ_CLIENT_KEY` takes precedence over saved credentials to support existing automation environments. The scripts do not automatically load `.env`. `clear` does not remove the environment variable and reports whether it is still active. `status` checks local configuration only, not balance or remote permissions.

`video_request.py` calls `credentials.get_api_key()` in its own process without printing the Key. Other Python request implementations can import that function and build the request header in the same process. Do not print the Key from a script for the model to read. This credential convention applies only to `https://api.flaq.ai`.

## Read the official website

```sh
python3 scripts/read_page.py 'https://flaq.ai/model-market/'
python3 scripts/read_page.py 'https://flaq.ai/docs/'
```

Choose an actual detail page URL from `model_links` and read it with the same script. Follow that detail page's `docs_links` to the corresponding documentation. Docs routes use `/docs?page=api/MODEL_DOC_SLUG`, not `/docs/api/MODEL_NAME`; obtain the slug from an actual link. Quote the complete URL and preserve query parameters. Do not build a URL from `model_name` or guess a raw Markdown download address.

Output fields:

- `public_spec`: the public specification object, or null when absent. Absence does not mean the model is unavailable.
- `code_blocks`: all preformatted code blocks, with line breaks preserved. Identify the relevant model and distinguish submission from polling examples.
- `model_links`, `docs_links`, `links`: links within the site from this page, preserving query parameters. Models in navigation are not a verified list of all available models.
- `text`: page text, limited to 30000 characters by default. If `text_truncated` is true, increase `--text-limit` and read again.
- `public_spec_parse_error`: a specification was found but could not be parsed; inspect the original page.

The script reads one page, does not execute JavaScript or bypass login, and does not guarantee that the entire market catalog is loaded. Check pagination or use the host browser's filters when candidates are missing. If no model documentation link is found, locate it through the Docs navigation. For pages requiring login, use the user's authorized browser session; do not send an API Key to webpages. Report unavailable essential information rather than replacing it with cached assumptions, guesses, or local model configuration.

## Prepare a generic request

Copy [request.json](../templates/request.json) into the working directory. Fill `model_name` and required fields from the selected model's current Docs. Empty strings are fields to complete; an empty `model_name` is rejected, and the template is not ready for submission. Remove `prompt` if it does not apply according to the Docs. Add resolution, duration, reference inputs, and other fields as documented; do not assume every model supports the same fields.

Use [files.json](../templates/files.json) only after confirming that the operation supports the corresponding multipart format. Fill each entry with the actual `field` and absolute `path`; multiple files may repeat the same array field name. Do not also include file fields in request.json. Other arrays and objects are sent as JSON strings in multipart requests; verify that the model accepts that encoding. For mixed remote-URL/local-file arrays or other special encodings, construct the request with host tools according to current Docs instead of changing input semantics to fit the script.

```sh
python3 scripts/video_request.py submit --request /absolute/work/request.json --confirmed
python3 scripts/video_request.py submit --request /absolute/work/request.json --files /absolute/work/files.json --confirmed
```

These demonstrate different input methods. Execute only the command matching the current inputs, not both. The script checks generic structure, not model-specific parameters; the agent must read the Docs first. `--confirmed` records existing user authorization, not a substitute for it. The script does not automatically retry submission.

## Query and deliver

Record the task ID immediately after submission. Querying, waiting, and downloading do not submit another generation request:

```sh
python3 scripts/video_request.py get TASK_ID
python3 scripts/video_request.py wait TASK_ID --timeout 300 --interval 10
python3 scripts/video_request.py download 'RESULT_URL' --output /absolute/work/video.mp4
```

Successful output uses `{"ok":true,"data":...}`. Errors go to stderr with a nonzero exit code. Query results retain `task_id` and `task_status`; video URLs are in the script output's `data.videos`, extracted from the API's original `data.task_result.videos`.

When waiting expires, the script returns the current status with `wait_timed_out: true`; this does not mean generation failed. Network requests have separate timeouts, so exit may occur up to one query later than the waiting limit. Continue querying the same ID. Do not automatically switch models or make another paid submission after failure or an uncertain outcome.

Downloading does not read the Key, follow redirects, or overwrite files. The output's parent directory must already exist. The script checks HTTP content type and nonempty content, not video decoding. If a result URL is available but downloading is blocked, deliver the link and explain the limitation.
