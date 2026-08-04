'use client';

import React, { useState } from 'react';
import { Play, ArrowRight, Film, Sparkles, Filter } from 'lucide-react';
import { FEATURED_SERIES, LATEST_EPISODES } from '../../data/mockData';
import { SeriesItem } from '../../types';
import { useAppShell } from '../app-shell-context';

export const SeriesPage: React.FC = () => {
  const { selectEpisode } = useAppShell();
  const [selectedSeries, setSelectedSeries] = useState<SeriesItem | null>(null);
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
            <div
              key={series.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-brand-cream flex flex-col justify-between"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={series.thumbnail}
                  alt={series.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-md bg-brand-teal-dark/90 text-brand-gold text-xs font-bold uppercase">
                  {series.tag}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif-heading text-xl font-bold text-brand-teal-dark">
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
                  
                  <button
                    onClick={() => setSelectedSeries(series)}
                    className="px-4 py-2 rounded-full bg-brand-teal-dark text-brand-gold text-xs font-bold hover:bg-brand-teal transition-colors flex items-center space-x-1"
                  >
                    <span>View Episodes</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Selected Series Detail Drawer/Modal */}
        {selectedSeries && (
          <div className="mt-16 bg-white p-8 rounded-2xl border border-brand-cream shadow-lg">
            <div className="flex justify-between items-center mb-6 pb-4 border-b">
              <div>
                <span className="text-xs font-bold text-brand-teal-dark uppercase">{selectedSeries.tag}</span>
                <h3 className="font-serif-heading text-2xl font-bold text-brand-teal-dark">{selectedSeries.title} Episodes</h3>
              </div>
              <button
                onClick={() => setSelectedSeries(null)}
                className="text-xs font-bold text-stone-500 hover:text-stone-800"
              >
                Close View
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {LATEST_EPISODES.map((ep) => (
                <div
                  key={ep.id}
                  onClick={() => selectEpisode(ep)}
                  className="p-4 rounded-xl bg-brand-cream border border-stone-200 hover:border-brand-teal-dark cursor-pointer transition-all flex items-center space-x-4"
                >
                  <div className="w-10 h-10 rounded-full bg-brand-teal-dark text-brand-gold flex items-center justify-center shrink-0">
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </div>
                  <div>
                    <h4 className="font-serif-heading text-sm font-bold text-brand-teal-dark">{ep.title}</h4>
                    <p className="text-xs text-stone-500">{ep.duration} • {ep.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};