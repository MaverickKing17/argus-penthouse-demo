import React from 'react';
import { ChevronRight } from 'lucide-react';

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
    <header className="sticky top-0 z-40 w-full bg-[#060D1E]/75 backdrop-blur-xl border-b border-cyan-500/20 px-4 sm:px-6 lg:px-10 py-3 transition-all">
      <div className="max-w-[1720px] mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer"
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
            <span className="text-white font-bold tracking-[0.2em] text-lg font-serif">ARCUS</span>
            <span className="text-[#E6CA65] font-semibold tracking-wider text-[11px] px-1.5 py-0.2 rounded bg-[#E6CA65]/15 border border-[#E6CA65]/30">
              AI
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1.5 lg:gap-2 bg-black/40 border border-white/10 p-1 rounded-full backdrop-blur-md">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative px-4 py-1.5 text-xs sm:text-sm font-medium rounded-full transition-all duration-200 cursor-pointer ${
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

        {/* Action Button: Request a Private Demo in Luxe Gold */}
        <div className="flex items-center gap-3">
          <button
            onClick={onRequestDemo}
            className="group relative inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#BFA775] hover:bg-[#caa866] text-[#0A1128] font-bold text-xs sm:text-sm tracking-wide shadow-[0_0_20px_rgba(191,167,117,0.3)] hover:shadow-[0_0_25px_rgba(191,167,117,0.5)] transition-all cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Request a Private Demo</span>
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 text-[#0A1128]" />
          </button>
        </div>
      </div>
    </header>
  );
};
