# Flaq Video Skill

Generate, edit, and upscale videos through [Flaq AI](https://flaq.ai/) with an AI agent. The skill guides your agent through model discovery, current API documentation, authenticated requests, task polling, and video delivery.

The agent reads model capabilities and pricing from the [Model Market](https://flaq.ai/model-market/), model detail pages, and [official Docs](https://flaq.ai/docs/). Model versions and parameter limits are not hardcoded in the skill. Included Python helpers handle page extraction, local credentials, requests, and downloads. Flaq CLI and a local server are not required.

## Model selection

Your explicit model choice takes priority. Otherwise, the agent prefers Seedance, then Wan, choosing the latest available version that meets your input, capability, and budget requirements. It compares other available models when neither family is suitable. It does not automatically switch models and submit another paid task after a failure.

## Requirements

- An agent that supports `SKILL.md` skills and can read webpages, run Python, and access local files. A browser tool helps with dynamic or login-protected pages.
- Python 3.10 or newer, with the packages in [requirements.txt](requirements.txt).
- Network access to Flaq's website and API, and to the returned video URLs.
- A Flaq account and Client Key with the permissions and available balance needed for your chosen model.
- For saved credentials: macOS Keychain, Windows Credential Manager, or a running, unlocked Linux Secret Service.

## Install the skill

Copy the entire `flaq-video-skill` directory into the skill directory supported by your agent. Use your agent's documented project-level or user-level skill location; the location depends on the host. Keep the directory name and its internal layout intact, including `scripts`, `references`, `templates`, and `requirements.txt`. Copying only `SKILL.md` is not sufficient.

Refresh or reload skills as required by your agent. Confirm that it can find `flaq-video-skill` and resolve the relative files referenced by [SKILL.md](SKILL.md).

Open a terminal in the installed `flaq-video-skill` directory. Install dependencies in your chosen Python environment:

```sh
python3 -m pip install -r requirements.txt
```

On Windows, use `py -3` in place of `python3`. If you use a virtual environment, make sure your agent runs the scripts with that same interpreter. Neither the skill nor its scripts install dependencies automatically.

## Configure your Key once

Create or copy a Client Key from Flaq's API management page, then run these commands in your own terminal:

```sh
python3 scripts/credentials.py set
python3 scripts/credentials.py status
```

Paste the Key at the hidden-input prompt. Do not put it in a chat message, command argument, or request JSON file.

The Key is saved in your system credential store for the current device and OS account. Subsequent requests read it automatically, including after closing the terminal or restarting the device. The operating system may ask you to authorize access or unlock its credential store. Configure the Key again on another device.

Run `set` again to replace the saved Key. To remove it:

```sh
python3 scripts/credentials.py clear
```

For existing automation environments, `FLAQ_CLIENT_KEY` takes precedence over the saved credential. The scripts do not automatically load `.env` files, and `clear` does not remove environment variables. `status` checks local configuration; it does not validate the Key remotely or check your balance.

See [Script usage](references/scripts.md#environment-and-first-time-setup) for storage details and platform requirements.

## Use with your agent

Ask the agent to use Flaq Video Skill and describe the result you want. For example:

> Use Flaq Video Skill to recommend a model for an 8-second landscape video of a quiet harbor at sunrise. Compare suitable options and estimate the cost before generating.

> Use Flaq Video Skill with the latest available Seedance model to animate my attached image. I want a gentle camera push-in, portrait framing, and no sound. Check the supported options and price first.

> Use Flaq Video Skill to check my existing task ID and download the video if it is ready. Do not create another task.

You can specify a model, link to its Flaq detail page, or let the agent follow the default priority. The agent reads the selected model's detailed Docs before preparing the request. Once you authorize the generation with the necessary options and cost scope established, it submits and records the task ID for follow-up.

## Check website access without a Key

From the skill directory:

```sh
python3 scripts/read_page.py 'https://flaq.ai/model-market/'
```

This reads a public page without credentials or a paid API call. The script extracts model links, documentation links, page text, code examples, and public model specifications where present. The agent follows actual detail-page and Docs links rather than guessing URLs.

## Files and further reading

| File or directory | Purpose |
| --- | --- |
| [SKILL.md](SKILL.md) | Agent instructions, model priority, and end-to-end workflow |
| [references/scripts.md](references/scripts.md) | Exact setup, request, polling, upload, and download commands |
| [references/model-discovery.md](references/model-discovery.md) | Reading specifications and reconciling them with detailed Docs |
| `scripts/credentials.py` | Configure, inspect, and clear local credentials |
| `scripts/read_page.py` | Extract information from Flaq public pages |
| `scripts/video_request.py` | Submit, query, wait for, and download video tasks |
| `templates/` | Generic request and local-file templates to fill from current Docs |
| `tests/` | Offline behavior checks using isolated test inputs |

Request templates are starting structures, not ready-to-submit examples. Keep templates unchanged and prepare each request in your working directory. Supported fields and upload formats depend on the selected model's current documentation.

## Troubleshooting

| Issue | What to check |
| --- | --- |
| The agent cannot find the skill | Verify the host's skill location, copy the complete folder, and refresh skill discovery. |
| A dependency is missing | Install `requirements.txt` with the same Python interpreter the agent uses. |
| The credential store is unavailable | Check system access and unlock it. On Linux, ensure Secret Service is running in the current user session. The scripts do not fall back to plaintext storage. |
| `status` succeeds but generation fails | Local configuration does not prove remote access. Check Key permissions, balance, model availability, and request parameters. |
| A saved Key was cleared but requests still authenticate | Check whether `FLAQ_CLIENT_KEY` is still set in the agent's environment. |
| Model details or Docs are incomplete | Follow the actual documentation link, increase the text limit if truncated, or use the agent's browser for dynamic content. Do not guess missing parameters. |
| Waiting times out | Keep the task ID and query it again. A local waiting timeout does not mean remote generation failed or was cancelled. |
| Submission ends with a network error | Check whether Flaq created a task before submitting again to avoid duplicate charges. |
| A download fails | Retain the result URL, check the output directory and file name, and inspect the reported error. Existing files are never overwritten. |

## Development checks

Run from the skill directory:

```sh
python3 -m unittest discover -s tests -v
```

These tests do not use real system credentials or submit paid tasks. They cover page extraction, credential access behavior, request handling, and file protection. They do not replace live credential-store checks on each operating system or an authorized end-to-end generation test.
