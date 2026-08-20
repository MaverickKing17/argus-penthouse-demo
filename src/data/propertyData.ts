import { PropertyData, QualificationData, MarketIntelligenceData } from '../types';

export const INITIAL_PROPERTY_DATA: PropertyData = {
  name: 'Penthouse Suite 5200',
  building: 'Four Seasons Private Residences',
  address: '50 Yorkville Avenue, Toronto, Ontario M4W 0A3',
  neighborhood: 'Yorkville / Bloor-Yorkville Luxury Enclave',
  priceCad: 15800000,
  priceUsd: 11620000,
  sqftInterior: 6450,
  sqftTerrace: 1200,
  bedrooms: '4 Bedrooms + Private Executive Library',
  bathrooms: '6 Full En-Suite Bathrooms + Powder Room',
  parking: '3 Dedicated Valet Bays with High-Speed Level 3 EV Superchargers',
  taxesAnnualCad: 88480,
  monthlyMaintenanceCad: 7417.50, // $1.15 / sq ft
  status: 'Exclusive Private Offering',
  highlights: [
    'Private dual-key elevator opening directly into a bookmatched Calacatta Borghini vestibule',
    'Unobstructed 270-degree panoramic skyline views overlooking the CN Tower, Financial District, and Lake Ontario',
    'Custom Italian Poliform cabinetry, automated motorized soft-touch joinery, and bronze architectural reveals',
    'Full culinary suite featuring Sub-Zero 48" refrigeration, Wolf dual-fuel ranges, and Dornbracht platinum fixtures',
    'Temperature-controlled 450-bottle frameless glass wine gallery with sommelier tasting station',
    '1,200 sq ft wrap-around southwest sunset terrace with radiant heated porcelain pavers and natural gas fireplace',
    'Primary sanctuary wrapped in Fior di Bosco heated marble slabs, Boffi soaking tub, and dual boutique dressing suites',
    'Integrated Lutron Palladiom keypads, automated architectural shading, and Savant enterprise home automation',
    'Full white-glove privileges of the Four Seasons Hotel: 24/7 concierge, private resident dining, valet, and Désirée Spa'
  ]
};

export const INITIAL_QUALIFICATION: QualificationData = {
  leadStatus: 'HOT LEAD',
  leadBadge: '$5.5M CASH BUYER',
  qualificationConfidence: 95,
  leadQuality: 'Excellent',
  intentLevel: 'High',
  verificationStatus: 'Identity Verification Pending',
  
  // Structured Signals with explicit data states (Stated vs Verified)
  budget: {
    value: '$5,000,000 – $6,000,000',
    source: 'buyer_stated',
    sourceLabel: 'Buyer stated'
  },
  purchaseStructure: {
    value: 'Cash',
    source: 'buyer_stated',
    sourceLabel: 'Buyer stated'
  },
  timeline: {
    value: '<90 Days',
    source: 'buyer_stated',
    sourceLabel: 'Buyer stated'
  },
  representation: {
    value: 'Unrepresented',
    source: 'buyer_stated',
    sourceLabel: 'Buyer stated'
  },
  identity: {
    value: 'Verification Pending',
    source: 'pending',
    sourceLabel: 'Not verified'
  },
  proofOfFunds: {
    value: 'Not provided',
    source: 'not_provided',
    sourceLabel: 'Brokerage direct'
  },
  
  propertyInterest: 'Suite 5200',
  locationPreference: 'Yorkville, Toronto',
  propertyType: 'Ultra-Luxury Penthouse',
  intentScore: 5,
  
  // Deterministic evidence extracted from dialogue
  qualificationEvidence: {
    budget: 'Buyer stated $5M+ range ($5M–$6M target)',
    structure: 'Buyer indicated cash acquisition (no financing contingency)',
    timeline: 'Buyer indicated acquisition within 90 days',
    representation: 'Buyer indicated no current real estate representation',
    intent: 'Buyer requested private viewing arrangement'
  },
  
  nextBestAction: 'Schedule private viewing',
  
  summaryPills: [
    { label: 'Identity: Verification Pending', status: 'pending', source: 'Verification Pending' },
    { label: 'Budget: $5M+', status: 'stated', source: 'Buyer stated' },
    { label: 'Purchase Structure: Cash', status: 'stated', source: 'Buyer stated' },
    { label: 'Timeline: <90 Days', status: 'stated', source: 'Buyer stated' },
    { label: 'Representation: Unrepresented', status: 'stated', source: 'Buyer stated' },
    { label: 'Intent: High', status: 'observed', source: 'Viewing requested' }
  ],
  
  extractedInsights: [
    'Budget stated ($5M–$6M range)',
    'Cash structure stated (no mortgage contingency)',
    'Acquisition timeline within 90 days established',
    'Buyer unrepresented by external brokerage',
    'Private viewing request intent registered'
  ],
  agentVerified: false,
  notes: [
    {
      id: 'note-1',
      text: 'Principal indicated all-cash liquid availability without lending contingency. Requested after-hours walkthrough with senior listing team.',
      timestamp: 'Today, 6:44 PM',
      author: 'Senior Advisory Director'
    },
    {
      id: 'note-2',
      text: 'Reviewed Poliform kitchen finishes & Lutron home automation specs. Requested full property disclosure package.',
      timestamp: 'Today, 6:38 PM',
      author: 'Managing Partner'
    }
  ],
  intentTimeline: [
    { date: 'Aug 14', score: 38, event: 'First Property Overview & Floorplan Discovery' },
    { date: 'Aug 16', score: 56, event: 'Explored 3D Digital Twin & Poliform Specification' },
    { date: 'Aug 18', score: 74, event: 'Analyzed Carrying Cost Model & Tax Structures' },
    { date: 'Aug 19', score: 86, event: 'Accessed RECO / FINTRAC Compliance Schedules' },
    { date: 'Aug 20 (Today)', score: 96, event: 'Stated All-Cash Offer & Scheduled VIP Showing' }
  ],
  lastUpdated: 'Today, 6:47 PM'
};

