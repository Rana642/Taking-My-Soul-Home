import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, HeartHandshake } from 'lucide-react';
import { TEAM_INFO } from '../data/mockData';

export const MeetFreha: React.FC = () => {
  const { initiativeBy } = TEAM_INFO;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-brand-cream flex flex-col justify-between">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        
        {/* Profile Details */}
        <div className="md:col-span-7 space-y-3">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-brand-cream text-brand-teal-dark text-xs font-semibold">
            <HeartHandshake className="w-3.5 h-3.5 text-brand-teal-dark" />
            <span>Meet the Writer & Narrator</span>
          </div>

          <h3 className="font-serif-heading text-2xl font-bold text-brand-teal-dark">
            Meet {initiativeBy.name}
          </h3>

          <p className="text-xs text-brand-teal-dark/80 font-medium">
            Writer, voice and the heart behind Taking My Soul Home.
          </p>

          <p className="text-xs text-stone-600 leading-relaxed">
            Her mission is to revive faith, love of Allah, and love of Allah's Beloved ﷺ through meaningful stories, deep tafseer reflections, and soothing recitations.
          </p>

          <div className="pt-2">
            <Link
              to="/about"
              className="inline-flex px-5 py-2.5 rounded-full bg-brand-teal-dark text-white text-xs font-bold hover:bg-brand-teal transition-all items-center space-x-2 shadow-sm"
            >
              <span>Read Her Story</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Profile Image */}
        <div className="md:col-span-5 flex justify-center">
          <div className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-2xl overflow-hidden shadow-md border-2 border-brand-gold">
            <img
              src={initiativeBy.avatar}
              alt={initiativeBy.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-teal-dark/40 to-transparent" />
          </div>
        </div>

      </div>
    </div>
  );
};
