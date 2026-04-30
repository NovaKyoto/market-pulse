/**
 * One-shot conversion: takes Midjourney PNG outputs in /public/markets/
 * and converts them to optimized WebP files with the correct city slugs.
 *
 * Usage: node scripts/convert-city-images.mjs
 */
import fs from "fs";
import path from "path";
import sharp from "sharp";

const MARKETS_DIR = path.join(process.cwd(), "public", "markets");

// Map a fragment of the Midjourney filename → city slug
const FRAGMENT_TO_SLUG = [
  { match: "Bank_of_America", slug: "atlanta-ga" },
  { match: "Camelback", slug: "phoenix-az" },
  { match: "Empire_State", slug: "new-york-ny" },
  { match: "Reunion_Tower", slug: "dallas-tx" },
  { match: "Saturn_V", slug: "houston-tx" },
  { match: "Texas_State_Capitol", slug: "austin-tx" },
  { match: "Art_Deco", slug: "miami-fl" },
  { match: "Hollywood_Hills", slug: "los-angeles-ca" },
];

async function main() {
  const files = fs.readdirSync(MARKETS_DIR);
  const pngFiles = files.filter((f) => f.endsWith(".png"));

  if (pngFiles.length === 0) {
    console.log("No .png files found to convert.");
    return;
  }

  console.log(`Found ${pngFiles.length} PNG files to convert\n`);

  let converted = 0;
  let totalOriginal = 0;
  let totalWebp = 0;

  for (const file of pngFiles) {
    const fullPath = path.join(MARKETS_DIR, file);
    const fragment = FRAGMENT_TO_SLUG.find(({ match }) => file.includes(match));

    if (!fragment) {
      console.log(`⚠  No slug match for: ${file}`);
      continue;
    }

    const outputPath = path.join(MARKETS_DIR, `${fragment.slug}.webp`);
    const originalSize = fs.statSync(fullPath).size;

    // Resize to max 1600x1200 (4:3) for card use, then convert
    await sharp(fullPath)
      .resize(1600, 1200, { fit: "cover" })
      .webp({ quality: 78, effort: 6 })
      .toFile(outputPath);

    const webpSize = fs.statSync(outputPath).size;
    totalOriginal += originalSize;
    totalWebp += webpSize;

    const reduction = (((originalSize - webpSize) / originalSize) * 100).toFixed(1);
    console.log(
      `✓ ${fragment.slug}.webp` +
        ` (${(originalSize / 1024).toFixed(0)}KB → ${(webpSize / 1024).toFixed(0)}KB, -${reduction}%)`
    );

    // Delete the original PNG
    fs.unlinkSync(fullPath);
    converted++;
  }

  console.log(
    `\n${converted} images converted. Total: ${(totalOriginal / 1024 / 1024).toFixed(2)}MB → ${(totalWebp / 1024 / 1024).toFixed(2)}MB`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