export const INITIAL_CONCIERGE_WELCOME = 
  'Welcome to Suite 5200. I am ARGUS, your private digital concierge. I can provide property intelligence, ownership analysis, or arrange a private introduction to the advisory team.';

export const CONCIERGE_INITIAL_PROMPTS = [
  'What are the carrying costs?',
  'Tell me about the finishes.',
  'How does the ownership cost compare?',
  'I am considering an all-cash acquisition.',
  'I would like to arrange a private viewing.'
];

export const YORKVILLE_MARKET_INTELLIGENCE: MarketIntelligenceData[] = [
  {
    metric: 'Average Transacted Price / Sq Ft',
    value: '$2,450 CAD / sq ft',
    source: 'TRREB MLS®',
    date: 'August 2026',
    geographicScope: 'Bloor-Yorkville Luxury Corridor (C02/C09)',
    propertySegment: 'Ultra-Luxury Sub-Penthouses & Penthouses ($10M+)'
  },
  {
    metric: 'Inventory Absorption Velocity',
    value: '42 Days on Market',
    source: 'TRREB MLS®',
    date: 'Q2/Q3 2026',
    geographicScope: 'Yorkville Ultra-Prime Tier',
    propertySegment: 'Condominium Residences > 4,000 sq ft'
  },
  {
    metric: 'Yorkville Luxury Inventory Supply',
    value: '1.8 Months Supply (+6.4% YoY)',
    source: 'TRREB MLS® / Urbanation Luxury Index',
    date: 'July 2026',
    geographicScope: 'Four Seasons, Hazelton & 133 Hazelton Cluster',
    propertySegment: 'Private Residences Tier-1'
  }
];

export const BROKERAGE_PARTNERS = [
  { name: 'Barry Cohen Homes', title: 'Top Luxury Agent in Canada · Re/Max Realtron', phone: '(416) 223-8833' },
  { name: 'Harvey Kalles Real Estate', title: 'Director of Luxury Real Estate', phone: '(416) 441-2888' },
  { name: 'The Brel Team', title: 'Principal Brokerage · Brel Luxury', phone: '(416) 274-2068' },
  { name: "Sotheby's International Realty Canada", title: 'Senior Vice President of Sales', phone: '(416) 960-9995' },
  { name: 'Chestnut Park Real Estate Limited', title: "Christie's International Affiliate", phone: '(416) 925-9191' }
];
