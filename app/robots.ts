import type { MetadataRoute } from 'next';
import { SITE_URL, ALLOW_INDEXING } from '@/src/lib/site';

export default function robots(): MetadataRoute.Robots {
  // Block everything on preview/staging; open up only once indexing is allowed.
  if (!ALLOW_INDEXING) {
    return { rules: { userAgent: '*', disallow: '/' } };
  }
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
