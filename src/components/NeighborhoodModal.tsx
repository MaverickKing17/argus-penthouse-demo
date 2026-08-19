import React, { useState } from 'react';
import { X, MapPin, ShoppingBag, Utensils, Landmark, ArrowRight, Sparkles, Navigation, Map as MapIcon, Image as ImageIcon } from 'lucide-react';
import { PropertyData } from '../types';
import { YorkvilleOsmMap } from './YorkvilleOsmMap';

interface NeighborhoodModalProps {
  isOpen: boolean;
  onClose: () => void;
  property: PropertyData;
  onOpenConciergeQuestion: (q: string) => void;
}

export const NeighborhoodModal: React.FC<NeighborhoodModalProps> = ({
  isOpen,
  onClose,
  property,
  onOpenConciergeQuestion,
}) => {
  const [viewMode, setViewMode] = useState<'map' | 'gallery'>('map');
  const [selectedLandmark, setSelectedLandmark] = useState<string | undefined>(undefined);

  if (!isOpen) return null;

  const landmarks = [
    {
      category: 'Haute Horlogerie & Fashion',
      icon: ShoppingBag,
      color: 'from-amber-500/20 to-yellow-600/10 border-amber-400/40 text-amber-300',
      badgeColor: 'bg-[#BFA775]/25 text-[#F3E2B8] border-[#BFA775]/60',
      items: [
        { name: 'Bloor Street Mink Mile', distance: '2 min walk (180m)', desc: 'Flagship boutiques including Hermès, Chanel, Louis Vuitton, Cartier, and Tiffany & Co.' },
        { name: 'Yorkville Village (Hazelton Lanes)', distance: '4 min walk (350m)', desc: 'Curated designer shopping, Equinox flagship, and Whole Foods luxury market.' },
      ]
    },
    {
      category: 'Michelin & Fine Dining',
      icon: Utensils,
      color: 'from-emerald-500/20 to-teal-600/10 border-emerald-400/40 text-emerald-300',
      badgeColor: 'bg-emerald-500/25 text-emerald-200 border-emerald-400/60',
      items: [
        { name: 'Alobar Yorkville', distance: '3 min walk (250m)', desc: 'Michelin-starred cocktail lounge and seafood culinary institution.' },
        { name: 'Sassafraz', distance: '2 min walk (150m)', desc: 'Iconic yellow Victorian landmark known for French-Canadian fine dining and celebrity clientele.' },
        { name: 'd|bar by Chef Daniel Boulud', distance: 'In-Building (Lobby Level)', desc: 'World-renowned private resident lounge and bespoke culinary catering.' },
      ]
    },
    {
      category: 'Culture & Private Clubs',
      icon: Landmark,
      color: 'from-cyan-500/20 to-blue-600/10 border-cyan-400/40 text-cyan-300',
      badgeColor: 'bg-cyan-500/25 text-cyan-200 border-cyan-400/60',
      items: [
        { name: 'The Hazelton Private Club & Spa', distance: '3 min walk (200m)', desc: 'Discreet member-only private screening rooms and luxury wellness suites.' },
        { name: 'Royal Ontario Museum (ROM)', distance: '6 min walk (500m)', desc: 'World-class art exhibitions and Daniel Libeskind architectural landmark.' },
        { name: 'Toronto Heliport Connection', distance: '12 min executive transit', desc: 'Direct helipad transport to Billy Bishop Toronto City Airport and Muskoka lake country.' }
      ]
    }
  ];

  const handleSelectLandmarkFromList = (name: string) => {
    setSelectedLandmark(name);
    setViewMode('map');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-[#081222] border border-white/15 rounded-3xl overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.8)] flex flex-col max-h-[85vh] my-auto">
        {/* Header - Fixed & Sticky */}
        <div className="shrink-0 px-6 py-4 bg-[#0a162b] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-600/30 border border-cyan-400/50 flex items-center justify-center shadow-[0_0_10px_rgba(6,182,212,0.3)]">
              <MapPin className="w-4 h-4 text-cyan-300" />
            </div>
            <div>
              <h3 className="text-base font-display font-bold text-white tracking-wide">
                Yorkville Toronto: The Luxury Ecosystem
              </h3>
              <p className="text-xs text-slate-400">
                50 Yorkville Avenue · Canada's Most Prestigious Real Estate Postal Code
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* View Mode Toggle: Interactive Map vs Photo Panorama */}
            <div className="flex items-center bg-white/5 border border-white/10 rounded-full p-0.5 text-xs">
              <button
                onClick={() => setViewMode('map')}
                className={`px-3 py-1 rounded-full flex items-center gap-1.5 cursor-pointer transition-all ${
                  viewMode === 'map'
                    ? 'bg-cyan-600 text-white font-bold shadow-[0_0_10px_rgba(6,182,212,0.4)]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <MapIcon className="w-3.5 h-3.5" />
                <span>OpenStreetMap</span>
              </button>
              <button
                onClick={() => setViewMode('gallery')}
                className={`px-3 py-1 rounded-full flex items-center gap-1.5 cursor-pointer transition-all ${
                  viewMode === 'gallery'
                    ? 'bg-cyan-600 text-white font-bold shadow-[0_0_10px_rgba(6,182,212,0.4)]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Panorama</span>
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

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* 1. INTERACTIVE OPENSTREETMAP VIEW OR PANORAMA VIEW */}
          {viewMode === 'map' ? (
            <YorkvilleOsmMap
              selectedLandmarkName={selectedLandmark}
              onSelectLandmark={(name) => setSelectedLandmark(name)}
            />
          ) : (
            <div className="relative rounded-2xl overflow-hidden border border-cyan-500/30 h-52 bg-slate-900 shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1507090960745-b32f65d3113a?q=80&w=2670&auto=format&fit=crop"
                alt="Yorkville Toronto"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#081222] via-[#081222]/50 to-transparent"></div>
              <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between">
                <div>
                  <div className="text-white font-display font-bold text-xl drop-shadow-md">
                    Yorkville / Bloor Luxury District
                  </div>
                  <div className="text-xs text-slate-300 font-light">
                    The epicentre of Canadian wealth, culture, and luxury dining
                  </div>
                </div>
                <span className="px-3.5 py-1.5 rounded-full bg-cyan-500/30 text-cyan-100 border border-cyan-300/60 text-xs font-mono font-bold tabular-nums shadow-[0_0_15px_rgba(6,182,212,0.4)]">
                  Walk Score: 99/100
                </span>
              </div>
            </div>
          )}

          {/* Landmarks Category Value Prop Cards with Direct Map Sync */}
          <div className="space-y-5">
            {landmarks.map((sec, idx) => {
              const Icon = sec.icon;
              return (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-gradient-to-br from-[#0c1f3d]/95 via-[#0a1832]/90 to-[#071124]/95 border border-cyan-500/35 shadow-[0_6px_25px_rgba(0,0,0,0.45),inset_0_1px_1px_rgba(255,255,255,0.15)] relative overflow-hidden"
                >
                  {/* Category Header */}
                  <div className="flex items-center justify-between mb-4 pb-2.5 border-b border-white/10">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-cyan-500/30 to-blue-500/20 border border-cyan-400/50 flex items-center justify-center">
                        <Icon className="w-4 h-4 text-cyan-300" />
                      </div>
                      <span className="text-white font-bold text-sm uppercase tracking-wider font-display">
                        {sec.category}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/30">
                      {sec.items.length} Highlights
                    </span>
                  </div>

                  {/* Individual Amenity Item Cards */}
                  <div className="space-y-2.5">
                    {sec.items.map((it, i) => (
                      <div
                        key={i}
                        onClick={() => handleSelectLandmarkFromList(it.name)}
                        className={`flex items-start justify-between gap-4 p-3.5 rounded-xl border shadow-sm transition-all hover:scale-[1.01] cursor-pointer group ${
                          selectedLandmark === it.name
                            ? 'bg-[#0e2a52] border-cyan-400 ring-1 ring-cyan-400/50 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                            : 'bg-[#091f3d]/70 hover:bg-[#0f2c54] border-cyan-500/25 hover:border-cyan-400/60'
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="text-sm font-bold text-white group-hover:text-cyan-200 transition-colors flex items-center gap-2">
                            <span>{it.name}</span>
                            <Navigation className="w-3 h-3 text-cyan-400 opacity-60 group-hover:opacity-100 transition-opacity" />
                          </div>
                          <div className="text-xs text-slate-300 leading-relaxed">{it.desc}</div>
                        </div>

                        <span className="text-xs font-mono text-cyan-100 font-bold shrink-0 bg-gradient-to-r from-cyan-500/25 to-blue-600/25 px-3 py-1.5 rounded-lg border border-cyan-400/60 shadow-[0_0_10px_rgba(6,182,212,0.3)] tabular-nums distance-badge">
                          {it.distance}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer - Fixed & Sticky */}
        <div className="shrink-0 px-6 py-3.5 bg-[#0a162b] border-t border-white/10 flex items-center justify-between">
          <div className="text-xs text-slate-400">
            Four Seasons Dedicated Residential Concierge Desk Available 24/7
          </div>
          <button
            onClick={() => {
              onClose();
              onOpenConciergeQuestion(`What are the private resident concierge privileges and neighborhood benefits for Suite 5200?`);
            }}
            className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-lg hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all hover:scale-[1.02]"
          >
            <span>Ask ARGUS About Neighborhood</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
