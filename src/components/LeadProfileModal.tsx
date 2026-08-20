import React from 'react';
import { X, UserCheck, ShieldCheck, Flame, Award, Building, CheckCircle2, Lock, Clock, Sparkles } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#071526] border border-cyan-500/30 rounded-3xl overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.8)] flex flex-col max-h-[85vh] my-auto animate-modalSlideIn">
        {/* Header */}
        <div className="shrink-0 px-6 py-4 bg-[#08182f] border-b border-cyan-500/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#BFA775]/20 border border-[#BFA775]/40 flex items-center justify-center">
              <UserCheck className="w-4 h-4 text-[#F3E2B8]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-display font-bold text-white tracking-wide">
                  Lead Intelligence Dossier: Suite 5200 Prospect
                </h3>
                <span className="px-2 py-0.5 rounded bg-red-500/20 border border-red-500/40 text-red-300 text-[10px] font-mono font-bold">
                  {qualification.leadStatus}
                </span>
              </div>
              <p className="text-xs text-[#C7D0DC] tabular-nums">
                Deterministic Qualification Record · Qualification Confidence: {qualification.qualificationConfidence}%
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

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Classification & Identification Summary */}
          <div className="p-4 rounded-2xl bg-[#051122] border border-cyan-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-600 to-blue-700 flex items-center justify-center text-white font-bold font-display text-lg shadow-md">
                HNW
              </div>
              <div>
                <div className="text-sm font-semibold text-white font-sans">
                  High-Intent Acquisition Principal
                </div>
                <div className="text-xs text-[#8FA1B5] font-mono">
                  Context: 50 Yorkville Avenue · Suite 5200 Inquirer
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 text-xs font-mono font-medium self-start sm:self-auto">
              <Clock className="w-3.5 h-3.5" />
              <span>Identity: Verification Pending</span>
            </div>
          </div>

          {/* Structured Signal Grid with Explicit Data States */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-300 font-semibold mb-3">
              Structured Signal Taxonomy (Stated vs Verified)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-[#051122] border border-white/5 space-y-1">
                <div className="text-[11px] font-mono text-[#8FA1B5] uppercase">Estimated Budget</div>
                <div className="text-base font-bold font-mono text-white tabular-nums">
                  {qualification.budget.value}
                </div>
                <div className="text-[10px] text-cyan-300 font-mono">
                  Source: {qualification.budget.sourceLabel || 'Buyer stated'}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#051122] border border-white/5 space-y-1">
                <div className="text-[11px] font-mono text-[#8FA1B5] uppercase">Acquisition Structure</div>
                <div className="text-base font-bold font-mono text-emerald-300">
                  {qualification.purchaseStructure.value}
                </div>
                <div className="text-[10px] text-cyan-300 font-mono">
                  Source: {qualification.purchaseStructure.sourceLabel || 'Buyer stated'}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#051122] border border-white/5 space-y-1">
                <div className="text-[11px] font-mono text-[#8FA1B5] uppercase">Acquisition Timeline</div>
                <div className="text-base font-bold font-mono text-cyan-200 tabular-nums">
                  {qualification.timeline.value}
                </div>
                <div className="text-[10px] text-cyan-300 font-mono">
                  Source: {qualification.timeline.sourceLabel || 'Buyer stated'}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#051122] border border-white/5 space-y-1">
                <div className="text-[11px] font-mono text-[#8FA1B5] uppercase">Representation Status</div>
                <div className="text-base font-bold text-[#F3E2B8]">
                  {qualification.representation.value}
                </div>
                <div className="text-[10px] text-cyan-300 font-mono">
                  Source: {qualification.representation.sourceLabel || 'Buyer stated'}
                </div>
              </div>
            </div>
          </div>

          {/* Evidence-Based Qualification Explanations */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-300 font-semibold mb-3">
              Qualification Evidence Extract
            </h4>
            <div className="space-y-2">
              {Object.entries(qualification.qualificationEvidence).map(([key, value], idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-[#051122] border border-white/5 text-xs text-white"
                >
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-cyan-200 capitalize">{key}: </span>
                    <span className="text-[#C7D0DC]">{value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Next Step */}
          <div className="p-4 rounded-2xl bg-[#061833] border border-cyan-500/30 flex items-center justify-between">
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-[#8FA1B5]">Next Best Action</div>
              <div className="text-sm font-bold text-white uppercase font-display mt-0.5">
                {qualification.nextBestAction}
              </div>
            </div>
            <div className="text-xs text-cyan-300 font-mono">
              Deterministic Rules Active
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="shrink-0 px-6 py-3.5 bg-[#08182f] border-t border-cyan-500/20 flex items-center justify-between text-xs text-[#8FA1B5]">
          <span>Audit Logged Session Record</span>
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
