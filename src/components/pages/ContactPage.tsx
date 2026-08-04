'use client';

import React, { useState } from 'react';
import { Mail, Send, MessageSquare, CheckCircle } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
    }, 4000);
  };

  return (
    <div className="py-12 bg-brand-cream text-ink min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="bg-brand-teal-dark text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-brand-teal text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold text-brand-gold uppercase tracking-widest">
            We Would Love to Hear From You
          </span>
          <h1 className="font-serif-heading text-4xl sm:text-5xl font-bold mt-2">
            Get in Touch
          </h1>
          <p className="text-stone-300 text-sm sm:text-base mt-3 leading-relaxed">
            Have questions about our video series, audio recitations, merchandise, or wish to collaborate? Reach out to our team.
          </p>
        </div>

        {/* Contact Form & Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Info Side */}
          <div className="lg:col-span-5 bg-white p-8 rounded-2xl border border-brand-cream space-y-6 shadow-sm">
            <h2 className="font-serif-heading text-2xl font-bold text-brand-teal-dark">
              Contact Details
            </h2>

            <div className="space-y-4 text-xs text-stone-700">
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-brand-teal-dark block">Email Us</span>
                  <span>contact@takingmysoulhome.com</span>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <MessageSquare className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-brand-teal-dark block">Media & Production Enquiries</span>
                  <span>crea8ovia Digital Execution (crea8ovia.com)</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-200">
              <h4 className="font-serif-heading text-sm font-bold text-brand-teal-dark mb-2">
                Frequently Asked Questions
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Q: Can I share TMySH audio & videos on my social channel?<br />
                A: Yes, with proper credit back to Taking My Soul Home and author Freha Wahla!
              </p>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-7 bg-white p-8 rounded-2xl border border-brand-cream shadow-sm">
            <h2 className="font-serif-heading text-2xl font-bold text-brand-teal-dark mb-6">
              Send a Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-brand-teal-dark mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-3 rounded-xl border border-stone-300 text-xs focus:outline-none focus:border-brand-teal-dark"
                    placeholder="Enter full name"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-teal-dark mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-3 rounded-xl border border-stone-300 text-xs focus:outline-none focus:border-brand-teal-dark"
                    placeholder="name@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-teal-dark mb-1">Topic / Subject</label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full p-3 rounded-xl border border-stone-300 text-xs focus:outline-none focus:border-brand-teal-dark"
                >
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Series Feedback">Series & Video Feedback</option>
                  <option value="Merchandise Question">Merchandise & Orders</option>
                  <option value="Media & Collaboration">Media / crea8ovia Collaboration</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-teal-dark mb-1">Your Message</label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full p-3 rounded-xl border border-stone-300 text-xs focus:outline-none focus:border-brand-teal-dark"
                  placeholder="How can we help you?"
                />
              </div>

              {submitted && (
                <div className="p-3 bg-emerald-100 text-emerald-800 text-xs rounded-xl flex items-center space-x-2 font-bold">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>JazakAllah Khair! Your message has been sent to our team.</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-brand-teal-dark text-brand-gold font-bold text-xs hover:bg-brand-teal transition-colors flex items-center justify-center space-x-2 shadow-md"
              >
                <Send className="w-4 h-4" />
                <span>Send Message</span>
              </button>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
};