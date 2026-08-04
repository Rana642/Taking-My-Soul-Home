import type { Metadata } from 'next';
import { CommunityPage } from '@/src/components/pages/CommunityPage';
import { pageMetadata } from '@/src/lib/site';

export const metadata: Metadata = pageMetadata({
  title: 'Community',
  description:
    'Join a global family of believers. Merchandise proceeds and donations support charitable projects for those in need.',
  path: '/community',
});

export default function Page() {
  return <CommunityPage />;
}
