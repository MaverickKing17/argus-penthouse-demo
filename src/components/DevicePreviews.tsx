import React from 'react';
import { Bot, Send, Smartphone, Tablet } from 'lucide-react';
import { Message } from '../types';
import heroBgImage from '../assets/images/toronto_penthouse_twilight_1787165723733.jpg';

interface DevicePreviewsProps {
  messages: Message[];
  inputValue: string;
  setInputValue: (val: string) => void;
  onSendMessage: (text: string) => void;
  isLoading: boolean;
}

export const DevicePreviews: React.FC<DevicePreviewsProps> = ({
  messages,
  inputValue,
  setInputValue,
  onSendMessage,
  isLoading,
}) => {
  return (
    <div className="w-full max-w-[420px] flex flex-col gap-6 shrink-0">
      
      {/* MOBILE VIEW CONTAINER */}
      <div className="flex flex-col gap-1.5">
        <div className="text-xs font-mono uppercase tracking-widest text-slate-300 font-bold px-1">
          MOBILE VIEW
        </div>

        {/* High-contrast iPhone frame with subtle sheen */}
        <div className="relative rounded-[32px] bg-[#0c1424] border-2 border-cyan-500/40 shadow-[0_15px_40px_rgba(0,0,0,0.7),0_0_20px_rgba(6,182,212,0.15)] overflow-hidden p-2.5 transition-all hover:border-cyan-400">
          {/* Dynamic Island */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-3.5 bg-black rounded-full z-30 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-slate-900 ml-auto mr-2"></div>
          </div>

          <div className="relative bg-[#060D1E] rounded-[24px] overflow-hidden border border-white/10 flex flex-col h-[340px]">
            {/* Background Penthouse Image inside device */}
            <div className="absolute inset-0 z-0 pointer-events-none">
              <img
                src={heroBgImage}
                alt="Mobile preview"
                className="w-full h-full object-cover object-center opacity-70"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#060D1E]/60 via-[#060D1E]/70 to-[#060D1E]/95"></div>
            </div>

            {/* Mobile Header */}
            <div className="relative z-10 px-3 py-2 bg-[#061224]/80 backdrop-blur-md border-b border-white/10 flex items-center justify-between pt-3">
              <div className="w-4 h-4 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rotate-45 border border-[#E6CA65]"></div>
              </div>
              <div className="w-4 h-4 flex items-center justify-center">
                <div className="w-3 h-0.5 bg-white/70 shadow-sm"></div>
              </div>
            </div>

            {/* Mobile Hero Text */}
            <div className="relative z-10 px-3 pt-2 pb-1">
              <h4 className="text-white text-[11px] font-serif font-bold leading-tight drop-shadow">
                Suite 5200:
              </h4>
              <p className="text-[9px] text-[#F3E2B8] leading-tight font-light drop-shadow">
                The Intelligent Digital Twin for Toronto's Most Exclusive Penthouse.
              </p>
            </div>

            {/* Mobile Floating Concierge Card */}
            <div className="relative z-10 flex-1 mx-2.5 mb-2 bg-[#07162E]/90 border border-cyan-400/30 rounded-2xl p-2 flex flex-col justify-between backdrop-blur-md shadow-lg overflow-hidden">
              {/* Header */}
              <div className="flex items-center gap-1.5 pb-1 border-b border-white/5">
                <div className="w-4 h-4 rounded-full bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center">
                  <Bot className="w-2.5 h-2.5 text-cyan-300" />
                </div>
                <span className="text-[9px] font-semibold text-white">ARGUS AI Concierge</span>
                <span className="ml-auto text-[7px] text-emerald-400 font-mono">● Online</span>
              </div>

              {/* Message text */}
              <div className="text-[8.5px] text-slate-200 leading-snug py-1 line-clamp-3">
                Welcome to Suite 5200. I am ARGUS, your dedicated AI concierge. Ask me anything about floorplans, finishes, or carrying cost simulations.
              </div>

              {/* Vertical Pills inside Mobile */}
              <div className="space-y-1 my-1">
                <button
                  onClick={() => onSendMessage("I'm looking to buy in cash")}
                  className="w-full py-1 px-2 rounded-full bg-cyan-500 text-slate-950 text-[8px] font-semibold text-center"
                >
                  I'm looking to buy in cash
                </button>
                <button
                  onClick={() => onSendMessage("What are the carrying costs?")}
                  className="w-full py-0.5 px-2 rounded-full bg-[#091D3B] text-cyan-200 border border-cyan-500/30 text-[7.5px] text-center"
                >
                  What are the carrying costs?
                </button>
                <button
                  onClick={() => onSendMessage("Tell me about the finishes")}
                  className="w-full py-0.5 px-2 rounded-full bg-[#091D3B] text-cyan-200 border border-cyan-500/30 text-[7.5px] text-center"
                >
                  Tell me about the finishes
                </button>
              </div>

              {/* Mobile Input field */}
              <div className="bg-black/40 border border-white/10 rounded-full px-2 py-1 flex items-center justify-between">
                <span className="text-[8px] text-slate-400">Ask ARGUS anything...</span>
                <div className="w-4 h-4 rounded-full bg-cyan-500 flex items-center justify-center">
                  <Send className="w-2 h-2 text-slate-950" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* TABLET VIEW CONTAINER */}
      <div className="flex flex-col gap-1.5">
        <div className="text-xs font-mono uppercase tracking-widest text-slate-300 font-bold px-1">
          TABLET VIEW
        </div>

        {/* High-contrast iPad frame */}
        <div className="relative rounded-[26px] bg-[#0c1424] border-2 border-cyan-500/40 shadow-[0_15px_40px_rgba(0,0,0,0.7),0_0_20px_rgba(6,182,212,0.15)] overflow-hidden p-2.5 transition-all hover:border-cyan-400">
          <div className="relative bg-[#060D1E] rounded-[20px] overflow-hidden border border-white/10 flex flex-col h-[280px]">
            {/* Background Penthouse Image inside tablet */}
            <div className="absolute inset-0 z-0 pointer-events-none">
              <img
                src={heroBgImage}
                alt="Tablet preview"
                className="w-full h-full object-cover object-center opacity-70"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#060D1E]/60 via-[#060D1E]/70 to-[#060D1E]/95"></div>
            </div>

            {/* Tablet Header */}
            <div className="relative z-10 px-3 py-1.5 bg-[#061224]/80 backdrop-blur-md border-b border-white/10 flex items-center justify-between">
              <span className="text-[9px] font-serif font-bold text-white tracking-widest">ARCUS AI</span>
              <div className="w-3 h-3 rotate-45 border border-[#E6CA65] flex items-center justify-center">
                <div className="w-1 h-1 bg-[#E6CA65]"></div>
              </div>
            </div>

            {/* Tablet Content Area */}
            <div className="relative z-10 flex-1 p-2.5 flex flex-col justify-between">
              <div>
                <h4 className="text-white text-[10.5px] font-serif font-bold leading-tight drop-shadow">
                  Suite 5200:
                </h4>
                <p className="text-[8.5px] text-[#F3E2B8] leading-tight font-light drop-shadow">
                  The Intelligent Digital Twin for Toronto's Most Exclusive Penthouse.
                </p>
              </div>

              {/* Tablet Concierge Widget */}
              <div className="bg-[#07162E]/90 border border-cyan-400/30 rounded-xl p-2 backdrop-blur-md shadow-md">
                <div className="flex items-center gap-1.5 mb-1 pb-1 border-b border-white/5">
                  <div className="w-3.5 h-3.5 rounded-full bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center">
                    <Bot className="w-2 h-2 text-cyan-300" />
                  </div>
                  <span className="text-[8.5px] font-semibold text-white">ARGUS AI Concierge</span>
                  <span className="ml-auto text-[7px] text-emerald-400 font-mono">● Online</span>
                </div>

                <p className="text-[8px] text-slate-300 line-clamp-2 leading-relaxed">
                  Welcome to Suite 5200. I am ARGUS, your dedicated AI concierge. Ask me anything about floorplans or carrying cost simulations.
                </p>

                <div className="space-y-1 mt-1.5">
                  <button
                    onClick={() => onSendMessage("I'm looking to buy in cash")}
                    className="w-full py-0.5 rounded-full bg-cyan-500 text-slate-950 text-[7.5px] font-semibold text-center"
                  >
                    I'm looking to buy in cash
                  </button>
                  <button
                    onClick={() => onSendMessage("What are the carrying costs?")}
                    className="w-full py-0.5 rounded-full bg-[#091D3B] text-cyan-200 border border-cyan-500/30 text-[7px] text-center"
                  >
                    What are the carrying costs?
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
};
