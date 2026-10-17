import { config } from "dotenv";
import { writeFileSync, mkdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

config({ path: resolve(ROOT, ".env") });

const TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN;
const IG_ID = process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID;

if (!TOKEN || TOKEN === "PASTE_YOUR_TOKEN_HERE") {
  console.error("ERROR: .env mein INSTAGRAM_ACCESS_TOKEN paste karein pehle.");
  process.exit(1);
}

const FIELDS = "id,caption,media_type,permalink,timestamp,media_url,thumbnail_url";
const LIMIT = 50;

const SERIES_MAP = {
  "#mercifulshades": "Merciful Shades of the Beloved",
  "#soulvsegoseries": "Two Wise Inside: Soul vs. Ego",
  "#twovoicesinsideyou": "Two Wise Inside: Soul vs. Ego",
  "#jummah": "Jumuah Reminder",
  "#jummahmubarak": "Jumuah Reminder",
  "#jummuahreminder": "Jumuah Reminder",
  "#letstallallah": "Let's Tell Allah",
  "#letstell": "Let's Tell Allah",
  "#abreathofreturn": "A Breath of Compassion",
  "#breathofcompassion": "A Breath of Compassion",
  "#dailydua": "Daily Dua",
  "#islamicdua": "Daily Dua",
  "#takingmysoulhome": null,
};

function detectSeries(caption) {
  if (!caption) return "Uncategorized";
  const lower = caption.toLowerCase();
  for (const [tag, series] of Object.entries(SERIES_MAP)) {
    if (series && lower.includes(tag)) return series;
  }
  return "Uncategorized";
}

function parsePost(post) {
  const caption = post.caption || "";
  const lines = caption.split("\n").filter((l) => l.trim());
  const title = lines[0]?.replace(/^[""]|[""]$/g, "").trim() || "Untitled";
  const hashtags = caption.match(/#\w+/g) || [];

  return {
    id: post.id,
    title,
    caption,
    hashtags,
    series: detectSeries(caption),
    media_type: post.media_type,
    permalink: post.permalink,
    timestamp: post.timestamp,
    media_url: post.media_url || null,
    thumbnail_url: post.thumbnail_url || null,
  };
}

async function fetchPage(url) {
  const res = await fetch(url);
  if (!res.ok) {
    const err = await res.json();
    throw new Error(`API Error: ${JSON.stringify(err.error || err)}`);
  }
  return res.json();
}

async function fetchAllMedia() {
  const allPosts = [];
  let url = `https://graph.facebook.com/v26.0/${IG_ID}/media?fields=${FIELDS}&limit=${LIMIT}&access_token=${TOKEN}`;
  let page = 1;

  while (url) {
    console.log(`Fetching page ${page}...`);
    const data = await fetchPage(url);

    if (data.data) {
      allPosts.push(...data.data);
      console.log(`  Got ${data.data.length} posts (total: ${allPosts.length})`);
    }

    url = data.paging?.next || null;
    page++;
  }

  return allPosts;
}

async function main() {
  console.log(`\nFetching all Instagram posts for account ${IG_ID}...\n`);

  const rawPosts = await fetchAllMedia();
  console.log(`\nTotal posts fetched: ${rawPosts.length}`);

  const parsed = rawPosts.map(parsePost);

  const seriesCounts = {};
  const typeCounts = {};
  for (const p of parsed) {
    seriesCounts[p.series] = (seriesCounts[p.series] || 0) + 1;
    typeCounts[p.media_type] = (typeCounts[p.media_type] || 0) + 1;
  }

  console.log("\n--- Media Types ---");
  for (const [type, count] of Object.entries(typeCounts)) {
    console.log(`  ${type}: ${count}`);
  }

  console.log("\n--- Series Breakdown ---");
  for (const [series, count] of Object.entries(seriesCounts).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${series}: ${count}`);
  }

  const outDir = resolve(ROOT, "scripts", "data");
  mkdirSync(outDir, { recursive: true });

  const rawPath = resolve(outDir, "instagram-raw.json");
  writeFileSync(rawPath, JSON.stringify(rawPosts, null, 2));
  console.log(`\nRaw data saved: ${rawPath}`);

  const parsedPath = resolve(outDir, "instagram-parsed.json");
  writeFileSync(parsedPath, JSON.stringify(parsed, null, 2));
  console.log(`Parsed data saved: ${parsedPath}`);

  const bySeriesPath = resolve(outDir, "instagram-by-series.json");
  const bySeries = {};
  for (const p of parsed) {
    if (!bySeries[p.series]) bySeries[p.series] = [];
    bySeries[p.series].push(p);
  }
  writeFileSync(bySeriesPath, JSON.stringify(bySeries, null, 2));
  console.log(`By-series data saved: ${bySeriesPath}`);
}

main().catch((err) => {
  console.error("Failed:", err.message);
  process.exit(1);
});
