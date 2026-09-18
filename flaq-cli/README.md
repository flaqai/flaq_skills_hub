# Flaq CLI

English | [简体中文](README.zh-CN.md)

Flaq CLI is a local bridge for AI-powered media generation workflows. It manages a Client Key, loads hot-reloadable model configurations, sends URLs or local assets to generation APIs, validates and resumes generation tasks, and downloads results to a specified directory.

It has two interfaces:

- Command line: for AI agents, scripts, and development workflows.
- Local management UI: for configuring authorization, checking service status, viewing models, reloading model configurations, and copying request logs.

The service listens only on the local loopback interface. The Client Key is stored in macOS Keychain and is never written to browser storage, project files, or the Skill workspace. Remote APIs use HTTPS by default and in production; loopback development addresses are the only HTTP exception.

## Open-source security boundary

Neither the source code nor the executable contains a Flaq Client Key or third-party model provider key. Publishing the source code does not expose credentials stored by users in macOS Keychain at runtime.

- Client Keys are isolated by remote API Origin. A Key stored for `https://api.flaq.ai` is not automatically sent to another custom API address.
- Custom remote APIs must use HTTPS. Their URLs cannot contain a username, password, query string, or fragment.
- Requests carrying a Client Key never follow HTTP redirects, preventing credentials from being forwarded to another address.
- Local files and generation parameters are submitted in the same task request. The CLI does not use a website Access Token, presigned URL, or separate upload endpoint.
- Task result download URLs must use HTTPS, and downloads never follow redirects automatically.
- Local management APIs, health status, and log access require the current service's random session token. Browser requests also undergo local Origin validation.
- Upstream failures expose only controlled error codes, HTTP status, business code, retry status, and safe messages. Raw response bodies and third-party error messages are not forwarded. Structured diagnostics are attached only to controlled local errors such as model catalog and input validation failures.
- Logs redact sensitive field names, Bearer values, and sensitive URL query parameters. The management UI sanitizes stored log entries again when reading them.

## Requirements

| Usage | Requirements |
| --- | --- |
| Development and testing | macOS, Node.js with `--experimental-strip-types` support, and pnpm |
| Building the standalone executable | The environment above, plus Bun |
| Using a packaged build | macOS; Node.js, pnpm, and Bun are not required |

macOS is currently the supported production platform because credentials use macOS Keychain and the double-click launcher is a `.command` file.

## Project structure

```text
flaq-cli/
├── src/
│   ├── api/
│   │   ├── client.ts              # Flaq API requests and protocol handling
│   │   ├── task-request.ts        # JSON or multipart task request assembly
│   │   └── task-runner.ts         # Polling, recovery, and result downloads
│   ├── auth/
│   │   ├── credential-store.ts    # macOS Keychain access
│   │   └── read-secret.ts         # Secure terminal input
│   ├── catalog/
│   │   ├── catalog.ts             # Recursive model discovery, loading, and reloads
│   │   ├── types.ts               # Model configuration types
│   │   └── validator.ts           # Schema and task input validation
│   ├── runtime/
│   │   ├── logger.ts              # Daily request logs, reading, and redaction
│   │   ├── paths.ts               # Runtime and model catalog paths
│   │   └── session.ts             # Local service session token
│   ├── server/server.ts           # Local HTTP service
│   ├── ui/management-page.ts      # Chinese management UI
│   ├── cli.ts                     # CLI entry point
│   ├── download.ts                # Result downloads and failed-download cleanup
│   └── errors.ts                  # Machine-readable errors
├── model-catalog/
│   ├── openai/
│   │   └── gpt-image-2.json
│   └── bytedance/
│       ├── seedance-2-0.json
│       └── seedance-2-5.json
├── schemas/
│   └── model-catalog-v1.schema.json
├── tests/
├── start.command                 # Double-click launcher for packaged builds
├── package.json
├── README.md
└── README.zh-CN.md
```

## Running the project

### Initial development setup

Install dependencies from the repository root:

```bash
pnpm install
```

Dependencies only need to be installed once. Starting the management UI does not require reinstalling them.

### Start the local service and management UI

In development:

```bash
pnpm start serve --open
```

The default service address is:

```text
http://127.0.0.1:43127
```

The management UI lets you:

1. Save, replace, or clear the Client Key.
2. View the Client Key status and generation API Origin.
3. View the service version, model count, and loaded model operations.
4. Reload model JSON files from `model-catalog/`.
5. View automatically refreshed daily request logs and copy one entry or the entire day.

Keep the startup terminal open. Closing it stops the local service.

### Start a packaged build by double-clicking

Double-click `start.command` in the delivery directory. It locates the adjacent `flaq` executable and runs:

