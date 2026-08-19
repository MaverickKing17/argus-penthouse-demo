import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroConcierge } from './components/HeroConcierge';
import { BrokerQualificationView } from './components/BrokerQualificationView';
import { Footer } from './components/Footer';
import { OverviewModal } from './components/OverviewModal';
import { SpecificationsModal } from './components/SpecificationsModal';
import { NeighborhoodModal } from './components/NeighborhoodModal';
import { FinancialsModal } from './components/FinancialsModal';
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

  // Initial messages matching the exact welcome from ARCUS AI / ARGUS screenshot
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'argus-welcome',
      role: 'assistant',
      content:
        'Welcome to Suite 5200. I am ARGUS, your dedicated AI concierge.\n\nAsk me anything about floorplans, finishes, or carrying cost simulations, or schedule a private viewing.',
      timestamp: '6:42 PM',
    },
  ]);

  // Modal open states
  const [isOverviewOpen, setIsOverviewOpen] = useState(false);
  const [isSpecsOpen, setIsSpecsOpen] = useState(false);
  const [isNeighborhoodOpen, setIsNeighborhoodOpen] = useState(false);
  const [isFinancialsOpen, setIsFinancialsOpen] = useState(false);
  const [isLeadProfileOpen, setIsLeadProfileOpen] = useState(false);
  const [isContactLeadOpen, setIsContactLeadOpen] = useState(false);
  const [isScheduleCallOpen, setIsScheduleCallOpen] = useState(false);
  const [isPrivateDemoOpen, setIsPrivateDemoOpen] = useState(false);

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    if (tabId === 'overview') setIsOverviewOpen(true);
    if (tabId === 'specifications') setIsSpecsOpen(true);
    if (tabId === 'neighborhood') setIsNeighborhoodOpen(true);
    if (tabId === 'financials') setIsFinancialsOpen(true);
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
      // High-precision fallback response preserving the Sage archetype
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
          confidenceScore: 95,
          purchaseStructure: 'Cash',
          estimatedBudget: '$5,000,000 - $6,000,000',
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
          'Welcome to Suite 5200. I am ARGUS, your dedicated AI concierge.\n\nAsk me anything about floorplans, finishes, or carrying cost simulations, or schedule a private viewing.',
        timestamp: '6:42 PM',
      },
    ]);
  };

  const handleOpenConciergeQuestion = (q: string) => {
    setActiveTab('concierge');
    handleSendMessage(q);
  };

  return (
    <div className="min-h-screen bg-[#070e1b] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={handleNavClick}
        onRequestDemo={() => setIsPrivateDemoOpen(true)}
      />

      {/* Main Penthouse Showcase & Floating ARGUS Concierge */}
      <main className="flex-1">
        <HeroConcierge
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
        />

        {/* Real-Time Broker Lead Qualification View (Bottom Live Section) */}
        <BrokerQualificationView
          qualification={qualification}
          onViewProfile={() => setIsLeadProfileOpen(true)}
          onContactLead={() => setIsContactLeadOpen(true)}
          onScheduleCall={() => setIsScheduleCallOpen(true)}
        />
      </main>

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
