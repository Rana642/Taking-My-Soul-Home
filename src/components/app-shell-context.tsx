'use client';

import { createContext, useContext } from 'react';
import { AudioTrack, EpisodeItem } from '../types';

/**
 * Global chrome state that used to live in App.tsx and was passed down as
 * props. Under Next's layout/page split, props can't flow from the layout to
 * page children, so these transient overlays (video modal, audio player,
 * search, donate) are exposed through context instead.
 */
export interface AppShellValue {
  openSearch: () => void;
  openDonate: () => void;
  selectEpisode: (ep: EpisodeItem) => void;
  playAudioTrack: (track: AudioTrack) => void;
  currentAudioTrack: AudioTrack | null;
  isPlayingAudio: boolean;
}

export const AppShellContext = createContext<AppShellValue | null>(null);

export function useAppShell(): AppShellValue {
  const ctx = useContext(AppShellContext);
  if (!ctx) {
    throw new Error('useAppShell must be used within <AppShell>');
  }
  return ctx;
}
