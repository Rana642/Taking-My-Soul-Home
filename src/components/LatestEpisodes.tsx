import React from 'react';
import Link from 'next/link';
import { Play, Clock, ArrowRight } from 'lucide-react';
import { EpisodeItem } from '../types';

export const LatestEpisodes: React.FC<{ episodes: EpisodeItem[] }> = ({ episodes }) => {
  return (
    <section className="py-14 bg-brand-cream text-ink">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-brand-cream">
          <div>
            <span className="text-xs font-semibold text-brand-teal-dark tracking-widest uppercase">
              Video Releases
            </span>
            <h2 className="font-serif-heading text-3xl font-bold text-brand-teal-dark mt-1">
              Latest Episodes
            </h2>
          </div>

          <Link
            href="/episodes"
            className="mt-3 sm:mt-0 inline-flex items-center space-x-1.5 text-sm font-semibold text-brand-teal-dark hover:text-brand-teal transition-colors group"
          >
            <span>View All Episodes</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Episode Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {episodes.map((ep) => (
            <Link
              key={ep.id}
              href={`/episodes/${ep.slug}`}
              className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-brand-cream flex flex-col justify-between"
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-video overflow-hidden bg-stone-900">
                <img
                  src={ep.thumbnail}
                  alt={ep.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                  <div className="w-11 h-11 rounded-full bg-brand-teal-dark/90 text-brand-gold border border-brand-gold/50 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 fill-brand-gold ml-0.5" />
                  </div>
                </div>

                {/* Duration Badge */}
                <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 text-white text-[10px] font-mono flex items-center space-x-1">
                  <Clock className="w-2.5 h-2.5" />
                  <span>{ep.duration}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-3.5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif-heading text-sm font-bold text-brand-teal-dark group-hover:text-brand-teal line-clamp-2 leading-snug">
                    {ep.title}
                  </h3>
                  <p className="text-xs text-stone-600 mt-1 line-clamp-2">
                    {ep.excerpt}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
                  <span>{ep.seriesTitle}</span>
                  <span className="font-medium text-brand-teal-dark">{ep.date}</span>
                </div>
              </div>

            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};