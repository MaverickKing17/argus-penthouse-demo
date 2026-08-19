import React from 'react';
import { Phone, Mail, Globe, Shield } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#040914] border-t border-white/10 py-6 px-4 lg:px-8 text-xs text-slate-400">
      <div className="max-w-[1680px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded bg-gradient-to-br from-amber-300 to-amber-600 p-0.5 flex items-center justify-center">
            <div className="w-full h-full bg-[#0a1122] rounded-[3px] flex items-center justify-center">
              <div className="w-2.5 h-2.5 rotate-45 border border-amber-400"></div>
            </div>
          </div>
          <span className="text-white font-serif font-bold tracking-widest text-sm">ARCUS AI</span>
        </div>

        {/* Tagline */}
        <div className="text-slate-300 font-serif tracking-wider text-xs sm:text-sm italic">
          Intelligence. Precision. Results.
        </div>

        {/* Contact Links */}
        <div className="flex flex-wrap items-center justify-center gap-5 text-xs text-slate-300">
          <a
            href="tel:4165557890"
            className="flex items-center gap-1.5 hover:text-amber-300 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-amber-400" />
            <span>(416) 555-7890</span>
          </a>

          <a
            href="mailto:partnerships@arcusai.com"
            className="flex items-center gap-1.5 hover:text-amber-300 transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-amber-400" />
            <span>partnerships@arcusai.com</span>
          </a>

          <a
            href="https://arcusai.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 hover:text-amber-300 transition-colors"
          >
            <Globe className="w-3.5 h-3.5 text-amber-400" />
            <span>arcusai.com</span>
          </a>
        </div>
      </div>
    </footer>
  );
};
