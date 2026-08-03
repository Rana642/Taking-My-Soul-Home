import type { Metadata } from 'next';
import './globals.css';

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
    <html lang="en">
      {/* Google Fonts: Open Sans (body) + Amiri (Arabic). Higuen Elegant Serif
          (headings) is a local @font-face in globals.css. Next hoists these
          <link> tags into <head>. (Can move to next/font later — kept as links
          so the build never depends on fetching fonts at build time.) */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400&family=Open+Sans:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap"
        rel="stylesheet"
      />
      <body className="min-h-screen flex flex-col bg-brand-cream text-ink font-sans antialiased selection:bg-brand-gold/40 selection:text-brand-teal-dark">
        {children}
      </body>
    </html>
  );
}
