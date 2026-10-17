import React, { useState, useEffect, useMemo } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { StatsCards } from './components/StatsCards';
import { ProgressBanner } from './components/ProgressBanner';
import { QuestionTracker } from './components/QuestionTracker';
import { MachineCodingTimer } from './components/MachineCodingTimer';
import { MachineCodingArena } from './components/MachineCodingArena';
import { PrepCheatSheetView } from './components/PrepCheatSheetView';
import { QuestionModal } from './components/QuestionModal';
import { DeleteConfirmModal } from './components/DeleteConfirmModal';
import { PrepGuidelinesModal } from './components/PrepGuidelinesModal';
import { 
  loadQuestionsFromStorage, 
  saveQuestionsToStorage, 
  resetQuestionsStorage,
  exportQuestionsJSON 
} from './utils/storage';
import { triggerConfetti } from './utils/confetti';

const App = () => {
  // Navigation & UI States
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' | 'tracker' | 'machine-coding' | 'cheatsheet'
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [deletingQuestion, setDeletingQuestion] = useState(null);
  const [isGuidelinesModalOpen, setIsGuidelinesModalOpen] = useState(false);

  // Main Questions State loaded from LocalStorage (defaults to [] if empty)
  const [questions, setQuestions] = useState(() => loadQuestionsFromStorage());

  // Save to LocalStorage whenever questions state changes
  useEffect(() => {
    saveQuestionsToStorage(questions);
  }, [questions]);

  // Comprehensive Computed Statistics (Guarded against division by zero)
  const stats = useMemo(() => {
    const total = questions.length;
    const completed = questions.filter((q) => q.status === 'Completed').length;
    const inProgress = questions.filter((q) => q.status === 'In Progress').length;
    const pending = questions.filter((q) => q.status === 'Pending').length;
    const overallPercentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    // DSA stats
    const dsaQuestions = questions.filter((q) => q.category === 'DSA');
    const dsaCompleted = dsaQuestions.filter((q) => q.status === 'Completed').length;
    const dsaPercentage = dsaQuestions.length > 0 
      ? Math.round((dsaCompleted / dsaQuestions.length) * 100) 
      : 0;

    // Git & Technical stats
    const gitQuestions = questions.filter((q) => q.category === 'Git');
    const gitCompleted = gitQuestions.filter((q) => q.status === 'Completed').length;

    const techQuestions = questions.filter((q) => q.category === 'Technical');
    const techCompleted = techQuestions.filter((q) => q.status === 'Completed').length;

    const technicalAndGitTotal = gitQuestions.length + techQuestions.length;
    const technicalAndGitCompleted = gitCompleted + techCompleted;
    const technicalAndGitPercentage = technicalAndGitTotal > 0
      ? Math.round((technicalAndGitCompleted / technicalAndGitTotal) * 100)
      : 0;

    // Machine Coding stats
    const mcQuestions = questions.filter((q) => q.category === 'Machine Coding');
    const mcCompleted = mcQuestions.filter((q) => q.status === 'Completed').length;
    const mcPercentage = mcQuestions.length > 0
      ? Math.round((mcCompleted / mcQuestions.length) * 100)
      : 0;

    return {
      total,
      completed,
      inProgress,
      pending,
      overallPercentage,
      dsa: {
        total: dsaQuestions.length,
        completed: dsaCompleted,
        percentage: dsaPercentage,
        easy: dsaQuestions.filter((q) => q.difficulty === 'Easy' && q.status === 'Completed').length,
        medium: dsaQuestions.filter((q) => q.difficulty === 'Medium' && q.status === 'Completed').length,
        hard: dsaQuestions.filter((q) => q.difficulty === 'Hard' && q.status === 'Completed').length,
      },
      git: {
        total: gitQuestions.length,
        completed: gitCompleted
      },
      technical: {
        total: techQuestions.length,
        completed: techCompleted
      },
      technicalAndGit: {
        total: technicalAndGitTotal,
        completed: technicalAndGitCompleted,
        percentage: technicalAndGitPercentage
      },
      machineCoding: {
        total: mcQuestions.length,
        completed: mcCompleted,
        percentage: mcPercentage
      }
    };
  }, [questions]);

  // Quick Cycle Status: Pending -> In Progress -> Completed -> Pending
  const handleToggleStatus = (id) => {
    setQuestions((prev) =>
      prev.map((q) => {
        if (q.id === id) {
          let nextStatus = 'In Progress';
          let completedAt = null;

          if (q.status === 'Pending') {
            nextStatus = 'In Progress';
          } else if (q.status === 'In Progress') {
            nextStatus = 'Completed';
            completedAt = new Date().toISOString().slice(0, 10);
            triggerConfetti();
          } else {
            nextStatus = 'Pending';
          }

          return { ...q, status: nextStatus, completedAt };
        }
        return q;
      })
    );
  };

  // Toggle Starred
  const handleToggleStar = (id) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, isStarred: !q.isStarred } : q))
    );
  };

  // Save (Create or Update) Question
  const handleSaveQuestion = (payload) => {
    setQuestions((prev) => {
      const exists = prev.some((q) => q.id === payload.id);
      if (exists) {
        return prev.map((q) => (q.id === payload.id ? payload : q));
      } else {
        return [payload, ...prev];
      }
    });

    if (payload.status === 'Completed') {
      triggerConfetti();
    }
  };

  // Delete Question
  const handleConfirmDelete = () => {
    if (deletingQuestion) {
      setQuestions((prev) => prev.filter((q) => q.id !== deletingQuestion.id));
      setDeletingQuestion(null);
    }
  };

  // Reset all questions back to initial state (all remaining/Pending, 0 completed)
  const handleResetData = () => {
    const defaults = resetQuestionsStorage();
    setQuestions(defaults);
    setSearchQuery('');
    setSelectedCategory('All');
  };

  // Export dataset to JSON
  const handleExportData = () => {
    exportQuestionsJSON(questions);
  };

  // Category selection shortcut from Stats cards
  const handleSelectCategoryFromStats = (category) => {
    setSelectedCategory(category);
    setActiveTab('tracker');
  };

  return (
    <div className="min-h-screen bg-[#121316] text-[#E2E8F0] flex">
      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
        stats={stats}
      />

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        {/* Sticky Header */}
        <Header
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onOpenAddModal={() => {
            setEditingQuestion(null);
            setIsAddModalOpen(true);
          }}
          onResetData={handleResetData}
          onExportData={handleExportData}
          onOpenMobileMenu={() => setIsMobileOpen(true)}
          totalQuestions={stats.total}
          completedQuestions={stats.completed}
        />

        {/* Dynamic Page Views */}
        <main className="p-3 sm:p-5 lg:p-7 flex-1 max-w-[1400px] w-full mx-auto">
          {/* TAB 1: DASHBOARD VIEW (Clean, Minimal, Requirement-Focused) */}
          {activeTab === 'dashboard' && (
            <div className="space-y-4 sm:space-y-6">
              {/* 4 Metric Stats Cards */}
              <StatsCards 
                stats={stats} 
                onSelectCategory={handleSelectCategoryFromStats} 
              />

              {/* Visual Completion Percentage & Category Distribution */}
              <ProgressBanner stats={stats} />

              {/* Question Tracker with Filters & Status Cycling */}
              <QuestionTracker
                questions={questions}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                onToggleStatus={handleToggleStatus}
                onToggleStar={handleToggleStar}
                onEdit={(q) => {
                  setEditingQuestion(q);
                  setIsAddModalOpen(true);
                }}
                onDelete={(q) => setDeletingQuestion(q)}
                onOpenAddModal={() => {
                  setEditingQuestion(null);
                  setIsAddModalOpen(true);
                }}
                onLoadSampleCurriculum={handleResetData}
              />

              {/* Machine Coding Round Practice Timer */}
              <MachineCodingTimer
                machineCodingQuestions={questions.filter(q => q.category === 'Machine Coding')}
                onMarkComplete={handleToggleStatus}
              />
            </div>
          )}

          {/* TAB 2: QUESTIONS TRACKER (Full View) */}
          {activeTab === 'tracker' && (
            <div className="space-y-4 sm:space-y-6">
              <QuestionTracker
                questions={questions}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                onToggleStatus={handleToggleStatus}
                onToggleStar={handleToggleStar}
                onEdit={(q) => {
                  setEditingQuestion(q);
                  setIsAddModalOpen(true);
                }}
                onDelete={(q) => setDeletingQuestion(q)}
                onOpenAddModal={() => {
                  setEditingQuestion(null);
                  setIsAddModalOpen(true);
                }}
                onLoadSampleCurriculum={handleResetData}
              />
            </div>
          )}

          {/* TAB 3: MACHINE CODING ARENA */}
          {activeTab === 'machine-coding' && (
            <MachineCodingArena
              questions={questions}
              onMarkComplete={handleToggleStatus}
            />
          )}

          {/* TAB 4: PREP GUIDELINES & ETHICS */}
          {activeTab === 'cheatsheet' && (
            <PrepCheatSheetView />
          )}
        </main>
      </div>

      {/* Add / Edit Question Modal */}
      <QuestionModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingQuestion(null);
        }}
        onSave={handleSaveQuestion}
        initialData={editingQuestion}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={Boolean(deletingQuestion)}
        onClose={() => setDeletingQuestion(null)}
        onConfirm={handleConfirmDelete}
        questionTitle={deletingQuestion?.title}
      />

      {/* Guidelines Modal */}
      <PrepGuidelinesModal
        isOpen={isGuidelinesModalOpen}
        onClose={() => setIsGuidelinesModalOpen(false)}
      />
    </div>
  );
};

export default App;
