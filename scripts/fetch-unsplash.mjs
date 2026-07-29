/**
 * Regenerates the curated placeholder photo pool from the Unsplash API.
 *
 * The images currently hardcoded in src/data/content.ts were hand-picked, because
 * Unsplash's search API requires a key and blocks unauthenticated requests. Once you
 * have a free key (https://unsplash.com/developers), this script pulls a wider,
 * better-matched set per gallery category.
 *
 * Usage:
 *   UNSPLASH_ACCESS_KEY=your_key node scripts/fetch-unsplash.mjs
 *
 * It prints a ready-to-paste block of image URLs grouped by category. Review the
 * results before pasting — always eyeball the photos, since search relevance varies.
 */

const ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

if (!ACCESS_KEY) {
  console.error(
    "Missing UNSPLASH_ACCESS_KEY.\n" +
      "Get a free key at https://unsplash.com/developers, then run:\n" +
      "  UNSPLASH_ACCESS_KEY=your_key node scripts/fetch-unsplash.mjs"
  );
  process.exit(1);
}

/** Search terms tuned to the cool-toned, editorial brief — adjust freely. */
const QUERIES = {
  Glam: "glam beauty portrait studio",
  Editorial: "editorial beauty portrait fashion",
  Grunge: "grunge fashion portrait dark",
  "Avant-Garde / Color": "avant garde makeup colorful portrait",
  "Film & TV": "cinematic portrait film still",
};

const PER_CATEGORY = 3;

async function search(query) {
  const url = new URL("https://api.unsplash.com/search/photos");
  url.searchParams.set("query", query);
  url.searchParams.set("per_page", String(PER_CATEGORY));
  url.searchParams.set("orientation", "portrait");
  // Bias toward the cool/dark end of the brief.
  url.searchParams.set("color", "black");

  const res = await fetch(url, {
    headers: { Authorization: `Client-ID ${ACCESS_KEY}` },
  });

  if (!res.ok) {
    throw new Error(`Unsplash returned ${res.status} for "${query}": ${await res.text()}`);
  }

  const { results } = await res.json();
  return results.map((photo) => ({
    id: photo.id,
    url: `${photo.urls.raw}&auto=format&fit=crop&w=1400&q=80`,
    description: photo.alt_description ?? "",
    credit: photo.user?.name ?? "Unknown",
    link: photo.links?.html ?? "",
  }));
}

const main = async () => {
  for (const [category, query] of Object.entries(QUERIES)) {
    console.log(`\n// —— ${category}  (query: "${query}")`);
    try {
      const photos = await search(query);
      if (photos.length === 0) {
        console.log("// no results — try a different query");
        continue;
      }
      for (const photo of photos) {
        console.log(`// ${photo.credit} — ${photo.link}`);
        console.log(`//   ${photo.description}`);
        console.log(`"${photo.url}",`);
      }
    } catch (error) {
      console.error(`// FAILED: ${error.message}`);
    }
  }

  console.log(
    "\n// Paste the URLs you like into the STOCK map in src/data/content.ts.\n" +
      "// Unsplash's license doesn't require credit, but keep the footer line while placeholders are live."
  );
};

main();
