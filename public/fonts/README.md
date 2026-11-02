# public/fonts

Self-hosted font files. Nothing here is loaded until an `@font-face` in
`src/styles/globals.css` (section 0) points at it.

## HyperwaveTwo.woff2 — not included, licence it first

`Hyperwave Two` is the brush face the home page's "WEAVE" heading is meant to
use. It is a **commercial** font by Set Sail Studios (Sam Parrett), sold via
FontBros / FontSpring / Envato — it is not on Google Fonts or Fontshare, so it
cannot be linked from a CDN.

1. Buy a webfont licence.
2. Convert/keep the file as `HyperwaveTwo.woff2` and drop it in this folder.
3. Uncomment the `@font-face` block in `src/styles/globals.css` section 0.

`--font-brush` in `src/styles/globals.css` already lists `"Hyperwave Two"` first
and falls back to `Permanent Marker`, so step 3 is the only change needed.
