'use client';

import React from 'react';
import { Download, FileText, Volume2, BookOpen } from 'lucide-react';
import { ResourceItem, AudioTrack } from '../../types';
import { soundcloudEmbedSrc } from '../../lib/content';

interface ResourcesPageProps {
  resources: ResourceItem[];
  tracks: AudioTrack[];
}

export const ResourcesPage: React.FC<ResourcesPageProps> = ({ resources, tracks }) => {
  return (
    <div className="py-12 bg-brand-cream text-ink min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        {/* Banner */}
        <div className="bg-brand-teal-dark text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-brand-teal">
          <span className="text-xs font-bold text-brand-gold uppercase tracking-widest">
            Free Media & Downloads
          </span>
          <h1 className="font-serif-heading text-4xl sm:text-5xl font-bold mt-2">
            Resources & Downloads
          </h1>
          <p className="text-stone-300 text-sm sm:text-base mt-3 max-w-2xl leading-relaxed">
            Access free downloadable PDF supplication booklets, Zikr guides, and high-quality audio recitations to nourish your soul wherever you go.
          </p>
        </div>

        {/* PDF Booklets Section */}
        <div className="space-y-6">
          <div className="border-b border-brand-cream pb-3">
            <h2 className="font-serif-heading text-2xl font-bold text-brand-teal-dark flex items-center space-x-2">
              <BookOpen className="w-6 h-6 text-brand-gold" />
              <span>Downloadable Booklets & E-Books</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {resources.map((res) => (
              <div
                key={res.id}
                className="bg-white rounded-2xl p-6 border border-brand-cream shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-brand-cream text-brand-teal-dark flex items-center justify-center border border-brand-cream">
                    <FileText className="w-6 h-6" />
                  </div>

                  <span className="text-[11px] font-bold text-brand-teal-dark uppercase tracking-wider block">
                    {res.category}{res.size ? ` • ${res.size}` : ''}
                  </span>

                  <h3 className="font-serif-heading text-lg font-bold text-brand-teal-dark">
                    {res.title}
                  </h3>

                  <p className="text-xs text-stone-600 leading-relaxed">
                    {res.description}
                  </p>
                </div>

                {res.downloadUrl ? (
                  <a
                    href={res.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    className="mt-6 w-full py-2.5 rounded-xl bg-brand-teal-dark text-brand-gold hover:bg-brand-teal text-xs font-bold transition-colors flex items-center justify-center space-x-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Free {res.type === 'audio' ? 'File' : 'PDF'}</span>
                  </a>
                ) : (
                  <span className="mt-6 w-full py-2.5 rounded-xl bg-stone-100 text-stone-400 text-xs font-bold flex items-center justify-center space-x-2 cursor-not-allowed">
                    <Download className="w-4 h-4" />
                    <span>Coming soon</span>
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Audio Collection Section */}
        <div className="space-y-6 pt-6">
          <div className="border-b border-brand-cream pb-3">
            <h2 className="font-serif-heading text-2xl font-bold text-brand-teal-dark flex items-center space-x-2">
              <Volume2 className="w-6 h-6 text-brand-gold" />
              <span>Audio Collection (Darood, Wazifa, Kalam)</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tracks.map((track) => {
              const scSrc = soundcloudEmbedSrc(track.audioUrl);
              return (
                <div
                  key={track.id}
                  className="bg-white rounded-2xl p-5 border border-brand-cream shadow-sm space-y-3"
                >
                  <div className="flex items-start space-x-4 min-w-0">
                    <div className="w-11 h-11 rounded-xl bg-brand-teal-dark text-brand-gold flex items-center justify-center shrink-0">
                      <Volume2 className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-serif-heading text-base font-bold text-brand-teal-dark">
                        {track.title}
                      </h4>
                      <p className="text-xs text-stone-500">{track.author}{track.duration ? ` • ${track.duration}` : ''}</p>
                      {track.description && (
                        <p className="text-[11px] text-stone-600 mt-0.5">{track.description}</p>
                      )}
                    </div>
                  </div>

                  {scSrc ? (
                    <iframe
                      title={track.title}
                      width="100%"
                      height="120"
                      scrolling="no"
                      frameBorder="no"
                      loading="lazy"
                      allow="autoplay"
                      src={scSrc}
                      className="rounded-lg"
                    />
                  ) : track.audioUrl ? (
                    <audio controls preload="none" src={track.audioUrl} className="w-full">
                      Your browser does not support audio.
                    </audio>
                  ) : (
                    <p className="text-xs text-stone-400 italic">Audio coming soon.</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
