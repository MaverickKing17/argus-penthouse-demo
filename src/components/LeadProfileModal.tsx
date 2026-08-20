import React from 'react';
import { X, UserCheck, ShieldCheck, Flame, Award, Building, CheckCircle2 } from 'lucide-react';
import { QualificationData } from '../types';

interface LeadProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  qualification: QualificationData;
}

export const LeadProfileModal: React.FC<LeadProfileModalProps> = ({
  isOpen,
  onClose,
  qualification,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#081222] border border-white/15 rounded-3xl overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.8)] flex flex-col max-h-[85vh] my-auto animate-modalSlideIn">
        {/* Header - Fixed & Sticky */}
        <div className="shrink-0 px-6 py-4 bg-[#0a162b] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-400/40 flex items-center justify-center">
              <UserCheck className="w-4 h-4 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-display font-bold text-white tracking-wide">
                  HNWI Lead Dossier: Suite 5200 Prospect
                </h3>
                <span className="px-2 py-0.5 rounded bg-red-500/20 border border-red-500/40 text-red-300 text-[10px] font-mono font-bold">
                  {qualification.leadStatus}
                </span>
              </div>
              <p className="text-xs text-slate-400 tabular-nums">
                Verified Autonomous Intelligence Record · AI Confidence: {qualification.confidenceScore}%
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
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Quick Profile Summary */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-600 to-indigo-600 flex items-center justify-center text-white font-bold font-display text-lg shadow-md">
                JD
              </div>
              <div>
                <div className="text-sm font-bold text-white font-display">
                  Prospective Principal / Family Office Trustee
                </div>
                <div className="text-xs text-slate-300 font-mono">
                  IP Geolocation: Toronto Financial District / Yorkville Gateway
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-mono font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Identity Verified</span>
            </div>
          </div>

          {/* Full Key Data Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
              <div className="text-[11px] font-mono text-slate-400 uppercase font-semibold">Estimated Allocation</div>
              <div className="text-base font-bold font-mono text-white mt-0.5 tabular-nums financial-amount">
                {qualification.estimatedBudget}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
              <div className="text-[11px] font-mono text-slate-400 uppercase font-semibold">Acquisition Structure</div>
              <div className="text-base font-bold font-mono text-emerald-400 mt-0.5">
                {qualification.purchaseStructure}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
              <div className="text-[11px] font-mono text-slate-400 uppercase font-semibold">Decision Timeline</div>
              <div className="text-base font-bold font-mono text-cyan-300 mt-0.5 tabular-nums">
                {qualification.liquidAllocationTimeline}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
              <div className="text-[11px] font-mono text-slate-400 uppercase font-semibold">Brokerage Representation</div>
              <div className="text-base font-bold text-[#F3E2B8] mt-0.5">
                {qualification.representation}
              </div>
            </div>
          </div>

          {/* Extracted Sales Intelligence */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold mb-3">
              ARGUS Behavioral Intelligence & Insights
            </h4>
            <div className="space-y-2">
              {qualification.extractedInsights.map((insight, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-[#091833]/70 border border-white/5 text-xs text-slate-200"
                >
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{insight}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer - Fixed & Sticky */}
        <div className="shrink-0 px-6 py-3.5 bg-[#0a162b] border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
          <span>Encrypted Lead Dossier ID: ARC-8942-HNWI</span>
          <button
            onClick={onClose}
            className="py-1.5 px-4 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium cursor-pointer transition-colors"
          >
            Close Dossier
          </button>
        </div>
      </div>
    </div>
  );
};
