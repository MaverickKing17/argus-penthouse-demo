import React, { useState } from 'react';
import { X, DollarSign, Calculator, TrendingUp, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import { PropertyData } from '../types';

interface FinancialsModalProps {
  isOpen: boolean;
  onClose: () => void;
  property: PropertyData;
  onOpenConciergeQuestion: (q: string) => void;
}

export const FinancialsModal: React.FC<FinancialsModalProps> = ({
  isOpen,
  onClose,
  property,
  onOpenConciergeQuestion,
}) => {
  const [purchaseType, setPurchaseType] = useState<'cash' | 'financed'>('cash');
  const [downPaymentPct, setDownPaymentPct] = useState<number>(40);
  const [interestRate, setInterestRate] = useState<number>(4.85);
  const [currency, setCurrency] = useState<'CAD' | 'USD'>('CAD');

  if (!isOpen) return null;

  const fxRate = currency === 'USD' ? 0.735 : 1.0;
  const listPrice = property.priceCad * fxRate;

  // Land Transfer Tax Calculation (Ontario Provincial + Toronto Municipal)
  const lttTotalCad = 784950;
  const lttTotal = lttTotalCad * fxRate;

  // Monthly Operating Costs
  const monthlyMaintenance = property.monthlyMaintenanceCad * fxRate;
  const monthlyPropertyTax = (property.taxesAnnualCad / 12) * fxRate;
  const monthlyInsurance = 950 * fxRate;
  const baselineMonthly = monthlyMaintenance + monthlyPropertyTax + monthlyInsurance;

  // Financed numbers
  const loanAmount = purchaseType === 'financed' ? listPrice * (1 - downPaymentPct / 100) : 0;
  const monthlyRate = interestRate / 100 / 12;
  const totalMonths = 30 * 12;
  const monthlyMortgage =
    purchaseType === 'financed'
      ? (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths))) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1)
      : 0;

  const totalMonthlyCarrying = baselineMonthly + monthlyMortgage;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-5xl bg-[#081222] border border-white/15 rounded-3xl overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.8)] flex flex-col max-h-[85vh] my-auto animate-modalSlideIn">
        {/* Header - Fixed & Sticky */}
        <div className="shrink-0 px-6 py-4 bg-[#0a162b] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-600/30 border border-emerald-400/50 flex items-center justify-center shadow-[0_0_10px_rgba(16,185,129,0.3)]">
              <Calculator className="w-4 h-4 text-emerald-300" />
            </div>
            <div>
              <h3 className="text-base font-display font-bold text-white tracking-wide">
                Suite 5200: Carrying Cost & Acquisition Structure Model
              </h3>
              <p className="text-xs text-slate-400">
                Institutional carrying analysis, municipal tax assessment, and closing capital deployment
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Currency Toggle */}
            <div className="flex items-center bg-white/5 border border-white/10 rounded-lg p-0.5 text-xs">
              <button
                onClick={() => setCurrency('CAD')}
                className={`px-3 py-1 rounded-md font-mono transition-all cursor-pointer tabular-nums font-bold ${
                  currency === 'CAD' ? 'bg-cyan-600 text-white shadow-[0_0_10px_rgba(6,182,212,0.4)]' : 'text-slate-400 hover:text-white'
                }`}
              >
                CAD $
              </button>
              <button
                onClick={() => setCurrency('USD')}
                className={`px-3 py-1 rounded-md font-mono transition-all cursor-pointer tabular-nums font-bold ${
                  currency === 'USD' ? 'bg-cyan-600 text-white shadow-[0_0_10px_rgba(6,182,212,0.4)]' : 'text-slate-400 hover:text-white'
                }`}
              >
                USD $
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body - VALUE PROP CARDS POP */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Purchase Structure Selector with Rich Radiant Glows */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              onClick={() => setPurchaseType('cash')}
              className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                purchaseType === 'cash'
                  ? 'bg-gradient-to-br from-[#0c2f21] via-[#082016] to-[#04110c] border-emerald-400 shadow-[0_0_25px_rgba(16,185,129,0.35),inset_0_1px_1px_rgba(255,255,255,0.2)] scale-[1.01]'
                  : 'bg-gradient-to-br from-[#0c1f3d]/60 to-[#071124]/60 border-white/10 hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/30 border border-emerald-400/60 flex items-center justify-center">
                    <DollarSign className="w-4 h-4 text-emerald-300" />
                  </div>
                  <span className="font-bold text-white text-sm sm:text-base font-display">100% Cash Acquisition</span>
                </div>
                {purchaseType === 'cash' && (
                  <span className="px-3 py-1 rounded-full bg-emerald-500/25 text-emerald-200 border border-emerald-400/60 text-xs font-mono font-bold shadow-[0_0_8px_rgba(16,185,129,0.3)]">
                    Selected Model
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-200 leading-relaxed">
                Eliminates lender covenants, interest rate exposure, and minimizes monthly holding drag to baseline operating expenses.
              </p>
            </div>

            <div
              onClick={() => setPurchaseType('financed')}
              className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                purchaseType === 'financed'
                  ? 'bg-gradient-to-br from-[#0c2347] via-[#08172e] to-[#040e1c] border-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.35),inset_0_1px_1px_rgba(255,255,255,0.2)] scale-[1.01]'
                  : 'bg-gradient-to-br from-[#0c1f3d]/60 to-[#071124]/60 border-white/10 hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-cyan-500/30 border border-cyan-400/60 flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-cyan-300" />
                  </div>
                  <span className="font-bold text-white text-sm sm:text-base font-display">Structured Debt Financing</span>
                </div>
                {purchaseType === 'financed' && (
                  <span className="px-3 py-1 rounded-full bg-cyan-500/25 text-cyan-200 border border-cyan-400/60 text-xs font-mono font-bold shadow-[0_0_8px_rgba(6,182,212,0.3)]">
                    Selected Model
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-200 leading-relaxed">
                Optimizes liquidity deployment and capital preservation across alternative private equity or bond yields.
              </p>
            </div>
          </div>

          {/* Financed Sliders if Financed */}
          {purchaseType === 'financed' && (
            <div className="p-5 rounded-2xl bg-gradient-to-br from-[#0c1f3d] to-[#071124] border border-cyan-500/30 grid grid-cols-1 sm:grid-cols-2 gap-5 shadow-lg">
              <div>
                <div className="flex justify-between text-xs text-slate-200 mb-1.5 font-medium">
                  <span>Down Payment Allocation</span>
                  <span className="font-mono text-cyan-300 font-bold tabular-nums">
                    {downPaymentPct}% (${(listPrice * downPaymentPct / 100).toLocaleString(undefined, { maximumFractionDigits: 0 })} {currency})
                  </span>
                </div>
                <input
                  type="range"
                  min={20}
                  max={80}
                  step={5}
                  value={downPaymentPct}
                  onChange={(e) => setDownPaymentPct(Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-200 mb-1.5 font-medium">
                  <span>Private Wealth Mortgage Rate</span>
                  <span className="font-mono text-cyan-300 font-bold tabular-nums">
                    {interestRate}% Fixed (30 Yr)
                  </span>
                </div>
                <input
                  type="range"
                  min={3.5}
                  max={7.5}
                  step={0.1}
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>
            </div>
          )}

          {/* 3 HIGH-IMPACT FINANCIAL KPI VALUE PROP CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-gradient-to-br from-[#0c2f21]/95 to-[#04110c]/95 border border-emerald-400/50 shadow-[0_6px_25px_rgba(16,185,129,0.25),inset_0_1px_1px_rgba(255,255,255,0.15)] hover:scale-[1.02] transition-transform">
              <div className="text-xs font-mono uppercase text-emerald-300 mb-1.5 font-bold">Estimated Monthly Carrying</div>
              <div className="text-2xl lg:text-3xl font-bold font-mono text-emerald-200 tabular-nums drop-shadow">
                ${totalMonthlyCarrying.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                <span className="text-xs font-normal text-slate-300 ml-1">/mo {currency}</span>
              </div>
              <div className="text-xs text-slate-300 mt-2 font-light">
                {purchaseType === 'cash' ? 'Zero debt service · 100% equity' : 'Includes principal, interest, tax & fees'}
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-gradient-to-br from-[#0c1f3d]/95 to-[#071124]/95 border border-cyan-400/50 shadow-[0_6px_25px_rgba(6,182,212,0.25),inset_0_1px_1px_rgba(255,255,255,0.15)] hover:scale-[1.02] transition-transform">
              <div className="text-xs font-mono uppercase text-cyan-300 mb-1.5 font-bold">Total Closing Capital Due</div>
              <div className="text-2xl lg:text-3xl font-bold font-mono text-white tabular-nums drop-shadow">
                ${(purchaseType === 'cash' ? listPrice + lttTotal : (listPrice * downPaymentPct / 100) + lttTotal).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                <span className="text-xs font-normal text-slate-300 ml-1">{currency}</span>
              </div>
              <div className="text-xs text-slate-300 mt-2 tabular-nums">
                Includes Ontario & Toronto LTT (${lttTotal.toLocaleString(undefined, { maximumFractionDigits: 0 })})
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-gradient-to-br from-[#2a220e]/95 to-[#141005]/95 border border-[#E6CA65]/60 shadow-[0_6px_25px_rgba(191,167,117,0.3),inset_0_1px_1px_rgba(255,255,255,0.15)] hover:scale-[1.02] transition-transform">
              <div className="text-xs font-mono uppercase text-[#E6CA65] mb-1.5 font-bold">Condo Reserve Health</div>
              <div className="text-2xl lg:text-3xl font-bold font-mono text-[#F3E2B8] drop-shadow">
                Tier-1 AAA
              </div>
              <div className="text-xs text-emerald-300 mt-2 flex items-center gap-1.5 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Zero special assessments on record</span>
              </div>
            </div>
          </div>

          {/* Line-Item Operating Schedule Table */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-[#0c1f3d]/90 to-[#071124]/90 border border-cyan-500/30 shadow-lg">
            <h4 className="text-sm font-bold text-white mb-3 font-display">Line-Item Operating Schedule</h4>
            <div className="divide-y divide-white/10 text-xs">
              <div className="flex justify-between py-2.5 px-3 rounded-lg hover:bg-white/[0.04] transition-colors">
                <span className="text-slate-200">Monthly Maintenance Fee ($1.15 / sq ft)</span>
                <span className="font-mono text-white font-bold tabular-nums financial-amount">
                  ${monthlyMaintenance.toLocaleString(undefined, { maximumFractionDigits: 0 })} {currency}/mo
                </span>
              </div>
              <div className="flex justify-between py-2.5 px-3 rounded-lg hover:bg-white/[0.04] transition-colors">
                <span className="text-slate-200">Annual Municipal Property Taxes ($88,480 CAD/yr)</span>
                <span className="font-mono text-white font-bold tabular-nums financial-amount">
                  ${monthlyPropertyTax.toLocaleString(undefined, { maximumFractionDigits: 0 })} {currency}/mo
                </span>
              </div>
              <div className="flex justify-between py-2.5 px-3 rounded-lg hover:bg-white/[0.04] transition-colors">
                <span className="text-slate-200">Luxury Penthouse Hazard & Contents Insurance (Est.)</span>
                <span className="font-mono text-white font-bold tabular-nums financial-amount">
                  ${monthlyInsurance.toLocaleString(undefined, { maximumFractionDigits: 0 })} {currency}/mo
                </span>
              </div>
              {purchaseType === 'financed' && (
                <div className="flex justify-between py-2.5 px-3 rounded-lg hover:bg-white/[0.04] transition-colors">
                  <span className="text-cyan-300 font-bold">Mortgage Principal & Interest Service</span>
                  <span className="font-mono text-cyan-300 font-bold tabular-nums financial-amount">
                    ${monthlyMortgage.toLocaleString(undefined, { maximumFractionDigits: 0 })} {currency}/mo
                  </span>
                </div>
              )}
              <div className="flex justify-between pt-3 pb-1 px-3 font-bold text-sm bg-cyan-950/40 rounded-lg border border-cyan-500/30">
                <span className="text-white font-display">Total Projected Monthly Holding Cost</span>
                <span className="font-mono text-emerald-300 text-base tabular-nums financial-amount">
                  ${totalMonthlyCarrying.toLocaleString(undefined, { maximumFractionDigits: 0 })} {currency}/mo
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer - Fixed & Sticky */}
        <div className="shrink-0 px-6 py-3.5 bg-[#0a162b] border-t border-white/10 flex items-center justify-between">
          <div className="text-xs text-slate-400">
            Prepared by ARGUS Private Capital Analytics · Subject to legal and tax review
          </div>
          <button
            onClick={() => {
              onClose();
              onOpenConciergeQuestion(`Can you analyze the tax and liquidity implications of acquiring Suite 5200 through an offshore trust or holding corp?`);
            }}
            className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-lg hover:shadow-[0_0_15px_rgba(16,185,129,0.4)] transition-all hover:scale-[1.02]"
          >
            <span>Ask ARGUS to Advise Structure</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
