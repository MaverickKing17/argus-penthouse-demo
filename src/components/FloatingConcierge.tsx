import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  Send,
  MoreHorizontal,
  Volume2,
  VolumeX,
  RotateCcw,
  Shield,
  Key,
  Mic,
  MicOff,
  Minimize2,
  Sparkles,
  TrendingUp,
  Briefcase,
} from 'lucide-react';
import { Message, PropertyData } from '../types';

interface FloatingConciergeProps {
  property: PropertyData;
  messages: Message[];
  inputValue: string;
  setInputValue: (val: string) => void;
  onSendMessage: (text: string) => void;
  isLoading: boolean;
  onResetChat: () => void;
  onOpenSpecs: () => void;
  onOpenFinancials: () => void;
  onOpenSchedule: () => void;
  onOpenMarket?: () => void;
  onOpenPortfolio?: () => void;
}

export const FloatingConcierge: React.FC<FloatingConciergeProps> = ({
  property,
  messages,
  inputValue,
  setInputValue,
  onSendMessage,
  isLoading,
  onResetChat,
  onOpenSpecs,
  onOpenFinancials,
  onOpenSchedule,
  onOpenMarket,
  onOpenPortfolio,
}) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto scroll chat
  useEffect(() => {
    if (!isMinimized) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading, isMinimized]);

  // Text-to-speech
  const speakMessage = (text: string) => {
    if (!voiceEnabled || typeof window === 'undefined' || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const cleanText = text.replace(/[*#_]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 0.95;
    utterance.pitch = 0.92;
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    const lastMsg = messages[messages.length - 1];
    if (lastMsg && lastMsg.role === 'assistant' && voiceEnabled) {
      speakMessage(lastMsg.content);
    }
  }, [messages, voiceEnabled]);

  const toggleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech recognition is not supported in this browser.');
      return;
    }
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    if (!isListening) {
      setIsListening(true);
      recognition.start();
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(transcript);
        setIsListening(false);
      };
      recognition.onerror = () => {
        setIsListening(false);
      };
      recognition.onend = () => {
        setIsListening(false);
      };
    } else {
      recognition.stop();
      setIsListening(false);
    }
  };

  // Compact floating action bubble when minimized
  if (isMinimized) {
    return (
      <div className="fixed bottom-6 right-6 z-40 animate-fadeIn">
        <button
          onClick={() => setIsMinimized(false)}
          className="group relative flex items-center gap-3 px-4 py-3 rounded-full border border-cyan-400/60 shadow-[0_15px_40px_rgba(0,0,0,0.7),0_0_25px_rgba(6,182,212,0.4)] transition-all transform hover:scale-105 active:scale-95 cursor-pointer bg-[#0A1128]/95 backdrop-blur-xl"
        >
          <div className="relative">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-cyan-400 via-blue-600 to-indigo-600 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.8)] border border-cyan-200">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#0A1128] animate-pulse"></span>
          </div>

          <div className="text-left">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-white font-display tracking-wide">ARGUS AI</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-mono font-semibold border border-emerald-500/40">Live</span>
            </div>
            <div className="text-[11px] text-cyan-200 font-medium flex items-center gap-1">
              <span>Ask Concierge</span>
              <Sparkles className="w-3 h-3 text-[#E6CA65]" />
            </div>
          </div>
        </button>
      </div>
    );
  }

  return (
    <div
      className="fixed bottom-6 right-6 z-40 max-w-[420px] w-[calc(100%-3rem)] sm:w-full transition-all duration-300 animate-fadeIn shadow-[0_25px_60px_rgba(0,0,0,0.8)] border border-cyan-500/40 rounded-2xl overflow-hidden bg-[#071329]/95 backdrop-blur-2xl"
    >
      <div className="flex flex-col overflow-hidden">
        
        {/* Concierge Header */}
        <div className="shrink-0 px-4 py-3 bg-gradient-to-r from-[#071736] via-[#091f45] to-[#071736] border-b border-cyan-500/30 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-400 via-blue-600 to-indigo-600 flex items-center justify-center shadow-[0_0_12px_rgba(6,182,212,0.6)] border border-cyan-300/60">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-[#061224] animate-pulse"></span>
            </div>
            <div>
              <h3 className="font-bold text-white text-sm tracking-wide font-display drop-shadow">
                ARGUS AI Concierge
              </h3>
              <div className="flex items-center gap-1.5 text-[11px] text-emerald-300 font-mono font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse"></span>
                <span>Online · 50 Yorkville Avenue</span>
              </div>
            </div>
          </div>

          {/* Header Controls: Voice, Options, and Minimize */}
          <div className="flex items-center gap-1 relative">
            <button
              onClick={() => setVoiceEnabled(!voiceEnabled)}
              title={voiceEnabled ? 'Mute AI Voice' : 'Enable AI Voice'}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                voiceEnabled
                  ? 'bg-cyan-500/30 text-cyan-200 border border-cyan-400/60 shadow-[0_0_8px_rgba(6,182,212,0.4)]'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            <button
              onClick={() => setShowOptions(!showOptions)}
              className="p-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
            >
              <MoreHorizontal className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsMinimized(true)}
              title="Minimize Concierge"
              className="p-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
            >
              <Minimize2 className="w-4 h-4" />
            </button>

            {/* Options Dropdown */}
            {showOptions && (
              <div className="absolute right-0 top-10 w-52 bg-[#06152e]/98 border border-cyan-500/40 rounded-xl shadow-2xl p-2 z-50 text-xs backdrop-blur-2xl">
                <button
                  onClick={() => {
                    onResetChat();
                    setShowOptions(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg text-slate-200 hover:bg-white/10 flex items-center gap-2 transition-colors cursor-pointer font-medium"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Reset Dialogue</span>
                </button>
                {onOpenMarket && (
                  <button
                    onClick={() => {
                      onOpenMarket();
                      setShowOptions(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg text-slate-200 hover:bg-white/10 flex items-center gap-2 transition-colors cursor-pointer font-medium"
                  >
                    <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Toronto Market Comps</span>
                  </button>
                )}
                {onOpenPortfolio && (
                  <button
                    onClick={() => {
                      onOpenPortfolio();
                      setShowOptions(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg text-slate-200 hover:bg-white/10 flex items-center gap-2 transition-colors cursor-pointer font-medium"
                  >
                    <Briefcase className="w-3.5 h-3.5 text-emerald-400" />
                    <span>HNWI Asset Allocation</span>
                  </button>
                )}
                <button
                  onClick={() => {
                    onOpenFinancials();
                    setShowOptions(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg text-slate-200 hover:bg-white/10 flex items-center gap-2 transition-colors cursor-pointer font-medium"
                >
                  <Shield className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Carrying Cost Schedule</span>
                </button>
                <button
                  onClick={() => {
                    onOpenSchedule();
                    setShowOptions(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg text-slate-200 hover:bg-white/10 flex items-center gap-2 transition-colors cursor-pointer font-medium"
                >
                  <Key className="w-3.5 h-3.5 text-[#E6CA65]" />
                  <span>VIP Showing Protocol</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* HIGH-CONTRAST READABLE CHAT MESSAGE STREAM */}
        <div className="flex-1 overflow-y-auto max-h-[300px] min-h-[190px] px-4 py-3.5 space-y-3 scroll-smooth bg-gradient-to-b from-[#061124] to-[#040c1a]">
          {messages.map((msg) => {
            const isAssistant = msg.role === 'assistant';
            return (
              <div
                key={msg.id}
                className={`flex items-start gap-2.5 ${isAssistant ? '' : 'justify-end'}`}
              >
                {isAssistant && (
                  <div className="w-6 h-6 rounded-lg bg-cyan-500/30 border border-cyan-400/60 flex items-center justify-center shrink-0 mt-0.5 shadow-[0_0_8px_rgba(6,182,212,0.4)]">
                    <Bot className="w-3.5 h-3.5 text-cyan-200" />
                  </div>
                )}

                {/* Highly Visible Message Bubble */}
                <div
                  className={`max-w-[88%] rounded-2xl p-3.5 text-[13px] sm:text-[13.5px] leading-relaxed shadow-md ${
                    isAssistant
                      ? 'bg-[#0f264d] text-white font-normal border border-cyan-400/35 shadow-[0_4px_20px_rgba(0,0,0,0.5)]'
                      : 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold rounded-br-xs shadow-[0_0_15px_rgba(6,182,212,0.4)] border border-cyan-300/40'
                  }`}
                >
                  <div className="whitespace-pre-wrap tracking-wide drop-shadow-sm font-sans">{msg.content}</div>

                  <div
                    className={`text-[10px] mt-1.5 font-mono font-bold tabular-nums ${
                      isAssistant ? 'text-cyan-300' : 'text-cyan-100 text-right'
                    }`}
                  >
                    {msg.timestamp}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex items-start gap-2.5">
              <div className="w-6 h-6 rounded-lg bg-cyan-500/30 border border-cyan-400/60 flex items-center justify-center shrink-0">
                <Bot className="w-3.5 h-3.5 text-cyan-200" />
              </div>
              <div className="bg-[#0f264d] rounded-2xl p-3 border border-cyan-400/35 flex items-center gap-2 shadow-md">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce"></span>
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.4s]"></span>
                <span className="text-xs text-cyan-200 ml-1 font-mono font-semibold">
                  ARGUS formulating advisory...
                </span>
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* HIGH-CONTRAST 2-COLUMN PROMPT CHIPS WITH LUMINOUS GRADIENTS */}
        <div className="shrink-0 p-2.5 bg-[#06152e] border-t border-cyan-500/30 grid grid-cols-2 gap-2">
          <button
            onClick={() => onSendMessage("I'm looking to buy in cash")}
            className="col-span-2 py-2 px-3.5 rounded-xl bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-300 hover:brightness-110 text-slate-950 text-xs font-bold text-center transition-all cursor-pointer shadow-[0_0_18px_rgba(6,182,212,0.5)] transform hover:scale-[1.01]"
          >
            I'm looking to buy in cash
          </button>

          <button
            onClick={() => onSendMessage("What are the carrying costs and reserve health?")}
            className="py-1.5 px-2.5 rounded-xl bg-[#0d264a] hover:bg-[#143769] text-cyan-100 border border-cyan-400/50 hover:border-cyan-300 text-[11px] font-semibold text-center truncate transition-all cursor-pointer shadow-sm"
          >
            Carrying costs & tax
          </button>

          <button
            onClick={() => onSendMessage("Tell me about the Poliform finishes and stone")}
            className="py-1.5 px-2.5 rounded-xl bg-[#0d264a] hover:bg-[#143769] text-cyan-100 border border-cyan-400/50 hover:border-cyan-300 text-[11px] font-semibold text-center truncate transition-all cursor-pointer shadow-sm"
          >
            Penthouse finishes
          </button>

          <button
            onClick={() => onSendMessage("How does Suite 5200 compare to other Yorkville comps?")}
            className="py-1.5 px-2.5 rounded-xl bg-[#0d264a] hover:bg-[#143769] text-cyan-100 border border-cyan-400/50 hover:border-cyan-300 text-[11px] font-semibold text-center truncate transition-all cursor-pointer shadow-sm"
          >
            Toronto market comps
          </button>

          <button
            onClick={() => onSendMessage("I'd like to schedule a private VIP twilight viewing")}
            className="py-1.5 px-2.5 rounded-xl bg-[#2a220e] hover:bg-[#3d3215] text-[#F3E2B8] border border-[#E6CA65]/60 hover:border-[#E6CA65] text-[11px] font-bold text-center truncate transition-all cursor-pointer shadow-sm"
          >
            Schedule VIP viewing
          </button>
        </div>

        {/* PINNED HIGH-VISIBILITY INPUT BAR */}
        <div className="shrink-0 p-3 bg-[#040e21] border-t border-cyan-500/30 flex items-center gap-2">
          <button
            onClick={toggleVoiceInput}
            className={`p-2 rounded-xl transition-colors cursor-pointer ${
              isListening
                ? 'bg-rose-500 text-white animate-pulse'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
            title="Voice Input"
          >
            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>

          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && inputValue.trim()) {
                onSendMessage(inputValue);
                setInputValue('');
              }
            }}
            placeholder="Ask ARGUS anything about Suite 5200..."
            className="flex-1 bg-[#091b38] border border-cyan-500/40 focus:border-cyan-300 rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-slate-400 font-medium focus:outline-none focus:ring-1 focus:ring-cyan-300 shadow-inner transition-all"
          />

          <button
            onClick={() => {
              if (inputValue.trim()) {
                onSendMessage(inputValue);
                setInputValue('');
              }
            }}
            disabled={isLoading || !inputValue.trim()}
            className="w-8 h-8 rounded-xl bg-gradient-to-r from-cyan-400 to-teal-400 hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(6,182,212,0.5)] transition-all cursor-pointer font-bold"
          >
            <Send className="w-3.5 h-3.5 text-slate-950" />
          </button>
        </div>

      </div>
    </div>
  );
};
