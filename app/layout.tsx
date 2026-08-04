import type { Metadata } from 'next';
import { Open_Sans, Amiri } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';
import { AppShell } from '../src/components/AppShell';
import { JsonLd } from '../src/lib/JsonLd';
import { organizationSchema, websiteSchema } from '../src/lib/schema';
import { SITE_URL, SITE_NAME, SITE_TAGLINE, SITE_DESCRIPTION, DEFAULT_OG_IMAGE, ALLOW_INDEXING } from '../src/lib/site';

// Self-hosted via next/font (no external request, no layout shift, auto-preload).
const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-open-sans',
  display: 'swap',
});

const amiri = Amiri({
  subsets: ['arabic'],
  weight: ['400', '700'],
  variable: '--font-amiri',
  display: 'swap',
});

// Local heading font — next/font/local preloads it and eliminates the FOUT
// that a raw @font-face left in place.
const higuen = localFont({
  src: '../public/fonts/HiguenElegantSerif.otf',
  variable: '--font-higuen',
  display: 'swap',
});

const FULL_TITLE = `${SITE_NAME} — ${SITE_TAGLINE}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: FULL_TITLE,
    template: `%s • ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    title: FULL_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    images: [{ url: DEFAULT_OG_IMAGE }],
  },
  twitter: {
    card: 'summary_large_image',
    title: FULL_TITLE,
    description: SITE_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
  // Gated: preview deploys stay noindex until NEXT_PUBLIC_ALLOW_INDEXING=true.
  robots: ALLOW_INDEXING
    ? { index: true, follow: true }
    : { index: false, follow: false },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${openSans.variable} ${amiri.variable} ${higuen.variable}`}>
      <body className="min-h-screen flex flex-col bg-brand-cream text-ink font-sans antialiased selection:bg-brand-gold/40 selection:text-brand-teal-dark">
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
