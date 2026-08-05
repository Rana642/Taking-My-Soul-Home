import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SeriesDetailView } from '@/src/components/SeriesDetailView';
import { JsonLd } from '@/src/lib/JsonLd';
import { breadcrumbSchema } from '@/src/lib/schema';
import { pageMetadata } from '@/src/lib/site';
import { getAllSeries, getSeriesBySlug, getEpisodesForSeries } from '@/src/lib/wp';

export const revalidate = 300;

export async function generateStaticParams() {
  const series = await getAllSeries();
  return series.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params;
  const series = await getSeriesBySlug(slug);
  if (!series) return {};
  return pageMetadata({
    title: series.title,
    description: series.description,
    path: `/series/${series.slug}`,
    image: series.thumbnail,
  });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const series = await getSeriesBySlug(slug);
  if (!series) notFound();

  const episodes = await getEpisodesForSeries(series.slug);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Series', path: '/series' },
          { name: series.title, path: `/series/${series.slug}` },
        ])}
      />
      <SeriesDetailView series={series} episodes={episodes} />
    </>
  );
}
