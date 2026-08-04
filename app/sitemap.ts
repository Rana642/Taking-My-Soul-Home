import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/src/lib/site';
import { BLOG_POSTS } from '@/src/data/mockData';

// Static list for now; becomes WordPress/GraphQL-driven in Step 9.
export default function sitemap(): MetadataRoute.Sitemap {
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

  const blogEntries: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => {
    const d = new Date(post.date);
    return {
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: isNaN(d.getTime()) ? now : d,
      changeFrequency: 'monthly',
      priority: 0.6,
    };
  });

  return [...staticEntries, ...blogEntries];
}
