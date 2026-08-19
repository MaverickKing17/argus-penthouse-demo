# ARCUS AI · ARGUS: Intelligent Digital Twin for Luxury Real Estate

> **ARGUS** is an autonomous, conversational digital twin and high-net-worth lead qualification platform operating under **ARCUS AI**, built specifically for elite Toronto luxury brokerages (*Barry Cohen Homes, The Brel Team, Harvey Kalles Real Estate, Sotheby's International Realty Canada, Chestnut Park*).

---

## 🏛️ Executive Summary

For ultra-luxury assets such as **Penthouse Suite 5200 at the Four Seasons Private Residences (50 Yorkville Avenue, Toronto — Offered at $15,800,000 CAD)**, traditional real estate funnels and aggressive chatbots fail to resonate with Ultra-High-Net-Worth Individuals (UHNWIs) and family offices.

**ARGUS** solves this by acting as a discreet, analytical private advisor operating under **The Sage Archetype**. While providing architectural, structural, and carrying cost answers, ARGUS autonomously extracts actionable qualification signals in real time and streams telemetry to the listing broker's private dashboard.

---

## 🧠 The Sage Persona & Conversational Mechanics

### 1. Voice & Tone Principles
* **Sophisticated, Analytical & Precise**: Communicates with the restraint and expertise of a Swiss private banker or senior family office director.
* **Consultative & Discreet**: Never pushes, pesters, or rushes the prospect.
* **Data-Driven**: Backs claims with square footages, reserve fund metrics, and line-item tax calculations.

### 2. Lexicon & Terminology
* **Financial Concepts**: *Carrying costs, acquisition structure, liquid allocation, capital deployment, municipal tax assessment, reserve fund ratios, opportunity cost, debt-to-equity leverage, 1031-equivalent liquidity pools.*
* **Architectural Concepts**: *Bookmatched Calacatta Borghini marble, chevron rift-cut French white oak, custom Poliform millwork, radiant-heated porcelain pavers, dual-key elevator vestibule, Schüco triple-glazed acoustic curtain wall.*

### 3. Strict Negative Constraints
* ❌ **NO** aggressive sales language or artificial urgency (*"Act now"*, *"Limited-time opportunity"*).
* ❌ **NO** exclamation marks (`!`) or casual colloquialisms.
* ❌ **NO** generic chatbot scripts or pushy lead capture forms before value delivery.

---

## ⚡ Real-Time Intelligence Extraction Engine

As prospects interact with ARGUS, the server-side Gemini 3.7 Flash engine analyzes every utterance to extract structured qualification telemetry:

| Signal | Description | Example Values |
| :--- | :--- | :--- |
| **Purchase Structure** | Financial instrument & entity model | `Cash`, `Structured Debt`, `Corporate Trust`, `Foreign Buyer Vehicle` |
| **Estimated Budget** | Validated purchasing capacity | `$5,000,000 - $6,000,000`, `$15,800,000 (Asking)` |
| **Liquid Allocation Timeline**| Closing horizon and capital deployment speed | `< 90 Days`, `Immediate (<14 Days)`, `30-60 Days` |
| **Representation** | Agency relationship status | `Unrepresented Principal`, `Represented by External Broker` |
| **Intent Level** | Motivation and seriousness | `High`, `Ultra-High (Direct Offer Contemplated)`, `Medium` |
| **AI Confidence Score** | Probabilistic qualification certainty | `95% - 99%` |
| **Risk Level** | Verification & compliance status | `Low (Pre-Verified)`, `AML Pre-Clearance Ready` |

---

## 🏢 Asset Showcase: Penthouse Suite 5200

* **Address**: 50 Yorkville Avenue, Penthouse Suite 5200, Toronto, ON M4W 0A3
* **Building**: Four Seasons Private Residences Toronto
* **Offering Price**: **$15,800,000 CAD** (~$11,620,000 USD)
* **Interior Area**: 6,450 sq. ft. (4 Bedrooms + Executive Library, 6 En-Suite Baths + Powder)
* **Outdoor Space**: 1,200 sq. ft. wrap-around south-west terrace with radiant heated pavers and fire table
* **Parking**: 3 Dedicated Valet Stalls with Level 3 EV Superchargers
* **Monthly Maintenance**: **$7,417.50 CAD** ($1.15/sq. ft.) including 24/7 Four Seasons hotel amenities
* **Annual Property Taxes**: **$88,480 CAD** (~$7,373/month)

---

## 🛠️ Financial Modeling & Carrying Cost Suite

ARGUS incorporates a full financial simulator:
1. **Operating Costs**:
   * Maintenance Fee: `$7,417.50 CAD/month`
   * Municipal Property Taxes: `$7,373.33 CAD/month`
   * Estimated Luxury Insurance: `$950.00 CAD/month`
   * **Baseline Holding Cost (Cash)**: **`~$14,790 CAD/month`**
2. **Closing Capital & Taxes**:
   * Ontario Provincial Land Transfer Tax (LTT): `~$392,475 CAD`
   * Toronto Municipal Land Transfer Tax (MLTT): `~$392,475 CAD`
   * **Total Combined LTT**: **`$784,950 CAD`**
3. **Cash vs. Debt Comparison**:
   * Models 100% equity cash settlement (<14 day execution) vs. custom LTV (40% down) at private banking mortgage rates.

---

## 💻 Tech Stack & Architecture

* **Frontend**: React 19, TypeScript, Tailwind CSS v4, Lucide Icons, Motion.
* **AI & Intelligence**: `@google/genai` TypeScript SDK utilizing **Gemini 3.7 Flash** with structured JSON output schemas.
* **Backend**: Express + Vite API Middleware proxying `/api/chat`, `/api/property`, and `/api/schedule-viewing`.
* **Multi-Viewport Mirroring**: Real-time responsive live preview containers for Desktop, Tablet, and Mobile.
* **Discreet Voice System**: Web Speech Synthesis tuned to 0.95x cadence for calm, consultative delivery.

---

## 🧪 Testing Prompts

You can test ARGUS in the concierge input using these scenarios:

1. **Cash Acquisition Test**:
   ```
   I'm looking to buy in cash.
   ```
   *Expected behavior*: ARGUS acknowledges the elimination of mortgage overhead and expedited closing velocity, then consultatively asks for budget parameters and liquidity horizon. Updates Broker View to `HOT LEAD - $5.5M CASH BUYER` with `95% Confidence`.

2. **Carrying Costs & Reserve Fund Test**:
   ```
   What are the monthly carrying costs and reserve fund ratios?
   ```
   *Expected behavior*: ARGUS provides an exact breakdown of the $1.15/sqft maintenance ($7,418/mo), annual municipal property tax ($88,480/yr), and baseline $14.7K/mo holding profile.

3. **Finishes & Architectural Specifications**:
   ```
   Tell me about the finishes in the primary suite and kitchen.
   ```
   *Expected behavior*: ARGUS details the custom Italian Poliform millwork, bookmatched Calacatta Borghini marble, Sub-Zero refrigeration, and Wolf dual-fuel cooking suite.

4. **Private Showing Scheduling**:
   ```
   I'd like to schedule a private viewing for this Friday at sunset.
   ```
   *Expected behavior*: ARGUS initiates the discreet private showing protocol with the listing partner (Barry Cohen / Harvey Kalles).

---

## 🔒 Confidentiality & Security

* **FINTRAC & AML Pre-Clearance Ready**: Structured data captures identity and representation status for smooth compliance onboarding.
* **Zero Client-Side API Key Exposure**: All GenAI calls are processed server-side.

---

© 2026 ARCUS AI. *Intelligence. Precision. Results.*
