import type { Metadata } from 'next';
import { SeriesPage } from '@/src/components/pages/SeriesPage';
import { pageMetadata } from '@/src/lib/site';

export const metadata: Metadata = pageMetadata({
  title: 'Video Series',
  description:
    'Cinematic Islamic video series exploring the lives of the Prophets, the beautiful names of Allah, and deep heart reflections.',
  path: '/series',
});

export default function Page() {
  return <SeriesPage />;
}
