import React, { useState } from 'react';
import { X, Eye, Compass, Sun, Moon, CheckCircle2, ArrowRight, Maximize2, Sparkles } from 'lucide-react';
import { PropertyData } from '../types';

interface OverviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  property: PropertyData;
  onOpenConciergeQuestion: (q: string) => void;
}

export const OverviewModal: React.FC<OverviewModalProps> = ({
  isOpen,
  onClose,
  property,
  onOpenConciergeQuestion,
}) => {
  const [selectedRoom, setSelectedRoom] = useState<'greatRoom' | 'masterSuite' | 'terrace' | 'wineVault' | 'foyer'>('greatRoom');
  const [lightingMode, setLightingMode] = useState<'day' | 'twilight' | 'night'>('twilight');

  if (!isOpen) return null;

  const roomDetails = {
    greatRoom: {
      name: 'Grand Salon & Great Room',
      sqft: '1,450 SF',
      ceiling: '11.5 FT Finished',
      exposure: 'South / West Panoramic Lake & CN Tower',
      description:
        'Continuous 60-foot expanse of floor-to-ceiling curtain wall framing unobstructed views of Lake Ontario, the Financial District skyline, and twilight sunsets over Yorkville.',
      features: [
        'Dual-sided gas fireplace clad in bookmatched Calacatta marble slab',
        'Custom Lutron automated solar and blackout roller architectural shades',
        '8-inch wide-plank Chevron white oak artisan hardwood with acoustic underlay',
        'Direct motorized portal to the 1,200 SF wrap-around heated terrace',
      ],
      image:
        'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2574&auto=format&fit=crop',
    },
    masterSuite: {
      name: 'Primary Sanctuary Suite',
      sqft: '1,200 SF',
      ceiling: '11.5 FT Finished',
      exposure: 'South-East Sunrise & Financial District',
      description:
        'Private wing encompassing dual Poliform dressing galleries, midnight beverage bar, private morning terrace access, and a six-piece spa sanctuary.',
      features: [
        'Freestanding Victoria + Albert soaking tub positioned against floor-to-ceiling glass',
        'Full-slab Fior di Bosco heated marble walls, vanity deck, and steam shower',
        'Integrated Dornbracht sensory sky shower with aromatherapy and chromotherapy',
        'Custom acoustic soundproofing partitions achieving STC 58 rating',
      ],
      image:
        'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=2670&auto=format&fit=crop',
    },
    terrace: {
      name: 'Private Sunset Sky Terrace',
      sqft: '1,200 SF',
      ceiling: 'Open Sky',
      exposure: '270° South-West-North Panorama',
      description:
        'One of Toronto\'s largest private residential terraces, engineered with structural porcelain pavers, integrated outdoor kitchen, and wind-deflection architectural glass panels.',
      features: [
        'Built-in Wolf 36\" outdoor gas grill and Sub-Zero outdoor refrigeration drawer',
        'Integrated overhead infrared heaters for four-season outdoor entertaining',
        'Irrigated perimeter planter boxes with architectural landscape lighting',
        'Engineered structural load capacity for private hot tub or cold plunge installations',
      ],
      image:
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2670&auto=format&fit=crop',
    },
    wineVault: {
      name: 'Sommelier Wine Vault & Tasting Bar',
      sqft: '220 SF',
      ceiling: '10 FT Finished',
      exposure: 'Interior Climate Controlled Core',
      description:
        'Triple-glazed, Argon gas-insulated sommelier gallery capable of cellar storage for 750+ bottles with bespoke tasting peninsula.',
      features: [
        'Dedicated Whisprkool dual-compressor climate and humidity control (55°F / 65% RH)',
        'Custom black walnut racking with low-heat UV LED edge lighting',
        'Enomatic wine preservation and dispensing station for four bottles',
        'Smoked bronze glass doors with biometric encrypted access lock',
      ],
      image:
        'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=2670&auto=format&fit=crop',
    },
    foyer: {
      name: 'Private Elevator Vestibule & Gallery',
      sqft: '380 SF',
      ceiling: '12 FT Finished',
      exposure: 'Private Elevator Access',
      description:
        'Exclusive high-speed private elevator opens directly into this art-collector gallery designed to showcase large-scale canvas installations.',
      features: [
        'Bespoke bronze-accented double entry portal with motorized biometric lock',
        'Museum-grade gallery rail lighting with adjustable color temperature',
        'Floating Nero Marquina marble console and discrete coat closet',
        'Direct connection to secondary service vestibule for private catering staff',
      ],
      image:
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2670&auto=format&fit=crop',
    },
  };

  const activeRoom = roomDetails[selectedRoom];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-5xl bg-[#081222] border border-white/15 rounded-3xl overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.8)] flex flex-col max-h-[85vh] my-auto">
        {/* Header - Fixed & Sticky */}
        <div className="shrink-0 px-6 py-4 bg-[#0a162b] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-600/30 border border-cyan-400/50 flex items-center justify-center shadow-[0_0_10px_rgba(6,182,212,0.3)]">
              <Eye className="w-4 h-4 text-cyan-300" />
            </div>
            <div>
              <h3 className="text-base font-display font-bold text-white tracking-wide">
                Suite 5200: 3D Digital Twin & Floorplan Navigator
              </h3>
              <p className="text-xs text-slate-400">
                50 Yorkville Avenue · Four Seasons Private Residences Toronto
              </p>
            </div>
          </div>

          {/* Lighting Mode Selector */}
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-white/5 border border-white/10 rounded-full p-0.5 text-xs">
              <button
                onClick={() => setLightingMode('day')}
                className={`px-3 py-1 rounded-full flex items-center gap-1.5 cursor-pointer transition-all ${
                  lightingMode === 'day' ? 'bg-amber-500/30 text-amber-200 border border-amber-400/60 font-bold shadow-[0_0_8px_rgba(245,158,11,0.3)]' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Sun className="w-3.5 h-3.5" />
                <span>Day</span>
              </button>
              <button
                onClick={() => setLightingMode('twilight')}
                className={`px-3 py-1 rounded-full flex items-center gap-1.5 cursor-pointer transition-all ${
                  lightingMode === 'twilight' ? 'bg-cyan-600/50 text-cyan-100 border border-cyan-400/70 font-bold shadow-[0_0_10px_rgba(6,182,212,0.4)]' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Twilight</span>
              </button>
              <button
                onClick={() => setLightingMode('night')}
                className={`px-3 py-1 rounded-full flex items-center gap-1.5 cursor-pointer transition-all ${
                  lightingMode === 'night' ? 'bg-indigo-600/50 text-indigo-100 border border-indigo-400/70 font-bold shadow-[0_0_10px_rgba(99,102,241,0.4)]' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Moon className="w-3.5 h-3.5" />
                <span>Night</span>
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Room Navigation Tabs - Fixed */}
        <div className="shrink-0 px-6 py-3 bg-[#060e1b] border-b border-white/10 flex gap-2 overflow-x-auto no-scrollbar">
          {[
            { id: 'greatRoom', label: 'Great Room & Salon' },
            { id: 'masterSuite', label: 'Primary Sanctuary' },
            { id: 'terrace', label: '1,200 SF Sky Terrace' },
            { id: 'wineVault', label: 'Sommelier Wine Vault' },
            { id: 'foyer', label: 'Elevator Foyer' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedRoom(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedRoom === tab.id
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-[0_0_15px_rgba(6,182,212,0.5)] border border-cyan-400/60'
                  : 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Modal Main Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Visualizer Image (lg:col-span-7) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="relative rounded-2xl overflow-hidden border border-cyan-500/30 h-72 lg:h-96 bg-slate-900 shadow-xl group">
                <img
                  src={activeRoom.image}
                  alt={activeRoom.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#081222] via-transparent to-transparent opacity-80"></div>
                
                {/* Lighting Overlay */}
                {lightingMode === 'twilight' && (
                  <div className="absolute inset-0 bg-indigo-950/20 mix-blend-color pointer-events-none"></div>
                )}
                {lightingMode === 'night' && (
                  <div className="absolute inset-0 bg-slate-950/50 mix-blend-multiply pointer-events-none"></div>
                )}

                {/* Badge Overlay */}
                <div className="absolute top-3 left-3 px-3.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-cyan-400/50 text-white text-xs font-mono font-bold flex items-center gap-2 shadow-[0_0_12px_rgba(6,182,212,0.3)]">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>Spatial Mode: 4K Architectural Twin</span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white bg-black/70 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-white/20">
                  <span className="font-mono text-cyan-300 font-bold">{activeRoom.ceiling}</span>
                  <span className="text-slate-200 font-medium">{activeRoom.exposure}</span>
                  <span className="font-mono font-bold text-amber-300 tabular-nums">{activeRoom.sqft}</span>
                </div>
              </div>

              {/* 3 HIGH-CONTRAST VALUE PROP METRIC CARDS (POP & STAND OUT) */}
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3.5 rounded-2xl bg-gradient-to-br from-[#0c2347] to-[#071326] border border-cyan-400/50 shadow-[0_4px_15px_rgba(6,182,212,0.25),inset_0_1px_1px_rgba(255,255,255,0.2)] hover:scale-[1.02] transition-transform">
                  <div className="text-cyan-300 text-[10.5px] uppercase font-bold tracking-wider font-mono">Living Space</div>
                  <div className="font-bold text-white font-mono text-base lg:text-lg tabular-nums mt-0.5 drop-shadow">6,450 Sq Ft</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-gradient-to-br from-[#2a220e] to-[#141005] border border-[#E6CA65]/60 shadow-[0_4px_15px_rgba(191,167,117,0.3),inset_0_1px_1px_rgba(255,255,255,0.2)] hover:scale-[1.02] transition-transform">
                  <div className="text-[#E6CA65] text-[10.5px] uppercase font-bold tracking-wider font-mono">Outdoor Living</div>
                  <div className="font-bold text-[#F3E2B8] font-mono text-base lg:text-lg tabular-nums mt-0.5 drop-shadow">1,200 Sq Ft</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-gradient-to-br from-[#0d2a4d] to-[#08182b] border border-cyan-400/50 shadow-[0_4px_15px_rgba(6,182,212,0.25),inset_0_1px_1px_rgba(255,255,255,0.2)] hover:scale-[1.02] transition-transform">
                  <div className="text-cyan-300 text-[10.5px] uppercase font-bold tracking-wider font-mono">Exposure</div>
                  <div className="font-bold text-cyan-200 text-sm lg:text-base mt-0.5 drop-shadow">South-West (Lake)</div>
                </div>
              </div>
            </div>

            {/* Room Details & Specifications (lg:col-span-5) */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
              <div>
                <div className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold mb-1">
                  Room Portfolio
                </div>
                <h4 className="text-2xl font-display font-bold text-white mb-2 drop-shadow">
                  {activeRoom.name}
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  Engineered with architectural perfection for seamless entertaining and supreme private discretion.
                </p>

                <div className="text-xs font-mono uppercase tracking-wider text-cyan-300 font-bold mb-2.5">
                  Architectural Inclusions
                </div>

                {/* Elevated Inclusion Cards */}
                <div className="space-y-2">
                  {activeRoom.features.map((feat, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 p-3 rounded-xl bg-gradient-to-r from-[#0d2242]/90 to-[#08152b]/90 border border-cyan-500/30 text-xs text-slate-100 shadow-sm"
                    >
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Inquiry Trigger */}
              <div className="pt-4 border-t border-white/10">
                <button
                  onClick={() => {
                    onClose();
                    onOpenConciergeQuestion(`Tell me more about the architectural specifications for the ${activeRoom.name} in Suite 5200.`);
                  }}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all hover:scale-[1.02]"
                >
                  <span>Ask ARGUS About {activeRoom.name}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Footer - Fixed & Sticky */}
        <div className="shrink-0 px-6 py-3 bg-[#0a162b] border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
          <span>Four Seasons Private Residences · 50 Yorkville Ave, Toronto</span>
          <span className="text-cyan-400 font-mono font-bold">Direct Private Elevator Keying</span>
        </div>
      </div>
    </div>
  );
};
