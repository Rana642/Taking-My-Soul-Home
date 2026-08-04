import type { Metadata } from 'next';
import { LegalPage } from '@/src/components/pages/LegalPage';
import { pageMetadata } from '@/src/lib/site';

const TITLES: Record<string, string> = {
  privacy: 'Privacy Policy',
  terms: 'Terms & Conditions',
  disclaimer: 'Disclaimer & AdSense Disclosure',
  sitemap: 'Sitemap & Directory',
};

export function generateStaticParams() {
  return Object.keys(TITLES).map((type) => ({ type }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ type: string }> },
): Promise<Metadata> {
  const { type } = await params;
  const title = TITLES[type];
  if (!title) return {};
  return pageMetadata({
    title,
    description: `${title} — Taking My Soul Home.`,
    path: `/legal/${type}`,
  });
}

export default async function Page({ params }: { params: Promise<{ type: string }> }) {
  const { type } = await params;
  return <LegalPage type={type} />;
}
