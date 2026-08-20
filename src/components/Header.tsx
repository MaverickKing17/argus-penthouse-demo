import React from 'react';
import { ChevronRight, User } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onRequestDemo: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onRequestDemo,
}) => {
  const navItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'specifications', label: 'Specifications' },
    { id: 'neighborhood', label: 'Neighborhood & Map' },
    { id: 'market', label: 'Market Comps' },
    { id: 'portfolio', label: 'HNWI Portfolio' },
    { id: 'financials', label: 'Financials' },
    { id: 'concierge', label: 'AI Concierge' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#060D1E]/90 backdrop-blur-xl border-b border-cyan-500/20 px-4 sm:px-6 lg:px-10 py-2.5 transition-all">
      <div className="max-w-[1720px] mx-auto flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer shrink-0"
          onClick={() => setActiveTab('concierge')}
        >
          <img
            src="https://i.ibb.co/hJZCQ2Cr/Luxury-Penthouse-Interior-Arcus-AI.png"
            alt="ARCUS AI Logo"
            className="h-8 sm:h-9 w-auto object-contain rounded"
          />
          <div className="flex items-baseline gap-1.5">
            <span className="text-white font-bold tracking-[0.2em] text-lg font-display">ARCUS</span>
            <span className="text-[#FF7A00] font-semibold tracking-wider text-[11px] px-1.5 py-0.2 rounded bg-[#FF7A00]/15 border border-[#FF7A00]/30">
              AI
            </span>
          </div>
        </div>

        {/* Center: Navigation Tabs */}
        <nav className="hidden lg:flex items-center gap-1 bg-black/50 border border-white/10 p-1 rounded-full backdrop-blur-md">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'text-[#061225] bg-[#FF7A00] font-bold shadow-[0_0_15px_rgba(255,122,0,0.5)] border border-[#FF7A00]'
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Section: User Profile Avatar & High-Priority Request Demo CTA in Tangerine */}
        <div className="flex items-center gap-3 shrink-0">
          {/* User Profile Avatar */}
          <div
            className="w-8 h-8 rounded-full bg-[#0A1A30] border border-[#FF7A00]/50 flex items-center justify-center text-white shadow-[0_0_10px_rgba(255,122,0,0.25)] cursor-pointer hover:border-[#FF7A00] transition-all"
            title="User Profile"
          >
            <User className="w-4 h-4 text-[#FF7A00]" />
          </div>

          {/* High-Priority CTA: Request Demo (Vibrant Tangerine #FF7A00 with Dark Navy Text) */}
          <button
            onClick={onRequestDemo}
            className="group relative inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#FF7A00] hover:bg-[#ff881a] active:scale-[0.98] text-[#061225] font-bold text-xs tracking-wide shadow-[0_0_20px_rgba(255,122,0,0.5)] hover:shadow-[0_0_28px_rgba(255,122,0,0.7)] transition-all cursor-pointer transform hover:-translate-y-0.5"
          >
            <span>Request Demo</span>
            <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 text-[#061225]" />
          </button>
        </div>
      </div>
    </header>
  );
};
