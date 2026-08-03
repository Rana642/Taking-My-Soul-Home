import React from 'react';
import { Download, FileText, Volume2, BookOpen, CheckCircle } from 'lucide-react';
import { RESOURCES, AUDIO_TRACKS } from '../../data/mockData';
import { AudioTrack } from '../../types';

interface ResourcesPageProps {
  onPlayTrack: (track: AudioTrack) => void;
}

export const ResourcesPage: React.FC<ResourcesPageProps> = ({ onPlayTrack }) => {
  const handleDownload = (itemTitle: string) => {
    alert(`Downloading "${itemTitle}"... Thank you for exploring Taking My Soul Home resources!`);
  };

  return (
    <div className="py-12 bg-brand-cream text-ink min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Banner */}
        <div className="bg-brand-teal-dark text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-brand-teal">
          <span className="text-xs font-bold text-brand-gold uppercase tracking-widest">
            Free Media & Downloads
          </span>
          <h1 className="font-serif-heading text-4xl sm:text-5xl font-bold mt-2">
            Resources & Downloads
          </h1>
          <p className="text-stone-300 text-sm sm:text-base mt-3 max-w-2xl leading-relaxed">
            Access free downloadable PDF supplication booklets, Zikr guides, and high-quality audio recitations to nourish your soul wherever you go.
          </p>
        </div>

        {/* PDF Booklets Section */}
        <div className="space-y-6">
          <div className="border-b border-brand-cream pb-3">
            <h2 className="font-serif-heading text-2xl font-bold text-brand-teal-dark flex items-center space-x-2">
              <BookOpen className="w-6 h-6 text-brand-gold" />
              <span>Downloadable Booklets & E-Books</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {RESOURCES.map((res) => (
              <div
                key={res.id}
                className="bg-white rounded-2xl p-6 border border-brand-cream shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-brand-cream text-brand-teal-dark flex items-center justify-center border border-brand-cream">
                    <FileText className="w-6 h-6" />
                  </div>
                  
                  <span className="text-[11px] font-bold text-brand-teal-dark uppercase tracking-wider block">
                    {res.category} • {res.size}
                  </span>

                  <h3 className="font-serif-heading text-lg font-bold text-brand-teal-dark">
                    {res.title}
                  </h3>

                  <p className="text-xs text-stone-600 leading-relaxed">
                    {res.description}
                  </p>
                </div>

                <button
                  onClick={() => handleDownload(res.title)}
                  className="mt-6 w-full py-2.5 rounded-xl bg-brand-teal-dark text-brand-gold hover:bg-brand-teal text-xs font-bold transition-colors flex items-center justify-center space-x-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Free PDF</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Audio Collection Section */}
        <div className="space-y-6 pt-6">
          <div className="border-b border-brand-cream pb-3">
            <h2 className="font-serif-heading text-2xl font-bold text-brand-teal-dark flex items-center space-x-2">
              <Volume2 className="w-6 h-6 text-brand-gold" />
              <span>Audio Collection (Darood, Wazifa, Kalam)</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {AUDIO_TRACKS.map((track) => (
              <div
                key={track.id}
                className="bg-white rounded-2xl p-5 border border-brand-cream shadow-sm flex items-center justify-between"
              >
                <div className="flex items-center space-x-4 min-w-0">
                  <div className="w-12 h-12 rounded-xl bg-brand-teal-dark text-brand-gold flex items-center justify-center shrink-0">
                    <Volume2 className="w-6 h-6" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-serif-heading text-base font-bold text-brand-teal-dark truncate">
                      {track.title}
                    </h4>
                    <p className="text-xs text-stone-500 truncate">{track.author} • {track.duration}</p>
                    <p className="text-[11px] text-stone-600 truncate mt-0.5">{track.description}</p>
                  </div>
                </div>

                <button
                  onClick={() => onPlayTrack(track)}
                  className="px-4 py-2 rounded-xl bg-brand-gold text-brand-teal-dark font-bold text-xs hover:bg-brand-gold shrink-0 ml-3 shadow-xs"
                >
                  Play Audio
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
