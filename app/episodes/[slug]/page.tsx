import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { EpisodeDetailView } from '@/src/components/EpisodeDetailView';
import { JsonLd } from '@/src/lib/JsonLd';
import { videoObjectSchema, breadcrumbSchema } from '@/src/lib/schema';
import { pageMetadata } from '@/src/lib/site';
import {
  getAllEpisodes, getAllSeries, getEpisodeBySlug,
  getRelatedEpisodes, seriesSlug, episodeSlug,
} from '@/src/lib/content';

export function generateStaticParams() {
  return getAllEpisodes().map((ep) => ({ slug: episodeSlug(ep) }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params;
  const ep = getEpisodeBySlug(slug);
  if (!ep) return {};
  return pageMetadata({
    title: ep.title,
    description: ep.excerpt,
    path: `/episodes/${episodeSlug(ep)}`,
    image: ep.thumbnail,
  });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const episode = getEpisodeBySlug(slug);
  if (!episode) notFound();

  const related = getRelatedEpisodes(episode);
  // Resolve the parent series' slug for the "series" link.
  const parentSeries = getAllSeries().find((s) => s.id === episode.seriesId);
  const parentSlug = parentSeries ? seriesSlug(parentSeries) : '';

  return (
    <>
      <JsonLd
        data={[
          videoObjectSchema(episode),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Episodes', path: '/episodes' },
            { name: episode.title, path: `/episodes/${episodeSlug(episode)}` },
          ]),
        ]}
      />
      <EpisodeDetailView episode={episode} related={related} seriesSlug={parentSlug} />
    </>
  );
}
