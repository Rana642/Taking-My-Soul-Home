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

  // Find the underlying track/set URL, whether the input is a plain link, a
  // full <iframe> embed, or an already-built player URL. Prefer the public
  // soundcloud.com URL; fall back to the api.soundcloud.com URL in `url=`.
  let track = '';
  const pretty = s.match(/https?:\/\/(?:www\.)?soundcloud\.com\/[^\s"'&?]+/i);
  if (pretty) {
    track = pretty[0];
  } else {
    const inPlayer = s.match(/[?&]url=([^&"'\s]+)/i);
    if (inPlayer) track = decodeURIComponent(inPlayer[1]);
  }
  if (!track) return '';

  // Always rebuild with OUR minimal settings so the big visual artwork and
  // extra SoundCloud chrome never show — just a clean compact waveform bar.
  const params = new URLSearchParams({
    url: track,
    color: '#0d373f',
    auto_play: 'false',
    hide_related: 'true',
    show_comments: 'false',
    show_user: 'false',
    show_reposts: 'false',
    show_teaser: 'false',
    show_artwork: 'false',
    sharing: 'false',
    buying: 'false',
    download: 'false',
    visual: 'false',
  });
  return `https://w.soundcloud.com/player/?${params.toString()}`;
}
