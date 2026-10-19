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

// --- TAG PATTERNS ---
const TAG_RULES = [
  // Merciful Shades — Names of Allah
  {
    series: "Merciful Shades of the Beloved",
    tags: [
      "albari", "alqahhar", "alkhaliq", "almutakabbir", "aljabbar",
      "asmaulhusna", "asmaaulhusna", "asmaalhusna", "allahnames", "divinenames",
      "alwahhab", "alghaffar", "almumin", "alquddus", "alghafur", "alhalim",
      "almuhaymin", "assalam", "almalik", "alfattah", "arrazzaq", "arrahman",
      "alhakam", "almudhil", "almuizz", "alqabid", "aladl", "alazim", "ashshakur",
      "mercifulshade", "divinename", "knowallah", "allatif", "albasit",
      "arrafiq", "arrafi", "alwadud", "alnur", "alhadi", "alsabur",
    ],
  },
  // Soul vs Ego
  {
    series: "Two Wise Inside: Soul vs. Ego",
    tags: [
      "nafs", "innerstruggle", "selfawareness", "egoawareness", "soulandego",
      "ego", "egotosoul", "egohealing", "egotransformation", "egoandfaith",
      "soulvsego", "twovoicesinsideme", "innershadowwork", "consciousawakenin",
      "twowiseinside", "soulegobattle", "egovssoul",
    ],
  },
  // Jumu'ah
  {
    series: "Jumu'ah Reminder",
    tags: [
      "jummah", "jummahmubarak", "jummuahreminder", "fridayprayer",
      "fridayblessings", "jummahprayer", "jummahreminder", "jumuah", "fridayreminder",
      "friday",
    ],
  },
  // Daily Dua
  {
    series: "Daily Dua",
    tags: ["dailydua", "islamicdua", "dailydhikr", "dhikrdaily"],
  },
  // Let's Tell Allah
  {
    series: "Let's Tell Allah",
    tags: ["letstellallah", "letstell", "letstallallah", "duaforpeace", "duaforstrength", "duaforthheart", "makedua", "duapower"],
  },
  // Seasonal → Jumu'ah Reminder
  {
    series: "Jumu'ah Reminder",
    tags: [
      "eidmubarak", "eid2026", "eidaladha", "eidalfitr2026", "eiddua", "eidvibes", "eidprayers",
      "ramadan", "ramadan2026", "ramadanmubarak", "ramadanreflections", "ramadanhealing", "ramadanpath", "ramadanheart", "ramadanprep",
      "hajj2026", "hajjmubarak", "hajjday", "hajjreflections",
      "shabeqadr", "laylatulqadr", "shabebarat", "shabebaratmubarak", "nightofforgiveness",
      "monthofshaban", "rabialawwal", "rabialawwal1448", "rabiulawwal",
    ],
  },
  // A Breath of Compassion
  {
    series: "A Breath of Compassion",
    tags: [
      "abreathofreturn", "breathofcompassion", "abreathofcompassion",
      "propheticstories", "breathofreturn",
      "hazratyunus", "prophetyunus", "hazratkhadija", "musa",
      "imamhussain", "imamhussainra", "karbala", "karbalalegacy",
      "ashura", "ashurareflection", "quranstories", "muharram", "10thmuharram",
      "seerah", "propheticwisdom", "prophetmuhammad", "sunnah",
      "prophetictradition", "propheticway", "sunnahliving",
    ],
  },
];

// --- TITLE PATTERNS ---
const TITLE_RULES = [
  // Daily Dua: "Yā [Name]…"
  { series: "Daily Dua", re: /^Yā\s+[A-Z]/ },
  // Merciful Shades: Arabic al- prefix or transliterated Names
  { series: "Merciful Shades of the Beloved", re: /ٱل/ },
  { series: "Merciful Shades of the Beloved", re: /Al-[A-Z][a-zīūāḥ]/ },
  { series: "Merciful Shades of the Beloved", re: /Ar-R[aā]/ },
  { series: "Merciful Shades of the Beloved", re: /As-S[aā]/ },
  {
    series: "Merciful Shades of the Beloved",
    re: /Ya\s+(Quddus|[ḤH]al[iī]m|La[tṭ][iī]f|Bas[iī][tṭ]|Ghaf[uū]r|Rah[iī]m|Rahman|Wad[uū]d|Malik|Sal[aā]m|Jabb[aā]r|B[aā]ri|Kh[aā]liq|Fatt[aā]h|Razz[aā]q|Al[iī]m|Sam[iī]|Bas[iī]r|Hakam|Adl|Mu[ʾ']min|Muhaymin|Az[iī]z|A[zẓ][iī]m|Shak[uū]r|Ghaff[aā]r|Wahh[aā]b|Qahh[aā]r|Kab[iī]r|Haf[iī]z|Kar[iī]m|Raq[iī]b|Muj[iī]b|W[aā]si|Hak[iī]m|Wal[iī]|Ham[iī]d|Muhyi|Hayy|Qayy[uū]m|W[aā]hid|Samad|Q[aā]dir|Taww[aā]b|Af[uū]w|Ra[ūu]f|N[uū]r|H[aā]d[iī]|Bad[iī]|B[aā]q[iī]|Sab[uū]r|Mudhil|Mu[ʿ']izz|Q[aā]bi[dḍ])\b/i,
  },
  // Soul vs Ego: first-person inner dialogue
  {
    series: "Two Wise Inside: Soul vs. Ego",
    re: /^I (used to|built stories|thought I needed|don't need to compete|won't bow|keep holding|want more|was always)/i,
  },
  { series: "Two Wise Inside: Soul vs. Ego", re: /\b(ego|nafs)\b/i },
  { series: "Two Wise Inside: Soul vs. Ego", re: /two voices/i },
  { series: "Two Wise Inside: Soul vs. Ego", re: /soul vs/i },
  // Let's Tell Allah
  { series: "Let's Tell Allah", re: /^Ya Allah/i },
  { series: "Let's Tell Allah", re: /^Ya Rabb/i },
  { series: "Let's Tell Allah", re: /tell Allah/i },
  { series: "Let's Tell Allah", re: /^(Some prayers|A quiet prayer|You think your du)/i },
  // Seasonal — Jumu'ah Reminder (general reminders)
  { series: "Jumu'ah Reminder", re: /^(Ramadan |Eid |Hajj )/i },
  { series: "Jumu'ah Reminder", re: /Ramadan Mubarak/i },
  { series: "Jumu'ah Reminder", re: /Eid Mubarak/i },
  { series: "Jumu'ah Reminder", re: /Jummah Mubarak/i },
];

