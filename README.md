# AlgoVista — AI-Powered Algorithm Learning Platform

**Understand Algorithms. Visualize Every Step. Master Complexity.**

AlgoVista is a complete, responsive, interactive educational web platform built for computer science and engineering students. It integrates rigorous theoretical foundations, worked examples, deterministic step-by-step execution visualizers, asymptotic complexity analysis, numerical solvers, curated YouTube video resources in Hindi and English, and AI-powered tutoring and quiz generation.

---

## 🌟 Key Features

### 1. Algorithm Curriculum (Categories A to M)
- **Algorithm Fundamentals**: Definitions, Knuth criteria, correctness, pseudocode, iterative vs recursive paradigms.
- **Asymptotic Analysis**: Big O, Big Omega, Big Theta bounds, growth hierarchy, auxiliary vs total space, amortized bounds.
- **Searching Algorithms**: Linear Search, Binary Search (with overflow prevention and answer search).
- **Sorting Algorithms**: Bubble, Selection, Insertion, Merge, Quick, and Heap sort with complete invariants.
- **Divide & Conquer**: Recurrence trees, Master Theorem relations, subproblem division.
- **Greedy Algorithms**: Fractional Knapsack, Dijkstra's Single Source Shortest Path.
- **Dynamic Programming**: 0/1 Knapsack, Longest Common Subsequence (LCS), Matrix Chain Multiplication.
- **Graph Algorithms**: BFS, DFS, Dijkstra, Bellman-Ford, Prim's and Kruskal's MST.
- **Backtracking**: N-Queens problem with row-by-row conflict pruning.
- **Recurrence Relations**: Master Theorem cookbook cases and boundary conditions.

### 2. Standard 23-Field Learning Pages
Every algorithm features:
1. Algorithm Name & Category
2. Simple Introduction
3. Why Useful
4. Real-World Applications
5. Prerequisites
6. Core Intuitive Idea
7. Step-by-Step Breakdown
8. Pseudocode
9. Syntax-Highlighted JavaScript Implementation (with 1-click Copy)
10. Example Input
11. Worked Example with intermediate states
12. Direct jump into Interactive Visualizer
13. Time Complexity (Best, Average, Worst & derivation)
14. Auxiliary Space and Total Memory analysis
15. Advantages
16. Limitations
17. Comparison with related algorithms
18. Common Student Mistakes & Misconceptions
19. Technical Interview & Exam Questions with expandable answers
20. Curated YouTube Video Resources (Hindi & English tabs)
21. "Ask AI About This Algorithm" (auto-attaches context)
22. "Generate Quiz" shortcut
23. "Mark as Completed" tracking

### 3. Interactive Algorithm Visualizers
- **Sorting Visualizer**: Real execution traces for Bubble, Selection, Insertion, Merge, Quick, and Heap sort. Displays animated bars with numerical values, color-coded comparisons, swaps, pivots, sorted states, step counters, and compare mode (side-by-side execution on identical inputs).
- **Searching Visualizer**: Linear & Binary Search with low, mid, and high pointers, range updates, and match indicators.
- **Graph Visualizer**: Interactive SVG graph rendering nodes, weighted edges, distance relaxation tables, and shortest path trees.
- **Dynamic Programming Visualizer**: 2D DP matrix highlighting current cell, source cells, recurrence formula banner, and final traceback.
- **Backtracking Visualizer**: N-Queens chessboard with placed queens, conflict highlights, and backtrack step logging.
- **Controls**: Play, Pause, Step Next, Step Back, Reset, Run to Completion, Speed slider (1x to 10x), Random array generator, Custom array input, Sorted & Reverse presets.

### 4. Complexity Lab
- **Asymptotic Growth Curves**: Interactive SVG graph plotting $O(1)$, $O(\log n)$, $O(n)$, $O(n \log n)$, $O(n^2)$, $O(n^3)$, $O(2^n)$, $O(n!)$ with adjustable $n$ slider (10 to 80) and toggleable curves.
- **Algorithm Comparison Matrix**: Side-by-side comparison of 2 or 3 algorithms evaluating best/avg/worst time, space, stability, in-place behavior, and practical trade-offs.
- **Live In-Browser Benchmark**: Real JavaScript runtime performance measurements using `performance.now()`, averaged over 3 iterations, with bar charts and device disclaimers.

### 5. Numerical Problem Solver
Step-by-step mathematical problem solvers for university exams:
- **Master Theorem Solver**: Solves $T(n) = aT(n/b) + \Theta(n^k \log^p n)$, determines Case 1, 2, or 3, validates condition boundaries, and outputs $\Theta$ bounds.
- **Fractional Knapsack Solver**: Greedily calculates value-to-weight ratios, sorts items, calculates fractional shares, and displays the total profit.
- **0/1 Knapsack DP Solver**: Fills $(n+1) \times (W+1)$ DP matrix, applies recurrence formulas, and backtracks selected items.
- **LCS Solver**: Fills $2D$ matrix and reconstructs the longest common subsequence string.
- **Matrix Chain Multiplication Solver**: Calculates $m[i,j]$ cost and $s[i,j]$ split tables, generating optimal parenthesization.

