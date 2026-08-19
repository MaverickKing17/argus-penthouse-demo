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
  Maximize2,
  Sparkles,
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
          className="group relative flex items-center gap-3 px-4 py-3 rounded-full border border-cyan-400/40 shadow-[0_15px_40px_rgba(0,0,0,0.6),0_0_25px_rgba(6,182,212,0.3)] transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
          style={{
            background: 'rgba(10, 17, 40, 0.92)',
            backdropFilter: 'blur(16px)',
          }}
        >
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center shadow-[0_0_12px_rgba(6,182,212,0.6)] border border-cyan-300/50">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#0A1128] animate-pulse"></span>
          </div>

          <div className="text-left">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-white font-display tracking-wide">ARGUS AI</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-mono font-semibold border border-emerald-500/30">Live</span>
            </div>
            <div className="text-[11px] text-cyan-300 font-medium flex items-center gap-1">
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
      className="fixed bottom-6 right-6 z-40 max-w-[380px] w-[calc(100%-3rem)] sm:w-full transition-all duration-300 animate-fadeIn"
      style={{
        background: 'rgba(10, 17, 40, 0.85)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)',
        borderRadius: '0.75rem',
      }}
    >
      <div className="flex flex-col overflow-hidden rounded-[0.75rem]">
        
        {/* Concierge Header */}
        <div className="shrink-0 px-4 py-3 bg-[#061224]/90 border-b border-white/[0.08] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center shadow-[0_0_10px_rgba(6,182,212,0.5)] border border-cyan-300/50">
                <Bot className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 border border-[#061224] animate-pulse"></span>
            </div>
            <div>
              <h3 className="font-semibold text-white text-xs sm:text-sm tracking-wide font-display">
                ARGUS AI Concierge
              </h3>
              <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-mono font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block"></span>
                <span>Online · 50 Yorkville</span>
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
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {voiceEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            </button>

            <button
              onClick={() => setShowOptions(!showOptions)}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
            >
              <MoreHorizontal className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setIsMinimized(true)}
              title="Minimize Concierge"
              className="p-1.5 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
            >
              <Minimize2 className="w-3.5 h-3.5" />
            </button>

            {/* Options Dropdown */}
            {showOptions && (
              <div className="absolute right-0 top-9 w-48 bg-[#061224]/95 border border-white/15 rounded-xl shadow-2xl p-1.5 z-50 text-xs backdrop-blur-xl">
                <button
                  onClick={() => {
                    onResetChat();
                    setShowOptions(false);
                  }}
                  className="w-full text-left px-3 py-1.5 rounded-lg text-slate-300 hover:bg-white/10 flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3 text-cyan-400" />
                  <span>Reset Dialogue</span>
                </button>
                <button
                  onClick={() => {
                    onOpenFinancials();
                    setShowOptions(false);
                  }}
                  className="w-full text-left px-3 py-1.5 rounded-lg text-slate-300 hover:bg-white/10 flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Shield className="w-3 h-3 text-emerald-400" />
                  <span>Carrying Cost Model</span>
                </button>
                <button
                  onClick={() => {
                    onOpenSchedule();
                    setShowOptions(false);
                  }}
                  className="w-full text-left px-3 py-1.5 rounded-lg text-slate-300 hover:bg-white/10 flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Key className="w-3 h-3 text-[#E6CA65]" />
                  <span>VIP Showing Protocol</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Chat Message Stream */}
        <div className="flex-1 overflow-y-auto max-h-[260px] min-h-[160px] px-3.5 py-3 space-y-2.5 scroll-smooth">
          {messages.map((msg) => {
            const isAssistant = msg.role === 'assistant';
            return (
              <div
                key={msg.id}
                className={`flex items-start gap-2 ${isAssistant ? '' : 'justify-end'}`}
              >
                {isAssistant && (
                  <div className="w-5 h-5 rounded-md bg-cyan-600/30 border border-cyan-400/40 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-3 h-3 text-cyan-300" />
                  </div>
                )}

                <div
                  className={`max-w-[88%] rounded-xl p-2.5 text-xs leading-relaxed shadow-sm ${
                    isAssistant
                      ? 'bg-[#0A1A36]/80 text-slate-100 border border-white/[0.08]'
                      : 'bg-cyan-600 text-white rounded-br-xs shadow-[0_0_12px_rgba(6,182,212,0.35)]'
                  }`}
                >
                  <div className="whitespace-pre-wrap">{msg.content}</div>

                  <div
                    className={`text-[9px] mt-1 font-mono tabular-nums timestamp ${
                      isAssistant ? 'text-slate-400' : 'text-cyan-100/80 text-right'
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
            <div className="flex items-start gap-2">
              <div className="w-5 h-5 rounded-md bg-cyan-600/30 border border-cyan-400/40 flex items-center justify-center shrink-0">
                <Bot className="w-3 h-3 text-cyan-300" />
              </div>
              <div className="bg-[#0A1A36]/80 rounded-xl p-2 border border-white/[0.08] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.4s]"></span>
                <span className="text-[10px] text-slate-400 ml-1 font-mono">
                  ARGUS analyzing...
                </span>
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Compact 2-Column Prompt Chips */}
        <div className="shrink-0 p-2 bg-[#061224]/80 border-t border-white/[0.08] grid grid-cols-2 gap-1.5">
          <button
            onClick={() => onSendMessage("I'm looking to buy in cash")}
            className="col-span-2 py-1.5 px-3 rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-[11px] font-semibold text-center transition-all cursor-pointer shadow-[0_0_12px_rgba(6,182,212,0.35)]"
          >
            I'm looking to buy in cash
          </button>

          <button
            onClick={() => onSendMessage("What are the carrying costs?")}
            className="py-1 px-2 rounded-full bg-[#091D3B]/60 hover:bg-cyan-950/80 text-cyan-200 border border-cyan-500/30 hover:border-cyan-400/50 text-[10.5px] font-medium text-center truncate transition-all cursor-pointer"
          >
            Carrying costs?
          </button>

          <button
            onClick={() => onSendMessage("Tell me about the finishes")}
            className="py-1 px-2 rounded-full bg-[#091D3B]/60 hover:bg-cyan-950/80 text-cyan-200 border border-cyan-500/30 hover:border-cyan-400/50 text-[10.5px] font-medium text-center truncate transition-all cursor-pointer"
          >
            Penthouse finishes
          </button>

          <button
            onClick={() => onSendMessage("Can you model ownership costs?")}
            className="py-1 px-2 rounded-full bg-[#091D3B]/60 hover:bg-cyan-950/80 text-cyan-200 border border-cyan-500/30 hover:border-cyan-400/50 text-[10.5px] font-medium text-center truncate transition-all cursor-pointer"
          >
            Model ownership
          </button>

          <button
            onClick={() => onSendMessage("I'd like to schedule a private viewing")}
            className="py-1 px-2 rounded-full bg-[#091D3B]/60 hover:bg-cyan-950/80 text-[#F3E2B8] border border-[#BFA775]/40 hover:border-[#BFA775]/70 text-[10.5px] font-medium text-center truncate transition-all cursor-pointer"
          >
            Schedule VIP viewing
          </button>
        </div>

        {/* Pinned Input Bar */}
        <div className="shrink-0 p-2.5 bg-[#050F20]/90 border-t border-white/[0.08] flex items-center gap-2">
          <button
            onClick={toggleVoiceInput}
            className={`p-1.5 rounded-full transition-colors cursor-pointer ${
              isListening
                ? 'bg-rose-500 text-white animate-pulse'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
            title="Voice Input"
          >
            {isListening ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
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
            placeholder="Ask ARGUS anything..."
            className="flex-1 bg-white/5 border border-white/10 focus:border-cyan-400 rounded-full px-3 py-1.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-400/40 transition-all"
          />

          <button
            onClick={() => {
              if (inputValue.trim()) {
                onSendMessage(inputValue);
                setInputValue('');
              }
            }}
            disabled={isLoading || !inputValue.trim()}
            className="w-7 h-7 rounded-full bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(6,182,212,0.4)] transition-all cursor-pointer"
          >
            <Send className="w-3 h-3 text-slate-950" />
          </button>
        </div>

      </div>
    </div>
  );
};
