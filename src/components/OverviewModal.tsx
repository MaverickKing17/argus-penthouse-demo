import React, { useState } from 'react';
import { X, Eye, Compass, Maximize, Check, ArrowRight, Layers, Sun, Moon, Shield } from 'lucide-react';
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
  const [lightingMode, setLightingMode] = useState<'twilight' | 'day' | 'night'>('twilight');

  if (!isOpen) return null;

  const rooms = {
    greatRoom: {
      name: 'Great Room & Panoramic Salon',
      dimensions: '38\' 4\" × 26\' 2\" (11.7m × 8.0m)',
      ceiling: '11\' 0\" Finished Ceiling with Cove LED Lighting',
      view: '270° South-West Skyline & Lake Ontario',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2675&auto=format&fit=crop',
      features: [
        'Dual-sided gas fireplace clad in bookmatched Calacatta Borghini marble slabs',
        'Direct motorized sliding glass portals opening to the 1,200 sq ft sky terrace',
        'Chevron pattern 8\" rift-cut French white oak flooring with acoustic underlay',
        'Concealed architectural linear diffusers and invisible Sonance surround audio'
      ]
    },
    masterSuite: {
      name: 'Primary Sanctuary & Dressing Gallery',
      dimensions: '28\' 6\" × 20\' 4\" (8.7m × 6.2m)',
      ceiling: '10\' 8\" Finished Ceiling',
      view: 'South Skyline & CN Tower Vista',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2670&auto=format&fit=crop',
      features: [
        'Dual boutique Poliform dressing rooms with integrated LED display glass wardrobes',
        'En-suite wrapped in heated Fior di Bosco marble with freestanding Boffi immersion tub',
        'Automated Lutron dual-roller blackout and solar drapery system',
        'Private morning bar equipped with Sub-Zero undercounter cooling and Miele coffee system'
      ]
    },
    terrace: {
      name: 'South-West Heated Sky Terrace',
      dimensions: '68\' 0\" × 18\' 0\" (1,200 Sq Ft Total)',
      ceiling: 'Open Sky with Motorized Wind Deflection',
      view: 'Panoramic Lake Ontario & Sunset Horizons',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2670&auto=format&fit=crop',
      features: [
        'Radiant heated anti-slip porcelain pavers engineered for year-round Canadian climates',
        'Linear natural gas architectural fire table with tempered glass wind guards',
        'Integrated outdoor summer kitchen with Wolf gas grill and Sub-Zero beverage center',
        'Structural provisions for private hot tub or cold plunge hydrotherapy'
      ]
    },
    wineVault: {
      name: 'Architectural Sommelier Wine Gallery',
      dimensions: '14\' 2\" × 8\' 6\" (4.3m × 2.6m)',
      ceiling: 'Frameless Floor-to-Ceiling Thermal Glass',
      view: 'Interior Architectural Centerpiece',
      image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=2670&auto=format&fit=crop',
      features: [
        'Capacity for 450 vintage bottles with dual-zone sommelier climate stabilization (55°F / 65% RH)',
        'Custom blackened steel and walnut display cradles with UV-filtered LED illumination',
        'Integrated sommelier decanting station with marble counter and glassware storage',
        'Discrete electronic biometric lock and commercial-grade humidity redundancy'
      ]
    },
    foyer: {
      name: 'Private Elevator Vestibule',
      dimensions: '12\' 0\" × 10\' 6\" (3.6m × 3.2m)',
      ceiling: '11\' 0\" Finished Ceiling with Bronze Reveal',
      view: 'Private Arrival Corridor',
      image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2670&auto=format&fit=crop',
      features: [
        'Dual-key direct elevator arrival with customized high-security authorization protocol',
        'Bookmatched Calacatta Borghini slab marble flooring with bronze inlay thresholds',
        'Solid walnut pivot door with invisible magnetic latching and perimeter acoustic seals',
        'Integrated digital concierge monitor for valet call and direct Four Seasons staff dispatch'
      ]
    }
  };

  const activeRoom = rooms[selectedRoom];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-5xl bg-[#081222] border border-white/15 rounded-3xl overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.8)] flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="px-6 py-4 bg-[#0a162b] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-600/30 border border-cyan-400/50 flex items-center justify-center">
              <Eye className="w-4 h-4 text-cyan-300" />
            </div>
            <div>
              <h3 className="text-base font-serif font-bold text-white tracking-wide">
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
                className={`px-2.5 py-1 rounded-full flex items-center gap-1 cursor-pointer transition-colors ${
                  lightingMode === 'day' ? 'bg-amber-500/30 text-amber-200 border border-amber-400/40' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Sun className="w-3 h-3" />
                <span>Day</span>
              </button>
              <button
                onClick={() => setLightingMode('twilight')}
                className={`px-2.5 py-1 rounded-full flex items-center gap-1 cursor-pointer transition-colors ${
                  lightingMode === 'twilight' ? 'bg-cyan-600/40 text-cyan-200 border border-cyan-400/40' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Compass className="w-3 h-3" />
                <span>Twilight</span>
              </button>
              <button
                onClick={() => setLightingMode('night')}
                className={`px-2.5 py-1 rounded-full flex items-center gap-1 cursor-pointer transition-colors ${
                  lightingMode === 'night' ? 'bg-indigo-600/40 text-indigo-200 border border-indigo-400/40' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Moon className="w-3 h-3" />
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

        {/* Room Navigation Tabs */}
        <div className="px-6 py-2.5 bg-[#060e1b] border-b border-white/5 flex gap-2 overflow-x-auto no-scrollbar">
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
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                selectedRoom === tab.id
                  ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-400/40 shadow-[0_0_10px_rgba(6,182,212,0.2)]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Visual Digital Twin Stage (lg:col-span-7) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="relative rounded-2xl overflow-hidden border border-white/15 h-[320px] lg:h-[380px] bg-slate-900 shadow-xl group">
              <img
                src={activeRoom.image}
                alt={activeRoom.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Atmospheric lighting overlay */}
              <div
                className={`absolute inset-0 transition-opacity duration-500 ${
                  lightingMode === 'twilight'
                    ? 'bg-gradient-to-t from-[#060d1b] via-[#09152b]/40 to-transparent'
                    : lightingMode === 'night'
                    ? 'bg-gradient-to-t from-[#040812] via-[#050c18]/70 to-blue-950/20'
                    : 'bg-gradient-to-t from-[#081324]/80 via-transparent to-amber-100/10'
                }`}
              ></div>

              {/* Vantage Badge */}
              <div className="absolute top-3 left-3 bg-[#081324]/85 backdrop-blur-md border border-white/15 rounded-full px-3 py-1 text-xs text-white flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-cyan-400" />
                <span>{activeRoom.view}</span>
              </div>

              {/* Dimensions Badge */}
              <div className="absolute bottom-3 left-3 bg-[#081324]/90 backdrop-blur-md border border-white/15 rounded-lg px-3 py-1.5 text-xs text-slate-200">
                <div className="font-mono text-[11px] text-cyan-300 font-semibold">{activeRoom.dimensions}</div>
                <div className="text-[10px] text-slate-400">{activeRoom.ceiling}</div>
              </div>
            </div>

            {/* Quick stats row */}
            <div className="grid grid-cols-3 gap-3 text-xs">
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                <div className="text-slate-400 text-[10px]">Total Interior</div>
                <div className="font-bold text-white font-mono">6,450 Sq Ft</div>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                <div className="text-slate-400 text-[10px]">Outdoor Living</div>
                <div className="font-bold text-amber-300 font-mono">1,200 Sq Ft</div>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                <div className="text-slate-400 text-[10px]">Exposure</div>
                <div className="font-bold text-cyan-300">South-West (Lake)</div>
              </div>
            </div>
          </div>

          {/* Room Details & Specifications (lg:col-span-5) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-amber-400 mb-1">
                Room Portfolio
              </div>
              <h4 className="text-xl font-serif font-bold text-white mb-2">
                {activeRoom.name}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Engineered with architectural perfection for seamless entertaining and supreme private discretion.
              </p>

              <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                Architectural Inclusions
              </div>

              <div className="space-y-2.5">
                {activeRoom.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-200">
                    <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action button to inquire with ARGUS */}
            <div className="pt-4 border-t border-white/10">
              <button
                onClick={() => {
                  onClose();
                  onOpenConciergeQuestion(`Tell me in detail about the ${activeRoom.name} specifications and finish materials.`);
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
              >
                <span>Ask ARGUS to Model This Room</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
