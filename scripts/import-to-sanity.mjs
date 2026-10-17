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

const SERIES_DEFINITIONS = [
  {
    title: "Merciful Shades of the Beloved",
    slug: "merciful-shades-of-the-beloved",
    tagline: "Exploring the 99 Names of Allah",
    tag: "Names of Allah",
    isFeatured: true,
    order: 1,
  },
  {
    title: "Two Wise Inside: Soul vs. Ego",
    slug: "two-wise-inside-soul-vs-ego",
    tagline: "The Inner Battle We All Face",
    tag: "Spiritual Warfare",
    isFeatured: true,
    order: 2,
  },
  {
    title: "Jumu'ah Reminder",
    slug: "jumuah-reminder",
    tagline: "Weekly Reminders for a Better Friday",
    tag: "Weekly Wisdom",
    isFeatured: true,
    order: 3,
  },
  {
    title: "Let's Tell Allah",
    slug: "lets-tell-allah",
    tagline: "Intimate Conversations with the Creator",
    tag: "Heart Reflections",
    isFeatured: true,
    order: 4,
  },
  {
    title: "A Breath of Compassion",
    slug: "a-breath-of-compassion",
    tagline: "Prophetic Stories of Mercy",
    tag: "Prophetic Tales",
    isFeatured: true,
    order: 5,
  },
  {
    title: "Daily Dua",
    slug: "daily-dua",
    tagline: "Daily Supplications for Every Moment",
    tag: "Heart Reflections",
    isFeatured: false,
    order: 6,
  },
];

async function importSeries() {
  console.log("Importing series...");
  const seriesMap = {};

  for (const s of SERIES_DEFINITIONS) {
    const doc = {
      _type: "series",
      _id: `series-${s.slug}`,
      title: s.title,
      slug: { _type: "slug", current: s.slug },
      tagline: s.tagline,
      tag: s.tag,
      isFeatured: s.isFeatured,
      order: s.order,
    };

    await client.createOrReplace(doc);
    seriesMap[s.title] = doc._id;
    console.log(`  ✓ ${s.title}`);
  }

  return seriesMap;
}

function makeSlug(title, id) {
  const base = title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .slice(0, 80);
  return `${base}-${id.slice(-6)}`;
}

async function importEpisodes(seriesMap) {
  const raw = JSON.parse(
    readFileSync(resolve(__dirname, "data", "instagram-parsed.json"), "utf-8")
  );

  console.log(`\nImporting ${raw.length} episodes...`);
  let imported = 0;
  let skipped = 0;

  const BATCH_SIZE = 50;
  for (let i = 0; i < raw.length; i += BATCH_SIZE) {
    const batch = raw.slice(i, i + BATCH_SIZE);
    const tx = client.transaction();

    for (const post of batch) {
      const seriesRef = seriesMap[post.series] || null;
      const slug = makeSlug(post.title, post.id);

      const doc = {
        _type: "episode",
        _id: `ig-${post.id}`,
        title: post.title.slice(0, 200),
        slug: { _type: "slug", current: slug },
        excerpt: post.caption?.slice(0, 500) || "",
        instagramPermalink: post.permalink,
        instagramMediaType: post.media_type,
        instagramId: post.id,
        publishedAt: post.timestamp,
        hashtags: post.hashtags,
      };

      if (seriesRef) {
        doc.series = { _type: "reference", _ref: seriesRef };
      }

      tx.createOrReplace(doc);
      imported++;
    }

    await tx.commit();
    console.log(`  Batch ${Math.floor(i / BATCH_SIZE) + 1}: ${batch.length} episodes imported (total: ${imported})`);
  }

  console.log(`\nDone: ${imported} imported, ${skipped} skipped`);
}

async function main() {
  if (!process.env.SANITY_API_TOKEN) {
    console.error(
      "ERROR: SANITY_API_TOKEN missing in .env\n" +
      "Get it from: https://www.sanity.io/manage/project/xq7lvf8y/api#tokens\n" +
      'Create a token with "Editor" permissions and add to .env:\n' +
      "SANITY_API_TOKEN=your_token_here"
    );
    process.exit(1);
  }

  console.log("Starting Sanity import...\n");

  const seriesMap = await importSeries();
  await importEpisodes(seriesMap);

  console.log("\n✓ Import complete!");
}

main().catch((err) => {
  console.error("Import failed:", err.message);
  process.exit(1);
});
