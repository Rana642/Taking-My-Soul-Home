'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Clock, Search, Filter } from 'lucide-react';
import { BlogPost } from '../../types';

export const BlogPage: React.FC<{ posts: BlogPost[] }> = ({ posts }) => {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['ALL', ...Array.from(new Set(posts.map((p) => p.category).filter(Boolean)))];

  const filteredPosts = posts.filter((post) => {
    const matchesCat = activeCategory === 'ALL' || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="py-12 bg-brand-cream text-ink min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Banner */}
        <div className="bg-brand-teal-dark text-white rounded-3xl p-8 sm:p-12 mb-10 shadow-xl border border-brand-teal relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <span className="text-xs font-bold text-brand-gold uppercase tracking-widest">
              Islamic Knowledge & Reflections
            </span>
            <h1 className="font-serif-heading text-4xl sm:text-5xl font-bold mt-2">
              Taking My Soul Home Blog
            </h1>
            <p className="text-stone-300 text-sm sm:text-base mt-3 leading-relaxed">
              Explore insightful articles on Quranic reflections, lives of the Prophets, daily Wazaif, and spiritual growth to revive the heart.
            </p>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex items-center space-x-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
            <Filter className="w-4 h-4 text-brand-teal-dark shrink-0" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? 'bg-brand-teal-dark text-brand-gold shadow-sm'
                    : 'bg-white text-stone-700 hover:bg-stone-200 border border-stone-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles..."
              className="w-full pl-9 pr-4 py-2 rounded-full bg-white border border-stone-300 text-xs focus:outline-none focus:border-brand-teal-dark"
            />
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-brand-cream flex flex-col justify-between cursor-pointer"
            >
              <div className="relative h-52 overflow-hidden bg-stone-200">
                <img
                  src={post.featuredImage}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-md bg-brand-teal-dark/90 text-brand-gold text-xs font-bold uppercase">
                  {post.tag}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif-heading text-xl font-bold text-brand-teal-dark group-hover:text-brand-teal leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-xs text-stone-600 mt-3 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-100 space-y-3">
                  <div className="flex items-center justify-between text-xs text-stone-500">
                    <span>{post.date}</span>
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5 text-stone-400" />
                      <span>{post.readTime}</span>
                    </span>
                  </div>

                  <span className="w-full py-2.5 rounded-xl bg-brand-teal-dark text-brand-gold group-hover:bg-brand-teal font-bold text-xs transition-colors flex items-center justify-center space-x-2">
                    <span>Read blog</span>
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>

              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
};