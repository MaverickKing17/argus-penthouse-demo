import React from 'react';
import { ChevronRight, User } from 'lucide-react';
import arcusLogoImg from '../assets/images/arcus_ai_logo_1787262911472.jpg';

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
        {/* Brand Logo & Demo Context Tag (Top Left Corner) */}
        <div className="flex items-center gap-3 shrink-0">
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setActiveTab('concierge')}
            title="ARCUS AI - Intelligence. Precision. Results."
          >
            <div className="relative w-9 h-9 rounded-xl overflow-hidden border border-cyan-400/40 group-hover:border-[#FF7A00] transition-colors shadow-[0_0_15px_rgba(0,196,204,0.3)] group-hover:shadow-[0_0_20px_rgba(255,122,0,0.4)] bg-[#040C1A]">
              <img
                src={arcusLogoImg}
                alt="ARCUS AI Emblem"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-baseline gap-1.5 leading-none">
                <span className="text-white font-bold tracking-[0.22em] text-lg font-display group-hover:text-slate-100 transition-colors">
                  ARCUS
                </span>
                <span className="text-[#FF7A00] font-bold tracking-wider text-[11px] px-1.5 py-0.2 rounded bg-[#FF7A00]/15 border border-[#FF7A00]/30 shadow-sm">
                  AI
                </span>
              </div>
              <span className="text-[8.5px] font-mono tracking-[0.2em] text-[#8FA1B5] uppercase mt-0.5 group-hover:text-cyan-300 transition-colors">
                Intelligence · Precision · Results
              </span>
            </div>
          </div>

          {/* Demonstration Environment Context Tag */}
          <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300/90 text-[10px] font-mono font-medium tracking-wide shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
            <span>Product Demonstration Environment</span>
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
