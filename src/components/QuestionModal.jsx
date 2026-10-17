import React, { useState, useEffect } from 'react';
import { X, Sparkles, AlertCircle, Link2, FileText, Tag, BarChart3, Bookmark } from 'lucide-react';
import { CATEGORIES, DIFFICULTIES, STATUSES } from '../data/initialQuestions';

export const QuestionModal = ({ 
  isOpen, 
  onClose, 
  onSave, 
  initialData = null 
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('DSA');
  const [difficulty, setDifficulty] = useState('Medium');
  const [status, setStatus] = useState('Pending');
  const [tagsInput, setTagsInput] = useState('');
  const [link, setLink] = useState('');
  const [notes, setNotes] = useState('');
  const [targetWeek, setTargetWeek] = useState('Week 1');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setCategory(initialData.category || 'DSA');
      setDifficulty(initialData.difficulty || 'Medium');
      setStatus(initialData.status || 'Pending');
      setTagsInput(Array.isArray(initialData.tags) ? initialData.tags.join(', ') : '');
      setLink(initialData.link || '');
      setNotes(initialData.notes || '');
      setTargetWeek(initialData.targetWeek || 'Week 1');
    } else {
      setTitle('');
      setCategory('DSA');
      setDifficulty('Medium');
      setStatus('Pending');
      setTagsInput('');
      setLink('');
      setNotes('');
      setTargetWeek('Week 1');
    }
    setErrors({});
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors = {};
    if (!title.trim()) {
      newErrors.title = 'Question title is required';
    } else if (title.trim().length < 4) {
      newErrors.title = 'Title must be at least 4 characters long';
    }

    if (!category || category === 'All') {
      newErrors.category = 'Please select a valid category';
    }
    if (!difficulty || difficulty === 'All') {
      newErrors.difficulty = 'Please select a difficulty';
    }
    if (!status || status === 'All') {
      newErrors.status = 'Please select a valid status';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const parsedTags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const questionPayload = {
      id: initialData ? initialData.id : `q-${Date.now()}`,
      title: title.trim(),
      category,
      difficulty,
      status,
      tags: parsedTags,
      link: link.trim(),
      notes: notes.trim(),
      targetWeek,
      dateAdded: initialData ? initialData.dateAdded : new Date().toISOString().slice(0, 10),
      completedAt: status === 'Completed' 
        ? (initialData?.completedAt || new Date().toISOString().slice(0, 10)) 
        : null,
      isStarred: initialData ? initialData.isStarred : false
    };

    onSave(questionPayload);
    onClose();
  };

  const availableCategories = CATEGORIES.filter(c => c !== 'All');
  const availableDifficulties = DIFFICULTIES.filter(d => d !== 'All');
  const availableStatuses = STATUSES.filter(s => s !== 'All');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-xl bg-[#181920] border border-white/10 rounded-2xl p-6 sm:p-7 shadow-2xl z-10 max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#FF5B4D]/15 border border-[#FF5B4D]/25 flex items-center justify-center text-[#FF5B4D]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-wide">
                {initialData ? 'Edit Practice Question' : 'Add Interview Question'}
              </h3>
              <p className="text-xs text-zinc-400">
                Track and structure your weekly preparation
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Question Title */}
          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
              Question / Task Title <span className="text-[#FF5B4D]">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Implement LRU Cache or React Debounced Search"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full bg-[#1F2027] border ${
                errors.title ? 'border-red-500' : 'border-white/10'
              } rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#FF5B4D] focus:ring-1 focus:ring-[#FF5B4D] transition-all`}
            />
            {errors.title && (
              <p className="mt-1 text-[11px] text-red-400 flex items-center gap-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.title}
              </p>
            )}
          </div>

          {/* Category, Difficulty & Status Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Category */}
            <div>
              <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                Category <span className="text-[#FF5B4D]">*</span>
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-[#1F2027] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FF5B4D] transition-all cursor-pointer"
              >
                {availableCategories.map((c) => (
                  <option key={c} value={c} className="bg-[#181920] text-white">
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Difficulty */}
            <div>
              <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                Difficulty <span className="text-[#FF5B4D]">*</span>
              </label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full bg-[#1F2027] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FF5B4D] transition-all cursor-pointer"
              >
                {availableDifficulties.map((d) => (
                  <option key={d} value={d} className="bg-[#181920] text-white">
                    {d}
                  </option>
                ))}
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                Status <span className="text-[#FF5B4D]">*</span>
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full bg-[#1F2027] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FF5B4D] transition-all cursor-pointer"
              >
                {availableStatuses.map((s) => (
                  <option key={s} value={s} className="bg-[#181920] text-white">
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Tags & Target Week */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                Tags (Comma Separated)
              </label>
              <div className="relative">
                <Tag className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  placeholder="e.g. Arrays, Memoization, React"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  className="w-full bg-[#1F2027] border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#FF5B4D] transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
                Target Week
              </label>
              <input
                type="text"
                placeholder="e.g. Week 1, Sprint 4"
                value={targetWeek}
                onChange={(e) => setTargetWeek(e.target.value)}
                className="w-full bg-[#1F2027] border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#FF5B4D] transition-all"
              />
            </div>
          </div>

          {/* External Link */}
          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
              Reference / Problem Link (LeetCode, GitHub, MDN)
            </label>
            <div className="relative">
              <Link2 className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="url"
                placeholder="https://leetcode.com/problems/..."
                value={link}
                onChange={(e) => setLink(e.target.value)}
                className="w-full bg-[#1F2027] border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#FF5B4D] transition-all"
              />
            </div>
          </div>

          {/* Notes & Solution Summary */}
          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1.5">
              Solution Approach / Key Interview Takeaways
            </label>
            <textarea
              rows={3}
              placeholder="e.g. Two-pointer technique, time complexity O(N), edge cases: null nodes, empty strings..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-[#1F2027] border border-white/10 rounded-xl p-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#FF5B4D] transition-all resize-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#FF5B4D] to-[#E03A2B] text-white font-semibold text-xs shadow-lg shadow-[#FF5B4D]/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              {initialData ? 'Update Question' : 'Save Question'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
