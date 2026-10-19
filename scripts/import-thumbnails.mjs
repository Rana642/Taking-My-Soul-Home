import { createClient } from "@sanity/client";
import { config } from "dotenv";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

config({ path: resolve(ROOT, ".env") });

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET || "production",
  token: process.env.SANITY_API_TOKEN,
  apiVersion: "2024-01-01",
  useCdn: false,
});

const IG_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN;
const IG_ID = process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID;

const CONCURRENCY = 5;
const RETRY_LIMIT = 3;

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function downloadBuffer(url) {
  for (let attempt = 1; attempt <= RETRY_LIMIT; attempt++) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return Buffer.from(await res.arrayBuffer());
    } catch (err) {
      if (attempt === RETRY_LIMIT) throw err;
      await sleep(1000 * attempt);
    }
  }
}

async function uploadToSanity(buffer, filename) {
  const asset = await client.assets.upload("image", buffer, {
    filename,
    contentType: "image/jpeg",
  });
  return asset._id;
}

async function processEpisode(episode, mediaMap) {
  const media = mediaMap.get(episode.instagramId);
  if (!media) return { status: "skip", reason: "no-media-data" };

  const thumbUrl =
    media.media_type === "VIDEO"
      ? media.thumbnail_url || media.media_url
      : media.media_url;

  if (!thumbUrl) return { status: "skip", reason: "no-url" };

  try {
    const buffer = await downloadBuffer(thumbUrl);
    const assetId = await uploadToSanity(
      buffer,
      `thumb-${episode.instagramId}.jpg`
    );

    await client
      .patch(episode._id)
      .set({
        thumbnail: {
          _type: "image",
          asset: { _type: "reference", _ref: assetId },
        },
      })
      .commit();

    return { status: "ok", assetId };
  } catch (err) {
    return { status: "error", reason: err.message };
  }
}

async function runInBatches(items, fn, concurrency) {
  const results = [];
  for (let i = 0; i < items.length; i += concurrency) {
    const batch = items.slice(i, i + concurrency);
    const batchResults = await Promise.all(batch.map(fn));
    results.push(...batchResults);
  }
  return results;
}

async function importSeriesThumbnails() {
  console.log("\n--- Series Thumbnails ---");

  const series = await client.fetch(
    `*[_type == "series" && !defined(thumbnail)]{_id, title, "slug": slug.current}`
  );

  if (series.length === 0) {
    console.log("All series already have thumbnails.");
    return;
  }

  for (const s of series) {
    const firstEp = await client.fetch(
      `*[_type == "episode" && series._ref == $id && defined(thumbnail)] | order(publishedAt desc) [0] {
        "thumbAssetId": thumbnail.asset._ref
      }`,
      { id: s._id }
    );

    if (!firstEp?.thumbAssetId) {
      console.log(`  ✗ ${s.title} — no episode with thumbnail found`);
      continue;
    }

    await client
      .patch(s._id)
      .set({
        thumbnail: {
          _type: "image",
          asset: { _type: "reference", _ref: firstEp.thumbAssetId },
        },
      })
      .commit();

    console.log(`  ✓ ${s.title}`);
  }
}

async function main() {
  if (!process.env.SANITY_API_TOKEN) {
    console.error("ERROR: SANITY_API_TOKEN missing in .env");
    process.exit(1);
  }

  // Load raw Instagram data for media URLs
  const rawPosts = JSON.parse(
    readFileSync(resolve(__dirname, "data", "instagram-raw.json"), "utf-8")
  );
  const mediaMap = new Map(rawPosts.map((p) => [p.id, p]));
  console.log(`Loaded ${rawPosts.length} Instagram posts with media URLs`);

  // Fetch episodes that still need thumbnails
  const episodes = await client.fetch(
    `*[_type == "episode" && !defined(thumbnail) && defined(instagramId)] {
      _id, title, instagramId
    }`
  );

  console.log(`${episodes.length} episodes need thumbnails\n`);

  if (episodes.length === 0) {
    console.log("All episodes already have thumbnails!");
    await importSeriesThumbnails();
    return;
  }

  let ok = 0, skipped = 0, errors = 0;

  const results = await runInBatches(
    episodes,
    (ep) => processEpisode(ep, mediaMap),
    CONCURRENCY
  );

  results.forEach((r, i) => {
    if (r.status === "ok") {
      ok++;
    } else if (r.status === "skip") {
      skipped++;
    } else {
      errors++;
      console.error(`  ✗ ${episodes[i].title.slice(0, 60)} — ${r.reason}`);
    }
  });

  // Progress reporting every 50
  console.log(`\n✓ Episodes done: ${ok} uploaded, ${skipped} skipped, ${errors} errors`);

  // Now do series thumbnails
  await importSeriesThumbnails();

  console.log("\n✓ All thumbnails imported!");
}

main().catch((err) => {
  console.error("Failed:", err.message);
  process.exit(1);
});
