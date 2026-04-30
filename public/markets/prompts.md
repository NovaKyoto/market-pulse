# AI Image Prompts for Featured Cities

Copy these into Flux / DALL-E 3 / Midjourney to generate the perfect image for each city.

All prompts target the same aesthetic: cinematic travel poster, sunset palette, atmospheric depth, ONE iconic landmark as the hero.

---

## Style modifier (append to every prompt)

```
travel poster style, vibrant sunset colors, dramatic atmospheric lighting,
clean composition, illustrated cinematic style, 4:3 aspect ratio,
no text, no watermarks, professional graphic design
```

---

## Houston, TX

```
Saturn V rocket launching from a launch pad at golden hour, dramatic
flame trail, Houston downtown skyline in the distance with Williams
Tower obelisk visible, deep blue twilight sky with stars, Earth visible
on the horizon, cinematic travel poster style
```

## Miami, FL

```
Iconic pastel pink Art Deco hotel facade in South Beach Miami at
golden hour sunset, palm tree silhouette, vibrant tropical sunset
sky with pink, orange, and teal gradient, ocean visible at the
bottom, neon vertical sign on building, travel poster style
```

## Austin, TX

```
Texas State Capitol building with iconic pink granite dome at sunset,
dramatic orange and purple sky, downtown Austin skyline with Frost
Bank Tower visible (distinctive owl-eye crown), bats flying from
Congress Avenue Bridge in the background, travel poster aesthetic
```

## Los Angeles, CA

```
Iconic HOLLYWOOD sign letters on hillside with palm tree silhouettes
in foreground, dramatic golden hour sunset with orange, pink, and
purple sky, distant LA skyline visible, cinematic travel poster
illustration style
```

## New York, NY

```
Empire State Building as the dominant centerpiece at twilight, with
illuminated windows and red beacon at top, Chrysler Building visible
to the left with art deco crown spire, Manhattan skyline silhouette,
deep purple and amber gradient sky, glowing city lights, cinematic
travel poster style
```

## Phoenix, AZ

```
Camelback Mountain with distinctive camel-shaped silhouette at sunset,
giant saguaro cactus in foreground with raised arms, dramatic Sonoran
Desert sunset with red, orange, and gold gradient sky, atmospheric
heat haze, travel poster style
```

## Atlanta, GA

```
Bank of America Plaza skyscraper with iconic gold-lit pyramid spire
glowing brightly at twilight, downtown Atlanta skyline silhouette,
Westin Peachtree Plaza cylindrical glass tower visible, deep purple
to amber gradient sky, peach floating gracefully in upper sky as
graphic accent, travel poster style
```

## Dallas, TX

```
Reunion Tower with iconic illuminated geodesic ball at top dominating
the composition, Bank of America Plaza tower with green argon edge
lighting visible, downtown Dallas skyline at sunset, big Texas Lone
Star symbol in upper sky, dramatic orange and purple gradient,
travel poster style
```

---

## Quick generation guide

### Flux (via fal.ai)

1. Go to https://fal.ai/models/fal-ai/flux/dev
2. Paste prompt + style modifier
3. Set aspect ratio to 4:3
4. Generate, download as PNG
5. Convert to WebP at https://squoosh.app (75% quality)
6. Rename to `[slug].webp` and drop into `/public/markets/`

### DALL-E 3 (via ChatGPT Plus)

1. Open ChatGPT, ask: "Generate a 4:3 image: [paste prompt]"
2. Right-click image → Save
3. Convert to WebP, rename, drop in folder

### Midjourney

1. In Discord, paste: `/imagine [prompt] --ar 4:3 --style raw`
2. Upscale your favorite, download
3. Convert to WebP

---

## Tips for consistency

- Use the SAME style modifier across all 8 prompts so the cards look like a set
- Generate 4 variations of each, pick the one with the strongest hero element
- Keep file sizes under 200KB (compression matters more than resolution at card size)
