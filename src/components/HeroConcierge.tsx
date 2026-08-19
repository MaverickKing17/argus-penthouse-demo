import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  Send,
  Sparkles,
  MapPin,
  MoreHorizontal,
  Volume2,
  VolumeX,
  RotateCcw,
  Building,
  Key,
  Shield,
  Layers,
  ChevronRight,
  Maximize2,
  Mic,
  MicOff,
} from 'lucide-react';
import { Message, QualificationData, PropertyData } from '../types';
import { DevicePreviews } from './DevicePreviews';

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
    utterance.rate = 0.95; // Calm, measured pace for Sage archetype
    utterance.pitch = 0.92;
    window.speechSynthesis.speak(utterance);
  };

  // Play voice when new assistant message arrives
  useEffect(() => {
    const lastMsg = messages[messages.length - 1];
    if (lastMsg && lastMsg.role === 'assistant' && voiceEnabled) {
      speakMessage(lastMsg.content);
    }
  }, [messages, voiceEnabled]);

  // Voice recognition support
  const toggleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech recognition is not supported in this browser environment.');
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

  const suggestionChips = [
    "I'm looking to buy in cash",
    "What are the carrying costs?",
    "Tell me about the finishes",
    "Can you model ownership costs?",
    "I'd like to schedule a private viewing",
  ];

  return (
    <div className="relative w-full min-h-[720px] bg-[#070e1b] overflow-hidden">
      {/* Background Luxury Penthouse Panorama with CN Tower Skyline */}
      <div className="absolute inset-0 z-0">
        {/* Deep architectural twilight penthouse background */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-45 mix-blend-screen scale-105 transition-transform duration-10000"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2675&auto=format&fit=crop')`,
          }}
        ></div>

        {/* Ambient atmospheric gradients & overlays matching screenshot */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#060c18] via-[#081326]/85 to-[#060c18]/95"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#050c18] via-transparent to-[#070d18]/70"></div>

        {/* CN Tower silhouette glow effect */}
        <div className="absolute right-[28%] top-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute left-10 bottom-20 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>
      </div>

      {/* Main Container */}
      <div className="relative z-10 max-w-[1680px] mx-auto px-4 lg:px-8 py-8 lg:py-12">
        <div className="flex flex-col xl:flex-row items-start justify-between gap-8 lg:gap-10">
          
          {/* Left Column: Hero Typography & Property Showcase */}
          <div className="flex-1 flex flex-col justify-between max-w-2xl">
            <div>
              {/* Penthouse Headline */}
              <div className="space-y-2 mb-6">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl 2xl:text-6xl font-serif text-white font-normal tracking-tight leading-[1.15]">
                  Suite 5200:
                  <span className="block font-serif text-amber-200/95 italic font-light text-2xl sm:text-3xl lg:text-4xl 2xl:text-5xl mt-1">
                    The Intelligent Digital Twin for Toronto's Most Exclusive Penthouse.
                  </span>
                </h1>

                <p className="text-slate-300 text-sm sm:text-base lg:text-lg font-light leading-relaxed max-w-xl pt-2">
                  Experience how ARGUS qualifies high-net-worth buyers in real time.
                </p>
              </div>

              {/* Location Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-slate-300 text-xs sm:text-sm mb-6">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="font-medium text-slate-200">50 Yorkville Avenue, Toronto</span>
                <span className="text-slate-500">·</span>
                <span className="text-amber-300/90 font-mono">Penthouse Suite 5200</span>
              </div>

              {/* Key Property Value Metrics Pill Matrix */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8 max-w-xl">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <div className="text-[11px] font-mono text-slate-400 uppercase">Offering</div>
                  <div className="text-base sm:text-lg font-bold text-white font-mono">$15.8M CAD</div>
                  <div className="text-[10px] text-slate-400 font-mono">~$11.6M USD</div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <div className="text-[11px] font-mono text-slate-400 uppercase">Interior Area</div>
                  <div className="text-base sm:text-lg font-bold text-white font-mono">6,450 SF</div>
                  <div className="text-[10px] text-cyan-400">4 Beds · 6 Baths</div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <div className="text-[11px] font-mono text-slate-400 uppercase">Sky Terrace</div>
                  <div className="text-base sm:text-lg font-bold text-white font-mono">1,200 SF</div>
                  <div className="text-[10px] text-amber-300">Heated Pavers</div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <div className="text-[11px] font-mono text-slate-400 uppercase">Carrying Est.</div>
                  <div className="text-base sm:text-lg font-bold text-white font-mono">$14.7K/mo</div>
                  <div className="text-[10px] text-emerald-400">$1.15/sqft Maint.</div>
                </div>
              </div>
            </div>

            {/* Quick Feature Pills */}
            <div className="flex flex-wrap gap-2 text-xs text-slate-300">
              <button
                onClick={onOpenSpecs}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer"
              >
                <Layers className="w-3.5 h-3.5 text-cyan-400" />
                <span>Poliform & Sub-Zero Specs</span>
                <ChevronRight className="w-3 h-3 text-slate-400" />
              </button>

              <button
                onClick={onOpenFinancials}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer"
              >
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>Carrying Cost Simulation</span>
                <ChevronRight className="w-3 h-3 text-slate-400" />
              </button>

              <button
                onClick={onOpenSchedule}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-400/20 text-amber-300 transition-colors cursor-pointer"
              >
                <Key className="w-3.5 h-3.5 text-amber-400" />
                <span>Private Showing Protocol</span>
                <ChevronRight className="w-3 h-3 text-amber-400" />
              </button>
            </div>
          </div>

          {/* Center / Main Floating Glassmorphism ARGUS Concierge Card */}
          <div className="w-full lg:w-[460px] 2xl:w-[500px] rounded-3xl bg-[#091325]/90 border border-white/15 backdrop-blur-xl shadow-[0_25px_60px_rgba(0,0,0,0.6)] flex flex-col overflow-hidden relative transition-all">
            {/* Concierge Header */}
            <div className="px-5 py-4 bg-[#0a162b]/90 border-b border-white/10 flex items-center justify-between relative">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-500 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.4)] border border-cyan-300/40">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#0a162b] animate-pulse"></span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-white text-sm lg:text-base tracking-wide">
                      ARGUS AI Concierge
                    </h3>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
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
                  className={`p-2 rounded-lg transition-colors cursor-pointer ${
                    voiceEnabled
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </button>

                <button
                  onClick={() => setShowOptions(!showOptions)}
                  className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
                >
                  <MoreHorizontal className="w-5 h-5" />
                </button>

                {/* Options Dropdown */}
                {showOptions && (
                  <div className="absolute right-0 top-12 w-56 bg-[#081222] border border-white/15 rounded-xl shadow-2xl p-1.5 z-50 text-xs">
                    <button
                      onClick={() => {
                        onResetChat();
                        setShowOptions(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg text-slate-300 hover:bg-white/10 flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Reset Session</span>
                    </button>
                    <button
                      onClick={() => {
                        onOpenFinancials();
                        setShowOptions(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg text-slate-300 hover:bg-white/10 flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <Shield className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Launch Carrying Cost Model</span>
                    </button>
                    <button
                      onClick={() => {
                        onOpenSchedule();
                        setShowOptions(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg text-slate-300 hover:bg-white/10 flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <Key className="w-3.5 h-3.5 text-amber-400" />
                      <span>Schedule VIP Viewing</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Chat Stream Area */}
            <div className="h-[360px] overflow-y-auto px-4 py-4 space-y-3.5 scroll-smooth">
              {messages.map((msg) => {
                const isAssistant = msg.role === 'assistant';
                return (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-2.5 ${isAssistant ? '' : 'justify-end'}`}
                  >
                    {isAssistant && (
                      <div className="w-7 h-7 rounded-lg bg-cyan-600/30 border border-cyan-400/40 flex items-center justify-center shrink-0 mt-0.5">
                        <Bot className="w-4 h-4 text-cyan-300" />
                      </div>
                    )}

                    <div
                      className={`max-w-[85%] rounded-2xl p-3.5 text-xs lg:text-sm leading-relaxed ${
                        isAssistant
                          ? 'bg-[#0e1c36]/90 text-slate-100 border border-white/10 shadow-md'
                          : 'bg-cyan-600 text-white rounded-br-xs shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                      }`}
                    >
                      <div className="whitespace-pre-wrap">{msg.content}</div>

                      <div
                        className={`text-[10px] mt-1.5 font-mono ${
                          isAssistant ? 'text-slate-400' : 'text-cyan-100/80 text-right'
                        }`}
                      >
                        {msg.timestamp}
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Typing indicator */}
              {isLoading && (
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-cyan-600/30 border border-cyan-400/40 flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4 text-cyan-300" />
                  </div>
                  <div className="bg-[#0e1c36]/90 rounded-2xl p-3.5 border border-white/10 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce"></span>
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.4s]"></span>
                    <span className="text-xs text-slate-400 ml-2 font-mono">
                      ARGUS evaluating qualification parameters...
                    </span>
                  </div>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Quick Suggestion Chips */}
            <div className="px-4 py-2 border-t border-white/5 bg-black/20 flex flex-wrap gap-1.5">
              {suggestionChips.map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => onSendMessage(chip)}
                  className="px-2.5 py-1 rounded-full bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 hover:text-cyan-200 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap"
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Chat Input Bar */}
            <div className="p-3.5 bg-[#070f1e] border-t border-white/10 flex items-center gap-2">
              <button
                onClick={toggleVoiceInput}
                className={`p-2 rounded-full transition-colors cursor-pointer ${
                  isListening
                    ? 'bg-rose-500 text-white animate-pulse'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
                title="Voice Dictation"
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
                placeholder="Ask ARGUS anything..."
                className="flex-1 bg-white/5 border border-white/10 focus:border-cyan-400 rounded-full px-4 py-2 text-xs lg:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-400/40 transition-all"
              />

              <button
                onClick={() => {
                  if (inputValue.trim()) {
                    onSendMessage(inputValue);
                    setInputValue('');
                  }
                }}
                disabled={isLoading || !inputValue.trim()}
                className="w-9 h-9 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all cursor-pointer"
              >
                <Send className="w-4 h-4 text-slate-950" />
              </button>
            </div>
          </div>

          {/* Right Column: Device Previews (Desktop & Tablet sync) */}
          <div className="hidden 2xl:block">
            <DevicePreviews
              messages={messages}
              inputValue={inputValue}
              setInputValue={setInputValue}
              onSendMessage={onSendMessage}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
