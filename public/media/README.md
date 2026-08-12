# Media assets

The homepage hero uses a full-bleed background **video** with a dark overlay,
falling back to `hero-poster.svg` (an image placeholder) until you add one.

To enable the video background, drop a file here named:

- `hero.mp4` (required — H.264/MP4, muted, ~10–20s loop, 1920×1080)
- `hero.webm` (optional — better compression for modern browsers)

The `<video>` element already references these paths and will pick them up
automatically. Until then, the poster image (`hero-poster.svg`) is shown.

Recommended royalty-free sources: Pexels Videos, Coverr, Mixkit.
Look for calm clips of caregiving, nurses, elderly support, or children learning.
