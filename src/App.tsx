import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { VideoPlayerModal } from './components/VideoPlayerModal';
import { AudioPlayerGlobal } from './components/AudioPlayerGlobal';
import { SearchModal } from './components/SearchModal';
import { DonationModal } from './components/DonationModal';

import { HomePage } from './components/pages/HomePage';
import { SeriesPage } from './components/pages/SeriesPage';
import { EpisodesPage } from './components/pages/EpisodesPage';
import { BlogPage } from './components/pages/BlogPage';
import { ResourcesPage } from './components/pages/ResourcesPage';
import { CommunityPage } from './components/pages/CommunityPage';
import { AboutPage } from './components/pages/AboutPage';
import { ContactPage } from './components/pages/ContactPage';
import { LegalPage } from './components/pages/LegalPage';
import { NotFoundPage } from './components/pages/NotFoundPage';

import { EpisodeItem, AudioTrack } from './types';

export default function App() {
  // Global overlay/modal state — not URL-driven because these layer over any page.
  const [selectedEpisode, setSelectedEpisode] = useState<EpisodeItem | null>(null);
  const [currentAudioTrack, setCurrentAudioTrack] = useState<AudioTrack | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isDonateModalOpen, setIsDonateModalOpen] = useState<boolean>(false);

  const handlePlayAudioTrack = (track: AudioTrack) => {
    if (currentAudioTrack?.id === track.id) {
      setIsPlayingAudio((p) => !p);
    } else {
      setCurrentAudioTrack(track);
      setIsPlayingAudio(true);
    }
  };

  const openDonateModal = () => setIsDonateModalOpen(true);
  const openSearchModal = () => setIsSearchOpen(true);

  return (
    <div className="min-h-screen flex flex-col bg-brand-cream text-ink font-sans selection:bg-brand-gold/40">
      <ScrollToTop />

      <Navbar onOpenSearch={openSearchModal} />

      <div className="flex-1">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                currentAudioTrack={currentAudioTrack}
                isPlayingAudio={isPlayingAudio}
                onPlayAudioTrack={handlePlayAudioTrack}
                onSelectEpisode={setSelectedEpisode}
                onDonateClick={openDonateModal}
              />
            }
          />

          <Route path="/series" element={<SeriesPage onSelectEpisode={setSelectedEpisode} />} />
          <Route path="/episodes" element={<EpisodesPage onSelectEpisode={setSelectedEpisode} />} />

          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPage />} />

          <Route path="/resources" element={<ResourcesPage onPlayTrack={handlePlayAudioTrack} />} />
          <Route path="/community" element={<CommunityPage onDonateClick={openDonateModal} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* Legal pages share one component, dispatched by the :type param */}
          <Route path="/legal/:type" element={<LegalPage />} />
          {/* Back-compat redirects for the bare paths the old app switched on */}
          <Route path="/privacy" element={<Navigate to="/legal/privacy" replace />} />
          <Route path="/terms" element={<Navigate to="/legal/terms" replace />} />
          <Route path="/disclaimer" element={<Navigate to="/legal/disclaimer" replace />} />
          <Route path="/sitemap" element={<Navigate to="/legal/sitemap" replace />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>

      <Footer onDonateClick={openDonateModal} />

      {/* Global modals & overlays */}
      <VideoPlayerModal
        episode={selectedEpisode}
        onClose={() => setSelectedEpisode(null)}
      />

      <AudioPlayerGlobal
        track={currentAudioTrack}
        isPlaying={isPlayingAudio}
        onTogglePlay={() => setIsPlayingAudio((p) => !p)}
        onClose={() => {
          setIsPlayingAudio(false);
          setCurrentAudioTrack(null);
        }}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectEpisode={(e) => setSelectedEpisode(e)}
        onSelectAudio={handlePlayAudioTrack}
      />

      <DonationModal
        isOpen={isDonateModalOpen}
        onClose={() => setIsDonateModalOpen(false)}
      />
    </div>
  );
}
