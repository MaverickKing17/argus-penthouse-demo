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
  ShieldCheck,
  Award,
  ArrowUpRight,
  TrendingUp,
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
    <section className="w-full bg-gradient-to-b from-[#0A1128] via-[#08152E] to-[#050C1B] border-t border-cyan-500/30 pt-9 pb-14 px-4 sm:px-6 lg:px-10 relative">
      {/* Background ambient lighting glows */}
      <div className="absolute top-0 left-1/4 w-96 h-48 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute top-10 right-1/4 w-96 h-48 bg-[#BFA775]/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-[1720px] mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-7">
          <div className="flex items-center gap-3">
            <h2 className="text-xl sm:text-2xl font-display font-bold text-white tracking-wide drop-shadow-md">
              Broker View: Real-Time Lead Qualification
            </h2>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/50 text-emerald-300 text-xs font-mono font-semibold shadow-[0_0_15px_rgba(16,185,129,0.3)]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse duration-1000"></span>
              <span>Live Synced</span>
            </div>
          </div>
          
          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-cyan-300/80 bg-[#071630]/90 px-3 py-1.5 rounded-xl border border-cyan-500/30 shadow-inner">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
            <span>Active Buyer Intelligence Feed</span>
          </div>
        </div>

        {/* 3-Column Qualification Grid with Elevated Card Styling */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5">
          
          {/* Card 1: Lead Status & Predictive Scoring (lg:col-span-3) */}
          <div className="lg:col-span-3 bg-gradient-to-br from-[#0c1f3d]/95 via-[#0a1832]/90 to-[#071124]/95 border border-cyan-500/35 rounded-2xl p-5 sm:p-6 flex flex-col justify-between shadow-[0_15px_40px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.15)] backdrop-blur-xl relative overflow-hidden group hover:border-cyan-400/60 transition-all">
            {/* Top edge illumination */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent"></div>

            <div>
              <div className="flex items-center justify-between mb-3.5">
                <span className="text-xs font-mono uppercase tracking-wider text-cyan-300 font-bold flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Lead Status</span>
                </span>
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-red-500/20 text-red-300 border border-red-500/40">
                  Priority 1
                </span>
              </div>

              {/* Rich Crimson / Ruby Gradient Hot Lead Badge with Vibrant Glow & Pulse */}
              <div className="rounded-xl bg-gradient-to-r from-[#8b1522] via-[#a81c2b] to-[#6d0f19] border border-red-400/70 p-4 shadow-[0_0_30px_rgba(220,38,38,0.4),inset_0_1px_1px_rgba(255,255,255,0.3)] mb-5 animate-pulse duration-1000">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-red-500/40 border border-red-300/80 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(239,68,68,0.5)]">
                    <Flame className="w-6 h-6 text-white animate-bounce" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono font-bold tracking-widest text-red-200 uppercase drop-shadow">
                      {qualification.leadStatus}
                    </div>
                    <div className="text-base sm:text-lg font-bold text-white tracking-wide tabular-nums font-mono drop-shadow-md">
                      {qualification.leadBadge}
                    </div>
                  </div>
                </div>
              </div>

              {/* AI Confidence Score with Animated Fill Bar & Glow */}
              <div className="space-y-2.5 mb-5 bg-[#061124]/70 p-3.5 rounded-xl border border-cyan-500/25">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-200 font-semibold flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
                    <span>AI Confidence Score</span>
                  </span>
                  <span className="text-cyan-300 font-mono font-bold text-base tabular-nums drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]">
                    {qualification.confidenceScore}%
                  </span>
                </div>
                <div className="w-full h-3 bg-[#030914] rounded-full overflow-hidden p-0.5 border border-cyan-400/40 shadow-inner">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-300 transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(6,182,212,0.8)]"
                    style={{ width: `${animatedScore}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Key Quality Metrics with High-Contrast Pill Badges */}
            <div className="space-y-2.5 pt-3.5 border-t border-white/10 text-xs">
              <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.03] border border-white/5 hover:border-emerald-400/40 transition-colors">
                <span className="text-slate-300 font-medium">Lead Quality</span>
                <span className="text-emerald-300 font-bold px-2.5 py-0.5 rounded-md bg-emerald-500/20 border border-emerald-400/50 shadow-[0_0_10px_rgba(16,185,129,0.25)]">
                  {qualification.leadQuality}
                </span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.03] border border-white/5 hover:border-cyan-400/40 transition-colors">
                <span className="text-slate-300 font-medium">Intent Level</span>
                <span className="text-cyan-200 font-bold px-2.5 py-0.5 rounded-md bg-cyan-500/20 border border-cyan-400/50 shadow-[0_0_10px_rgba(6,182,212,0.25)]">
                  {qualification.intentLevel}
                </span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.03] border border-white/5 hover:border-emerald-400/40 transition-colors">
                <span className="text-slate-300 font-medium">Risk Level</span>
                <span className="text-emerald-300 font-bold flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-500/20 border border-emerald-400/50">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  {qualification.riskLevel}
                </span>
              </div>
            </div>
          </div>

          {/* Card 2: Qualification Summary & Extracted Insights (lg:col-span-5) - MAJOR VALUE PROP POP */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#0c1f3d]/95 via-[#0a1832]/90 to-[#071124]/95 border border-cyan-500/35 rounded-2xl p-5 sm:p-6 flex flex-col justify-between shadow-[0_15px_40px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.15)] backdrop-blur-xl relative overflow-hidden group hover:border-cyan-400/60 transition-all">
            {/* Top edge illumination */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#E6CA65]/80 to-transparent"></div>

            <div>
              <div className="flex items-center justify-between mb-3.5">
                <span className="text-xs font-mono uppercase tracking-wider text-[#F3E2B8] font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#E6CA65]" />
                  <span>Qualification Summary</span>
                </span>
                <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/40">
                  6 Verified Signals
                </span>
              </div>

              {/* 6 HIGH-IMPACT VALUE PROP PILLS GRID (STAND OUT & POP AGAINST DARK BACKGROUND) */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-5">
                
                {/* Value Prop 1: Verified ID */}
                <div className="group/pill flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-gradient-to-r from-[#0d2a4d] to-[#091e38] border border-cyan-400/60 hover:border-cyan-300 text-cyan-100 shadow-[0_4px_15px_rgba(6,182,212,0.25),inset_0_1px_1px_rgba(255,255,255,0.2)] transition-all hover:scale-[1.02] cursor-default">
                  <div className="w-6 h-6 rounded-lg bg-cyan-500/30 border border-cyan-300/60 flex items-center justify-center shrink-0 shadow-[0_0_8px_rgba(6,182,212,0.4)]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-200" />
                  </div>
                  <span className="text-xs font-bold font-display tracking-wide truncate">Verified ID</span>
                </div>

                {/* Value Prop 2: Budget */}
                <div className="group/pill flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-gradient-to-r from-[#1b2f25] to-[#0c1f17] border border-emerald-400/60 hover:border-emerald-300 text-emerald-100 shadow-[0_4px_15px_rgba(16,185,129,0.25),inset_0_1px_1px_rgba(255,255,255,0.2)] transition-all hover:scale-[1.02] cursor-default tabular-nums">
                  <div className="w-6 h-6 rounded-lg bg-emerald-500/30 border border-emerald-300/60 flex items-center justify-center shrink-0 shadow-[0_0_8px_rgba(16,185,129,0.4)]">
                    <DollarSign className="w-3.5 h-3.5 text-emerald-200" />
                  </div>
                  <span className="text-xs font-bold font-display tracking-wide truncate">Budget: $5M+</span>
                </div>

                {/* Value Prop 3: Cash Acquisition */}
                <div className="group/pill flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-gradient-to-r from-[#2c2311] to-[#1a1408] border border-[#E6CA65]/70 hover:border-[#E6CA65] text-[#F3E2B8] shadow-[0_4px_15px_rgba(191,167,117,0.3),inset_0_1px_1px_rgba(255,255,255,0.2)] transition-all hover:scale-[1.02] cursor-default">
                  <div className="w-6 h-6 rounded-lg bg-[#E6CA65]/30 border border-[#E6CA65]/70 flex items-center justify-center shrink-0 shadow-[0_0_8px_rgba(230,202,101,0.5)]">
                    <Briefcase className="w-3.5 h-3.5 text-[#F3E2B8]" />
                  </div>
                  <span className="text-xs font-bold font-display tracking-wide truncate">Cash Buyer</span>
                </div>

                {/* Value Prop 4: Timeline */}
                <div className="group/pill flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-gradient-to-r from-[#0d2a4d] to-[#091e38] border border-cyan-400/60 hover:border-cyan-300 text-cyan-100 shadow-[0_4px_15px_rgba(6,182,212,0.25),inset_0_1px_1px_rgba(255,255,255,0.2)] transition-all hover:scale-[1.02] cursor-default tabular-nums">
                  <div className="w-6 h-6 rounded-lg bg-cyan-500/30 border border-cyan-300/60 flex items-center justify-center shrink-0 shadow-[0_0_8px_rgba(6,182,212,0.4)]">
                    <Calendar className="w-3.5 h-3.5 text-cyan-200" />
                  </div>
                  <span className="text-xs font-bold font-display tracking-wide truncate">&lt;90 Days</span>
                </div>

                {/* Value Prop 5: Unrepresented */}
                <div className="group/pill flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-gradient-to-r from-[#211b3b] to-[#120e24] border border-purple-400/60 hover:border-purple-300 text-purple-100 shadow-[0_4px_15px_rgba(168,85,247,0.25),inset_0_1px_1px_rgba(255,255,255,0.2)] transition-all hover:scale-[1.02] cursor-default">
                  <div className="w-6 h-6 rounded-lg bg-purple-500/30 border border-purple-300/60 flex items-center justify-center shrink-0 shadow-[0_0_8px_rgba(168,85,247,0.4)]">
                    <User className="w-3.5 h-3.5 text-purple-200" />
                  </div>
                  <span className="text-xs font-bold font-display tracking-wide truncate">Unrepresented</span>
                </div>

                {/* Value Prop 6: High Intent */}
                <div className="group/pill flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-gradient-to-r from-[#381e11] to-[#1f0f08] border border-amber-400/70 hover:border-amber-300 text-amber-100 shadow-[0_4px_15px_rgba(245,158,11,0.3),inset_0_1px_1px_rgba(255,255,255,0.2)] transition-all hover:scale-[1.02] cursor-default">
                  <div className="w-6 h-6 rounded-lg bg-amber-500/30 border border-amber-300/70 flex items-center justify-center shrink-0 shadow-[0_0_8px_rgba(245,158,11,0.5)]">
                    <Zap className="w-3.5 h-3.5 text-amber-200" />
                  </div>
                  <span className="text-xs font-bold font-display tracking-wide truncate">High Intent</span>
                </div>

              </div>

              {/* Extracted Insights Section with Distinct Illuminated Cards */}
              <div className="text-xs font-mono uppercase tracking-wider text-cyan-300 font-bold mb-2.5 flex items-center gap-1.5">
                <span>Extracted Behavioral Insights</span>
              </div>

              <div className="space-y-2">
                {qualification.extractedInsights.map((insight, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3 rounded-xl bg-[#071630]/90 border border-cyan-500/25 text-xs text-slate-100 shadow-sm hover:border-cyan-400/50 hover:bg-[#091c3d] transition-all"
                  >
                    <div className="w-5 h-5 rounded-full bg-cyan-500/20 border border-cyan-400/60 flex items-center justify-center shrink-0 mt-0.5 shadow-[0_0_6px_rgba(6,182,212,0.35)]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-300" />
                    </div>
                    <span className="leading-relaxed font-normal">{insight}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3.5 border-t border-white/10 text-[11px] text-slate-400 flex items-center justify-between">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                <span>ARGUS Intelligence Vector v4.2</span>
              </span>
              <span className="text-cyan-300 font-mono font-bold bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/30">
                100% Deterministic Match
              </span>
            </div>
          </div>

          {/* Card 3: Lead Intelligence Key-Value Table & Action Buttons (lg:col-span-4) */}
          <div className="lg:col-span-4 bg-gradient-to-br from-[#0c1f3d]/95 via-[#0a1832]/90 to-[#071124]/95 border border-cyan-500/35 rounded-2xl p-5 sm:p-6 flex flex-col justify-between shadow-[0_15px_40px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.15)] backdrop-blur-xl relative overflow-hidden group hover:border-cyan-400/60 transition-all">
            {/* Top edge illumination */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent"></div>

            <div>
              <div className="flex items-center justify-between mb-3.5">
                <span className="text-xs font-mono uppercase tracking-wider text-cyan-300 font-bold">
                  Lead Intelligence
                </span>
                <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/40">
                  Ready For Closing
                </span>
              </div>

              {/* Key-Value Table with Elevated Rows & Tabular Financials */}
              <div className="space-y-1.5 text-xs divide-y divide-white/5">
                <div className="flex items-center justify-between py-2 px-2.5 rounded-lg bg-white/[0.02] hover:bg-white/[0.05] transition-colors">
                  <span className="text-slate-300 font-medium">Estimated Budget</span>
                  <span className="text-white font-mono font-bold text-sm tabular-nums financial-amount drop-shadow">
                    {qualification.estimatedBudget}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2 px-2.5 rounded-lg bg-white/[0.02] hover:bg-white/[0.05] transition-colors">
                  <span className="text-slate-300 font-medium">Purchase Structure</span>
                  <span className="text-emerald-300 font-bold px-2 py-0.5 rounded bg-emerald-500/20 border border-emerald-400/40">
                    {qualification.purchaseStructure}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2 px-2.5 rounded-lg bg-white/[0.02] hover:bg-white/[0.05] transition-colors">
                  <span className="text-slate-300 font-medium">Liquid Allocation Timeline</span>
                  <span className="text-cyan-200 font-mono font-bold tabular-nums">
                    {qualification.liquidAllocationTimeline}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2 px-2.5 rounded-lg bg-white/[0.02] hover:bg-white/[0.05] transition-colors">
                  <span className="text-slate-300 font-medium">Representation</span>
                  <span className="text-[#F3E2B8] font-bold px-2 py-0.5 rounded bg-[#E6CA65]/15 border border-[#E6CA65]/30">
                    {qualification.representation}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2 px-2.5 rounded-lg bg-white/[0.02] hover:bg-white/[0.05] transition-colors">
                  <span className="text-slate-300 font-medium">Property Interest</span>
                  <span className="text-white font-bold">{qualification.propertyInterest}</span>
                </div>
                <div className="flex items-center justify-between py-2 px-2.5 rounded-lg bg-white/[0.02] hover:bg-white/[0.05] transition-colors">
                  <span className="text-slate-300 font-medium">Location Preference</span>
                  <span className="text-slate-200">{qualification.locationPreference}</span>
                </div>
                <div className="flex items-center justify-between py-2 px-2.5 rounded-lg bg-white/[0.02] hover:bg-white/[0.05] transition-colors">
                  <span className="text-slate-300 font-medium">Intent Score</span>
                  <div className="flex items-center gap-1 text-amber-300 drop-shadow-[0_0_6px_rgba(251,191,36,0.5)]">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2 px-2.5">
                  <span className="text-slate-400">Last Telemetry Sync</span>
                  <span className="text-slate-300 font-mono text-[11px] tabular-nums timestamp">
                    {qualification.lastUpdated || 'Today, 6:47 PM'}
                  </span>
                </div>
              </div>
            </div>

            {/* ACTION BUTTONS: SOLID LUXE GOLD CONTACT LEAD + OUTLINED SECONDARIES */}
            <div className="grid grid-cols-3 gap-2.5 mt-5 pt-3.5 border-t border-white/10">
              {/* Outlined Secondary: View Full Profile */}
              <button
                onClick={onViewProfile}
                className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-white/[0.05] hover:bg-[#BFA775]/20 text-amber-200 border border-[#BFA775]/60 text-xs font-bold transition-all cursor-pointer shadow-md hover:border-[#BFA775] hover:scale-[1.02]"
              >
                <UserCheck className="w-3.5 h-3.5 text-[#E6CA65] shrink-0" />
                <span className="truncate">Full Profile</span>
              </button>

              {/* SOLID LUXE GOLD PRIMARY: Contact Lead */}
              <button
                onClick={onContactLead}
                className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#caa866] to-[#bfa775] hover:brightness-110 active:scale-[0.99] text-[#0A1128] font-bold text-xs shadow-[0_0_20px_rgba(191,167,117,0.5)] transition-all cursor-pointer transform hover:-translate-y-0.5 hover:scale-[1.02]"
              >
                <Mail className="w-3.5 h-3.5 text-[#0A1128] shrink-0" />
                <span className="truncate">Contact Lead</span>
              </button>

              {/* Outlined Secondary: Schedule Private Call */}
              <button
                onClick={onScheduleCall}
                className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-white/[0.05] hover:bg-cyan-500/20 text-cyan-200 border border-cyan-400/60 text-xs font-bold transition-all cursor-pointer shadow-md hover:border-cyan-400 hover:scale-[1.02]"
              >
                <Calendar className="w-3.5 h-3.5 text-cyan-300 shrink-0" />
                <span className="truncate">Schedule Call</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
