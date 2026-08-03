import React from 'react';
import { ExternalLink, Sparkles } from 'lucide-react';
import { TEAM_INFO } from '../data/mockData';

export const InitiativeTeamSection: React.FC = () => {
  const { initiativeBy, executedBy, creativeDirection } = TEAM_INFO;

  return (
    <section className="py-14 bg-brand-cream border-t border-brand-cream text-ink">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-semibold text-brand-teal-dark tracking-widest uppercase">
            Behind Taking My Soul Home
          </span>
          <h2 className="font-serif-heading text-3xl font-bold text-brand-teal-dark mt-1">
            Project Leadership & Execution
          </h2>
          <div className="w-12 h-0.5 bg-brand-gold mx-auto mt-3 rounded-full" />
        </div>

        {/* 3 Team / Attribution Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: An Initiative by Freha Wahla */}
          <div className="bg-white rounded-2xl p-6 border border-brand-cream shadow-sm flex flex-col items-center text-center justify-between hover:shadow-md transition-shadow">
            <div className="flex flex-col items-center">
              <span className="text-xs font-medium text-stone-500 uppercase tracking-wider mb-3">
                {initiativeBy.title}
              </span>
              
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-brand-gold mb-4 shadow-sm">
                <img
                  src={initiativeBy.avatar}
                  alt={initiativeBy.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <h3 className="font-serif-heading text-xl font-bold text-brand-teal-dark">
                {initiativeBy.name}
              </h3>

              <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                {initiativeBy.bio}
              </p>
            </div>
          </div>

          {/* Card 2: Executed by crea8ovia */}
          <div className="bg-brand-teal-dark text-white rounded-2xl p-6 border border-brand-teal shadow-sm flex flex-col items-center text-center justify-between hover:shadow-md transition-shadow">
            <div className="flex flex-col items-center">
              <span className="text-xs font-medium text-brand-gold uppercase tracking-wider mb-3">
                {executedBy.title}
              </span>
              
              <div className="w-20 h-20 rounded-full bg-brand-teal-dark border border-brand-teal flex items-center justify-center mb-4 shadow-inner">
                <span className="font-serif-heading font-extrabold text-lg tracking-wider text-brand-gold">
                  crea<span className="text-white">8</span>ovia
                </span>
              </div>

              <h3 className="font-serif-heading text-xl font-bold text-stone-100">
                {executedBy.company}
              </h3>

              <p className="text-xs text-stone-300 mt-2 leading-relaxed">
                {executedBy.description}
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-brand-teal w-full">
              <a
                href={executedBy.linkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1.5 text-xs font-semibold text-brand-gold hover:underline"
              >
                <span>{executedBy.linkText}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Card 3: Creative Direction by AALI JAH */}
          <div className="bg-white rounded-2xl p-6 border border-brand-cream shadow-sm flex flex-col items-center text-center justify-between hover:shadow-md transition-shadow">
            <div className="flex flex-col items-center">
              <span className="text-xs font-medium text-stone-500 uppercase tracking-wider mb-3">
                {creativeDirection.title}
              </span>
              
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-brand-gold mb-4 shadow-sm">
                <img
                  src={creativeDirection.avatar}
                  alt={creativeDirection.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <h3 className="font-serif-heading text-xl font-bold text-brand-teal-dark">
                {creativeDirection.name}
              </h3>

              <p className="text-xs text-brand-teal-dark font-medium mt-0.5">
                {creativeDirection.role}
              </p>

              <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                {creativeDirection.description}
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-stone-100 w-full">
              <a
                href={creativeDirection.linkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1.5 text-xs font-semibold text-brand-teal-dark hover:underline"
              >
                <span>{creativeDirection.linkText}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
