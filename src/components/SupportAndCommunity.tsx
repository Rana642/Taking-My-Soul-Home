'use client';

import React, { useState } from 'react';
import { Heart, Send, Sparkles, BookOpen, Layers, CheckCircle2 } from 'lucide-react';
import { useAppShell } from './app-shell-context';

export const SupportAndCommunity: React.FC = () => {
  const { openDonate } = useAppShell();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <section className="py-12 bg-brand-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Support Our Mission Box */}
          <div className="lg:col-span-7 bg-brand-cream rounded-2xl p-6 sm:p-8 border border-brand-cream flex flex-col justify-between shadow-sm">
            <div>
              <span className="text-xs font-semibold text-brand-teal-dark tracking-widest uppercase">
                Sustain Spiritual Knowledge
              </span>
              <h3 className="font-serif-heading text-2xl sm:text-3xl font-bold text-brand-teal-dark mt-1">
                Support Our Mission
              </h3>
              
              <p className="text-sm text-stone-700 mt-3 leading-relaxed">
                Your support helps us create impactful content, spread authentic knowledge and work for charity. Together we can make a difference.
              </p>

              <div className="mt-5">
                <button
                  onClick={openDonate}
                  className="px-6 py-3 rounded-full bg-brand-gold text-brand-teal-dark font-bold text-sm shadow-md hover:bg-brand-gold transition-all flex items-center space-x-2 active:scale-95"
                >
                  <span>Support Us</span>
                  <Heart className="w-4 h-4 fill-brand-teal-dark" />
                </button>
              </div>
            </div>

            {/* 3 Pillars */}
            <div className="mt-8 pt-5 border-t border-brand-cream grid grid-cols-3 gap-3 text-center">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-lg bg-brand-teal-dark/10 text-brand-teal-dark flex items-center justify-center mb-1">
                  <Sparkles className="w-4 h-4" />
                </div>
                <span className="text-xs font-semibold text-brand-teal-dark">Create Content</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-lg bg-brand-teal-dark/10 text-brand-teal-dark flex items-center justify-center mb-1">
                  <BookOpen className="w-4 h-4" />
                </div>
                <span className="text-xs font-semibold text-brand-teal-dark">Spread Knowledge</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-lg bg-brand-teal-dark/10 text-brand-teal-dark flex items-center justify-center mb-1">
                  <Heart className="w-4 h-4" />
                </div>
                <span className="text-xs font-semibold text-brand-teal-dark">Work for Charity</span>
              </div>
            </div>
          </div>

          {/* Join the Community Newsletter Box */}
          <div className="lg:col-span-5 bg-brand-teal-dark text-white rounded-2xl p-6 sm:p-8 border border-brand-teal flex flex-col justify-between shadow-lg">
            <div>
              <span className="text-xs font-semibold text-brand-gold tracking-widest uppercase">
                Stay Connected
              </span>
              <h3 className="font-serif-heading text-2xl sm:text-3xl font-bold text-stone-50 mt-1">
                Join the Community
              </h3>

              <p className="text-xs sm:text-sm text-stone-300 mt-3 leading-relaxed">
                Be part of a growing family of believers who support, learn and grow together. Receive weekly inspiration, free downloads, and episode updates directly.
              </p>
            </div>

            <form onSubmit={handleSubscribe} className="mt-6 space-y-3">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Email Address"
                  required
                  className="w-full pl-4 pr-12 py-3 rounded-xl bg-brand-teal-dark text-white placeholder-stone-400 text-sm border border-brand-teal focus:outline-none focus:border-brand-gold transition-colors"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-brand-gold text-brand-teal-dark hover:bg-brand-gold transition-colors"
                  title="Subscribe to newsletter"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>

              {subscribed && (
                <div className="p-2.5 rounded-lg bg-emerald-800/80 border border-emerald-500 text-emerald-100 text-xs flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                  <span>JazakAllah Khair! You are now subscribed.</span>
                </div>
              )}

              <p className="text-[11px] text-stone-400 font-light">
                We respect your privacy. Unsubscribe anytime.
              </p>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};