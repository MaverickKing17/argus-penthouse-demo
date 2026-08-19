import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Shield,
  Building,
  Award,
  Globe2,
  Lock,
  ArrowUpRight,
  Send,
  CheckCircle2,
  FileText,
  ExternalLink,
  ChevronRight,
  Scale,
  FileCheck2,
} from 'lucide-react';
import { LegalDocumentModal, LegalDocType } from './LegalDocumentModal';

export const Footer: React.FC = () => {
  const [emailSubscribed, setEmailSubscribed] = useState(false);
  const [subEmail, setSubEmail] = useState('');
  const [isLegalModalOpen, setIsLegalModalOpen] = useState(false);
  const [activeLegalDoc, setActiveLegalDoc] = useState<LegalDocType>('privacy');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (subEmail.trim()) {
      setEmailSubscribed(true);
      setSubEmail('');
    }
  };

  const openLegalDocument = (doc: LegalDocType) => {
    setActiveLegalDoc(doc);
    setIsLegalModalOpen(true);
  };

  return (
    <>
      <footer className="w-full bg-[#030814] border-t-2 border-cyan-500/30 pt-14 pb-12 text-white relative overflow-hidden">
        {/* Background Decorative Glows */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#BFA775]/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10 space-y-12">
          
          {/* Top Tier: Brand Statement, Off-Market Intelligence Signup, and Directorship Highlights */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-10 border-b border-cyan-500/20">
            
            {/* Col 1-5: Brand & Positioning with Bright White High Contrast */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#E6CA65] via-[#BFA775] to-[#8C733E] p-0.5 shadow-[0_0_20px_rgba(191,167,117,0.45)] flex items-center justify-center">
                  <div className="w-full h-full bg-[#071124] rounded-[10px] flex items-center justify-center">
                    <div className="w-4 h-4 rotate-45 border-2 border-[#E6CA65] flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-[#E6CA65]"></div>
                    </div>
                  </div>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-white font-bold tracking-[0.22em] text-2xl font-display drop-shadow">ARCUS</span>
                  <span className="text-[#F3E2B8] font-bold tracking-wider text-xs px-2.5 py-0.5 rounded-md bg-[#E6CA65]/25 border border-[#E6CA65]/60 shadow-[0_0_10px_rgba(230,202,101,0.2)]">
                    AI · TORONTO
                  </span>
                </div>
              </div>

              <p className="text-sm text-white leading-relaxed max-w-lg font-normal drop-shadow-sm">
                ARCUS AI operates as the premier Intelligent Digital Twin & Luxury Acquisition Infrastructure for Toronto’s tier-one residential directorships. Powering confidential advisory for trophy penthouses, heritage ravine manors, and generational family office portfolios across Yorkville, The Bridle Path, Forest Hill, and Rosedale.
              </p>

              <div className="flex flex-wrap items-center gap-2.5 pt-2">
                <button
                  onClick={() => openLegalDocument('reco')}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-cyan-950/90 border border-cyan-400/50 text-xs text-white font-mono hover:bg-cyan-900/90 transition-all cursor-pointer shadow-sm"
                >
                  <Shield className="w-3.5 h-3.5 text-cyan-300" />
                  <span className="font-semibold">TRESA 2020 & RECO Compliant</span>
                </button>
                <button
                  onClick={() => openLegalDocument('nda')}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#201b0f]/90 border border-[#E6CA65]/50 text-xs text-[#F3E2B8] font-mono hover:bg-[#312915]/90 transition-all cursor-pointer shadow-sm"
                >
                  <Award className="w-3.5 h-3.5 text-[#E6CA65]" />
                  <span className="font-semibold">TRREB Private Registry</span>
                </button>
                <button
                  onClick={() => openLegalDocument('fintrac')}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#0a2318]/90 border border-emerald-400/50 text-xs text-emerald-100 font-mono hover:bg-[#103525]/90 transition-all cursor-pointer shadow-sm"
                >
                  <Lock className="w-3.5 h-3.5 text-emerald-300" />
                  <span className="font-semibold">FINTRAC Tier-1 Security</span>
                </button>
              </div>
            </div>

            {/* Col 6-7: Toronto Luxury Enclaves */}
            <div className="lg:col-span-3 space-y-3.5">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-1.5 drop-shadow">
                <Building className="w-4 h-4 text-cyan-400" />
                <span>Prime Toronto Enclaves</span>
              </h4>
              <ul className="space-y-2.5 text-xs text-white">
                <li className="p-2 rounded-xl bg-[#071733] border border-cyan-500/30">
                  <div className="flex items-center justify-between font-medium">
                    <span className="text-white">Bloor-Yorkville & Mink Mile</span>
                    <span className="font-mono text-cyan-300 font-bold">$2,450/SF</span>
                  </div>
                </li>
                <li className="p-2 rounded-xl bg-[#071733] border border-cyan-500/30">
                  <div className="flex items-center justify-between font-medium">
                    <span className="text-white">The Bridle Path & Post Road</span>
                    <span className="font-mono text-cyan-300 font-bold">$1,890/SF</span>
                  </div>
                </li>
                <li className="p-2 rounded-xl bg-[#071733] border border-cyan-500/30">
                  <div className="flex items-center justify-between font-medium">
                    <span className="text-white">Forest Hill South & Upper Village</span>
                    <span className="font-mono text-cyan-300 font-bold">$2,150/SF</span>
                  </div>
                </li>
                <li className="p-2 rounded-xl bg-[#071733] border border-cyan-500/30">
                  <div className="flex items-center justify-between font-medium">
                    <span className="text-white">Rosedale & Governor's Ravines</span>
                    <span className="font-mono text-cyan-300 font-bold">$2,280/SF</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Col 8-12: Private Off-Market Deal Flow Subscription */}
            <div className="lg:col-span-4 space-y-3.5">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#F3E2B8] flex items-center gap-1.5 drop-shadow">
                <Globe2 className="w-4 h-4 text-[#E6CA65]" />
                <span>Private Client Deal Flow</span>
              </h4>
              <p className="text-xs text-white leading-relaxed font-normal">
                Receive confidential off-market penthouse releases, sovereign estate acquisitions, and quarterly Toronto prime market intelligence before public MLS syndication.
              </p>

              {emailSubscribed ? (
                <div className="p-3.5 rounded-2xl bg-[#092e1e] border-2 border-emerald-400 text-white text-xs flex items-center gap-2.5 shadow-lg">
                  <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-300" />
                  <span className="font-medium">Executive accreditation confirmed. You are registered for confidential Toronto deal flow.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    required
                    value={subEmail}
                    onChange={(e) => setSubEmail(e.target.value)}
                    placeholder="principal@familyoffice.com"
                    className="flex-1 bg-[#091f42] border-2 border-cyan-400/50 focus:border-cyan-300 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-300 font-medium shadow-inner"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#E6CA65] via-[#BFA775] to-[#997F48] hover:brightness-110 text-slate-950 font-bold text-xs tracking-wide shadow-[0_0_15px_rgba(230,202,101,0.4)] transition-all cursor-pointer shrink-0 flex items-center gap-1"
                  >
                    <span>Accredit</span>
                    <ChevronRight className="w-4 h-4 text-slate-950" />
                  </button>
                </form>
              )}

              <div className="text-xs text-slate-200 flex items-center gap-1.5 font-normal">
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                <span>Strict non-disclosure policy. Fully encrypted family office records.</span>
              </div>
            </div>

          </div>

          {/* Middle Tier: Advisory Directorship Offices, Brokerage Affiliations & Contact Coordinates */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-2">
            
            {/* Location 1: Yorkville Flagship */}
            <div className="p-4 rounded-2xl bg-[#091a38] border border-cyan-400/40 space-y-2 shadow-md">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-cyan-300 shrink-0" />
                <span className="text-xs font-bold text-white uppercase tracking-wider font-display">Yorkville Private Desk</span>
              </div>
              <p className="text-xs text-white leading-relaxed font-normal">
                Four Seasons Private Residences<br />
                50 Yorkville Avenue, Suite 5200<br />
                Toronto, ON M4W 0A3, Canada
              </p>
            </div>

            {/* Location 2: Hazelton Client Suite */}
            <div className="p-4 rounded-2xl bg-[#091a38] border border-[#E6CA65]/40 space-y-2 shadow-md">
              <div className="flex items-center gap-2">
                <Building className="w-4 h-4 text-[#E6CA65] shrink-0" />
                <span className="text-xs font-bold text-white uppercase tracking-wider font-display">Hazelton Executive Suite</span>
              </div>
              <p className="text-xs text-white leading-relaxed font-normal">
                The Hazelton Building Directorship<br />
                118 Yorkville Avenue, 4th Floor<br />
                Toronto, ON M5R 1C2, Canada
              </p>
            </div>

            {/* Direct Communication Channels */}
            <div className="p-4 rounded-2xl bg-[#091a38] border border-emerald-400/40 space-y-2 shadow-md">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-300 shrink-0" />
                <span className="text-xs font-bold text-white uppercase tracking-wider font-display">Direct VIP Protocol</span>
              </div>
              <div className="space-y-1.5 text-xs text-white font-medium">
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-300 font-normal">Direct:</span>
                  <a href="tel:4169205200" className="font-mono text-cyan-300 hover:underline font-bold">+1 (416) 920-5200</a>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-300 font-normal">Dispatch:</span>
                  <a href="tel:4165557890" className="font-mono text-white hover:underline font-bold">+1 (416) 555-7890</a>
                </div>
              </div>
            </div>

            {/* Encrypted Advisory Channels */}
            <div className="p-4 rounded-2xl bg-[#091a38] border border-cyan-400/40 space-y-2 shadow-md">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#E6CA65] shrink-0" />
                <span className="text-xs font-bold text-white uppercase tracking-wider font-display">Encrypted Inquiries</span>
              </div>
              <div className="space-y-1.5 text-xs text-white font-medium">
                <div className="flex items-center gap-1.5 truncate">
                  <span className="text-slate-300 font-normal">Direct:</span>
                  <a href="mailto:suite5200@arcusai.toronto" className="text-cyan-300 hover:underline truncate font-bold">suite5200@arcusai.toronto</a>
                </div>
                <div className="flex items-center gap-1.5 truncate">
                  <span className="text-slate-300 font-normal">Advisory:</span>
                  <a href="mailto:partnerships@arcusai.com" className="text-white hover:underline truncate font-bold">partnerships@arcusai.com</a>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Tier: RECO/TRESA Legal Disclaimers, Interactive Legal Pages & High-Contrast White Text */}
          <div className="pt-8 border-t-2 border-cyan-500/25 space-y-5 text-xs text-white leading-relaxed">
            
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3 text-white font-semibold">
                <span>© {new Date().getFullYear()} ARCUS AI Technologies Inc. All Rights Reserved.</span>
                <span className="hidden sm:inline text-cyan-400 font-bold">|</span>
                <span>Operated in Advisory Synergy with Premier Toronto Luxury Brokerages</span>
                <span className="hidden sm:inline text-cyan-400 font-bold">|</span>
                <span className="text-cyan-300 font-mono">ARGUS™ Digital Twin Architecture</span>
              </div>

              {/* Interactive Legal Document Links */}
              <div className="flex flex-wrap items-center gap-4 text-xs font-bold">
                <button
                  onClick={() => openLegalDocument('privacy')}
                  className="text-cyan-200 hover:text-white underline decoration-cyan-400 underline-offset-4 cursor-pointer transition-colors"
                >
                  Privacy Charter
                </button>
                <span className="text-slate-400">·</span>
                <button
                  onClick={() => openLegalDocument('nda')}
                  className="text-cyan-200 hover:text-white underline decoration-cyan-400 underline-offset-4 cursor-pointer transition-colors"
                >
                  Client NDA Protocol
                </button>
                <span className="text-slate-400">·</span>
                <button
                  onClick={() => openLegalDocument('fintrac')}
                  className="text-cyan-200 hover:text-white underline decoration-cyan-400 underline-offset-4 cursor-pointer transition-colors"
                >
                  FINTRAC Schedule
                </button>
                <span className="text-slate-400">·</span>
                <button
                  onClick={() => openLegalDocument('reco')}
                  className="text-cyan-200 hover:text-white underline decoration-cyan-400 underline-offset-4 cursor-pointer transition-colors"
                >
                  RECO Information Guide
                </button>
              </div>
            </div>

            {/* High-Contrast Statutory Notice Box with Ultra-Readable White Text */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#091b3b] border-2 border-cyan-400/40 space-y-2.5 text-xs text-white shadow-lg">
              <p className="leading-relaxed">
                <strong className="text-cyan-300 font-bold tracking-wide uppercase">TRUST IN REAL ESTATE SERVICES ACT (TRESA, 2020) & RECO REGULATORY DISCLOSURE:</strong> The information presented within this application is intended exclusively for accredited investors, corporate trustees, and high-net-worth principals evaluating acquisition opportunities. This showcase does not constitute a solicitation of buyers or sellers currently under an active Exclusive Representation Agreement with a registered Ontario brokerage. All specifications, maintenance reserve allocations, and square footage measurements are derived from TRREB MLS® data, developer architectural floorplans, and condominium corporation declaration schedules deemed reliable but subject to independent verification by purchaser’s legal counsel.
              </p>
              <p className="leading-relaxed">
                <strong className="text-emerald-300 font-bold tracking-wide uppercase">FINTRAC & FOREIGN ACQUISITION COMPLIANCE:</strong> Real estate conveyances in Ontario are subject to the Financial Transactions and Reports Analysis Centre of Canada (FINTRAC) client identification protocols and applicable federal foreign property acquisition frameworks. Consult your chartered tax advisor or family office legal counsel for individual holding structure determinations.
              </p>
            </div>

          </div>

        </div>
      </footer>

      {/* Interactive Detailed Legal Document Viewer Modal */}
      <LegalDocumentModal
        isOpen={isLegalModalOpen}
        onClose={() => setIsLegalModalOpen(false)}
        initialDoc={activeLegalDoc}
      />
    </>
  );
};
