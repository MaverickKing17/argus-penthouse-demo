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
        <nav className="hidden lg:flex items-center gap-1 bg-black/50 border border-cyan-500/20 p-1 rounded-full backdrop-blur-md">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'text-white bg-gradient-to-r from-[#00C4CC] to-blue-600 border border-[#00C4CC]/80 shadow-[0_0_12px_rgba(0,196,204,0.4)]'
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Section: User Profile Avatar & High-Priority Request Demo CTA */}
        <div className="flex items-center gap-3 shrink-0">
          {/* User Profile Avatar */}
          <div
            className="w-8 h-8 rounded-full bg-[#0A1A30] border border-[#00C4CC]/40 flex items-center justify-center text-white shadow-[0_0_10px_rgba(0,196,204,0.2)] cursor-pointer hover:border-[#00C4CC] transition-all"
            title="User Profile"
          >
            <User className="w-4 h-4 text-[#00C4CC]" />
          </div>

          {/* High-Priority CTA: Request Demo (Vibrant Teal #00C4CC with Dark Navy Text) */}
          <button
            onClick={onRequestDemo}
            className="group relative inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#00C4CC] hover:bg-[#00d8e0] active:scale-[0.98] text-[#061225] font-bold text-xs tracking-wide shadow-[0_0_20px_rgba(0,196,204,0.45)] hover:shadow-[0_0_28px_rgba(0,196,204,0.65)] transition-all cursor-pointer transform hover:-translate-y-0.5"
          >
            <span>Request Demo</span>
            <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 text-[#061225]" />
          </button>
        </div>
      </div>
    </header>
  );
};
