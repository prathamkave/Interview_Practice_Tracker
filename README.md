# Interview Practice Tracker (Frontend Machine Coding Round - Section 4)

[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-purple.svg)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38B2AC.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> **A high-performance, responsive dark-mode dashboard built for candidates to organize, track, and master their weekly interview-preparation workflow across DSA, Git, Technical Concepts, and 2.5-hour Machine Coding rounds.**

---

## 📸 Design Inspiration & Aesthetics
Inspired by modern dark developer command centers (charcoal obsidian base `#121316`, card surfaces `#181920`, vibrant coral `#FF5B4D`, golden amber `#F59E0B`, and emerald `#10B981` accents with micro-animations and confetti celebrations).

---

## 🌟 Key Features (Mapped to Section 4 Specifications)

### 1. Interactive Dashboard Overview
- **Total Questions Counter**: Real-time snapshot of questions tracked across all categories.
- **DSA Problems Solved**: Live counter, visual percentage progress bar, and difficulty breakdown (Easy, Medium, Hard).
- **Core Interview Questions**: Mastered metrics for Git workflows and core Technical / Web Performance concepts.
- **Machine Coding Status**: Track completed projects with interactive round timer and checklist.
- **Visual Progress**: Dynamic multi-color progress bars matching the coral and amber indicators in the design spec.

### 2. Comprehensive Question Tracker
- **Add / Edit Modal**: Fast modal with inline input validation:
  - Title (required, min 4 characters)
  - Category: `DSA`, `Git`, `Technical`, `Machine Coding`
  - Difficulty: `Easy`, `Medium`, `Hard`
  - Status: `Pending`, `In Progress`, `Completed`
  - Topic Tags (comma-separated with auto-tagging)
  - External Link (LeetCode, GitHub, MDN, documentation)
  - Solution Approach / Interview Notes (expandable inline card)
  - Target Week (e.g. `Week 1`, `Sprint 4`)
- **Quick Status Cycling**: Single-click on the status circle to cycle smoothly:  
  `Pending` ⚪ ➔ `In Progress` 🟡 ➔ `Completed` 🟢 *(triggers celebratory confetti!)*
- **Inline Expandable Notes**: Click to reveal solution notes, complexities, and completion timestamps without navigating away.
- **Favorites / Starred Toggle**: Star key questions for rapid revision before interviews.
- **Safe Deletion**: Deletion confirmation modal prevents accidental data loss.

### 3. Reactive Search & Multi-Criteria Filtering
- **Instant Search**: Debounced real-time search across question titles, notes, and tags.
- **Category Filter Pills**: Filter instantly by `All`, `DSA`, `Git`, `Technical`, and `Machine Coding`.
- **Status Filter**: Filter by `All`, `Pending`, `In Progress`, and `Completed`.
- **Difficulty Filter**: Filter by `All`, `Easy`, `Medium`, and `Hard`.
- **Multi-Sort**: Sort by `Newest Added`, `Oldest Added`, `Difficulty (Hard to Easy)`, or `Alphabetical (A-Z)`.
- **Starred Filter**: Instant toggle to view only bookmarked questions.
- **One-Click Reset**: Resets all active filters back to default.

### 4. 2.5-Hour Machine Coding Round Arena & Timer
- **Live Interview Timer**: Dedicated 2.5-hour countdown timer simulating actual frontend machine coding constraints.
- **Presets**: Quick-switch between 30m, 1h, and 2.5h simulation drills.
- **Interactive Checklist**: 6-phase interview methodology checklist:
  1. Clarify requirements & edge cases (0-15m)
  2. Component tree & state design (15-30m)
  3. Base structure & CSS layout (30-60m)
  4. Core logic & handlers (60-100m)
  5. Loading, empty & error states (100-120m)
  6. Accessibility & documentation polish (120-150m)
- **Candidate Architecture Scratchpad**: In-browser scratchpad for drafting state models and edge cases.

