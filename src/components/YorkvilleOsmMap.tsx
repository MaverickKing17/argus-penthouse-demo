import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { MapPin, Navigation, Compass, Layers, CheckCircle2, Sparkles, ExternalLink } from 'lucide-react';

interface YorkvilleOsmMapProps {
  onSelectLandmark?: (landmarkName: string) => void;
  selectedLandmarkName?: string;
}

export const YorkvilleOsmMap: React.FC<YorkvilleOsmMapProps> = ({
  onSelectLandmark,
  selectedLandmarkName,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [key: string]: L.Marker }>({});
  const [activeLayer, setActiveLayer] = useState<'dark' | 'standard'>('dark');
  const [showRadius, setShowRadius] = useState(true);
  const circleRef = useRef<L.Circle | null>(null);

  // Yorkville Landmark Coordinates & Metadata
  const SUITE_5200_COORDS: [number, number] = [43.6713, -79.3905]; // 50 Yorkville Ave

  const LANDMARKS = [
    {
      id: 'suite5200',
      name: 'Suite 5200 · Four Seasons Private Residences',
      category: 'Primary Residence',
      coords: [43.6713, -79.3905] as [number, number],
      color: '#BFA775',
      distance: '0m (Direct Building)',
      desc: 'Canada\'s Most Exclusive Penthouse Address',
      isPrimary: true,
    },
    {
      id: 'bloorMinkMile',
      name: 'Bloor Street Mink Mile',
      category: 'Haute Horlogerie & Fashion',
      coords: [43.6698, -79.3892] as [number, number],
      color: '#38bec9',
      distance: '2 min walk (180m)',
      desc: 'Flagship boutiques: Hermès, Chanel, Louis Vuitton, Cartier, Tiffany & Co.',
    },
    {
      id: 'alobar',
      name: 'Alobar Yorkville',
      category: 'Michelin & Fine Dining',
      coords: [43.6708, -79.3924] as [number, number],
      color: '#10b981',
      distance: '3 min walk (250m)',
      desc: 'Michelin-starred cocktail lounge and seafood culinary institution.',
    },
    {
      id: 'sassafraz',
      name: 'Sassafraz',
      category: 'Fine Dining',
      coords: [43.6703, -79.3912] as [number, number],
      color: '#10b981',
      distance: '2 min walk (150m)',
      desc: 'Iconic yellow Victorian landmark known for French-Canadian fine dining.',
    },
    {
      id: 'yorkvilleVillage',
      name: 'Yorkville Village (Hazelton Lanes)',
      category: 'Luxury Shopping & Equinox',
      coords: [43.6718, -79.3941] as [number, number],
      color: '#38bec9',
      distance: '4 min walk (350m)',
      desc: 'Equinox flagship, Whole Foods organic market, and designer boutiques.',
    },
    {
      id: 'hazeltonClub',
      name: 'The Hazelton Private Club & Spa',
      category: 'Private Members Club',
      coords: [43.6711, -79.3932] as [number, number],
      color: '#a855f7',
      distance: '3 min walk (200m)',
      desc: 'Private screening rooms and luxury wellness suites.',
    },
    {
      id: 'rom',
      name: 'Royal Ontario Museum (ROM)',
      category: 'Culture & Arts',
      coords: [43.6677, -79.3948] as [number, number],
      color: '#f59e0b',
      distance: '6 min walk (500m)',
      desc: 'World-class art exhibitions and Daniel Libeskind architecture.',
    },
  ];

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Initialize Leaflet map instance centered on 50 Yorkville Ave
    const map = L.map(mapContainerRef.current, {
      center: SUITE_5200_COORDS,
      zoom: 16,
      zoomControl: false,
      attributionControl: false,
    });

    mapInstanceRef.current = map;

    // Add zoom controls to top-right
    L.control.zoom({ position: 'topright' }).addTo(map);

    // Add CartoDB Dark Matter tile layer for luxury dark UI aesthetic
    const darkTileLayer = L.tileLayer(
      'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
      {
        maxZoom: 19,
        subdomains: 'abcd',
      }
    );

    const osmStandardLayer = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 19,
        subdomains: 'abc',
      }
    );

    if (activeLayer === 'dark') {
      darkTileLayer.addTo(map);
    } else {
      osmStandardLayer.addTo(map);
    }

    // 5-Minute Walking Radius Circle (400 meters)
    const walkCircle = L.circle(SUITE_5200_COORDS, {
      color: '#BFA775',
      fillColor: '#BFA775',
      fillOpacity: 0.08,
      weight: 1.5,
      dashArray: '4, 8',
      radius: 400,
    }).addTo(map);

    circleRef.current = walkCircle;

    // Add Markers for each Yorkville Landmark
    LANDMARKS.forEach((lm) => {
      const isPrimary = lm.isPrimary;
      
      const customIcon = L.divIcon({
        className: 'custom-osm-pin',
        html: `
          <div class="relative flex items-center justify-center cursor-pointer group">
            <div class="w-8 h-8 rounded-full flex items-center justify-center shadow-lg transition-transform transform hover:scale-125 ${
              isPrimary
                ? 'bg-[#BFA775] text-[#0A1128] border-2 border-white ring-4 ring-[#BFA775]/40 animate-pulse'
                : 'bg-[#0A1128] text-white border-2 border-cyan-400'
            }">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
            </div>
            ${
              isPrimary
                ? '<div class="absolute -top-7 whitespace-nowrap px-2 py-0.5 rounded bg-black/80 text-[#F3E2B8] border border-[#BFA775]/60 text-[10px] font-mono font-bold shadow-md">Suite 5200</div>'
                : ''
            }
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });

      const marker = L.marker(lm.coords, { icon: customIcon }).addTo(map);

      // Popup with luxury glassmorphic card styling
      const popupHtml = `
        <div style="min-width: 220px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #f1f5f9; padding: 4px;">
          <div style="font-size: 10px; font-weight: bold; text-transform: uppercase; color: #BFA775; margin-bottom: 2px;">
            ${lm.category}
          </div>
          <div style="font-size: 13px; font-weight: 700; color: #ffffff; margin-bottom: 4px;">
            ${lm.name}
          </div>
          <div style="font-size: 11px; color: #94a3b8; line-height: 1.4; margin-bottom: 8px;">
            ${lm.desc}
          </div>
          <div style="display: flex; align-items: center; justify-content: space-between; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 6px;">
            <span style="font-size: 11px; font-family: monospace; font-weight: bold; color: #38bec9;">
              📍 ${lm.distance}
            </span>
          </div>
        </div>
      `;

      marker.bindPopup(popupHtml, {
        className: 'osm-custom-popup',
      });

      marker.on('click', () => {
        if (onSelectLandmark) onSelectLandmark(lm.name);
      });

      markersRef.current[lm.name] = marker;
    });

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [activeLayer]);

  // Focus map when a specific landmark is selected
  useEffect(() => {
    if (selectedLandmarkName && markersRef.current[selectedLandmarkName] && mapInstanceRef.current) {
      const marker = markersRef.current[selectedLandmarkName];
      const latlng = marker.getLatLng();
      mapInstanceRef.current.setView(latlng, 17, { animate: true });
      marker.openPopup();
    }
  }, [selectedLandmarkName]);

  const handleFocusLandmark = (lm: typeof LANDMARKS[0]) => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView(lm.coords, 17, { animate: true });
      const marker = markersRef.current[lm.name];
      if (marker) marker.openPopup();
    }
    if (onSelectLandmark) onSelectLandmark(lm.name);
  };

  const handleResetView = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView(SUITE_5200_COORDS, 16, { animate: true });
    }
  };

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-cyan-500/35 shadow-[0_10px_30px_rgba(0,0,0,0.6)] bg-[#050C1B]">
      {/* Top Map Control Bar */}
      <div className="px-4 py-2.5 bg-[#09162e] border-b border-white/10 flex flex-wrap items-center justify-between gap-2 z-10 relative">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></div>
          <span className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-cyan-400" />
            <span>OpenStreetMap · Yorkville Luxury Radius</span>
          </span>
          <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/40">
            43.6713° N, 79.3905° W
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleResetView}
            className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-mono text-slate-300 hover:text-white border border-white/10 transition-colors cursor-pointer"
          >
            Reset Center
          </button>
          
          <a
            href="https://www.openstreetmap.org/?mlat=43.6713&mlon=-79.3905#map=17/43.6713/-79.3905"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-200 text-xs font-mono border border-cyan-400/40 transition-colors"
          >
            <span>Open in OSM</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Map Canvas Container */}
      <div className="relative w-full h-[320px] sm:h-[380px] bg-[#070e1b]">
        <div ref={mapContainerRef} className="w-full h-full z-0" />

        {/* Floating Quick-Focus Pills on Map Canvas */}
        <div className="absolute bottom-3 left-3 right-3 z-[1000] flex gap-2 overflow-x-auto no-scrollbar p-1.5 rounded-xl bg-black/75 backdrop-blur-md border border-white/15 shadow-xl">
          {LANDMARKS.map((lm) => (
            <button
              key={lm.id}
              onClick={() => handleFocusLandmark(lm)}
              className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                lm.isPrimary
                  ? 'bg-gradient-to-r from-amber-500/30 to-[#BFA775]/25 text-[#F3E2B8] border border-[#BFA775] font-bold shadow-[0_0_8px_rgba(191,167,117,0.3)]'
                  : 'bg-white/5 hover:bg-white/15 text-slate-200 border border-white/10 hover:border-cyan-400/50'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: lm.color }}></span>
              <span className="truncate max-w-[130px]">{lm.name.split('·')[0]}</span>
              <span className="font-mono text-[10px] text-cyan-300">{lm.distance.split(' ')[0]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Map Legend Footer */}
      <div className="px-4 py-2 bg-[#081224] border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#BFA775]"></span>
            <span>Suite 5200</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
            <span>Mink Mile Retail</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Michelin Dining</span>
          </span>
        </div>
        <div className="font-mono text-cyan-300">
          5-Min Walk Isochrone (400m)
        </div>
      </div>
    </div>
  );
};