### 6. AI Tutor Powered by Groq
- Dedicated AI Tutor page and universal floating widget.
- Model: LLaMA 3.3 70B Versatile via official Groq API.
- Explains concepts in clear **English** or conversational **Hindi / Hinglish**.
- Adapts explanations to Beginner, Intermediate, and Advanced skill levels.
- Automatically captures current topic context when opened from an algorithm page.
- 100% resilient: If Groq API key is not configured, provides offline answers so learning remains uninterrupted.

### 7. AI Quiz Center
- Custom quiz generation on any category/algorithm.
- Configurable difficulty (Easy, Medium, Hard), question count (5, 10), and language (English, Hindi).
- Real-time scoring, option explanations, percentage summary, and LocalStorage recording.
- High-quality offline question bank for instant testing without API keys.

### 8. Curated YouTube Learning Resources
- Verified video catalogue (`public/js/resources.js`) featuring top educators: Abdul Bari, Gate Smashers, Jenny's Lectures, and Striver.
- Language filters: "Both Languages", "Hindi Only", "English Only".
- Cleanly labeled search fallbacks for comprehensive topic coverage. Zero fake video links.

### 9. Progress Tracking & Personalization
- LocalStorage persistence for:
  - Theme preference (Light / Dark mode)
  - Completed topics and category mastery meters
  - Quiz scores and dates
  - Study streak tracker
  - Learning preferences (language, skill level, goal: Semester Exams, Interviews, Competitive Programming)
- Prerequisite-based recommended next topics.
- Reset progress option with confirmation dialog.

---

## 🛠️ Technology Stack

- **Frontend**: HTML5, Vanilla CSS3, Vanilla ES6+ JavaScript.
- **Backend**: Minimal Node.js & Express server acting purely as the secure Groq API proxy and static asset server.
- **AI Service**: Groq API (`groq-sdk`, model `qwen/qwen3.8-27b` or `llama-3.3-70b-versatile`).
- **Storage**: LocalStorage API with in-memory fallback.
- **Strict Constraints Met**: No React, Vue, Angular, Bootstrap, database, or exposed client API keys.

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- Node.js (v18.x or higher installed)
- npm (v9.x or higher)

### 2. Installation
Open your terminal in the project root:
```bash
npm install
```

### 3. Configure Groq API Key (Optional but Recommended)
To enable real-time Groq AI Tutor and Dynamic AI Quizzes:
1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
2. Open `.env` and add your Groq API key:
   ```env
   PORT=3000
   GROQ_API_KEY=gsk_your_actual_key_here
   GROQ_MODEL=qwen/qwen3.8-27b
   ```
*(Note: If you do not have a Groq key yet, you can still run the project immediately. All deterministic algorithms, visualizers, complexity tools, solvers, and curated resources work completely offline!)*

### 4. Start the Application
```bash
npm start
```
The application will launch on:
```
http://localhost:3000
```

Open `http://localhost:3000` in your web browser.

---

## 🧪 Feature Testing Checklist

- [x] **Dashboard**: Loads overview stats, study streak, categories, and suggested next topics.
- [x] **Global Search**: Type `/` or click search, search for "Quick" or "Dijkstra" -> instant filtered dropdown.
- [x] **Theme Toggle**: Click the moon/sun icon in the sidebar or Settings -> smooth transition between Light and Dark mode.
- [x] **Curriculum**: Navigate to "Learn Algorithms", open any algorithm (e.g. Merge Sort) -> displays all 23 standard fields.
- [x] **Visualizer**:
  - Run Bubble Sort with step-by-step playback, speed changes, custom comma-separated inputs.
  - Enable "Compare 2" mode -> runs Bubble Sort vs Quick Sort side-by-side with comparisons/swaps counters.
  - Switch tabs to Searching (Binary Search), Graphs (Dijkstra), DP (0/1 Knapsack table), and Backtracking (N-Queens).
- [x] **Complexity Lab**: Adjust $n$ slider -> SVG asymptotic curves update smoothly. Run live benchmark -> measures JavaScript execution with `performance.now()`.
- [x] **Numerical Solver**: Test Master Theorem parameters (e.g. $a=2, b=2, k=1$) -> derives Case 2 $\Theta(n \log n)$. Test Fractional Knapsack and MCM.
- [x] **AI Tutor**: Floating chat widget or dedicated page -> handles user questions, prompt pills, and context injection.
- [x] **Quiz Center**: Generate quiz, select answers, inspect question explanations, score card recorded to LocalStorage.
- [x] **YouTube Resources**: Filter by Hindi / English -> verified video cards and direct links.
- [x] **Progress Tracking**: Completed topics and quiz results update metrics immediately and persist after refresh.

---

## 📄 License
MIT License. Created for computer science academic education.
