/**
 * Generate email-safe hero images for newsletter issues.
 *
 * WHY THIS EXISTS
 * The site's article heroes are WebP. WebP does NOT render in Outlook on
 * Windows (the Word engine) and is patchy in several other clients, so a
 * newsletter that points at /images/articles/<slug>.webp shows a broken image
 * to a meaningful share of readers. Email needs JPEG.
 *
 * It also downsizes: the site ships 1600px heroes, but the email card is 560px
 * wide, so 1120px (2x for retina) is the right source and keeps the message
 * small. Email clients are unforgiving about weight — Gmail clips a message
 * over 102KB of HTML, and large images stall on mobile data.
 *
 * USAGE
 *   node scripts/email-images.mjs                 # every article that has a hero
 *   node scripts/email-images.mjs <slug> [<slug>] # just these
 *
 * Output: public/images/email/<slug>.jpg, served at
 * https://aegeanpulse.com/images/email/<slug>.jpg once deployed.
 */
import sharp from "sharp";
import { readdirSync, existsSync, mkdirSync, statSync, readFileSync } from "node:fs";
import { join, basename } from "node:path";

const SRC_DIR = "public/images/articles";
const OUT_DIR = "public/images/email";
const ARTICLES = "src/content/articles";

// 560px card at 2x. Anything larger is wasted bytes in an inbox.
const WIDTH = 1120;
const QUALITY = 80;
// Soft budget. Past this, a slow mobile connection shows a blank box for
// long enough that the reader scrolls by.
const WARN_KB = 200;

const wanted = process.argv.slice(2);

if (!existsSync(SRC_DIR)) {
  console.error(`No source directory at ${SRC_DIR}`);
  process.exit(1);
}
mkdirSync(OUT_DIR, { recursive: true });

/** Pull the frontmatter alt text so the email can reuse it verbatim. */
function altFor(slug) {
  const p = join(ARTICLES, `${slug}.md`);
  if (!existsSync(p)) return null;
  const m = readFileSync(p, "utf8").match(/^imageAlt:\s*"(.*)"\s*$/m);
  return m ? m[1] : null;
}

const sources = readdirSync(SRC_DIR).filter((f) => /\.(webp|jpe?g|png)$/i.test(f));
const targets = wanted.length
  ? sources.filter((f) => wanted.includes(basename(f).replace(/\.[^.]+$/, "")))
  : sources;

if (!targets.length) {
  console.error(
    wanted.length
      ? `No source image for: ${wanted.join(", ")}\nAvailable: ${sources.map((f) => f.replace(/\.[^.]+$/, "")).join(", ")}`
      : "No source images found.",
  );
  process.exit(1);
}

let warned = 0;
for (const file of targets) {
  const slug = file.replace(/\.[^.]+$/, "");
  const out = join(OUT_DIR, `${slug}.jpg`);

  const info = await sharp(join(SRC_DIR, file))
    .resize({ width: WIDTH, withoutEnlargement: true })
    // Progressive renders top-down on slow connections instead of all-or-nothing.
    // toColourspace srgb because a CMYK or exotic profile renders wrong in Outlook.
    .jpeg({ quality: QUALITY, progressive: true, mozjpeg: true })
    .toColourspace("srgb")
    .toFile(out);

  const kb = Math.round(statSync(out).size / 1024);
  const alt = altFor(slug);
  const flag = kb > WARN_KB ? "  <-- over budget" : "";
  if (kb > WARN_KB) warned++;

  console.log(`  ${slug}`);
  console.log(`    ${info.width}x${info.height} jpeg  ${kb}KB${flag}`);
  console.log(`    url: https://aegeanpulse.com/images/email/${slug}.jpg`);
  console.log(`    alt: ${alt ?? "(no imageAlt in frontmatter — write one before sending)"}`);
}

console.log(`\n${targets.length} image(s) written to ${OUT_DIR}/`);
if (warned) console.log(`${warned} over the ${WARN_KB}KB budget — consider lowering QUALITY.`);
console.log("These are only reachable once the site is deployed.");
