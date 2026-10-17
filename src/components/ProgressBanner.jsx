import React from 'react';
import { TrendingUp, CheckCircle2, Clock, Target, Sparkles } from 'lucide-react';

export const ProgressBanner = ({ stats }) => {
  return (
    <div className="bg-[#181920] border border-white/5 rounded-2xl p-5 sm:p-6 shadow-lg mb-6">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#242631] border border-white/5 flex items-center justify-center text-[#FF5B4D] shadow-md">
            <TrendingUp className="w-5 h-5 text-[#FF5B4D]" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white tracking-wide flex items-center gap-2">
              Weekly Preparation Progress
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#FF5B4D]/15 text-[#FF5B4D] border border-[#FF5B4D]/25">
                ROUND 4
              </span>
            </h3>
            <p className="text-xs text-zinc-400">
              Visual completion percentage based on stored interview questions
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-1.5 text-zinc-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>{stats.completed} Completed</span>
          </div>
          <div className="flex items-center gap-1.5 text-zinc-400">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span>{stats.inProgress} In Progress</span>
          </div>
          <div className="flex items-center gap-1.5 text-zinc-500">
            <span className="w-2 h-2 rounded-full bg-zinc-600" />
            <span>{stats.pending} Pending</span>
          </div>
        </div>
      </div>

      {/* Main Glowing Progress Bar */}
      <div className="space-y-2 mb-5">
        <div className="flex justify-between items-baseline text-xs">
          <span className="text-zinc-400 font-medium">
            Overall Completion Rate:
          </span>
          <span className="text-sm font-bold text-white font-mono">
            <span className="text-[#FF5B4D] text-base">{stats.overallPercentage}%</span> ({stats.completed} of {stats.total} questions)
          </span>
        </div>

        <div className="h-3 w-full bg-[#242631] rounded-full overflow-hidden p-0.5">
          <div 
            className="h-full bg-gradient-to-r from-[#FF5B4D] to-[#E03A2B] rounded-full transition-all duration-500 shadow-[0_0_14px_#FF5B4D]"
            style={{ width: `${stats.overallPercentage}%` }}
          />
        </div>
      </div>

      {/* Category Breakdowns Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/5">
        {/* DSA */}
        <div className="bg-[#141519] border border-white/5 rounded-xl p-3">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-semibold text-white">DSA</span>
            <span className="font-mono text-amber-400 font-bold">{stats.dsa.percentage}%</span>
          </div>
          <div className="h-1.5 w-full bg-[#242631] rounded-full overflow-hidden mb-1.5">
            <div 
              className="h-full bg-amber-400 rounded-full transition-all duration-300"
              style={{ width: `${stats.dsa.percentage}%` }}
            />
          </div>
          <div className="text-[10px] text-zinc-400 font-mono">
            {stats.dsa.completed} / {stats.dsa.total} solved
          </div>
        </div>

        {/* Git */}
        <div className="bg-[#141519] border border-white/5 rounded-xl p-3">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-semibold text-white">Git CLI</span>
            <span className="font-mono text-orange-400 font-bold">
              {stats.git.total > 0 ? Math.round((stats.git.completed / stats.git.total) * 100) : 0}%
            </span>
          </div>
          <div className="h-1.5 w-full bg-[#242631] rounded-full overflow-hidden mb-1.5">
            <div 
              className="h-full bg-orange-400 rounded-full transition-all duration-300"
              style={{ width: `${stats.git.total > 0 ? (stats.git.completed / stats.git.total) * 100 : 0}%` }}
            />
          </div>
          <div className="text-[10px] text-zinc-400 font-mono">
            {stats.git.completed} / {stats.git.total} solved
          </div>
        </div>

        {/* Technical */}
        <div className="bg-[#141519] border border-white/5 rounded-xl p-3">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-semibold text-white">Technical</span>
            <span className="font-mono text-cyan-400 font-bold">
              {stats.technical.total > 0 ? Math.round((stats.technical.completed / stats.technical.total) * 100) : 0}%
            </span>
          </div>
          <div className="h-1.5 w-full bg-[#242631] rounded-full overflow-hidden mb-1.5">
            <div 
              className="h-full bg-cyan-400 rounded-full transition-all duration-300"
              style={{ width: `${stats.technical.total > 0 ? (stats.technical.completed / stats.technical.total) * 100 : 0}%` }}
            />
          </div>
          <div className="text-[10px] text-zinc-400 font-mono">
            {stats.technical.completed} / {stats.technical.total} mastered
          </div>
        </div>

        {/* Machine Coding */}
        <div className="bg-[#141519] border border-white/5 rounded-xl p-3">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-semibold text-white">Machine Coding</span>
            <span className="font-mono text-emerald-400 font-bold">{stats.machineCoding.percentage}%</span>
          </div>
          <div className="h-1.5 w-full bg-[#242631] rounded-full overflow-hidden mb-1.5">
            <div 
              className="h-full bg-emerald-400 rounded-full transition-all duration-300"
              style={{ width: `${stats.machineCoding.percentage}%` }}
            />
          </div>
          <div className="text-[10px] text-zinc-400 font-mono">
            {stats.machineCoding.completed} / {stats.machineCoding.total} built
          </div>
        </div>
      </div>
    </div>
  );
};
