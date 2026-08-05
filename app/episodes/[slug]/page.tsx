import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { EpisodeDetailView } from '@/src/components/EpisodeDetailView';
import { JsonLd } from '@/src/lib/JsonLd';
import { videoObjectSchema, breadcrumbSchema } from '@/src/lib/schema';
import { pageMetadata } from '@/src/lib/site';
import { getAllEpisodes, getEpisodeBySlug, getRelatedEpisodes } from '@/src/lib/wp';

export const revalidate = 300;

export async function generateStaticParams() {
  const eps = await getAllEpisodes();
  return eps.map((ep) => ({ slug: ep.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params;
  const ep = await getEpisodeBySlug(slug);
  if (!ep) return {};
  return pageMetadata({
    title: ep.title,
    description: ep.excerpt,
    path: `/episodes/${ep.slug}`,
    image: ep.thumbnail,
  });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [episode, all] = await Promise.all([getEpisodeBySlug(slug), getAllEpisodes()]);
  if (!episode) notFound();

  const related = getRelatedEpisodes(episode, all);

  return (
    <>
      <JsonLd
        data={[
          videoObjectSchema(episode),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Episodes', path: '/episodes' },
            { name: episode.title, path: `/episodes/${episode.slug}` },
          ]),
        ]}
      />
      <EpisodeDetailView episode={episode} related={related} seriesSlug={episode.seriesSlug} />
    </>
  );
}
