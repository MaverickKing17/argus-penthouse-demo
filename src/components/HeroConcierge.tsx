import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  Send,
  MapPin,
  MoreHorizontal,
  Volume2,
  VolumeX,
  RotateCcw,
  Shield,
  Key,
  Mic,
  MicOff,
} from 'lucide-react';
import { Message, PropertyData } from '../types';
import heroBgImage from '../assets/images/toronto_penthouse_twilight_1787165723733.jpg';

interface HeroConciergeProps {
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

export const HeroConcierge: React.FC<HeroConciergeProps> = ({
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
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Text-to-speech for Sage persona
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

  return (
    <div className="relative w-full min-h-[640px] lg:min-h-[700px] overflow-hidden">
      {/* 1. FULL-BLEED HIGH-RES PENTHOUSE BACKGROUND (60%+ VISIBLE & UNOBSTRUCTED) */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBgImage}
          alt="Suite 5200 Penthouse Twilight Skyline"
          className="w-full h-full object-cover object-center"
        />
        {/* Subtle luminous edge grading for text contrast without obscuring the background */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#060D1E]/70 via-transparent to-[#060D1E]/40 pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128] via-transparent to-transparent pointer-events-none"></div>
      </div>

      {/* Main Content Layout */}
      <div className="relative z-10 max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 py-10 lg:py-14">
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8 lg:gap-12">
          
          {/* 2. LEFT 55% HERO TYPOGRAPHY - DIRECTLY OVER CLEAN PENTHOUSE BACKGROUND */}
          <div className="w-full lg:w-[55%] flex flex-col justify-center pt-2 lg:pt-8">
            {/* Main Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-display text-white font-normal tracking-tight leading-[1.08] mb-3 drop-shadow-lg">
              Suite 5200:
            </h1>
            
            {/* Golden Subtitle */}
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-display text-[#F3E2B8] font-light leading-[1.25] mb-5 drop-shadow-md max-w-xl">
              The Intelligent Digital Twin for Toronto's Most Exclusive Penthouse.
            </h2>

            {/* Sub-headline */}
            <p className="text-slate-200 text-base sm:text-lg font-light leading-relaxed max-w-lg mb-8 drop-shadow-md">
              Experience how ARGUS qualifies high-net-worth buyers in real time.
            </p>

            {/* Location Pin */}
            <div className="flex items-start gap-3 text-slate-200 drop-shadow-md">
              <div className="w-8 h-8 rounded-full bg-black/40 border border-white/20 flex items-center justify-center shrink-0 mt-0.5 backdrop-blur-md">
                <MapPin className="w-4 h-4 text-[#E6CA65]" />
              </div>
              <div className="leading-tight">
                <div className="font-semibold text-sm sm:text-base text-white">
                  50 Yorkville Avenue, Toronto
                </div>
                <div className="text-xs text-slate-300 font-light mt-0.5">
                  Penthouse Suite 5200
                </div>
              </div>
            </div>
          </div>

          {/* 3. RIGHT-ANCHORED SLEEK GLASSMORPHIC ARGUS CONCIERGE WIDGET (MAX-W-400PX) */}
          <div className="w-full lg:w-[45%] flex justify-center lg:justify-end">
            <div
              className="w-full max-w-[400px] rounded-[24px] border border-white/[0.12] shadow-[0_15px_50px_rgba(0,0,0,0.5),0_0_30px_rgba(6,182,212,0.15)] flex flex-col overflow-hidden transition-all max-h-[580px]"
              style={{
                background: 'rgba(10, 17, 40, 0.70)',
                backdropFilter: 'blur(16px)',
              }}
            >
              
              {/* Concierge Header - Fixed at Top */}
              <div className="shrink-0 px-4 py-3 bg-[#061224]/80 border-b border-white/[0.08] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="relative">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center shadow-[0_0_12px_rgba(6,182,212,0.5)] border border-cyan-300/50">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#061224] animate-pulse"></span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-xs sm:text-sm tracking-wide font-display">
                      ARGUS AI Concierge
                    </h3>
                    <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-mono font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block"></span>
                      <span>Online</span>
                    </div>
                  </div>
                </div>

                {/* Header Actions */}
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
                    <MoreHorizontal className="w-4 h-4" />
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

              {/* Chat Stream Area - Scrollable with max-h-[320px] and flex-1 */}
              <div className="flex-1 overflow-y-auto max-h-[320px] min-h-[160px] px-3.5 py-3 space-y-2.5 scroll-smooth">
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

                {/* Loading indicator */}
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

              {/* 4. PINNED COMPACT PROMPT CHIP MATRIX */}
              <div className="shrink-0 p-2.5 bg-[#061224]/70 border-t border-white/[0.08] grid grid-cols-2 gap-1.5">
                {/* Full-width primary cash chip */}
                <button
                  onClick={() => onSendMessage("I'm looking to buy in cash")}
                  className="col-span-2 py-1.5 px-3 rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-[11px] font-semibold text-center transition-all cursor-pointer shadow-[0_0_12px_rgba(6,182,212,0.35)]"
                >
                  I'm looking to buy in cash
                </button>

                <button
                  onClick={() => onSendMessage("What are the carrying costs?")}
                  className="py-1.5 px-2 rounded-full bg-[#091D3B]/60 hover:bg-cyan-950/80 text-cyan-200 border border-cyan-500/30 hover:border-cyan-400/50 text-[10.5px] font-medium text-center truncate transition-all cursor-pointer"
                  title="What are the carrying costs?"
                >
                  Carrying costs?
                </button>

                <button
                  onClick={() => onSendMessage("Tell me about the finishes")}
                  className="py-1.5 px-2 rounded-full bg-[#091D3B]/60 hover:bg-cyan-950/80 text-cyan-200 border border-cyan-500/30 hover:border-cyan-400/50 text-[10.5px] font-medium text-center truncate transition-all cursor-pointer"
                  title="Tell me about the finishes"
                >
                  Penthouse finishes
                </button>

                <button
                  onClick={() => onSendMessage("Can you model ownership costs?")}
                  className="py-1.5 px-2 rounded-full bg-[#091D3B]/60 hover:bg-cyan-950/80 text-cyan-200 border border-cyan-500/30 hover:border-cyan-400/50 text-[10.5px] font-medium text-center truncate transition-all cursor-pointer"
                  title="Can you model ownership costs?"
                >
                  Model ownership
                </button>

                <button
                  onClick={() => onSendMessage("I'd like to schedule a private viewing")}
                  className="py-1.5 px-2 rounded-full bg-[#091D3B]/60 hover:bg-cyan-950/80 text-[#F3E2B8] border border-[#BFA775]/40 hover:border-[#BFA775]/70 text-[10.5px] font-medium text-center truncate transition-all cursor-pointer"
                  title="I'd like to schedule a private viewing"
                >
                  Schedule VIP viewing
                </button>
              </div>

              {/* PINNED CHAT INPUT BAR */}
              <div className="shrink-0 p-2.5 bg-[#050F20]/80 border-t border-white/[0.08] flex items-center gap-2">
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
                  className="flex-1 bg-white/5 border border-white/10 focus:border-cyan-400 rounded-full px-3.5 py-1.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-400/40 transition-all"
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

        </div>
      </div>
    </div>
  );
};
