'use client';

import React, { useState } from 'react';
import { X, Play, Download, Share2, Check, FileText, MessageSquare, ThumbsUp } from 'lucide-react';
import { EpisodeItem } from '../types';

interface VideoPlayerModalProps {
  episode: EpisodeItem | null;
  onClose: () => void;
}

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({ episode, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'transcript'>('overview');
  const [copied, setCopied] = useState(false);
  const [likes, setLikes] = useState(128);
  const [hasLiked, setHasLiked] = useState(false);

  if (!episode) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleLike = () => {
    setLikes(hasLiked ? likes - 1 : likes + 1);
    setHasLiked(!hasLiked);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-brand-teal-dark text-white rounded-2xl overflow-hidden border border-brand-gold/30 shadow-2xl my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 text-white hover:bg-black hover:text-brand-gold transition-colors"
          title="Close player"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Video Player Area */}
        <div className="relative aspect-video bg-black w-full flex items-center justify-center">
          {episode.youtubeEmbedId ? (
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${episode.youtubeEmbedId}?autoplay=1`}
              title={episode.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="relative w-full h-full">
              <img
                src={episode.thumbnail}
                alt={episode.title}
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-black/40">
                <div className="w-16 h-16 rounded-full bg-brand-gold text-brand-teal-dark flex items-center justify-center shadow-2xl mb-4">
                  <Play className="w-8 h-8 fill-current ml-1" />
                </div>
                <h3 className="font-serif-heading text-2xl font-bold text-white max-w-xl">
                  {episode.title}
                </h3>
                <p className="text-xs text-stone-300 mt-2">
                  Streaming in high definition | Duration: {episode.duration}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Info Content */}
        <div className="p-6 sm:p-8 space-y-5">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-brand-teal pb-4">
            <div>
              <span className="text-xs font-semibold text-brand-gold uppercase tracking-wider">
                {episode.seriesTitle}
              </span>
              <h2 className="font-serif-heading text-2xl font-bold text-stone-50 mt-1">
                {episode.title}
              </h2>
              <div className="flex items-center space-x-3 text-xs text-stone-400 mt-1">
                <span>{episode.date}</span>
                <span>•</span>
                <span>{episode.duration}</span>
                <span>•</span>
                <span>{episode.views || '15K'} Views</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-2">
              <button
                onClick={handleLike}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center space-x-1.5 ${
                  hasLiked ? 'bg-rose-600 text-white' : 'bg-brand-teal-dark text-stone-200 hover:bg-brand-teal'
                }`}
              >
                <ThumbsUp className={`w-3.5 h-3.5 ${hasLiked ? 'fill-current' : ''}`} />
                <span>{likes}</span>
              </button>

              <button
                onClick={handleCopyLink}
                className="px-3.5 py-2 rounded-xl bg-brand-gold text-brand-teal-dark text-xs font-bold hover:bg-brand-gold transition-colors flex items-center space-x-1.5"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Share'}</span>
              </button>
            </div>
          </div>

          {/* Navigation Tabs (Overview vs Transcript) */}
          <div className="flex space-x-4 border-b border-brand-teal">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-2 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors ${
                activeTab === 'overview'
                  ? 'border-brand-gold text-brand-gold'
                  : 'border-transparent text-stone-400 hover:text-stone-200'
              }`}
            >
              Overview & Summary
            </button>
            <button
              onClick={() => setActiveTab('transcript')}
              className={`pb-2 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors flex items-center space-x-1 ${
                activeTab === 'transcript'
                  ? 'border-brand-gold text-brand-gold'
                  : 'border-transparent text-stone-400 hover:text-stone-200'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Full Script & Transcript</span>
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' ? (
            <div className="space-y-3 text-sm text-stone-200 leading-relaxed font-normal">
              <p>{episode.excerpt}</p>
              <p className="text-xs text-stone-400">
                All episodes of Taking My Soul Home are narrated by Freha Wahla and produced with cinematic excellence by crea8ovia.
              </p>
            </div>
          ) : (
            <div className="bg-brand-teal-dark p-4 rounded-xl border border-brand-teal text-xs text-stone-300 space-y-3 font-mono leading-relaxed max-h-48 overflow-y-auto">
              <p>{episode.transcript || 'Full episode transcript is available for reading and download.'}</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};