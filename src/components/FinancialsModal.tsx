import React, { useState } from 'react';
import { X, DollarSign, Calculator, ShieldCheck, PieChart, TrendingUp, ArrowRight, Building, CheckCircle2 } from 'lucide-react';
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
  // On $15.8M CAD:
  // Ontario LTT: ~$392,475 CAD
  // Toronto MLTT: ~$392,475 CAD
  // Total LTT: ~$784,950 CAD (~$577,000 USD)
  const lttTotalCad = 784950;
  const lttTotal = lttTotalCad * fxRate;

  // Monthly Operating Costs
  const monthlyMaintenance = property.monthlyMaintenanceCad * fxRate;
  const monthlyPropertyTax = (property.taxesAnnualCad / 12) * fxRate;
  const monthlyInsurance = 950 * fxRate; // Estimated luxury contents & liability
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-5xl bg-[#081222] border border-white/15 rounded-3xl overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.8)] flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-[#0a162b] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-600/30 border border-emerald-400/50 flex items-center justify-center">
              <Calculator className="w-4 h-4 text-emerald-300" />
            </div>
            <div>
              <h3 className="text-base font-serif font-bold text-white tracking-wide">
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
                className={`px-2.5 py-1 rounded-md font-mono transition-colors cursor-pointer ${
                  currency === 'CAD' ? 'bg-cyan-600 text-white font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                CAD $
              </button>
              <button
                onClick={() => setCurrency('USD')}
                className={`px-2.5 py-1 rounded-md font-mono transition-colors cursor-pointer ${
                  currency === 'USD' ? 'bg-cyan-600 text-white font-bold' : 'text-slate-400 hover:text-white'
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

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Purchase Structure Selector */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              onClick={() => setPurchaseType('cash')}
              className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                purchaseType === 'cash'
                  ? 'bg-gradient-to-br from-emerald-950/60 to-cyan-950/40 border-emerald-400/50 shadow-[0_0_20px_rgba(16,185,129,0.15)]'
                  : 'bg-white/5 border-white/10 hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-emerald-400" />
                  <span className="font-bold text-white text-sm">100% Cash Acquisition</span>
                </div>
                {purchaseType === 'cash' && (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono">
                    Selected Model
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-300">
                Eliminates lender covenants, interest rate exposure, and minimizes monthly holding drag to baseline operating expenses.
              </p>
            </div>

            <div
              onClick={() => setPurchaseType('financed')}
              className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                purchaseType === 'financed'
                  ? 'bg-gradient-to-br from-cyan-950/60 to-blue-950/40 border-cyan-400/50 shadow-[0_0_20px_rgba(6,182,212,0.15)]'
                  : 'bg-white/5 border-white/10 hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-cyan-400" />
                  <span className="font-bold text-white text-sm">Structured Debt Financing</span>
                </div>
                {purchaseType === 'financed' && (
                  <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-mono">
                    Selected Model
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-300">
                Optimizes liquidity deployment and capital preservation across alternative private equity or bond yields.
              </p>
            </div>
          </div>

          {/* Financed Sliders if Financed */}
          {purchaseType === 'financed' && (
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>Down Payment Allocation</span>
                  <span className="font-mono text-cyan-400 font-bold">{downPaymentPct}% (${(listPrice * downPaymentPct / 100).toLocaleString(undefined, { maximumFractionDigits: 0 })} {currency})</span>
                </div>
                <input
                  type="range"
                  min={20}
                  max={80}
                  step={5}
                  value={downPaymentPct}
                  onChange={(e) => setDownPaymentPct(Number(e.target.value))}
                  className="w-full accent-cyan-400"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>Private Wealth Mortgage Rate</span>
                  <span className="font-mono text-cyan-400 font-bold">{interestRate}% Fixed (30 Yr)</span>
                </div>
                <input
                  type="range"
                  min={3.5}
                  max={7.5}
                  step={0.1}
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full accent-cyan-400"
                />
              </div>
            </div>
          )}

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-[#0a1528] border border-white/10">
              <div className="text-xs font-mono uppercase text-slate-400 mb-1">Estimated Monthly Carrying</div>
              <div className="text-2xl lg:text-3xl font-bold font-mono text-emerald-400">
                ${totalMonthlyCarrying.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                <span className="text-xs font-normal text-slate-400 ml-1">/mo {currency}</span>
              </div>
              <div className="text-xs text-slate-400 mt-2">
                {purchaseType === 'cash' ? 'Zero debt service · 100% equity' : 'Includes principal, interest, tax & fees'}
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#0a1528] border border-white/10">
              <div className="text-xs font-mono uppercase text-slate-400 mb-1">Total Closing Capital Due</div>
              <div className="text-2xl lg:text-3xl font-bold font-mono text-white">
                ${(purchaseType === 'cash' ? listPrice + lttTotal : (listPrice * downPaymentPct / 100) + lttTotal).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                <span className="text-xs font-normal text-slate-400 ml-1">{currency}</span>
              </div>
              <div className="text-xs text-slate-400 mt-2">
                Includes Ontario & Toronto Land Transfer Taxes (${lttTotal.toLocaleString(undefined, { maximumFractionDigits: 0 })})
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#0a1528] border border-white/10">
              <div className="text-xs font-mono uppercase text-slate-400 mb-1">Condo Reserve Health</div>
              <div className="text-2xl lg:text-3xl font-bold font-mono text-cyan-300">
                Tier-1 AAA
              </div>
              <div className="text-xs text-emerald-400 mt-2 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Zero special assessments on record</span>
              </div>
            </div>
          </div>

          {/* Breakdown Table */}
          <div className="p-5 rounded-2xl bg-[#070e1c] border border-white/10">
            <h4 className="text-sm font-semibold text-white mb-3">Line-Item Operating Schedule</h4>
            <div className="divide-y divide-white/5 text-xs">
              <div className="flex justify-between py-2">
                <span className="text-slate-300">Monthly Maintenance Fee ($1.15 / sq ft)</span>
                <span className="font-mono text-white font-semibold">
                  ${monthlyMaintenance.toLocaleString(undefined, { maximumFractionDigits: 0 })} {currency}/mo
                </span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-slate-300">Annual Municipal Property Taxes ($88,480 CAD/yr)</span>
                <span className="font-mono text-white font-semibold">
                  ${monthlyPropertyTax.toLocaleString(undefined, { maximumFractionDigits: 0 })} {currency}/mo
                </span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-slate-300">Luxury Penthouse Hazard & Contents Insurance (Est.)</span>
                <span className="font-mono text-white font-semibold">
                  ${monthlyInsurance.toLocaleString(undefined, { maximumFractionDigits: 0 })} {currency}/mo
                </span>
              </div>
              {purchaseType === 'financed' && (
                <div className="flex justify-between py-2">
                  <span className="text-cyan-300 font-semibold">Mortgage Principal & Interest Service</span>
                  <span className="font-mono text-cyan-300 font-bold">
                    ${monthlyMortgage.toLocaleString(undefined, { maximumFractionDigits: 0 })} {currency}/mo
                  </span>
                </div>
              )}
              <div className="flex justify-between pt-2.5 font-bold text-sm">
                <span className="text-white">Total Projected Monthly Holding Cost</span>
                <span className="font-mono text-emerald-400">
                  ${totalMonthlyCarrying.toLocaleString(undefined, { maximumFractionDigits: 0 })} {currency}/mo
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-[#0a162b] border-t border-white/10 flex items-center justify-between">
          <div className="text-xs text-slate-400">
            Prepared by ARGUS Private Capital Analytics · Subject to legal and tax review
          </div>
          <button
            onClick={() => {
              onClose();
              onOpenConciergeQuestion(`Can you analyze the tax and liquidity implications of acquiring Suite 5200 through an offshore trust or holding corp?`);
            }}
            className="py-2 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-md"
          >
            <span>Ask ARGUS to Advise Structure</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
