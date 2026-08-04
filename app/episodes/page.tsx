import type { Metadata } from 'next';
import { EpisodesPage } from '@/src/components/pages/EpisodesPage';
import { pageMetadata } from '@/src/lib/site';

export const metadata: Metadata = pageMetadata({
  title: 'Episodes',
  description:
    'Watch cinematic episodes with full transcripts, reflections, and audio options.',
  path: '/episodes',
});

export default function Page() {
  return <EpisodesPage />;
}
