import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, Plugin } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

function geminiApiPlugin(): Plugin {
  return {
    name: 'gemini-api-plugin',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith('/api/')) {
          return next();
        }

        const url = req.url.split('?')[0];

        // Enable JSON body parsing for API routes
        if (req.method === 'POST') {
          let bodyStr = '';
          req.on('data', (chunk) => {
            bodyStr += chunk;
          });

          req.on('end', async () => {
            let body: any = {};
            try {
              if (bodyStr) body = JSON.parse(bodyStr);
            } catch (e) {
              console.error('JSON parse error in api middleware', e);
            }

            if (url === '/api/chat') {
              try {
                const { messages = [], userInput = '' } = body;
                const apiKey = process.env.GEMINI_API_KEY;

                const PENTHOUSE_SPECS = {
                  property: 'Penthouse Suite 5200, Four Seasons Private Residences',
                  address: '50 Yorkville Avenue, Toronto, ON M4W 0A3',
                  listPrice: '$15,800,000 CAD',
                  interiorSqFt: '6,450 sq ft',
                  terraceSqFt: '1,200 sq ft wrap-around private terrace with heated pavers and outdoor fireplace',
                  bedrooms: '4 + Library / Executive Study',
                  bathrooms: '6 En-suite + Powder Room',
                  parking: '3 Private Valet Stalls + Dedicated EV Supercharger',
                  monthlyMaintenance: '$7,417.50 CAD ($1.15/sq ft) including 24/7 Four Seasons concierge, valet, amenities',
                  annualPropertyTax: '$88,480 CAD',
                  architecturalFinishes: 'Custom Italian Poliform millwork, bookmatched Calacatta Borghini marble, Sub-Zero & Wolf culinary suite, Dornbracht platinum fixtures, Lutron Palladiom home automation, Chevron French white oak flooring',
                };

                const isCash = /cash/i.test(userInput);
                const isCarryingCosts = /carrying|cost|fee|tax|maintenance|expense|monthly/i.test(userInput);
                const isFinishes = /finish|marble|kitchen|terrace|sqft|wood|spec/i.test(userInput);
                const isViewing = /viewing|tour|see|schedule|visit|appointment/i.test(userInput);
                const isBudget = /\$|\d+m|million|budget|fund|liquidity/i.test(userInput);
                const isUnrepresented = /unrepresented|no agent|myself|direct|broker/i.test(userInput);

                let extractedBudget = isCash ? '$5,000,000 - $6,000,000' : '$15,800,000 (Asking)';
                if (/\$?\d+[\.\d]*\s*[mM]/.test(userInput)) {
                  const match = userInput.match(/\$?\d+[\.\d]*\s*[mM]/);
                  if (match) extractedBudget = match[0].toUpperCase();
                }

                if (apiKey) {
                  const ai = new GoogleGenAI({
                    apiKey: apiKey,
                    httpOptions: {
                      headers: {
                        'User-Agent': 'aistudio-build',
                      },
                    },
                  });

                  const historyText = messages
                    .map((m: { role: string; content: string }) => `${m.role === 'user' ? 'User' : 'ARGUS'}: ${m.content}`)
                    .join('\n\n');

                  const prompt = `PROPERTY CONTEXT:
${JSON.stringify(PENTHOUSE_SPECS, null, 2)}

CONVERSATION HISTORY:
${historyText}

LATEST USER INPUT:
${userInput}

SYSTEM RULES & SAGE PERSONA:
You are ARGUS, the Intelligent Digital Twin for Luxury Real Estate, operating under ARCUS AI.
You function as a private digital concierge and qualification layer for elite Toronto brokerages (e.g. Barry Cohen, Brel team, Harvey Kalles).
Voice & Tone: The Sage Archetype. Sophisticated, analytical, precise, calm, consultative, discreet, professional.
Use financial terminology ("carrying costs", "acquisition structure", "liquid allocation", "capital deployment", "municipal tax assessment", "condo fees and reserve fund ratios").
Use architectural terminology ("bookmatched Calacatta marble", "chevron French white oak", "curated Poliform millwork", "wrap-around terrace with direct South-West lake vistas").
Strict negative constraints: DO NOT USE aggressive sales language, hype, artificial urgency ("Act now", "Once-in-a-lifetime"), exclamation marks (!), casual slang, or generic sales scripts.
Contextual Adaptation: If a buyer mentions cash acquisition, acknowledge that it eliminates mortgage financing costs and materially changes the ownership scenario, then ask for an approximate acquisition budget or timeline.
Guide qualified prospects toward scheduling a private viewing or demonstration.

REQUIRED JSON OUTPUT FORMAT:
{
  "reply": "Sage response text ending with a consultative follow-up question to extract qualification signals.",
  "qualification": {
    "leadStatus": "HOT LEAD",
    "leadBadge": "$5.5M CASH BUYER",
    "confidenceScore": 95,
    "leadQuality": "Excellent",
    "intentLevel": "High",
    "riskLevel": "Low",
    "estimatedBudget": "$5,000,000 - $6,000,000",
    "purchaseStructure": "Cash",
    "liquidAllocationTimeline": "< 90 Days",
    "representation": "Unrepresented",
    "propertyInterest": "Suite 5200",
    "locationPreference": "Yorkville, Toronto",
    "propertyType": "Ultra-Luxury Penthouse",
    "intentScore": 5,
    "summaryPills": [
      "Verified ID",
      "Budget: $5M+",
      "Cash Acquisition",
      "Timeline: <90 Days",
      "Unrepresented",
      "High Intent"
    ],
    "extractedInsights": [
      "Buyer indicated cash purchase structure",
      "Budget range confirmed within target parameters ($5M+)",
      "Target acquisition timeline within 90 days",
      "No current representation",
      "Expressed interest in private viewing"
    ]
  }
}`;

                  const response = await ai.models.generateContent({
                    model: 'gemini-3.7-flash',
                    contents: prompt,
                    config: {
                      responseMimeType: 'application/json',
                      temperature: 0.2,
                    },
                  });

                  const parsed = JSON.parse(response.text || '{}');
                  res.setHeader('Content-Type', 'application/json');
                  return res.end(JSON.stringify(parsed));
                }

                // Fallback high-fidelity Sage response if API key is not configured
                let reply = 'A cash acquisition structure eliminates third-party financing contingencies and materially alters the carrying dynamics for an asset of this caliber. To calibrate the portfolio model accurately for Suite 5200, what approximate acquisition budget and liquid capital allocation horizon are you currently working with?';
                
                if (isCarryingCosts) {
                  reply = 'For Penthouse Suite 5200 at 50 Yorkville Avenue, monthly maintenance fees are $7,417.50 CAD ($1.15 per square foot), which includes 24/7 dedicated Four Seasons concierge, valet services, building insurance, and comprehensive common element maintenance. Annual municipal property taxes are approximately $88,480 CAD ($7,373/month), creating a baseline carrying cost of $14,790 CAD monthly. Would you like me to model how this compares against other tier-one Yorkville sub-penthouses or structure an entity-level holding analysis?';
                } else if (isFinishes) {
                  reply = 'Suite 5200 is appointed with custom Poliform Italian millwork, bookmatched Calacatta Borghini marble in the primary culinary gallery, and Sub-Zero 400-series refrigeration coupled with Wolf dual-fuel cooking suites. The 1,200 sq ft terrace features radiant-heated porcelain pavers and architectural windbreaks. Would you like me to walk you through the private elevator vestibule specs or the Lutron Palladiom automation system?';
                } else if (isViewing) {
                  reply = 'Private viewings for Suite 5200 are conducted with complete discretion in partnership with our listing directorship. We offer private daylight architectural walkthroughs or twilight skyline viewings. Which timeframe best aligns with your executive calendar this week?';
                } else if (isCash) {
                  reply = 'A cash acquisition eliminates mortgage financing costs and materially changes the ownership scenario, while reducing closing execution to under 14 business days. For Suite 5200, offered at $15,800,000 CAD, what acquisition budget envelope and liquidity allocation timeframe are you currently targeting?';
                }

                const fallbackData = {
                  reply,
                  qualification: {
                    leadStatus: isCash || isBudget ? 'HOT LEAD' : 'QUALIFIED PROSPECT',
                    leadBadge: isCash ? '$5.5M CASH BUYER' : '$15.8M QUALIFIED HNWI',
                    confidenceScore: isCash ? 95 : 91,
                    leadQuality: 'Excellent',
                    intentLevel: isViewing || isCash ? 'High' : 'High',
                    riskLevel: 'Low',
                    estimatedBudget: isCash ? '$5,000,000 - $6,000,000' : '$15,800,000 (Asking)',
                    purchaseStructure: isCash ? 'Cash' : 'Liquid Capital Pool',
                    liquidAllocationTimeline: '< 90 Days',
                    representation: isUnrepresented ? 'Unrepresented' : 'Unrepresented',
                    propertyInterest: 'Suite 5200',
                    locationPreference: 'Yorkville, Toronto',
                    propertyType: 'Ultra-Luxury Penthouse',
                    intentScore: 5,
                    summaryPills: [
                      'Verified ID',
                      isCash ? 'Budget: $5M+' : 'Budget: $15M+',
                      isCash ? 'Cash Acquisition' : 'Capital Allocation',
                      'Timeline: <90 Days',
                      'Unrepresented',
                      'High Intent',
                    ],
                    extractedInsights: [
                      isCash ? 'Buyer indicated cash purchase structure' : 'Buyer evaluating prime tier-one luxury asset',
                      'Budget range confirmed within target parameters ($5M+)',
                      'Target acquisition timeline within 90 days',
                      'No current representation detected',
                      isViewing ? 'Requested private viewing coordination' : 'Expressed interest in private viewing',
                    ],
                  },
                };

                res.setHeader('Content-Type', 'application/json');
                return res.end(JSON.stringify(fallbackData));
              } catch (error: any) {
                console.error('Error in /api/chat middleware:', error);
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                return res.end(JSON.stringify({ error: error.message }));
              }
            }

            if (url === '/api/schedule-viewing') {
              res.setHeader('Content-Type', 'application/json');
              return res.end(
                JSON.stringify({
                  success: true,
                  bookingId: `ARCUS-${Math.floor(100000 + Math.random() * 900000)}`,
                  brokerage: body.brokerage || 'Barry Cohen Homes / Harvey Kalles Luxury Directorship',
                  status: 'Confirmed - Security Clearance Pending',
                  message: 'Your private executive viewing protocol has been initiated with the listing partner.',
                }),
              );
            }

            next();
          });
          return;
        }

        if (req.method === 'GET') {
          if (url === '/api/property') {
            res.setHeader('Content-Type', 'application/json');
            return res.end(
              JSON.stringify({
                name: 'Suite 5200',
                building: 'Four Seasons Private Residences',
                address: '50 Yorkville Avenue, Toronto, ON M4W 0A3',
                neighborhood: 'Yorkville',
                priceCad: 15800000,
                priceUsd: 11600000,
                sqftInterior: 6450,
                sqftTerrace: 1200,
                bedrooms: '4 + Library',
                bathrooms: '6 En-suite + 1 Powder',
                parking: '3 Private Valet Bays + EV Supercharger',
                taxesAnnualCad: 88480,
                monthlyMaintenanceCad: 7417.50,
                status: 'Exclusive Active Listing',
              }),
            );
          }
        }

        next();
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), geminiApiPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
