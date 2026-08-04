import type { Metadata } from 'next';
import { Open_Sans, Amiri } from 'next/font/google';
import './globals.css';
import { AppShell } from '../src/components/AppShell';

// Self-hosted via next/font (no external request, no layout shift).
// Exposed as CSS variables consumed by the @theme block in globals.css.
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

export const metadata: Metadata = {
  title: 'Taking My Soul Home - Islamic Knowledge & Cinematic Storytelling',
  description:
    'Reviving hearts through authentic Quranic reflections, prophetic stories, and soothing recitations — an initiative by Freha Wahla.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${openSans.variable} ${amiri.variable}`}>
      <body className="min-h-screen flex flex-col bg-brand-cream text-ink font-sans antialiased selection:bg-brand-gold/40 selection:text-brand-teal-dark">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
