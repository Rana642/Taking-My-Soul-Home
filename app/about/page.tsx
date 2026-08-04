import type { Metadata } from 'next';
import { AboutPage } from '@/src/components/pages/AboutPage';
import { JsonLd } from '@/src/lib/JsonLd';
import { personSchema, booksSchema, breadcrumbSchema } from '@/src/lib/schema';
import { pageMetadata } from '@/src/lib/site';

export const metadata: Metadata = pageMetadata({
  title: 'About',
  description:
    'Meet Freha Wahla — the writer and narrator behind Taking My Soul Home, and author of two books published by Austin Macauley Publishers.',
  path: '/about',
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          personSchema(),
          ...booksSchema(),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'About', path: '/about' },
          ]),
        ]}
      />
      <AboutPage />
    </>
  );
}
