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

export const youtubeEmbedUrl = (id: string) => `https://www.youtube.com/embed/${id}`;
