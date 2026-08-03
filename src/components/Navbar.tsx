import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Heart, Menu, X } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface NavbarProps {
  onOpenSearch: () => void;
}

const NAV_ITEMS = [
  { to: '/',          label: 'Home' },
  { to: '/series',    label: 'Series' },
  { to: '/episodes',  label: 'Episodes' },
  { to: '/blog',      label: 'Blog' },
  { to: '/resources', label: 'Resources' },
  { to: '/community', label: 'Community' },
  { to: '/about',     label: 'About' },
  { to: '/contact',   label: 'Contact' },
];

/** true when `pathname` is `to` (exact for '/') or a descendant of `to`. */
function isRouteActive(pathname: string, to: string): boolean {
  if (to === '/') return pathname === '/';
  return pathname === to || pathname.startsWith(to + '/');
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSearch }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { pathname } = useLocation();

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-40 bg-transparent text-brand-teal-dark transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo & Brand Name */}
          <Link
            to="/"
            onClick={closeMobileMenu}
            className="flex items-center text-left group focus:outline-none py-1"
            aria-label="Taking My Soul Home - Return to Home"
          >
            <BrandLogo size="md" variant="dark" className="transition-transform duration-300 group-hover:scale-105" />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {NAV_ITEMS.map((item) => {
              const active = isRouteActive(pathname, item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative ${
                    active
                      ? 'text-brand-teal-dark font-semibold bg-brand-teal-dark/10'
                      : 'text-brand-teal-dark/75 hover:text-brand-teal-dark hover:bg-brand-teal-dark/5'
                  }`}
                >
                  {item.label}
                  {active && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-brand-gold rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons & Support CTA */}
          <div className="hidden sm:flex items-center space-x-3">
            <button
              onClick={onOpenSearch}
              className="p-2.5 text-brand-teal-dark hover:text-brand-teal-dark hover:bg-brand-teal-dark/10 rounded-full transition-colors flex items-center justify-center focus:outline-none"
              title="Search website"
              aria-label="Search website"
            >
              <Search className="w-5 h-5" />
            </button>

            <Link
              to="/community"
              onClick={closeMobileMenu}
              className="px-4 py-2.5 rounded-full bg-brand-teal-dark text-brand-cream font-semibold text-sm shadow-md hover:shadow-lg hover:bg-brand-teal transition-all flex items-center space-x-1.5 active:scale-95"
            >
              <span>Support Us</span>
              <Heart className="w-4 h-4 fill-brand-gold text-brand-gold" />
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center space-x-2 lg:hidden">
            <button
              onClick={onOpenSearch}
              className="p-2 text-brand-teal-dark hover:text-brand-teal-dark/70 focus:outline-none"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-brand-teal-dark hover:text-brand-teal-dark/70 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-7 h-7 text-brand-teal-dark" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-brand-cream/95 backdrop-blur-md border-b border-brand-teal-dark/15 px-4 pt-3 pb-6 space-y-2 animate-fadeIn">
          <div className="grid grid-cols-2 gap-2">
            {NAV_ITEMS.map((item) => {
              const active = isRouteActive(pathname, item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={closeMobileMenu}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    active
                      ? 'bg-brand-gold text-brand-teal-dark font-semibold'
                      : 'text-brand-teal-dark hover:bg-brand-teal-dark/10'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-brand-teal-dark/15 flex items-center justify-between">
            <Link
              to="/community"
              onClick={closeMobileMenu}
              className="w-full py-3 rounded-xl bg-brand-teal-dark text-brand-cream font-bold text-center flex items-center justify-center space-x-2"
            >
              <span>Support Our Mission</span>
              <Heart className="w-4 h-4 fill-brand-gold text-brand-gold" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
