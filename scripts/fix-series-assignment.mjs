import { createClient } from "@sanity/client";
import { config } from "dotenv";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: resolve(__dirname, "..", ".env") });

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET || "production",
  token: process.env.SANITY_API_TOKEN,
  apiVersion: "2024-01-01",
  useCdn: false,
});

const SERIES_IDS = {
  "Merciful Shades of the Beloved": "series-merciful-shades-of-the-beloved",
  "Two Wise Inside: Soul vs. Ego": "series-two-wise-inside-soul-vs-ego",
  "Jumu'ah Reminder": "series-jumuah-reminder",
  "Let's Tell Allah": "series-lets-tell-allah",
  "A Breath of Compassion": "series-a-breath-of-compassion",
  "Daily Dua": "series-daily-dua",
};

const TAG_TO_SERIES = {
  // Merciful Shades
  "#mercifulshades": "Merciful Shades of the Beloved",
  "#namesofallah": "Merciful Shades of the Beloved",
  "#99namesofallah": "Merciful Shades of the Beloved",
  "#mercifulshadesofthebeloved": "Merciful Shades of the Beloved",
  "#asmaaulhusna": "Merciful Shades of the Beloved",

  // Soul vs Ego
  "#soulvsego": "Two Wise Inside: Soul vs. Ego",
  "#soulvsegoseries": "Two Wise Inside: Soul vs. Ego",
  "#egovssoul": "Two Wise Inside: Soul vs. Ego",
  "#twovoicesinsideyou": "Two Wise Inside: Soul vs. Ego",
  "#twowiseinside": "Two Wise Inside: Soul vs. Ego",
  "#soulegobattle": "Two Wise Inside: Soul vs. Ego",

  // Jumu'ah Reminder
  "#jummah": "Jumu'ah Reminder",
  "#jummahmubarak": "Jumu'ah Reminder",
  "#jummuahreminder": "Jumu'ah Reminder",
  "#fridayprayer": "Jumu'ah Reminder",
  "#fridayblessings": "Jumu'ah Reminder",
  "#jummahprayer": "Jumu'ah Reminder",
  "#jummahreminder": "Jumu'ah Reminder",
  "#jumuah": "Jumu'ah Reminder",
  "#fridayreminder": "Jumu'ah Reminder",

  // Let's Tell Allah
  "#letstellallah": "Let's Tell Allah",
  "#letstell": "Let's Tell Allah",
  "#letstallallah": "Let's Tell Allah",

  // A Breath of Compassion
  "#abreathofreturn": "A Breath of Compassion",
  "#breathofcompassion": "A Breath of Compassion",
  "#abreathofcompassion": "A Breath of Compassion",
  "#propheticstories": "A Breath of Compassion",

  // Daily Dua
  "#dailydua": "Daily Dua",
  "#islamicdua": "Daily Dua",
};

function detectSeries(hashtags, caption) {
  if (!hashtags?.length && !caption) return null;

  // Check hashtags array first
  for (const tag of hashtags || []) {
    const lower = tag.toLowerCase();
    if (TAG_TO_SERIES[lower]) return TAG_TO_SERIES[lower];
  }

  // Fallback: check caption text
  const lowerCaption = (caption || "").toLowerCase();
  for (const [tag, series] of Object.entries(TAG_TO_SERIES)) {
    if (lowerCaption.includes(tag.replace("#", ""))) return series;
  }

  return null;
}

async function main() {
  console.log("Fetching uncategorized episodes...");
  const episodes = await client.fetch(
    `*[_type == "episode" && !defined(series)]{_id, title, hashtags, excerpt}`
  );
  console.log(`Found ${episodes.length} uncategorized episodes\n`);

  const assignments = {};
  let matched = 0;
  let unmatched = 0;

  for (const ep of episodes) {
    const series = detectSeries(ep.hashtags, ep.excerpt);
    if (series) {
      if (!assignments[series]) assignments[series] = [];
      assignments[series].push(ep._id);
      matched++;
    } else {
      unmatched++;
    }
  }

  console.log("--- Matches ---");
  for (const [series, ids] of Object.entries(assignments)) {
    console.log(`  ${series}: +${ids.length} episodes`);
  }
  console.log(`\nMatched: ${matched}, Still uncategorized: ${unmatched}\n`);

  // Apply updates in batches
  for (const [series, ids] of Object.entries(assignments)) {
    const seriesId = SERIES_IDS[series];
    const BATCH = 50;
    for (let i = 0; i < ids.length; i += BATCH) {
      const batch = ids.slice(i, i + BATCH);
      const tx = client.transaction();
      for (const id of batch) {
        tx.patch(id, (p) =>
          p.set({ series: { _type: "reference", _ref: seriesId } })
        );
      }
      await tx.commit();
    }
    console.log(`  ✓ ${series}: ${ids.length} assigned`);
  }

  // Print final counts
  const counts = await client.fetch(`
    *[_type == "series"] | order(order asc) {
      title,
      "episodeCount": count(*[_type == "episode" && series._ref == ^._id])
    }
  `);
  const uncategorized = await client.fetch(
    `count(*[_type == "episode" && !defined(series)])`
  );

  console.log("\n--- Final Counts ---");
  for (const s of counts) {
    console.log(`  ${s.title}: ${s.episodeCount} episodes`);
  }
  console.log(`  Uncategorized: ${uncategorized}`);
  console.log("\n✓ Done!");
}

main().catch((err) => {
  console.error("Failed:", err.message);
  process.exit(1);
});
