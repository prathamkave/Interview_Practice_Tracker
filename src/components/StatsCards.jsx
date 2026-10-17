import React from 'react';
import { 
  Code2, 
  Cpu, 
  Layers, 
  TrendingUp,
  ChevronRight
} from 'lucide-react';

export const StatsCards = ({ stats, onSelectCategory }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3.5 sm:gap-4 mb-6">
      {/* 1. Overall Progress Card */}
      <div className="bg-[#181920] border border-white/5 rounded-2xl p-4 sm:p-5 relative overflow-hidden group hover:border-[#FF5B4D]/30 transition-all duration-300 shadow-lg">
        <div className="flex items-start justify-between mb-3 sm:mb-4">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#242631] border border-white/5 flex items-center justify-center text-[#FF5B4D] font-bold text-sm shadow-md">
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF5B4D]" />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-white tracking-wide">
                Total Prep Goal
              </h3>
              <p className="text-[10px] sm:text-[11px] text-zinc-400">Weekly Target Progress</p>
            </div>
          </div>
          <span className="text-[9px] sm:text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-[#FF5B4D]/15 text-[#FF5B4D] border border-[#FF5B4D]/25">
            OVERVIEW
          </span>
        </div>

        <div className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4">
          <div className="flex justify-between items-baseline">
            <span className="text-[11px] sm:text-xs font-medium text-zinc-400">Task Done:</span>
            <span className="text-xs sm:text-sm font-bold text-white font-mono">
              <span className="text-[#FF5B4D]">{stats.completed}</span> / {stats.total}
            </span>
          </div>
          {/* Coral / Red Accent Bar */}
          <div className="h-2 w-full bg-[#242631] rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#FF5B4D] to-[#E03A2B] rounded-full transition-all duration-500 shadow-[0_0_12px_#FF5B4D]"
              style={{ width: `${stats.overallPercentage || 0}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[10px] sm:text-[11px]">
          <div className="flex items-center gap-1.5">
            <span className="px-2 py-0.5 rounded-md bg-[#242631] text-zinc-300 font-mono text-[9px] sm:text-[10px]">
              {stats.overallPercentage || 0}% Completed
            </span>
            <span className="text-[9px] sm:text-[10px] text-zinc-500">
              ({stats.pending} pending)
            </span>
          </div>
          <span className="text-[9px] sm:text-[10px] font-mono text-[#FF5B4D] font-semibold">
            {stats.completed > 0 ? `${stats.completed} SOLVED` : '0 SOLVED'}
          </span>
        </div>
      </div>

      {/* 2. DSA Problems Card */}
      <div 
        onClick={() => onSelectCategory('DSA')}
        className="bg-[#181920] border border-white/5 rounded-2xl p-4 sm:p-5 relative overflow-hidden group hover:border-amber-500/40 cursor-pointer transition-all duration-300 shadow-lg"
      >
        <div className="flex items-start justify-between mb-3 sm:mb-4">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 font-bold shadow-md">
              <Code2 className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-white tracking-wide group-hover:text-amber-400 transition-colors">
                DSA Problems
              </h3>
              <p className="text-[10px] sm:text-[11px] text-zinc-400">Algorithms & Structures</p>
            </div>
          </div>
          <span className="text-[9px] sm:text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/25">
            DSA
          </span>
        </div>

        <div className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4">
          <div className="flex justify-between items-baseline">
            <span className="text-[11px] sm:text-xs font-medium text-zinc-400">Solved:</span>
            <span className="text-xs sm:text-sm font-bold text-white font-mono">
              <span className="text-amber-400">{stats.dsa.completed}</span> / {stats.dsa.total}
            </span>
          </div>
          {/* Amber Progress Bar */}
          <div className="h-2 w-full bg-[#242631] rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full transition-all duration-500 shadow-[0_0_12px_rgba(245,158,11,0.5)]"
              style={{ width: `${stats.dsa.percentage || 0}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[10px] sm:text-[11px]">
          <div className="flex gap-1.5 text-[9px] sm:text-[10px] text-zinc-400 font-mono">
            <span className="text-emerald-400">{stats.dsa.easy}E</span>
            <span>•</span>
            <span className="text-amber-400">{stats.dsa.medium}M</span>
            <span>•</span>
            <span className="text-red-400">{stats.dsa.hard}H</span>
          </div>
          <span className="text-[9px] sm:text-[10px] font-mono text-zinc-400 group-hover:text-white flex items-center gap-0.5">
            View <ChevronRight className="w-3 h-3" />
          </span>
        </div>
      </div>

      {/* 3. Git & Technical Interview Questions Card */}
      <div 
        onClick={() => onSelectCategory('Technical')}
        className="bg-[#181920] border border-white/5 rounded-2xl p-4 sm:p-5 relative overflow-hidden group hover:border-cyan-500/40 cursor-pointer transition-all duration-300 shadow-lg"
      >
        <div className="flex items-start justify-between mb-3 sm:mb-4">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold shadow-md">
              <Cpu className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-white tracking-wide group-hover:text-cyan-400 transition-colors">
                Interview Questions
              </h3>
              <p className="text-[10px] sm:text-[11px] text-zinc-400">Git & Web Core Concepts</p>
            </div>
          </div>
          <span className="text-[9px] sm:text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-400 border border-cyan-500/25">
            CONCEPTS
          </span>
        </div>

        <div className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4">
          <div className="flex justify-between items-baseline">
            <span className="text-[11px] sm:text-xs font-medium text-zinc-400">Mastered:</span>
            <span className="text-xs sm:text-sm font-bold text-white font-mono">
              <span className="text-cyan-400">{stats.technicalAndGit.completed}</span> / {stats.technicalAndGit.total}
            </span>
          </div>
          {/* Cyan Progress Bar */}
          <div className="h-2 w-full bg-[#242631] rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-500 shadow-[0_0_12px_rgba(6,182,212,0.5)]"
              style={{ width: `${stats.technicalAndGit.percentage || 0}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[10px] sm:text-[11px]">
          <span className="text-[9px] sm:text-[10px] text-zinc-400">
            Git: <strong className="text-white">{stats.git.completed}/{stats.git.total}</strong> • Tech: <strong className="text-white">{stats.technical.completed}/{stats.technical.total}</strong>
          </span>
          <span className="text-[9px] sm:text-[10px] font-mono text-zinc-400 group-hover:text-white flex items-center gap-0.5">
            View <ChevronRight className="w-3 h-3" />
          </span>
        </div>
      </div>

      {/* 4. Machine Coding Status Card */}
      <div 
        onClick={() => onSelectCategory('Machine Coding')}
        className="bg-[#181920] border border-white/5 rounded-2xl p-4 sm:p-5 relative overflow-hidden group hover:border-emerald-500/40 cursor-pointer transition-all duration-300 shadow-lg"
      >
        <div className="flex items-start justify-between mb-3 sm:mb-4">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold shadow-md">
              <Layers className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-white tracking-wide group-hover:text-emerald-400 transition-colors">
                Machine Coding
              </h3>
              <p className="text-[10px] sm:text-[11px] text-zinc-400">2.5h Project Rounds</p>
            </div>
          </div>
          <span className="text-[9px] sm:text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/25">
            TIMED
          </span>
        </div>

        <div className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4">
          <div className="flex justify-between items-baseline">
            <span className="text-[11px] sm:text-xs font-medium text-zinc-400">Projects Done:</span>
            <span className="text-xs sm:text-sm font-bold text-white font-mono">
              <span className="text-emerald-400">{stats.machineCoding.completed}</span> / {stats.machineCoding.total}
            </span>
          </div>
          {/* Emerald Progress Bar */}
          <div className="h-2 w-full bg-[#242631] rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500 shadow-[0_0_12px_rgba(16,185,129,0.5)]"
              style={{ width: `${stats.machineCoding.percentage || 0}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[10px] sm:text-[11px]">
          <span className="text-[9px] sm:text-[10px] text-zinc-400 font-mono">
            {stats.machineCoding.completed} of {stats.machineCoding.total} Built
          </span>
          <span className="text-[9px] sm:text-[10px] font-mono text-zinc-400 group-hover:text-white flex items-center gap-0.5">
            Practice <ChevronRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </div>
  );
};
