import React, { useState } from 'react';
import { X, Building2, CheckCircle2, ArrowRight } from 'lucide-react';
import { BROKERAGE_PARTNERS } from '../data/propertyData';

interface PrivateDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivateDemoModal: React.FC<PrivateDemoModalProps> = ({ isOpen, onClose }) => {
  const [brokerageName, setBrokerageName] = useState('Barry Cohen Homes');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-lg bg-[#081222] border border-white/15 rounded-3xl overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.8)] flex flex-col max-h-[85vh] my-auto animate-modalSlideIn">
        {/* Header - Fixed & Sticky */}
        <div className="shrink-0 px-6 py-4 bg-[#0a162b] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-400/40 flex items-center justify-center">
              <Building2 className="w-4 h-4 text-amber-300" />
            </div>
            <div>
              <h3 className="text-base font-display font-bold text-white tracking-wide">
                ARCUS AI: Brokerage Enterprise Demo
              </h3>
              <p className="text-xs text-slate-400">
                Deploy ARGUS Digital Twin & Qualification Layer on Your Prime Listings
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6">
          {submitted ? (
            <div className="py-8 flex flex-col items-center justify-center text-center space-y-3">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center text-emerald-400 animate-bounce">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-display font-bold text-white">Private Demo Requested</h4>
              <p className="text-xs text-slate-300 max-w-sm">
                An ARCUS AI Luxury Integration Partner will contact your team to configure a custom Digital Twin sandbox for your $5M+ listings.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1 font-semibold">
                  Select or Enter Brokerage
                </label>
                <select
                  value={brokerageName}
                  onChange={(e) => setBrokerageName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:ring-1 focus:ring-cyan-400 focus:border-cyan-400 focus:outline-none transition-all"
                >
                  {BROKERAGE_PARTNERS.map((b) => (
                    <option key={b.name} value={b.name} className="bg-[#081222] text-white">
                      {b.name}
                    </option>
                  ))}
                  <option value="Other Elite Brokerage" className="bg-[#081222] text-white">
                    Other Elite Luxury Brokerage / Private Office
                  </option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-1 font-semibold">
                    Representative Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Barry Cohen"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder:text-slate-600 focus:ring-1 focus:ring-cyan-400 focus:border-cyan-400 focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-1 font-semibold">
                    Direct Phone
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="(416) 555-0199"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder:text-slate-600 focus:ring-1 focus:ring-cyan-400 focus:border-cyan-400 focus:outline-none transition-all tabular-nums"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1 font-semibold">
                  Corporate Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="barry@barrycohenhomes.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder:text-slate-600 focus:ring-1 focus:ring-cyan-400 focus:border-cyan-400 focus:outline-none transition-all"
                />
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                <span className="text-[10px] text-slate-400">
                  Custom AI Digital Twin deployed in under 48 hours
                </span>
                <button
                  type="submit"
                  className="py-2.5 px-5 rounded-xl bg-[#00C4CC] hover:bg-[#00d8e0] active:scale-[0.99] text-[#061225] text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-[0_0_20px_rgba(0,196,204,0.4)] hover:shadow-[0_0_30px_rgba(0,196,204,0.6)] transition-all"
                >
                  <span>Request Executive Briefing</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#061225]" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
