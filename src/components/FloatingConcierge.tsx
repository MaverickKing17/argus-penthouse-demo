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
  Layers,
} from 'lucide-react';
import { Message, PropertyData } from '../types';
import { CONCIERGE_INITIAL_PROMPTS } from '../data/propertyData';

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

  // Get active quick replies from latest assistant message or fallback to standard initial prompts
  const latestAssistantMsg = [...messages].reverse().find((m) => m.role === 'assistant');
  const activeQuickReplies = latestAssistantMsg?.quickReplies && latestAssistantMsg.quickReplies.length > 0
    ? latestAssistantMsg.quickReplies
    : null;

  // Compact floating action bubble when minimized
  if (isMinimized) {
    return (
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsMinimized(false)}
          className="group flex items-center gap-3 px-4 py-3 rounded-full border border-cyan-500/40 shadow-2xl transition-all hover:border-cyan-300 cursor-pointer bg-[#061225]/95 backdrop-blur-xl"
        >
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-[#0d2a4d] flex items-center justify-center border border-cyan-400/50">
              <Bot className="w-4 h-4 text-cyan-300" />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
          </div>

          <div className="text-left">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold text-white font-sans">ARGUS AI Concierge</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-300 font-mono font-medium border border-cyan-500/30">ONLINE</span>
            </div>
            <div className="text-[11px] text-[#C7D0DC] font-normal">
              Click to open dialogue
            </div>
          </div>
        </button>
      </div>
    );
  }

  return (
    <div
      className="fixed bottom-6 right-6 z-40 max-w-[430px] w-[calc(100%-3rem)] sm:w-full transition-all duration-300 shadow-2xl border border-cyan-500/30 rounded-2xl overflow-hidden bg-[#061225]/98 backdrop-blur-2xl"
    >
      <div className="flex flex-col overflow-hidden">
        
        {/* Concierge Header (Restrained Cyan Online Indicator) */}
        <div className="shrink-0 px-4 py-3 bg-[#07162C] border-b border-cyan-500/20 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <div className="w-8 h-8 rounded-xl bg-[#0b2447] flex items-center justify-center border border-cyan-400/40">
                <Bot className="w-4 h-4 text-cyan-300" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-cyan-400"></span>
            </div>
            <div>
              <h3 className="font-semibold text-white text-sm tracking-wide font-sans">
                ARGUS AI Concierge
              </h3>
              <div className="flex items-center gap-1.5 text-[11px] text-cyan-300 font-mono font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 inline-block"></span>
                <span>ONLINE</span>
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
                  ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-400/40'
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
              <div className="absolute right-0 top-10 w-52 bg-[#06152e] border border-cyan-500/30 rounded-xl shadow-2xl p-1.5 z-50 text-xs backdrop-blur-2xl">
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
                  <Key className="w-3.5 h-3.5 text-[#BFA775]" />
                  <span>VIP Showing Protocol</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Message Stream (High Contrast Dark Theme) */}
        <div className="flex-1 overflow-y-auto max-h-[310px] min-h-[200px] px-4 py-3.5 space-y-3 scroll-smooth bg-[#061225]">
          {messages.map((msg) => {
            const isAssistant = msg.role === 'assistant';
            return (
              <div
                key={msg.id}
                className={`flex items-start gap-2.5 ${isAssistant ? '' : 'justify-end'}`}
              >
                {isAssistant && (
                  <div className="w-6 h-6 rounded-lg bg-[#0b2447] border border-cyan-400/40 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5 text-cyan-300" />
                  </div>
                )}

                <div
                  className={`max-w-[88%] rounded-2xl p-3.5 text-[14px] leading-relaxed ${
                    isAssistant
                      ? 'bg-[#0d223f] text-white font-normal border border-cyan-400/25'
                      : 'bg-[#1C75BC] text-white font-medium rounded-br-xs border border-cyan-300/30'
                  }`}
                >
                  <div className="whitespace-pre-wrap font-sans text-white leading-relaxed">
                    {msg.content}
                  </div>

                  <div
                    className={`text-[10px] mt-1.5 font-mono tabular-nums ${
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
              <div className="w-6 h-6 rounded-lg bg-[#0b2447] border border-cyan-400/40 flex items-center justify-center shrink-0">
                <Bot className="w-3.5 h-3.5 text-cyan-300" />
              </div>
              <div className="bg-[#0d223f] rounded-2xl p-3 border border-cyan-400/25 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse [animation-delay:0.4s]"></span>
                <span className="text-xs text-cyan-200 ml-1 font-mono">
                  ARGUS formulating response...
                </span>
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* CLICKABLE SUGGESTED PROMPTS & PROGRESSIVE QUALIFICATION QUICK REPLIES */}
        <div className="shrink-0 p-2.5 bg-[#050f20] border-t border-cyan-500/20">
          {activeQuickReplies ? (
            <div className="space-y-1.5">
              <div className="text-[10px] font-mono uppercase tracking-wider text-cyan-300 font-semibold px-1">
                Suggested Options:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {activeQuickReplies.map((replyText, idx) => (
                  <button
                    key={idx}
                    onClick={() => onSendMessage(replyText)}
                    className="px-3 py-1.5 rounded-xl bg-[#0c2445] hover:bg-[#123663] text-white hover:text-cyan-200 border border-cyan-400/40 hover:border-cyan-300 text-xs font-medium transition-all cursor-pointer shadow-sm"
                  >
                    {replyText}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-1.5">
              {CONCIERGE_INITIAL_PROMPTS.map((promptText, idx) => (
                <button
                  key={idx}
                  onClick={() => onSendMessage(promptText)}
                  className={`py-1.5 px-2.5 rounded-xl text-[11.5px] font-medium text-left truncate transition-all cursor-pointer border ${
                    idx === 3
                      ? 'col-span-2 bg-[#0c264a] text-cyan-100 border-cyan-400/50 hover:border-cyan-300 font-semibold text-center'
                      : 'bg-[#08182f] text-[#C7D0DC] hover:text-white border-white/10 hover:border-cyan-400/40'
                  }`}
                >
                  {promptText}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* PINNED INPUT BAR */}
        <div className="shrink-0 p-3 bg-[#040c1a] border-t border-cyan-500/20 flex items-center gap-2">
          <button
            onClick={toggleVoiceInput}
            className={`p-2 rounded-xl transition-colors cursor-pointer ${
              isListening
                ? 'bg-rose-500 text-white'
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
            placeholder="Ask ARGUS about Suite 5200..."
            className="flex-1 bg-[#081b36] border border-cyan-500/30 focus:border-cyan-300 rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-[#8FA1B5] font-normal focus:outline-none focus:ring-1 focus:ring-cyan-300 transition-all"
          />

          <button
            onClick={() => {
              if (inputValue.trim()) {
                onSendMessage(inputValue);
                setInputValue('');
              }
            }}
            disabled={isLoading || !inputValue.trim()}
            className="w-8 h-8 rounded-xl bg-[#1C75BC] hover:bg-blue-600 disabled:opacity-40 disabled:cursor-not-allowed text-white flex items-center justify-center shrink-0 transition-all cursor-pointer"
          >
            <Send className="w-3.5 h-3.5 text-white" />
          </button>
        </div>

      </div>
    </div>
  );
};
