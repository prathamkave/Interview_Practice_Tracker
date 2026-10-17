import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Timer as TimerIcon, 
  CheckCircle2, 
  Layers
} from 'lucide-react';
import { triggerConfetti } from '../utils/confetti';

export const MachineCodingTimer = ({ machineCodingQuestions = [], onMarkComplete }) => {
  const DEFAULT_SECONDS = 150 * 60; // 2.5 hours = 150 minutes
  const [targetSeconds, setTargetSeconds] = useState(DEFAULT_SECONDS);
  const [secondsRemaining, setSecondsRemaining] = useState(DEFAULT_SECONDS);
  const [isActive, setIsActive] = useState(false);
  const [selectedTaskIndex, setSelectedTaskIndex] = useState(0);

  const activeTask = machineCodingQuestions[selectedTaskIndex] || {
    id: 'mc-default',
    title: 'Frontend Machine Coding Practice Round',
    difficulty: 'Medium',
    status: 'In Progress'
  };

  useEffect(() => {
    let interval = null;
    if (isActive && secondsRemaining > 0) {
      interval = setInterval(() => {
        setSecondsRemaining((prev) => prev - 1);
      }, 1000);
    } else if (secondsRemaining === 0 && isActive) {
      setIsActive(false);
      triggerConfetti();
      alert("⏰ Time's up for your 2.5h Machine Coding Round! Review your deliverables.");
    }
    return () => clearInterval(interval);
  }, [isActive, secondsRemaining]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = (newDurationMinutes = 150) => {
    setIsActive(false);
    const secs = newDurationMinutes * 60;
    setTargetSeconds(secs);
    setSecondsRemaining(secs);
  };

  const formatTime = (totalSecs) => {
    const hours = Math.floor(totalSecs / 3600);
    const minutes = Math.floor((totalSecs % 3600) / 60);
    const secs = totalSecs % 60;
    const pad = (n) => String(n).padStart(2, '0');
    return `${hours > 0 ? `${pad(hours)}:` : ''}${pad(minutes)}:${pad(secs)}`;
  };

  const progressPercent = Math.min(
    100,
    Math.max(0, ((targetSeconds - secondsRemaining) / targetSeconds) * 100)
  );

  return (
    <div className="bg-[#181920] border border-white/5 rounded-2xl p-5 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#FF5B4D]/15 border border-[#FF5B4D]/25 flex items-center justify-center text-[#FF5B4D]">
            <TimerIcon className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white tracking-wider uppercase">
              Machine Coding Round Timer
            </h3>
            <p className="text-[10px] text-zinc-400">
              2.5-Hour Simulation Constraint
            </p>
          </div>
        </div>

        {/* Quick Presets */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => resetTimer(30)}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-mono transition-colors cursor-pointer ${
              targetSeconds === 30 * 60 
                ? 'bg-[#FF5B4D] text-white font-bold shadow-sm shadow-[#FF5B4D]/30' 
                : 'bg-[#22242E] text-zinc-400 hover:text-white'
            }`}
          >
            30m
          </button>
          <button
            onClick={() => resetTimer(60)}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-mono transition-colors cursor-pointer ${
              targetSeconds === 60 * 60 
                ? 'bg-[#FF5B4D] text-white font-bold shadow-sm shadow-[#FF5B4D]/30' 
                : 'bg-[#22242E] text-zinc-400 hover:text-white'
            }`}
          >
            1h
          </button>
          <button
            onClick={() => resetTimer(150)}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-mono transition-colors cursor-pointer ${
              targetSeconds === 150 * 60 
                ? 'bg-[#FF5B4D] text-white font-bold shadow-sm shadow-[#FF5B4D]/30' 
                : 'bg-[#22242E] text-zinc-400 hover:text-white'
            }`}
          >
            2.5h (Test)
          </button>
        </div>
      </div>

      {/* Active task container */}
      <div className="bg-[#1F2027] border border-white/5 rounded-xl p-3.5 mb-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${isActive ? 'bg-[#FF5B4D] animate-ping' : 'bg-zinc-600'}`} />
            <div className="min-w-0">
              <div className="text-xs font-bold text-white truncate">
                {activeTask.title}
              </div>
              <div className="text-[10px] text-zinc-400 flex items-center gap-2 mt-0.5">
                <span className="text-amber-400 font-medium">{activeTask.difficulty} Difficulty</span>
                <span>•</span>
                <span>Timed Practice Round</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0 self-end sm:self-center">
            <div className="font-mono text-sm sm:text-base font-bold text-white bg-[#141519] px-3 py-1 rounded-lg border border-white/5 tracking-wider">
              {formatTime(secondsRemaining)}
            </div>

            <button
              onClick={toggleTimer}
              className={`p-2 rounded-lg font-medium transition-all cursor-pointer ${
                isActive 
                  ? 'bg-amber-500/20 text-amber-400 hover:bg-amber-500/30 border border-amber-500/30' 
                  : 'bg-[#FF5B4D] text-white hover:bg-[#FF4646] shadow-md shadow-[#FF5B4D]/30'
              }`}
              title={isActive ? 'Pause Timer' : 'Start Timer'}
            >
              {isActive ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
            </button>

            <button
              onClick={() => resetTimer(targetSeconds / 60)}
              className="p-2 rounded-lg bg-[#141519] text-zinc-400 hover:text-white border border-white/5 hover:bg-[#2A2B35] transition-colors cursor-pointer"
              title="Reset Timer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Progress Bar of elapsed session */}
        <div className="mt-3">
          <div className="h-1.5 w-full bg-[#141519] rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#FF5B4D] to-[#E03A2B] rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Task switcher pills */}
      {machineCodingQuestions.length > 1 && (
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px] scrollbar-none">
          <span className="text-[10px] text-zinc-500 font-mono flex-shrink-0">Select Task:</span>
          {machineCodingQuestions.map((q, idx) => (
            <button
              key={q.id}
              onClick={() => {
                setSelectedTaskIndex(idx);
                setIsActive(false);
              }}
              className={`px-2.5 py-1 rounded-md text-[10px] font-medium truncate max-w-[180px] transition-colors cursor-pointer ${
                selectedTaskIndex === idx
                  ? 'bg-[#FF5B4D]/20 text-[#FF5B4D] border border-[#FF5B4D]/40 font-semibold'
                  : 'bg-[#1F2027] text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {q.title}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
