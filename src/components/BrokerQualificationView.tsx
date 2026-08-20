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
  Shield,
  Award,
  ArrowUpRight,
  TrendingUp,
  ChevronDown,
  ChevronUp,
  Lock,
  FileCheck2,
  HelpCircle,
  Clock,
  Sparkles,
  Info,
} from 'lucide-react';
import { QualificationData } from '../types';
import { YORKVILLE_MARKET_INTELLIGENCE } from '../data/propertyData';

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
  const [animatedScore, setAnimatedScore] = useState(0);
  const [isWhyQualifiedOpen, setIsWhyQualifiedOpen] = useState(true);
  const [isMarketOpen, setIsMarketOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedScore(qualification.qualificationConfidence);
    }, 150);
    return () => clearTimeout(timer);
  }, [qualification.qualificationConfidence]);

  return (
    <section className="w-full bg-gradient-to-b from-[#061225] via-[#071526] to-[#040C1A] border-t border-cyan-500/20 pt-8 pb-14 px-4 sm:px-6 lg:px-10 relative">
      {/* Background ambient lighting - restrained institutional glow */}
      <div className="absolute top-0 left-1/4 w-96 h-48 bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute top-10 right-1/4 w-96 h-48 bg-[#BFA775]/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-[1720px] mx-auto relative z-10 space-y-6">
        
        {/* Architecture Positioning Banner: 3 Layers */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider text-cyan-300 font-semibold">
              <span>Middle Office · Structured Qualification Intelligence</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-display font-semibold text-white tracking-wide">
              Broker View: Real-Time Lead Qualification
            </h2>
            <p className="text-xs text-[#C7D0DC]">
              Derived from deterministic qualification rules and structured conversational evidence.
            </p>
          </div>
          
          {/* Security UX Status Area: Restrained Cyan Indicators */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#061428] border border-cyan-500/30 text-xs text-white">
            <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
            <span className="font-mono text-[11px] text-cyan-200">ARGUS SESSION:</span>
            <span className="text-[11px] text-slate-300">Secure Session</span>
            <span className="text-cyan-500/60">·</span>
            <span className="text-[11px] text-slate-300">Policy Controlled</span>
            <span className="text-cyan-500/60">·</span>
            <span className="text-[11px] text-slate-300">Audit Logged</span>
          </div>
        </div>

        {/* 3-Column Qualification Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5">
          
          {/* Column 1: Lead Status, Qualification Confidence & Next Best Action (lg:col-span-4) */}
          <div className="lg:col-span-4 bg-[#07172E]/90 border border-cyan-500/30 rounded-2xl p-5 sm:p-6 flex flex-col justify-between shadow-xl backdrop-blur-xl space-y-5">
            <div>
              {/* Card Header */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono uppercase tracking-wider text-cyan-300 font-bold flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Lead Classification</span>
                </span>
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-red-500/20 text-red-300 border border-red-500/40">
                  Priority 1
                </span>
              </div>

              {/* Evidence-Backed HOT LEAD Badge */}
              <div className="rounded-xl bg-gradient-to-r from-[#7a121d] via-[#8c1724] to-[#600e18] border border-red-400/50 p-4 shadow-lg mb-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-red-500/30 border border-red-300/60 flex items-center justify-center shrink-0">
                    <Flame className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono font-bold tracking-widest text-red-200 uppercase">
                      {qualification.leadStatus}
                    </div>
                    <div className="text-base sm:text-lg font-bold text-white tracking-wide font-mono">
                      {qualification.leadBadge}
                    </div>
                    <div className="text-[11px] text-red-200/90 font-light mt-0.5">
                      Evidence-backed qualification
                    </div>
                  </div>
                </div>
              </div>

              {/* Qualification Confidence Metric */}
              <div className="space-y-2 mb-4 bg-[#051122] p-3.5 rounded-xl border border-cyan-500/20">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white font-semibold flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
                    <span>QUALIFICATION CONFIDENCE</span>
                  </span>
                  <span className="text-cyan-300 font-mono font-bold text-base tabular-nums">
                    {qualification.qualificationConfidence}%
                  </span>
                </div>
                <div className="w-full h-2.5 bg-[#030914] rounded-full overflow-hidden p-0.5 border border-cyan-400/30">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-teal-300 transition-all duration-1000 ease-out"
                    style={{ width: `${animatedScore}%` }}
                  ></div>
                </div>
                <div className="flex items-center justify-between text-[10px] text-[#8FA1B5] font-mono">
                  <span>Deterministic Signal Engine</span>
                  <span className="text-cyan-300 font-medium">Deterministic Rules</span>
                </div>
              </div>

              {/* NEXT BEST ACTION SECTION (VISUALLY PROMINENT) */}
              <div className="p-3.5 rounded-xl bg-gradient-to-r from-[#122847] to-[#0d1e38] border border-cyan-400/40 space-y-1.5 shadow-md">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-300 font-bold flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#BFA775]" />
                    <span>Next Best Action</span>
                  </span>
                  <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950/80 px-2 py-0.2 rounded border border-emerald-500/30">
                    Recommended
                  </span>
                </div>
                <div className="text-sm font-bold text-white font-display uppercase tracking-wide flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>{qualification.nextBestAction}</span>
                </div>
                <p className="text-[11px] text-[#C7D0DC] leading-tight">
                  High cash acquisition intent identified without financing contingency.
                </p>
              </div>
            </div>

            {/* Structured Qualification Signals (Stated vs Verified) */}
            <div className="space-y-2 pt-3 border-t border-white/10 text-xs">
              <div className="text-[11px] font-mono uppercase tracking-wider text-[#8FA1B5] font-semibold flex items-center justify-between">
                <span>Signal Taxonomy</span>
                <span className="text-cyan-300">Data State</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 rounded-lg bg-[#051122] border border-white/5 flex items-center justify-between">
                  <span className="text-[#C7D0DC]">Budget</span>
                  <span className="text-emerald-300 font-semibold font-mono text-[11px]">$5M+ · Stated</span>
                </div>
                <div className="p-2 rounded-lg bg-[#051122] border border-white/5 flex items-center justify-between">
                  <span className="text-[#C7D0DC]">Structure</span>
                  <span className="text-emerald-300 font-semibold font-mono text-[11px]">Cash · Stated</span>
                </div>
                <div className="p-2 rounded-lg bg-[#051122] border border-white/5 flex items-center justify-between">
                  <span className="text-[#C7D0DC]">Timeline</span>
                  <span className="text-cyan-300 font-semibold font-mono text-[11px]">&lt;90d · Stated</span>
                </div>
                <div className="p-2 rounded-lg bg-[#051122] border border-white/5 flex items-center justify-between">
                  <span className="text-[#C7D0DC]">Identity</span>
                  <span className="text-amber-300 font-semibold font-mono text-[11px]">Pending</span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Evidence-Based Qualification & Behavioral Insights (lg:col-span-4) */}
          <div className="lg:col-span-4 bg-[#07172E]/90 border border-cyan-500/30 rounded-2xl p-5 sm:p-6 flex flex-col justify-between shadow-xl backdrop-blur-xl space-y-4">
            <div>
              {/* Header with Collapsible Toggle */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono uppercase tracking-wider text-cyan-300 font-bold flex items-center gap-1.5">
                  <FileCheck2 className="w-4 h-4 text-cyan-400" />
                  <span>Why This Lead Qualified</span>
                </span>
                <button
                  onClick={() => setIsWhyQualifiedOpen(!isWhyQualifiedOpen)}
                  className="text-xs text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer font-mono"
                >
                  <span>{isWhyQualifiedOpen ? 'Collapse' : 'Expand'}</span>
                  {isWhyQualifiedOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Expandable Evidence Breakdown */}
              {isWhyQualifiedOpen && (
                <div className="space-y-2 mb-4">
                  <div className="p-2.5 rounded-xl bg-[#051122] border border-cyan-500/20 text-xs text-white space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-white">Budget</span>
                      <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950/80 px-2 py-0.2 rounded border border-cyan-500/30">
                        Source: Buyer stated
                      </span>
                    </div>
                    <p className="text-[#C7D0DC] text-[11.5px] leading-relaxed">
                      {qualification.qualificationEvidence.budget}
                    </p>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#051122] border border-cyan-500/20 text-xs text-white space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-white">Structure</span>
                      <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950/80 px-2 py-0.2 rounded border border-cyan-500/30">
                        Source: Buyer stated
                      </span>
                    </div>
                    <p className="text-[#C7D0DC] text-[11.5px] leading-relaxed">
                      {qualification.qualificationEvidence.structure}
                    </p>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#051122] border border-cyan-500/20 text-xs text-white space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-white">Timeline</span>
                      <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950/80 px-2 py-0.2 rounded border border-cyan-500/30">
                        Source: Buyer stated
                      </span>
                    </div>
                    <p className="text-[#C7D0DC] text-[11.5px] leading-relaxed">
                      {qualification.qualificationEvidence.timeline}
                    </p>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#051122] border border-cyan-500/20 text-xs text-white space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-white">Representation</span>
                      <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950/80 px-2 py-0.2 rounded border border-cyan-500/30">
                        Source: Buyer stated
                      </span>
                    </div>
                    <p className="text-[#C7D0DC] text-[11.5px] leading-relaxed">
                      {qualification.qualificationEvidence.representation}
                    </p>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#051122] border border-cyan-500/20 text-xs text-white space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-white">Intent</span>
                      <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950/80 px-2 py-0.2 rounded border border-emerald-500/30">
                        Observed Action
                      </span>
                    </div>
                    <p className="text-[#C7D0DC] text-[11.5px] leading-relaxed">
                      {qualification.qualificationEvidence.intent}
                    </p>
                  </div>
                </div>
              )}

              {/* Extracted Insights Summary */}
              <div className="text-[11px] font-mono uppercase tracking-wider text-cyan-300 font-bold mb-2 flex items-center gap-1.5">
                <span>Extracted Conversation Signals</span>
              </div>
              <div className="space-y-1.5">
                {qualification.extractedInsights.slice(0, 3).map((insight, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 p-2 rounded-lg bg-[#051122] border border-white/5 text-xs text-white"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-300 shrink-0 mt-0.5" />
                    <span className="leading-snug text-[#C7D0DC] font-normal">{insight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Architecture Compliance Tag */}
            <div className="pt-3 border-t border-white/10 text-[11px] text-[#8FA1B5] flex items-center justify-between font-mono">
              <span className="flex items-center gap-1.5">
                <Lock className="w-3 h-3 text-cyan-400" />
                <span>Deterministic Qualification Rules</span>
              </span>
              <span className="text-cyan-300 font-semibold">Compliance-Aware</span>
            </div>
          </div>

          {/* Column 3: Lead Intelligence Key-Value Table & Action Buttons (lg:col-span-4) */}
          <div className="lg:col-span-4 bg-[#07172E]/90 border border-cyan-500/30 rounded-2xl p-5 sm:p-6 flex flex-col justify-between shadow-xl backdrop-blur-xl space-y-4">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono uppercase tracking-wider text-cyan-300 font-bold">
                  Lead Intelligence
                </span>
                <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/40">
                  Ready For Closing
                </span>
              </div>

              {/* Clean Key-Value Table with Explicit Data States (NO PII EXPOSURE) */}
              <div className="space-y-1.5 text-xs divide-y divide-white/5">
                <div className="flex items-center justify-between py-2 px-2.5 rounded-lg bg-white/[0.02]">
                  <span className="text-[#C7D0DC] font-medium">Estimated Budget</span>
                  <div className="text-right">
                    <div className="text-white font-mono font-bold text-sm tabular-nums">
                      {qualification.budget.value}
                    </div>
                    <div className="text-[10px] text-cyan-300 font-mono">
                      Source: {qualification.budget.sourceLabel || 'Buyer stated'}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between py-2 px-2.5 rounded-lg bg-white/[0.02]">
                  <span className="text-[#C7D0DC] font-medium">Purchase Structure</span>
                  <div className="text-right">
                    <span className="text-emerald-300 font-semibold px-2 py-0.5 rounded bg-emerald-500/20 border border-emerald-400/40">
                      {qualification.purchaseStructure.value}
                    </span>
                    <div className="text-[10px] text-cyan-300 font-mono mt-0.5">
                      Source: {qualification.purchaseStructure.sourceLabel || 'Buyer stated'}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between py-2 px-2.5 rounded-lg bg-white/[0.02]">
                  <span className="text-[#C7D0DC] font-medium">Acquisition Timeline</span>
                  <div className="text-right">
                    <span className="text-cyan-200 font-mono font-semibold">
                      {qualification.timeline.value}
                    </span>
                    <div className="text-[10px] text-cyan-300 font-mono mt-0.5">
                      Source: {qualification.timeline.sourceLabel || 'Buyer stated'}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between py-2 px-2.5 rounded-lg bg-white/[0.02]">
                  <span className="text-[#C7D0DC] font-medium">Representation</span>
                  <div className="text-right">
                    <span className="text-[#F3E2B8] font-semibold px-2 py-0.5 rounded bg-[#BFA775]/15 border border-[#BFA775]/30">
                      {qualification.representation.value}
                    </span>
                    <div className="text-[10px] text-cyan-300 font-mono mt-0.5">
                      Source: {qualification.representation.sourceLabel || 'Buyer stated'}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between py-2 px-2.5 rounded-lg bg-white/[0.02]">
                  <span className="text-[#C7D0DC] font-medium">Property Interest</span>
                  <span className="text-white font-semibold">{qualification.propertyInterest}</span>
                </div>

                <div className="flex items-center justify-between py-2 px-2.5 rounded-lg bg-white/[0.02]">
                  <span className="text-[#C7D0DC] font-medium">Location Preference</span>
                  <span className="text-white">{qualification.locationPreference}</span>
                </div>

                <div className="flex items-center justify-between py-2 px-2.5 rounded-lg bg-white/[0.02]">
                  <span className="text-[#C7D0DC] font-medium">Intent</span>
                  <span className="text-emerald-300 font-semibold">High</span>
                </div>

                <div className="flex items-center justify-between py-2 px-2.5 rounded-lg bg-white/[0.02]">
                  <span className="text-[#C7D0DC] font-medium">Identity</span>
                  <span className="text-amber-300 font-mono text-[11px] font-semibold">
                    {qualification.verificationStatus}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-2 px-2.5 text-[11px] text-[#8FA1B5]">
                  <span>Last Updated</span>
                  <span className="text-white font-mono">{qualification.lastUpdated || 'Today, 6:47 PM'}</span>
                </div>
              </div>
            </div>

            {/* ACTION BUTTONS: Secondary & Tertiary Actions in Vibrant Teal (#00C4CC) Outline Style */}
            <div className="grid grid-cols-3 gap-2 pt-3 border-t border-white/10">
              {/* Action 1: View Full Profile (Outlined #00C4CC) */}
              <button
                onClick={onViewProfile}
                className="flex items-center justify-center gap-1 py-2.5 px-2 rounded-xl bg-transparent hover:bg-[#00C4CC]/10 text-[#00C4CC] border border-[#00C4CC]/70 hover:border-[#00C4CC] text-xs font-semibold transition-all cursor-pointer truncate shadow-sm"
              >
                <UserCheck className="w-3.5 h-3.5 text-[#00C4CC] shrink-0" />
                <span className="truncate">Full Profile</span>
              </button>

              {/* Action 2: Contact Lead / Contact Agent (Outlined #00C4CC) */}
              <button
                onClick={onContactLead}
                className="flex items-center justify-center gap-1 py-2.5 px-2 rounded-xl bg-transparent hover:bg-[#00C4CC]/10 text-[#00C4CC] border border-[#00C4CC]/70 hover:border-[#00C4CC] text-xs font-semibold transition-all cursor-pointer truncate shadow-sm"
              >
                <Mail className="w-3.5 h-3.5 text-[#00C4CC] shrink-0" />
                <span className="truncate">Contact Agent</span>
              </button>

              {/* Action 3: Schedule Private Call (Outlined #00C4CC) */}
              <button
                onClick={onScheduleCall}
                className="flex items-center justify-center gap-1 py-2.5 px-2 rounded-xl bg-transparent hover:bg-[#00C4CC]/10 text-[#00C4CC] border border-[#00C4CC]/70 hover:border-[#00C4CC] text-xs font-semibold transition-all cursor-pointer truncate shadow-sm"
              >
                <Calendar className="w-3.5 h-3.5 text-[#00C4CC] shrink-0" />
                <span className="truncate">Schedule Call</span>
              </button>
            </div>
          </div>

        </div>

        {/* ARGUS MARKET INTELLIGENCE COMPONENT (WITH SOURCE, DATE, GEOGRAPHIC SCOPE, PROPERTY SEGMENT) */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#061428] border border-cyan-500/25 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-wider text-cyan-300 font-bold">
                ARGUS MARKET INTELLIGENCE
              </span>
              <span className="text-xs text-[#C7D0DC]">· Yorkville Luxury Market</span>
            </div>
            <div className="flex items-center gap-3 text-[11px] font-mono text-[#8FA1B5]">
              <span>Source: <strong className="text-white">TRREB MLS®</strong></span>
              <span>Updated: <strong className="text-white">August 2026</strong></span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {YORKVILLE_MARKET_INTELLIGENCE.map((item, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-[#081b36] border border-cyan-500/20 space-y-1.5">
                <div className="text-[11px] text-[#8FA1B5] font-medium">{item.metric}</div>
                <div className="text-lg font-bold text-white font-mono">{item.value}</div>
                <div className="text-[10px] text-cyan-300/90 font-mono leading-tight">
                  Scope: {item.geographicScope}
                </div>
                <div className="text-[10px] text-[#C7D0DC] leading-tight">
                  Segment: {item.propertySegment}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
