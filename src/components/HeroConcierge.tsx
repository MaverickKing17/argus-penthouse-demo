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
import { Message, QualificationData, PropertyData } from '../types';
import { DevicePreviews } from './DevicePreviews';
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

  const verticalPromptChips = [
    { text: "I'm looking to buy in cash", highlight: true },
    { text: "What are the carrying costs?", highlight: false },
    { text: "Tell me about the finishes", highlight: false },
    { text: "Can you model ownership costs?", highlight: false },
    { text: "I'd like to schedule a private viewing", highlight: false },
  ];

  return (
    <div className="relative w-full min-h-[780px] lg:min-h-[820px] bg-[#050B18] overflow-hidden">
      {/* 1. HERO FULL-BLEED BACKGROUND WITH CN TOWER SKYLINE AT DUSK */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBgImage}
          alt="Suite 5200 Penthouse Twilight Skyline"
          className="w-full h-full object-cover object-center transform scale-100"
        />
        {/* Subtle luminous vignette for text legibility without obscuring the background */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#060D1E]/75 via-[#060D1E]/30 to-[#060D1E]/60 pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#060D1E] via-transparent to-[#060D1E]/40 pointer-events-none"></div>
        {/* Ambient cerulean glow in the atmosphere */}
        <div className="absolute top-1/4 right-1/3 w-[450px] h-[450px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
      </div>

      {/* Main Content Layout */}
      <div className="relative z-10 max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 pt-8 pb-12">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
          
          {/* 2. LEFT HERO TEXT - CLEAN & UNCLUTTERED */}
          <div className="xl:col-span-4 flex flex-col justify-center pt-4 lg:pt-8">
            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-[54px] 2xl:text-[62px] font-display text-white font-normal tracking-tight leading-[1.08] mb-3 drop-shadow-md">
              Suite 5200:
            </h1>
            
            {/* Golden Subtitle */}
            <h2 className="text-2xl sm:text-3xl lg:text-[32px] 2xl:text-[36px] font-display text-[#F3E2B8] font-light leading-[1.25] mb-5 drop-shadow">
              The Intelligent Digital Twin for Toronto's Most Exclusive Penthouse.
            </h2>

            {/* Sub-headline */}
            <p className="text-slate-200 text-base sm:text-lg font-light leading-relaxed max-w-md mb-8 drop-shadow">
              Experience how ARGUS qualifies high-net-worth buyers in real time.
            </p>

            {/* Location Pin */}
            <div className="flex items-start gap-2.5 text-slate-200 drop-shadow-md">
              <div className="w-8 h-8 rounded-full bg-black/40 border border-white/20 flex items-center justify-center shrink-0 mt-0.5 backdrop-blur-md">
                <MapPin className="w-4 h-4 text-[#E6CA65]" />
              </div>
              <div className="leading-tight">
                <div className="font-medium text-sm sm:text-base text-white">
                  50 Yorkville Avenue, Toronto
                </div>
                <div className="text-xs text-slate-300 font-light mt-0.5">
                  Penthouse Suite 5200
                </div>
              </div>
            </div>
          </div>

          {/* 3. CENTER FLOATING ARGUS AI CONCIERGE CARD WITH CERULEAN GLOW & VERTICAL CHIPS */}
          <div className="xl:col-span-4 flex justify-center">
            <div className="w-full max-w-[440px] rounded-[28px] bg-[#07162E]/85 border border-cyan-400/40 backdrop-blur-2xl shadow-[0_0_45px_rgba(6,182,212,0.25)] ring-1 ring-cyan-300/30 flex flex-col overflow-hidden transition-all">
              
              {/* Card Header */}
              <div className="px-5 py-3.5 bg-[#061224]/90 border-b border-cyan-500/20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.5)] border border-cyan-300/60">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#061224] animate-pulse"></span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-sm tracking-wide">
                      ARGUS AI Concierge
                    </h3>
                    <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-mono">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block"></span>
                      <span>Online</span>
                    </div>
                  </div>
                </div>

                {/* Header Actions */}
                <div className="flex items-center gap-1.5 relative">
                  <button
                    onClick={() => setVoiceEnabled(!voiceEnabled)}
                    title={voiceEnabled ? 'Mute AI Voice' : 'Enable AI Voice'}
                    className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                      voiceEnabled
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                  </button>

                  <button
                    onClick={() => setShowOptions(!showOptions)}
                    className="p-1.5 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
                  >
                    <MoreHorizontal className="w-5 h-5" />
                  </button>

                  {/* Options Dropdown */}
                  {showOptions && (
                    <div className="absolute right-0 top-10 w-52 bg-[#061224] border border-cyan-500/30 rounded-xl shadow-2xl p-1.5 z-50 text-xs backdrop-blur-xl">
                      <button
                        onClick={() => {
                          onResetChat();
                          setShowOptions(false);
                        }}
                        className="w-full text-left px-3 py-2 rounded-lg text-slate-300 hover:bg-white/10 flex items-center gap-2 transition-colors cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Reset Dialogue</span>
                      </button>
                      <button
                        onClick={() => {
                          onOpenFinancials();
                          setShowOptions(false);
                        }}
                        className="w-full text-left px-3 py-2 rounded-lg text-slate-300 hover:bg-white/10 flex items-center gap-2 transition-colors cursor-pointer"
                      >
                        <Shield className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Carrying Cost Simulator</span>
                      </button>
                      <button
                        onClick={() => {
                          onOpenSchedule();
                          setShowOptions(false);
                        }}
                        className="w-full text-left px-3 py-2 rounded-lg text-slate-300 hover:bg-white/10 flex items-center gap-2 transition-colors cursor-pointer"
                      >
                        <Key className="w-3.5 h-3.5 text-[#E6CA65]" />
                        <span>VIP Showing Protocol</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Chat Stream Area */}
              <div className="h-[310px] overflow-y-auto px-4 py-3.5 space-y-3 scroll-smooth">
                {messages.map((msg) => {
                  const isAssistant = msg.role === 'assistant';
                  return (
                    <div
                      key={msg.id}
                      className={`flex items-start gap-2.5 ${isAssistant ? '' : 'justify-end'}`}
                    >
                      {isAssistant && (
                        <div className="w-6 h-6 rounded-lg bg-cyan-600/30 border border-cyan-400/40 flex items-center justify-center shrink-0 mt-0.5">
                          <Bot className="w-3.5 h-3.5 text-cyan-300" />
                        </div>
                      )}

                      <div
                        className={`max-w-[88%] rounded-2xl p-3 text-xs sm:text-[13px] leading-relaxed shadow-md ${
                          isAssistant
                            ? 'bg-[#0A1A36]/90 text-slate-100 border border-cyan-500/20 shadow-[0_4px_12px_rgba(0,0,0,0.3)]'
                            : 'bg-cyan-600 text-white rounded-br-xs shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                        }`}
                      >
                        <div className="whitespace-pre-wrap">{msg.content}</div>

                        <div
                          className={`text-[10px] mt-1 font-mono ${
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
                  <div className="flex items-start gap-2.5">
                    <div className="w-6 h-6 rounded-lg bg-cyan-600/30 border border-cyan-400/40 flex items-center justify-center shrink-0">
                      <Bot className="w-3.5 h-3.5 text-cyan-300" />
                    </div>
                    <div className="bg-[#0A1A36]/90 rounded-2xl p-3 border border-cyan-500/20 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce"></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.2s]"></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.4s]"></span>
                      <span className="text-[11px] text-slate-400 ml-2 font-mono">
                        ARGUS analyzing qualification telemetry...
                      </span>
                    </div>
                  </div>
                )}

                <div ref={chatEndRef} />
              </div>

              {/* VERTICAL STACKED PROMPT CHIPS WITH PILL BORDERS MATCHING TARGET MOCKUP */}
              <div className="px-4 py-3 bg-[#061224]/80 border-t border-cyan-500/20 flex flex-col gap-1.5">
                {verticalPromptChips.map((chip, idx) => (
                  <button
                    key={idx}
                    onClick={() => onSendMessage(chip.text)}
                    className={`w-full py-2 px-3.5 rounded-full text-xs font-medium transition-all text-center cursor-pointer shadow-sm ${
                      chip.highlight
                        ? 'bg-cyan-500 text-slate-950 font-semibold hover:bg-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                        : 'bg-[#091D3B]/70 hover:bg-cyan-950/80 text-cyan-200 border border-cyan-500/30 hover:border-cyan-400/60'
                    }`}
                  >
                    {chip.text}
                  </button>
                ))}
              </div>

              {/* Chat Input Bar */}
              <div className="p-3 bg-[#050F20] border-t border-cyan-500/20 flex items-center gap-2">
                <button
                  onClick={toggleVoiceInput}
                  className={`p-2 rounded-full transition-colors cursor-pointer ${
                    isListening
                      ? 'bg-rose-500 text-white animate-pulse'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
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
                  placeholder="Ask ARGUS anything..."
                  className="flex-1 bg-white/5 border border-cyan-500/30 focus:border-cyan-400 rounded-full px-4 py-2 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-400/50 transition-all"
                />

                <button
                  onClick={() => {
                    if (inputValue.trim()) {
                      onSendMessage(inputValue);
                      setInputValue('');
                    }
                  }}
                  disabled={isLoading || !inputValue.trim()}
                  className="w-9 h-9 rounded-full bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(6,182,212,0.5)] transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4 text-slate-950" />
                </button>
              </div>
            </div>
          </div>

          {/* 4. RIGHT RAIL: DEVICE PREVIEWS (MOBILE & TABLET VIEW) */}
          <div className="xl:col-span-4 flex justify-end">
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
