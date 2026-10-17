import React from 'react';
import { 
  Search, 
  Plus, 
  Menu, 
  RotateCcw, 
  Download, 
  Trash2,
  Sparkles
} from 'lucide-react';

export const Header = ({ 
  searchQuery, 
  setSearchQuery, 
  onOpenAddModal, 
  onResetData, 
  onExportData,
  onOpenMobileMenu,
  totalQuestions,
  completedQuestions
}) => {
  return (
    <header className="h-16 sm:h-20 bg-[#141519]/90 backdrop-blur-md border-b border-white/5 sticky top-0 z-30 px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-2 sm:gap-4">
      {/* Mobile Hamburger & Page Title */}
      <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
        <button
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-[#1E2026] transition-colors"
          aria-label="Toggle navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden md:block">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <h2 className="text-sm sm:text-base font-bold text-white tracking-wide">
              Interview Practice Tracker
            </h2>
          </div>
          <p className="text-[11px] text-zinc-400">
            {completedQuestions} of {totalQuestions} Solved • Section 4 Round
          </p>
        </div>
      </div>

      {/* Center Search Input */}
      <div className="flex-1 max-w-xs sm:max-w-md mx-1 sm:mx-4">
        <div className="relative">
          <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search questions, tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#1A1B22] border border-white/5 rounded-xl pl-8 sm:pl-10 pr-7 sm:pr-8 py-1.5 sm:py-2 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-[#FF5B4D]/60 focus:ring-1 focus:ring-[#FF5B4D]/60 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-white"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
        {/* Reset / Clear data button */}
        <button
          onClick={onResetData}
          title="Reset to 0 or reload sample questions"
          className="p-2 rounded-xl bg-[#1A1B22] text-zinc-400 hover:text-zinc-200 hover:bg-[#22242E] border border-white/5 transition-all text-xs flex items-center gap-1.5"
        >
          <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span className="hidden xl:inline text-[11px] font-medium">Reset Data</span>
        </button>

        {/* Export JSON backup */}
        {totalQuestions > 0 && (
          <button
            onClick={onExportData}
            title="Export questions to JSON"
            className="p-2 rounded-xl bg-[#1A1B22] text-zinc-400 hover:text-zinc-200 hover:bg-[#22242E] border border-white/5 transition-all text-xs flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="hidden xl:inline text-[11px] font-medium">Export</span>
          </button>
        )}

        {/* Primary CTA: Add Question */}
        <button
          onClick={onOpenAddModal}
          className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-gradient-to-r from-[#FF5B4D] to-[#E03A2B] text-white font-semibold text-xs shadow-lg shadow-[#FF5B4D]/25 hover:shadow-[#FF5B4D]/40 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
          <span className="hidden sm:inline">Add Question</span>
          <span className="sm:hidden">Add</span>
        </button>
      </div>
    </header>
  );
};
