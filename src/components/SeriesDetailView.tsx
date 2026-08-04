import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Play, Film, Clock } from 'lucide-react';
import { EpisodeItem, SeriesItem } from '../types';
import { episodeSlug } from '../lib/content';

interface SeriesDetailViewProps {
  series: SeriesItem;
  episodes: EpisodeItem[];
}

export const SeriesDetailView: React.FC<SeriesDetailViewProps> = ({ series, episodes }) => {
  return (
    <div className="py-10 bg-brand-cream text-ink min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

        <Link
          href="/series"
          className="inline-flex items-center space-x-2 text-sm font-semibold text-brand-teal-dark hover:text-brand-teal transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Series</span>
        </Link>

        {/* Banner */}
        <div className="relative rounded-3xl overflow-hidden bg-brand-teal-dark text-white shadow-xl border border-brand-teal">
          <div className="absolute inset-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={series.thumbnail} alt={series.title} className="w-full h-full object-cover opacity-25" />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-teal-dark via-brand-teal-dark/85 to-brand-teal-dark/40" />
          </div>
          <div className="relative z-10 p-8 sm:p-12 max-w-2xl">
            <span className="text-xs font-bold text-brand-gold uppercase tracking-widest">{series.tag}</span>
            <h1 className="font-serif-heading text-4xl sm:text-5xl font-bold mt-2">{series.title}</h1>
            <p className="text-brand-gold font-semibold mt-2">{series.tagline}</p>
            <p className="text-stone-300 text-sm sm:text-base mt-3 leading-relaxed">{series.description}</p>
            <div className="mt-4 inline-flex items-center space-x-2 text-xs text-stone-300">
              <Film className="w-4 h-4 text-brand-gold" />
              <span>{series.episodeCount > 0 ? `${series.episodeCount} Episodes` : 'Coming Soon'}</span>
            </div>
          </div>
        </div>

        {/* Episodes */}
        <section className="space-y-4">
          <h2 className="font-serif-heading text-2xl font-bold text-brand-teal-dark">Episodes in this Series</h2>

          {episodes.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 border border-brand-cream text-center text-sm text-stone-600">
              Episodes for this series are coming soon, insha’Allah.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {episodes.map((ep) => (
                <Link
                  key={ep.id}
                  href={`/episodes/${episodeSlug(ep)}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-brand-cream flex flex-col"
                >
                  <div className="relative aspect-video overflow-hidden bg-stone-900">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={ep.thumbnail} alt={ep.title} className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-brand-teal-dark/90 text-brand-gold border border-brand-gold/50 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      </div>
                    </div>
                    <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 text-white text-[10px] font-mono flex items-center space-x-1">
                      <Clock className="w-2.5 h-2.5" /><span>{ep.duration}</span>
                    </span>
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <h3 className="font-serif-heading text-base font-bold text-brand-teal-dark group-hover:text-brand-teal line-clamp-2 leading-snug">
                      {ep.title}
                    </h3>
                    <p className="text-xs text-stone-600 mt-1.5 line-clamp-2">{ep.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

      </div>
    </div>
  );
};
