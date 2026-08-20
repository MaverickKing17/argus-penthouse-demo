export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  quickReplies?: string[];
  metadata?: {
    carryingCostWidget?: boolean;
    finishesWidget?: boolean;
    viewingWidget?: boolean;
    stage?: string;
  };
}

export type SignalSource = 'buyer_stated' | 'observed' | 'verified' | 'pending' | 'not_provided';

export interface SignalItem {
  value: string;
  source: SignalSource;
  sourceLabel?: string;
}

export interface BrokerNote {
  id: string;
  text: string;
  timestamp: string;
  author: string;
}

export interface IntentTimelinePoint {
  date: string;
  score: number;
  event: string;
}

export interface QualificationData {
  leadStatus: 'HOT LEAD' | 'WARM QUALIFIED' | 'QUALIFIED PROSPECT' | 'NURTURE';
  leadBadge: string;
  qualificationConfidence: number; // 95%
  leadQuality: 'Excellent' | 'High' | 'Good' | 'Evaluating';
  intentLevel: 'High' | 'Medium' | 'Exploring';
  verificationStatus: 'Identity Verification Pending' | 'Verified' | 'Unverified';
  agentVerified?: boolean;
  
  // Structured Signals with explicit data states
  budget: SignalItem;
  purchaseStructure: SignalItem;
  timeline: SignalItem;
  representation: SignalItem;
  identity: SignalItem;
  proofOfFunds: SignalItem;
  
  propertyInterest: string;
  locationPreference: string;
  propertyType: string;
  intentScore: number;
  
  // Evidence-based qualification
  qualificationEvidence: {
    budget: string;
    structure: string;
    timeline: string;
    representation: string;
    intent: string;
  };
  
  nextBestAction: 'Schedule private viewing' | 'Request private verification' | 'Broker review recommended';
  
  summaryPills: Array<{
    label: string;
    status: 'stated' | 'observed' | 'verified' | 'pending' | 'not_provided';
    source: string;
  }>;
  
  extractedInsights: string[];
  notes?: BrokerNote[];
  intentTimeline?: IntentTimelinePoint[];
  lastUpdated?: string;
}

export interface PropertyData {
  name: string;
  building: string;
  address: string;
  neighborhood: string;
  priceCad: number;
  priceUsd: number;
  sqftInterior: number;
  sqftTerrace: number;
  bedrooms: string;
  bathrooms: string;
  parking: string;
  taxesAnnualCad: number;
  monthlyMaintenanceCad: number;
  status: string;
  highlights: string[];
}

export interface MarketIntelligenceData {
  metric: string;
  value: string;
  source: string;
  date: string;
  geographicScope: string;
  propertySegment: string;
}
