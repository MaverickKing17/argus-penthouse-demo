import React from 'react';
import { Sparkles, PhoneCall, Building2, ShieldCheck, ChevronRight } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onRequestDemo: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, onRequestDemo }) => {
  const navItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'specifications', label: 'Specifications' },
    { id: 'neighborhood', label: 'Neighborhood' },
    { id: 'financials', label: 'Financials' },
    { id: 'concierge', label: 'AI Concierge' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#070d18]/90 backdrop-blur-md border-b border-white/10 px-4 lg:px-8 py-3.5 transition-all">
      <div className="max-w-[1680px] mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('concierge')}>
          <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-amber-300 via-amber-500 to-amber-700 flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.35)] p-0.5">
            <div className="w-full h-full bg-[#0a1122] rounded-[6px] flex items-center justify-center">
              {/* Geometric Diamond Emblem */}
              <div className="w-4 h-4 rotate-45 border-2 border-amber-400/90 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-amber-400 rounded-xs"></div>
              </div>
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-white font-bold tracking-[0.2em] text-lg font-serif">ARCUS</span>
            <span className="text-amber-400 font-semibold tracking-wider text-xs px-1.5 py-0.5 rounded bg-amber-400/10 border border-amber-400/20">AI</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1.5 lg:gap-3 bg-white/5 border border-white/10 p-1 rounded-full backdrop-blur-md">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'text-white bg-gradient-to-r from-cyan-600/60 to-blue-600/60 border border-cyan-400/40 shadow-[0_0_12px_rgba(6,182,212,0.35)]'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-cyan-400 rounded-full shadow-[0_0_8px_#22d3ee]"></span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Button */}
        <div className="flex items-center gap-3">
          <div className="hidden xl:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>ARGUS v4.2 Active</span>
          </div>

          <button
            onClick={onRequestDemo}
            className="group relative inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-400 hover:via-amber-500 hover:to-amber-600 text-[#0a1122] font-semibold text-xs md:text-sm tracking-wide shadow-[0_0_20px_rgba(245,158,11,0.25)] hover:shadow-[0_0_25px_rgba(245,158,11,0.45)] transition-all cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Request a Private Demo</span>
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 text-[#0a1122]" />
          </button>
        </div>
      </div>
    </header>
  );
};
