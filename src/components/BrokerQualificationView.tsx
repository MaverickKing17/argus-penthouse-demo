import React from 'react';
import {
  Flame,
  CheckCircle2,
  ShieldCheck,
  DollarSign,
  Briefcase,
  Calendar,
  User,
  Sparkles,
  Zap,
  Mail,
  PhoneCall,
  UserCheck,
  Star,
  Activity,
  ArrowUpRight,
} from 'lucide-react';
import { QualificationData } from '../types';

interface BrokerQualificationViewProps {
  qualification: QualificationData;
  onViewProfile: () => void;
  onContactLead: () => void;
  onScheduleCall: () => void;
}

export const BrokerQualificationView: React.FC<BrokerQualificationViewProps> = ({
  qualification,
  onViewProfile,
  onContactLead,
  onScheduleCall,
}) => {
  return (
    <section className="w-full bg-[#050c18] border-t border-white/10 pt-8 pb-12 px-4 lg:px-8">
      <div className="max-w-[1680px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-xl lg:text-2xl font-serif font-bold text-white tracking-wide">
                Broker View: Real-Time Lead Qualification
              </h2>
              <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Live</span>
              </div>
            </div>
            <p className="text-xs lg:text-sm text-slate-400 mt-1">
              Autonomous HNWI telemetry stream extracted from active ARGUS concierge dialogue.
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
            <span className="text-cyan-400 bg-cyan-950/60 px-3 py-1 rounded-md border border-cyan-800/60">
              Listing: Penthouse Suite 5200 ($15.8M CAD)
            </span>
          </div>
        </div>

        {/* 3-Column Qualification Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5">
          {/* Card 1: Lead Status & Predictive Scoring (lg:col-span-3) */}
          <div className="lg:col-span-3 bg-[#081324] border border-white/10 rounded-2xl p-5 flex flex-col justify-between shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 rounded-full blur-2xl pointer-events-none"></div>

            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
                Lead Status
              </div>

              {/* Hot Lead Badge Banner */}
              <div className="rounded-xl bg-gradient-to-r from-red-950/90 via-rose-900/80 to-amber-950/90 border border-red-500/30 p-4 shadow-[0_0_20px_rgba(239,68,68,0.15)] mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-red-500/20 border border-red-400/40 flex items-center justify-center shrink-0">
                    <Flame className="w-6 h-6 text-red-400 animate-pulse" />
                  </div>
                  <div>
                    <div className="text-xs font-mono font-bold tracking-wider text-red-300 uppercase">
                      {qualification.leadStatus}
                    </div>
                    <div className="text-sm lg:text-base font-bold text-white tracking-wide">
                      {qualification.leadBadge}
                    </div>
                  </div>
                </div>
              </div>

              {/* AI Confidence Score */}
              <div className="space-y-2 mb-5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 font-medium">AI Confidence Score</span>
                  <span className="text-cyan-300 font-mono font-bold text-base">
                    {qualification.confidenceScore}%
                  </span>
                </div>
                <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 transition-all duration-700 shadow-[0_0_10px_rgba(6,182,212,0.5)]"
                    style={{ width: `${qualification.confidenceScore}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="space-y-2.5 pt-3 border-t border-white/10 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Lead Quality</span>
                <span className="text-emerald-400 font-semibold px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                  {qualification.leadQuality}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Intent Level</span>
                <span className="text-cyan-400 font-semibold px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20">
                  {qualification.intentLevel}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Risk Level</span>
                <span className="text-emerald-400 font-medium flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  {qualification.riskLevel}
                </span>
              </div>
            </div>
          </div>

          {/* Card 2: Qualification Summary & Extracted Insights (lg:col-span-5) */}
          <div className="lg:col-span-5 bg-[#081324] border border-white/10 rounded-2xl p-5 flex flex-col justify-between shadow-xl">
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
                Qualification Summary
              </div>

              {/* 6 Summary Pills Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-5">
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span className="truncate">Verified ID</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs font-medium">
                  <DollarSign className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span className="truncate">Budget: $5M+</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs font-medium">
                  <Briefcase className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span className="truncate">Cash Acquisition</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs font-medium">
                  <Calendar className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span className="truncate">Timeline: &lt;90 Days</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs font-medium">
                  <User className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span className="truncate">Unrepresented</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs font-medium">
                  <Zap className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span className="truncate">High Intent</span>
                </div>
              </div>

              {/* Extracted Insights Section */}
              <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2.5">
                Extracted Insights
              </div>

              <div className="space-y-2">
                {qualification.extractedInsights.map((insight, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{insight}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-white/10 text-[11px] text-slate-400 flex items-center justify-between">
              <span>Qualification Engine: ARGUS Semantic Vector v4.2</span>
              <span className="text-cyan-400">Status: Real-Time Synced</span>
            </div>
          </div>

          {/* Card 3: Lead Intelligence Key-Value Table & Action Buttons (lg:col-span-4) */}
          <div className="lg:col-span-4 bg-[#081324] border border-white/10 rounded-2xl p-5 flex flex-col justify-between shadow-xl">
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
                Lead Intelligence
              </div>

              {/* Key-Value Table */}
              <div className="space-y-2 text-xs divide-y divide-white/5">
                <div className="flex items-center justify-between pb-1.5">
                  <span className="text-slate-400">Estimated Budget</span>
                  <span className="text-white font-mono font-semibold">
                    {qualification.estimatedBudget}
                  </span>
                </div>
                <div className="flex items-center justify-between py-1.5">
                  <span className="text-slate-400">Purchase Structure</span>
                  <span className="text-emerald-400 font-semibold">{qualification.purchaseStructure}</span>
                </div>
                <div className="flex items-center justify-between py-1.5">
                  <span className="text-slate-400">Liquid Allocation Timeline</span>
                  <span className="text-cyan-300 font-mono font-medium">
                    {qualification.liquidAllocationTimeline}
                  </span>
                </div>
                <div className="flex items-center justify-between py-1.5">
                  <span className="text-slate-400">Representation</span>
                  <span className="text-amber-300 font-medium">{qualification.representation}</span>
                </div>
                <div className="flex items-center justify-between py-1.5">
                  <span className="text-slate-400">Property Interest</span>
                  <span className="text-white font-medium">{qualification.propertyInterest}</span>
                </div>
                <div className="flex items-center justify-between py-1.5">
                  <span className="text-slate-400">Location Preference</span>
                  <span className="text-slate-200">{qualification.locationPreference}</span>
                </div>
                <div className="flex items-center justify-between py-1.5">
                  <span className="text-slate-400">Property Type</span>
                  <span className="text-slate-200">{qualification.propertyType}</span>
                </div>
                <div className="flex items-center justify-between py-1.5">
                  <span className="text-slate-400">Intent Score</span>
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between pt-1.5">
                  <span className="text-slate-400">Last Updated</span>
                  <span className="text-slate-400 font-mono text-[11px]">
                    {qualification.lastUpdated || 'Today, 6:47 PM'}
                  </span>
                </div>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="grid grid-cols-3 gap-2 mt-5 pt-3 border-t border-white/10">
              <button
                onClick={onViewProfile}
                className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/90 text-slate-200 hover:text-white border border-white/10 text-xs font-semibold transition-all cursor-pointer shadow-md"
              >
                <UserCheck className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span className="truncate">View Full Profile</span>
              </button>

              <button
                onClick={onContactLead}
                className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-amber-600/20 hover:bg-amber-600/30 text-amber-300 hover:text-amber-200 border border-amber-500/30 text-xs font-semibold transition-all cursor-pointer shadow-md"
              >
                <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="truncate">Contact Lead</span>
              </button>

              <button
                onClick={onScheduleCall}
                className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-gradient-to-r from-cyan-600/40 to-blue-600/40 hover:from-cyan-600/60 hover:to-blue-600/60 text-cyan-200 hover:text-white border border-cyan-500/40 text-xs font-semibold transition-all cursor-pointer shadow-md"
              >
                <Calendar className="w-3.5 h-3.5 text-cyan-300 shrink-0" />
                <span className="truncate">Schedule Private Call</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
