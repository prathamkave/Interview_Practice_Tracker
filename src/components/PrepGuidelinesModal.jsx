import React from 'react';
import { 
  BookOpen, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Code2, 
  Cpu, 
  Layers, 
  GitBranch,
  ShieldAlert,
  Sparkles
} from 'lucide-react';

export const PrepGuidelinesModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-2xl bg-[#181920] border border-white/10 rounded-2xl p-6 sm:p-7 shadow-2xl z-10 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FF5B4D]/15 border border-[#FF5B4D]/25 flex items-center justify-center text-[#FF5B4D]">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-wide">
                Section 4: Machine Coding Round Guidelines
              </h3>
              <p className="text-xs text-zinc-400">
                Official rules, time constraints & best practices
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-xs px-3 py-1.5 rounded-lg bg-zinc-800 text-zinc-300 hover:text-white"
          >
            Close
          </button>
        </div>

        {/* Section Cards */}
        <div className="space-y-4 text-xs">
          {/* Rules Banner from Section 4 prompt */}
          <div className="bg-[#121316] border border-white/5 rounded-xl p-4 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-bold">
              <ShieldAlert className="w-4 h-4" />
              <span>Core Rule & AI Ethics</span>
            </div>
            <p className="text-zinc-300 leading-relaxed">
              "This is practice, not a competition for who can copy fastest. Use AI/GPT as a learning assistant to understand concepts, debug, and compare approaches, not as a replacement for thinking. If you cheat on practice, the only person you cheat is yourself. The final implementation must be understood by you so you can explain your code in an interview."
            </p>
          </div>

          {/* Time Limit & Deliverables */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-[#1E2028] border border-white/5 rounded-xl p-4">
              <div className="flex items-center gap-2 text-white font-bold mb-1">
                <Clock className="w-4 h-4 text-[#FF5B4D]" />
                <span>Time Limit: 2.5 Hours</span>
              </div>
              <p className="text-zinc-400 text-[11px] leading-relaxed">
                Aim to deliver a working prototype with clean structure, responsive design, and state persistence within 150 minutes.
              </p>
            </div>

            <div className="bg-[#1E2028] border border-white/5 rounded-xl p-4">
              <div className="flex items-center gap-2 text-white font-bold mb-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Required Deliverables</span>
              </div>
              <p className="text-zinc-400 text-[11px] leading-relaxed">
                GitHub repository + live deployed link + 1-2 minute demo video. README must contain setup steps, features, and assumptions.
              </p>
            </div>
          </div>

          {/* Evaluation Checklist */}
          <div className="bg-[#1E2028] border border-white/5 rounded-xl p-4">
            <h4 className="text-xs font-bold text-white mb-2 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Evaluation Criteria Breakdown
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-zinc-300">
              <div className="flex items-start gap-2">
                <span className="text-[#FF5B4D] font-bold">✓</span>
                <span>Dashboard with real-time category & progress stats</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#FF5B4D] font-bold">✓</span>
                <span>Question tracker with Category, Difficulty, Status</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#FF5B4D] font-bold">✓</span>
                <span>Search + multi-criteria filtering (live & reactive)</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#FF5B4D] font-bold">✓</span>
                <span>LocalStorage persistence with backup export/reset</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#FF5B4D] font-bold">✓</span>
                <span>Empty states, no-results state & form validation</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#FF5B4D] font-bold">✓</span>
                <span>Responsive mobile-first dark UI with micro-interactions</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
