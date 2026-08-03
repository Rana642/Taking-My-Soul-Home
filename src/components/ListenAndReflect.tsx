import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Pause, Download, Share2, Volume2, ArrowRight } from 'lucide-react';
import { AUDIO_TRACKS } from '../data/mockData';
import { AudioTrack } from '../types';

interface ListenAndReflectProps {
  currentTrack: AudioTrack | null;
  isPlaying: boolean;
  onPlayTrack: (track: AudioTrack) => void;
}

export const ListenAndReflect: React.FC<ListenAndReflectProps> = ({
  currentTrack,
  isPlaying,
  onPlayTrack,
}) => {
  const handleShare = (track: AudioTrack) => {
    if (navigator.share) {
      navigator.share({
        title: track.title,
        text: `Listen to ${track.title} on Taking My Soul Home`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert(`Link to "${track.title}" copied to clipboard!`);
    }
  };

  const handleDownload = (track: AudioTrack) => {
    const link = document.createElement('a');
    link.href = track.audioUrl;
    link.download = `${track.title}.mp3`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
              Listen & Reflect
            </h2>
          </div>
          <Link
            to="/resources"
            className="text-xs font-semibold text-brand-teal-dark hover:text-brand-teal flex items-center space-x-1 group"
          >
            <span>View All Audio</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Audio Tracks List */}
        <div className="space-y-3">
          {AUDIO_TRACKS.map((track) => {
            const isThisPlaying = currentTrack?.id === track.id && isPlaying;
            
            return (
              <div
                key={track.id}
                className={`flex items-center justify-between p-3.5 rounded-xl border transition-all ${
                  currentTrack?.id === track.id
                    ? 'bg-brand-cream border-brand-gold shadow-sm'
                    : 'bg-stone-50 border-stone-200/80 hover:bg-stone-100/70'
                }`}
              >
                <div className="flex items-center space-x-3.5 min-w-0">
                  <div className="w-9 h-9 rounded-full bg-brand-teal-dark text-brand-gold flex items-center justify-center shrink-0 border border-brand-gold/30">
                    <Volume2 className="w-4 h-4 text-brand-gold" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-serif-heading text-sm font-bold text-brand-teal-dark truncate">
                      {track.title}
                    </h4>
                    <p className="text-xs text-stone-500 truncate">
                      {track.author}
                    </p>
                  </div>
                </div>

                {/* Track Action Buttons */}
                <div className="flex items-center space-x-2 shrink-0">
                  <button
                    onClick={() => onPlayTrack(track)}
                    className={`p-2.5 rounded-full shadow-sm transition-all flex items-center justify-center ${
                      isThisPlaying
                        ? 'bg-brand-teal-dark text-brand-gold scale-105'
                        : 'bg-white border border-stone-200 text-brand-teal-dark hover:bg-brand-teal-dark hover:text-brand-gold'
                    }`}
                    title={isThisPlaying ? 'Pause Audio' : 'Play Audio'}
                  >
                    {isThisPlaying ? (
                      <Pause className="w-4 h-4 fill-current" />
                    ) : (
                      <Play className="w-4 h-4 fill-current ml-0.5" />
                    )}
                  </button>

                  <button
                    onClick={() => handleDownload(track)}
                    className="p-2 text-stone-400 hover:text-brand-teal-dark hover:bg-stone-200/50 rounded-lg transition-colors"
                    title="Download Audio MP3"
                  >
                    <Download className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleShare(track)}
                    className="p-2 text-stone-400 hover:text-brand-teal-dark hover:bg-stone-200/50 rounded-lg transition-colors"
                    title="Share Audio"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
