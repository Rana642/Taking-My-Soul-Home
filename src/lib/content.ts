import { EpisodeItem, SeriesItem } from '../types';

/**
 * Slugs now come from WordPress (real post slugs on each item), so these are
 * just accessors kept for the call sites that still reference them (schema,
 * sitemap). Data fetching lives in `wp.ts`.
 */
export const episodeSlug = (ep: EpisodeItem) => ep.slug;
export const seriesSlug = (s: SeriesItem) => s.slug;

/** "8:45" → "PT8M45S" (ISO 8601 duration for VideoObject schema). */
export function durationToISO(duration?: string): string | undefined {
  if (!duration) return undefined;
  const parts = duration.split(':').map(Number);
  if (parts.some(Number.isNaN)) return undefined;
  let h = 0, m = 0, s = 0;
  if (parts.length === 3) [h, m, s] = parts;
  else if (parts.length === 2) [m, s] = parts;
  else return undefined;
  return `PT${h ? `${h}H` : ''}${m ? `${m}M` : ''}${s ? `${s}S` : ''}` || 'PT0S';
}

/**
 * Pull the 11-char YouTube video id out of whatever an editor pastes into the
 * field — a full watch URL, a youtu.be/shorts/live link, an `<iframe>` embed
 * snippet, an embed URL, or a bare id. Returns '' if nothing usable is found.
 */
export function extractYouTubeId(raw?: string): string {
  if (!raw) return '';
  const s = String(raw).trim();
  const m = s.match(
    /(?:youtube\.com\/(?:embed\/|shorts\/|live\/|watch\?(?:[^"&]*&)*v=)|youtu\.be\/)([A-Za-z0-9_-]{11})/,
  );
  if (m) return m[1];
  if (/^[A-Za-z0-9_-]{11}$/.test(s)) return s; // already a bare id
  return '';
}

/** Robust: accepts a raw id OR any YouTube URL/embed and returns a clean embed URL. */
export const youtubeEmbedUrl = (raw: string) => {
  const id = extractYouTubeId(raw);
  return id ? `https://www.youtube.com/embed/${id}` : '';
};

/* ── Instagram helpers ─────────────────────────────────────────────── */

export const isInstagram = (raw?: string) =>
  !!raw && /instagram\.com\/(p|reel|tv)\//i.test(raw);

export const isInstagramReel = (raw?: string) =>
  !!raw && /instagram\.com\/reel\//i.test(raw);

export function extractInstagramCode(raw?: string): string {
  if (!raw) return '';
  const m = String(raw).trim().match(
    /instagram\.com\/(?:p|reel|tv)\/([A-Za-z0-9_-]+)/i,
  );
  return m ? m[1] : '';
}

export function instagramEmbedUrl(raw?: string): string {
  if (!raw) return '';
  const s = String(raw).trim();
  const m = s.match(/instagram\.com\/(p|reel|tv)\/([A-Za-z0-9_-]+)/i);
  if (!m) return '';
  return `https://www.instagram.com/${m[1]}/${m[2]}/embed/`;
}

