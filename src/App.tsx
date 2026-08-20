import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { BrokerQualificationView } from './components/BrokerQualificationView';
import { FloatingConcierge } from './components/FloatingConcierge';
import { Footer } from './components/Footer';
import { OverviewModal } from './components/OverviewModal';
import { SpecificationsModal } from './components/SpecificationsModal';
import { NeighborhoodModal } from './components/NeighborhoodModal';
import { FinancialsModal } from './components/FinancialsModal';
import { MarketInsightsModal } from './components/MarketInsightsModal';
import { PortfolioStrategyModal } from './components/PortfolioStrategyModal';
import { LeadProfileModal } from './components/LeadProfileModal';
import { ContactLeadModal } from './components/ContactLeadModal';
import { ScheduleCallModal } from './components/ScheduleCallModal';
import { PrivateDemoModal } from './components/PrivateDemoModal';
import { Message, QualificationData } from './types';
import { INITIAL_PROPERTY_DATA, INITIAL_QUALIFICATION } from './data/propertyData';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('concierge');
  const [property] = useState(INITIAL_PROPERTY_DATA);
  const [qualification, setQualification] = useState<QualificationData>(INITIAL_QUALIFICATION);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Initial welcome message from ARGUS (Demo onboarding moment)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'argus-welcome',
      role: 'assistant',
      content:
        'Welcome to the ARGUS AI Concierge DEMO. I am your secure, institutional-grade digital infrastructure. For this simulation, I am acting as the concierge for Suite 5200. I can show you how we model financial carry, analyze HNW portfolio architecture, and qualify high-intent buyers in real time while protecting vendor privacy. Ask me about the property to begin.',
      timestamp: '6:42 PM',
    },
  ]);

  // Modal open states
  const [isOverviewOpen, setIsOverviewOpen] = useState(false);
  const [isSpecsOpen, setIsSpecsOpen] = useState(false);
  const [isNeighborhoodOpen, setIsNeighborhoodOpen] = useState(false);
  const [isFinancialsOpen, setIsFinancialsOpen] = useState(false);
  const [isMarketOpen, setIsMarketOpen] = useState(false);
  const [isPortfolioOpen, setIsPortfolioOpen] = useState(false);
  const [isLeadProfileOpen, setIsLeadProfileOpen] = useState(false);
  const [isContactLeadOpen, setIsContactLeadOpen] = useState(false);
  const [isScheduleCallOpen, setIsScheduleCallOpen] = useState(false);
  const [isPrivateDemoOpen, setIsPrivateDemoOpen] = useState(false);

  // Listen to Botpress Webchat events if present
  useEffect(() => {
    const handleBotpressMessage = (event: MessageEvent) => {
      try {
        if (event.data && typeof event.data === 'object') {
          if (event.data.type === 'botpress-webchat:message' || event.data.action === 'send') {
            const text = event.data.payload?.text || event.data.text || '';
            if (/cash/i.test(text)) {
              setQualification((prev) => ({
                ...prev,
                leadStatus: 'HOT LEAD',
                leadBadge: '$5.5M CASH BUYER',
                qualificationConfidence: 95,
                budget: {
                  value: '$5,000,000 – $6,000,000',
                  source: 'buyer_stated',
                  sourceLabel: 'Buyer stated',
                },
                purchaseStructure: {
                  value: 'Cash',
                  source: 'buyer_stated',
                  sourceLabel: 'Buyer stated',
                },
                lastUpdated: `Today, ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
              }));
            }
          }
        }
      } catch (e) {
        // ignore non-json messages
      }
    };

    window.addEventListener('message', handleBotpressMessage);
    return () => window.removeEventListener('message', handleBotpressMessage);
  }, []);

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    if (tabId === 'overview') setIsOverviewOpen(true);
    if (tabId === 'specifications') setIsSpecsOpen(true);
    if (tabId === 'neighborhood') setIsNeighborhoodOpen(true);
    if (tabId === 'financials') setIsFinancialsOpen(true);
    if (tabId === 'market') setIsMarketOpen(true);
    if (tabId === 'portfolio') setIsPortfolioOpen(true);
  };

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const currentFormattedTime = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: textToSend.trim(),
      timestamp: currentFormattedTime,
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInputValue('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages,
          userInput: userMsg.content,
        }),
      });

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      const data = await res.json();

      const assistantMsg: Message = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content:
          data.reply ||
          'For Suite 5200, carrying costs reflect a pristine institutional reserve fund ratio. The monthly maintenance fee is $7,417.50 CAD, covering 24/7 Four Seasons concierge, valet, and common amenities. What acquisition timeline are you contemplating?',
        quickReplies: data.quickReplies,
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };

      setMessages((prev) => [...prev, assistantMsg]);

      // Update lead qualification telemetry if returned
      if (data.qualification) {
        setQualification({
          ...data.qualification,
          lastUpdated: `Today, ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
        });
      }
    } catch (err) {
      console.error('Error contacting ARGUS intelligence layer:', err);
      const isCash = /cash/i.test(userMsg.content);
      const fallbackReply = isCash
        ? 'A cash acquisition eliminates mortgage financing overhead and accelerates the conveyancing timeline to under 14 business days. For Suite 5200 (offered at $15,800,000 CAD), what liquid capital allocation range and closing horizon are you currently targeting?'
        : 'Suite 5200 represents the apex of Yorkville private residences, offering 6,450 sq ft of bespoke Poliform finishes and a 1,200 sq ft wrap-around sunset terrace. To model the asset against your portfolio parameters, what acquisition structure or holding entity are you evaluating?';

      const fallbackAssistantMsg: Message = {
        id: `assistant-fallback-${Date.now()}`,
        role: 'assistant',
        content: fallbackReply,
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };

      setMessages((prev) => [...prev, fallbackAssistantMsg]);

      if (isCash) {
        setQualification((prev) => ({
          ...prev,
          leadStatus: 'HOT LEAD',
          leadBadge: '$5.5M CASH BUYER',
          qualificationConfidence: 95,
          budget: {
            value: '$5,000,000 – $6,000,000',
            source: 'buyer_stated',
            sourceLabel: 'Buyer stated',
          },
          purchaseStructure: {
            value: 'Cash',
            source: 'buyer_stated',
            sourceLabel: 'Buyer stated',
          },
          lastUpdated: `Today, ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
        }));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 'argus-welcome',
        role: 'assistant',
        content:
          'Welcome to the ARGUS AI Concierge DEMO. I am your secure, institutional-grade digital infrastructure. For this simulation, I am acting as the concierge for Suite 5200. I can show you how we model financial carry, analyze HNW portfolio architecture, and qualify high-intent buyers in real time while protecting vendor privacy. Ask me about the property to begin.',
        timestamp: '6:42 PM',
      },
    ]);
  };

  const handleOpenConciergeQuestion = (q: string) => {
    setActiveTab('concierge');
    handleSendMessage(q);
  };

  return (
    <div className="min-h-screen bg-[#070e1b] text-slate-100 flex flex-col font-sans selection:bg-[#00C4CC]/30 selection:text-[#00C4CC]">
      {/* Top Header with User Profile and Request Demo */}
      <Header
        activeTab={activeTab}
        setActiveTab={handleNavClick}
        onRequestDemo={() => setIsPrivateDemoOpen(true)}
      />

      {/* Main Content Area */}
      <div className="flex-1 w-full">
        <main className="flex-1">
          {/* Unobstructed Hero Showcase */}
          <HeroSection
            property={property}
            onOpenOverview={() => setIsOverviewOpen(true)}
            onOpenSpecs={() => setIsSpecsOpen(true)}
            onOpenFinancials={() => setIsFinancialsOpen(true)}
            onOpenNeighborhood={() => setIsNeighborhoodOpen(true)}
            onOpenSchedule={() => setIsScheduleCallOpen(true)}
            onOpenConciergePrompt={handleSendMessage}
          />

          {/* Real-Time Broker Lead Qualification View (Live Dashboard Section) */}
          <BrokerQualificationView
            qualification={qualification}
            onViewProfile={() => setIsLeadProfileOpen(true)}
            onContactLead={() => setIsContactLeadOpen(true)}
            onScheduleCall={() => setIsScheduleCallOpen(true)}
          />
        </main>
      </div>

      {/* REPOSITIONED FLOATING AI CONCIERGE WIDGET WITH ENHANCED HIGH-CONTRAST VISIBILITY */}
      <FloatingConcierge
        property={property}
        messages={messages}
        inputValue={inputValue}
        setInputValue={setInputValue}
        onSendMessage={handleSendMessage}
        isLoading={isLoading}
        onResetChat={handleResetChat}
        onOpenSpecs={() => setIsSpecsOpen(true)}
        onOpenFinancials={() => setIsFinancialsOpen(true)}
        onOpenSchedule={() => setIsScheduleCallOpen(true)}
        onOpenMarket={() => setIsMarketOpen(true)}
        onOpenPortfolio={() => setIsPortfolioOpen(true)}
      />

      {/* Footer */}
      <Footer />

      {/* Interactive Detail Modals */}
      <OverviewModal
        isOpen={isOverviewOpen}
        onClose={() => setIsOverviewOpen(false)}
        property={property}
        onOpenConciergeQuestion={handleOpenConciergeQuestion}
      />

      <SpecificationsModal
        isOpen={isSpecsOpen}
        onClose={() => setIsSpecsOpen(false)}
        property={property}
        onOpenConciergeQuestion={handleOpenConciergeQuestion}
      />

      <NeighborhoodModal
        isOpen={isNeighborhoodOpen}
        onClose={() => setIsNeighborhoodOpen(false)}
        property={property}
        onOpenConciergeQuestion={handleOpenConciergeQuestion}
      />

      <MarketInsightsModal
        isOpen={isMarketOpen}
        onClose={() => setIsMarketOpen(false)}
        onOpenConciergeQuestion={handleOpenConciergeQuestion}
      />

      <PortfolioStrategyModal
        isOpen={isPortfolioOpen}
        onClose={() => setIsPortfolioOpen(false)}
        onOpenConciergeQuestion={handleOpenConciergeQuestion}
      />

      <FinancialsModal
        isOpen={isFinancialsOpen}
        onClose={() => setIsFinancialsOpen(false)}
        property={property}
        onOpenConciergeQuestion={handleOpenConciergeQuestion}
      />

      <LeadProfileModal
        isOpen={isLeadProfileOpen}
        onClose={() => setIsLeadProfileOpen(false)}
        qualification={qualification}
        onUpdateQualification={setQualification}
        onContactLead={() => setIsContactLeadOpen(true)}
        onScheduleCall={() => setIsScheduleCallOpen(true)}
      />

      <ContactLeadModal
        isOpen={isContactLeadOpen}
        onClose={() => setIsContactLeadOpen(false)}
        qualification={qualification}
      />

      <ScheduleCallModal
        isOpen={isScheduleCallOpen}
        onClose={() => setIsScheduleCallOpen(false)}
      />

      <PrivateDemoModal
        isOpen={isPrivateDemoOpen}
        onClose={() => setIsPrivateDemoOpen(false)}
      />
    </div>
  );
}
