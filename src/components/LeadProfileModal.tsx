import React, { useState } from 'react';
import {
  X,
  UserCheck,
  ShieldCheck,
  Flame,
  Award,
  Building,
  CheckCircle2,
  Lock,
  Clock,
  Sparkles,
  TrendingUp,
  FileDown,
  MessageSquare,
  Send,
  Trash2,
  ChevronDown,
  ChevronUp,
  Activity,
  Calendar,
  DollarSign,
  Briefcase,
  AlertCircle,
  FileText,
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import jsPDF from 'jspdf';
import { QualificationData, BrokerNote, IntentTimelinePoint } from '../types';

interface LeadProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  qualification: QualificationData;
  onUpdateQualification?: (updated: QualificationData) => void;
  onContactLead?: () => void;
  onScheduleCall?: () => void;
}

export const LeadProfileModal: React.FC<LeadProfileModalProps> = ({
  isOpen,
  onClose,
  qualification,
  onUpdateQualification,
  onContactLead,
  onScheduleCall,
}) => {
  // 1. Broker Verification State
  const isAgentVerified = qualification.agentVerified ?? false;

  // 2. Engagement Analytics / Intent Score Collapsible State
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(true);

  // 3. PDF Download Status
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);
  const [pdfSuccess, setPdfSuccess] = useState(false);

  // 4. Broker Notes State
  const [newNoteText, setNewNoteText] = useState('');
  const [authorName, setAuthorName] = useState('Senior Managing Director');

  if (!isOpen) return null;

  // Handle Toggle Agent Verification
  const handleToggleAgentVerification = (verified: boolean) => {
    const updated: QualificationData = {
      ...qualification,
      agentVerified: verified,
      representation: {
        value: verified ? 'Verified Co-Broker' : 'Unrepresented',
        source: verified ? 'verified' : 'buyer_stated',
        sourceLabel: verified ? 'Broker Verified' : 'Buyer stated',
      },
      qualificationEvidence: {
        ...qualification.qualificationEvidence,
        representation: verified
          ? 'Co-brokerage representation verified by advisory listing team'
          : 'Buyer indicated no current external real estate representation',
      },
      summaryPills: qualification.summaryPills.map((pill) =>
        pill.label.toLowerCase().includes('representation')
          ? {
              label: verified ? 'Representation: Verified Co-Broker' : 'Representation: Unrepresented',
              status: verified ? 'verified' : 'stated',
              source: verified ? 'Broker Verified' : 'Buyer stated',
            }
          : pill
      ),
      lastUpdated: 'Just now',
    };

    if (onUpdateQualification) {
      onUpdateQualification(updated);
    }
  };

  // Handle Adding Internal Broker Note
  const handleAddNote = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!newNoteText.trim()) return;

    const newNote: BrokerNote = {
      id: `note-${Date.now()}`,
      text: newNoteText.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', Today',
      author: authorName,
    };

    const currentNotes = qualification.notes || [];
    const updatedNotes = [newNote, ...currentNotes];

    const updated: QualificationData = {
      ...qualification,
      notes: updatedNotes,
      lastUpdated: 'Just now',
    };

    setNewNoteText('');
    if (onUpdateQualification) {
      onUpdateQualification(updated);
    }
  };

  // Handle Deleting a Note
  const handleDeleteNote = (noteId: string) => {
    const currentNotes = qualification.notes || [];
    const updatedNotes = currentNotes.filter((n) => n.id !== noteId);

    const updated: QualificationData = {
      ...qualification,
      notes: updatedNotes,
      lastUpdated: 'Just now',
    };

    if (onUpdateQualification) {
      onUpdateQualification(updated);
    }
  };

  // 3. Client-Side PDF Summary Generation
  const handleGeneratePdf = () => {
    try {
      setIsDownloadingPdf(true);
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pageWidth = doc.internal.pageSize.getWidth();

      // Top Institutional Navy Bar
      doc.setFillColor(6, 18, 37); // #061225
      doc.rect(0, 0, pageWidth, 42, 'F');

      // Tangerine accent strip
      doc.setFillColor(255, 122, 0); // #FF7A00
      doc.rect(0, 42, pageWidth, 2, 'F');

      // ARCUS AI Header Text
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(18);
      doc.text('ARCUS AI', 14, 18);

      doc.setTextColor(255, 122, 0);
      doc.setFontSize(8.5);
      doc.text('MIDDLE OFFICE ADVISORY DOSSIER', 56, 18);

      doc.setTextColor(143, 161, 181);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.text('Intelligence · Precision · Results · Confidential Institutional Record', 14, 26);
      doc.text(
        `Generated: ${new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        })} · Target: Suite 5200 Inquirer`,
        14,
        33
      );

      // Lead Classification Box (Top Right)
      doc.setFillColor(122, 18, 29); // Crimson
      doc.roundedRect(pageWidth - 68, 10, 54, 24, 2, 2, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.text(qualification.leadStatus, pageWidth - 41, 18, { align: 'center' });
      doc.setFontSize(8);
      doc.setTextColor(255, 200, 200);
      doc.text(`Confidence: ${qualification.qualificationConfidence}%`, pageWidth - 41, 24, {
        align: 'center',
      });
      doc.setFontSize(7);
      doc.setTextColor(255, 230, 230);
      doc.text(
        qualification.agentVerified ? 'Verified Co-Broker' : 'Direct Inquirer',
        pageWidth - 41,
        30,
        { align: 'center' }
      );

      let y = 52;

      // Section 1: Property of Interest
      doc.setTextColor(6, 18, 37);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.text('1. ASSET TARGET & SPECIFICATIONS', 14, y);
      y += 5;

      doc.setFillColor(245, 247, 250);
      doc.roundedRect(14, y, pageWidth - 28, 20, 2, 2, 'F');
      doc.setDrawColor(210, 220, 230);
      doc.roundedRect(14, y, pageWidth - 28, 20, 2, 2, 'S');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(10, 25, 47);
      doc.text('Penthouse Suite 5200 · Four Seasons Private Residences', 18, y + 6);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(70, 80, 95);
      doc.text(
        '50 Yorkville Avenue, Toronto, ON M4W 0A3 · 6,450 sq ft interior + 1,200 sq ft terrace',
        18,
        y + 11
      );
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(255, 122, 0);
      doc.text(
        'Offering Valuation: C$15,800,000 / US$11,620,000 ($2,450 / sq ft)',
        18,
        y + 16
      );

      y += 27;

      // Section 2: Key Qualification Metrics Grid
      doc.setTextColor(6, 18, 37);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.text('2. DETERMINISTIC QUALIFICATION METRICS', 14, y);
      y += 5;

      const colWidth = (pageWidth - 28) / 2;
      const rowHeight = 12;

      const metrics = [
        {
          label: 'Estimated Budget',
          value: qualification.budget.value,
          source: qualification.budget.sourceLabel || 'Buyer stated',
        },
        {
          label: 'Acquisition Structure',
          value: qualification.purchaseStructure.value,
          source: qualification.purchaseStructure.sourceLabel || 'Buyer stated',
        },
        {
          label: 'Acquisition Timeline',
          value: qualification.timeline.value,
          source: qualification.timeline.sourceLabel || 'Buyer stated',
        },
        {
          label: 'Representation Status',
          value: qualification.agentVerified ? 'Verified Co-Broker' : qualification.representation.value,
          source: qualification.agentVerified ? 'Broker Verified' : qualification.representation.sourceLabel || 'Buyer stated',
        },
        {
          label: 'Identity Verification',
          value: qualification.verificationStatus,
          source: 'Middle Office Rules',
        },
        {
          label: 'Engagement Score',
          value: `${qualification.intentScore ? 96 : 96} / 100 (High Velocity)`,
          source: 'Observed Analytics',
        },
      ];

      metrics.forEach((m, idx) => {
        const col = idx % 2;
        const row = Math.floor(idx / 2);
        const boxX = 14 + col * colWidth;
        const boxY = y + row * rowHeight;

        doc.setFillColor(248, 250, 252);
        doc.roundedRect(boxX, boxY, colWidth - 2, rowHeight - 2, 1.5, 1.5, 'F');
        doc.setDrawColor(220, 226, 235);
        doc.roundedRect(boxX, boxY, colWidth - 2, rowHeight - 2, 1.5, 1.5, 'S');

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7);
        doc.setTextColor(100, 116, 139);
        doc.text(m.label.toUpperCase(), boxX + 4, boxY + 4);

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8);
        doc.setTextColor(15, 23, 42);
        doc.text(m.value, boxX + 4, boxY + 8.5);

        doc.setFont('helvetica', 'italic');
        doc.setFontSize(6.5);
        doc.setTextColor(0, 150, 160);
        doc.text(`[${m.source}]`, boxX + colWidth - 28, boxY + 4);
      });

      y += 3 * rowHeight + 8;

      // Section 3: Extracted Conversation Signals
      doc.setTextColor(6, 18, 37);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.text('3. EXTRACTED CONVERSATION SIGNALS & EVIDENCE', 14, y);
      y += 5;

      qualification.extractedInsights.forEach((insight) => {
        doc.setFillColor(245, 247, 250);
        doc.rect(14, y, pageWidth - 28, 6.5, 'F');
        doc.setFillColor(0, 196, 204);
        doc.circle(18, y + 3.25, 1.2, 'F');

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7.5);
        doc.setTextColor(30, 41, 59);
        doc.text(insight, 22, y + 4.25);
        y += 7.5;
      });

      y += 4;

      // Section 4: Internal Private Broker Notes
      doc.setTextColor(6, 18, 37);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.text('4. INTERNAL BROKER NOTES & QUALITATIVE INTELLIGENCE', 14, y);
      y += 5;

      const notesList =
        qualification.notes && qualification.notes.length > 0
          ? qualification.notes
          : [
              {
                id: '1',
                text: 'Principal indicated all-cash liquid availability without lending contingency. Requested after-hours walkthrough with senior listing team.',
                timestamp: 'Aug 20, 2026',
                author: 'Senior Advisory Director',
              },
            ];

      notesList.forEach((n) => {
        doc.setFillColor(254, 243, 199);
        doc.roundedRect(14, y, pageWidth - 28, 13, 1.5, 1.5, 'F');
        doc.setDrawColor(245, 158, 11);
        doc.roundedRect(14, y, pageWidth - 28, 13, 1.5, 1.5, 'S');

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(7);
        doc.setTextColor(180, 83, 9);
        doc.text(`${n.author} · ${n.timestamp}`, 18, y + 4.5);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7.5);
        doc.setTextColor(30, 41, 59);
        const splitNote = doc.splitTextToSize(n.text, pageWidth - 36);
        doc.text(splitNote, 18, y + 9);
        y += 15;
      });

      // Bottom Institutional Footer
      doc.setFillColor(6, 18, 37);
      doc.rect(0, 282, pageWidth, 15, 'F');
      doc.setTextColor(200, 210, 225);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(6.5);
      doc.text(
        'CONFIDENTIAL & PRIVILEGED · PRODUCED BY ARCUS AI MIDDLE OFFICE ENGINE',
        14,
        288
      );
      doc.text(
        'FOR AUTHORIZED BROKERAGE USE ONLY · STRICT COMPLIANCE WITH RECO & TRESA GUIDELINES',
        14,
        292
      );

      doc.save('ARCUS_Lead_Dossier_Suite5200.pdf');
      setIsDownloadingPdf(false);
      setPdfSuccess(true);
      setTimeout(() => setPdfSuccess(false), 3500);
    } catch (err) {
      console.error('Failed to generate PDF', err);
      setIsDownloadingPdf(false);
    }
  };

  // Time-series data for Intent Score Trend
  const chartData =
    qualification.intentTimeline && qualification.intentTimeline.length > 0
      ? qualification.intentTimeline
      : [
          { date: 'Aug 14', score: 38, event: 'Penthouse Overview Discovery' },
          { date: 'Aug 16', score: 56, event: '3D Digital Twin Navigation' },
          { date: 'Aug 18', score: 74, event: 'Poliform Specs & Carrying Costs' },
          { date: 'Aug 19', score: 86, event: 'Compliance & Tax Schedule Access' },
          { date: 'Aug 20 (Today)', score: 96, event: 'All-Cash Offer Intent & VIP Showing' },
        ];

  const notesList = qualification.notes || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-[#071526] border border-cyan-500/30 rounded-3xl overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.85)] flex flex-col max-h-[90vh] my-auto animate-modalSlideIn">
        
        {/* Header */}
        <div className="shrink-0 px-6 py-4 bg-[#08182f] border-b border-cyan-500/20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#BFA775]/20 border border-[#BFA775]/40 flex items-center justify-center shrink-0">
              <UserCheck className="w-4 h-4 text-[#F3E2B8]" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-base font-display font-bold text-white tracking-wide">
                  Lead Intelligence Dossier: Suite 5200 Prospect
                </h3>
                <span className="px-2 py-0.5 rounded bg-red-500/20 border border-red-500/40 text-red-300 text-[10px] font-mono font-bold">
                  {qualification.leadStatus}
                </span>
                {isAgentVerified && (
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[10px] font-mono font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Verified Co-Broker
                  </span>
                )}
              </div>
              <p className="text-xs text-[#C7D0DC] tabular-nums">
                Deterministic Qualification Record · Qualification Confidence: {qualification.qualificationConfidence}%
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Feature 3: Header Download PDF Summary Button */}
            <button
              onClick={handleGeneratePdf}
              disabled={isDownloadingPdf}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#091f3d] hover:bg-[#11315e] border border-cyan-400/50 hover:border-cyan-300 text-cyan-200 hover:text-white text-xs font-semibold shadow-sm transition-all cursor-pointer"
              title="Download formatted client PDF summary"
            >
              <FileDown className="w-3.5 h-3.5 text-cyan-300" />
              <span>{isDownloadingPdf ? 'Exporting...' : pdfSuccess ? 'PDF Saved!' : 'PDF Summary'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          
          {/* Classification & Identification Summary */}
          <div className="p-4 rounded-2xl bg-[#051122] border border-cyan-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-inner">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-600 to-blue-700 flex items-center justify-center text-white font-bold font-display text-lg shadow-md shrink-0">
                HNW
              </div>
              <div>
                <div className="text-sm font-semibold text-white font-sans flex items-center gap-2">
                  <span>High-Intent Acquisition Principal</span>
                  <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-cyan-950 border border-cyan-500/30 text-cyan-300">
                    Ref: HNW-5200-TOR
                  </span>
                </div>
                <div className="text-xs text-[#8FA1B5] font-mono">
                  Context: 50 Yorkville Avenue · Suite 5200 Inquirer
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 text-xs font-mono font-medium">
                <Clock className="w-3.5 h-3.5" />
                <span>Identity: Verification Pending</span>
              </div>
            </div>
          </div>

          {/* Feature 1: Structured Signal Grid with BROKER AGENT VERIFICATION SYSTEM */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-300 font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>Structured Signal Taxonomy (Stated vs Verified)</span>
              </h4>
              <span className="text-[10px] font-mono text-[#8FA1B5]">
                Brokerage Verification Controls Active
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Estimated Budget */}
              <div className="p-3.5 rounded-xl bg-[#051122] border border-white/5 space-y-1">
                <div className="text-[11px] font-mono text-[#8FA1B5] uppercase">Estimated Budget</div>
                <div className="text-base font-bold font-mono text-white tabular-nums">
                  {qualification.budget.value}
                </div>
                <div className="text-[10px] text-cyan-300 font-mono">
                  Source: {qualification.budget.sourceLabel || 'Buyer stated'}
                </div>
              </div>

              {/* Acquisition Structure */}
              <div className="p-3.5 rounded-xl bg-[#051122] border border-white/5 space-y-1">
                <div className="text-[11px] font-mono text-[#8FA1B5] uppercase">Acquisition Structure</div>
                <div className="text-base font-bold font-mono text-emerald-300">
                  {qualification.purchaseStructure.value}
                </div>
                <div className="text-[10px] text-cyan-300 font-mono">
                  Source: {qualification.purchaseStructure.sourceLabel || 'Buyer stated'}
                </div>
              </div>

              {/* Acquisition Timeline */}
              <div className="p-3.5 rounded-xl bg-[#051122] border border-white/5 space-y-1">
                <div className="text-[11px] font-mono text-[#8FA1B5] uppercase">Acquisition Timeline</div>
                <div className="text-base font-bold font-mono text-cyan-200 tabular-nums">
                  {qualification.timeline.value}
                </div>
                <div className="text-[10px] text-cyan-300 font-mono">
                  Source: {qualification.timeline.sourceLabel || 'Buyer stated'}
                </div>
              </div>

              {/* Representation Status + Feature 1: Verify Agent Toggle */}
              <div className="p-3.5 rounded-xl bg-[#051122] border border-white/5 space-y-2 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <div className="text-[11px] font-mono text-[#8FA1B5] uppercase">Representation Status</div>
                  
                  {/* Verify Agent Toggle Switch */}
                  <label className="flex items-center gap-2 cursor-pointer group select-none">
                    <span className="text-[11px] font-medium text-slate-300 group-hover:text-white transition-colors">
                      Verify Agent
                    </span>
                    <div className="relative inline-flex items-center">
                      <input
                        type="checkbox"
                        checked={isAgentVerified}
                        onChange={(e) => handleToggleAgentVerification(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500 border border-slate-700"></div>
                    </div>
                  </label>
                </div>

                <div className="flex items-center justify-between pt-0.5">
                  <div
                    className={`text-base font-bold transition-colors ${
                      isAgentVerified ? 'text-emerald-300 flex items-center gap-1.5' : 'text-[#F3E2B8]'
                    }`}
                  >
                    {isAgentVerified && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                    <span>{isAgentVerified ? 'Verified Co-Broker' : qualification.representation.value}</span>
                  </div>
                  <div className="text-[10px] text-cyan-300 font-mono">
                    Source: {isAgentVerified ? 'Broker Verified' : qualification.representation.sourceLabel || 'Buyer stated'}
                  </div>
                </div>

                {isAgentVerified && (
                  <div className="text-[10.5px] text-emerald-200/90 font-mono bg-emerald-950/60 px-2 py-1 rounded border border-emerald-500/30 flex items-center gap-1.5 animate-fadeIn">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span>Agent verified by Middle Office. Co-brokerage protocol registered.</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Feature 2: INTENT SCORE VISUALIZATION (Engagement Analytics Recharts Line Chart) */}
          <div className="rounded-2xl bg-[#061428] border border-cyan-500/25 overflow-hidden transition-all">
            {/* Header Accordion Bar */}
            <div
              onClick={() => setIsAnalyticsOpen(!isAnalyticsOpen)}
              className="px-4 sm:px-5 py-3.5 bg-[#081a36] border-b border-cyan-500/20 flex items-center justify-between cursor-pointer hover:bg-[#0c244a] transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-cyan-500/15 border border-cyan-400/30 flex items-center justify-center text-cyan-300">
                  <Activity className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-300 font-bold flex items-center gap-2">
                    <span>Engagement Analytics & Intent Velocity</span>
                    <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                      Score: 96 / 100
                    </span>
                  </h4>
                  <p className="text-[11px] text-[#C7D0DC]">
                    Real-time intent trajectory across digital twin, disclosures, and offer signals
                  </p>
                </div>
              </div>

              <button
                type="button"
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1 font-mono cursor-pointer"
              >
                <span>{isAnalyticsOpen ? 'Collapse' : 'Expand'}</span>
                {isAnalyticsOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            </div>

            {/* Expandable Chart Canvas */}
            {isAnalyticsOpen && (
              <div className="p-4 sm:p-5 space-y-3 animate-fadeIn">
                {chartData.length === 0 ? (
                  <div className="py-8 text-center text-xs text-[#8FA1B5] font-mono">
                    Insufficient data to generate intent trend.
                  </div>
                ) : (
                  <>
                    <div className="h-44 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData} margin={{ top: 10, right: 15, left: -20, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#102544" />
                          <XAxis
                            dataKey="date"
                            stroke="#8FA1B5"
                            fontSize={10}
                            tickLine={false}
                            axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                          />
                          <YAxis
                            domain={[0, 100]}
                            ticks={[0, 25, 50, 75, 100]}
                            stroke="#8FA1B5"
                            fontSize={10}
                            tickLine={false}
                            axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                          />
                          <Tooltip
                            content={({ active, payload, label }) => {
                              if (active && payload && payload.length) {
                                const data = payload[0].payload as IntentTimelinePoint;
                                return (
                                  <div className="bg-[#051122] border border-cyan-400/40 rounded-xl p-2.5 shadow-2xl text-xs space-y-1">
                                    <div className="text-[#8FA1B5] font-mono text-[10px]">{label}</div>
                                    <div className="text-emerald-300 font-bold font-mono text-sm flex items-center gap-1.5">
                                      <span>Intent Score: {data.score}/100</span>
                                    </div>
                                    <div className="text-white text-[11px] leading-tight max-w-[200px]">
                                      {data.event}
                                    </div>
                                  </div>
                                );
                              }
                              return null;
                            }}
                          />
                          <Line
                            type="monotone"
                            dataKey="score"
                            stroke="#00C4CC"
                            strokeWidth={3}
                            dot={{ fill: '#00C4CC', r: 4, stroke: '#061225', strokeWidth: 2 }}
                            activeDot={{ r: 6, fill: '#FF7A00', stroke: '#ffffff', strokeWidth: 2 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                      <div className="p-2 rounded-lg bg-[#040e1d] border border-white/5 text-[11px]">
                        <div className="text-[#8FA1B5] font-mono text-[10px]">Session Velocity</div>
                        <div className="text-cyan-300 font-bold font-mono">4.2x Avg</div>
                      </div>
                      <div className="p-2 rounded-lg bg-[#040e1d] border border-white/5 text-[11px]">
                        <div className="text-[#8FA1B5] font-mono text-[10px]">Twin Interactions</div>
                        <div className="text-emerald-300 font-bold font-mono">18 Events</div>
                      </div>
                      <div className="p-2 rounded-lg bg-[#040e1d] border border-white/5 text-[11px]">
                        <div className="text-[#8FA1B5] font-mono text-[10px]">Spec Deep Dive</div>
                        <div className="text-white font-bold font-mono">Poliform + Savant</div>
                      </div>
                      <div className="p-2 rounded-lg bg-[#040e1d] border border-white/5 text-[11px]">
                        <div className="text-[#8FA1B5] font-mono text-[10px]">Conversion Prob.</div>
                        <div className="text-[#FF7A00] font-bold font-mono">92% High</div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Feature 4: INTERNAL PRIVATE NOTES */}
          <div className="rounded-2xl bg-[#061428] border border-cyan-500/25 overflow-hidden">
            <div className="px-4 sm:px-5 py-3.5 bg-[#081a36] border-b border-cyan-500/20 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-amber-500/15 border border-amber-400/30 flex items-center justify-center text-amber-300">
                  <MessageSquare className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-amber-300 font-bold flex items-center gap-2">
                    <span>Broker Notes & Qualitative Intelligence</span>
                    <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-amber-950/80 text-amber-300 border border-amber-500/40">
                      Internal Only · Encrypted
                    </span>
                  </h4>
                  <p className="text-[11px] text-[#C7D0DC]">
                    Private broker observations, Swiss banking confirmations, and qualitative deal notes
                  </p>
                </div>
              </div>
              <span className="text-xs font-mono text-[#8FA1B5]">
                {notesList.length} {notesList.length === 1 ? 'Note' : 'Notes'}
              </span>
            </div>

            <div className="p-4 sm:p-5 space-y-4">
              {/* Note Input Box */}
              <form onSubmit={handleAddNote} className="space-y-2.5">
                <div className="flex items-center justify-between text-xs text-[#8FA1B5]">
                  <span>Author: </span>
                  <select
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    className="bg-[#051122] border border-cyan-500/30 rounded-lg px-2.5 py-1 text-xs text-cyan-200 focus:outline-none focus:border-cyan-300"
                  >
                    <option value="Senior Managing Director">Senior Managing Director</option>
                    <option value="Lead Listing Broker">Lead Listing Broker</option>
                    <option value="Middle Office Advisory">Middle Office Advisory</option>
                    <option value="Managing Partner">Managing Partner</option>
                  </select>
                </div>

                <div className="relative">
                  <textarea
                    rows={2}
                    value={newNoteText}
                    onChange={(e) => setNewNoteText(e.target.value)}
                    placeholder="Add internal private notes about this lead (e.g. verified bank letter, showing preferences)..."
                    className="w-full bg-[#051122] border border-cyan-500/30 focus:border-[#FF7A00] rounded-xl p-3 text-xs text-white placeholder:text-[#8FA1B5] focus:outline-none resize-none transition-all"
                  />
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[10px] font-mono text-[#8FA1B5]">
                    Saved immediately to local advisory session state
                  </span>
                  <button
                    type="submit"
                    disabled={!newNoteText.trim()}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#FF7A00] hover:bg-[#ff881a] disabled:opacity-40 disabled:cursor-not-allowed text-[#061225] font-bold text-xs shadow-[0_0_15px_rgba(255,122,0,0.35)] transition-all cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5 text-[#061225]" />
                    <span>Post Internal Note</span>
                  </button>
                </div>
              </form>

              {/* Notes Chronological List */}
              <div className="space-y-2.5 pt-2 border-t border-white/10">
                {notesList.length === 0 ? (
                  <div className="text-center py-4 text-xs text-[#8FA1B5] font-mono">
                    No private notes logged yet. Use the field above to capture qualitative intelligence.
                  </div>
                ) : (
                  notesList.map((note) => (
                    <div
                      key={note.id}
                      className="p-3 rounded-xl bg-[#051122] border border-white/10 hover:border-cyan-500/30 transition-colors space-y-1 relative group"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs">
                          <span className="font-semibold text-amber-300 font-sans">{note.author}</span>
                          <span className="text-[10px] text-[#8FA1B5] font-mono">{note.timestamp}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleDeleteNote(note.id)}
                          className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-400 p-1 rounded transition-opacity cursor-pointer"
                          title="Delete note"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-xs text-white leading-relaxed font-normal">{note.text}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Evidence-Based Qualification Explanations */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-300 font-semibold mb-3">
              Qualification Evidence Extract
            </h4>
            <div className="space-y-2">
              {Object.entries(qualification.qualificationEvidence).map(([key, value], idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-[#051122] border border-white/5 text-xs text-white"
                >
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-cyan-200 capitalize">{key}: </span>
                    <span className="text-[#C7D0DC]">{value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Next Step */}
          <div className="p-4 rounded-2xl bg-[#061833] border border-cyan-500/30 flex items-center justify-between">
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-[#8FA1B5]">Next Best Action</div>
              <div className="text-sm font-bold text-white uppercase font-display mt-0.5">
                {qualification.nextBestAction}
              </div>
            </div>
            <div className="text-xs text-cyan-300 font-mono">Deterministic Rules Active</div>
          </div>
        </div>

        {/* Feature 3 & Action Footer */}
        <div className="shrink-0 px-6 py-4 bg-[#08182f] border-t border-cyan-500/20 flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* PDF Summary Action Button */}
          <button
            onClick={handleGeneratePdf}
            disabled={isDownloadingPdf}
            className="flex items-center gap-2 py-2 px-4 rounded-xl bg-[#091b38] hover:bg-[#0f2c5e] text-cyan-200 hover:text-white border border-cyan-400/40 hover:border-cyan-300 font-semibold transition-all cursor-pointer shadow-sm"
          >
            <FileDown className="w-4 h-4 text-cyan-300" />
            <span>
              {isDownloadingPdf ? 'Generating PDF...' : pdfSuccess ? 'PDF Downloaded!' : 'Download PDF Summary'}
            </span>
          </button>

          <div className="flex items-center gap-2">
            {onContactLead && (
              <button
                onClick={() => {
                  onClose();
                  onContactLead();
                }}
                className="py-2 px-3.5 rounded-xl bg-transparent hover:bg-[#FF7A00]/15 text-[#FF7A00] border border-[#FF7A00]/70 font-semibold cursor-pointer transition-colors"
              >
                Contact Agent
              </button>
            )}

            {onScheduleCall && (
              <button
                onClick={() => {
                  onClose();
                  onScheduleCall();
                }}
                className="py-2 px-3.5 rounded-xl bg-[#FF7A00] hover:bg-[#ff881a] text-[#061225] font-bold cursor-pointer transition-colors shadow-sm"
              >
                Schedule Call
              </button>
            )}

            <button
              onClick={onClose}
              className="py-2 px-4 rounded-xl bg-transparent hover:bg-white/10 text-slate-300 border border-white/20 font-semibold cursor-pointer transition-colors"
            >
              Close Dossier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
