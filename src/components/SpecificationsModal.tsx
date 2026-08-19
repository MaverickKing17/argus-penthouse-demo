import React, { useState } from 'react';
import { X, Layers, Sparkles, Droplets, Cpu, Volume2, ArrowRight, CheckCircle2, Shield } from 'lucide-react';
import { PropertyData } from '../types';

interface SpecificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  property: PropertyData;
  onOpenConciergeQuestion: (q: string) => void;
}

export const SpecificationsModal: React.FC<SpecificationsModalProps> = ({
  isOpen,
  onClose,
  property,
  onOpenConciergeQuestion,
}) => {
  const [activeCategory, setActiveCategory] = useState<'millwork' | 'appliances' | 'materials' | 'automation' | 'acoustics'>('millwork');

  if (!isOpen) return null;

  const specCategories = [
    { id: 'millwork', label: 'Poliform Millwork & Joinery', icon: Layers },
    { id: 'appliances', label: 'Culinary Suite (Sub-Zero/Wolf)', icon: Sparkles },
    { id: 'materials', label: 'Calacatta & Natural Stone', icon: Droplets },
    { id: 'automation', label: 'Lutron & Savant Smart Home', icon: Cpu },
    { id: 'acoustics', label: 'Acoustics & Curtain Wall', icon: Volume2 },
  ];

  const specDetails = {
    millwork: {
      title: 'Poliform Bespoke Italian Cabinetry & Architectural Joinery',
      subtitle: 'Engineered in Brianza, Italy with hand-applied satin polyurethane finishes',
      badge: 'Master Italian Joinery',
      items: [
        { label: 'Culinary Cabinetry', val: 'Poliform Varenna Shape Matrix in Matte Fume Glass and Fluted Black Walnut' },
        { label: 'Wardrobe Systems', val: 'Poliform Senzafine wardrobe galleries with integrated LED vertical profiles and smoky glass doors' },
        { label: 'Interior Doors', val: 'Custom 9-foot solid core walnut pivot portals with invisible magnetic Tectus hinges' },
        { label: 'Hardware', val: 'Bespoke hand-cast bronze hardware by Turnstyle Designs London' },
        { label: 'Integrated Reveals', val: '1/2\" architectural drywall reveals with bronze anodized baseboards throughout' },
      ],
    },
    appliances: {
      title: 'Commercial-Grade Culinary Suite',
      subtitle: 'Dual-fuel precision cooking by Sub-Zero, Wolf, and Gaggenau',
      badge: 'Michelin Precision',
      items: [
        { label: 'Refrigeration', val: 'Sub-Zero 48\" Designer series column refrigerator & freezer with internal ice dispenser' },
        { label: 'Cooking Suite', val: 'Wolf 48\" Dual Fuel Range with 6 dual-stacked sealed burners and infrared griddle' },
        { label: 'Ventilation', val: 'Custom 1,200 CFM commercial inline blower concealed within fluted marble hood' },
        { label: 'Dishwashing', val: 'Dual Miele Diamond Series dishwashers with AutoDos automated detergent dispensing' },
        { label: 'Wine Preservation', val: 'Sub-Zero full-height dual zone 146-bottle sommelier cabinet with cherrywood racks' },
      ],
    },
    materials: {
      title: 'Slab Stone & Premium Architectural Materials',
      subtitle: 'Bookmatched slabs sourced directly from Carrara and Tuscany',
      badge: 'Natural Tuscan Slabs',
      items: [
        { label: 'Kitchen Island & Counters', val: 'Continuous 14-foot monolithic slab of Calacatta Borghini marble with mitered waterfall edges' },
        { label: 'Primary Bathroom', val: 'Full-slab Fior di Bosco heated marble walls, vanity deck, and zero-threshold steam shower' },
        { label: 'Flooring', val: '8\" Chevron engineered French white oak with wire-brushed matte UV oil finish' },
        { label: 'Outdoor Pavers', val: '24\" × 48\" high-load structural porcelain pavers on pedestal leveling systems' },
        { label: 'Fireplace Surround', val: 'Dual-sided bookmatched Nero Marquina and Calacatta slab feature wall' },
      ],
    },
    automation: {
      title: 'Lutron Palladiom & Savant Whole-Home Automation',
      subtitle: 'Centralized micro-control for lighting, climate, shades, and high-fidelity audio',
      badge: 'Intelligent Automation',
      items: [
        { label: 'Lighting Controls', val: 'Lutron Palladiom keypads in custom Satin Nickel with backlit engraved buttons' },
        { label: 'Motorized Shading', val: 'Lutron Palladiom dual-roller automated shades (99% blackout in bedrooms, 3% solar in living)' },
        { label: 'HVAC Control', val: 'Multi-zone VRF climate control with discreet architectural flush linear slot diffusers' },
        { label: 'Audio / Video', val: 'Invisible architectural speakers by Sonance embedded behind plaster in all principal rooms' },
        { label: 'Security & Access', val: 'Biometric fingerprint reader and encrypted keycard access for private elevator vestibule' },
      ],
    },
    acoustics: {
      title: 'Acoustic Engineering & Triple-Pane Fenestration',
      subtitle: 'Engineered STC rating of 54 for total library-level tranquility 52 floors above Yorkville',
      badge: 'STC 54 Acoustic Mat',
      items: [
        { label: 'Curtain Wall', val: 'Schüco structural aluminum curtain wall with triple-glazed low-iron acoustic laminate glass' },
        { label: 'Solar & Thermal', val: 'Argon-gas filled cavities with multi-layer Low-E coatings minimizing solar gain and UV fading' },
        { label: 'Floor Acoustic Mat', val: 'Regupol sonus sound isolation underlayment achieving IIC rating exceeding 68' },
        { label: 'Plumbing Isolation', val: 'Cast iron waste stacks with double-wrapped acoustic lagging for zero fluid transmission' },
        { label: 'Wind Resistance', val: 'Engineered to withstand 140 km/h wind shear with automated terrace deflection screens' },
      ],
    },
  };

  const current = specDetails[activeCategory];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-[#081222] border border-white/15 rounded-3xl overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.8)] flex flex-col max-h-[85vh] my-auto">
        {/* Header - Fixed & Sticky */}
        <div className="shrink-0 px-6 py-4 bg-[#0a162b] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-400/40 flex items-center justify-center shadow-[0_0_10px_rgba(191,167,117,0.3)]">
              <Layers className="w-4 h-4 text-amber-300" />
            </div>
            <div>
              <h3 className="text-base font-display font-bold text-white tracking-wide">
                Suite 5200: Architectural Specifications Matrix
              </h3>
              <p className="text-xs text-slate-400">
                Institutional-grade finishes, Italian bespoke millwork, and smart infrastructure
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

        {/* Categories Bar - Fixed with 2px Luxe Gold Bottom Accent Bar */}
        <div className="shrink-0 px-6 py-3 bg-[#060e1b] border-b border-white/10 flex gap-2 overflow-x-auto no-scrollbar">
          {specCategories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer relative ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-500/25 to-[#BFA775]/20 text-[#F3E2B8] border border-[#BFA775] border-b-2 border-b-[#BFA775] shadow-[0_0_15px_rgba(191,167,117,0.35)]'
                    : 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Main Body - VALUE PROP CARDS POP WITH LUMINOUS GRADIENTS & HIGHLIGHTS */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-lg sm:text-xl font-display font-bold text-white tracking-wide">{current.title}</h4>
              <span className="px-3 py-1 rounded-full bg-amber-500/20 text-[#F3E2B8] border border-[#BFA775]/60 text-xs font-mono font-bold shadow-[0_0_10px_rgba(191,167,117,0.25)]">
                {current.badge}
              </span>
            </div>
            <p className="text-xs text-[#E6CA65] font-mono mb-5">{current.subtitle}</p>

            {/* VALUE PROP SPECIFICATION CARDS WITH HIGH VISUAL CONTRAST & DEPTH */}
            <div className="grid grid-cols-1 gap-3.5">
              {current.items.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#0d2242]/95 via-[#0a1a33]/90 to-[#071326]/95 border border-cyan-500/35 hover:border-cyan-400/70 shadow-[0_6px_25px_rgba(0,0,0,0.45),inset_0_1px_1px_rgba(255,255,255,0.18)] hover:scale-[1.01] transition-all relative overflow-hidden group"
                >
                  {/* Subtle left accent bar */}
                  <div className="absolute top-0 bottom-0 left-0 w-1 bg-gradient-to-b from-cyan-400 via-teal-400 to-transparent"></div>

                  <div className="flex items-center justify-between mb-1.5 pl-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-cyan-500/20 text-cyan-200 border border-cyan-400/50 text-[11px] font-mono font-bold uppercase tracking-wider shadow-[0_0_8px_rgba(6,182,212,0.3)]">
                      {item.label}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 group-hover:text-cyan-300 transition-colors">
                      Spec #{idx + 1}
                    </span>
                  </div>

                  <div className="text-sm lg:text-[15px] text-white font-medium pl-2 leading-relaxed drop-shadow-sm">
                    {item.val}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer - Fixed & Sticky */}
        <div className="shrink-0 px-6 py-3.5 bg-[#0a162b] border-t border-white/10 flex items-center justify-between">
          <div className="text-xs text-slate-400 flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-cyan-400" />
            <span>Certified Four Seasons Architectural Compliance · 2026 Updated Specs</span>
          </div>
          <button
            onClick={() => {
              onClose();
              onOpenConciergeQuestion(`Can you provide more technical details on the ${current.title}?`);
            }}
            className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-lg hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all hover:scale-[1.02]"
          >
            <span>Ask ARGUS About Materials</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
