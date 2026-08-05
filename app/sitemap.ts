import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/src/lib/site';
import { getAllSeries, getAllEpisodes, getAllPosts } from '@/src/lib/wp';

export const revalidate = 300;

// Series / episode / blog URLs are pulled live from WordPress.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticPaths = [
    '', '/about', '/series', '/episodes', '/blog',
    '/resources', '/community', '/contact',
    '/legal/privacy', '/legal/terms', '/legal/disclaimer', '/legal/sitemap',
  ];

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: path === '' ? 1 : 0.7,
  }));

  const [series, episodes, posts] = await Promise.all([
    getAllSeries(),
    getAllEpisodes(),
    getAllPosts(),
  ]);

  const seriesEntries: MetadataRoute.Sitemap = series.map((s) => ({
    url: `${SITE_URL}/series/${s.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  const dateOr = (v: string) => {
    const d = new Date(v);
    return isNaN(d.getTime()) ? now : d;
  };

  const episodeEntries: MetadataRoute.Sitemap = episodes.map((ep) => ({
    url: `${SITE_URL}/episodes/${ep.slug}`,
    lastModified: dateOr(ep.date),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  const blogEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: dateOr(post.date),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticEntries, ...seriesEntries, ...episodeEntries, ...blogEntries];
}
