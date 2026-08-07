'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, Eye, Play, Share2, Check, Download, ListChecks } from 'lucide-react';
import { EpisodeItem } from '../types';
import { episodeSlug, youtubeEmbedUrl, isInstagram, isInstagramReel, instagramEmbedUrl } from '../lib/content';

interface EpisodeDetailViewProps {
  episode: EpisodeItem;
  related: EpisodeItem[];
  seriesSlug: string;
}

export const EpisodeDetailView: React.FC<EpisodeDetailViewProps> = ({
  episode,
  related,
  seriesSlug,
}) => {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: episode.title, text: episode.excerpt, url });
      } catch {
        /* user dismissed */
      }
    } else {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <article className="py-10 bg-brand-cream text-ink min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

        {/* Back */}
        <Link
          href="/episodes"
          className="inline-flex items-center space-x-2 text-sm font-semibold text-brand-teal-dark hover:text-brand-teal transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Episodes</span>
        </Link>

        {/* Video / Reel embed */}
        {episode.youtubeEmbedId && isInstagram(episode.youtubeEmbedId) ? (
          <div className={`mx-auto rounded-2xl overflow-hidden bg-brand-teal-dark shadow-xl border border-brand-teal ${
            isInstagramReel(episode.youtubeEmbedId)
              ? 'max-w-sm aspect-[9/16]'
              : 'max-w-lg aspect-square'
          } relative`}>
            <iframe
              className="absolute inset-0 w-full h-full"
              src={instagramEmbedUrl(episode.youtubeEmbedId)}
              title={episode.title}
              allowFullScreen
            />
          </div>
        ) : (
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-brand-teal-dark shadow-xl border border-brand-teal">
            {episode.youtubeEmbedId ? (
              <iframe
                className="absolute inset-0 w-full h-full"
                src={youtubeEmbedUrl(episode.youtubeEmbedId)}
                title={episode.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={episode.thumbnail} alt={episode.title} className="w-full h-full object-cover opacity-80" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-brand-gold text-brand-teal-dark flex items-center justify-center shadow-xl">
                    <Play className="w-7 h-7 fill-current ml-1" />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Header */}
        <header className="space-y-3">
          <Link
            href={`/series/${seriesSlug}`}
            className="inline-block text-xs font-bold text-brand-teal-dark uppercase tracking-wider hover:text-brand-teal"
          >
            {episode.seriesTitle}
          </Link>
          <h1 className="font-serif-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-teal-dark leading-tight">
            {episode.title}
          </h1>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-stone-500 pt-1">
            <span className="flex items-center space-x-1.5"><Calendar className="w-3.5 h-3.5" /><span>{episode.date}</span></span>
            <span className="flex items-center space-x-1.5"><Clock className="w-3.5 h-3.5" /><span>{episode.duration}</span></span>
            {episode.views && (
              <span className="flex items-center space-x-1.5"><Eye className="w-3.5 h-3.5" /><span>{episode.views} views</span></span>
            )}
            <button
              onClick={handleShare}
              className="ml-auto inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-brand-teal-dark text-brand-gold font-semibold hover:bg-brand-teal transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copied ? 'Link copied' : 'Share'}</span>
            </button>
          </div>

          <p className="text-base text-stone-700 leading-relaxed pt-2">{episode.excerpt}</p>
        </header>

        {/* Key takeaways */}
        {episode.keyTakeaways && episode.keyTakeaways.length > 0 && (
          <section className="bg-white rounded-2xl p-6 border border-brand-cream shadow-sm">
            <h2 className="font-serif-heading text-xl font-bold text-brand-teal-dark flex items-center space-x-2">
              <ListChecks className="w-5 h-5 text-brand-gold" />
              <span>Key Takeaways</span>
            </h2>
            <ul className="mt-4 space-y-2.5">
              {episode.keyTakeaways.map((point, i) => (
                <li key={i} className="flex items-start space-x-3 text-sm text-stone-700 leading-relaxed">
                  <Check className="w-4 h-4 text-brand-teal-dark shrink-0 mt-0.5" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Transcript */}
        {episode.transcript && (
          <section className="bg-white rounded-2xl p-6 sm:p-8 border border-brand-cream shadow-sm">
            <h2 className="font-serif-heading text-xl font-bold text-brand-teal-dark">Transcript & Reflection</h2>
            <p className="mt-4 text-sm sm:text-base text-stone-700 leading-relaxed whitespace-pre-line">
              {episode.transcript}
            </p>
          </section>
        )}

        {/* Audio download */}
        {episode.audioDownloadUrl && (
          <a
            href={episode.audioDownloadUrl}
            className="inline-flex items-center space-x-2 px-5 py-3 rounded-xl bg-brand-teal-dark text-brand-gold font-bold text-sm hover:bg-brand-teal transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Download audio (MP3)</span>
          </a>
        )}

        {/* Related */}
        {related.length > 0 && (
          <section className="pt-6 border-t border-brand-cream">
            <h2 className="font-serif-heading text-2xl font-bold text-brand-teal-dark mb-6">More Episodes</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {related.map((ep) => (
                <Link
                  key={ep.id}
                  href={`/episodes/${episodeSlug(ep)}`}
                  className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-brand-cream"
                >
                  <div className="relative aspect-video overflow-hidden bg-stone-900">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={ep.thumbnail} alt={ep.title} className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500" />
                    <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 text-white text-[10px] font-mono">{ep.duration}</span>
                  </div>
                  <div className="p-3.5">
                    <h3 className="font-serif-heading text-sm font-bold text-brand-teal-dark line-clamp-2 group-hover:text-brand-teal leading-snug">
                      {ep.title}
                    </h3>
                    <p className="text-[11px] text-stone-500 mt-1">{ep.seriesTitle}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

      </div>
    </article>
  );
};
