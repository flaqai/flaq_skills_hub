# Video scenarios

Read the guide that matches the user's goal before choosing a Flaq model. These guides translate a creative brief into required capabilities, inputs, and a video prompt. Use them alongside [SKILL.md](../SKILL.md), then read the selected model's current Flaq detail page and exact operation's Docs. Scenario names are not API model IDs or endpoints.

| User goal | Inputs | Guide |
| --- | --- | --- |
| Animate an existing outfit or completed virtual try-on image | One image of a person already wearing the outfit | [Outfit showcase](virtual-try-on.md) |
| Make a UGC ad with a hook, demonstration, and closing shot | Product or creator image; desired selling points; optional approved script | [UGC ads](ugc-ads.md) |
| Show a product, its details, or a person using it | Product image or a composed person-with-product image | [Product showcase](product-showcase.md) |
| Add movement to a still image or create a cinematic image-led scene | Starting image and intended action | [Image to video](image-to-video.md) |

For overlapping requests, choose the guide matching the final deliverable: an outfit ad belongs under UGC ads; a simple outfit turn belongs under outfit showcase. Read another guide only when its workflow is needed.

## From a scenario to an API request

1. Identify the user's actual inputs and intended result from the selected guide. Reference-gallery posters are preview images, not verified generation inputs.
2. Apply the shared priority: explicit user choice, then the latest suitable available Seedance, then Wan, then other suitable models. A source website's model choice does not change this priority.
3. Discover models at [Flaq Model Market](https://flaq.ai/model-market/). Read the candidate's public specification and API examples, follow its actual detailed Docs link, and check image/reference support, duration, framing, and audio as needed. Do not copy another website's private form payloads into Flaq requests.
4. Adapt a prompt to the user's images and brief. Timelines and motion descriptions inside prompts are creative directions; configure duration, aspect ratio, input fields, and audio separately using documented API fields. Never invent fields such as `scenario` or assume an image field is named `image_url`.
5. Use the [script guide](../references/scripts.md) to prepare a request, obtain credentials inside the request process, submit within the user's authorized scope, record the task ID, poll, and deliver. A scenario does not itself authorize a paid generation.

## About the examples

The galleries reuse examples and associated English prompts from AITryOn, UGCMaker, and Heydream. Each case links to its public source page and the original CDN video. Shared examples are grouped rather than repeated as separate scenarios. A source page associates the prompt with the video, but does not establish the exact model, seed, settings, or source inputs. These are creative references, not claims that this skill reproduced the videos through Flaq.

Keep original page prompts distinct from adapted prompts. Use the user's own supplied inputs for generation unless they explicitly ask to use an example asset. Do not substitute a preview poster for a missing source image without checking with them.

The presentation follows the category index, numbered cases, video previews, source links, and expandable prompts used by [awesome-seedance](https://github.com/ZeroLu/awesome-seedance) and [awesome_seedance_2_5](https://github.com/flaqai/awesome_seedance_2_5). Media stays on its source CDN; click a preview or **Watch video** when the Markdown viewer does not play video inline.

## Adding a scenario

Add a focused guide with its intended result, required inputs, an example user request, capability checks, a workflow, and representative cases. Record each case's source and whether the prompt is original or adapted. Link the guide here and add a README entry when it introduces a distinct use case. Keep model versions and API field definitions in current Flaq Docs rather than copying a fixed catalog here.