// --- CONTENT (title+excerpt) PATTERNS ---
const CONTENT_RULES = [
  { series: "Merciful Shades of the Beloved", re: /name of allah/i },
  { series: "Merciful Shades of the Beloved", re: /divine name/i },
  { series: "Merciful Shades of the Beloved", re: /beautiful name/i },
  { series: "Merciful Shades of the Beloved", re: /99 names/i },
  { series: "Two Wise Inside: Soul vs. Ego", re: /\bthe ego\b/i },
  { series: "Two Wise Inside: Soul vs. Ego", re: /\bnafs\b(?!.*anfus)/i },
  { series: "Jumu'ah Reminder", re: /ramadan/i },
  { series: "Jumu'ah Reminder", re: /\beid\b/i },
  { series: "Jumu'ah Reminder", re: /\bhajj\b/i },
  { series: "Jumu'ah Reminder", re: /shab.?e.?barat/i },
  { series: "Jumu'ah Reminder", re: /laylatul.?qadr/i },
  { series: "Jumu'ah Reminder", re: /shab.?e.?qadr/i },
  {
    series: "A Breath of Compassion",
    re: /\b(Ayyub|Musa|Yunus|Yusuf|Ibrahim|Isa|Khadija|Hussain)\s*\(?A[Ss]\)?/i,
  },
  { series: "A Breath of Compassion", re: /Prophet\s*ﷺ/i },
  { series: "A Breath of Compassion", re: /prophetic\s+(story|stories|mercy|example)/i },
];

function classify(ep) {
  const tags = (ep.hashtags || []).map((t) => t.toLowerCase().replace("#", ""));
  const title = ep.title || "";
  const text = title + " " + (ep.excerpt || "");

  // 1 — Hashtag rules
  for (const rule of TAG_RULES) {
    for (const tag of tags) {
      if (rule.tags.some((p) => tag.includes(p))) return rule.series;
    }
  }

  // 2 — Title regex rules
  for (const rule of TITLE_RULES) {
    if (rule.re.test(title)) return rule.series;
  }

  // 3 — Content regex rules
  for (const rule of CONTENT_RULES) {
    if (rule.re.test(text)) return rule.series;
  }

  return null;
}

async function main() {
  const DRY = process.argv.includes("--dry");
  console.log(DRY ? "DRY RUN — no writes\n" : "LIVE RUN — will update Sanity\n");

  const episodes = await client.fetch(
    `*[_type == "episode" && !defined(series)]{_id, title, hashtags, excerpt}`
  );
  console.log(`Found ${episodes.length} uncategorized episodes\n`);

  const assignments = {};
  let matched = 0;
  const unmatched = [];

  for (const ep of episodes) {
    const series = classify(ep);
    if (series) {
      if (!assignments[series]) assignments[series] = [];
      assignments[series].push(ep._id);
      matched++;
    } else {
      unmatched.push(ep);
    }
  }

  console.log("--- Matches ---");
  for (const [series, ids] of Object.entries(assignments)) {
    console.log(`  ${series}: +${ids.length}`);
  }
  console.log(`\nMatched: ${matched}, Still uncategorized: ${unmatched.length}\n`);

  if (!DRY) {
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
  }

  if (unmatched.length > 0) {
    console.log(`\n--- Still uncategorized (${unmatched.length}) ---`);
    unmatched.forEach((ep) =>
      console.log(`  ${ep.title.slice(0, 80)}`)
    );
  }

  // Print final counts
  const counts = await client.fetch(`
    *[_type == "series"] | order(order asc) {
      title,
      "episodeCount": count(*[_type == "episode" && series._ref == ^._id])
    }
  `);
  const uncatCount = await client.fetch(
    `count(*[_type == "episode" && !defined(series)])`
  );

  console.log("\n--- Episode Counts ---");
  for (const s of counts) {
    console.log(`  ${s.title}: ${s.episodeCount}`);
  }
  console.log(`  Uncategorized: ${uncatCount}`);
  console.log(`  Total: ${counts.reduce((a, c) => a + c.episodeCount, 0) + uncatCount}`);
}

main().catch((err) => {
  console.error("Failed:", err.message);
  process.exit(1);
});
