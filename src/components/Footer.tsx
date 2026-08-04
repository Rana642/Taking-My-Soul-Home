'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Youtube, Instagram, Facebook, Send, Check } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { useAppShell } from './app-shell-context';

const QUICK_LINKS = [
  { to: '/',          label: 'Home' },
  { to: '/series',    label: 'Series' },
  { to: '/episodes',  label: 'Episodes' },
  { to: '/blog',      label: 'Blog' },
  { to: '/resources', label: 'Resources' },
];

export const Footer: React.FC = () => {
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
    <footer className="bg-brand-teal-dark text-white border-t border-brand-teal pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">

          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-4">
            <Link
              href="/"
              className="text-left group focus:outline-none block py-1"
              aria-label="Taking My Soul Home - Home"
            >
              <BrandLogo size="lg" className="transition-transform duration-300 group-hover:scale-105" />
            </Link>

            <p className="text-xs text-stone-300 leading-relaxed max-w-sm">
              A platform dedicated to inspiring hearts through authentic Islamic knowledge, stories, and reminders.
            </p>

            {/* Social Icons */}
            <div className="flex items-center space-x-3 pt-2">
              <a href="https://youtube.com" target="_blank" rel="noreferrer"
                 className="w-8 h-8 rounded-full bg-brand-teal-dark hover:bg-brand-gold hover:text-brand-teal-dark text-stone-300 flex items-center justify-center transition-colors"
                 title="YouTube">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer"
                 className="w-8 h-8 rounded-full bg-brand-teal-dark hover:bg-brand-gold hover:text-brand-teal-dark text-stone-300 flex items-center justify-center transition-colors"
                 title="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer"
                 className="w-8 h-8 rounded-full bg-brand-teal-dark hover:bg-brand-gold hover:text-brand-teal-dark text-stone-300 flex items-center justify-center transition-colors"
                 title="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://t.me" target="_blank" rel="noreferrer"
                 className="w-8 h-8 rounded-full bg-brand-teal-dark hover:bg-brand-gold hover:text-brand-teal-dark text-stone-300 flex items-center justify-center transition-colors"
                 title="Telegram">
                <Send className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif-heading text-sm font-bold text-brand-gold uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-stone-300">
              {QUICK_LINKS.map((item) => (
                <li key={item.to}>
                  <Link href={item.to} className="hover:text-brand-gold transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Helpful Links Column */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif-heading text-sm font-bold text-brand-gold uppercase tracking-wider">
              Helpful Links
            </h4>
            <ul className="space-y-2 text-xs text-stone-300">
              <li><Link href="/about"     className="hover:text-brand-gold">About Us</Link></li>
              <li><Link href="/about"     className="hover:text-brand-gold">Freha Wahla Profile</Link></li>
              <li><Link href="/about"     className="hover:text-brand-gold">crea8ovia Production</Link></li>
              <li><Link href="/community" className="hover:text-brand-gold">Community</Link></li>
              <li>
                <button onClick={openDonate} className="hover:text-brand-gold text-brand-gold">
                  Support / Donate
                </button>
              </li>
              <li><Link href="/contact"   className="hover:text-brand-gold">Contact Us</Link></li>
            </ul>
          </div>

          {/* Legal Column */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif-heading text-sm font-bold text-brand-gold uppercase tracking-wider">
              Legal & Policy
            </h4>
            <ul className="space-y-2 text-xs text-stone-300">
              <li><Link href="/legal/privacy"    className="hover:text-brand-gold">Privacy Policy</Link></li>
              <li><Link href="/legal/disclaimer" className="hover:text-brand-gold">Disclaimer</Link></li>
              <li><Link href="/legal/terms"      className="hover:text-brand-gold">Terms & Conditions</Link></li>
              <li><Link href="/legal/sitemap"    className="hover:text-brand-gold">Sitemap</Link></li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif-heading text-sm font-bold text-brand-gold uppercase tracking-wider">
              Newsletter
            </h4>
            <p className="text-xs text-stone-300 leading-normal">
              Get uplifting reminders and updates straight to your inbox.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2 pt-1">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Email Address"
                  required
                  className="w-full pl-3 pr-10 py-2 rounded-lg bg-brand-teal-dark text-white placeholder-stone-400 text-xs border border-brand-teal focus:outline-none focus:border-brand-gold"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1/2 -translate-y-1/2 p-1.5 rounded bg-brand-gold text-brand-teal-dark hover:bg-brand-gold"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
              {subscribed && (
                <div className="text-[11px] text-emerald-400 flex items-center space-x-1">
                  <Check className="w-3 h-3" />
                  <span>Subscribed!</span>
                </div>
              )}
              <p className="text-[10px] text-stone-400 font-light">We respect your privacy.</p>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-brand-teal flex flex-col md:flex-row items-center justify-between text-xs text-stone-400 gap-3">
          <p className="flex flex-wrap items-center justify-center sm:justify-start gap-x-1.5 gap-y-1 text-center sm:text-left">
            <span>© 2024 Taking My Soul Home. All Rights Reserved.</span>
            <span className="hidden sm:inline">|</span>
            <span>Crafted & Developed by</span>
            <a
              href="https://www.crea8ovia.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-gold hover:underline font-semibold transition-colors"
            >
              crea8ovia
            </a>
          </p>
          <div className="flex items-center space-x-4">
            <Link href="/legal/sitemap" className="hover:text-white">Sitemap</Link>
            <span>|</span>
            <Link href="/legal/privacy" className="hover:text-white">Privacy Policy</Link>
            <span>|</span>
            <Link href="/legal/terms"   className="hover:text-white">Terms & Conditions</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};