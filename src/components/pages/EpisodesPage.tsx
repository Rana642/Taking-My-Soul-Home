'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Play, Search, Calendar } from 'lucide-react';
import { LATEST_EPISODES } from '../../data/mockData';
import { episodeSlug } from '../../lib/content';

export const EpisodesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEpisodes = LATEST_EPISODES.filter((ep) =>
    ep.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ep.seriesTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="py-12 bg-brand-cream text-ink min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-6 border-b border-brand-cream">
          <div>
            <span className="text-xs font-semibold text-brand-teal-dark tracking-widest uppercase">
              All Video Episodes
            </span>
            <h1 className="font-serif-heading text-3xl sm:text-4xl font-bold text-brand-teal-dark mt-1">
              Episodes Gallery
            </h1>
            <p className="text-xs text-stone-600 mt-1">
              Watch cinematic episodes with complete transcripts, reflections, and audio options.
            </p>
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search episodes..."
              className="w-full pl-9 pr-4 py-2.5 rounded-full bg-white border border-stone-300 text-xs focus:outline-none focus:border-brand-teal-dark"
            />
          </div>
        </div>

        {/* Episodes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEpisodes.map((ep) => (
            <Link
              key={ep.id}
              href={`/episodes/${episodeSlug(ep)}`}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-brand-cream flex flex-col justify-between group"
            >
              <div className="relative aspect-video bg-stone-900">
                <img
                  src={ep.thumbnail}
                  alt={ep.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-brand-teal-dark text-brand-gold flex items-center justify-center border border-brand-gold/40 shadow-xl group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 fill-current ml-0.5" />
                  </div>
                </div>
                <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-black/80 text-white text-xs font-mono">
                  {ep.duration}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-bold text-brand-teal-dark uppercase tracking-wider">
                    {ep.seriesTitle}
                  </span>
                  <h3 className="font-serif-heading text-lg font-bold text-brand-teal-dark mt-1 group-hover:text-brand-teal">
                    {ep.title}
                  </h3>
                  <p className="text-xs text-stone-600 mt-2 line-clamp-2">
                    {ep.excerpt}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                  <span className="flex items-center space-x-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{ep.date}</span>
                  </span>
                  <span className="font-semibold text-brand-teal-dark">Watch Video</span>
                </div>
              </div>

            </Link>
          ))}
        </div>

      </div>
    </div>
  );
};