```bash
./flaq serve --open
```

If the executable is missing or does not have execute permission, the launcher reports the problem and does not fall back to another program.

## Common commands

In development, replace `flaq` in the examples with `pnpm start`. Packaged builds use `./flaq` directly.

```bash
# Show help
pnpm start

# Start the local service
pnpm start serve --open

# Check service status
pnpm start status

# Store a separate Client Key for a specific HTTPS API
pnpm start auth set-key --api-base-url https://api.example.com

# Check Client Key status
pnpm start auth status

# Check the isolated Client Key status for a specific HTTPS API
pnpm start auth status --api-base-url https://api.example.com

# List all models
pnpm start models list

# Show a model and all its operations
pnpm start models get --id gpt-image-2

# Reload model configurations
pnpm start models reload

# Validate the complete model catalog offline
pnpm start models validate
```

Task commands:

```bash
# Paid submission: use --confirmed only after explicit user approval
pnpm start task submit --media image --input-file /absolute/path/request.json --confirmed

# Get a task
pnpm start task get --media image --task-id TASK_ID

# Wait for completion
pnpm start task wait --media image --task-id TASK_ID

# Download a completed task without creating a new task
pnpm start task download --media image --task-id TASK_ID --output-dir /absolute/path/output
```

For video tasks, replace `--media image` with `--media video`.

The CLI also provides `task run` for one-shot execution. Automated workflows should use the resumable sequence:

```text
submit
→ save task_id immediately
→ wait
→ download
```

If polling or downloading fails, the same task can be resumed without losing its ID or submitting another paid task.

## Request input

`task submit` and `task run` accept a JSON object through `--input-file`. Its fields must exactly match the selected model operation.

Image request example:

```json
{
  "model_name": "gpt-image-2",
  "prompt": "A clean product photograph on a soft neutral background.",
  "width": 16,
  "height": 9,
  "resolution": "1k",
  "quality": "medium"
}
```

Unified prompt limits:

| Media type | Maximum length |
| --- | ---: |
| Image | 2,000 UTF-16 code units |
| Video | 5,000 UTF-16 code units |

Model configurations also validate required, optional, and prohibited fields; enums; ranges; URLs; and cross-field constraints. A failed validation never submits a paid task.

Fields configured with `format: "media-input"` accept either an HTTP(S) URL or an absolute local path. Example:

```json
{
  "model_name": "gpt-image-2-edit",
  "prompt": "Keep the subject and replace the background with a clean studio setting.",
  "image_url_list": [
    "/absolute/path/to/reference.png",
    "https://cdn.example.com/second-reference.webp"
  ],
  "width": 16,
  "height": 9,
  "resolution": "1k",
  "quality": "medium"
}
```

If a request contains a local path, the CLI assembles the entire task as `multipart/form-data`. Normal values use their original field names, array media values repeat the same field name, URLs remain strings, and local paths become file parts. Supported formats are BMP, GIF, JPEG/JPG, PNG, TIFF, WebP, MOV, MP4, WebM, M4A, MP3, MPEG, and WAV. A `.mpeg` input is submitted with an `.mp3` filename and the `audio/mpeg` MIME type, preventing the backend from storing a `.mpeg` URL. M4A keeps its `.m4a` filename and uses `audio/mp4`.

Direct multipart image input is documented for GPT Image 2 at `/api/v1/images/edits`. The CLI continues to use the resumable `/api/v1/image/task` and `/api/v1/video/task` endpoints consistently. Multipart handling for video, audio, and generic asynchronous tasks is implemented as a generic compatibility mode; backend field handling must still be confirmed in an end-to-end integration test before production use. Automated tests validate request assembly only and never upload a real file or create a task.

## Output and runtime data

| Item | Location or source |
| --- | --- |
| Client Key | Generation credential entry in macOS Keychain |
| Local session file | `~/Library/Application Support/Flaq CLI/session.json` |
| Request logs | `<skill-root>/workspace/_logs/YYYY-MM-DD.log` in an Asset Skill package |
| Model catalog | `model-catalog/` in development; `model-catalog/` beside the packaged executable |
| Successful CLI result | One-line JSON on standard output |
| CLI error | One-line machine-readable JSON on standard error |
| Generated files | Absolute directory passed through `--output-dir` |

If a later file fails during a multi-result download, the CLI removes files created earlier in that attempt. The same task ID can then be retried safely. Existing files are never overwritten.

## Request logs

After packaging into the Asset Skill, the CLI and management UI share:

```text
asset-skill/workspace/_logs/
├── 2026-08-17.log
└── 2026-08-18.log
```

