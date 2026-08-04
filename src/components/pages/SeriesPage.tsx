'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Filter } from 'lucide-react';
import { FEATURED_SERIES } from '../../data/mockData';
import { seriesSlug } from '../../lib/content';

export const SeriesPage: React.FC = () => {
  const [activeTag, setActiveTag] = useState<string>('ALL');

  const tags = ['ALL', 'NAMES OF ALLAH', 'HEART REFLECTIONS', 'PROPHETIC TALES', 'WEEKLY WISDOM', 'SPIRITUAL WARFARE'];

  const filteredSeries = activeTag === 'ALL'
    ? FEATURED_SERIES
    : FEATURED_SERIES.filter((s) => s.tag === activeTag);

  return (
    <div className="py-12 bg-brand-cream text-ink min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Banner */}
        <div className="bg-brand-teal-dark text-white rounded-3xl p-8 sm:p-12 mb-12 shadow-xl border border-brand-teal relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <span className="text-xs font-bold text-brand-gold uppercase tracking-widest">
              Cinematic Video Production
            </span>
            <h1 className="font-serif-heading text-4xl sm:text-5xl font-bold mt-2">
              Video Series Collection
            </h1>
            <p className="text-stone-300 text-sm sm:text-base mt-3 leading-relaxed">
              Explore our curated video series exploring the lives of the Prophets, divine names of Allah, and deep heart reflections crafted for continuous spiritual growth.
            </p>
          </div>
          <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-brand-gold/10 rounded-full blur-2xl pointer-events-none" />
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-4 mb-8">
          <Filter className="w-4 h-4 text-brand-teal-dark shrink-0 mr-1" />
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                activeTag === tag
                  ? 'bg-brand-teal-dark text-brand-gold shadow-sm'
                  : 'bg-white text-stone-700 hover:bg-stone-200 border border-stone-200'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSeries.map((series) => (
            <Link
              key={series.id}
              href={`/series/${seriesSlug(series)}`}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-brand-cream flex flex-col justify-between group"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={series.thumbnail}
                  alt={series.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-md bg-brand-teal-dark/90 text-brand-gold text-xs font-bold uppercase">
                  {series.tag}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif-heading text-xl font-bold text-brand-teal-dark group-hover:text-brand-teal">
                    {series.title}
                  </h3>
                  <p className="text-xs font-semibold text-brand-teal-dark mt-1">
                    {series.tagline}
                  </p>
                  <p className="text-xs text-stone-600 mt-3 leading-relaxed">
                    {series.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-stone-500">
                    {series.episodeCount > 0 ? `${series.episodeCount} Episodes` : 'Coming Soon'}
                  </span>
                  <span className="px-4 py-2 rounded-full bg-brand-teal-dark text-brand-gold text-xs font-bold group-hover:bg-brand-teal transition-colors flex items-center space-x-1">
                    <span>View Episodes</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
};
