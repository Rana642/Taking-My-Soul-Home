import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Static brand assets (logo, fonts, hero images) live in /public and are
  // served at the site root, same as before.
  reactStrictMode: true,

  // TEMPORARY during the Vite→Next migration (plan Step 5): the un-converted
  // src/ components still import react-router-dom, which would fail the build.
  // Remove BOTH of these once every component is ported and Vite is deleted.
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
