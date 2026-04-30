/**
 * Discovers which city images exist in /public/markets/.
 * Runs at module load time (build time), so it's free at request time.
 *
 * Drop `[slug].webp` (or .png/.jpg) into /public/markets/ and the
 * card will auto-use that image instead of the SVG fallback.
 */
import fs from "fs";
import path from "path";

const MARKETS_DIR = path.join(process.cwd(), "public", "markets");
const SUPPORTED_EXTS = [".webp", ".png", ".jpg", ".jpeg"];

let cachedAvailableImages: Map<string, string> | null = null;

function discoverAvailableImages(): Map<string, string> {
  const map = new Map<string, string>();
  try {
    if (!fs.existsSync(MARKETS_DIR)) return map;
    const files = fs.readdirSync(MARKETS_DIR);
    for (const file of files) {
      const ext = path.extname(file).toLowerCase();
      if (!SUPPORTED_EXTS.includes(ext)) continue;
      const slug = path.basename(file, ext);
      // Public path that browser will request
      map.set(slug, `/markets/${file}`);
    }
  } catch {
    // No markets directory or read failure — fall back to SVG
  }
  return map;
}

/** Returns the public URL for a city's image, or null if no image exists. */
export function getCityImagePath(slug: string): string | null {
  if (!cachedAvailableImages) {
    cachedAvailableImages = discoverAvailableImages();
  }
  return cachedAvailableImages.get(slug) ?? null;
}
