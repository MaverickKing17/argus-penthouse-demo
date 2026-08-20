import React from 'react';
import { MapPin, Eye, Layers, Calculator, Compass, DollarSign, Sparkles, Calendar, ChevronRight } from 'lucide-react';
import { PropertyData } from '../types';
import heroBgImage from '../assets/images/toronto_penthouse_twilight_1787165723733.jpg';

interface HeroSectionProps {
  property: PropertyData;
  onOpenOverview: () => void;
  onOpenSpecs: () => void;
  onOpenFinancials: () => void;
  onOpenNeighborhood: () => void;
  onOpenSchedule?: () => void;
  onOpenConciergePrompt: (prompt: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  property,
  onOpenOverview,
  onOpenSpecs,
  onOpenFinancials,
  onOpenNeighborhood,
  onOpenSchedule,
  onOpenConciergePrompt,
}) => {
  return (
    <div className="relative w-full min-h-[640px] lg:min-h-[720px] overflow-hidden">
      {/* 1. FULL-BLEED HIGH-RES PENTHOUSE BACKGROUND WITH SOPHISTICATED DIRECTIONAL GRADIENT */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBgImage}
          alt="Suite 5200 Penthouse Twilight Skyline"
          className="w-full h-full object-cover object-center"
        />
        {/* Sophisticated Directional Gradient:
            LEFT: Stronger Navy Overlay
            CENTER: Medium Transparent Navy
            RIGHT: Allows Architectural Image to Breathe
        */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#061225] via-[#061225]/75 to-[#061225]/20 pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#061225] via-transparent to-[#061225]/40 pointer-events-none"></div>
      </div>

      {/* Main Content Layout */}
      <div className="relative z-10 max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 py-12 lg:py-16">
        <div className="max-w-2xl lg:max-w-3xl flex flex-col justify-center pt-2 lg:pt-6">
          
          {/* Subtle White-Label / Infrastructure Indicator */}
          <div className="inline-flex items-center gap-2 mb-4 text-xs font-mono text-[#00C4CC] bg-[#071526]/90 px-3 py-1 rounded-full border border-[#00C4CC]/40 w-fit backdrop-blur-md shadow-sm">
            <span>ARCUS AI</span>
            <span className="text-slate-400">·</span>
            <span>Powered by ARGUS</span>
          </div>

          {/* Primary Headline (High Legibility Serif for Property Title) */}
          <h1 className="text-4xl sm:text-5xl lg:text-[58px] font-display text-white font-normal tracking-tight leading-[1.08] mb-3">
            Suite 5200:
          </h1>
          
          {/* Golden Subtitle */}
          <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-display text-[#F3E2B8] font-light leading-[1.25] mb-4 max-w-2xl">
            The Intelligent Digital Twin for Toronto's Most Exclusive Penthouse.
          </h2>

          {/* Supporting Text & Platform Context (Institutional, Credible) */}
          <div className="space-y-2 mb-6 max-w-xl">
            <p className="text-[#C7D0DC] text-base sm:text-lg font-normal leading-relaxed">
              Experience how ARGUS qualifies high-intent buyers in real time.
            </p>
            <p className="text-[#C7D0DC] text-sm sm:text-base font-normal leading-relaxed text-[#9fb1c7]">
              This demo showcases the ARGUS AI Concierge, our proprietary white-label digital acquisition infrastructure designed to secure premium listing mandates and qualify HNW interest for high-value real estate assets.
            </p>
          </div>

          {/* Refined Property Information Hierarchy */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#071526]/90 border border-cyan-500/30 backdrop-blur-xl mb-6 max-w-xl shadow-xl space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
              <div>
                <div className="text-xs font-mono uppercase tracking-wider text-[#8FA1B5]">
                  50 Yorkville Avenue, Toronto, Ontario
                </div>
                <div className="text-sm sm:text-base font-display font-semibold text-white mt-0.5">
                  PENTHOUSE SUITE 5200
                </div>
              </div>
              <div className="sm:text-right">
                <div className="text-[11px] font-mono uppercase tracking-wider text-[#BFA775] font-semibold">
                  ASKING PRICE
                </div>
                <div className="text-lg sm:text-xl font-bold font-mono text-white tabular-nums">
                  $15,800,000 CAD
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-xs text-[#C7D0DC]">
              <div>
                <span className="text-[10px] text-[#8FA1B5] uppercase block font-mono">Interior</span>
                <span className="font-semibold text-white">6,450 sq ft</span>
              </div>
              <div>
                <span className="text-[10px] text-[#8FA1B5] uppercase block font-mono">Terrace</span>
                <span className="font-semibold text-white">1,200 sq ft</span>
              </div>
              <div>
                <span className="text-[10px] text-[#8FA1B5] uppercase block font-mono">Building</span>
                <span className="font-semibold text-white truncate block">Four Seasons</span>
              </div>
            </div>
          </div>

          {/* High-Priority Primary Action CTA + Navigation Micro-Pills */}
          <div className="flex flex-wrap items-center gap-3">
            {/* HIGH-PRIORITY CTA BUTTON (Vibrant Tangerine #FF7A00 with Dark Navy Text) */}
            {onOpenSchedule && (
              <button
                onClick={onOpenSchedule}
                className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FF7A00] hover:bg-[#ff881a] active:scale-[0.98] text-[#061225] font-bold text-xs tracking-wide shadow-[0_0_25px_rgba(255,122,0,0.5)] hover:shadow-[0_0_35px_rgba(255,122,0,0.7)] transition-all cursor-pointer transform hover:-translate-y-0.5"
              >
                <Calendar className="w-4 h-4 text-[#061225]" />
                <span>Schedule Private Showing</span>
                <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 text-[#061225]" />
              </button>
            )}

            <button
              onClick={onOpenOverview}
              className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-[#091b38]/90 hover:bg-[#0f2c5e] text-white text-xs font-semibold backdrop-blur-md border border-[#FF7A00]/40 transition-all cursor-pointer hover:border-[#FF7A00]"
            >
              <Eye className="w-3.5 h-3.5 text-[#FF7A00]" />
              <span>3D Digital Twin</span>
            </button>

            <button
              onClick={onOpenSpecs}
              className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-[#1f190e]/90 hover:bg-[#332912] text-[#F3E2B8] text-xs font-semibold backdrop-blur-md border border-[#FF7A00]/40 transition-all cursor-pointer hover:border-[#FF7A00]"
            >
              <Layers className="w-3.5 h-3.5 text-[#FF7A00]" />
              <span>Poliform Matrix</span>
            </button>

            <button
              onClick={onOpenFinancials}
              className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-[#0c2419]/90 hover:bg-[#143d2c] text-emerald-200 text-xs font-semibold backdrop-blur-md border border-emerald-400/40 transition-all cursor-pointer hover:border-emerald-300"
            >
              <Calculator className="w-3.5 h-3.5 text-emerald-300" />
              <span>Carrying Costs</span>
            </button>

            <button
              onClick={onOpenNeighborhood}
              className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-[#091b38]/90 hover:bg-[#0f2c5e] text-cyan-200 text-xs font-semibold backdrop-blur-md border border-cyan-400/40 transition-all cursor-pointer hover:border-cyan-300"
            >
              <Compass className="w-3.5 h-3.5 text-cyan-300" />
              <span>Yorkville Enclave</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
