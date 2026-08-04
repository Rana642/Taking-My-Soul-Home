import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Static brand assets (logo, fonts, hero images) live in /public and are
  // served at the site root, same as before.
  reactStrictMode: true,

  // Back-compat: the old app switched on bare /privacy, /terms, etc.
  // 301 them to the canonical /legal/* URLs (good for SEO).
  async redirects() {
    return [
      { source: '/privacy', destination: '/legal/privacy', permanent: true },
      { source: '/terms', destination: '/legal/terms', permanent: true },
      { source: '/disclaimer', destination: '/legal/disclaimer', permanent: true },
      { source: '/sitemap', destination: '/legal/sitemap', permanent: true },
    ];
  },
};

export default nextConfig;
