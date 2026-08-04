'use client';

import React, { useState } from 'react';
import { Heart, ShoppingBag, Users, Sparkles, Check, Gift } from 'lucide-react';
import { MERCH_ITEMS } from '../../data/mockData';
import { MerchItem } from '../../types';
import { useAppShell } from '../app-shell-context';

export const CommunityPage: React.FC = () => {
  const { openDonate } = useAppShell();
  const [selectedMerch, setSelectedMerch] = useState<MerchItem | null>(null);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const handleOrderMerch = (item: MerchItem) => {
    setSelectedMerch(item);
  };

  const handleConfirmOrder = () => {
    setOrderSuccess(true);
    setTimeout(() => {
      setOrderSuccess(false);
      setSelectedMerch(null);
    }, 3000);
  };

  return (
    <div className="py-12 bg-brand-cream text-ink min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Banner */}
        <div className="bg-brand-teal-dark text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-brand-teal">
          <span className="text-xs font-bold text-brand-gold uppercase tracking-widest">
            Ummah & Engagement
          </span>
          <h1 className="font-serif-heading text-4xl sm:text-5xl font-bold mt-2">
            Taking My Soul Home Community
          </h1>
          <p className="text-stone-300 text-sm sm:text-base mt-3 max-w-2xl leading-relaxed">
            Join a global family of believers. 30% to 50% of all merchandise proceeds and donations go directly toward charitable projects for those in need.
          </p>
        </div>

        {/* Impact Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-2xl border border-brand-cream text-center shadow-xs">
            <span className="font-serif-heading text-3xl font-bold text-brand-teal-dark block">150K+</span>
            <span className="text-xs text-stone-500 font-medium mt-1 block">Global Followers</span>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-brand-cream text-center shadow-xs">
            <span className="font-serif-heading text-3xl font-bold text-brand-teal-dark block">45+</span>
            <span className="text-xs text-stone-500 font-medium mt-1 block">Video Episodes</span>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-brand-cream text-center shadow-xs">
            <span className="font-serif-heading text-3xl font-bold text-brand-gold block">30–50%</span>
            <span className="text-xs text-stone-500 font-medium mt-1 block">Proceeds to Charity</span>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-brand-cream text-center shadow-xs">
            <span className="font-serif-heading text-3xl font-bold text-brand-teal-dark block">20K+</span>
            <span className="text-xs text-stone-500 font-medium mt-1 block">PDFs Downloaded</span>
          </div>
        </div>

        {/* Merchandise Showcase */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-brand-cream pb-3">
            <div>
              <span className="text-xs font-bold text-brand-teal-dark uppercase tracking-wider">
                Support & Wear the Vision
              </span>
              <h2 className="font-serif-heading text-2xl font-bold text-brand-teal-dark mt-1">
                TMySH Official Merchandise
              </h2>
            </div>
            <p className="text-xs text-stone-500 mt-2 sm:mt-0">
              Every item purchased supports ongoing video production & charity.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {MERCH_ITEMS.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl overflow-hidden border border-brand-cream shadow-sm flex flex-col justify-between hover:shadow-md transition-all"
              >
                <div className="h-52 bg-stone-100 overflow-hidden relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                  />
                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-brand-teal-dark text-brand-gold text-xs font-bold">
                    {item.price}
                  </span>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-stone-400 uppercase">{item.category}</span>
                    <h3 className="font-serif-heading text-base font-bold text-brand-teal-dark mt-0.5">
                      {item.name}
                    </h3>
                    <p className="text-xs text-stone-600 mt-1 line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  <button
                    onClick={() => handleOrderMerch(item)}
                    className="mt-4 w-full py-2.5 rounded-xl bg-brand-teal-dark text-brand-gold hover:bg-brand-teal text-xs font-bold transition-colors flex items-center justify-center space-x-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Get Merch ({item.price})</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Support Callout Box */}
        <div className="bg-brand-cream rounded-3xl p-8 border border-brand-cream flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <h3 className="font-serif-heading text-2xl font-bold text-brand-teal-dark">
              Direct Support & Voluntary Donations
            </h3>
            <p className="text-xs text-stone-700 leading-relaxed">
              Prefer to support directly? Your donations fund video equipment, audio mastering, and charitable food distributions.
            </p>
          </div>
          <button
            onClick={openDonate}
            className="px-8 py-3.5 rounded-full bg-brand-gold text-brand-teal-dark font-bold text-sm shadow-lg hover:bg-brand-gold transition-all flex items-center space-x-2 shrink-0"
          >
            <Heart className="w-4 h-4 fill-brand-teal-dark" />
            <span>Donate Now</span>
          </button>
        </div>

        {/* Merch Order Modal */}
        {selectedMerch && (
          <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl relative">
              <h3 className="font-serif-heading text-xl font-bold text-brand-teal-dark">
                Order {selectedMerch.name}
              </h3>
              <p className="text-xs text-stone-600">
                Price: <span className="font-bold text-brand-teal-dark">{selectedMerch.price}</span> (Includes shipping & charity contribution).
              </p>
              
              <div className="space-y-2 text-xs">
                <input type="text" placeholder="Full Name" className="w-full p-3 rounded-lg border border-stone-300" />
                <input type="email" placeholder="Email Address" className="w-full p-3 rounded-lg border border-stone-300" />
                <input type="text" placeholder="Shipping Address" className="w-full p-3 rounded-lg border border-stone-300" />
              </div>

              {orderSuccess && (
                <div className="p-3 bg-emerald-100 text-emerald-800 text-xs rounded-lg flex items-center space-x-2 font-semibold">
                  <Check className="w-4 h-4" />
                  <span>JazakAllah Khair! Order placed successfully.</span>
                </div>
              )}

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  onClick={() => setSelectedMerch(null)}
                  className="px-4 py-2 text-xs font-semibold text-stone-500"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmOrder}
                  className="px-5 py-2 rounded-xl bg-brand-teal-dark text-brand-gold font-bold text-xs"
                >
                  Complete Order
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};