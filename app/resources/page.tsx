import type { Metadata } from 'next';
import { ResourcesPage } from '@/src/components/pages/ResourcesPage';
import { pageMetadata } from '@/src/lib/site';

export const metadata: Metadata = pageMetadata({
  title: 'Resources & Downloads',
  description:
    'Free downloadable PDF supplication booklets, Zikr guides, and high-quality audio recitations.',
  path: '/resources',
});

export default function Page() {
  return <ResourcesPage />;
}
