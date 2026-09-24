# UGC ads

Create a creator-style product ad with a clear opening hook, demonstration, and closing shot. Use the user's actual product and selling points rather than inventing testimonials or product claims.

## Ask your agent

> Use Flaq Video Skill to turn my product photo into a portrait UGC ad. Open with a close product detail, show it in use, and finish with a clear product shot. Preserve the packaging and logo. Use the selling points I provide and check the model's audio support and cost before generating.

## Inputs and workflow

- Required: a product reference or an existing creator-with-product image, plus the product action or message.
- For speech: the intended wording and language. Ask for missing product claims instead of inventing them.
- Useful details: platform/framing, duration, creator reference, tone, and audio preference.

1. Decide whether one composed image is sufficient or whether separate creator/product references are needed. Check the selected Flaq operation's documented reference support and limits; do not assume all image-to-video models accept multiple images.
2. Build a short sequence around hook → demonstration → closing product shot. For short durations, simplify the action instead of squeezing a long script into the clip.
3. Check native audio and speech capabilities before promising voiceover or lip sync. If the requested audio is unsupported, explain the gap and agree on the output scope before submitting; do not silently add another service.
4. Map the references and prompt to the actual Flaq request schema. Keep the user's approved product details, and configure duration/framing/audio only with documented options.
5. Track and deliver the task. If inspection is available, check product/face continuity, packaging, speech, and the ending. Prompt text alone does not guarantee exact logos or readable captions.

## Reference gallery

These original prompts are detailed creative references. Their timing, audio instructions, and multiple outfits must be adapted to the current model's capabilities and the user's supplied inputs. Numerical motion annotations inside a prompt are not API parameters.

### 1. Streetwear product ad