### 5. Data Persistence & Backup
- **LocalStorage Engine**: Zero backend required; all edits, status cycles, and additions persist across page reloads.
- **Pre-populated Curriculum**: Comes pre-loaded with high-yield interview questions across all 4 tracks.
- **JSON Export**: Export full question database as a portable `.json` backup file.
- **Reset to Defaults**: One-click demo restore for examiners and reviewers.

### 6. Edge Case States
- **Empty State**: Friendly illustration and "Add First Question" call-to-action when list is empty.
- **No Search Results State**: Clean empty state with "Clear All Filters" button when search criteria yield zero results.
- **Form Validation**: Real-time error messages preventing blank submissions or malformed links.

### 7. Responsive Desktop & Mobile Layout
- **Desktop**: Clean, unified dashboard with key performance metrics, real-time progress bars, questions tracker, and 2.5-hour practice timer.
- **Tablet & Mobile**: Sliding drawer sidebar, collapsible filters, and stacked responsive cards.

---

## 🛠️ Tech Stack & Architecture

- **Framework**: [React 19](https://react.dev/) + [Vite 8](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with modern dark slate palettes and fluid typography
- **Typography**: [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) & [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Celebration Effects**: [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)
- **Storage**: Browser `localStorage` API

### Component Hierarchy
```
src/
├── components/
│   ├── Sidebar.jsx               # Navigation, brand identity, mobile drawer
│   ├── Header.jsx                # Global search, "+ Add Question" CTA, export & reset
│   ├── StatsCards.jsx            # 4 metric cards (Total, DSA, Tech/Git, Machine Coding)
│   ├── ProgressBanner.jsx        # Visual completion percentage & category distribution
│   ├── QuestionTracker.jsx       # Filter pills, sorting, search, question row list
│   ├── QuestionItem.jsx          # Individual row with status cycling, tags & inline notes
│   ├── QuestionModal.jsx         # Add/Edit question modal with form validation
│   ├── DeleteConfirmModal.jsx    # Safe deletion dialog
│   ├── MachineCodingTimer.jsx    # 2.5h timer widget with play/pause/reset
│   ├── MachineCodingArena.jsx    # Dedicated full-view simulation arena with checklist
│   └── PrepCheatSheetView.jsx    # Section 4 guidelines, Git commands & ethics rules
├── data/
│   └── initialQuestions.js       # Curated initial questions & schema constants
├── utils/
│   ├── storage.js                # LocalStorage get/set/export/reset helpers
│   └── confetti.js               # Canvas confetti celebratory triggers
├── App.jsx                       # Main application state orchestration
├── main.jsx                      # React 19 root mounting
└── index.css                     # Tailwind v4 import & design system tokens
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) (v9 or higher)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/prathamkave/Interview_Practice_Tracker.git
   cd Interview_Practice_Tracker
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173/`.

4. Build for production:
   ```bash
   npm run build
   ```

5. Preview production build locally:
   ```bash
   npm run preview
   ```

---

## 🎯 Assumptions & Design Decisions
1. **No External Backend**: As specified in Section 4 guidelines, backend is not required. All data is reliably persisted in the user's browser `localStorage`.
2. **2.5 Hours Timebox**: The timer widget defaults to 150 minutes (2.5 hours) to mirror the exact Section 4 machine-coding round constraint.
3. **Status Progression**: Status cycling follows the natural interview prep progression (`Pending` ➔ `In Progress` ➔ `Completed` ➔ `Pending`) for zero-friction updates.
4. **Starter Curriculum**: Pre-populated with realistic frontend topics (LRU Cache, Trapping Rain Water, React Fiber, Event Loop, Git Interactive Rebase, Autocomplete component) so reviewers can test all views immediately without manual data entry.

---

## ⚖️ AI & Integrity Statement
> *"This is practice, not a competition for who can copy fastest. Use AI/GPT as a learning assistant to understand concepts, debug, compare approaches, or get hints. The final implementation must be understood by you. You should be able to explain your code in an interview."*

---

## 📄 License
MIT © 2026 Pratham Kave
