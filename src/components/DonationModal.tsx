import React, { useState } from 'react';
import { X, Heart, ShieldCheck, Check } from 'lucide-react';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DonationModal: React.FC<DonationModalProps> = ({ isOpen, onClose }) => {
  const [amount, setAmount] = useState('25');
  const [customAmount, setCustomAmount] = useState('');
  const [donated, setDonated] = useState(false);

  if (!isOpen) return null;

  const handleDonateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDonated(true);
    setTimeout(() => {
      setDonated(false);
      onClose();
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div className="relative w-full max-w-md bg-brand-teal-dark text-white rounded-3xl border border-brand-gold/40 shadow-2xl p-6 sm:p-8 space-y-6">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-300 hover:text-white p-1"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-brand-gold text-brand-teal-dark flex items-center justify-center mx-auto shadow-md">
            <Heart className="w-6 h-6 fill-current" />
          </div>
          <h2 className="font-serif-heading text-2xl font-bold text-stone-50">
            Support Our Mission
          </h2>
          <p className="text-xs text-stone-300">
            30% to 50% of your contributions go directly to charitable food & water initiatives.
          </p>
        </div>

        <form onSubmit={handleDonateSubmit} className="space-y-4">
          <div className="grid grid-cols-4 gap-2">
            {['10', '25', '50', '100'].map((val) => (
              <button
                type="button"
                key={val}
                onClick={() => {
                  setAmount(val);
                  setCustomAmount('');
                }}
                className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                  amount === val && !customAmount
                    ? 'bg-brand-gold text-brand-teal-dark border-brand-gold'
                    : 'bg-brand-teal-dark text-stone-200 border-brand-teal hover:bg-brand-teal'
                }`}
              >
                ${val}
              </button>
            ))}
          </div>

          <input
            type="number"
            placeholder="Custom amount ($ USD)"
            value={customAmount}
            onChange={(e) => {
              setCustomAmount(e.target.value);
              setAmount(e.target.value);
            }}
            className="w-full p-3 rounded-xl bg-brand-teal-dark border border-brand-teal text-xs text-white placeholder-stone-400 focus:outline-none focus:border-brand-gold"
          />

          <div className="space-y-2 text-xs">
            <input
              type="text"
              required
              placeholder="Your Name"
              className="w-full p-3 rounded-xl bg-brand-teal-dark border border-brand-teal text-white placeholder-stone-400 focus:outline-none"
            />
            <input
              type="email"
              required
              placeholder="Email Address for Receipt"
              className="w-full p-3 rounded-xl bg-brand-teal-dark border border-brand-teal text-white placeholder-stone-400 focus:outline-none"
            />
          </div>

          {donated && (
            <div className="p-3 bg-emerald-800 text-white text-xs rounded-xl flex items-center space-x-2 font-bold">
              <Check className="w-4 h-4 text-emerald-300" />
              <span>JazakAllah Khair! Your donation of ${amount || 25} was successful.</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-brand-gold text-brand-teal-dark font-bold text-xs hover:bg-brand-gold transition-colors shadow-lg flex items-center justify-center space-x-2"
          >
            <Heart className="w-4 h-4 fill-brand-teal-dark" />
            <span>Donate ${amount || 25} USD</span>
          </button>

          <div className="flex items-center justify-center space-x-1 text-[11px] text-stone-400 pt-1">
            <ShieldCheck className="w-3.5 h-3.5 text-brand-gold" />
            <span>256-Bit SSL Encrypted & Secure Payment</span>
          </div>
        </form>

      </div>
    </div>
  );
};
