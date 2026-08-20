import React from 'react';
import {
  X,
  Shield,
  Lock,
  FileText,
  Building2,
  CheckCircle2,
  AlertCircle,
  FileCheck,
  Globe,
  Scale,
  Download,
  Printer,
} from 'lucide-react';

export type LegalDocType = 'privacy' | 'nda' | 'fintrac' | 'reco';

interface LegalDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDoc: LegalDocType;
}

export const LegalDocumentModal: React.FC<LegalDocumentModalProps> = ({
  isOpen,
  onClose,
  initialDoc = 'privacy',
}) => {
  const [activeDoc, setActiveDoc] = React.useState<LegalDocType>(initialDoc);

  React.useEffect(() => {
    if (isOpen) {
      setActiveDoc(initialDoc);
    }
  }, [isOpen, initialDoc]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-[#081224] border-2 border-cyan-400/40 rounded-3xl overflow-hidden shadow-[0_25px_90px_rgba(0,0,0,0.95)] flex flex-col max-h-[88vh] my-auto text-white animate-modalSlideIn">
        
        {/* Modal Header with High Contrast */}
        <div className="shrink-0 px-6 py-4 bg-gradient-to-r from-[#0a1b38] via-[#0e2752] to-[#0a1b38] border-b border-cyan-500/35 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-400 via-blue-500 to-indigo-600 border border-cyan-300 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.5)]">
              <Scale className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-display font-bold text-white tracking-wide">
                  Regulatory, Compliance & Confidentiality Framework
                </h3>
                <span className="px-2.5 py-0.5 rounded bg-emerald-500/25 text-emerald-200 text-[11px] font-mono font-bold border border-emerald-400/50">
                  Ontario Legal Standard
                </span>
              </div>
              <p className="text-xs text-slate-100 font-medium mt-0.5">
                ARCUS AI Acquisition Governance · 50 Yorkville Avenue, Suite 5200
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-200 hover:text-white hover:bg-white/15 rounded-full transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation Pill Bar */}
        <div className="shrink-0 px-6 py-3 bg-[#050e1d] border-b border-cyan-500/20 flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveDoc('privacy')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeDoc === 'privacy'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_14px_rgba(6,182,212,0.4)] border border-cyan-300'
                : 'text-slate-100 bg-[#0a1a36] hover:bg-[#10274f] border border-white/10'
            }`}
          >
            <Shield className="w-3.5 h-3.5 text-cyan-300" />
            <span>Privacy Charter</span>
          </button>

          <button
            onClick={() => setActiveDoc('nda')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeDoc === 'nda'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_14px_rgba(6,182,212,0.4)] border border-cyan-300'
                : 'text-slate-100 bg-[#0a1a36] hover:bg-[#10274f] border border-white/10'
            }`}
          >
            <Lock className="w-3.5 h-3.5 text-[#E6CA65]" />
            <span>Client NDA Protocol</span>
          </button>

          <button
            onClick={() => setActiveDoc('fintrac')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeDoc === 'fintrac'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_14px_rgba(6,182,212,0.4)] border border-cyan-300'
                : 'text-slate-100 bg-[#0a1a36] hover:bg-[#10274f] border border-white/10'
            }`}
          >
            <FileCheck className="w-3.5 h-3.5 text-emerald-300" />
            <span>FINTRAC Schedule</span>
          </button>

          <button
            onClick={() => setActiveDoc('reco')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeDoc === 'reco'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_14px_rgba(6,182,212,0.4)] border border-cyan-300'
                : 'text-slate-100 bg-[#0a1a36] hover:bg-[#10274f] border border-white/10'
            }`}
          >
            <Building2 className="w-3.5 h-3.5 text-cyan-200" />
            <span>RECO & TRESA Guide</span>
          </button>
        </div>

        {/* Scrollable Document Content in Ultra High-Contrast White Text */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 text-sm text-white leading-relaxed font-sans bg-[#061122]">
          
          {/* 1. PRIVACY CHARTER */}
          {activeDoc === 'privacy' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="border-b border-cyan-500/30 pb-4">
                <div className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider">
                  STATUTORY COMPLIANCE: PIPEDA & ONTARIO PRIVACY FRAMEWORK
                </div>
                <h2 className="text-xl font-bold font-display text-white mt-1">
                  ARCUS AI Client Privacy & Family Office Confidentiality Charter
                </h2>
                <p className="text-xs text-slate-200 mt-1">
                  Effective Date: Current Real Estate Cycle · Version 4.2 · Jurisdiction: Ontario, Canada
                </p>
              </div>

              <div className="space-y-4 text-white">
                <div className="p-4 rounded-2xl bg-[#0e2246] border border-cyan-400/40 space-y-2">
                  <h4 className="font-bold text-white text-sm flex items-center gap-2">
                    <Shield className="w-4 h-4 text-cyan-300" />
                    1. Principle of Discretionary Sovereign Isolation
                  </h4>
                  <p className="text-xs text-slate-100 leading-relaxed">
                    ARCUS AI Technologies Inc. enforces an absolute zero-leakage data confidentiality architecture for all high-net-worth individuals, institutional trustees, and private family offices engaging with Suite 5200. No telemetry, identity records, financial qualification benchmarks, or property inquiries are shared with ad-tracking networks, public credit bureaus, or external data brokers.
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-bold text-white text-sm">2. Information Collected During Advisory Interactions</h4>
                  <p className="text-xs text-slate-200">
                    When interacting with the ARGUS AI Concierge, the following qualification telemetry may be processed in an encrypted temporary enclave:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-xs text-slate-100">
                    <li>Target capital allocation range and approximate acquisition budget envelopes.</li>
                    <li>Preferred conveyance transaction structures (Direct Cash Settlement, Structured Collateralized Credit Facilities, or Corporate Trust conveyance).</li>
                    <li>Brokerage representation status pursuant to the Real Estate Council of Ontario guidelines.</li>
                    <li>Schedule coordination preferences for private daylight or twilight architectural walkthroughs.</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="font-bold text-white text-sm">3. End-to-End Cryptographic Security & Server Enclaves</h4>
                  <p className="text-xs text-slate-200">
                    All conversational telemetry transmitted between the client terminal and the ARGUS intelligence cluster is encrypted in transit using TLS 1.3 with AES-256 cipher suites and stored in sovereign Canadian data centers compliant with SOC 2 Type II and ISO/IEC 27001 certifications.
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-bold text-white text-sm">4. Right to Immediate Record Expungement</h4>
                  <p className="text-xs text-slate-200">
                    Prospective purchasers and their legal counsel may at any time request the permanent, unrecoverable deletion of all consultation transcripts, lead qualification records, and identity files by issuing a written directive to <span className="font-mono text-cyan-300 font-bold">privacy@arcusai.toronto</span>.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 2. CLIENT NDA PROTOCOL */}
          {activeDoc === 'nda' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="border-b border-cyan-500/30 pb-4">
                <div className="text-xs font-mono font-bold text-[#E6CA65] uppercase tracking-wider">
                  EXECUTIVE ASSET SECURITY & NON-DISCLOSURE
                </div>
                <h2 className="text-xl font-bold font-display text-white mt-1">
                  Private Showing & Architectural Non-Disclosure Protocol
                </h2>
                <p className="text-xs text-slate-200 mt-1">
                  Four Seasons Private Residences · Penthouse Suite 5200 · Exclusive Directorship
                </p>
              </div>

              <div className="space-y-4 text-white">
                <div className="p-4 rounded-2xl bg-[#231e11] border border-[#E6CA65]/50 space-y-2">
                  <h4 className="font-bold text-[#F3E2B8] text-sm flex items-center gap-2">
                    <Lock className="w-4 h-4 text-[#E6CA65]" />
                    Mandatory Confidentiality for High-Security Residential Assets
                  </h4>
                  <p className="text-xs text-slate-100 leading-relaxed">
                    Due to the prominent status, private elevator security codes, and proprietary architectural specifications of Penthouse Suite 5200, all principals, family office representatives, and accredited agents must adhere to strict non-disclosure obligations upon scheduling an executive tour.
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-bold text-white text-sm">1. Protected Confidential Materials</h4>
                  <p className="text-xs text-slate-200">
                    Confidential Information includes, without limitation:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-xs text-slate-100">
                    <li>Schematic diagrams of the private elevator vestibule and dedicated security keycard bypass codes.</li>
                    <li>Lutron Palladiom home automation architectural schematics and physical access points.</li>
                    <li>Condominium Corporation #2241 Status Certificate schedules, reserve fund auditor reports, and engineering evaluations.</li>
                    <li>Identities of existing tower residents, co-tenants, and building directorship personnel.</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="font-bold text-white text-sm">2. Non-Circumvention & Directorship Integrity</h4>
                  <p className="text-xs text-slate-200">
                    Recipients of off-market pricing packages agree not to circumvent the listing brokerage directorship or directly solicit vendors without authorized registration protocols.
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-bold text-white text-sm">3. Media & Photography Restrictions</h4>
                  <p className="text-xs text-slate-200">
                    No unauthorized photography, video recording, or social media broadcasting is permitted during private showing walkthroughs without express written authorization from the listing directorship.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 3. FINTRAC SCHEDULE */}
          {activeDoc === 'fintrac' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="border-b border-cyan-500/30 pb-4">
                <div className="text-xs font-mono font-bold text-emerald-300 uppercase tracking-wider">
                  CANADIAN ANTI-MONEY LAUNDERING (AML) COMPLIANCE
                </div>
                <h2 className="text-xl font-bold font-display text-white mt-1">
                  FINTRAC Client Identification & Source of Funds Compliance Schedule
                </h2>
                <p className="text-xs text-slate-200 mt-1">
                  Proceeds of Crime (Money Laundering) and Terrorist Financing Act (PCMLTFA) Compliance
                </p>
              </div>

              <div className="space-y-4 text-white">
                <div className="p-4 rounded-2xl bg-[#09261a] border border-emerald-400/50 space-y-2">
                  <h4 className="font-bold text-emerald-200 text-sm flex items-center gap-2">
                    <FileCheck className="w-4 h-4 text-emerald-300" />
                    Statutory Federal Real Estate Obligations
                  </h4>
                  <p className="text-xs text-slate-100 leading-relaxed">
                    Under Canadian Federal Law, registered real estate brokerages and conveyancers are statutory reporting entities required to verify the identity of every buyer, seller, and beneficial owner in transactions involving real property in Ontario.
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-bold text-white text-sm">1. Individual Verification (Government Photo ID)</h4>
                  <p className="text-xs text-slate-200">
                    Valid, unexpired government identification (Canadian Passport, Provincial Driver's License, or Foreign Sovereign Passport) is verified prior to deposit submission into statutory trust accounts.
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-bold text-white text-sm">2. Corporate & Trust Beneficial Ownership Determination</h4>
                  <p className="text-xs text-slate-200">
                    Where the purchasing entity is a Canadian corporation, offshore holding entity, or trust, the brokerage must verify:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-xs text-slate-100">
                    <li>Certificate of Incorporation, Articles of Amalgamation, or Trust Indenture.</li>
                    <li>Names and addresses of all natural persons who own or control, directly or indirectly, 25% or more of the shares or voting rights.</li>
                    <li>Politically Exposed Persons (PEP) and Head of International Organization (HIO) declarations.</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="font-bold text-white text-sm">3. Trust Account Deposit Protocols</h4>
                  <p className="text-xs text-slate-200">
                    All earnest money deposits for Suite 5200 are held in designated, insured Canadian Schedule I bank statutory real estate trust accounts in full compliance with REBBA/TRESA trust handling standards.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 4. RECO & TRESA GUIDE */}
          {activeDoc === 'reco' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="border-b border-cyan-500/30 pb-4">
                <div className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider">
                  REAL ESTATE COUNCIL OF ONTARIO (RECO)
                </div>
                <h2 className="text-xl font-bold font-display text-white mt-1">
                  TRESA 2020 Information Guide & Consumer Representation Notice
                </h2>
                <p className="text-xs text-slate-200 mt-1">
                  Trust in Real Estate Services Act, 2020 (TRESA) · Consumer Protection Mandate
                </p>
              </div>

              <div className="space-y-4 text-white">
                <div className="p-4 rounded-2xl bg-[#0e2246] border border-cyan-400/40 space-y-2">
                  <h4 className="font-bold text-white text-sm flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-cyan-300" />
                    Understanding Your Representation Options in Ontario
                  </h4>
                  <p className="text-xs text-slate-100 leading-relaxed">
                    Under the Trust in Real Estate Services Act (TRESA, 2020), buyers interacting with real estate brokerages in Ontario have clearly defined legal relationships designed to safeguard consumer interests and prevent conflicts of interest.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="p-3.5 rounded-xl bg-[#091b38] border border-white/15">
                    <div className="text-xs font-bold text-cyan-300 uppercase font-mono">OPTION A: CLIENT STATUS</div>
                    <div className="text-xs text-slate-100 mt-1 leading-relaxed">
                      You enter into a written Representation Agreement with a brokerage. The brokerage owes you fiduciary duties of loyalty, full disclosure, best efforts, and absolute confidentiality.
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#091b38] border border-white/15">
                    <div className="text-xs font-bold text-emerald-300 uppercase font-mono">OPTION B: SELF-REPRESENTED PARTY</div>
                    <div className="text-xs text-slate-100 mt-1 leading-relaxed">
                      You choose not to engage a brokerage to represent you. The listing brokerage cannot provide you with advisory, negotiation advocacy, or confidential pricing guidance.
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-bold text-white text-sm">Multiple Representation & Open Bidding</h4>
                  <p className="text-xs text-slate-200">
                    TRESA permits sellers to authorize the disclosure of competing offer details (excluding personal identifying information) to prospective buyers. In instances where multiple clients are represented by the same brokerage directorship, all parties must provide informed, written consent prior to offer presentation.
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="shrink-0 px-6 py-4 bg-[#0a1b38] border-t border-cyan-500/35 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white">
          <div className="flex items-center gap-2 font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Verified and audited by Ontario Real Estate Legal Counsel</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => window.print()}
              className="px-3.5 py-1.5 rounded-xl bg-[#0e2752] hover:bg-[#16386e] text-white border border-cyan-400/40 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-cyan-300" />
              <span>Print Schedule</span>
            </button>
            <button
              onClick={onClose}
              className="px-5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-400 to-teal-400 hover:brightness-110 text-slate-950 text-xs font-bold transition-all cursor-pointer shadow-md"
            >
              Acknowledge & Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
