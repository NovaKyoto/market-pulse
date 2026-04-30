# City Market Card Images

Drop AI-generated city images here as `[slug].webp` and they'll automatically replace the SVG fallback artwork in the Featured Markets section on `/market`.

## Filename convention

Match the city slug exactly:

- `houston-tx.webp`
- `miami-fl.webp`
- `austin-tx.webp`
- `los-angeles-ca.webp`
- `new-york-ny.webp`
- `phoenix-az.webp`
- `atlanta-ga.webp`
- `dallas-tx.webp`

## Image specifications

- **Format:** WebP (best size/quality balance) or PNG/JPG
- **Aspect ratio:** 4:3 (e.g., 1200×900px or 800×600px)
- **Size:** Keep under 200KB each (use [Squoosh](https://squoosh.app/) or `cwebp -q 75`)
- **Style:** Travel poster / illustrated / cinematic — should match the existing palette of the site
- **Composition:** ONE iconic landmark or scene per city, with atmospheric depth

## Recommended AI tools

1. **Flux Pro** (via fal.ai or Replicate) — best photorealism
2. **DALL-E 3** (OpenAI / ChatGPT Plus) — best for stylized illustrations
3. **Midjourney** — best aesthetics, manual download
4. **Stable Diffusion XL** (free via Replicate) — open source
5. **Ideogram** — great for graphic / poster style

## Sample prompts (use as starting point)

See `prompts.md` in this folder for detailed per-city prompts.

## How it works

The `CityArtwork` component checks for a matching image first:

1. If `[slug].webp` exists in `/public/markets/`, it renders that image with overlays
2. Otherwise, it falls back to the hand-crafted SVG illustration

You can mix and match — generate AI images for a few cities first, leave others as SVG.
