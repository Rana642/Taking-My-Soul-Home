'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Play, Copy, Check, Sparkles, RefreshCw, Quote, ArrowRight } from 'lucide-react';
import { DAILY_VERSES } from '../data/mockData';
import { DailyVerse } from '../types';

export const HeroDailyVerse: React.FC = () => {
  const [currentVerseIndex, setCurrentVerseIndex] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);
  const [isChanging, setIsChanging] = useState<boolean>(false);

  // Automatically pick verse based on day of year
  useEffect(() => {
    const dayOfYear = Math.floor(
      (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24
    );
    setCurrentVerseIndex(dayOfYear % DAILY_VERSES.length);
  }, []);

  const activeItem: DailyVerse = DAILY_VERSES[currentVerseIndex];

  const handleCopy = () => {
    const textToCopy = `"${activeItem.translation}"\n\n${activeItem.arabic}\n— ${activeItem.reference} (via Taking My Soul Home)`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleNextVerse = () => {
    setIsChanging(true);
    setTimeout(() => {
      setCurrentVerseIndex((prev) => (prev + 1) % DAILY_VERSES.length);
      setIsChanging(false);
    }, 200);
  };

  return (
    <section className="relative -mt-20 pt-20 min-h-[640px] lg:min-h-[720px] bg-brand-cream text-brand-teal-dark overflow-hidden flex items-center py-12 lg:py-16">
      {/* Background Image: real brand sunrise photo, no overlay — text sits
          directly on the sky and reads via native contrast (brand-teal-dark
          on cream sky = ~7.5:1, well above WCAG AA). */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "image-set(url('/images/hero-clouds.webp') type('image/webp'), url('/images/hero-clouds.jpg') type('image/jpeg'))",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Hero Main Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brand-teal-dark/10 border border-brand-teal-dark/25 text-brand-teal-dark text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Authentic Islamic Knowledge & Storytelling</span>
            </div>

            <h1 className="font-serif-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-brand-teal-dark leading-[1.15]">
              A Journey Back <br />
              <span className="font-light italic">to Allah</span>
            </h1>

            <p className="text-brand-teal-dark/80 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Inspiring hearts through stories of the Prophets, the Companions, and timeless Islamic wisdom crafted to nourish your soul.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-3 sm:space-y-0 sm:space-x-4">
              <Link
                href="/series"
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-brand-teal-dark text-brand-cream font-bold text-base shadow-xl hover:shadow-2xl hover:bg-brand-teal active:scale-98 transition-all flex items-center justify-center space-x-2 group"
              >
                <span>Explore Series</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/episodes"
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-transparent hover:bg-brand-teal-dark/10 text-brand-teal-dark border-2 border-brand-teal-dark font-medium text-base transition-all flex items-center justify-center space-x-2"
              >
                <Play className="w-4 h-4 fill-brand-teal-dark text-brand-teal-dark" />
                <span>Watch Trailer</span>
              </Link>
            </div>
          </div>

          {/* Right Column: DAILY UPDATING HADITH / VERSE CARD */}
          <div className="lg:col-span-5">
            <div className="relative bg-gradient-to-br from-brand-teal/90 via-brand-teal-dark/95 to-brand-teal-dark border border-brand-gold/35 rounded-2xl p-6 sm:p-7 shadow-2xl backdrop-blur-md transform transition-all hover:border-brand-gold/60">
              
              {/* Card Header */}
              <div className="flex items-center justify-between pb-4 border-b border-brand-teal/60">
                <div className="flex items-center space-x-2">
                  <div className="p-1.5 rounded-lg bg-brand-gold/15 text-brand-gold">
                    <Quote className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-semibold tracking-wider text-brand-gold uppercase">
                    Daily {activeItem.type === 'verse' ? 'Quran Verse' : 'Hadith'}
                  </span>
                </div>

                <div className="flex items-center space-x-1">
                  {/* Next verse cycle button */}
                  <button
                    onClick={handleNextVerse}
                    className="p-1.5 text-stone-300 hover:text-white hover:bg-brand-teal/50 rounded-lg transition-colors flex items-center space-x-1 text-xs"
                    title="View next daily wisdom"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isChanging ? 'animate-spin' : ''}`} />
                    <span className="hidden sm:inline">Refresh</span>
                  </button>

                  {/* COPY BUTTON REQUIREMENT */}
                  <button
                    onClick={handleCopy}
                    className={`p-2 rounded-lg text-xs font-medium transition-all flex items-center space-x-1.5 ${
                      copied 
                        ? 'bg-emerald-600/80 text-white' 
                        : 'bg-brand-gold text-brand-teal-dark hover:bg-brand-gold font-semibold'
                    }`}
                    title="Copy Verse to Clipboard"
                    aria-label="Copy verse text"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Card Content with Fade Transition */}
              <div className={`mt-5 space-y-4 transition-opacity duration-200 ${isChanging ? 'opacity-20' : 'opacity-100'}`}>
                {/* Arabic Script */}
                <p className="font-arabic text-right text-2xl sm:text-3xl text-brand-gold leading-relaxed tracking-wide dir-rtl font-semibold">
                  {activeItem.arabic}
                </p>

                {/* Transliteration */}
                {activeItem.transliteration && (
                  <p className="text-xs italic text-stone-300 font-light">
                    "{activeItem.transliteration}"
                  </p>
                )}

                {/* English Translation */}
                <p className="text-sm sm:text-base text-stone-100 font-serif-heading italic leading-snug">
                  "{activeItem.translation}"
                </p>

                {/* Reference & Context */}
                <div className="pt-3 border-t border-brand-teal/40 flex items-center justify-between text-xs text-stone-300">
                  <span className="font-semibold text-brand-gold">{activeItem.reference}</span>
                  <span className="text-stone-400 text-[11px] font-light">Updated Daily</span>
                </div>
              </div>

              {/* Toast confirmation */}
              {copied && (
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-emerald-800 text-white text-xs px-3 py-1.5 rounded-full shadow-lg border border-emerald-500/50 flex items-center space-x-1 animate-bounce">
                  <Check className="w-3 h-3 text-emerald-300" />
                  <span>Verse copied for sharing!</span>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};