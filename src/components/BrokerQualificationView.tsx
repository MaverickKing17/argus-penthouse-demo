import React, { useState, useEffect } from 'react';
import {
  Flame,
  CheckCircle2,
  DollarSign,
  Briefcase,
  Calendar,
  User,
  Zap,
  Mail,
  UserCheck,
  Star,
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
  // Animate progress bar fill on mount from 0% to 95%
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedScore(qualification.confidenceScore);
    }, 150);
    return () => clearTimeout(timer);
  }, [qualification.confidenceScore]);

  return (
    <section className="w-full bg-gradient-to-b from-[#0A1128] via-[#08152E] to-[#050C1B] border-t border-cyan-500/20 pt-8 pb-12 px-4 sm:px-6 lg:px-10">
      <div className="max-w-[1720px] mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <h2 className="text-xl sm:text-2xl font-display font-bold text-white tracking-wide">
              Broker View: Real-Time Lead Qualification
            </h2>
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-400/40 text-emerald-400 text-xs font-mono font-semibold shadow-[0_0_10px_rgba(16,185,129,0.2)]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse duration-1000"></span>
              <span>Live</span>
            </div>
          </div>
        </div>

        {/* 3-Column Qualification Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5">
          
          {/* Card 1: Lead Status & Predictive Scoring (lg:col-span-3) */}
          <div className="lg:col-span-3 bg-[#081730]/90 border border-cyan-500/20 rounded-2xl p-5 flex flex-col justify-between shadow-xl backdrop-blur-md relative overflow-hidden">
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold mb-3">
                Lead Status
              </div>

              {/* Rich Crimson / Ruby Gradient Hot Lead Badge with Keyframe Pulse */}
              <div className="rounded-xl bg-gradient-to-r from-[#7a121d] via-[#941724] to-[#600e16] border border-red-400/50 p-4 shadow-[0_0_25px_rgba(220,38,38,0.3)] mb-5 animate-pulse duration-1000">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-red-500/30 border border-red-400/60 flex items-center justify-center shrink-0 shadow-inner">
                    <Flame className="w-6 h-6 text-red-300 animate-pulse" />
                  </div>
                  <div>
                    <div className="text-xs font-mono font-bold tracking-widest text-red-200 uppercase">
                      {qualification.leadStatus}
                    </div>
                    <div className="text-sm sm:text-base font-bold text-white tracking-wide tabular-nums font-mono">
                      {qualification.leadBadge}
                    </div>
                  </div>
                </div>
              </div>

              {/* AI Confidence Score with Animated Fill Width on Mount */}
              <div className="space-y-2 mb-5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 font-semibold">AI Confidence Score</span>
                  <span className="text-cyan-300 font-mono font-bold text-base tabular-nums">
                    {qualification.confidenceScore}%
                  </span>
                </div>
                <div className="w-full h-2.5 bg-[#050D1C] rounded-full overflow-hidden p-0.5 border border-cyan-500/30">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-teal-300 transition-all duration-1000 ease-out shadow-[0_0_12px_rgba(6,182,212,0.6)]"
                    style={{ width: `${animatedScore}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="space-y-2.5 pt-3 border-t border-white/10 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Lead Quality</span>
                <span className="text-emerald-400 font-semibold px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30">
                  {qualification.leadQuality}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Intent Level</span>
                <span className="text-cyan-300 font-semibold px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-400/30">
                  {qualification.intentLevel}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Risk Level</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  {qualification.riskLevel}
                </span>
              </div>
            </div>
          </div>

          {/* Card 2: Qualification Summary & Extracted Insights (lg:col-span-5) */}
          <div className="lg:col-span-5 bg-[#081730]/90 border border-cyan-500/20 rounded-2xl p-5 flex flex-col justify-between shadow-xl backdrop-blur-md">
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold mb-3">
                Qualification Summary
              </div>

              {/* 6 Summary Pills Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-5">
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#092244]/60 border border-cyan-400/40 text-cyan-200 text-xs font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span className="truncate">Verified ID</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#092244]/60 border border-cyan-400/40 text-cyan-200 text-xs font-semibold tabular-nums">
                  <DollarSign className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span className="truncate">Budget: $5M+</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#092244]/60 border border-cyan-400/40 text-cyan-200 text-xs font-semibold">
                  <Briefcase className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span className="truncate">Cash Acquisition</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#092244]/60 border border-cyan-400/40 text-cyan-200 text-xs font-semibold tabular-nums">
                  <Calendar className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span className="truncate">Timeline: &lt;90 Days</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#092244]/60 border border-cyan-400/40 text-cyan-200 text-xs font-semibold">
                  <User className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span className="truncate">Unrepresented</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#092244]/60 border border-cyan-400/40 text-cyan-200 text-xs font-semibold">
                  <Zap className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span className="truncate">High Intent</span>
                </div>
              </div>

              {/* Extracted Insights Section */}
              <div className="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold mb-2.5">
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
              <span>ARGUS Intelligence Vector v4.2</span>
              <span className="text-cyan-400 font-mono font-semibold">Live Synced</span>
            </div>
          </div>

          {/* Card 3: Lead Intelligence Key-Value Table & Action Buttons (lg:col-span-4) */}
          <div className="lg:col-span-4 bg-[#081730]/90 border border-cyan-500/20 rounded-2xl p-5 flex flex-col justify-between shadow-xl backdrop-blur-md">
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold mb-3">
                Lead Intelligence
              </div>

              {/* Key-Value Table with Tabular Financials */}
              <div className="space-y-2 text-xs divide-y divide-white/5">
                <div className="flex items-center justify-between pb-1.5">
                  <span className="text-slate-300">Estimated Budget</span>
                  <span className="text-white font-mono font-semibold tabular-nums financial-amount">
                    {qualification.estimatedBudget}
                  </span>
                </div>
                <div className="flex items-center justify-between py-1.5">
                  <span className="text-slate-300">Purchase Structure</span>
                  <span className="text-emerald-400 font-semibold">{qualification.purchaseStructure}</span>
                </div>
                <div className="flex items-center justify-between py-1.5">
                  <span className="text-slate-300">Liquid Allocation Timeline</span>
                  <span className="text-cyan-300 font-mono font-semibold tabular-nums">
                    {qualification.liquidAllocationTimeline}
                  </span>
                </div>
                <div className="flex items-center justify-between py-1.5">
                  <span className="text-slate-300">Representation</span>
                  <span className="text-[#F3E2B8] font-semibold">{qualification.representation}</span>
                </div>
                <div className="flex items-center justify-between py-1.5">
                  <span className="text-slate-300">Property Interest</span>
                  <span className="text-white font-semibold">{qualification.propertyInterest}</span>
                </div>
                <div className="flex items-center justify-between py-1.5">
                  <span className="text-slate-300">Location Preference</span>
                  <span className="text-slate-200">{qualification.locationPreference}</span>
                </div>
                <div className="flex items-center justify-between py-1.5">
                  <span className="text-slate-300">Property Type</span>
                  <span className="text-slate-200">{qualification.propertyType}</span>
                </div>
                <div className="flex items-center justify-between py-1.5">
                  <span className="text-slate-300">Intent Score</span>
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between pt-1.5">
                  <span className="text-slate-400">Last Updated</span>
                  <span className="text-slate-400 font-mono text-[11px] tabular-nums timestamp">
                    {qualification.lastUpdated || 'Today, 6:47 PM'}
                  </span>
                </div>
              </div>
            </div>

            {/* ACTION BUTTONS: SOLID LUXE GOLD CONTACT LEAD + OUTLINED SECONDARIES */}
            <div className="grid grid-cols-3 gap-2.5 mt-5 pt-3 border-t border-white/10">
              {/* Outlined Secondary: View Full Profile */}
              <button
                onClick={onViewProfile}
                className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-transparent hover:bg-[#BFA775]/10 text-amber-200 border border-[#BFA775]/50 text-xs font-semibold transition-all cursor-pointer shadow-sm hover:border-[#BFA775]"
              >
                <UserCheck className="w-3.5 h-3.5 text-[#E6CA65] shrink-0" />
                <span className="truncate">View Full Profile</span>
              </button>

              {/* SOLID LUXE GOLD PRIMARY: Contact Lead */}
              <button
                onClick={onContactLead}
                className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-[#BFA775] hover:bg-[#caa866] hover:brightness-110 active:scale-[0.99] text-[#0A1128] font-bold text-xs shadow-[0_0_15px_rgba(191,167,117,0.4)] transition-all cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <Mail className="w-3.5 h-3.5 text-[#0A1128] shrink-0" />
                <span className="truncate">Contact Lead</span>
              </button>

              {/* Outlined Secondary: Schedule Private Call */}
              <button
                onClick={onScheduleCall}
                className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-transparent hover:bg-cyan-500/10 text-cyan-200 border border-cyan-400/50 text-xs font-semibold transition-all cursor-pointer shadow-sm hover:border-cyan-400"
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
