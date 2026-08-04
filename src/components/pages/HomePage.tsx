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

export const HomePage: React.FC = () => {
  return (
    <main className="animate-fadeIn">
      <HeroDailyVerse />
      <FeatureBadges />
      <FeaturedSeries />
      <LatestEpisodes />

      <section className="py-14 bg-brand-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7">
              <ListenAndReflect />
            </div>
            <div className="lg:col-span-5">
              <MeetFreha />
            </div>
          </div>
        </div>
      </section>

      <SupportAndCommunity />
      <BlogSection />
      <PrayerTimesWidget />
      <DailyReflectionToast />
    </main>
  );
};
