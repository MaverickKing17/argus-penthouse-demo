import React, { useState } from 'react';
import { X, Calendar, Clock, CheckCircle2, ShieldCheck, User } from 'lucide-react';

interface ScheduleCallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ScheduleCallModal: React.FC<ScheduleCallModalProps> = ({ isOpen, onClose }) => {
  const [selectedDate, setSelectedDate] = useState('Tomorrow');
  const [selectedTime, setSelectedTime] = useState('11:00 AM EST');
  const [attendeeName, setAttendeeName] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  if (!isOpen) return null;

  const dates = ['Tomorrow', 'Thursday', 'Friday', 'Saturday'];
  const times = ['10:00 AM EST', '11:30 AM EST', '2:00 PM EST', '4:30 PM EST', '6:00 PM (Twilight)'];

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    setConfirmed(true);
    setTimeout(() => {
      setConfirmed(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-lg bg-[#081222] border border-white/15 rounded-3xl overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.8)] flex flex-col max-h-[85vh] my-auto animate-modalSlideIn">
        {/* Header - Fixed & Sticky */}
        <div className="shrink-0 px-6 py-4 bg-[#0a162b] border-b border-white/10 flex items-center justify-between">
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

        {/* Content Body - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6">
          {confirmed ? (
            <div className="py-8 flex flex-col items-center justify-center text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center text-emerald-400">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-display font-bold text-white">Private Showing Confirmed</h4>
              <p className="text-xs text-slate-300 max-w-sm">
                Valet clearance and private elevator security pass for {selectedDate} at {selectedTime} will be delivered securely.
              </p>
            </div>
          ) : (
            <form onSubmit={handleConfirm} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-2 font-semibold">
                  Select Showing Date
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {dates.map((d) => (
                    <button
                      type="button"
                      key={d}
                      onClick={() => setSelectedDate(d)}
                      className={`py-2 px-3 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                        selectedDate === d
                          ? 'bg-cyan-600 text-white border-cyan-400 font-semibold shadow-[0_0_12px_rgba(6,182,212,0.35)]'
                          : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-2 font-semibold">
                  Preferred Time Slot
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {times.map((t) => (
                    <button
                      type="button"
                      key={t}
                      onClick={() => setSelectedTime(t)}
                      className={`py-2 px-2.5 rounded-xl text-xs font-mono transition-all cursor-pointer border tabular-nums ${
                        selectedTime === t
                          ? 'bg-[#BFA775] text-[#0A1128] border-amber-300 font-bold shadow-[0_0_12px_rgba(191,167,117,0.4)]'
                          : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1 font-semibold">
                  Principal or Representative Name (for Building Security)
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. John Doe / Family Office Representative"
                  value={attendeeName}
                  onChange={(e) => setAttendeeName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder:text-slate-600 focus:ring-1 focus:ring-cyan-400 focus:border-cyan-400 focus:outline-none transition-all"
                />
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                <span className="text-[11px] text-emerald-400 flex items-center gap-1 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Four Seasons Valet & Security Included</span>
                </span>
                <button
                  type="submit"
                  className="py-2.5 px-5 rounded-xl bg-[#FF7A00] hover:bg-[#ff881a] active:scale-[0.99] text-[#061225] text-xs font-bold cursor-pointer shadow-[0_0_20px_rgba(255,122,0,0.45)] hover:shadow-[0_0_30px_rgba(255,122,0,0.65)] transition-all"
                >
                  Confirm Showing Pass
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
