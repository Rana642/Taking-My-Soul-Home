import type { Metadata } from 'next';

/**
 * Canonical site URL. Override per-environment with NEXT_PUBLIC_SITE_URL.
 * TODO(user): confirm the production domain — assumed from the contact
 * address contact@takingmysoulhome.com.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://takingmysoulhome.com'
).replace(/\/$/, '');

/**
 * Search-engine indexing gate. OFF by default so preview/staging deploys
 * (with placeholder content) are never indexed. Set NEXT_PUBLIC_ALLOW_INDEXING
 * = "true" in Vercel at launch, once real content is in and the real domain is
 * connected.
 */
export const ALLOW_INDEXING = process.env.NEXT_PUBLIC_ALLOW_INDEXING === 'true';

export const SITE_NAME = 'Taking My Soul Home';

export const SITE_TAGLINE = 'Islamic Knowledge & Cinematic Storytelling';

export const SITE_DESCRIPTION =
  'Reviving hearts through authentic Quranic reflections, prophetic stories, and soothing recitations — an initiative by Freha Wahla.';

/** Default social-share image (1200×630-ish). */
export const DEFAULT_OG_IMAGE = `${SITE_URL}/images/hero-clouds.jpg`;

export function absoluteUrl(path = ''): string {
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

/**
 * Build a full per-page Metadata object (title + description + canonical +
 * Open Graph + Twitter card). `title` is the short form; the root layout's
 * title template appends the site name for the <title> tag.
 */
export function pageMetadata({
  title,
  description = SITE_DESCRIPTION,
  path = '/',
  image = DEFAULT_OG_IMAGE,
}: {
  title: string;
  description?: string;
  path?: string;
  image?: string;
}): Metadata {
  const url = absoluteUrl(path);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      title: `${title} • ${SITE_NAME}`,
      description,
      url,
      images: [{ url: image }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} • ${SITE_NAME}`,
      description,
      images: [image],
    },
  };
}
