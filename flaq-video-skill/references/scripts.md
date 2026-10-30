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

The script reads one page and does not execute JavaScript or bypass login. Detail-page HTML includes public specifications and API examples even when the API tab is visually hidden; Docs HTML includes the document body. Read this content directly without clicking tabs. The first market HTML page is not the entire catalog; use the public lookup below for filters and pagination. If no model documentation link is found, read the official Docs/navigation directly and do not invent a slug. Report unavailable essential information rather than replacing it with cached assumptions, guesses, or local model configuration.

### Read Docs as Markdown

```sh
python3 scripts/read_page.py 'ACTUAL_DOCS_URL_WITH_PAGE_QUERY' --docs-json
python3 scripts/read_page.py 'ACTUAL_DOCS_URL_WITH_PAGE_QUERY' --docs-json --locale en --text-limit 60000
```

This extracts the `page` query from the supplied Docs URL and makes a credential-free `GET https://flaq.ai/api/docs/?page=...&locale=...`. The locale defaults to the URL's locale prefix, or `en` for an unprefixed URL; `--locale` overrides it. It does not derive document names from model IDs. The output includes `source_url`, the requested API `url`, `page`, `locale`, `content` (Markdown), `content_truncated`, and `restrictedFallback: false`. If truncated, increase `--text-limit` before relying on the content. A restricted response raises `DOCS_RESTRICTED`; missing or empty content raises `DOCS_CONTENT_MISSING`, rather than returning apparently usable documentation.

### Filter and paginate the model market

```sh
python3 scripts/read_page.py --market --media-type video --page-num 1 --page-size 20
python3 scripts/read_page.py --market --media-type video --page-num 2 --page-size 20
python3 scripts/read_page.py --market --media-type video --provider bytedance
```

These are alternative lookup examples, not a required sequence. `--market` performs a credential-free `POST https://flaq.ai/api/model-market/` with `pageNum`, `pageSize`, and optional `media_type` and `provider` arrays. This POST only reads the catalog; it does not generate a video. `--media-type` and `--provider` may be repeated. Use provider values from current market data. Defaults are page 1 and page size 20, with no filters unless specified.

The output includes `request`, `records`, and `total`. `total` counts model groups, not individual model IDs; each record can contain multiple models. Request subsequent pages as needed with the same filters and page size. An empty page is not proof that a model is unavailable; check the total and supplied detail/Docs links. Records may include raw pricing units; use the detail page's public pricing rules and Docs to interpret billing. Model IDs and group names are not page paths: follow actual site links instead of constructing detail URLs from these fields.

All three reading modes use no API Key. No mode invokes a browser or desktop tool. Missing dependencies, HTTP errors, restricted content, and network failures do not authorize a switch to computer use. Check the reported cause and applicable direct reading mode, then report any unresolved blocker. Only a necessary computer operation may be proposed, with explicit single-operation or current-conversation permission under [SKILL.md](../SKILL.md#tool-choice-and-computer-use-authorization); even with permission, keep preferring direct HTTP and scripts. Never send an API Key to the website or these public lookup endpoints.

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
