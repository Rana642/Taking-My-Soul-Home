import type { Metadata } from 'next';
import { EpisodesPage } from '@/src/components/pages/EpisodesPage';
import { pageMetadata } from '@/src/lib/site';
import { getAllEpisodes } from '@/src/lib/wp';

export const revalidate = 300;

export const metadata: Metadata = pageMetadata({
  title: 'Episodes',
  description:
    'Watch cinematic episodes with full transcripts, reflections, and audio options.',
  path: '/episodes',
});

export default async function Page() {
  const episodes = await getAllEpisodes();
  return <EpisodesPage episodes={episodes} />;
}
