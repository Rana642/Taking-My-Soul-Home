import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';
import { BLOG_POSTS } from '../data/mockData';

export const BlogSection: React.FC = () => {
  return (
    <section className="py-16 bg-brand-cream text-ink">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-brand-cream">
          <div>
            <span className="text-xs font-semibold text-brand-teal-dark tracking-widest uppercase">
              Knowledge Base
            </span>
            <h2 className="font-serif-heading text-3xl sm:text-4xl font-bold text-brand-teal-dark mt-1">
              From the Blog
            </h2>
          </div>

          <Link
            to="/blog"
            className="mt-4 sm:mt-0 inline-flex items-center space-x-1.5 text-sm font-semibold text-brand-teal-dark hover:text-brand-teal transition-colors group"
          >
            <span>View All Articles</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Blog Post Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {BLOG_POSTS.map((post) => (
            <Link
              key={post.id}
              to={`/blog/${post.slug}`}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-brand-cream flex flex-col justify-between cursor-pointer hover:-translate-y-1"
            >
              {/* Featured Image */}
              <div className="relative h-44 overflow-hidden bg-stone-200">
                <img
                  src={post.featuredImage}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-brand-teal-dark/90 text-brand-gold text-[10px] font-bold tracking-wider uppercase border border-brand-gold/30">
                  {post.tag}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif-heading text-base font-bold text-brand-teal-dark group-hover:text-brand-teal transition-colors leading-snug line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-xs text-stone-600 mt-2 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-100 flex flex-col space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-stone-500">
                    <span>{post.date}</span>
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3 h-3 text-stone-400" />
                      <span>{post.readTime}</span>
                    </span>
                  </div>

                  {/* Read-blog CTA — visual only; the whole card is the link */}
                  <div className="pt-1">
                    <span
                      className="w-full py-2 rounded-lg bg-brand-cream group-hover:bg-brand-teal-dark text-brand-teal-dark group-hover:text-brand-gold font-bold text-xs border border-brand-cream transition-colors flex items-center justify-center space-x-1.5"
                    >
                      <span>Read blog</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>

              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};
