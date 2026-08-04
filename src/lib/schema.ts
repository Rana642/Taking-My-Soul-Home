import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, absoluteUrl } from './site';
import type { BlogPost, EpisodeItem } from '../types';
import { episodeSlug, durationToISO, youtubeEmbedUrl } from './content';

const publisher = {
  '@type': 'Organization',
  name: SITE_NAME,
  logo: {
    '@type': 'ImageObject',
    url: absoluteUrl('/logo/logo-full-dark.png'),
  },
};

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: absoluteUrl('/logo/logo-full-dark.png'),
    description: SITE_DESCRIPTION,
    founder: { '@type': 'Person', name: 'Freha Wahla' },
    // TODO(user): add `sameAs` with the real, verified social profile URLs
    // (the current footer links are placeholder platform homepages).
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: 'en',
    // SearchAction intentionally omitted: on-site search is a modal with no
    // indexable results URL. Add once a /search?q= route exists.
  };
}

/** Freha Wahla — the core E-E-A-T author signal. Render on /about. */
export function personSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Freha Wahla',
    jobTitle: 'Author, Writer & Narrator',
    url: absoluteUrl('/about'),
    description:
      'Writer and narrator behind Taking My Soul Home, and author of the books "Taking My Soul Home" and "The Child Within Me" (Austin Macauley Publishers).',
    worksFor: { '@type': 'Organization', name: SITE_NAME },
  };
}

/** Freha's two published books. */
export function booksSchema() {
  const author = { '@type': 'Person', name: 'Freha Wahla' };
  const pub = { '@type': 'Organization', name: 'Austin Macauley Publishers' };
  // TODO(user): add ISBN + a real purchase/publisher `url` for each book.
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Book',
      name: 'Taking My Soul Home',
      author,
      publisher: pub,
      inLanguage: 'en',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Book',
      name: 'The Child Within Me',
      author,
      publisher: pub,
      inLanguage: 'en',
    },
  ];
}

export function blogPostingSchema(post: BlogPost) {
  const url = absoluteUrl(`/blog/${post.slug}`);
  const parsed = new Date(post.date);
  const datePublished = isNaN(parsed.getTime()) ? undefined : parsed.toISOString();
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.featuredImage,
    ...(datePublished ? { datePublished } : {}),
    author: { '@type': 'Person', name: post.author.name },
    publisher,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    url,
    ...(post.tags?.length ? { keywords: post.tags.join(', ') } : {}),
  };
}

export function videoObjectSchema(ep: EpisodeItem) {
  const url = absoluteUrl(`/episodes/${episodeSlug(ep)}`);
  const parsed = new Date(ep.date);
  const uploadDate = isNaN(parsed.getTime()) ? undefined : parsed.toISOString();
  const duration = durationToISO(ep.duration);
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: ep.title,
    description: ep.excerpt,
    thumbnailUrl: ep.thumbnail,
    ...(uploadDate ? { uploadDate } : {}),
    ...(duration ? { duration } : {}),
    ...(ep.youtubeEmbedId ? { embedUrl: youtubeEmbedUrl(ep.youtubeEmbedId) } : {}),
    url,
    publisher,
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
