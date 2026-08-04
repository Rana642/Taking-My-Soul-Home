'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, X, SkipForward, SkipBack, Download } from 'lucide-react';
import { AudioTrack } from '../types';

interface AudioPlayerGlobalProps {
  track: AudioTrack | null;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onClose: () => void;
}

export const AudioPlayerGlobal: React.FC<AudioPlayerGlobalProps> = ({
  track,
  isPlaying,
  onTogglePlay,
  onClose,
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play().catch(() => {});
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, track]);

  if (!track) return null;

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    const cur = audioRef.current.currentTime;
    const dur = audioRef.current.duration || 1;
    setCurrentTime(cur);
    setDuration(dur);
    setProgress((cur / dur) * 100);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    const seekTime = (parseFloat(e.target.value) / 100) * duration;
    audioRef.current.currentTime = seekTime;
    setProgress(parseFloat(e.target.value));
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remSecs = Math.floor(secs % 60);
    return `${mins}:${remSecs < 10 ? '0' : ''}${remSecs}`;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-brand-teal-dark/95 border-t border-brand-gold/40 shadow-2xl backdrop-blur-md text-white py-3 px-4 sm:px-6">
      <audio
        ref={audioRef}
        src={track.audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onEnded={onTogglePlay}
      />

      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        
        {/* Track Metadata */}
        <div className="flex items-center space-x-3 w-full sm:w-1/3 min-w-0">
          <div className="w-10 h-10 rounded-lg bg-brand-teal-dark border border-brand-gold/30 flex items-center justify-center shrink-0">
            <Volume2 className="w-5 h-5 text-brand-gold" />
          </div>
          <div className="min-w-0">
            <h4 className="font-serif-heading text-sm font-bold text-stone-100 truncate">
              {track.title}
            </h4>
            <p className="text-xs text-brand-gold truncate">{track.author}</p>
          </div>
        </div>

        {/* Playback Controls & Progress Bar */}
        <div className="flex flex-col items-center w-full sm:w-1/3 space-y-1">
          <div className="flex items-center space-x-4">
            <button
              onClick={onTogglePlay}
              className="p-2.5 rounded-full bg-brand-gold text-brand-teal-dark hover:bg-brand-gold transition-transform active:scale-95"
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
            </button>
          </div>

          <div className="w-full flex items-center space-x-2 text-[11px] text-stone-300 font-mono">
            <span>{formatTime(currentTime)}</span>
            <input
              type="range"
              min="0"
              max="100"
              value={progress || 0}
              onChange={handleSeek}
              className="w-full h-1 bg-brand-teal rounded-lg appearance-none cursor-pointer accent-brand-gold"
            />
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Mute & Close */}
        <div className="flex items-center justify-end space-x-3 w-full sm:w-1/3">
          <button
            onClick={() => {
              if (audioRef.current) {
                audioRef.current.muted = !isMuted;
                setIsMuted(!isMuted);
              }
            }}
            className="p-1.5 text-stone-300 hover:text-white"
            title="Mute / Unmute"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
          </button>

          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-white"
            title="Close Player"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};