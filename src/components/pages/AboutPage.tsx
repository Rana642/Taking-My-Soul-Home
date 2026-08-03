import React from 'react';
import { Heart, Compass, Sparkles, Shield, BookOpen } from 'lucide-react';
import { InitiativeTeamSection } from '../InitiativeTeamSection';

export const AboutPage: React.FC = () => {
  return (
    <div className="bg-brand-cream text-ink min-h-screen">
      
      {/* Hero Header */}
      <section className="bg-brand-teal-dark text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl">
          <span className="text-xs font-bold text-brand-gold uppercase tracking-widest">
            Our Purpose & Vision
          </span>
          <h1 className="font-serif-heading text-4xl sm:text-5xl font-bold mt-2">
            About Taking My Soul Home
          </h1>
          <p className="text-stone-300 text-sm sm:text-base mt-4 leading-relaxed font-normal">
            Reviving hearts through authentic Quranic reflections, prophetic stories, and soothing recitations created to help every soul find tranquility.
          </p>
        </div>
        <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />
      </section>

      {/* Mission & Vision */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="bg-white p-8 rounded-2xl border border-brand-cream shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-xl bg-brand-cream text-brand-teal-dark flex items-center justify-center border border-brand-cream">
              <Compass className="w-6 h-6" />
            </div>
            <h2 className="font-serif-heading text-2xl font-bold text-brand-teal-dark">
              Our Mission
            </h2>
            <p className="text-sm text-stone-600 leading-relaxed">
              To produce high-quality, authentic, and emotionally resonant Islamic content—bridging classic Quranic wisdom with modern cinematic production. We strive to provide accessible spiritual guidance for believers worldwide seeking peace and remembrance.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-brand-cream shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-xl bg-brand-cream text-brand-teal-dark flex items-center justify-center border border-brand-cream">
              <Sparkles className="w-6 h-6" />
            </div>
            <h2 className="font-serif-heading text-2xl font-bold text-brand-teal-dark">
              Our Vision
            </h2>
            <p className="text-sm text-stone-600 leading-relaxed">
              To build a global sanctuary of spiritual knowledge where every individual can deepen their connection with Allah SWT, find solace during life's trials, and learn the beauty of Prophet Muhammad’s ﷺ teachings.
            </p>
          </div>

        </div>
      </section>

      {/* Freha Wahla Full Bio Section */}
      <section className="py-12 bg-brand-cream border-y border-brand-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-72 h-80 sm:w-80 sm:h-96 rounded-2xl overflow-hidden shadow-xl border-4 border-brand-gold">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80"
                  alt="Freha Wahla Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold text-brand-teal-dark uppercase tracking-wider">
                Founder & Writer
              </span>
              <h2 className="font-serif-heading text-3xl font-bold text-brand-teal-dark">
                Freha Wahla's Journey
              </h2>

              <p className="text-sm text-stone-700 leading-relaxed">
                Freha Wahla created Taking My Soul Home out of a deep personal calling to share the gentle, transformative beauty of Islamic spirituality. As the primary writer and narrator of all TMySH series, her work reflects years of reflection upon the Qur'an and Sunnah.
              </p>

              <blockquote className="p-4 rounded-xl bg-white border-l-4 border-brand-teal-dark text-stone-800 text-sm font-serif-heading italic">
                "Taking My Soul Home is not just a project—it is a humble prayer to return our restless hearts back to their true home in Allah's mercy."
              </blockquote>
            </div>

          </div>
        </div>
      </section>

      {/* USER REQUIREMENT: RELOCATED "AN INITIATIVE BY" SECTION AT BOTTOM OF ABOUT PAGE BEFORE FOOTER */}
      <InitiativeTeamSection />

    </div>
  );
};
