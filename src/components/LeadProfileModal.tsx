import React from 'react';
import { X, User, ShieldCheck, DollarSign, Calendar, FileText, Download, CheckCircle2, Star, Flame, Mail, Phone } from 'lucide-react';
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

  const handleDownloadDossier = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(qualification, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `ARCUS-Lead-Dossier-Suite5200-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-[#081222] border border-white/15 rounded-3xl overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.8)] flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-[#0a162b] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-600/30 border border-cyan-400/50 flex items-center justify-center">
              <User className="w-4 h-4 text-cyan-300" />
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

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadDossier}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-slate-200 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span>Export JSON</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Dossier Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* Top Score Matrix */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
              <div className="text-[10px] font-mono text-slate-400 uppercase">Acquisition Power</div>
              <div className="text-base font-bold text-emerald-400 font-mono">{qualification.estimatedBudget}</div>
              <div className="text-[10px] text-slate-400">Liquid Cash Structure</div>
            </div>
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
              <div className="text-[10px] font-mono text-slate-400 uppercase">Closing Timeline</div>
              <div className="text-base font-bold text-white font-mono">{qualification.liquidAllocationTimeline}</div>
              <div className="text-[10px] text-cyan-400">High Urgency</div>
            </div>
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
              <div className="text-[10px] font-mono text-slate-400 uppercase">Representation</div>
              <div className="text-base font-bold text-amber-300">{qualification.representation}</div>
              <div className="text-[10px] text-slate-400">Direct Principal</div>
            </div>
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
              <div className="text-[10px] font-mono text-slate-400 uppercase">AML Readiness</div>
              <div className="text-base font-bold text-emerald-400">Pre-Verified</div>
              <div className="text-[10px] text-emerald-400/80">FINTRAC Protocol Ready</div>
            </div>
          </div>

          {/* Extracted Insights Detail */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <h4 className="text-xs font-mono uppercase text-cyan-400 mb-3 tracking-wider">
              Semantic Signals & Qualification Observations
            </h4>
            <div className="space-y-2">
              {qualification.extractedInsights.map((insight, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{insight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Broker Guidance Notes */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-950/30 to-[#0c1930] border border-amber-500/20">
            <h4 className="text-xs font-mono uppercase text-amber-300 mb-2 tracking-wider">
              Sage Intelligence Advisory Notes for Listing Broker
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Prospect exhibits high financial sophistication with explicit preference for cash allocation and tax-efficient closing mechanics. Recommend initiating direct private consultation with lead brokerage partner (e.g. Barry Cohen, Harvey Kalles, or Brel team) and providing immediate unbranded architectural schematics and physical keycard security briefing.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-[#0a162b] border-t border-white/10 flex items-center justify-between">
          <div className="text-xs text-slate-400 font-mono">
            ID: ARCUS-HNWI-5200-ON · Status: Active Lead
          </div>
          <button
            onClick={onClose}
            className="py-2 px-5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold cursor-pointer shadow-md"
          >
            Close Dossier
          </button>
        </div>
      </div>
    </div>
  );
};
