import React, { useState } from 'react';
import { 
  CheckCircle2, 
  ExternalLink, 
  Star, 
  Edit3, 
  Trash2, 
  ChevronDown, 
  ChevronUp, 
  Code2, 
  GitBranch, 
  Cpu, 
  Layers,
  FileText
} from 'lucide-react';

export const QuestionItem = ({ 
  question, 
  index, 
  onToggleStatus, 
  onToggleStar, 
  onEdit, 
  onDelete 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const isCompleted = question.status === 'Completed';
  const isInProgress = question.status === 'In Progress';

  // Category Icon & Color
  const getCategoryDetails = (cat) => {
    switch (cat) {
      case 'DSA':
        return { 
          icon: Code2, 
          color: 'text-amber-400', 
          bg: 'bg-amber-500/10', 
          border: 'border-amber-500/20' 
        };
      case 'Git':
        return { 
          icon: GitBranch, 
          color: 'text-orange-400', 
          bg: 'bg-orange-500/10', 
          border: 'border-orange-500/20' 
        };
      case 'Technical':
        return { 
          icon: Cpu, 
          color: 'text-cyan-400', 
          bg: 'bg-cyan-500/10', 
          border: 'border-cyan-500/20' 
        };
      case 'Machine Coding':
      default:
        return { 
          icon: Layers, 
          color: 'text-emerald-400', 
          bg: 'bg-emerald-500/10', 
          border: 'border-emerald-500/20' 
        };
    }
  };

  const getDifficultyBadge = (diff) => {
    switch (diff) {
      case 'Easy':
        return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
      case 'Hard':
        return 'bg-[#FF5B4D]/15 text-[#FF5B4D] border-[#FF5B4D]/30';
      case 'Medium':
      default:
        return 'bg-amber-500/15 text-amber-400 border-amber-500/30';
    }
  };

  const catDetails = getCategoryDetails(question.category);
  const CategoryIcon = catDetails.icon;

  return (
    <div className={`
      bg-[#1B1C24] border border-white/5 rounded-xl p-3.5 sm:p-4 transition-all duration-200 group
      ${isCompleted ? 'opacity-85 hover:opacity-100' : 'hover:border-white/10 hover:bg-[#1E202A]'}
    `}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Left: Status Toggle Circle + Numbering + Title + Badges */}
        <div className="flex items-start sm:items-center gap-3 min-w-0 flex-1">
          {/* Quick cycle status button */}
          <button
            onClick={() => onToggleStatus(question.id)}
            title={`Status: ${question.status}. Click to cycle.`}
            className="flex-shrink-0 cursor-pointer focus:outline-none transition-transform active:scale-90 mt-0.5 sm:mt-0"
          >
            {isCompleted ? (
              <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/30">
                <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />
              </div>
            ) : isInProgress ? (
              <div className="w-5 h-5 rounded-full border-2 border-amber-400 flex items-center justify-center bg-amber-400/10">
                <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              </div>
            ) : (
              <div className="w-5 h-5 rounded-full border-2 border-zinc-500 hover:border-zinc-300 transition-colors" />
            )}
          </button>

          {/* Index numbering */}
          <span className="text-[11px] font-mono font-bold text-zinc-500 group-hover:text-zinc-400 hidden sm:inline flex-shrink-0">
            {String(index + 1).padStart(2, '0')}
          </span>

          {/* Title & Tag overview */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`text-xs sm:text-sm font-semibold transition-colors break-words ${
                isCompleted 
                  ? 'line-through text-zinc-400' 
                  : 'text-zinc-100 group-hover:text-white'
              }`}>
                {question.title}
              </span>

              {question.isStarred && (
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 flex-shrink-0" />
              )}
            </div>

            {/* Sub-row with tags and target week */}
            <div className="flex items-center gap-1.5 sm:gap-2 mt-1.5 flex-wrap">
              {/* Category Pill */}
              <span className={`text-[10px] px-2 py-0.5 rounded-md font-medium border flex items-center gap-1 ${catDetails.bg} ${catDetails.color} ${catDetails.border}`}>
                <CategoryIcon className="w-3 h-3" />
                {question.category}
              </span>

              {/* Difficulty */}
              <span className={`text-[10px] px-2 py-0.5 rounded-md font-mono font-semibold border ${getDifficultyBadge(question.difficulty)}`}>
                {question.difficulty}
              </span>

              {/* Target Week */}
              {question.targetWeek && (
                <span className="text-[10px] text-zinc-400 font-mono">
                  {question.targetWeek}
                </span>
              )}

              {/* Tags preview */}
              {question.tags && question.tags.length > 0 && (
                <div className="flex items-center gap-1 flex-wrap">
                  {question.tags.slice(0, 3).map((tag, tIdx) => (
                    <span key={tIdx} className="text-[9px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400">
                      #{tag}
                    </span>
                  ))}
                  {question.tags.length > 3 && (
                    <span className="text-[9px] text-zinc-500 font-mono">
                      +{question.tags.length - 3}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center justify-between sm:justify-end gap-1.5 sm:gap-2 pt-2 sm:pt-0 border-t border-white/5 sm:border-0 flex-shrink-0">
          {/* Status badge pill */}
          <button
            onClick={() => onToggleStatus(question.id)}
            className={`text-[10px] px-2.5 py-1 rounded-lg font-medium cursor-pointer transition-colors ${
              isCompleted 
                ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20' 
                : isInProgress 
                  ? 'bg-amber-500/15 text-amber-400 border border-amber-500/20' 
                  : 'bg-zinc-800 text-zinc-400 border border-white/5'
            }`}
          >
            {question.status}
          </button>

          <div className="flex items-center gap-1">
            {/* External link */}
            {question.link && (
              <a
                href={question.link}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
                title="Open problem link"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            {/* Star toggle */}
            <button
              onClick={() => onToggleStar(question.id)}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                question.isStarred 
                  ? 'text-amber-400 hover:text-amber-300' 
                  : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/5'
              }`}
              title={question.isStarred ? 'Unstar question' : 'Star question'}
            >
              <Star className={`w-3.5 h-3.5 ${question.isStarred ? 'fill-amber-400' : ''}`} />
            </button>

            {/* Edit button */}
            <button
              onClick={() => onEdit(question)}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
              title="Edit question"
            >
              <Edit3 className="w-3.5 h-3.5" />
            </button>

            {/* Delete button */}
            <button
              onClick={() => onDelete(question)}
              className="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
              title="Delete question"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>

            {/* Notes dropdown toggle */}
            {question.notes && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                title={isExpanded ? "Hide notes" : "Show notes"}
              >
                {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Expandable Notes & Detail Card */}
      {isExpanded && question.notes && (
        <div className="mt-3 pt-3 border-t border-white/5 text-xs text-zinc-300 bg-[#15161C] p-3 rounded-lg space-y-1.5">
          <div className="flex items-center gap-1.5 text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">
            <FileText className="w-3 h-3 text-[#FF5B4D]" />
            Interview Solution Summary:
          </div>
          <p className="leading-relaxed font-sans text-zinc-300 whitespace-pre-line text-[11px]">
            {question.notes}
          </p>
          {question.completedAt && (
            <div className="text-[10px] text-zinc-500 font-mono pt-1">
              Completed on: {question.completedAt}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
