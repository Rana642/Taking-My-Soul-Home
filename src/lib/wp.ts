import { SeriesItem, EpisodeItem, BlogPost, AudioTrack, ResourceItem } from '../types';
import { extractYouTubeId } from './content';

/**
 * Headless WordPress data layer. Reads content from WPGraphQL and maps it into
 * the frontend's own types. All reads are ISR-cached (revalidate) so published
 * WordPress changes go live automatically without a redeploy.
 *
 * Endpoint is env-driven because the Hostinger temp URL can change — set
 * WORDPRESS_GRAPHQL_URL in Vercel (point it at cms.takingmysoulhome.com/graphql
 * once that subdomain is live).
 */
const WP_URL =
  process.env.WORDPRESS_GRAPHQL_URL ||
  process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL ||
  'https://cms.takingmysoulhome.com/graphql';

const REVALIDATE = 300; // seconds

async function wpFetch<T = any>(query: string, variables: Record<string, unknown> = {}): Promise<T | null> {
  try {
    const res = await fetch(WP_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables }),
      next: { revalidate: REVALIDATE },
    });
    if (!res.ok) {
      console.error('[wp] HTTP', res.status);
      return null;
    }
    const json = await res.json();
    if (json.errors) console.error('[wp] GraphQL errors', JSON.stringify(json.errors));
    return (json.data as T) ?? null;
  } catch (e) {
    console.error('[wp] fetch failed', e);
    return null;
  }
}

/* ---------- helpers ---------- */

const ENTITIES: Record<string, string> = {
  '&amp;': '&', '&#038;': '&', '&#38;': '&', '&quot;': '"', '&#034;': '"',
  '&#039;': "'", '&#39;': "'", '&#8217;': '’', '&#8216;': '‘',
  '&#8220;': '“', '&#8221;': '”', '&#8211;': '–', '&#8212;': '—',
  '&#8230;': '…', '&lt;': '<', '&gt;': '>', '&nbsp;': ' ',
};
const decode = (s: string) => s.replace(/&[#a-z0-9]+;/gi, (m) => ENTITIES[m] ?? m);
const stripTags = (s?: string | null) => (s || '').replace(/<[^>]+>/g, '');
const clean = (s?: string | null) => decode(stripTags(s)).replace(/\s+/g, ' ').trim();
const first = (v: unknown): string => (Array.isArray(v) ? String(v[0] ?? '') : String(v ?? ''));
const imgUrl = (node: any): string => node?.featuredImage?.node?.sourceUrl || '';

function fmtDate(iso?: string): string {
  if (!iso) return '';
  const d = new Date(iso);
  if (isNaN(d.getTime())) return '';
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: '2-digit' });
}

/* ---------- fragments ---------- */

const SERIES_FIELDS = `
  databaseId title slug content
  seriesFields { tagline isFeatured }
  seriesTags { nodes { name } }
  featuredImage { node { sourceUrl } }
`;

const EPISODE_FIELDS = `
  databaseId title slug excerpt date
  episodeFields {
    duration youtubeEmbedId views transcript
    keyTakeaways { point }
    series { nodes { ... on Series { slug title } } }
  }
  featuredImage { node { sourceUrl } }
`;

const POST_FIELDS = `
  databaseId title slug excerpt content date
  author { node { name } }
  categories { nodes { name } }
  tags { nodes { name } }
  articleFields { readTime isCornerstone }
  featuredImage { node { sourceUrl } }
`;

/* ---------- mappers ---------- */

function mapSeries(n: any, counts: Record<string, number>): SeriesItem {
  return {
    id: String(n.databaseId),
    slug: n.slug,
    title: clean(n.title),
    tagline: n.seriesFields?.tagline || '',
    description: clean(n.content),
    thumbnail: imgUrl(n),
    episodeCount: counts[n.slug] ?? 0,
    tag: n.seriesTags?.nodes?.[0]?.name || '',
    isFeatured: !!n.seriesFields?.isFeatured,
  };
}

function mapEpisode(n: any): EpisodeItem {
  const rel = n.episodeFields?.series?.nodes?.[0];
  return {
    id: String(n.databaseId),
    slug: n.slug,
    seriesId: rel?.slug || '',
    seriesSlug: rel?.slug || '',
    seriesTitle: clean(rel?.title),
    title: clean(n.title),
    excerpt: clean(n.excerpt),
    duration: n.episodeFields?.duration || '',
    thumbnail: imgUrl(n),
    youtubeEmbedId: extractYouTubeId(n.episodeFields?.youtubeEmbedId),
    date: fmtDate(n.date),
    views: n.episodeFields?.views || '',
    transcript: n.episodeFields?.transcript || '',
    keyTakeaways: (n.episodeFields?.keyTakeaways || [])
      .map((k: any) => k?.point)
      .filter(Boolean),
    audioDownloadUrl: n.episodeFields?.audioDownloadUrl || '',
  };
}

