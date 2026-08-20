import React, { useState } from 'react';
import {
  X,
  TrendingUp,
  BarChart3,
  Building2,
  Clock,
  DollarSign,
  ArrowUpRight,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  PieChart,
} from 'lucide-react';

interface MarketInsightsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenConciergeQuestion: (q: string) => void;
}

export const MarketInsightsModal: React.FC<MarketInsightsModalProps> = ({
  isOpen,
  onClose,
  onOpenConciergeQuestion,
}) => {
  const [activeTab, setActiveTab] = useState<'yorkville' | 'comps' | 'macro'>('yorkville');

  if (!isOpen) return null;

  const NEIGHBORHOOD_COMPS = [
    {
      neighborhood: 'Yorkville (Four Seasons Corridor)',
      avgPricePerSqFt: '$2,450 CAD',
      avgDom: '42 Days',
      inventorySupply: '1.8 Months',
      trendYoY: '+6.4%',
      highlight: 'Apex liquidity and institutional grade tenant/owner profile.',
      isTarget: true,
    },
    {
      neighborhood: 'The Bridle Path / Post Road',
      avgPricePerSqFt: '$1,890 CAD',
      avgDom: '78 Days',
      inventorySupply: '3.4 Months',
      trendYoY: '+4.1%',
      highlight: 'Acreage estates with higher carrying upkeep footprints.',
      isTarget: false,
    },
    {
      neighborhood: 'Forest Hill South',
      avgPricePerSqFt: '$2,150 CAD',
      avgDom: '51 Days',
      inventorySupply: '2.2 Months',
      trendYoY: '+5.2%',
      highlight: 'Traditional generational manors and private school cluster.',
      isTarget: false,
    },
    {
      neighborhood: 'Rosedale Ravine Estates',
      avgPricePerSqFt: '$2,280 CAD',
      avgDom: '48 Days',
      inventorySupply: '2.0 Months',
      trendYoY: '+5.8%',
      highlight: 'Historic heritage status with strict architectural covenants.',
      isTarget: false,
    },
  ];

  const RECENT_TRANSACTIONS = [
    {
      address: 'Four Seasons West Tower · Sub-Penthouse',
      price: '$14,200,000',
      size: '5,800 SF',
      rate: '$2,448 / SF',
      date: 'Q2 2026',
      status: 'Closed Direct Cash',
    },
    {
      address: '155 Cumberland Penthouse',
      price: '$12,850,000',
      size: '5,100 SF',
      rate: '$2,519 / SF',
      date: 'Q1 2026',
      status: 'Closed Private Pool',
    },
    {
      address: 'Hazelton Private Residences',
      price: '$16,500,000',
      size: '6,200 SF',
      rate: '$2,661 / SF',
      date: 'Q4 2025',
      status: 'Closed Corp Trust',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-[#081224] border border-cyan-500/35 rounded-3xl overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.85)] flex flex-col max-h-[85vh] my-auto animate-modalSlideIn">
        
        {/* Header */}
        <div className="shrink-0 px-6 py-4 bg-[#0a1832] border-b border-cyan-500/25 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500/30 to-blue-500/20 border border-cyan-400/50 flex items-center justify-center shadow-[0_0_12px_rgba(6,182,212,0.3)]">
              <TrendingUp className="w-5 h-5 text-cyan-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-display font-bold text-white tracking-wide">
                  Toronto Luxury Real Estate Market Intelligence
                </h3>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold border border-emerald-500/30">
                  Live Feed · Q2 2026
                </span>
              </div>
              <p className="text-xs text-slate-300 font-light">
                Institutional comps, pricing velocity, and reserve fund liquidity metrics for Tier-One assets
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

        {/* Tab Controls */}
        <div className="shrink-0 px-6 py-2.5 bg-[#061122] border-b border-white/10 flex items-center gap-2">
          <button
            onClick={() => setActiveTab('yorkville')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'yorkville'
                ? 'bg-cyan-500 text-slate-950 shadow-[0_0_12px_rgba(6,182,212,0.4)]'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            Yorkville Prime Micro-Market
          </button>
          <button
            onClick={() => setActiveTab('comps')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'comps'
                ? 'bg-cyan-500 text-slate-950 shadow-[0_0_12px_rgba(6,182,212,0.4)]'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            Neighborhood Comps Benchmark
          </button>
          <button
            onClick={() => setActiveTab('macro')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'macro'
                ? 'bg-cyan-500 text-slate-950 shadow-[0_0_12px_rgba(6,182,212,0.4)]'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            Recent Penthouse Transactions
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Key Metric Highlights Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 rounded-2xl bg-[#0d2347] border border-cyan-500/30 shadow-md">
              <div className="text-[11px] font-mono uppercase text-cyan-300 font-bold mb-1">
                Yorkville Avg $/SF
              </div>
              <div className="text-2xl font-bold font-display text-white tracking-tight">
                $2,450
              </div>
              <div className="text-[11px] text-emerald-300 flex items-center gap-1 mt-1 font-semibold">
                <ArrowUpRight className="w-3 h-3" />
                <span>+6.4% YoY Growth</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#0d2347] border border-cyan-500/30 shadow-md">
              <div className="text-[11px] font-mono uppercase text-cyan-300 font-bold mb-1">
                Avg Days on Market
              </div>
              <div className="text-2xl font-bold font-display text-white tracking-tight">
                42 Days
              </div>
              <div className="text-[11px] text-cyan-200 mt-1 font-medium">
                vs 68d Greater Toronto
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#0d2347] border border-cyan-500/30 shadow-md">
              <div className="text-[11px] font-mono uppercase text-cyan-300 font-bold mb-1">
                Inventory Supply
              </div>
              <div className="text-2xl font-bold font-display text-white tracking-tight">
                1.8 Mo
              </div>
              <div className="text-[11px] text-emerald-300 mt-1 font-semibold">
                Severe Seller Scarcity
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#0d2347] border border-cyan-500/30 shadow-md">
              <div className="text-[11px] font-mono uppercase text-cyan-300 font-bold mb-1">
                Suite 5200 Ask
              </div>
              <div className="text-2xl font-bold font-display text-[#F3E2B8] tracking-tight">
                $2,449<span className="text-xs font-normal text-slate-300">/SF</span>
              </div>
              <div className="text-[11px] text-cyan-200 mt-1 font-semibold">
                Priced at Pure Market Parity
              </div>
            </div>
          </div>

          {/* Tab 1: Yorkville Micro-Market Analysis */}
          {activeTab === 'yorkville' && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-[#0c1f3f] border border-cyan-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider font-display flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-cyan-400" />
                    <span>Four Seasons Private Residences Liquidity Profile</span>
                  </h4>
                  <span className="text-xs font-mono text-cyan-300 bg-cyan-950 px-2.5 py-0.5 rounded border border-cyan-500/40">
                    Tier-One AAA Sovereign Asset
                  </span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed">
                  The Four Seasons Private Residences at 50 Yorkville represents the benchmark asset for high-density ultra-luxury in Canada. Unlike standard condominium developments, the building maintains an unblemished reserve fund status ($28M+ institutional reserve balance), zero special assessment history, and an international owner demographic.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-[#08152c] border border-white/10">
                    <div className="text-[10px] text-slate-400 font-mono">FOREIGN CAPITAL ABSORPTION</div>
                    <div className="text-sm font-bold text-white mt-0.5">38% Global Family Offices</div>
                  </div>
                  <div className="p-3 rounded-xl bg-[#08152c] border border-white/10">
                    <div className="text-[10px] text-slate-400 font-mono">CONDO RESERVE RATIO</div>
                    <div className="text-sm font-bold text-emerald-400 mt-0.5">142% of Recommended Benchmark</div>
                  </div>
                  <div className="p-3 rounded-xl bg-[#08152c] border border-white/10">
                    <div className="text-[10px] text-slate-400 font-mono">AVERAGE HOLDING HORIZON</div>
                    <div className="text-sm font-bold text-cyan-300 mt-0.5">8.4 Years (Intergenerational)</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Neighborhood Comps Benchmark */}
          {activeTab === 'comps' && (
            <div className="space-y-3">
              <div className="text-xs text-slate-300 mb-2">
                Comparative analysis of prime Toronto luxury enclaves across square foot valuations and inventory velocity:
              </div>

              <div className="space-y-2.5">
                {NEIGHBORHOOD_COMPS.map((nc, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-2xl border transition-all ${
                      nc.isTarget
                        ? 'bg-[#0f2c57] border-cyan-400 ring-1 ring-cyan-400/60 shadow-[0_0_20px_rgba(6,182,212,0.25)]'
                        : 'bg-[#091b38] border-white/10'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-white/10">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white font-display">
                          {nc.neighborhood}
                        </span>
                        {nc.isTarget && (
                          <span className="px-2 py-0.5 rounded bg-cyan-400 text-slate-950 text-[10px] font-bold">
                            Subject Property
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-xs font-mono">
                        <div>
                          <span className="text-slate-400">Avg $/SF: </span>
                          <span className="text-cyan-200 font-bold">{nc.avgPricePerSqFt}</span>
                        </div>
                        <div>
                          <span className="text-slate-400">DOM: </span>
                          <span className="text-white font-bold">{nc.avgDom}</span>
                        </div>
                        <div>
                          <span className="text-slate-400">YoY: </span>
                          <span className="text-emerald-400 font-bold">{nc.trendYoY}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-slate-300 mt-2">
                      {nc.highlight}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 3: Recent Transactions */}
          {activeTab === 'macro' && (
            <div className="space-y-3">
              <div className="text-xs text-slate-300 mb-2">
                Recent closed transactions within the Yorkville ultra-luxury envelope:
              </div>

              <div className="space-y-2.5">
                {RECENT_TRANSACTIONS.map((tx, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-[#0a1e3d] border border-cyan-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div>
                      <div className="text-sm font-bold text-white">{tx.address}</div>
                      <div className="text-xs text-slate-300 mt-0.5">
                        {tx.size} · {tx.date}
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-base font-bold text-[#F3E2B8] font-display">{tx.price}</div>
                        <div className="text-xs font-mono text-cyan-300">{tx.rate}</div>
                      </div>
                      <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] font-mono text-slate-200">
                        {tx.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="shrink-0 px-6 py-4 bg-[#0a1832] border-t border-cyan-500/25 flex items-center justify-between">
          <div className="text-xs text-slate-300">
            Data synthesized from Toronto Real Estate Board (TRREB) Luxury Matrix & Private Registry
          </div>
          <button
            onClick={() => {
              onClose();
              onOpenConciergeQuestion("How does Suite 5200 compare to other Yorkville penthouse transactions on a price-per-square-foot basis?");
            }}
            className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-400 to-teal-400 hover:brightness-110 text-slate-950 text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-lg transition-all"
          >
            <span>Ask ARGUS for Comps Deep-Dive</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-950" />
          </button>
        </div>

      </div>
    </div>
  );
};
