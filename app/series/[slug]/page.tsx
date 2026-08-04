import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SeriesDetailView } from '@/src/components/SeriesDetailView';
import { JsonLd } from '@/src/lib/JsonLd';
import { breadcrumbSchema } from '@/src/lib/schema';
import { pageMetadata } from '@/src/lib/site';
import {
  getAllSeries, getSeriesBySlug, getEpisodesForSeries, seriesSlug,
} from '@/src/lib/content';

export function generateStaticParams() {
  return getAllSeries().map((s) => ({ slug: seriesSlug(s) }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params;
  const series = getSeriesBySlug(slug);
  if (!series) return {};
  return pageMetadata({
    title: series.title,
    description: series.description,
    path: `/series/${seriesSlug(series)}`,
    image: series.thumbnail,
  });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const series = getSeriesBySlug(slug);
  if (!series) notFound();

  const episodes = getEpisodesForSeries(series.id);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Series', path: '/series' },
          { name: series.title, path: `/series/${seriesSlug(series)}` },
        ])}
      />
      <SeriesDetailView series={series} episodes={episodes} />
    </>
  );
}
