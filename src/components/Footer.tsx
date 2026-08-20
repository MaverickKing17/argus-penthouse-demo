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
  CheckCircle2,
  ChevronRight,
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
      <footer className="w-full bg-[#040C1A] border-t border-cyan-500/20 pt-12 pb-10 text-white relative">
        <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-12 space-y-10">
          
          {/* Top Tier: Institutional Brand, Mission & Accreditation Flow */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-8 border-b border-white/10">
            
            {/* Col 1-6: Brand & Positioning */}
            <div className="lg:col-span-6 space-y-3.5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#BFA775] to-[#8C733E] p-0.5 flex items-center justify-center">
                  <div className="w-full h-full bg-[#071124] rounded-[6px] flex items-center justify-center">
                    <div className="w-3.5 h-3.5 rotate-45 border-2 border-[#BFA775] flex items-center justify-center">
                      <div className="w-1 h-1 bg-[#BFA775]"></div>
                    </div>
                  </div>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-white font-bold tracking-[0.2em] text-xl font-display">ARCUS</span>
                  <span className="text-[#BFA775] font-semibold text-xs px-2 py-0.2 rounded bg-[#BFA775]/15 border border-[#BFA775]/30">
                    AI
                  </span>
                </div>
              </div>

              <div className="text-sm font-semibold text-[#F3E2B8] italic font-serif">
                "Intelligence. Precision. Results."
              </div>

              <p className="text-xs text-[#C7D0DC] leading-relaxed max-w-lg font-normal">
                ARCUS AI provides white-label digital acquisition concierge and structured lead qualification infrastructure for high-value residential real estate brokerages in the Greater Toronto Area.
              </p>

              {/* Defensible Architecture Badges */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <button
                  onClick={() => openLegalDocument('reco')}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#061528] border border-cyan-500/30 text-[11px] text-cyan-200 hover:border-cyan-400 transition-colors cursor-pointer"
                >
                  <Shield className="w-3 h-3 text-cyan-300" />
                  <span>COMPLIANCE-AWARE WORKFLOW</span>
                </button>
                <button
                  onClick={() => openLegalDocument('fintrac')}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#061528] border border-emerald-500/30 text-[11px] text-emerald-200 hover:border-emerald-400 transition-colors cursor-pointer"
                >
                  <Lock className="w-3 h-3 text-emerald-300" />
                  <span>SECURITY-FIRST ARCHITECTURE</span>
                </button>
              </div>
            </div>

            {/* Col 7-12: Contact Coordinates & Private Deal Flow */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Contact Coordinates */}
              <div className="space-y-2.5">
                <div className="text-xs font-mono uppercase tracking-wider text-cyan-300 font-semibold">
                  Advisory Coordinates
                </div>
                <div className="space-y-1.5 text-xs text-[#C7D0DC]">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#BFA775] shrink-0 mt-0.5" />
                    <span>50 Yorkville Avenue, Suite 5200<br />Toronto, ON M4W 0A3</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-cyan-300 shrink-0" />
                    <a href="tel:4169205200" className="text-white hover:text-cyan-300 font-mono">+1 (416) 920-5200</a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-cyan-300 shrink-0" />
                    <a href="mailto:suite5200@arcusai.toronto" className="text-white hover:text-cyan-300 font-mono">suite5200@arcusai.toronto</a>
                  </div>
                </div>
              </div>

              {/* Private Inquiries Subscription */}
              <div className="space-y-2.5">
                <div className="text-xs font-mono uppercase tracking-wider text-[#BFA775] font-semibold">
                  Private Inquiries
                </div>
                <p className="text-xs text-[#8FA1B5] leading-relaxed">
                  Confidential acquisitions and accredited advisory requests.
                </p>

                {emailSubscribed ? (
                  <div className="p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-300" />
                    <span>Inquiry channel registered.</span>
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="flex gap-1.5">
                    <input
                      type="email"
                      required
                      value={subEmail}
                      onChange={(e) => setSubEmail(e.target.value)}
                      placeholder="principal@advisory.com"
                      className="flex-1 bg-[#07172e] border border-cyan-500/30 focus:border-cyan-300 rounded-xl px-3 py-2 text-xs text-white placeholder:text-[#8FA1B5] focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="px-3 py-2 rounded-xl bg-[#BFA775] hover:bg-[#caa866] text-[#061225] font-semibold text-xs transition-all cursor-pointer shrink-0"
                    >
                      Connect
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>

          {/* Bottom Tier: Institutional Legal Disclaimer Note & Links */}
          <div className="space-y-4 text-xs text-[#8FA1B5]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="text-xs text-[#C7D0DC]">
                © {new Date().getFullYear()} ARCUS AI Technologies Inc. All Rights Reserved.
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs">
                <button
                  onClick={() => openLegalDocument('privacy')}
                  className="text-[#C7D0DC] hover:text-white transition-colors cursor-pointer"
                >
                  Privacy
                </button>
                <span>·</span>
                <button
                  onClick={() => openLegalDocument('nda')}
                  className="text-[#C7D0DC] hover:text-white transition-colors cursor-pointer"
                >
                  Client NDA / Privacy
                </button>
                <span>·</span>
                <button
                  onClick={() => openLegalDocument('reco')}
                  className="text-[#C7D0DC] hover:text-white transition-colors cursor-pointer"
                >
                  Compliance
                </button>
                <span>·</span>
                <button
                  onClick={() => openLegalDocument('fintrac')}
                  className="text-[#C7D0DC] hover:text-white transition-colors cursor-pointer"
                >
                  Security
                </button>
              </div>
            </div>

            {/* Subtle Professional Compliance Note from PDF Spec (Section 13) */}
            <div className="p-3.5 rounded-xl bg-[#061428] border border-white/10 text-[11.5px] text-[#C7D0DC] leading-relaxed">
              <strong className="text-white font-medium">Compliance Note: </strong>
              ARGUS supports brokerage workflows and does not replace the professional, legal, regulatory, or compliance responsibilities of the brokerage or its representatives.
            </div>
          </div>

        </div>
      </footer>

      {/* Interactive Legal Document Modal */}
      <LegalDocumentModal
        isOpen={isLegalModalOpen}
        onClose={() => setIsLegalModalOpen(false)}
        initialDoc={activeLegalDoc}
      />
    </>
  );
};
