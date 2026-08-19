import { PropertyData, QualificationData } from '../types';

export const INITIAL_PROPERTY_DATA: PropertyData = {
  name: 'Penthouse Suite 5200',
  building: 'Four Seasons Private Residences',
  address: '50 Yorkville Avenue, Penthouse Suite 5200, Toronto, ON M4W 0A3',
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
    'Full culinary suite featuring Sub-Zero 48\" refrigeration, Wolf dual-fuel ranges, and Dornbracht platinum fixtures',
    'Temperature-controlled 450-bottle frameless glass wine gallery with sommelier tasting station',
    '1,200 sq ft wrap-around southwest sunset terrace with radiant heated porcelain pavers and natural gas fireplace',
    'Primary sanctuary wrapped in Fior di Bosco heated marble slabs, Boffi soaking tub, and dual boutique dressing suites',
    'Integrated Lutron Palladiom keypads, automated architectural shading, and Savant enterprise home automation',
    'Full white-glove privileges of the Four Seasons Hotel: 24/7 concierge, private resident dining, valet, and D\u00e9sir\u00e9e Spa'
  ]
};

export const INITIAL_QUALIFICATION: QualificationData = {
  leadStatus: 'HOT LEAD',
  leadBadge: '$5.5M CASH BUYER',
  confidenceScore: 95,
  leadQuality: 'Excellent',
  intentLevel: 'High',
  riskLevel: 'Low',
  estimatedBudget: '$5,000,000 - $6,000,000',
  purchaseStructure: 'Cash',
  liquidAllocationTimeline: '< 90 Days',
  representation: 'Unrepresented',
  propertyInterest: 'Suite 5200',
  locationPreference: 'Yorkville, Toronto',
  propertyType: 'Ultra-Luxury Penthouse',
  intentScore: 5,
  summaryPills: [
    'Verified ID',
    'Budget: $5M+',
    'Cash Acquisition',
    'Timeline: <90 Days',
    'Unrepresented',
    'High Intent'
  ],
  extractedInsights: [
    'Buyer indicated cash purchase structure',
    'Budget range confirmed within target parameters ($5M+)',
    'Target acquisition timeline within 90 days',
    'No current representation',
    'Expressed interest in private viewing'
  ],
  lastUpdated: 'Today, 6:47 PM'
};

export const SAMPLE_PROMPT_PRESETS = [
  "I'm looking to buy in cash",
  "What are the carrying costs?",
  "Tell me about the finishes",
  "Can you model ownership costs?",
  "I'd like to schedule a private viewing",
  "I am an unrepresented buyer with an $18M liquidity pool",
  "Can you compare Yorkville vs The Bridle Path carrying metrics?"
];

export const BROKERAGE_PARTNERS = [
  { name: 'Barry Cohen Homes', title: 'Top Luxury Agent in Canada · Re/Max Realtron', phone: '(416) 223-8833' },
  { name: 'Harvey Kalles Real Estate', title: 'Director of Luxury Real Estate', phone: '(416) 441-2888' },
  { name: 'The Brel Team', title: 'Principal Brokerage · Brel Luxury', phone: '(416) 274-2068' },
  { name: "Sotheby's International Realty Canada", title: 'Senior Vice President of Sales', phone: '(416) 960-9995' },
  { name: 'Chestnut Park Real Estate Limited', title: 'Christie\'s International Affiliate', phone: '(416) 925-9191' }
];
