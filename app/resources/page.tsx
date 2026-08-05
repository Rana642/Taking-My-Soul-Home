import type { Metadata } from 'next';
import { ResourcesPage } from '@/src/components/pages/ResourcesPage';
import { pageMetadata } from '@/src/lib/site';
import { getResources, getAudioTracks } from '@/src/lib/wp';

export const revalidate = 300;

export const metadata: Metadata = pageMetadata({
  title: 'Resources & Downloads',
  description:
    'Free downloadable PDF supplication booklets, Zikr guides, and high-quality audio recitations.',
  path: '/resources',
});

export default async function Page() {
  const [resources, tracks] = await Promise.all([getResources(), getAudioTracks()]);
  return <ResourcesPage resources={resources} tracks={tracks} />;
}
