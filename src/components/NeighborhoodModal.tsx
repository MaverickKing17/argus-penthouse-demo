import React from 'react';
import { X, MapPin, ShoppingBag, Utensils, Landmark, ArrowRight } from 'lucide-react';
import { PropertyData } from '../types';

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
  if (!isOpen) return null;

  const landmarks = [
    {
      category: 'Haute Horlogerie & Fashion',
      icon: ShoppingBag,
      items: [
        { name: 'Bloor Street Mink Mile', distance: '2 min walk (180m)', desc: 'Flagship boutiques including Hermès, Chanel, Louis Vuitton, Cartier, and Tiffany & Co.' },
        { name: 'Yorkville Village (Hazelton Lanes)', distance: '4 min walk (350m)', desc: 'Curated designer shopping, Equinox flagship, and Whole Foods luxury market.' },
      ]
    },
    {
      category: 'Michelin & Fine Dining',
      icon: Utensils,
      items: [
        { name: 'Alobar Yorkville', distance: '3 min walk (250m)', desc: 'Michelin-starred cocktail lounge and seafood culinary institution.' },
        { name: 'Sassafraz', distance: '2 min walk (150m)', desc: 'Iconic yellow Victorian landmark known for French-Canadian fine dining and celebrity clientele.' },
        { name: 'd|bar by Chef Daniel Boulud', distance: 'In-Building (Lobby Level)', desc: 'World-renowned private resident lounge and bespoke culinary catering.' },
      ]
    },
    {
      category: 'Culture & Private Clubs',
      icon: Landmark,
      items: [
        { name: 'The Hazelton Private Club & Spa', distance: '3 min walk (200m)', desc: 'Discreet member-only private screening rooms and luxury wellness suites.' },
        { name: 'Royal Ontario Museum (ROM)', distance: '6 min walk (500m)', desc: 'World-class art exhibitions and Daniel Libeskind architectural landmark.' },
        { name: 'Toronto Heliport Connection', distance: '12 min executive transit', desc: 'Direct helipad transport to Billy Bishop Toronto City Airport and Muskoka lake country.' }
      ]
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-[#081222] border border-white/15 rounded-3xl overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.8)] flex flex-col max-h-[85vh] my-auto">
        {/* Header - Fixed & Sticky */}
        <div className="shrink-0 px-6 py-4 bg-[#0a162b] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-600/30 border border-cyan-400/50 flex items-center justify-center">
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

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="relative rounded-2xl overflow-hidden border border-white/10 h-48 bg-slate-900">
            <img
              src="https://images.unsplash.com/photo-1507090960745-b32f65d3113a?q=80&w=2670&auto=format&fit=crop"
              alt="Yorkville Toronto"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#081222] via-[#081222]/40 to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <div className="text-white font-display font-bold text-lg">Yorkville / Bloor Luxury District</div>
              <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 text-xs font-mono font-semibold tabular-nums">
                Walk Score: 99/100
              </span>
            </div>
          </div>

          {/* Landmarks List with Row Hover State and Tabular Distance Numbers */}
          <div className="space-y-4">
            {landmarks.map((sec, idx) => {
              const Icon = sec.icon;
              return (
                <div key={idx} className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-2 text-[#E6CA65] font-semibold text-xs uppercase tracking-wider mb-3 font-display">
                    <Icon className="w-4 h-4" />
                    <span>{sec.category}</span>
                  </div>

                  <div className="space-y-1.5">
                    {sec.items.map((it, i) => (
                      <div
                        key={i}
                        onClick={() => {
                          onClose();
                          onOpenConciergeQuestion(`How close is Suite 5200 to ${it.name} and what are the concierge privileges?`);
                        }}
                        className="flex items-start justify-between gap-4 p-2.5 rounded-xl hover:bg-white/[0.03] transition-colors duration-150 cursor-pointer group"
                      >
                        <div>
                          <div className="text-sm font-semibold text-white group-hover:text-cyan-200 transition-colors">
                            {it.name}
                          </div>
                          <div className="text-xs text-slate-300">{it.desc}</div>
                        </div>
                        <span className="text-[11px] font-mono text-cyan-300 font-semibold shrink-0 bg-cyan-950/70 px-2.5 py-1 rounded border border-cyan-700/50 tabular-nums distance-badge">
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
            className="py-2 px-4 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-md transition-colors"
          >
            <span>Ask ARGUS About Neighborhood</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
