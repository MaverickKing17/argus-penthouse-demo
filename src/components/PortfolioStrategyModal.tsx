import React, { useState } from 'react';
import {
  X,
  Briefcase,
  PieChart,
  ShieldCheck,
  Percent,
  Coins,
  ArrowRight,
  TrendingUp,
  FileCheck2,
  Lock,
} from 'lucide-react';

interface PortfolioStrategyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenConciergeQuestion: (q: string) => void;
}

export const PortfolioStrategyModal: React.FC<PortfolioStrategyModalProps> = ({
  isOpen,
  onClose,
  onOpenConciergeQuestion,
}) => {
  const [allocationStrategy, setAllocationStrategy] = useState<'wealthPreservation' | 'capitalGrowth' | 'taxOptimized'>('wealthPreservation');
  const [purchaseStructure, setPurchaseStructure] = useState<'cash' | 'debtArbitrage' | 'trustCorp'>('debtArbitrage');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-[#081224] border border-cyan-500/35 rounded-3xl overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.85)] flex flex-col max-h-[85vh] my-auto">
        
        {/* Header */}
        <div className="shrink-0 px-6 py-4 bg-[#0a1832] border-b border-cyan-500/25 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500/30 to-teal-500/20 border border-emerald-400/50 flex items-center justify-center shadow-[0_0_12px_rgba(16,185,129,0.3)]">
              <Briefcase className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-display font-bold text-white tracking-wide">
                  HNWI Asset Allocation & Portfolio Architecture
                </h3>
                <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-200 text-[10px] font-mono font-bold border border-cyan-500/30">
                  Family Office Advisory
                </span>
              </div>
              <p className="text-xs text-slate-300 font-light">
                Structuring Suite 5200 ($15.8M CAD) within broader global capital allocation and liquidity horizons
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Strategy Selection Chips */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              onClick={() => setAllocationStrategy('wealthPreservation')}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                allocationStrategy === 'wealthPreservation'
                  ? 'bg-[#0f2d57] border-cyan-400 ring-1 ring-cyan-400/60 shadow-[0_0_20px_rgba(6,182,212,0.25)]'
                  : 'bg-[#091a36] border-white/10 hover:bg-[#0c2244]'
              }`}
            >
              <div className="text-xs font-mono text-cyan-300 font-bold uppercase mb-1">STRATEGY A</div>
              <div className="text-sm font-bold text-white font-display">Trophy Wealth Preservation</div>
              <div className="text-xs text-slate-300 mt-1">Inflation hedge, CAD sovereign hard asset, 15-20% portfolio weighting.</div>
            </button>

            <button
              onClick={() => setAllocationStrategy('capitalGrowth')}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                allocationStrategy === 'capitalGrowth'
                  ? 'bg-[#0f2d57] border-cyan-400 ring-1 ring-cyan-400/60 shadow-[0_0_20px_rgba(6,182,212,0.25)]'
                  : 'bg-[#091a36] border-white/10 hover:bg-[#0c2244]'
              }`}
            >
              <div className="text-xs font-mono text-cyan-300 font-bold uppercase mb-1">STRATEGY B</div>
              <div className="text-sm font-bold text-white font-display">Capital Cost Arbitrage</div>
              <div className="text-xs text-slate-300 mt-1">Deploy structured debt at 4.85% while preserving 7.2% private equity yields.</div>
            </button>

            <button
              onClick={() => setAllocationStrategy('taxOptimized')}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                allocationStrategy === 'taxOptimized'
                  ? 'bg-[#0f2d57] border-cyan-400 ring-1 ring-cyan-400/60 shadow-[0_0_20px_rgba(6,182,212,0.25)]'
                  : 'bg-[#091a36] border-white/10 hover:bg-[#0c2244]'
              }`}
            >
              <div className="text-xs font-mono text-cyan-300 font-bold uppercase mb-1">STRATEGY C</div>
              <div className="text-sm font-bold text-white font-display">Corporate / Trust Holding</div>
              <div className="text-xs text-slate-300 mt-1">Entity-level conveyance, estate freeze shielding, and succession continuity.</div>
            </button>
          </div>

          {/* Capital Architecture Comparison Card */}
          <div className="p-5 rounded-2xl bg-[#0c1f3f] border border-cyan-500/30 space-y-4 shadow-lg">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Coins className="w-5 h-5 text-emerald-400" />
                <h4 className="text-sm font-bold text-white uppercase tracking-wider font-display">
                  Acquisition Structure & Opportunity Cost Matrix
                </h4>
              </div>
              <span className="text-xs font-mono text-emerald-300 bg-emerald-950 px-2.5 py-0.5 rounded border border-emerald-500/40">
                Modeled for $15,800,000 Acquisition
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Option 1: 100% Direct Cash Acquisition */}
              <div className="p-4 rounded-xl bg-[#08152c] border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">100% Cash Acquisition</span>
                  <span className="text-[10px] font-mono text-cyan-300 bg-cyan-900/60 px-2 py-0.5 rounded">Zero Debt Risk</span>
                </div>
                <div className="text-xs text-slate-300 leading-relaxed">
                  Eliminates financing approval conditions and accelerates closing to &lt; 14 days. Ongoing carrying costs are strictly baseline maintenance ($7,417/mo) + property tax ($7,373/mo).
                </div>
                <div className="pt-2 border-t border-white/10 flex justify-between text-xs font-mono">
                  <span className="text-slate-400">Total Capital Deployed:</span>
                  <span className="text-white font-bold">$15,800,000 CAD</span>
                </div>
              </div>

              {/* Option 2: Structured Private Wealth Financing */}
              <div className="p-4 rounded-xl bg-[#08152c] border border-emerald-500/40 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-300">Structured Private Wealth Facility (50% LTV)</span>
                  <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950 px-2 py-0.5 rounded">Arbitrage Spread</span>
                </div>
                <div className="text-xs text-slate-300 leading-relaxed">
                  $7,900,000 debt facility at 4.85% interest. $7,900,000 preserved in active private equity or yield assets yielding 7.2% generates +$185,650 CAD net annual arbitrage spread.
                </div>
                <div className="pt-2 border-t border-white/10 flex justify-between text-xs font-mono">
                  <span className="text-slate-400">Net Arbitrage Advantage:</span>
                  <span className="text-emerald-300 font-bold">+2.35% Spread / Year</span>
                </div>
              </div>
            </div>

            {/* Entity Structuring Callout */}
            <div className="p-3.5 rounded-xl bg-[#091a33] border border-cyan-500/30 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-cyan-300 shrink-0 mt-0.5" />
              <div className="text-xs text-slate-200 leading-relaxed">
                <strong className="text-white">Canadian Holding Corp & Discretionary Trust Compatibility:</strong> Suite 5200 is registered under standard Ontario Condominium Act bylaws permitting corporate and trust ownership with designated executive occupancy agreements, maintaining complete discretion on public Land Registry indices.
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="shrink-0 px-6 py-4 bg-[#0a1832] border-t border-cyan-500/25 flex items-center justify-between">
          <div className="text-xs text-slate-300">
            Private consultation with brokerage capital directors available upon request
          </div>
          <button
            onClick={() => {
              onClose();
              onOpenConciergeQuestion("How can we structure the acquisition of Suite 5200 between a direct cash purchase versus a private wealth collateralized credit facility?");
            }}
            className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-400 hover:brightness-110 text-slate-950 text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-lg transition-all"
          >
            <span>Ask ARGUS to Model Portfolio Scenarios</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-950" />
          </button>
        </div>

      </div>
    </div>
  );
};
