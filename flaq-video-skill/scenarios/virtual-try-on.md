# Outfit showcase from an existing try-on image

Animate a person already wearing the desired outfit. This scenario starts with a completed outfit photo or virtual try-on image; it does not create a new try-on image from separate person and garment photos.

## Ask your agent

> Use Flaq Video Skill to animate this completed try-on image into a portrait outfit showcase. Keep the same person, garment colors, cut, and accessories. Use a gentle turn and a small step forward. Check supported duration and cost before generating.

## Inputs and workflow

- Required: the completed outfit image, with the person and garment visible.
- Useful details: desired motion, framing, duration, and whether audio is wanted.
- If only separate person and garment images are supplied, ask for a completed outfit image for this workflow.

1. Discover an image-to-video operation using the shared model priority. Check the exact Docs for image format, size, aspect ratio, supported durations, and local-file or URL input requirements.
2. Match motion to what the image reveals. Prefer small turns or steps for a single front-view image; a full rotation may invent unseen garment details. Ask for suitable references when those details are essential and verify that the selected operation accepts them.
3. Describe fabric movement and camera movement while preserving the visible outfit. Put duration and framing in documented request fields rather than relying only on the prompt.
4. Submit and track the task using the shared workflow. If the host can inspect the result, check face consistency, garment shape, accessories, and hands. Report visible deviations; do not automatically pay for another attempt.

## Adaptable prompt

This expanded prompt is written for the scenario; it is not the original prompt for the gallery video.

```text
Animate the person already wearing the outfit in the supplied image. Preserve the person's face, body proportions, garment color, fabric texture, cut, and accessories. The person makes a gentle quarter turn, pauses to show the outfit, and takes one small step forward. Keep the full outfit in frame with a steady camera and soft, consistent lighting. Let the fabric move naturally. Do not add clothing or accessories.
```

## Reference gallery

### 1. Outfit showcase

[![1. Outfit showcase](https://cdn.heydream.im/heydream/v3/clothes_changer_video_generator/example/1.webp)](https://cdn.heydream.im/heydream/v3/clothes_changer_video_generator/example/1.mp4)

[Watch video](https://cdn.heydream.im/heydream/v3/clothes_changer_video_generator/example/1.mp4) · [Source](https://heydream.im/clothes-changer-video-generator/)

<details>
<summary>Original page prompt</summary>

```text
showcase the outfit
```

</details>

The linked image is the source page's video cover, not a verified starting image. See [example provenance](index.md#about-the-examples).

### 2. Everyday outfit showcase

[![2. Everyday outfit showcase](https://cdn.heydream.im/heydream/v3/clothes_changer_video_generator/example/2.webp)](https://cdn.heydream.im/heydream/v3/clothes_changer_video_generator/example/2.mp4)

[Watch video](https://cdn.heydream.im/heydream/v3/clothes_changer_video_generator/example/2.mp4) · [Source](https://heydream.im/clothes-changer-video-generator/)

<details>
<summary>Original page prompt</summary>

```text
showcase the outfit
```

</details>

Use a completed outfit image for this workflow. The linked cover is a preview, not a verified generation input.
