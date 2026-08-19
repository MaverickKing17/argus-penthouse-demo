import React from 'react';
import { Bot, Send, Sparkles, Smartphone, Tablet, ChevronRight } from 'lucide-react';
import { Message } from '../types';

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
    <div className="w-full xl:w-[380px] 2xl:w-[420px] flex flex-col gap-6 shrink-0">
      {/* Mobile View Container */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between text-xs font-mono tracking-wider text-slate-400 px-1">
          <span className="flex items-center gap-1.5 font-bold uppercase text-slate-300">
            <Smartphone className="w-3.5 h-3.5 text-cyan-400" />
            Mobile View
          </span>
          <span className="text-[10px] text-cyan-400 bg-cyan-950/60 border border-cyan-800/50 px-2 py-0.5 rounded-full">
            Live Mirror
          </span>
        </div>

        {/* Realistic iPhone Bezel */}
        <div className="relative rounded-[32px] bg-[#0c1424] border-4 border-slate-700/80 shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden p-3 transition-all hover:border-slate-600">
          {/* Dynamic Island / Notch */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-4 bg-black rounded-full z-30 flex items-center justify-center">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-900 ml-auto mr-2"></div>
          </div>

          <div className="bg-[#070e1b] rounded-[24px] overflow-hidden border border-white/5 flex flex-col h-[340px]">
            {/* Mobile Header */}
            <div className="px-3.5 py-2.5 bg-[#0a1426]/90 border-b border-white/10 flex items-center justify-between pt-4">
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-4 rotate-45 border border-amber-400/90 flex items-center justify-center">
                  <div className="w-1 h-1 bg-amber-400"></div>
                </div>
                <span className="text-[11px] font-bold text-white tracking-widest font-serif">ARCUS AI</span>
              </div>
              <div className="text-[10px] text-amber-400/80 font-mono">Suite 5200</div>
            </div>

            {/* Mobile Mini Hero */}
            <div className="px-3.5 pt-2.5 pb-1">
              <h4 className="text-white text-xs font-serif font-semibold leading-tight">
                Suite 5200:
              </h4>
              <p className="text-[10px] text-amber-200/80 leading-tight">
                The Intelligent Digital Twin for Toronto's Most Exclusive Penthouse.
              </p>
            </div>

            {/* Mobile Chat Stream */}
            <div className="flex-1 overflow-y-auto px-3 py-2 space-y-2 text-[11px]">
              {/* ARGUS Header */}
              <div className="flex items-center justify-between bg-white/5 px-2 py-1 rounded-lg border border-white/5">
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-full bg-cyan-600/30 border border-cyan-400/50 flex items-center justify-center">
                    <Bot className="w-3 h-3 text-cyan-300" />
                  </div>
                  <div>
                    <div className="text-[10px] font-semibold text-white leading-none">ARGUS AI Concierge</div>
                    <div className="text-[8px] text-emerald-400 flex items-center gap-0.5">
                      <span className="w-1 h-1 rounded-full bg-emerald-400 inline-block"></span>
                      Online
                    </div>
                  </div>
                </div>
              </div>

              {/* Messages Preview */}
              {messages.slice(0, 3).map((m) => (
                <div
                  key={`mob-${m.id}`}
                  className={`p-2 rounded-xl text-[10px] leading-relaxed ${
                    m.role === 'assistant'
                      ? 'bg-slate-900/90 text-slate-200 border border-white/10'
                      : 'bg-cyan-600/30 text-cyan-100 border border-cyan-500/30 ml-4'
                  }`}
                >
                  {m.content.length > 130 ? m.content.substring(0, 130) + '...' : m.content}
                </div>
              ))}
            </div>

            {/* Mobile Suggestion Chips */}
            <div className="px-2.5 py-1.5 flex gap-1 overflow-x-auto border-t border-white/5 bg-black/20 no-scrollbar">
              <button
                onClick={() => onSendMessage("I'm looking to buy in cash")}
                className="whitespace-nowrap px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-[9px] hover:bg-cyan-500/20"
              >
                I'm looking to buy in cash
              </button>
              <button
                onClick={() => onSendMessage("What are the carrying costs?")}
                className="whitespace-nowrap px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-300 text-[9px] hover:bg-white/10"
              >
                Carrying costs?
              </button>
            </div>

            {/* Mobile Input */}
            <div className="p-2 bg-[#091222] border-t border-white/10 flex items-center gap-1.5">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && inputValue.trim()) {
                    onSendMessage(inputValue);
                    setInputValue('');
                  }
                }}
                placeholder="Ask ARGUS anything..."
                className="flex-1 bg-white/5 border border-white/10 rounded-full px-2.5 py-1 text-[10px] text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
              />
              <button
                onClick={() => {
                  if (inputValue.trim()) {
                    onSendMessage(inputValue);
                    setInputValue('');
                  }
                }}
                disabled={isLoading}
                className="w-6 h-6 rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 flex items-center justify-center shrink-0"
              >
                <Send className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tablet View Container */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between text-xs font-mono tracking-wider text-slate-400 px-1">
          <span className="flex items-center gap-1.5 font-bold uppercase text-slate-300">
            <Tablet className="w-3.5 h-3.5 text-amber-400" />
            Tablet View
          </span>
          <span className="text-[10px] text-amber-400 bg-amber-950/60 border border-amber-800/50 px-2 py-0.5 rounded-full">
            Split Mode
          </span>
        </div>

        {/* Realistic iPad Frame */}
        <div className="relative rounded-[28px] bg-[#0c1424] border-4 border-slate-700/80 shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden p-3 transition-all hover:border-slate-600">
          <div className="bg-[#070e1b] rounded-[20px] overflow-hidden border border-white/5 flex flex-col h-[280px]">
            {/* Tablet Navigation */}
            <div className="px-3.5 py-2 bg-[#091222] border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-serif font-bold text-white">ARCUS AI</span>
                <span className="text-[9px] text-slate-400">· Suite 5200 Concierge</span>
              </div>
              <div className="flex items-center gap-1.5 text-[9px] text-slate-400">
                <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10">Overview</span>
                <span className="px-1.5 py-0.5 rounded bg-cyan-600/30 border border-cyan-400/40 text-cyan-200">Concierge</span>
              </div>
            </div>

            {/* Tablet Content Area */}
            <div className="flex-1 p-3 flex flex-col justify-between relative overflow-hidden">
              {/* Subtle background skyline glow */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#081224] via-[#09152b]/80 to-transparent pointer-events-none"></div>

              <div className="relative z-10">
                <div className="text-[11px] font-serif font-bold text-white">
                  Suite 5200:
                </div>
                <div className="text-[10px] text-amber-200/90 leading-tight">
                  The Intelligent Digital Twin for Toronto's Most Exclusive Penthouse.
                </div>
              </div>

              {/* Tablet mini concierge card */}
              <div className="relative z-10 bg-slate-900/90 border border-white/10 rounded-xl p-2.5 backdrop-blur-md">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <div className="w-4 h-4 rounded-full bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center">
                    <Bot className="w-2.5 h-2.5 text-cyan-300" />
                  </div>
                  <span className="text-[10px] font-semibold text-white">ARGUS AI Concierge</span>
                  <span className="ml-auto text-[8px] text-emerald-400 font-mono">● Online</span>
                </div>
                <p className="text-[9px] text-slate-300 line-clamp-2 leading-relaxed">
                  Welcome to Suite 5200. I am ARGUS, your dedicated AI concierge. Ask me anything about floorplans, finishes, or carrying cost simulations.
                </p>
                <div className="mt-2 flex gap-1">
                  <button
                    onClick={() => onSendMessage("Tell me about the finishes")}
                    className="flex-1 py-1 rounded bg-white/5 border border-white/10 text-[9px] text-slate-200 text-center hover:bg-white/10"
                  >
                    Finishes
                  </button>
                  <button
                    onClick={() => onSendMessage("What are the carrying costs?")}
                    className="flex-1 py-1 rounded bg-white/5 border border-white/10 text-[9px] text-slate-200 text-center hover:bg-white/10"
                  >
                    Carrying Costs
                  </button>
                  <button
                    onClick={() => onSendMessage("I'd like to schedule a private viewing")}
                    className="flex-1 py-1 rounded bg-amber-500/20 border border-amber-400/30 text-[9px] text-amber-300 text-center hover:bg-amber-500/30"
                  >
                    Private Viewing
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
