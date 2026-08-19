import React from 'react';
import { ChevronRight, Monitor, Tablet, Smartphone } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onRequestDemo: () => void;
  viewportMode: 'desktop' | 'tablet' | 'mobile';
  setViewportMode: (mode: 'desktop' | 'tablet' | 'mobile') => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onRequestDemo,
  viewportMode,
  setViewportMode,
}) => {
  const navItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'specifications', label: 'Specifications' },
    { id: 'neighborhood', label: 'Neighborhood' },
    { id: 'financials', label: 'Financials' },
    { id: 'concierge', label: 'AI Concierge' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#060D1E]/75 backdrop-blur-xl border-b border-cyan-500/20 px-4 sm:px-6 lg:px-10 py-2.5 transition-all">
      <div className="max-w-[1720px] mx-auto flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer shrink-0"
          onClick={() => setActiveTab('concierge')}
        >
          <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-[#E6CA65] via-[#BFA775] to-[#997F48] flex items-center justify-center shadow-[0_0_15px_rgba(191,167,117,0.35)] p-0.5">
            <div className="w-full h-full bg-[#071124] rounded-[6px] flex items-center justify-center">
              {/* Geometric Diamond Emblem */}
              <div className="w-4 h-4 rotate-45 border-2 border-[#E6CA65] flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-[#E6CA65] rounded-xs"></div>
              </div>
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-white font-bold tracking-[0.2em] text-lg font-display">ARCUS</span>
            <span className="text-[#E6CA65] font-semibold tracking-wider text-[11px] px-1.5 py-0.2 rounded bg-[#E6CA65]/15 border border-[#E6CA65]/30">
              AI
            </span>
          </div>
        </div>

        {/* Center: Navigation Tabs */}
        <nav className="hidden lg:flex items-center gap-1 bg-black/40 border border-white/10 p-1 rounded-full backdrop-blur-md">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative px-3.5 py-1.5 text-xs font-medium rounded-full transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'text-white bg-cyan-600/70 border border-cyan-400/50 shadow-[0_0_12px_rgba(6,182,212,0.4)]'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Section: Viewport Toggle Pill & Request Demo CTA */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Top-Bar Viewport Toggle Pill: [ Desktop | Tablet | Mobile ] */}
          <div className="flex items-center bg-black/50 border border-white/15 rounded-full p-0.5 backdrop-blur-md text-xs">
            <button
              onClick={() => setViewportMode('desktop')}
              title="Desktop View"
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all cursor-pointer ${
                viewportMode === 'desktop'
                  ? 'bg-cyan-600/80 text-white font-medium shadow-[0_0_10px_rgba(6,182,212,0.3)] border border-cyan-400/50'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span className="hidden sm:inline text-[11px]">Desktop</span>
            </button>

            <button
              onClick={() => setViewportMode('tablet')}
              title="Tablet View"
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all cursor-pointer ${
                viewportMode === 'tablet'
                  ? 'bg-cyan-600/80 text-white font-medium shadow-[0_0_10px_rgba(6,182,212,0.3)] border border-cyan-400/50'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Tablet className="w-3.5 h-3.5" />
              <span className="hidden sm:inline text-[11px]">Tablet</span>
            </button>

            <button
              onClick={() => setViewportMode('mobile')}
              title="Mobile View"
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all cursor-pointer ${
                viewportMode === 'mobile'
                  ? 'bg-cyan-600/80 text-white font-medium shadow-[0_0_10px_rgba(6,182,212,0.3)] border border-cyan-400/50'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span className="hidden sm:inline text-[11px]">Mobile</span>
            </button>
          </div>

          {/* Action Button: Request a Private Demo in Luxe Gold */}
          <button
            onClick={onRequestDemo}
            className="group relative inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#BFA775] hover:bg-[#caa866] text-[#0A1128] font-bold text-xs tracking-wide shadow-[0_0_20px_rgba(191,167,117,0.3)] hover:shadow-[0_0_25px_rgba(191,167,117,0.5)] transition-all cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Request Demo</span>
            <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 text-[#0A1128]" />
          </button>
        </div>
      </div>
    </header>
  );
};
