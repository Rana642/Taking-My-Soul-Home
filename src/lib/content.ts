import { LATEST_EPISODES, FEATURED_SERIES } from '../data/mockData';
import { EpisodeItem, SeriesItem } from '../types';

/** URL-safe slug from a human title. */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/['’.]/g, '')
    .replace(/&/g, ' ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export const episodeSlug = (ep: EpisodeItem) => slugify(ep.title);
export const seriesSlug = (s: SeriesItem) => slugify(s.title);

export const getAllEpisodes = () => LATEST_EPISODES;
export const getAllSeries = () => FEATURED_SERIES;

export const getEpisodeBySlug = (slug: string) =>
  LATEST_EPISODES.find((e) => episodeSlug(e) === slug);

export const getSeriesBySlug = (slug: string) =>
  FEATURED_SERIES.find((s) => seriesSlug(s) === slug);

export const getEpisodesForSeries = (seriesId: string) =>
  LATEST_EPISODES.filter((e) => e.seriesId === seriesId);

/** Prefer same-series episodes, then fill from the rest. */
export function getRelatedEpisodes(ep: EpisodeItem, limit = 4): EpisodeItem[] {
  const sameSeries = LATEST_EPISODES.filter(
    (e) => e.id !== ep.id && e.seriesId === ep.seriesId,
  );
  const others = LATEST_EPISODES.filter(
    (e) => e.id !== ep.id && e.seriesId !== ep.seriesId,
  );
  return [...sameSeries, ...others].slice(0, limit);
}

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