function mapPost(n: any): BlogPost {
  const cat = n.categories?.nodes?.[0]?.name || '';
  return {
    id: String(n.databaseId),
    slug: n.slug,
    title: clean(n.title),
    category: cat,
    tag: cat.toUpperCase(),
    author: { name: n.author?.node?.name || 'Freha Wahla', role: 'Founder & Writer' },
    date: fmtDate(n.date),
    readTime: n.articleFields?.readTime || '',
    excerpt: clean(n.excerpt),
    content: n.content || '',
    featuredImage: imgUrl(n),
    tags: (n.tags?.nodes || []).map((t: any) => t.name),
    isCornerstone: !!n.articleFields?.isCornerstone,
  };
}

function mapAudio(n: any): AudioTrack {
  return {
    id: String(n.databaseId),
    title: clean(n.title),
    author: n.audioFields?.author || '',
    category: (first(n.audioFields?.audioCategory) || 'Recitation') as AudioTrack['category'],
    duration: n.audioFields?.duration || '',
    audioUrl: n.audioFields?.audioUrl || '',
    description: clean(n.audioFields?.description),
    coverImage: imgUrl(n),
  };
}

function mapResource(n: any): ResourceItem {
  return {
    id: String(n.databaseId),
    title: clean(n.title),
    type: (first(n.resourceFields?.resourceType) || 'pdf') as ResourceItem['type'],
    category: n.resourceFields?.category || '',
    size: n.resourceFields?.fileSize || '',
    description: clean(n.resourceFields?.description),
    downloadUrl: n.resourceFields?.downloadUrl || '',
    coverImage: imgUrl(n),
  };
}

/* ---------- series (with derived episode counts) ---------- */

export async function getAllSeries(): Promise<SeriesItem[]> {
  const data = await wpFetch<any>(`{
    allSeries(first: 100) { nodes { ${SERIES_FIELDS} } }
    episodes(first: 200) { nodes { slug episodeFields { series { nodes { ... on Series { slug } } } } } }
  }`);
  if (!data?.allSeries) return [];
  const counts: Record<string, number> = {};
  for (const e of data.episodes?.nodes ?? []) {
    const s = e.episodeFields?.series?.nodes?.[0]?.slug;
    if (s) counts[s] = (counts[s] ?? 0) + 1;
  }
  return data.allSeries.nodes.map((n: any) => mapSeries(n, counts));
}

export async function getSeriesBySlug(slug: string): Promise<SeriesItem | null> {
  const data = await wpFetch<any>(
    `query S($slug: ID!) {
      series(id: $slug, idType: SLUG) { ${SERIES_FIELDS} }
      episodes(first: 200) { nodes { episodeFields { series { nodes { ... on Series { slug } } } } } }
    }`,
    { slug },
  );
  if (!data?.series) return null;
  const counts: Record<string, number> = {};
  for (const e of data.episodes?.nodes ?? []) {
    const s = e.episodeFields?.series?.nodes?.[0]?.slug;
    if (s) counts[s] = (counts[s] ?? 0) + 1;
  }
  return mapSeries(data.series, counts);
}

/* ---------- episodes ---------- */

export async function getAllEpisodes(): Promise<EpisodeItem[]> {
  const data = await wpFetch<any>(`{ episodes(first: 200) { nodes { ${EPISODE_FIELDS} } } }`);
  return (data?.episodes?.nodes ?? []).map(mapEpisode);
}

export async function getEpisodeBySlug(slug: string): Promise<EpisodeItem | null> {
  const data = await wpFetch<any>(
    `query E($slug: ID!) { episode(id: $slug, idType: SLUG) { ${EPISODE_FIELDS} } }`,
    { slug },
  );
  return data?.episode ? mapEpisode(data.episode) : null;
}

export async function getEpisodesForSeries(seriesSlug: string): Promise<EpisodeItem[]> {
  const all = await getAllEpisodes();
  return all.filter((e) => e.seriesSlug === seriesSlug);
}

export function getRelatedEpisodes(ep: EpisodeItem, all: EpisodeItem[], limit = 4): EpisodeItem[] {
  const same = all.filter((e) => e.id !== ep.id && e.seriesSlug === ep.seriesSlug);
  const others = all.filter((e) => e.id !== ep.id && e.seriesSlug !== ep.seriesSlug);
  return [...same, ...others].slice(0, limit);
}

/* ---------- posts ---------- */

export async function getAllPosts(): Promise<BlogPost[]> {
  const data = await wpFetch<any>(`{ posts(first: 100) { nodes { ${POST_FIELDS} } } }`);
  return (data?.posts?.nodes ?? []).map(mapPost);
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const data = await wpFetch<any>(
    `query P($slug: ID!) { post(id: $slug, idType: SLUG) { ${POST_FIELDS} } }`,
    { slug },
  );
  return data?.post ? mapPost(data.post) : null;
}

/* ---------- audio + resources ---------- */

export async function getAudioTracks(): Promise<AudioTrack[]> {
  const data = await wpFetch<any>(`{
    audioTracks(first: 100) {
      nodes { databaseId title audioFields { author audioCategory duration audioUrl description } featuredImage { node { sourceUrl } } }
    }
  }`);
  return (data?.audioTracks?.nodes ?? []).map(mapAudio);
}

export async function getResources(): Promise<ResourceItem[]> {
  const data = await wpFetch<any>(`{
    resources(first: 100) {
      nodes { databaseId title resourceFields { resourceType category fileSize description } featuredImage { node { sourceUrl } } }
    }
  }`);
  return (data?.resources?.nodes ?? []).map(mapResource);
}
