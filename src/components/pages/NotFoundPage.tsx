import React from 'react';
import Link from 'next/link';
import { Home, Compass } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[60vh] bg-brand-cream text-ink flex items-center justify-center px-4 py-20">
      <div className="max-w-lg text-center space-y-6">
        <div className="mx-auto w-16 h-16 rounded-2xl bg-brand-teal-dark text-brand-gold flex items-center justify-center">
          <Compass className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <p className="text-xs font-bold text-brand-teal-dark uppercase tracking-widest">Error 404</p>
          <h1 className="font-serif-heading text-4xl sm:text-5xl font-bold text-brand-teal-dark">
            Page not found
          </h1>
          <p className="text-sm text-stone-600 leading-relaxed">
            The page you're looking for doesn't exist or may have moved. Let's guide you back to a peaceful place.
          </p>
        </div>
        <Link
          href="/"
          className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-brand-teal-dark text-brand-gold font-bold text-sm hover:bg-brand-teal transition-colors"
        >
          <Home className="w-4 h-4" />
          <span>Return home</span>
        </Link>
      </div>
    </div>
  );
};
