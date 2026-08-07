'use client';

import React from 'react';
import Link from 'next/link';
import { Volume2, ArrowRight } from 'lucide-react';
import { AudioTrack } from '../types';

export const ListenAndReflect: React.FC<{ tracks: AudioTrack[] }> = ({ tracks }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-brand-cream flex flex-col justify-between">
      <div>
        {/* Section Title */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-5">
          <div>
            <span className="text-xs font-semibold text-brand-teal-dark tracking-widest uppercase">
              Audio Recitations
            </span>
            <h2 className="font-serif-heading text-2xl font-bold text-brand-teal-dark mt-0.5">
              Listen &amp; Reflect
            </h2>
          </div>
          <Link
            href="/resources"
            className="text-xs font-semibold text-brand-teal-dark hover:text-brand-teal flex items-center space-x-1 group"
          >
            <span>View All Audio</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Audio Tracks List */}
        <div className="space-y-4">
          {tracks.slice(0, 4).map((track) => (
            <div key={track.id} className="space-y-2">
              <div className="flex items-center space-x-3 min-w-0">
                <div className="w-9 h-9 rounded-full bg-brand-teal-dark text-brand-gold flex items-center justify-center shrink-0 border border-brand-gold/30">
                  <Volume2 className="w-4 h-4 text-brand-gold" />
                </div>
                <div className="min-w-0">
                  <h4 className="font-serif-heading text-sm font-bold text-brand-teal-dark truncate">
                    {track.title}
                  </h4>
                  <p className="text-xs text-stone-500 truncate">{track.author}</p>
                </div>
              </div>

              {track.audioUrl ? (
                <audio controls preload="none" src={track.audioUrl} className="w-full">
                  Your browser does not support audio.
                </audio>
              ) : (
                <p className="text-xs text-stone-400 italic pl-12">Audio coming soon.</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
