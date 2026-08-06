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

export const isSoundCloud = (raw?: string) => !!raw && /soundcloud\.com/i.test(raw);

/**
 * Build a SoundCloud player iframe `src` from whatever an editor pastes — a
 * track/set URL, a full `<iframe>` embed snippet, or an existing player URL.
 * Returns '' if the input isn't SoundCloud.
 */
export function soundcloudEmbedSrc(raw?: string): string {
  if (!raw) return '';
  const s = String(raw).trim().replace(/&amp;/g, '&');

  // already a player URL (from a pasted embed iframe or copied player link)
  const player = s.match(/https?:\/\/w\.soundcloud\.com\/player\/\?[^\s"']+/i);
  if (player) return player[0];

  // a plain track/set URL → wrap it in the player
  const track = s.match(/https?:\/\/(?:www\.)?soundcloud\.com\/[^\s"']+/i);
  if (track) {
    const params = new URLSearchParams({
      url: track[0],
      color: '#0d373f',
      auto_play: 'false',
      hide_related: 'true',
      show_comments: 'false',
      show_user: 'true',
      show_reposts: 'false',
      visual: 'false',
    });
    return `https://w.soundcloud.com/player/?${params.toString()}`;
  }
  return '';
}
