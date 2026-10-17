import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle2, 
  Clock, 
  Layers, 
  FileCode, 
  Code2, 
  Sparkles, 
  Copy, 
  Download, 
  ExternalLink,
  ChevronDown,
  Check,
  Terminal,
  ShieldAlert
} from 'lucide-react';
import { triggerConfetti } from '../utils/confetti';

export const MachineCodingArena = ({ questions = [], onMarkComplete }) => {
  const machineCodingList = questions.filter(q => q.category === 'Machine Coding');

  const defaultProblems = [
    {
      id: 'mc-1',
      title: 'Build Debounced Autocomplete Search with Caching',
      difficulty: 'Medium',
      notes: 'Build a production-grade autocomplete search component. Requirements: 300ms debounce, abort controller for out-of-order race conditions, keyboard navigation (Arrow Up/Down, Enter, Escape), cached query responses, and responsive dark UI.',
      tags: ['React', 'Debounce', 'Accessibility', 'Cache']
    },
    {
      id: 'mc-2',
      title: 'Infinite Scroll Feed with Virtualized List & Observer',
      difficulty: 'Hard',
      notes: 'Implement an infinite scroll list with IntersectionObserver. Must handle smooth loading skeletons, memory virtualization for 10k items, scroll restoration, and zero flickering.',
      tags: ['IntersectionObserver', 'Virtualization', 'Performance']
    },
    {
      id: 'mc-3',
      title: 'Interactive Kanban Board with Drag & Drop and LocalStorage',
      difficulty: 'Medium',
      notes: 'Build a multi-column Kanban board (Todo, In Progress, Review, Done). Support reordering tasks, column filters, persistent state in localStorage, and modal task creation.',
      tags: ['Drag and Drop', 'State Management', 'LocalStorage']
    }
  ];

  const availableProblems = machineCodingList.length > 0 ? machineCodingList : defaultProblems;

  const [selectedProblemId, setSelectedProblemId] = useState(availableProblems[0]?.id || 'mc-1');
  const selectedProblem = availableProblems.find(p => p.id === selectedProblemId) || availableProblems[0];

  // Timer states
  const [durationMinutes, setDurationMinutes] = useState(150); // 2.5 hours
  const [secondsRemaining, setSecondsRemaining] = useState(150 * 60);
  const [isActive, setIsActive] = useState(false);

  // Active Editor Tab ('solution' | 'architecture')
  const [activeTab, setActiveTab] = useState('solution');
  const [isCopied, setIsCopied] = useState(false);

  // Code editor starter templates
  const [solutionCode, setSolutionCode] = useState(
`import React, { useState, useEffect, useRef } from 'react';

/**
 * Machine Coding Solution: ${selectedProblem.title}
 * Time Limit: 2.5 Hours | Section 4 Round
 */
export default function Solution() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  // Handle keyboard accessibility and debounced data fetching
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const controller = new AbortController();
    setIsLoading(true);

    const timer = setTimeout(async () => {
      try {
        // Fetch or simulate search API call
        console.log("Searching for:", query);
        setIsLoading(false);
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error(err);
          setIsLoading(false);
        }
      }
    }, 300);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query]);

  return (
    <div className="p-6 max-w-xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-white">Component Preview</h2>
        <span className="text-xs text-emerald-400 font-mono">Status: Ready</span>
      </div>

      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type to search..."
          className="w-full bg-[#181920] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#FF5B4D]"
        />
        {isLoading && (
          <span className="absolute right-3 top-3 text-xs text-zinc-400 animate-spin">⏳</span>
        )}
      </div>
    </div>
  );
}`
  );

  const [architectureNotes, setArchitectureNotes] = useState(
`# Component Architecture & Design

## 1. State Model:
- query: string (user input)
- results: Array<Item> (active search matches)
- status: 'idle' | 'loading' | 'success' | 'error'
- cache: Map<string, Array<Item>> (memoized query cache)
- activeIndex: number (keyboard navigation index)

## 2. Edge Cases to Handle:
- Fast typing -> Debounce 300ms + AbortController for race conditions
- Empty query -> Clear results immediately without API trigger
- Arrow Up/Down navigation -> Wrap around or clamp within results length
- Enter key -> Select active option and close dropdown
- Escape key -> Blur input and dismiss menu
- Network drop -> User-friendly error retry badge

## 3. Deliverables Checklist:
- GitHub Repository with atomic commits
- Live Vercel / Netlify deployed link
- 1-2 min loom/video walkthrough`
  );

  // 6-Phase Interview Checklist
  const [checklist, setChecklist] = useState([
    { id: 1, text: "Clarify requirements, edge cases & scope (0-15m)", done: true },
    { id: 2, text: "Design component tree & state hierarchy (15-30m)", done: true },
    { id: 3, text: "Build base structure & responsive CSS layout (30-60m)", done: true },
    { id: 4, text: "Implement core business logic & event handlers (60-100m)", done: false },
    { id: 5, text: "Handle loading, empty, and error states (100-120m)", done: false },
    { id: 6, text: "Polish UX, accessibility & README deliverables (120-150m)", done: false }
  ]);

  // Countdown Timer effect
  useEffect(() => {
    let interval = null;
    if (isActive && secondsRemaining > 0) {
      interval = setInterval(() => {
        setSecondsRemaining(prev => prev - 1);
      }, 1000);
    } else if (secondsRemaining === 0 && isActive) {
      setIsActive(false);
      triggerConfetti();
      alert("⏰ Time's up for your 2.5h Machine Coding Round! Review your deliverables.");
    }
    return () => clearInterval(interval);
  }, [isActive, secondsRemaining]);

  const toggleChecklistItem = (id) => {
    setChecklist(prev => 
      prev.map(item => item.id === id ? { ...item, done: !item.done } : item)
    );
  };

  const formatTime = (secs) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    const pad = (n) => String(n).padStart(2, '0');
    return `${pad(h)}:${pad(m)}:${pad(s)}`;
  };

  const resetTimer = (mins) => {
    setIsActive(false);
    setDurationMinutes(mins);
    setSecondsRemaining(mins * 60);
  };

  const handleCopyCode = () => {
    const textToCopy = activeTab === 'solution' ? solutionCode : architectureNotes;
    navigator.clipboard.writeText(textToCopy);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleDownloadCode = () => {
    const content = activeTab === 'solution' ? solutionCode : architectureNotes;
    const filename = activeTab === 'solution' ? 'Solution.jsx' : 'Architecture.md';
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const completedCount = checklist.filter(c => c.done).length;
  const checklistPercentage = Math.round((completedCount / checklist.length) * 100);

  return (
    <div className="space-y-5">
      {/* ========================================================= */}
      {/* TOP SECTION: SELECTED PROBLEM CARD + 2.5H TIMER CONTROLS */}
      {/* ========================================================= */}
      <div className="bg-[#181920] border border-white/5 rounded-2xl p-5 sm:p-6 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-white/5 mb-4">
          {/* Top Left: Badges & Problem Selector */}
          <div className="space-y-1.5 flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#FF5B4D]/15 text-[#FF5B4D] border border-[#FF5B4D]/25">
                SECTION 4 ROUND
              </span>
              <span className="text-xs text-zinc-400 font-mono">
                Time Limit: 2.5 Hours (150m)
              </span>
              <span className="text-zinc-600">•</span>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold ${
                selectedProblem.difficulty === 'Hard' 
                  ? 'text-red-400 bg-red-500/10 border border-red-500/20' 
                  : 'text-amber-400 bg-amber-500/10 border border-amber-500/20'
              }`}>
                {selectedProblem.difficulty}
              </span>
            </div>

            {/* Dropdown Selector for problems */}
            <div className="flex items-center gap-2 pt-1">
              <span className="text-xs text-zinc-400 font-semibold flex-shrink-0">
                Selected Problem:
              </span>
              <select
                value={selectedProblemId}
                onChange={(e) => setSelectedProblemId(e.target.value)}
                className="bg-[#1F2027] border border-white/10 rounded-xl px-3 py-1.5 text-xs font-semibold text-white focus:outline-none focus:border-[#FF5B4D] cursor-pointer max-w-md truncate"
              >
                {availableProblems.map((prob) => (
                  <option key={prob.id} value={prob.id} className="bg-[#181920] text-white">
                    {prob.title} ({prob.difficulty})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Top Right: 2.5h Digital Countdown Timer Widget */}
          <div className="bg-[#121316] border border-white/10 rounded-2xl p-3 sm:p-4 flex items-center justify-between sm:justify-start gap-4 shadow-inner flex-shrink-0">
            <div className="text-left sm:text-center">
              <div className="text-[10px] uppercase tracking-wider text-zinc-400 font-semibold mb-0.5">
                Time Remaining
              </div>
              <div className="font-mono text-2xl sm:text-3xl font-extrabold text-[#FF5B4D] tracking-widest">
                {formatTime(secondsRemaining)}
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2">
              <div className="flex flex-col gap-1">
                <button
                  onClick={() => setIsActive(!isActive)}
                  className={`p-2.5 rounded-xl text-white font-semibold transition-all cursor-pointer ${
                    isActive 
                      ? 'bg-amber-500 hover:bg-amber-600 shadow-md shadow-amber-500/25' 
                      : 'bg-[#FF5B4D] hover:bg-[#FF4646] shadow-lg shadow-[#FF5B4D]/30'
                  }`}
                  title={isActive ? 'Pause Round Timer' : 'Start Round Timer'}
                >
                  {isActive ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                </button>
                <button
                  onClick={() => resetTimer(durationMinutes)}
                  className="p-2 rounded-xl bg-[#1E2028] text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  title="Reset Timer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Presets */}
              <div className="hidden sm:flex flex-col gap-1 text-[10px] font-mono">
                <button
                  onClick={() => resetTimer(30)}
                  className={`px-2 py-0.5 rounded transition-colors ${durationMinutes === 30 ? 'bg-[#FF5B4D] text-white' : 'bg-[#1E2028] text-zinc-400 hover:text-white'}`}
                >
                  30m
                </button>
                <button
                  onClick={() => resetTimer(60)}
                  className={`px-2 py-0.5 rounded transition-colors ${durationMinutes === 60 ? 'bg-[#FF5B4D] text-white' : 'bg-[#1E2028] text-zinc-400 hover:text-white'}`}
                >
                  1h
                </button>
                <button
                  onClick={() => resetTimer(150)}
                  className={`px-2 py-0.5 rounded transition-colors ${durationMinutes === 150 ? 'bg-[#FF5B4D] text-white font-bold' : 'bg-[#1E2028] text-zinc-400 hover:text-white'}`}
                >
                  2.5h
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Selected Problem Description & Tags */}
        <div className="space-y-2">
          <h2 className="text-base sm:text-lg font-bold text-white tracking-wide">
            {selectedProblem.title}
          </h2>
          <p className="text-xs text-zinc-300 leading-relaxed max-w-4xl">
            {selectedProblem.notes}
          </p>
          {selectedProblem.tags && selectedProblem.tags.length > 0 && (
            <div className="flex items-center gap-1.5 flex-wrap pt-1">
              <span className="text-[10px] text-zinc-500 font-mono">Focus Tags:</span>
              {selectedProblem.tags.map((tag, tIdx) => (
                <span key={tIdx} className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#22242E] text-zinc-300 border border-white/5">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2-COLUMN LAYOUT: BIG CODE SCREEN (LEFT) + CHECKLIST (RIGHT) */}
      {/* ========================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* BIG CODE SCREEN (Left / Main Panel - 8 Columns) */}
        <div className="lg:col-span-8 bg-[#181920] border border-white/5 rounded-2xl shadow-xl overflow-hidden flex flex-col">
          {/* Editor Header Bar */}
          <div className="h-12 bg-[#141519] border-b border-white/5 px-4 flex items-center justify-between gap-3">
            {/* Tabs */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setActiveTab('solution')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors cursor-pointer ${
                  activeTab === 'solution'
                    ? 'bg-[#1E2028] text-white border border-white/10'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Solution.jsx</span>
              </button>

              <button
                onClick={() => setActiveTab('architecture')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors cursor-pointer ${
                  activeTab === 'architecture'
                    ? 'bg-[#1E2028] text-white border border-white/10'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <FileCode className="w-3.5 h-3.5 text-amber-400" />
                <span>Architecture.md</span>
              </button>
            </div>

            {/* Actions: Copy & Download */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyCode}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-mono text-zinc-400 hover:text-white bg-[#1E2028] border border-white/5 hover:border-white/10 transition-colors cursor-pointer"
                title="Copy code to clipboard"
              >
                {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{isCopied ? 'Copied' : 'Copy'}</span>
              </button>

              <button
                onClick={handleDownloadCode}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-mono text-zinc-400 hover:text-white bg-[#1E2028] border border-white/5 hover:border-white/10 transition-colors cursor-pointer"
                title="Download file"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </button>
            </div>
          </div>

          {/* Big Code Textarea */}
          <div className="relative p-4 bg-[#0F1014] flex-1">
            <textarea
              value={activeTab === 'solution' ? solutionCode : architectureNotes}
              onChange={(e) => {
                if (activeTab === 'solution') {
                  setSolutionCode(e.target.value);
                } else {
                  setArchitectureNotes(e.target.value);
                }
              }}
              spellCheck="false"
              className="w-full min-h-[480px] bg-transparent font-mono text-xs sm:text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none resize-y leading-relaxed"
            />
          </div>

          {/* Editor Status Bar */}
          <div className="h-9 bg-[#141519] border-t border-white/5 px-4 flex items-center justify-between text-[11px] font-mono text-zinc-400">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>{activeTab === 'solution' ? 'React 19 (JSX)' : 'Markdown'}</span>
              </span>
              <span>•</span>
              <span>UTF-8</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="hidden sm:inline">Spaces: 2</span>
              <button
                onClick={() => {
                  triggerConfetti();
                  alert("🎉 Code and architecture notes saved in local session!");
                }}
                className="px-2.5 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/25 transition-colors cursor-pointer font-bold"
              >
                Save Code
              </button>
            </div>
          </div>
        </div>

        {/* CHECKLIST & ROUND SPECIFICATIONS (Right Panel - 4 Columns) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Round Checklist Card */}
          <div className="bg-[#181920] border border-white/5 rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#FF5B4D]" />
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  2.5h Round Checklist
                </h3>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-400">
                {completedCount} / {checklist.length} ({checklistPercentage}%)
              </span>
            </div>

            {/* Checklist Progress Bar */}
            <div className="h-1.5 w-full bg-[#242631] rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#FF5B4D] to-emerald-400 rounded-full transition-all duration-300"
                style={{ width: `${checklistPercentage}%` }}
              />
            </div>

            {/* Checkbox Items */}
            <div className="space-y-2">
              {checklist.map((item) => (
                <div
                  key={item.id}
                  onClick={() => toggleChecklistItem(item.id)}
                  className={`
                    flex items-start gap-2.5 p-3 rounded-xl border transition-all cursor-pointer text-xs
                    ${item.done 
                      ? 'bg-[#15161C] border-emerald-500/20 text-zinc-400' 
                      : 'bg-[#1F2027] border-white/5 text-zinc-200 hover:border-white/10'
                    }
                  `}
                >
                  <div className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center transition-colors flex-shrink-0 ${
                    item.done ? 'bg-emerald-500 text-white' : 'border border-zinc-600'
                  }`}>
                    {item.done && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                  <span className={`leading-snug ${item.done ? 'line-through text-zinc-500' : 'text-zinc-200 font-medium'}`}>
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Machine Coding Deliverables Box */}
          <div className="bg-[#181920] border border-white/5 rounded-2xl p-5 shadow-xl space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Evaluation Criteria
            </h4>

            <div className="space-y-2 text-xs text-zinc-300">
              <div className="p-2.5 rounded-xl bg-[#141519] border border-white/5">
                <span className="font-semibold text-white block mb-0.5">1. Resilient State Handling</span>
                <span className="text-[11px] text-zinc-400">Loading indicators, empty states, and error recovery must always be handled gracefully.</span>
              </div>

              <div className="p-2.5 rounded-xl bg-[#141519] border border-white/5">
                <span className="font-semibold text-white block mb-0.5">2. Separation of Concerns</span>
                <span className="text-[11px] text-zinc-400">Keep UI components focused, extract complex hooks, and isolate storage helpers.</span>
              </div>

              <div className="p-2.5 rounded-xl bg-[#141519] border border-white/5">
                <span className="font-semibold text-white block mb-0.5">3. Clean Deliverables</span>
                <span className="text-[11px] text-zinc-400">Clear README setup steps, responsive desktop/mobile styling, and local persistence.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