[![1. Streetwear product ad](https://cdn.ugcmaker.org/ugcmaker/ugc_ads_generator/example/1_1.webp)](https://cdn.ugcmaker.org/ugcmaker/ugc_ads_generator/example/1_2.mp4)

[Watch video](https://cdn.ugcmaker.org/ugcmaker/ugc_ads_generator/example/1_2.mp4) · [Source](https://ugcmaker.org/ugc-ads-generator/)

<details>
<summary>Original page prompt</summary>

```text
Product Demo video. UGC style, fast cuts, neutral→confident arc. Urban vibe, handheld cam, confident model. Product: Exact copy from ref image. Keep color/texture/shape/details. Start: Handheld parallax on collar. Timeline 10s: 0-1.5s HOOK 0.4: Close collar arch. 1.5-3s REVEAL 0.6: Back track, oversized silhouette. 3-4.5s FEATURE 0.3: Side orbit, structure/raglan. 4.5-6s DEMO 0.5: Front push-in, full fit. 6-8s HERO 0.7: Low angle walk. 8-10s CLOSE 0.8: Walk into lens, confident end. Shots: 1 (0-1.5s): Close torso/hood, parallax collar [0.7]. Brick alley bg, DOF 0.4. Stands, adjusts collar. 2 (1.5-3s): Med-wide back, track [0.8]. Street bg, DOF 0.2. Walks away, back volume. 3 (3-4.5s): Med profile, orbit [0.4]. Gate bg, DOF 0.3. Side, hands pockets. 4 (4.5-6s): Full→med push [0.7]. Brick alley, DOF 0.2. Turns front, pose. 5 (6-8s): Low wide track [0.8]. Blurred street, DOF 0.5. Brisk walk past, fabric move. 6 (8-10s): Close walk into lens [1.0]. Urban bokeh. Blocks frame. END Style: Urban streetwear, daylight, raw handheld, cool high-contrast. Motion: Smooth accel/decel, real physics, pro blur. Sharp product focus. Consistency: Stable light/color, correct shadows/physics. No float/bad shadow/CGI. Model: Male Caucasian 20s slim, short hair, light skin, black cap, baggy black pants. Cool swagger, serious expr. Action: Stand→walk away back→turn pose front→brisk walk past→into lens. Hands pockets noted. Human cons: Same face/body/features/clothing. Realistic move/expr. No distortion. Audio: Elec 80-120bpm synths/drums/bass energetic. VO med: "Street style redefined. Matte finish hits different. Oversized silhouette, architectural hood. Warmth without weight. Your winter armor. Level up rotation. Own the city." Avoid: Static>0.3s, deform/color shift, text/watermark, stutter/dupe, bg flicker/pop, strobing.
```

</details>

### 2. Fashion outfit reveal

[![2. Fashion outfit reveal](https://cdn.ugcmaker.org/ugcmaker/ugc_ads_generator/example/2_1.webp)](https://cdn.ugcmaker.org/ugcmaker/ugc_ads_generator/example/2_2.mp4)

[Watch video](https://cdn.ugcmaker.org/ugcmaker/ugc_ads_generator/example/2_2.mp4) · [Source](https://ugcmaker.org/ugc-ads-generator/)

<details>
<summary>Original page prompt</summary>

```text
NARRATIVE: Product-reveal style, rhythmic pacing, curiosity→satisfaction arc. Fast-paced 'magic change' editing, bright clean closet environment, confident modeling poses.
PRODUCT: Match reference image exactly—color, texture, shape, distinctive features preserved.
OPENING: Motion starts immediately with model swaying slightly while holding hangers.
TIMELINE (10s total):
0-2.5s [HOOK, intensity:0.3, ease-out]: Model holds two outfit options on hangers in bright closet → establishes choice.
2.5-5s [REVEAL, intensity:0.4, ease-in-out]: Quick cut to model wearing pink skirt set, spinning → shows fit and movement.
5-7.5s [FEATURE, intensity:0.4, linear]: Cut to white set, model adjusts sunglasses → styling versatility.
7.5-10s [CLOSING, intensity:0.5, ease-out]: Final pose with dark set and accessory → strong impression.
SHOTS:
HOOK (0-2.5s): Wide shot, full body centered, static camera with slight handheld drift. Background: bright walk-in closet with white shelving, neutral clothes. Action: model holds two outfits on hangers, looking at them invitingly.
REVEAL (2.5-5s): Full body centered, static frame, model spins in pink skirt set to show pleats. Background: closet shelves with shoes/bags.
FEATURE (5-7.5s): Knee-up medium shot, subtle push-in, white outfit, adjusting sunglasses/cap, confident pose.
CLOSING (7.5-10s): Full body, slow pull back/static, dark set with handbag, final confident smile at camera.
STYLE: High-key fashion influencer aesthetic, bright/airy, neutral palette (beige/white), clean lines, soft even lighting.
MOTION: Smooth acceleration/deceleration, realistic physics, professional motion blur, sharp focus on product.
VISUAL CONSISTENCY: Stable lighting/shadows, accurate material physics, no floating objects or CGI artifacts.
HUMAN FIGURE: Female Caucasian model, 20s, slim, long wavy blonde hair, tan skin. Pink skirt set + white sneakers. Energetic, confident posing. Expression: confident smile, happy energy. Props: hangers, handbag, sunglasses, cap
```

</details>

The second reference includes outfit changes; it belongs to an ad concept and does not extend the [outfit showcase workflow](virtual-try-on.md) into garment-image generation. Both images above are source video covers. See [example provenance](index.md#about-the-examples).

### 3. Skincare creator ad

[![3. Skincare creator ad](https://cdn.aitryon.art/home/ai_tryon/ai_ugc_maker/example/example2_cover.webp)](https://cdn.aitryon.art/home/ai_tryon/ai_ugc_maker/example/example2_video.mp4)

[Watch video](https://cdn.aitryon.art/home/ai_tryon/ai_ugc_maker/example/example2_video.mp4) · [Source](https://aitryon.art/ai-ugc-maker/)

<details>
<summary>Original page prompt</summary>

```text
I used to dread waking up and seeing dull, dry skin staring back at me. Then I tried this serum — and everything changed. Now, when I look in the mirror, my skin feels soft, plump, alive. It drinks in moisture like a thirsty flower after rain. Every morning I see a subtle glow, every evening I feel nourished and renewed.It’s not magic — it’s just science and care. This cream doesn’t just sit on my face; it transforms it. I feel confident, fresh, and ready to face the world.
```

</details>

This source prompt is a first-person promotional script. Replace its testimonial and skincare claims with the user's approved wording; do not treat it as verified product information. Check speech support and shorten the script to fit the selected duration.
