'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, X, ArrowRight, BookOpen } from 'lucide-react';

export const DailyReflectionToast: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Show toast after short delay when entering home page
    const timer = setTimeout(() => {
      if (!isDismissed) {
        setIsVisible(true);
      }
    }, 1200);

    return () => clearTimeout(timer);
  }, [isDismissed]);

  if (!isVisible || isDismissed) return null;

  return (
    <div className="fixed bottom-6 right-4 sm:right-6 z-40 max-w-sm w-full bg-brand-teal-dark text-white p-4 sm:p-5 rounded-2xl border border-brand-gold/40 shadow-2xl backdrop-blur-md transition-all duration-500 transform translate-y-0 animate-fadeIn flex flex-col space-y-3">
      
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse" />
          <span className="text-[11px] font-bold text-brand-gold uppercase tracking-widest flex items-center space-x-1">
            <Sparkles className="w-3 h-3 text-brand-gold" />
            <span>Daily Reflection</span>
          </span>
        </div>
        
        <button
          onClick={() => {
            setIsVisible(false);
            setIsDismissed(true);
          }}
          className="text-stone-400 hover:text-white p-0.5 rounded-md hover:bg-brand-teal-dark transition-colors"
          title="Dismiss"
          aria-label="Dismiss notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div>
        <h4 className="font-serif-heading text-sm font-bold text-stone-100 leading-snug">
          "Finding Peace in Times of Trial"
        </h4>
        <p className="text-xs text-stone-300 mt-1 line-clamp-2 leading-relaxed font-sans">
          Discover today's spiritual reminder on heart tranquility, patience, and trusting in Allah's divine timing.
        </p>
      </div>

      <div className="pt-1 flex items-center justify-between">
        <span className="text-[10px] text-stone-400">Updated Today</span>
        <Link
          href="/blog"
          onClick={() => setIsVisible(false)}
          className="px-3.5 py-1.5 rounded-full bg-brand-gold text-brand-teal-dark font-bold text-xs hover:bg-brand-gold transition-all flex items-center space-x-1.5 shadow-sm"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Read Wisdom</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

    </div>
  );
};