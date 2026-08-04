import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { FEATURED_SERIES } from '../data/mockData';
import { seriesSlug } from '../lib/content';

export const FeaturedSeries: React.FC = () => {
  return (
    <section className="py-16 bg-brand-cream text-ink">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-brand-cream">
          <div>
            <span className="text-xs font-semibold text-brand-teal-dark tracking-widest uppercase">
              Cinematic Video Production
            </span>
            <h2 className="font-serif-heading text-3xl sm:text-4xl font-bold text-brand-teal-dark mt-1">
              Featured Series
            </h2>
          </div>
          <Link
            href="/series"
            className="mt-4 sm:mt-0 inline-flex items-center space-x-1.5 text-sm font-semibold text-brand-teal-dark hover:text-brand-teal transition-colors group"
          >
            <span>View All Series</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Series Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">
          {FEATURED_SERIES.map((item) => (
            <Link
              key={item.id}
              href={`/series/${seriesSlug(item)}`}
              className="group relative bg-brand-teal-dark rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer border border-brand-teal/40 hover:-translate-y-1"
            >
              {/* Image Banner */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-95"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-teal-dark via-brand-teal-dark/40 to-transparent" />

                {item.episodeCount > 0 && (
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-brand-teal-dark/80 text-brand-gold backdrop-blur-sm text-[10px] font-bold tracking-wider uppercase border border-brand-gold/30">
                    {item.tag}
                  </span>
                )}
              </div>

              {/* Card Body */}
              <div className="p-4 flex-1 flex flex-col justify-between text-white relative z-10 -mt-6">
                <div>
                  <h3 className="font-serif-heading text-lg font-bold text-stone-100 group-hover:text-brand-gold transition-colors line-clamp-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-stone-300 mt-1.5 line-clamp-2 font-normal">
                    {item.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-brand-teal flex items-center justify-between">
                  <span className="text-[11px] text-stone-400 font-medium">
                    {item.episodeCount > 0 ? `${item.episodeCount} Episodes` : 'Coming Soon'}
                  </span>

                  <span className="text-xs font-semibold text-brand-gold flex items-center space-x-1 group-hover:translate-x-0.5 transition-transform">
                    <span>Watch Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>

            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};
