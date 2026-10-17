import React from 'react';
import { 
  BookOpen, 
  GitBranch, 
  Code2, 
  Cpu, 
  Layers, 
  CheckCircle2, 
  AlertTriangle,
  Lightbulb,
  ShieldCheck
} from 'lucide-react';

export const PrepCheatSheetView = () => {
  const gitCommands = [
    { cmd: "git rebase -i HEAD~N", desc: "Interactive rebase to squash, edit, or reword last N commits" },
    { cmd: "git cherry-pick <commit-hash>", desc: "Apply a specific commit from another branch to current HEAD" },
    { cmd: "git reflog", desc: "View history of all HEAD movements to recover deleted branches or commits" },
    { cmd: "git stash push -m 'wip' / git stash pop", desc: "Temporarily shelter uncommitted changes and re-apply them later" },
    { cmd: "git reset --soft HEAD~1", desc: "Undo last commit while preserving changes in staging area" }
  ];

  const machineCodingChecklist = [
    { title: "Requirement Clarification (First 5-10m)", desc: "Ask about mobile vs desktop, error handling, max limits, keyboard accessibility." },
    { title: "State Management & Schema", desc: "Identify minimal state. Avoid derived state in useState; compute it dynamically." },
    { title: "Separation of Concerns", desc: "Keep UI components dumb, extract business logic into custom hooks, and utils into pure functions." },
    { title: "Resilient UX States", desc: "Always build for 4 states: Loading, Success, Empty (no items), Error (network/input fail)." },
    { title: "Performance & Micro-interactions", desc: "Debounce input searches (300ms), prevent unneeded re-renders, provide visual hover/active feedback." }
  ];

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-[#1E2028] via-[#1B1C24] to-[#181920] border border-white/5 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-mono font-semibold text-emerald-400">
            FRONTEND INTERVIEW CHEAT SHEET & RULES
          </span>
        </div>
        <h2 className="text-lg font-bold text-white mb-2">
          Machine Coding & Interview Master Guide
        </h2>
        <p className="text-xs text-zinc-400 max-w-2xl leading-relaxed">
          Comprehensive reference guide based on the Frontend Machine Coding Round (Section 4) specifications. Review high-yield Git commands, component architecture patterns, and ethical coding rules.
        </p>
      </div>

      {/* Grid: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Section 4 Core Rules & Deliverables */}
        <div className="bg-[#181920] border border-white/5 rounded-2xl p-6 shadow-lg space-y-4">
          <div className="flex items-center gap-2.5 text-white font-bold text-sm border-b border-white/5 pb-3">
            <ShieldCheck className="w-5 h-5 text-[#FF5B4D]" />
            <span>Official Round Specifications</span>
          </div>

          <div className="bg-[#121316] border border-amber-500/20 rounded-xl p-4 space-y-2">
            <div className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4" />
              <span>Core Rule & Integrity</span>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              "This is practice, not a competition for who can copy fastest. Use AI/GPT as a learning assistant to understand concepts, debug, compare approaches, or get hints. The final implementation must be understood by you. You should be able to explain your code in an interview."
            </p>
          </div>

          <div className="space-y-2 text-xs text-zinc-300">
            <div className="font-semibold text-white">Expected Deliverables:</div>
            <ul className="list-disc list-inside space-y-1 text-zinc-400 text-[11px]">
              <li>GitHub Repository with clean atomic commit history.</li>
              <li>Live deployed link (Vercel, Netlify, or GitHub Pages).</li>
              <li>1-2 minute walkthrough demo video highlighting user flow.</li>
              <li>Detailed README containing setup steps, features, and key assumptions.</li>
            </ul>
          </div>
        </div>

        {/* Machine Coding Blueprint */}
        <div className="bg-[#181920] border border-white/5 rounded-2xl p-6 shadow-lg space-y-4">
          <div className="flex items-center gap-2.5 text-white font-bold text-sm border-b border-white/5 pb-3">
            <Layers className="w-5 h-5 text-cyan-400" />
            <span>Machine Coding Round Blueprint</span>
          </div>

          <div className="space-y-3">
            {machineCodingChecklist.map((item, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-[#1E2028] border border-white/5">
                <div className="text-xs font-bold text-white mb-1 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  {item.title}
                </div>
                <p className="text-[11px] text-zinc-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Git Mastery Section */}
        <div className="bg-[#181920] border border-white/5 rounded-2xl p-6 shadow-lg space-y-4 lg:col-span-2">
          <div className="flex items-center gap-2.5 text-white font-bold text-sm border-b border-white/5 pb-3">
            <GitBranch className="w-5 h-5 text-orange-400" />
            <span>Essential Git Interview Commands</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {gitCommands.map((g, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-[#15161C] border border-white/5 space-y-1.5">
                <div className="font-mono text-xs font-bold text-orange-400 bg-[#1E2028] px-2.5 py-1 rounded-md inline-block border border-orange-500/20">
                  {g.cmd}
                </div>
                <p className="text-xs text-zinc-300">
                  {g.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
