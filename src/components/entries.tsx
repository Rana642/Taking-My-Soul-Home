import { AppShell } from './AppShell';
import { HomePage } from './pages/HomePage';
import { SeriesPage } from './pages/SeriesPage';
import { EpisodesPage } from './pages/EpisodesPage';
import { BlogPage } from './pages/BlogPage';
import { AboutPage } from './pages/AboutPage';
import { CommunityPage } from './pages/CommunityPage';
import { ContactPage } from './pages/ContactPage';
import { ResourcesPage } from './pages/ResourcesPage';
import { LegalPage } from './pages/LegalPage';
import { SeriesDetailView } from './SeriesDetailView';
import { EpisodeDetailView } from './EpisodeDetailView';
import { BlogPostDetailView } from './BlogPostDetailView';

function withShell<P extends Record<string, any>>(Component: React.ComponentType<P>) {
  const Wrapped = (props: P) => (
    <AppShell>
      <Component {...props} />
    </AppShell>
  );
  Wrapped.displayName = `WithShell(${Component.displayName || Component.name})`;
  return Wrapped;
}

export const HomeEntry = withShell(HomePage);
export const SeriesListEntry = withShell(SeriesPage);
export const EpisodesListEntry = withShell(EpisodesPage);
export const BlogListEntry = withShell(BlogPage);
export const AboutEntry = withShell(AboutPage);
export const CommunityEntry = withShell(CommunityPage);
export const ContactEntry = withShell(ContactPage);
export const ResourcesEntry = withShell(ResourcesPage);
export const LegalEntry = withShell(LegalPage);
export const SeriesDetailEntry = withShell(SeriesDetailView);
export const EpisodeDetailEntry = withShell(EpisodeDetailView);
export const BlogPostDetailEntry = withShell(BlogPostDetailView);
