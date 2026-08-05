import type { Metadata } from 'next';
import { SeriesPage } from '@/src/components/pages/SeriesPage';
import { pageMetadata } from '@/src/lib/site';
import { getAllSeries } from '@/src/lib/wp';

export const revalidate = 300;

export const metadata: Metadata = pageMetadata({
  title: 'Video Series',
  description:
    'Cinematic Islamic video series exploring the lives of the Prophets, the beautiful names of Allah, and deep heart reflections.',
  path: '/series',
});

export default async function Page() {
  const series = await getAllSeries();
  return <SeriesPage series={series} />;
}
