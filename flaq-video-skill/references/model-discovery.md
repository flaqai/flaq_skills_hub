# Reading model specifications

Read this reference when parsing structured model data, distinguishing display parameters from API fields, or handling incomplete page extraction.

Prefer the included `scripts/read_page.py`; see [scripts.md](scripts.md) for commands. It returns `public_spec`, API code blocks, and actual documentation links so the agent does not need to rebuild HTML extraction logic for every request.

## Detailed model documentation

Follow the selected detail page's Documentation link or locate the model through the [official Flaq Docs](https://flaq.ai/docs/) navigation. Verify the family, version, operation, and `model_name`. One document may cover multiple operations; read the parameter section for the selected operation and any shared input restrictions.

The Model Market supports discovery and selection; the structured specification summarizes capabilities and pricing; API examples demonstrate requests; model Docs define complete parameters, constraints, and protocols. Read the corresponding Docs whenever preparing a new generation request, not only when page summaries are missing. Resuming an existing task does not require browsing the model catalog again.

Do not infer every supported parameter from an example or replace the model's Flaq documentation with that of a similar model, an older version, or the original vendor. Resolve material conflicts between Docs and detail pages before submitting; do not choose one arbitrarily and make a paid request.

## Structured data entry point

Flaq model detail pages currently expose public specifications in this dedicated JSON script:

```html
<script id="flaq-model-public-spec" type="application/json">…</script>
```

This is neither an `application/ld+json` SEO schema nor a generation endpoint. Extract the node's text with an HTML parser and parse it as JSON; in a browser, read its `textContent`. Do not execute page scripts to interpret JSON or mistake framework hydration data for API documentation.

| Field | Purpose and limitations |
| --- | --- |
| `schemaVersion` | Specification structure version, not the model version, update time, or release status |
| `model` | API model identifier; cross-check against `model_name` in the current example |
| `displayName` / `provider` | Display name and provider; not substitutes for the API identifier |
| `capabilities` | Capabilities for selection; still verify the selected operation's example |
| `parameters` | Public parameter summary, not a complete request schema |
| `pricing` | Public pricing rules, possibly empty; not an account balance or final bill |

The public specification does not fully express required fields, mutually exclusive fields, every input restriction, or availability. An omitted parameter alone does not prove that it is required, optional, or unsupported. Consult current API parameter documentation to fill these gaps.

## Display values are not request values

These common differences are interpretation guidance, not a mapping configuration to apply automatically to every model:

| Specification summary | What to verify for the request |
| --- | --- |
| `duration` containing `8s` or a range string | Numeric duration and allowed range or discrete values, as documented |
| `aspectRatio` | Whether the API uses `aspect_ratio` and whether the operation accepts it |
| `targetResolution` | Whether to use `target_resolution`; do not interchange it with ordinary `resolution` |
| `startFrame` / `endFrame` | Input field names, required status, and support for first-and-last-frame combinations |
| `referenceImages` / `referenceVideos` / `referenceAudios` | API array fields, total counts, per-item limits, and combination constraints |
| `audio` / `backgroundMusic` / `keepOriginalSound` | Actual boolean or enum fields; do not substitute display strings `on` / `off` for their types |

Values in an API example usually describe one request, not every allowed value or which fields are mandatory. Use the operation's official documentation for complete parameter restrictions.

## Pricing rules

Each `pricing` entry may contain `when` conditions, `price`, `originalPrice`, and `discount`. Use a rule for estimates only when it matches the requested resolution, audio, reference video, and other conditions. Distinguish per-second, per-generation, and input/output-duration billing. Do not confuse the lowest price with the chosen configuration's price or discount an already discounted price again. Missing pricing data does not mean the task is free.

## Incomplete page extraction

Text retrieval tools may omit JSON scripts or hidden API sections. Read the full HTML of the same page or open its API tab in a browser, then follow the official documentation link. Do not invent a public raw Markdown URL from the detail page URL.

Search indexes and cached pages may lag behind deployment. When the market, detail page, specification, and Docs conflict, re-fetch the selected page and related documentation. Do not guess generation or billing parameters while conflicts remain. The host does not need the Flaq source repository, and local source code is not a substitute for current online information.
