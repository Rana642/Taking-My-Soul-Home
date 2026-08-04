import type { Metadata } from 'next';
import { ContactPage } from '@/src/components/pages/ContactPage';
import { pageMetadata } from '@/src/lib/site';

export const metadata: Metadata = pageMetadata({
  title: 'Contact',
  description:
    'Questions about our video series, audio recitations, or collaborations? Reach out to the team.',
  path: '/contact',
});

export default function Page() {
  return <ContactPage />;
}
