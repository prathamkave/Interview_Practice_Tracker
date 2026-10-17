import React, { useState, useMemo } from 'react';
import { 
  RotateCcw, 
  Search, 
  Plus, 
  Inbox, 
  Sparkles
} from 'lucide-react';
import { QuestionItem } from './QuestionItem';
import { CATEGORIES, STATUSES, DIFFICULTIES } from '../data/initialQuestions';

export const QuestionTracker = ({
  questions,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  onToggleStatus,
  onToggleStar,
  onEdit,
  onDelete,
  onOpenAddModal,
  onLoadSampleCurriculum
}) => {
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [sortBy, setSortBy] = useState('newest'); // 'newest' | 'oldest' | 'difficulty' | 'title'
  const [onlyStarred, setOnlyStarred] = useState(false);

  // Filtered & Sorted Questions
  const filteredQuestions = useMemo(() => {
    return questions
      .filter((q) => {
        // Search Query filter
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase();
          const matchesTitle = q.title?.toLowerCase().includes(query);
          const matchesNotes = q.notes?.toLowerCase().includes(query);
          const matchesTags = q.tags?.some((t) => t.toLowerCase().includes(query));
          if (!matchesTitle && !matchesNotes && !matchesTags) return false;
        }

        // Category filter
        if (selectedCategory !== 'All' && q.category !== selectedCategory) {
          return false;
        }

        // Status filter
        if (selectedStatus !== 'All' && q.status !== selectedStatus) {
          return false;
        }

        // Difficulty filter
        if (selectedDifficulty !== 'All' && q.difficulty !== selectedDifficulty) {
          return false;
        }

        // Starred filter
        if (onlyStarred && !q.isStarred) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'newest') {
          return (b.dateAdded || '').localeCompare(a.dateAdded || '');
        }
        if (sortBy === 'oldest') {
          return (a.dateAdded || '').localeCompare(b.dateAdded || '');
        }
        if (sortBy === 'title') {
          return (a.title || '').localeCompare(b.title || '');
        }
        if (sortBy === 'difficulty') {
          const weights = { Easy: 1, Medium: 2, Hard: 3 };
          return (weights[b.difficulty] || 0) - (weights[a.difficulty] || 0);
        }
        return 0;
      });
  }, [
    questions, 
    searchQuery, 
    selectedCategory, 
    selectedStatus, 
    selectedDifficulty, 
    sortBy, 
    onlyStarred
  ]);

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedStatus('All');
    setSelectedDifficulty('All');
    setOnlyStarred(false);
  };

  const hasActiveFilters = 
    searchQuery.trim() !== '' || 
    selectedCategory !== 'All' || 
    selectedStatus !== 'All' || 
    selectedDifficulty !== 'All' || 
    onlyStarred;

  return (
    <div className="bg-[#181920] border border-white/5 rounded-2xl p-4 sm:p-5 shadow-lg">
      {/* Title & Filter Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3.5 sm:gap-4 mb-4 sm:mb-5 pb-4 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#22242E] flex items-center justify-center text-[#FF5B4D] font-bold text-xs">
            {filteredQuestions.length}
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-white tracking-wide flex items-center gap-2">
              My Practice Questions
              {selectedCategory !== 'All' && (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#FF5B4D]/20 text-[#FF5B4D]">
                  {selectedCategory}
                </span>
              )}
            </h3>
            <p className="text-[10px] sm:text-[11px] text-zinc-400">
              Showing {filteredQuestions.length} of {questions.length} saved tasks
            </p>
          </div>
        </div>

        {/* Filter Controls Row */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {/* Status Select */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-[#1F2027] border border-white/5 rounded-xl px-2.5 sm:px-3 py-1.5 text-[11px] sm:text-xs text-zinc-200 focus:outline-none focus:border-[#FF5B4D] cursor-pointer"
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>

          {/* Difficulty Select */}
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="bg-[#1F2027] border border-white/5 rounded-xl px-2.5 sm:px-3 py-1.5 text-[11px] sm:text-xs text-zinc-200 focus:outline-none focus:border-[#FF5B4D] cursor-pointer"
          >
            <option value="All">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>

          {/* Sort Select */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-[#1F2027] border border-white/5 rounded-xl px-2.5 sm:px-3 py-1.5 text-[11px] sm:text-xs text-zinc-200 focus:outline-none focus:border-[#FF5B4D] cursor-pointer"
          >
            <option value="newest">Sort: Newest</option>
            <option value="oldest">Sort: Oldest</option>
            <option value="difficulty">Sort: Difficulty</option>
            <option value="title">Sort: A-Z</option>
          </select>

          {/* Starred only toggle */}
          <button
            onClick={() => setOnlyStarred(!onlyStarred)}
            className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-[11px] sm:text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer ${
              onlyStarred 
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' 
                : 'bg-[#1F2027] text-zinc-400 hover:text-white border border-white/5'
            }`}
          >
            ★ Starred
          </button>

          {/* Clear Filters if active */}
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="px-2.5 py-1.5 rounded-xl text-[11px] sm:text-xs text-zinc-400 hover:text-white hover:bg-white/5 border border-white/5 transition-colors flex items-center gap-1 cursor-pointer"
              title="Clear all filters"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Category Pills Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2.5 mb-3.5 text-xs scrollbar-none">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`
                px-3 py-1.5 rounded-xl font-medium tracking-wide transition-all whitespace-nowrap cursor-pointer text-xs
                ${isActive
                  ? 'bg-[#FF5B4D] text-white shadow-md shadow-[#FF5B4D]/30 font-semibold'
                  : 'bg-[#1F2027] text-zinc-400 hover:text-zinc-200 hover:bg-[#252732] border border-white/5'
                }
              `}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Question List or Empty States */}
      {questions.length === 0 ? (
        /* Empty State: Initially all zeros */
        <div className="text-center py-10 sm:py-14 px-4 bg-[#1B1C24] rounded-2xl border border-dashed border-white/10">
          <div className="w-12 h-12 rounded-2xl bg-[#FF5B4D]/10 border border-[#FF5B4D]/20 flex items-center justify-center text-[#FF5B4D] mx-auto mb-3">
            <Inbox className="w-6 h-6" />
          </div>
          <h4 className="text-sm font-bold text-white mb-1">
            No Interview Questions Yet
          </h4>
          <p className="text-xs text-zinc-400 max-w-sm mx-auto mb-5 leading-relaxed">
            Your preparation dashboard is currently at 0. Start by adding your questions or load the sample curriculum to begin tracking.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onOpenAddModal}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#FF5B4D] to-[#E03A2B] text-white text-xs font-semibold shadow-lg shadow-[#FF5B4D]/25 hover:scale-[1.02] transition-transform inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Add First Question
            </button>
            {onLoadSampleCurriculum && (
              <button
                onClick={onLoadSampleCurriculum}
                className="px-4 py-2 rounded-xl bg-[#22242E] text-zinc-200 hover:text-white text-xs font-semibold border border-white/10 hover:border-white/20 transition-all inline-flex items-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Load Sample Practice Questions
              </button>
            )}
          </div>
        </div>
      ) : filteredQuestions.length === 0 ? (
        /* No Search Results State */
        <div className="text-center py-10 sm:py-14 px-4 bg-[#1B1C24] rounded-2xl border border-dashed border-white/10">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mx-auto mb-3">
            <Search className="w-6 h-6" />
          </div>
          <h4 className="text-sm font-bold text-white mb-1">
            No Matching Questions Found
          </h4>
          <p className="text-xs text-zinc-400 max-w-sm mx-auto mb-4">
            No questions match your current search and filter criteria. Try adjusting your keywords or clearing the active filters.
          </p>
          <button
            onClick={clearAllFilters}
            className="px-4 py-2 rounded-xl bg-[#22242E] text-zinc-200 hover:text-white text-xs font-semibold border border-white/10 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Clear All Filters
          </button>
        </div>
      ) : (
        /* Render Question Rows */
        <div className="space-y-2.5">
          {filteredQuestions.map((question, index) => (
            <QuestionItem
              key={question.id}
              question={question}
              index={index}
              onToggleStatus={onToggleStatus}
              onToggleStar={onToggleStar}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};
