import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Film, BookOpen, Volume2, ArrowRight } from 'lucide-react';
import { FEATURED_SERIES, LATEST_EPISODES, BLOG_POSTS, AUDIO_TRACKS } from '../data/mockData';
import { EpisodeItem, AudioTrack } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectEpisode: (episode: EpisodeItem) => void;
  onSelectAudio: (track: AudioTrack) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectEpisode,
  onSelectAudio,
}) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const filteredSeries = FEATURED_SERIES.filter((s) =>
    s.title.toLowerCase().includes(query.toLowerCase()) ||
    s.description.toLowerCase().includes(query.toLowerCase())
  );

  const filteredEpisodes = LATEST_EPISODES.filter((e) =>
    e.title.toLowerCase().includes(query.toLowerCase()) ||
    e.excerpt.toLowerCase().includes(query.toLowerCase())
  );

  const filteredPosts = BLOG_POSTS.filter((p) =>
    p.title.toLowerCase().includes(query.toLowerCase()) ||
    p.excerpt.toLowerCase().includes(query.toLowerCase())
  );

  const filteredAudio = AUDIO_TRACKS.filter((a) =>
    a.title.toLowerCase().includes(query.toLowerCase()) ||
    a.description.toLowerCase().includes(query.toLowerCase())
  );

  const hasResults = query.trim() !== '' && (
    filteredSeries.length > 0 ||
    filteredEpisodes.length > 0 ||
    filteredPosts.length > 0 ||
    filteredAudio.length > 0
  );

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
            <button
              onClick={() => setQuery('')}
              className="text-stone-400 hover:text-white text-xs"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-white rounded-lg"
          >
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
                    key={s.id}
                    onClick={() => {
                      navigate('/series');
                      onClose();
                    }}
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
                    key={e.id}
                    onClick={() => {
                      onSelectEpisode(e);
                      onClose();
                    }}
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
                    key={p.id}
                    onClick={() => {
                      navigate(`/blog/${p.slug}`);
                      onClose();
                    }}
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
                    onClick={() => {
                      onSelectAudio(a);
                      onClose();
                    }}
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
