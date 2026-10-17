import { INITIAL_QUESTIONS } from '../data/initialQuestions';

const STORAGE_KEY = 'interview_practice_tracker_v4';

// Load stored questions; if none exist, initializes with all questions set to Pending (remaining)
export const loadQuestionsFromStorage = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_QUESTIONS));
      return INITIAL_QUESTIONS;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_QUESTIONS));
      return INITIAL_QUESTIONS;
    }
    return parsed;
  } catch (err) {
    console.error("Failed to load questions from localStorage:", err);
    return INITIAL_QUESTIONS;
  }
};

// Persist any user change (completion, editing, adding, deleting) to localStorage
export const saveQuestionsToStorage = (questions) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(questions));
  } catch (err) {
    console.error("Failed to save questions to localStorage:", err);
  }
};

// Reset data back to initial remaining state (all Pending, 0 completed)
export const resetQuestionsStorage = () => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_QUESTIONS));
    return INITIAL_QUESTIONS;
  } catch (err) {
    console.error("Failed to reset questions:", err);
    return INITIAL_QUESTIONS;
  }
};

export const exportQuestionsJSON = (questions) => {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(questions, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `interview_practice_tracker_${new Date().toISOString().slice(0, 10)}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
};
