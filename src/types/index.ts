export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  metadata?: {
    carryingCostWidget?: boolean;
    finishesWidget?: boolean;
    viewingWidget?: boolean;
  };
}

export interface QualificationData {
  leadStatus: 'HOT LEAD' | 'WARM QUALIFIED' | 'QUALIFIED PROSPECT' | 'NURTURE';
  leadBadge: string;
  confidenceScore: number;
  leadQuality: 'Excellent' | 'High' | 'Good' | 'Evaluating';
  intentLevel: 'High' | 'Medium' | 'Exploring';
  riskLevel: 'Low' | 'Verified' | 'Medium';
  estimatedBudget: string;
  purchaseStructure: string;
  liquidAllocationTimeline: string;
  representation: string;
  propertyInterest: string;
  locationPreference: string;
  propertyType: string;
  intentScore: number;
  summaryPills: string[];
  extractedInsights: string[];
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
