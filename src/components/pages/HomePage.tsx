import React from 'react';
import { HeroDailyVerse } from '../HeroDailyVerse';
import { FeatureBadges } from '../FeatureBadges';
import { FeaturedSeries } from '../FeaturedSeries';
import { LatestEpisodes } from '../LatestEpisodes';
import { ListenAndReflect } from '../ListenAndReflect';
import { MeetFreha } from '../MeetFreha';
import { SupportAndCommunity } from '../SupportAndCommunity';
import { BlogSection } from '../BlogSection';
import { PrayerTimesWidget } from '../PrayerTimesWidget';
import { DailyReflectionToast } from '../DailyReflectionToast';
import { AudioTrack, EpisodeItem } from '../../types';

interface HomePageProps {
  currentAudioTrack: AudioTrack | null;
  isPlayingAudio: boolean;
  onPlayAudioTrack: (track: AudioTrack) => void;
  onSelectEpisode: (ep: EpisodeItem) => void;
  onDonateClick: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  currentAudioTrack,
  isPlayingAudio,
  onPlayAudioTrack,
  onSelectEpisode,
  onDonateClick,
}) => {
  return (
    <main className="animate-fadeIn">
      <HeroDailyVerse />
      <FeatureBadges />
      <FeaturedSeries />
      <LatestEpisodes onSelectEpisode={onSelectEpisode} />

      <section className="py-14 bg-brand-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7">
              <ListenAndReflect
                currentTrack={currentAudioTrack}
                isPlaying={isPlayingAudio}
                onPlayTrack={onPlayAudioTrack}
              />
            </div>
            <div className="lg:col-span-5">
              <MeetFreha />
            </div>
          </div>
        </div>
      </section>

      <SupportAndCommunity onDonateClick={onDonateClick} />
      <BlogSection />
      <PrayerTimesWidget />
      <DailyReflectionToast />
    </main>
  );
};
