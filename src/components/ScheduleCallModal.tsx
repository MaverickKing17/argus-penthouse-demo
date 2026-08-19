import React, { useState } from 'react';
import { X, Calendar, Clock, CheckCircle2, Building, ShieldCheck, UserCheck, PhoneCall } from 'lucide-react';
import { BROKERAGE_PARTNERS } from '../data/propertyData';

interface ScheduleCallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ScheduleCallModal: React.FC<ScheduleCallModalProps> = ({ isOpen, onClose }) => {
  const [selectedBroker, setSelectedBroker] = useState(BROKERAGE_PARTNERS[0].name);
  const [sessionType, setSessionType] = useState('twilight');
  const [date, setDate] = useState('2026-08-22');
  const [time, setTime] = useState('18:30 (Twilight Sunset Inspection)');
  const [confirmed, setConfirmed] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = () => {
    setConfirmed(true);
    setTimeout(() => {
      setConfirmed(false);
      onClose();
    }, 2400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl bg-[#081222] border border-white/15 rounded-3xl overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.8)] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 bg-[#0a162b] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-600/30 border border-cyan-400/50 flex items-center justify-center">
              <Calendar className="w-4 h-4 text-cyan-300" />
            </div>
            <div>
              <h3 className="text-base font-display font-bold text-white tracking-wide">
                Schedule VIP Private Showing or Consultation
              </h3>
              <p className="text-xs text-slate-400">
                Penthouse Suite 5200 · 50 Yorkville Avenue Private Security Protocol
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          {confirmed ? (
            <div className="py-10 flex flex-col items-center justify-center text-center space-y-3">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center text-emerald-400 animate-bounce">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-serif font-bold text-white">VIP Showing Appointment Registered</h4>
              <p className="text-xs text-slate-300 max-w-md">
                Ref #ARCUS-5200-VIP. The listing directorship will initiate encrypted security pre-clearance and private elevator access code delivery.
              </p>
            </div>
          ) : (
            <>
              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                  Assigned Listing Broker Partner
                </label>
                <select
                  value={selectedBroker}
                  onChange={(e) => setSelectedBroker(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                >
                  {BROKERAGE_PARTNERS.map((b) => (
                    <option key={b.name} value={b.name} className="bg-[#081222] text-white">
                      {b.name} · {b.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                  Showing Format
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => {
                      setSessionType('twilight');
                      setTime('18:30 (Twilight Sunset Inspection)');
                    }}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                      sessionType === 'twilight'
                        ? 'bg-cyan-950/60 border-cyan-400/50 text-white'
                        : 'bg-white/5 border-white/10 text-slate-400'
                    }`}
                  >
                    <div className="text-xs font-bold text-cyan-300">Twilight Skyline Walkthrough</div>
                    <div className="text-[10px] text-slate-300 mt-0.5">Sunset 270° Lake view inspection</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setSessionType('familyOffice');
                      setTime('11:00 (Private Architectural Review)');
                    }}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                      sessionType === 'familyOffice'
                        ? 'bg-cyan-950/60 border-cyan-400/50 text-white'
                        : 'bg-white/5 border-white/10 text-slate-400'
                    }`}
                  >
                    <div className="text-xs font-bold text-amber-300">Family Office / Advisory Call</div>
                    <div className="text-[10px] text-slate-300 mt-0.5">Encrypted video acquisition review</div>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">Preferred Date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">Time Slot</label>
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="11:00 (Morning Natural Daylight)">11:00 AM (Daylight Inspection)</option>
                    <option value="14:00 (Midday Architectural Review)">2:00 PM (Midday Review)</option>
                    <option value="18:30 (Twilight Sunset Inspection)">6:30 PM (Twilight Sunset)</option>
                    <option value="20:00 (Night Skyline View)">8:00 PM (Night Skyline)</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Four Seasons Valet & Concierge Included</span>
                </span>

                <button
                  onClick={handleConfirm}
                  className="py-2.5 px-5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-bold cursor-pointer shadow-lg"
                >
                  Confirm Appointment
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
