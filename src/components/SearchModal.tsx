'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, Film, BookOpen, Volume2, ArrowRight } from 'lucide-react';
import { AudioTrack } from '../types';

const WP_URL =
  process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL ||
  'https://cms.takingmysoulhome.com/graphql';

const strip = (s?: string) =>
  (s || '').replace(/<[^>]+>/g, '').replace(/&#0?39;/g, "'").replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();

interface SeriesHit { slug: string; title: string; tagline: string; }
interface EpisodeHit { slug: string; title: string; excerpt: string; seriesTitle: string; duration: string; }
interface PostHit { slug: string; title: string; excerpt: string; category: string; readTime: string; }
interface SearchData { series: SeriesHit[]; episodes: EpisodeHit[]; posts: PostHit[]; audio: AudioTrack[]; }

const EMPTY: SearchData = { series: [], episodes: [], posts: [], audio: [] };

const SEARCH_QUERY = `{
  allSeries(first: 50) { nodes { slug title seriesFields { tagline } } }
  episodes(first: 100) { nodes { slug title excerpt episodeFields { duration series { nodes { ... on Series { title } } } } } }
  posts(first: 100) { nodes { slug title excerpt categories { nodes { name } } articleFields { readTime } } }
  audioTracks(first: 50) { nodes { databaseId title audioFields { author audioCategory duration audioUrl description } featuredImage { node { sourceUrl } } } }
}`;

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [data, setData] = useState<SearchData>(EMPTY);
  const [loaded, setLoaded] = useState(false);

  // Fetch the search index the first time the modal opens.
  useEffect(() => {
    if (!isOpen || loaded) return;
    (async () => {
      try {
        const res = await fetch(WP_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: SEARCH_QUERY }),
        });
        const j = await res.json();
        const d = j?.data || {};
        setData({
          series: (d.allSeries?.nodes || []).map((n: any) => ({
            slug: n.slug, title: strip(n.title), tagline: n.seriesFields?.tagline || '',
          })),
          episodes: (d.episodes?.nodes || []).map((n: any) => ({
            slug: n.slug, title: strip(n.title), excerpt: strip(n.excerpt),
            seriesTitle: strip(n.episodeFields?.series?.nodes?.[0]?.title),
            duration: n.episodeFields?.duration || '',
          })),
          posts: (d.posts?.nodes || []).map((n: any) => ({
            slug: n.slug, title: strip(n.title), excerpt: strip(n.excerpt),
            category: n.categories?.nodes?.[0]?.name || '',
            readTime: n.articleFields?.readTime || '',
          })),
          audio: (d.audioTracks?.nodes || []).map((n: any): AudioTrack => ({
            id: String(n.databaseId), title: strip(n.title), author: n.audioFields?.author || '',
            category: (Array.isArray(n.audioFields?.audioCategory) ? n.audioFields.audioCategory[0] : 'Recitation') as AudioTrack['category'],
            duration: n.audioFields?.duration || '', audioUrl: n.audioFields?.audioUrl || '',
            description: strip(n.audioFields?.description), coverImage: n.featuredImage?.node?.sourceUrl || '',
          })),
        });
        setLoaded(true);
      } catch {
        /* leave results empty on failure */
      }
    })();
  }, [isOpen, loaded]);

  if (!isOpen) return null;

  const q = query.toLowerCase();
  const filteredSeries = q ? data.series.filter((s) => s.title.toLowerCase().includes(q) || s.tagline.toLowerCase().includes(q)) : [];
  const filteredEpisodes = q ? data.episodes.filter((e) => e.title.toLowerCase().includes(q) || e.excerpt.toLowerCase().includes(q)) : [];
  const filteredPosts = q ? data.posts.filter((p) => p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q)) : [];
  const filteredAudio = q ? data.audio.filter((a) => a.title.toLowerCase().includes(q) || a.description.toLowerCase().includes(q)) : [];

  const hasResults =
    query.trim() !== '' &&
    (filteredSeries.length > 0 || filteredEpisodes.length > 0 || filteredPosts.length > 0 || filteredAudio.length > 0);

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-start justify-center p-4 pt-16 sm:pt-24 animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-brand-teal-dark text-white rounded-2xl border border-brand-gold/40 shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">

        {/* Search Header Input */}
        <div className="p-4 sm:p-5 border-b border-brand-teal flex items-center space-x-3 bg-brand-teal-dark">
          <Search className="w-5 h-5 text-brand-gold shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search series, episodes, blog articles, audio tracks..."
            autoFocus
            className="w-full bg-transparent text-white placeholder-stone-400 text-base focus:outline-none"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-stone-400 hover:text-white text-xs">
              Clear
            </button>
          )}
          <button onClick={onClose} className="p-1.5 text-stone-400 hover:text-white rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Container */}
        <div className="p-5 overflow-y-auto space-y-6 flex-1">
          {!query.trim() && (
            <div className="text-center py-8 text-stone-400 text-sm">
              <p>Type keywords to search across Taking My Soul Home library.</p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {['Musa', 'Istighfar', 'Darood', 'Peace of Heart', 'Maryam'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-3 py-1 rounded-full bg-brand-teal-dark text-brand-gold text-xs hover:bg-brand-teal"
                  >
                    "{tag}"
                  </button>
                ))}
              </div>
            </div>
          )}

          {query.trim() && !hasResults && (
            <div className="text-center py-10 text-stone-400 text-sm">
              No matching content found for "{query}". Try another search term.
            </div>
          )}

          {/* Series Results */}
          {filteredSeries.length > 0 && (
            <div className="space-y-2">
              <span className="text-xs font-bold text-brand-gold uppercase tracking-wider block">
                Video Series ({filteredSeries.length})
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {filteredSeries.map((s) => (
                  <div
                    key={s.slug}
                    onClick={() => { router.push(`/series/${s.slug}`); onClose(); }}
                    className="p-3 rounded-xl bg-brand-teal-dark hover:bg-brand-teal cursor-pointer flex items-center space-x-3 transition-colors border border-brand-teal"
                  >
                    <Film className="w-5 h-5 text-brand-gold shrink-0" />
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-white truncate">{s.title}</h4>
                      <p className="text-[11px] text-stone-300 truncate">{s.tagline}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Episode Results */}
          {filteredEpisodes.length > 0 && (
            <div className="space-y-2">
              <span className="text-xs font-bold text-brand-gold uppercase tracking-wider block">
                Episodes ({filteredEpisodes.length})
              </span>
              <div className="space-y-2">
                {filteredEpisodes.map((e) => (
                  <div
                    key={e.slug}
                    onClick={() => { router.push(`/episodes/${e.slug}`); onClose(); }}
                    className="p-3 rounded-xl bg-brand-teal-dark hover:bg-brand-teal cursor-pointer flex items-center justify-between transition-colors border border-brand-teal"
                  >
                    <div>
                      <h4 className="text-xs font-bold text-white">{e.title}</h4>
                      <p className="text-[11px] text-stone-300">{e.seriesTitle} • {e.duration}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-brand-gold" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Blog Results */}
          {filteredPosts.length > 0 && (
            <div className="space-y-2">
              <span className="text-xs font-bold text-brand-gold uppercase tracking-wider block">
                Blog Articles ({filteredPosts.length})
              </span>
              <div className="space-y-2">
                {filteredPosts.map((p) => (
                  <div
                    key={p.slug}
                    onClick={() => { router.push(`/blog/${p.slug}`); onClose(); }}
                    className="p-3 rounded-xl bg-brand-teal-dark hover:bg-brand-teal cursor-pointer flex items-center space-x-3 transition-colors border border-brand-teal"
                  >
                    <BookOpen className="w-5 h-5 text-brand-gold shrink-0" />
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-white truncate">{p.title}</h4>
                      <p className="text-[11px] text-stone-300 truncate">{p.category} • {p.readTime}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Audio Results */}
          {filteredAudio.length > 0 && (
            <div className="space-y-2">
              <span className="text-xs font-bold text-brand-gold uppercase tracking-wider block">
                Audio Recitations ({filteredAudio.length})
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {filteredAudio.map((a) => (
                  <div
                    key={a.id}
                    onClick={() => { router.push('/resources'); onClose(); }}
                    className="p-3 rounded-xl bg-brand-teal-dark hover:bg-brand-teal cursor-pointer flex items-center space-x-3 transition-colors border border-brand-teal"
                  >
                    <Volume2 className="w-5 h-5 text-brand-gold shrink-0" />
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-white truncate">{a.title}</h4>
                      <p className="text-[11px] text-stone-300 truncate">{a.category} • {a.duration}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
