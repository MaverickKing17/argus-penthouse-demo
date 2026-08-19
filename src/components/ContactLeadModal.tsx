import React, { useState } from 'react';
import { X, Mail, Send, CheckCircle2, Shield, User, Building } from 'lucide-react';
import { QualificationData } from '../types';
import { BROKERAGE_PARTNERS } from '../data/propertyData';

interface ContactLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  qualification: QualificationData;
}

export const ContactLeadModal: React.FC<ContactLeadModalProps> = ({
  isOpen,
  onClose,
  qualification,
}) => {
  const [selectedBrokerage, setSelectedBrokerage] = useState(BROKERAGE_PARTNERS[0].name);
  const [subject, setSubject] = useState('Private Advisory: Suite 5200 Penthouse Acquisition Briefing');
  const [messageText, setMessageText] = useState(
    `Dear Principal,\n\nFollowing your interaction with ARGUS regarding Penthouse Suite 5200 at 50 Yorkville Avenue, I have prepared the confidential acquisition brief, institutional carrying schedule, and private architectural portfolio for your review.\n\nGiven your indicated cash purchase structure and sub-90-day timeline, we can accommodate an expedited private twilight walkthrough or family office presentation.\n\nDiscreetly yours,\n${BROKERAGE_PARTNERS[0].name}`
  );
  const [isSent, setIsSent] = useState(false);

  if (!isOpen) return null;

  const handleSend = () => {
    setIsSent(true);
    setTimeout(() => {
      setIsSent(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#081222] border border-white/15 rounded-3xl overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.8)] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 bg-[#0a162b] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-400/40 flex items-center justify-center">
              <Mail className="w-4 h-4 text-amber-300" />
            </div>
            <div>
              <h3 className="text-base font-serif font-bold text-white tracking-wide">
                Direct Executive Outreach to Qualified Prospect
              </h3>
              <p className="text-xs text-slate-400">
                Encrypted executive communication channel · High-Net-Worth Protocol
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

        {/* Content */}
        <div className="p-6 space-y-4">
          {isSent ? (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center text-emerald-400 animate-bounce">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-serif font-bold text-white">Discreet Message Transmitted</h4>
              <p className="text-xs text-slate-300 max-w-md">
                Your direct briefing has been dispatched securely to the lead's authenticated terminal session.
              </p>
            </div>
          ) : (
            <>
              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                  Sending Partner Brokerage
                </label>
                <select
                  value={selectedBrokerage}
                  onChange={(e) => {
                    setSelectedBrokerage(e.target.value);
                    setMessageText((prev) => prev.replace(/Discreetly yours,[\s\S]*$/, `Discreetly yours,\n${e.target.value}`));
                  }}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                >
                  {BROKERAGE_PARTNERS.map((b) => (
                    <option key={b.name} value={b.name} className="bg-[#081222] text-white">
                      {b.name} ({b.title})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                  Subject Line
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                  Consultative Message (Sage Advisory Format)
                </label>
                <textarea
                  rows={6}
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3.5 text-xs text-slate-200 font-sans leading-relaxed focus:outline-none focus:border-amber-400"
                ></textarea>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-white/10">
                <span className="text-[11px] text-emerald-400 flex items-center gap-1">
                  <Shield className="w-3.5 h-3.5" />
                  <span>256-Bit Encrypted High-Trust Outreach</span>
                </span>

                <button
                  onClick={handleSend}
                  className="py-2.5 px-5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-bold flex items-center gap-2 cursor-pointer shadow-lg"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Dispatch Message</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
