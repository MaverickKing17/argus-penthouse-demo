import React, { useState } from 'react';
import { X, Mail, Send, CheckCircle2, Phone, Shield } from 'lucide-react';
import { QualificationData } from '../types';

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
  const [subject, setSubject] = useState(
    'Private Consultation & Executive Briefing · Penthouse Suite 5200'
  );
  const [messageBody, setMessageBody] = useState(
    `Dear Principal,\n\nFollowing your dialogue with the ARGUS AI Concierge regarding Suite 5200 at 50 Yorkville Avenue, I would be pleased to provide you with the confidential institutional offering memorandum and arrange a private after-hours viewing.\n\nBest regards,\nExecutive Luxury Advisory Team`
  );
  const [sent, setSent] = useState(false);

  if (!isOpen) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-xl bg-[#081222] border border-white/15 rounded-3xl overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.8)] flex flex-col max-h-[85vh] my-auto animate-modalSlideIn">
        {/* Header - Fixed & Sticky */}
        <div className="shrink-0 px-6 py-4 bg-[#0a162b] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-400/40 flex items-center justify-center">
              <Mail className="w-4 h-4 text-amber-300" />
            </div>
            <div>
              <h3 className="text-base font-display font-bold text-white tracking-wide">
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

        {/* Content Body - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6">
          {sent ? (
            <div className="py-10 flex flex-col items-center justify-center text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center text-emerald-400">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-display font-bold text-white">Message Dispatched Securely</h4>
              <p className="text-xs text-slate-300 max-w-sm">
                Executive briefing notification routed directly to the verified prospect.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSend} className="space-y-4">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">Recipient Profile</span>
                <span className="text-white font-mono font-semibold tabular-nums">{qualification.leadBadge} (Verified)</span>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1 font-semibold">Subject</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:ring-1 focus:ring-cyan-400 focus:border-cyan-400 focus:outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1 font-semibold">Confidential Message</label>
                <textarea
                  rows={6}
                  value={messageBody}
                  onChange={(e) => setMessageBody(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-white focus:ring-1 focus:ring-cyan-400 focus:border-cyan-400 focus:outline-none transition-all leading-relaxed"
                />
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                  <Shield className="w-3.5 h-3.5 text-cyan-400" />
                  <span>256-bit TLS Encrypted Channel</span>
                </span>
                <button
                  type="submit"
                  className="py-2 px-5 rounded-xl bg-[#BFA775] hover:bg-[#caa866] hover:brightness-110 active:scale-[0.99] text-[#0A1128] text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-lg transition-transform"
                >
                  <span>Transmit Outreach</span>
                  <Send className="w-3.5 h-3.5 text-[#0A1128]" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
