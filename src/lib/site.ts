export const SITE_URL = 'https://takingmysoulhome.com';

export const ALLOW_INDEXING =
  typeof import.meta !== 'undefined' && (import.meta as any).env?.PUBLIC_ALLOW_INDEXING === 'true';

export const SITE_NAME = 'Taking My Soul Home';

export const SITE_TAGLINE = 'Islamic Knowledge & Cinematic Storytelling';

export const SITE_DESCRIPTION =
  'Reviving hearts through authentic Quranic reflections, prophetic stories, and soothing recitations — an initiative by Freha Wahla.';

/** Default social-share image (1200×630-ish). */
export const DEFAULT_OG_IMAGE = `${SITE_URL}/images/hero-clouds.jpg`;

export function absoluteUrl(path = ''): string {
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

export function fullTitle(title: string): string {
  return `${title} • ${SITE_NAME}`;
}
