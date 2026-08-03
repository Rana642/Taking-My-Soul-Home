import React from 'react';
import { Navigate, useParams } from 'react-router-dom';

type LegalType = 'privacy' | 'terms' | 'disclaimer' | 'sitemap';

const TITLES: Record<LegalType, string> = {
  privacy: 'Privacy Policy',
  terms: 'Terms & Conditions',
  disclaimer: 'Disclaimer & AdSense Disclosure',
  sitemap: 'Sitemap & Directory',
};

export const LegalPage: React.FC = () => {
  const { type: rawType } = useParams<{ type: string }>();
  if (!rawType || !(rawType in TITLES)) return <Navigate to="/" replace />;
  const type = rawType as LegalType;

  return (
    <div className="py-12 bg-brand-cream text-ink min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="bg-brand-teal-dark text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-brand-teal">
          <span className="text-xs font-bold text-brand-gold uppercase tracking-widest">
            Legal & Trust
          </span>
          <h1 className="font-serif-heading text-3xl sm:text-4xl font-bold mt-1">
            {TITLES[type]}
          </h1>
          <p className="text-stone-300 text-xs sm:text-sm mt-2">
            Last updated: May 2024 • Taking My Soul Home
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-brand-cream shadow-sm space-y-6 text-xs sm:text-sm text-stone-700 leading-relaxed font-sans">
          {type === 'privacy' && (
            <>
              <h2 className="font-serif-heading text-xl font-bold text-brand-teal-dark">1. Information We Collect</h2>
              <p>Taking My Soul Home collects minimal personal information strictly necessary to provide newsletter subscription updates, order fulfillment for merchandise, and website analytics.</p>
              
              <h2 className="font-serif-heading text-xl font-bold text-brand-teal-dark">2. Use of Information</h2>
              <p>Your email address is only used for sending requested newsletter updates and spiritual supplication downloads. We never sell, rent, or trade user data to third parties.</p>

              <h2 className="font-serif-heading text-xl font-bold text-brand-teal-dark">3. Advertising & Cookies</h2>
              <p>We may partner with Google AdSense to display non-intrusive contextually relevant ads. Third-party vendors use cookies to serve ads based on prior visits to our website.</p>
            </>
          )}

          {type === 'disclaimer' && (
            <>
              <h2 className="font-serif-heading text-xl font-bold text-brand-teal-dark">Spiritual Knowledge Disclaimer</h2>
              <p>All content provided on Taking My Soul Home is for educational, inspirational, and spiritual reflection purposes based on authentic Quranic and Sunnah sources. For formal religious rulings (Fatawa), please consult qualified scholars.</p>
              
              <h2 className="font-serif-heading text-xl font-bold text-brand-teal-dark">Affiliate & Partner Links Disclosure</h2>
              <p>Some resource or product links may be partner or affiliate links that generate a modest commission supporting website hosting and charity efforts at no additional cost to you.</p>
            </>
          )}

          {type === 'terms' && (
            <>
              <h2 className="font-serif-heading text-xl font-bold text-brand-teal-dark">1. Acceptance of Terms</h2>
              <p>By accessing and viewing Taking My Soul Home website, you agree to comply with our community terms and respectful discussion guidelines.</p>

              <h2 className="font-serif-heading text-xl font-bold text-brand-teal-dark">2. Intellectual Property</h2>
              <p>All original video series, audio recitations, and written posts authored by Freha Wahla and produced by crea8ovia are protected under copyright. You may share excerpts with proper attribution.</p>
            </>
          )}

          {type === 'sitemap' && (
            <>
              <h2 className="font-serif-heading text-xl font-bold text-brand-teal-dark">Website Hierarchy & Pages</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Home (Hero, Daily Hadith/Verse, Series, Episodes, Listen & Reflect, Blog, Community)</li>
                <li>Series (Merciful Shades of the Beloved, Let's Tell Allah, A Breath of Compassion, Jumu'ah Reminder)</li>
                <li>Episodes (Video player, Transcripts, Audio download)</li>
                <li>Blog (Categories: Tafseer, Stories, Reminders, Quran Reflections, Wazaif)</li>
                <li>Resources (Downloadable PDF booklets & audio recitations)</li>
                <li>Community & Support (Merchandise store, Donations for charity)</li>
                <li>About (Mission, Vision, Freha Wahla profile, crea8ovia & Aali Jah team leadership)</li>
                <li>Contact (Form & FAQs)</li>
              </ul>
            </>
          )}
        </div>

      </div>
    </div>
  );
};