Each line is a JSON object. Logs cover service startup and shutdown, authorization state changes, model loading and reloads, and task submit, get, wait, download, and run operations. Entries include the timestamp, operation, status, duration, and a request or result summary useful for troubleshooting. Logs are retained for 30 days by default; expired daily files are removed automatically.

Client Key, API Key, Authorization, cookie, password, secret, local session, bootstrap token, refresh token, and `signedUrl` values are replaced with `[REDACTED]`. Bearer values and common sensitive URL parameters such as token, key, credential, and signature are also redacted. Raw upstream error responses are never written to logs. Prompts, asset URLs, and local paths may still appear for troubleshooting, so copied logs should be reviewed before sharing. The management UI can view logs by date, refresh them automatically, copy one entry or the entire day, and permanently clear one day or all logs after confirmation.

Outside an Asset Skill package, development logs default to `~/Library/Application Support/Flaq CLI/logs/`. Set `FLAQ_CLI_LOG_DIR` to use a different verification directory. A packaged executable at `asset-skill/tools/flaq-cli/flaq` automatically writes logs to the Skill's `workspace/_logs/` directory.

## Hot-reloading model configurations

Each model uses one JSON file:

```text
model-catalog/<vendor>/<model-id>.json
```

To add or update a model:

```text
add or replace JSON
→ run models validate
→ click “重新加载模型配置” in the UI or run models reload
→ the new configuration enters the active model list
```

Changing only model JSON does not require recompiling the executable. Changes under `src/` require a new build.

Every model configuration must satisfy these rules:

- The filename matches `id`.
- The top-level directory matches `vendor`.
- Every backend `modelName` is unique across the entire catalog.
- Each operation explicitly declares required, optional, prohibited, and fields.
- Fields accepting a URL or local file use `format: "media-input"`; URL-only fields continue to use `format: "http-url"`.
- Image prompts use `maxLength: 2000`; video prompts use `maxLength: 5000`.

## Build and delivery

Build the standalone macOS executable:

```bash
pnpm build
```

Build output:

```text
dist/flaq
```

Public releases should be produced in a trusted build environment and include code signing, notarization, and a separately published checksum. The repository contains no signing certificate or reusable release private key. An unsigned file must not be described as a verified official build until an Apple Developer signing identity is configured.

A complete release package or Skill integration must contain more than the executable:

```text
flaq-cli/
├── flaq
├── start.command
├── model-catalog/
│   └── <vendor>/<model-id>.json
└── schemas/
    └── model-catalog-v1.schema.json
```

`flaq`, `start.command`, and `model-catalog/` must be siblings. Updating model JSON in a package still requires only a service reload. Source code changes require rebuilding and replacing `flaq`.

### Build and copy to the Asset Skill

By default, the `flaq-cli` and `agent-skills` repositories are sibling directories, the CLI source is under `flaq-cli/flaq-cli/`, and the target skill is `agent-skills/.agents/skills/asset-skill/`. From the CLI source directory containing `package.json`, run:

```bash
pnpm package:skill
```

The script:

1. Checks pnpm and Bun in the local build environment.
2. Runs `pnpm build`.
3. Assembles `flaq`, `start.command`, `model-catalog/`, and `schemas/`.
4. Creates a script-owned staging directory under the Skill's `tools/` directory and validates the executable and model catalog.
5. Copies the package to `asset-skill/tools/flaq-cli/` and validates it again.

For a different checkout layout, pass the Asset Skill's absolute directory:

```bash
zsh scripts/package-to-asset-skill.sh /absolute/path/to/asset-skill
```

The script does not delete extra files in the target directory. If the existing package contains a file absent from the new package, it stops and lists the file for manual confirmation.

## Development verification

The following commands never submit a real generation task:

```bash
pnpm ts-check
pnpm test
pnpm start models validate
```

Security tests use fictional canary credentials to verify that insecure remote HTTP is rejected before reading a Key, Client Keys are isolated by Origin, authorized requests never follow redirects, multipart requests do not override their boundary header, and raw upstream errors do not enter local responses or logs. Tests never call a real generation endpoint.

Do not use `task submit` or `task run` for routine verification because they are paid-task entry points.

## Troubleshooting

### Why does `pnpm start -- serve --open` only show help?

Do not add the extra `--`. Use:

```bash
pnpm start serve --open
```

### The Skill reports `LOCAL_SERVICE_NOT_RUNNING`

Run `pnpm start serve --open` in development or double-click `start.command` in a package. Run `flaq status` again after the service starts.

### A new model JSON file is missing from the list

Run `models validate` first. After validation succeeds, click “重新加载模型配置” in the management UI or run `models reload`.

### Do model JSON changes require a rebuild?

No. The model catalog is scanned recursively at runtime. Rebuild only after changing TypeScript source code or the build process.
