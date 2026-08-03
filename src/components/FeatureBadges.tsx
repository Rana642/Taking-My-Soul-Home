import React from 'react';
import { ShieldCheck, Film, Sparkles, BookOpen, Users } from 'lucide-react';

export const FeatureBadges: React.FC = () => {
  const badges = [
    {
      icon: <ShieldCheck className="w-5 h-5 text-brand-gold" />,
      title: 'Authentic Content',
      desc: 'Based on Qur\'an & Sunnah'
    },
    {
      icon: <Film className="w-5 h-5 text-brand-gold" />,
      title: 'Cinematic Storytelling',
      desc: 'Emotional & Engaging'
    },
    {
      icon: <Sparkles className="w-5 h-5 text-brand-gold" />,
      title: 'Spiritual Growth',
      desc: 'For Every Believer'
    },
    {
      icon: <BookOpen className="w-5 h-5 text-brand-gold" />,
      title: 'Knowledge That Lasts',
      desc: 'Timeless Lessons'
    },
    {
      icon: <Users className="w-5 h-5 text-brand-gold" />,
      title: 'Ummah & Community',
      desc: 'Together in Goodness'
    }
  ];

  return (
    <section className="bg-brand-teal-dark border-y border-brand-teal py-6 sm:py-8 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {badges.map((b, idx) => (
            <div 
              key={idx}
              className="flex items-center space-x-3 p-3 sm:p-4 rounded-xl bg-brand-teal-dark/60 border border-brand-teal/50 hover:border-brand-gold/40 transition-all group"
            >
              <div className="p-2.5 rounded-lg bg-brand-teal-dark border border-brand-teal group-hover:bg-brand-teal transition-colors shrink-0">
                {b.icon}
              </div>
              <div className="min-w-0">
                <h4 className="font-medium text-xs sm:text-sm text-stone-100 truncate group-hover:text-brand-gold transition-colors">
                  {b.title}
                </h4>
                <p className="text-[11px] sm:text-xs text-stone-400 truncate">
                  {b.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
