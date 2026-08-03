import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, User, Share2, Bookmark, Check, ThumbsUp, MessageSquare, Type } from 'lucide-react';
import { BlogPost } from '../types';
import { BLOG_POSTS } from '../data/mockData';

interface BlogPostDetailViewProps {
  post: BlogPost;
}

export const BlogPostDetailView: React.FC<BlogPostDetailViewProps> = ({
  post,
}) => {
  // USER REQUESTED THREE BLOG FONT-INCREASING FUNCTIONS:
  // 1 = Small (15px / text-sm), 2 = Medium (18px / text-lg), 3 = Large (22px / text-xl)
  const [fontSizeLevel, setFontSizeLevel] = useState<1 | 2 | 3>(2);
  const [copiedLink, setCopiedLink] = useState(false);
  const [likes, setLikes] = useState(42);
  const [hasLiked, setHasLiked] = useState(false);
  const [comments, setComments] = useState<string[]>([
    'SubhanAllah, this article touched my heart deeply.',
    'Very practical steps for improving Khushu in daily prayers. JazakAllah Khair!'
  ]);
  const [newComment, setNewComment] = useState('');

  const getFontSizeClass = () => {
    switch (fontSizeLevel) {
      case 1:
        return 'text-sm sm:text-base leading-relaxed';
      case 2:
        return 'text-base sm:text-lg leading-relaxed';
      case 3:
        return 'text-lg sm:text-xl leading-loose';
      default:
        return 'text-base sm:text-lg leading-relaxed';
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleLike = () => {
    if (!hasLiked) {
      setLikes(likes + 1);
      setHasLiked(true);
    } else {
      setLikes(likes - 1);
      setHasLiked(false);
    }
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setComments([...comments, newComment.trim()]);
    setNewComment('');
  };

  const relatedPosts = BLOG_POSTS.filter((p) => p.id !== post.id).slice(0, 3);

  return (
    <article className="py-10 bg-brand-cream text-ink min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Back Navigation & Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-brand-cream">
          <Link
            to="/blog"
            className="inline-flex items-center space-x-2 text-sm font-semibold text-brand-teal-dark hover:text-brand-teal transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Articles</span>
          </Link>

          {/* THREE BLOG FONT INCREASING FUNCTIONS (A-, A, A+) */}
          <div className="flex items-center space-x-3 bg-white px-3 py-1.5 rounded-full border border-brand-cream shadow-sm">
            <div className="flex items-center space-x-1 text-xs text-stone-500 font-medium pr-2 border-r border-stone-200">
              <Type className="w-3.5 h-3.5 text-brand-teal-dark" />
              <span className="hidden sm:inline">Text Size</span>
            </div>

            <div className="flex items-center space-x-1">
              <button
                onClick={() => setFontSizeLevel(1)}
                className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all ${
                  fontSizeLevel === 1
                    ? 'bg-brand-teal-dark text-brand-gold shadow-xs'
                    : 'text-stone-600 hover:bg-stone-100'
                }`}
                title="Small Font Size (15px)"
              >
                A-
              </button>

              <button
                onClick={() => setFontSizeLevel(2)}
                className={`px-2.5 py-1 rounded-md text-sm font-bold transition-all ${
                  fontSizeLevel === 2
                    ? 'bg-brand-teal-dark text-brand-gold shadow-xs'
                    : 'text-stone-600 hover:bg-stone-100'
                }`}
                title="Medium Normal Font Size (18px)"
              >
                A
              </button>

              <button
                onClick={() => setFontSizeLevel(3)}
                className={`px-2.5 py-1 rounded-md text-base font-bold transition-all ${
                  fontSizeLevel === 3
                    ? 'bg-brand-teal-dark text-brand-gold shadow-xs'
                    : 'text-stone-600 hover:bg-stone-100'
                }`}
                title="Large Font Size (22px)"
              >
                A+
              </button>
            </div>
          </div>
        </div>

        {/* Article Header */}
        <div className="mt-8 space-y-4">
          <div className="inline-block px-3 py-1 rounded-md bg-brand-teal-dark text-brand-gold text-xs font-bold tracking-wider uppercase">
            {post.category}
          </div>

          <h1 className="font-serif-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-teal-dark leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-stone-600 pt-2 border-b border-stone-200 pb-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-brand-teal-dark text-brand-gold font-serif-heading font-bold flex items-center justify-center text-xs">
                FW
              </div>
              <div>
                <span className="font-semibold text-brand-teal-dark block">{post.author.name}</span>
                <span className="text-[11px] text-stone-500">{post.author.role}</span>
              </div>
            </div>

            <span className="text-stone-300">•</span>

            <div className="flex items-center space-x-1">
              <Calendar className="w-3.5 h-3.5 text-stone-400" />
              <span>{post.date}</span>
            </div>

            <span className="text-stone-300">•</span>

            <div className="flex items-center space-x-1">
              <Clock className="w-3.5 h-3.5 text-stone-400" />
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>

        {/* Hero Featured Image */}
        <div className="my-8 rounded-2xl overflow-hidden shadow-md border border-brand-cream max-h-[420px]">
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Main Article Body with Dynamic Font Size */}
        <div className={`space-y-6 text-stone-800 ${getFontSizeClass()} transition-all duration-200`}>
          {post.content.map((paragraph, idx) => (
            <p key={idx} className="font-sans">
              {paragraph}
            </p>
          ))}

          {/* Highlight Quote Box */}
          <blockquote className="my-8 p-6 rounded-2xl bg-brand-cream border-l-4 border-brand-gold shadow-sm">
            <p className="font-serif-heading italic text-brand-teal-dark text-lg sm:text-xl">
              "When the heart submits to the remembrance of Allah, external turbulence dissolves into divine tranquility."
            </p>
            <span className="block mt-2 text-xs font-semibold text-brand-teal-dark uppercase tracking-wider">
              — Taking My Soul Home Reflection
            </span>
          </blockquote>
        </div>

        {/* Post Tags */}
        <div className="mt-8 pt-6 border-t border-brand-cream flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-stone-500 mr-2">Tags:</span>
          {post.tags.map((tag, idx) => (
            <span key={idx} className="px-3 py-1 rounded-full bg-white border border-stone-200 text-stone-700 text-xs font-medium">
              #{tag}
            </span>
          ))}
        </div>

        {/* Author Bio Box */}
        <div className="mt-10 p-6 rounded-2xl bg-brand-teal-dark text-white flex flex-col sm:flex-row items-center gap-5 shadow-lg">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-brand-gold shrink-0">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
              alt="Freha Wahla"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h4 className="font-serif-heading text-lg font-bold text-brand-gold">
              Written by Freha Wahla
            </h4>
            <p className="text-xs text-stone-300 mt-1 leading-relaxed">
              Writer, voice and visionary behind Taking My Soul Home. Dedicated to offering authentic Quranic insights, spiritual reflections, and storytelling for believers worldwide.
            </p>
          </div>
        </div>

        {/* Interactive Engagement Bar */}
        <div className="mt-8 py-4 px-6 rounded-xl bg-white border border-brand-cream flex items-center justify-between">
          <button
            onClick={handleLike}
            className={`flex items-center space-x-2 text-xs font-semibold px-4 py-2 rounded-full transition-colors ${
              hasLiked
                ? 'bg-rose-100 text-rose-700 border border-rose-300'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            <ThumbsUp className={`w-4 h-4 ${hasLiked ? 'fill-rose-600 text-rose-600' : ''}`} />
            <span>{likes} Likes</span>
          </button>

          <button
            onClick={handleCopyLink}
            className="flex items-center space-x-1.5 text-xs font-semibold px-4 py-2 rounded-full bg-brand-teal-dark text-brand-gold hover:bg-brand-teal transition-colors"
          >
            {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            <span>{copiedLink ? 'Link Copied!' : 'Share Article'}</span>
          </button>
        </div>

        {/* Comments Section */}
        <div className="mt-12 space-y-6">
          <h3 className="font-serif-heading text-2xl font-bold text-brand-teal-dark flex items-center space-x-2">
            <MessageSquare className="w-5 h-5 text-brand-gold" />
            <span>Discussion & Comments ({comments.length})</span>
          </h3>

          <form onSubmit={handleAddComment} className="space-y-3">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Share your spiritual thoughts or reflections..."
              rows={3}
              className="w-full p-4 rounded-xl bg-white border border-brand-cream text-sm focus:outline-none focus:border-brand-teal-dark"
            />
            <button
              type="submit"
              className="px-6 py-2.5 rounded-full bg-brand-teal-dark text-brand-gold font-bold text-xs hover:bg-brand-teal transition-colors shadow-sm"
            >
              Post Comment
            </button>
          </form>

          <div className="space-y-3 pt-2">
            {comments.map((comment, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-white border border-stone-200/80 text-xs text-stone-700 space-y-1">
                <span className="font-bold text-brand-teal-dark block">Community Member</span>
                <p>{comment}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Related Articles */}
        <div className="mt-16 pt-10 border-t border-brand-cream">
          <h3 className="font-serif-heading text-2xl font-bold text-brand-teal-dark mb-6">
            Related Reflections
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {relatedPosts.map((rPost) => (
              <Link
                key={rPost.id}
                to={`/blog/${rPost.slug}`}
                className="bg-white rounded-xl overflow-hidden border border-brand-cream p-3 shadow-xs hover:shadow-md cursor-pointer transition-all"
              >
                <img
                  src={rPost.featuredImage}
                  alt={rPost.title}
                  className="w-full h-32 object-cover rounded-lg mb-2"
                />
                <h4 className="font-serif-heading text-sm font-bold text-brand-teal-dark line-clamp-2">
                  {rPost.title}
                </h4>
                <p className="text-[11px] text-stone-500 mt-1">{rPost.readTime}</p>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </article>
  );
};
