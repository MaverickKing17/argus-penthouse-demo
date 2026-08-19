import React from 'react';
import { MapPin, Eye, Layers, Calculator, Compass, Sparkles, Building2 } from 'lucide-react';
import { PropertyData } from '../types';
import heroBgImage from '../assets/images/toronto_penthouse_twilight_1787165723733.jpg';

interface HeroSectionProps {
  property: PropertyData;
  onOpenOverview: () => void;
  onOpenSpecs: () => void;
  onOpenFinancials: () => void;
  onOpenNeighborhood: () => void;
  onOpenConciergePrompt: (prompt: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  property,
  onOpenOverview,
  onOpenSpecs,
  onOpenFinancials,
  onOpenNeighborhood,
  onOpenConciergePrompt,
}) => {
  return (
    <div className="relative w-full min-h-[640px] lg:min-h-[720px] overflow-hidden">
      {/* 1. FULL-BLEED HIGH-RES PENTHOUSE BACKGROUND OVERLOOKING TORONTO TWILIGHT SKYLINE */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBgImage}
          alt="Suite 5200 Penthouse Twilight Skyline"
          className="w-full h-full object-cover object-center"
        />
        {/* Subtle luminous grading for text contrast without obscuring the background */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#060D1E]/75 via-[#060D1E]/25 to-transparent pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128] via-transparent to-[#060D1E]/30 pointer-events-none"></div>
      </div>

      {/* Main Content Layout */}
      <div className="relative z-10 max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 py-12 lg:py-16">
        <div className="max-w-2xl lg:max-w-3xl flex flex-col justify-center pt-4 lg:pt-8">
          
          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-[58px] font-display text-white font-normal tracking-tight leading-[1.06] mb-3 drop-shadow-lg">
            Suite 5200:
          </h1>
          
          {/* Golden Subtitle */}
          <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-display text-[#F3E2B8] font-light leading-[1.25] mb-5 drop-shadow-md">
            The Intelligent Digital Twin for Toronto's Most Exclusive Penthouse.
          </h2>

          {/* Sub-headline */}
          <p className="text-slate-200 text-base sm:text-lg font-light leading-relaxed max-w-xl mb-8 drop-shadow-md">
            Experience how ARGUS qualifies high-net-worth buyers in real time.
          </p>

          {/* Location Pin */}
          <div className="flex items-start gap-3 text-slate-200 drop-shadow-md mb-8">
            <div className="w-8 h-8 rounded-full bg-black/50 border border-white/30 flex items-center justify-center shrink-0 mt-0.5 backdrop-blur-md shadow-[0_0_12px_rgba(230,202,101,0.3)]">
              <MapPin className="w-4 h-4 text-[#E6CA65]" />
            </div>
            <div className="leading-tight">
              <div className="font-semibold text-sm sm:text-base text-white drop-shadow">
                50 Yorkville Avenue, Toronto
              </div>
              <div className="text-xs text-slate-300 font-light mt-0.5">
                Penthouse Suite 5200 · Four Seasons Private Residences
              </div>
            </div>
          </div>

          {/* High-Contrast Value Prop Exploration Action Pills */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenOverview}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0a1b38]/80 hover:bg-[#0f2c5e] text-white text-xs font-bold backdrop-blur-md border border-cyan-400/50 hover:border-cyan-300 shadow-[0_4px_15px_rgba(6,182,212,0.25),inset_0_1px_1px_rgba(255,255,255,0.2)] transition-all cursor-pointer hover:scale-105"
            >
              <Eye className="w-3.5 h-3.5 text-cyan-300" />
              <span>3D Digital Twin</span>
            </button>

            <button
              onClick={onOpenSpecs}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#201a0d]/80 hover:bg-[#332912] text-[#F3E2B8] text-xs font-bold backdrop-blur-md border border-[#BFA775]/60 hover:border-[#E6CA65] shadow-[0_4px_15px_rgba(191,167,117,0.3),inset_0_1px_1px_rgba(255,255,255,0.2)] transition-all cursor-pointer hover:scale-105"
            >
              <Layers className="w-3.5 h-3.5 text-[#E6CA65]" />
              <span>Poliform Matrix</span>
            </button>

            <button
              onClick={onOpenFinancials}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0c261b]/80 hover:bg-[#143d2c] text-emerald-200 text-xs font-bold backdrop-blur-md border border-emerald-400/50 hover:border-emerald-300 shadow-[0_4px_15px_rgba(16,185,129,0.25),inset_0_1px_1px_rgba(255,255,255,0.2)] transition-all cursor-pointer hover:scale-105"
            >
              <Calculator className="w-3.5 h-3.5 text-emerald-300" />
              <span>Carrying Costs</span>
            </button>

            <button
              onClick={onOpenNeighborhood}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0a1b38]/80 hover:bg-[#0f2c5e] text-cyan-200 text-xs font-bold backdrop-blur-md border border-cyan-400/50 hover:border-cyan-300 shadow-[0_4px_15px_rgba(6,182,212,0.25),inset_0_1px_1px_rgba(255,255,255,0.2)] transition-all cursor-pointer hover:scale-105"
            >
              <Compass className="w-3.5 h-3.5 text-cyan-300" />
              <span>Yorkville District</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
