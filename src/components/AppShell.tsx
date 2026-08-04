'use client';

import { useState } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { AudioPlayerGlobal } from './AudioPlayerGlobal';
import { SearchModal } from './SearchModal';
import { DonationModal } from './DonationModal';
import { AppShellContext, AppShellValue } from './app-shell-context';
import { AudioTrack } from '../types';

/**
 * Client shell rendered once by the root layout. Owns the transient overlay
 * state (video / audio / search / donate) and renders Navbar + page content +
 * Footer + the overlays, exposing triggers via AppShellContext.
 */
export function AppShell({ children }: { children: React.ReactNode }) {
  const [currentAudioTrack, setCurrentAudioTrack] = useState<AudioTrack | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDonateOpen, setIsDonateOpen] = useState(false);

  const playAudioTrack = (track: AudioTrack) => {
    if (currentAudioTrack?.id === track.id) {
      setIsPlayingAudio((p) => !p);
    } else {
      setCurrentAudioTrack(track);
      setIsPlayingAudio(true);
    }
  };

  const value: AppShellValue = {
    openSearch: () => setIsSearchOpen(true),
    openDonate: () => setIsDonateOpen(true),
    playAudioTrack,
    currentAudioTrack,
    isPlayingAudio,
  };

  return (
    <AppShellContext.Provider value={value}>
      <Navbar />
      <div className="flex-1">{children}</div>
      <Footer />

      <AudioPlayerGlobal
        track={currentAudioTrack}
        isPlaying={isPlayingAudio}
        onTogglePlay={() => setIsPlayingAudio((p) => !p)}
        onClose={() => {
          setIsPlayingAudio(false);
          setCurrentAudioTrack(null);
        }}
      />

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <DonationModal isOpen={isDonateOpen} onClose={() => setIsDonateOpen(false)} />
    </AppShellContext.Provider>
  );
}
