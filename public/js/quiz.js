/**
 * ADA Explorer - Quiz Center Controller
 * Dynamic AI Quiz generation powered by Groq (/api/quiz),
 * with built-in curriculum question banks for instant zero-config testing.
 */

const FALLBACK_QUIZ_BANK = {
  'merge-sort': [
    {
      id: 1,
      type: 'complexity',
      question: 'What is the worst-case time complexity of Merge Sort on an array of n elements?',
      options: ['O(n)', 'O(n log n)', 'O(n^2)', 'O(log n)'],
      correctIndex: 1,
      explanation: 'Merge Sort always divides the array into two halves (log n levels) and performs O(n) work per level to merge. Recurrence T(n) = 2T(n/2) + O(n) = Θ(n log n) in all cases.'
    },
    {
      id: 2,
      type: 'conceptual',
      question: 'Is standard array-based Merge Sort in-place and stable?',
      options: [
        'Both in-place and stable',
        'In-place, but not stable',
        'Stable, but not in-place (requires O(n) auxiliary space)',
        'Neither in-place nor stable'
      ],
      correctIndex: 2,
      explanation: 'Standard Merge Sort is stable (equal elements maintain relative order during <= merge checks), but requires O(n) auxiliary array buffer, making it not in-place.'
    },
    {
      id: 3,
      type: 'output_prediction',
      question: 'For input array [38, 27, 43, 3, 9, 82, 10], what is the state of the first merged 2-element subarray?',
      options: ['[27, 38]', '[3, 43]', '[9, 82]', '[10, 82]'],
      correctIndex: 0,
      explanation: 'MergeSort recursively splits until reaching singletons [38] and [27]. The very first merge operation combines them into [27, 38].'
    },
    {
      id: 4,
      type: 'complexity',
      question: 'Which Case of the Master Theorem applies to the Merge Sort recurrence T(n) = 2T(n/2) + Θ(n)?',
      options: ['Case 1', 'Case 2', 'Case 3', 'Master Theorem cannot be applied'],
      correctIndex: 1,
      explanation: 'a = 2, b = 2 -> c_crit = log_2(2) = 1. Since f(n) = n^1 = n^(c_crit), this is Case 2 with k = 0, yielding Θ(n log n).'
    },
    {
      id: 5,
      type: 'conceptual',
      question: 'Why is Merge Sort particularly well-suited for sorting singly linked lists?',
      options: [
        'It requires less time complexity on linked lists than arrays',
        'Merging linked lists requires O(1) auxiliary space without array copying',
        'Linked lists allow random access required by Merge Sort',
        'Merge Sort is unstable on linked lists'
      ],
      correctIndex: 1,
      explanation: 'In linked lists, nodes can be spliced and re-linked in O(1) space simply by modifying pointers, eliminating Merge Sort\'s O(n) space disadvantage.'
    }
  ],
  'binary-search': [
    {
      id: 1,
      type: 'conceptual',
      question: 'What is the mandatory prerequisite condition for applying Binary Search on an array?',
      options: [
        'The array elements must be distinct',
        'The array must be sorted in monotonic order',
        'The array size must be a power of two',
        'The array must fit entirely in CPU L1 cache'
      ],
      correctIndex: 1,
      explanation: 'Binary Search relies on sorted order to guarantee that all elements to the left of midpoint are smaller and to the right are larger.'
    },
    {
      id: 2,
      type: 'complexity',
      question: 'What is the maximum number of comparisons needed to search an element in a sorted array of size 1,000,000 using Binary Search?',
      options: ['10 comparisons', '20 comparisons', '500,000 comparisons', '1,000,000 comparisons'],
      correctIndex: 1,
      explanation: 'log2(1,000,000) ≈ 19.93. Binary Search requires at most ceil(log2(n + 1)) = 20 comparisons.'
    },
    {
      id: 3,
      type: 'code_prediction',
      question: 'Why is "mid = low + (high - low) / 2" preferred over "mid = (low + high) / 2"?',
      options: [
        'It executes faster on modern CPUs',
        'It prevents integer overflow when low + high exceeds maximum integer limits',
        'It rounds towards high instead of low',
        'It handles negative numbers incorrectly'
      ],
      correctIndex: 1,
      explanation: 'If low and high are both large positive integers (e.g. > 10^9), their sum can overflow a 32-bit signed integer into negative values. low + (high - low) / 2 prevents overflow.'
    },
    {
      id: 4,
      type: 'complexity',
      question: 'What is the best-case time complexity of Binary Search?',
      options: ['O(log n)', 'O(1)', 'O(n)', 'O(n log n)'],
      correctIndex: 1,
      explanation: 'In the best case, the target element is located at the very first calculated midpoint index, requiring only 1 comparison: O(1).'
    },
    {
      id: 5,
      type: 'conceptual',
      question: 'Can Binary Search be performed efficiently in O(log n) time on a singly linked list?',
      options: [
        'Yes, with equal efficiency to arrays',
        'No, because linked lists lack O(1) random access to locate the midpoint',
        'Yes, if the list is circular',
        'No, because linked lists cannot be sorted'
      ],
      correctIndex: 1,
      explanation: 'Finding the middle element of a linked list requires traversing n/2 nodes in O(n) time, destroying the logarithmic advantage.'
    }
  ]
};

class QuizController {
  constructor() {
    this.currentQuiz = null;
    this.currentQuestionIdx = 0;
    this.userAnswers = {}; // { [questionId]: selectedOptionIndex }
    this.isSubmitted = false;
    this.isLoading = false;
  }

  init() {
    this.populateCategoriesAndTopics();
    this.setupEventListeners();
  }

  populateCategoriesAndTopics() {
    const catSelect = document.getElementById('quiz-category-select');
    const algoSelect = document.getElementById('quiz-algo-select');
    if (!catSelect || !algoSelect) return;

    const categories = window.ALGORITHM_CATEGORIES || [];
    const allAlgos = window.ALGORITHMS_DATA || [];

    // Populate categories from curriculum
    if (categories.length > 0) {
      catSelect.innerHTML = categories.map((c, idx) => `
        <option value="${c.name}" data-cat-id="${c.id}" ${c.id === 'dp' ? 'selected' : (idx === 0 ? '' : '')}>
          ${c.letter}. ${c.name}
        </option>
      `).join('');
    }

    const updateTopicOptions = () => {
      const selectedOption = catSelect.options[catSelect.selectedIndex];
      const selectedCatId = selectedOption?.getAttribute('data-cat-id');
      const selectedCatName = catSelect.value;

      let matchingAlgos = [];
      if (selectedCatId) {
        matchingAlgos = allAlgos.filter(a => a.categoryId === selectedCatId);
      } else {
        matchingAlgos = allAlgos.filter(a => a.category === selectedCatName);
      }

      if (matchingAlgos.length === 0) {
        matchingAlgos = allAlgos.filter(a => a.category.toLowerCase().includes(selectedCatName.toLowerCase()));
      }

      if (matchingAlgos.length > 0) {
        algoSelect.innerHTML = matchingAlgos.map(a => `
          <option value="${a.name}">${a.name}</option>
        `).join('');
      } else {
        algoSelect.innerHTML = `<option value="${selectedCatName}">All ${selectedCatName} Concepts</option>`;
      }
    };

    catSelect.addEventListener('change', updateTopicOptions);
    updateTopicOptions();
  }

  setupEventListeners() {
    // Generate Quiz Form
    const quizForm = document.getElementById('quiz-generator-form');
    if (quizForm) {
      quizForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.generateQuiz();
      });
    }

    // Navigation buttons
    const btnNext = document.getElementById('quiz-btn-next');
    const btnPrev = document.getElementById('quiz-btn-prev');
    const btnSubmit = document.getElementById('quiz-btn-submit');
    const btnRetry = document.getElementById('quiz-btn-retry');

    if (btnNext) btnNext.addEventListener('click', () => this.nextQuestion());
    if (btnPrev) btnPrev.addEventListener('click', () => this.prevQuestion());
    if (btnSubmit) btnSubmit.addEventListener('click', () => this.submitQuiz());
    if (btnRetry) btnRetry.addEventListener('click', () => this.retryQuiz());
  }

  async generateQuiz() {
    const category = document.getElementById('quiz-category-select')?.value || 'Sorting Algorithms';
    const algorithm = document.getElementById('quiz-algo-select')?.value || 'Merge Sort';
    const difficulty = document.getElementById('quiz-difficulty-select')?.value || 'Medium';
    const count = parseInt(document.getElementById('quiz-count-select')?.value, 10) || 5;
    const language = document.getElementById('quiz-lang-select')?.value || 'English';

    const btnGen = document.getElementById('btn-generate-quiz');
    const statusBox = document.getElementById('quiz-gen-status');

    this.isLoading = true;
    if (btnGen) {
      btnGen.disabled = true;
      btnGen.innerHTML = `<span class="spinner"></span> Generating with AI...`;
    }
    if (statusBox) statusBox.classList.remove('hidden');

    try {
      const payload = {
        category,
        algorithm,
        difficulty,
        count,
        questionTypes: ['mcq', 'complexity', 'conceptual'],
        language
      };

      const res = await fetch('/api/quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.code === 'GROQ_KEY_MISSING') {
          // Use high quality fallback quiz bank
          this.loadFallbackQuiz(algorithm, difficulty);
        } else {
          throw new Error(data.error || 'Quiz generation failed');
        }
      } else {
        this.currentQuiz = data;
        this.startQuizSession();
      }
    } catch (err) {
      console.warn('AI Quiz Generation failed. Falling back to local curriculum bank:', err);
      this.loadFallbackQuiz(algorithm, difficulty);
    } finally {
      this.isLoading = false;
      if (btnGen) {
        btnGen.disabled = false;
        btnGen.innerHTML = `Start Dynamic Quiz`;
      }
      if (statusBox) statusBox.classList.add('hidden');
    }
  }

  loadFallbackQuiz(algorithmName, difficulty) {
    // Find matching topic key
    let topicKey = 'merge-sort';
    const nameLower = algorithmName.toLowerCase();
    if (nameLower.includes('search')) topicKey = 'binary-search';

    const fallbackQuestions = FALLBACK_QUIZ_BANK[topicKey] || FALLBACK_QUIZ_BANK['merge-sort'];

    this.currentQuiz = {
      quizTitle: `Quiz on ${algorithmName}`,
      topic: algorithmName,
      difficulty,
      questions: fallbackQuestions
    };

    this.startQuizSession();
  }

  startQuizSession() {
    this.currentQuestionIdx = 0;
    this.userAnswers = {};
    this.isSubmitted = false;

    // Show quiz runner card, hide setup card
    const setupCard = document.getElementById('quiz-setup-card');
    const runnerCard = document.getElementById('quiz-runner-card');
    const resultsCard = document.getElementById('quiz-results-card');

    if (setupCard) setupCard.classList.add('hidden');
    if (resultsCard) resultsCard.classList.add('hidden');
    if (runnerCard) runnerCard.classList.remove('hidden');

    this.renderCurrentQuestion();
  }

  renderCurrentQuestion() {
    if (!this.currentQuiz || !this.currentQuiz.questions) return;
    const questions = this.currentQuiz.questions;
    const total = questions.length;
    const q = questions[this.currentQuestionIdx];

    // Meta & Progress
    const titleEl = document.getElementById('quiz-current-title');
    const countEl = document.getElementById('quiz-q-counter');
    const progBar = document.getElementById('quiz-prog-bar');

    if (titleEl) titleEl.textContent = this.currentQuiz.quizTitle;
    if (countEl) countEl.textContent = `Question ${this.currentQuestionIdx + 1} of ${total}`;
    if (progBar) progBar.style.width = `${((this.currentQuestionIdx + 1) / total) * 100}%`;

    // Question content
    const questionTextEl = document.getElementById('quiz-q-text');
    const optionsContainer = document.getElementById('quiz-options-container');

    if (questionTextEl) questionTextEl.textContent = q.question;

    let optionsHtml = '';
    const selectedAns = this.userAnswers[q.id];

    q.options.forEach((optText, optIdx) => {
      let optionState = '';
      if (selectedAns === optIdx) {
        optionState = 'selected';
      }

      // If submitted, show correct / incorrect colors
      if (this.isSubmitted) {
        if (optIdx === q.correctIndex) {
          optionState += ' correct';
        } else if (selectedAns === optIdx) {
          optionState += ' incorrect';
        }
      }

      optionsHtml += `
        <div class="quiz-option-card ${optionState}" data-index="${optIdx}" onclick="window.adaQuiz.selectAnswer(${q.id}, ${optIdx})">
          <span class="option-letter">${String.fromCharCode(65 + optIdx)}</span>
          <span class="option-text">${optText}</span>
        </div>
      `;
    });

    if (optionsContainer) optionsContainer.innerHTML = optionsHtml;

    // Explanation (if submitted)
    const explanationBox = document.getElementById('quiz-explanation-box');
    if (explanationBox) {
      if (this.isSubmitted) {
        explanationBox.innerHTML = `
          <div class="alert alert-info">
            <strong>Explanation:</strong> ${q.explanation}
          </div>
        `;
        explanationBox.classList.remove('hidden');
      } else {
        explanationBox.classList.add('hidden');
      }
    }

    // Button states
    const btnPrev = document.getElementById('quiz-btn-prev');
    const btnNext = document.getElementById('quiz-btn-next');
    const btnSubmit = document.getElementById('quiz-btn-submit');

    if (btnPrev) btnPrev.disabled = this.currentQuestionIdx === 0;
    if (btnNext) btnNext.classList.toggle('hidden', this.currentQuestionIdx === total - 1);
    if (btnSubmit) btnSubmit.classList.toggle('hidden', this.currentQuestionIdx !== total - 1 || this.isSubmitted);
  }

  selectAnswer(questionId, optionIdx) {
    if (this.isSubmitted) return;
    this.userAnswers[questionId] = optionIdx;
    this.renderCurrentQuestion();
  }

  nextQuestion() {
    if (this.currentQuestionIdx < this.currentQuiz.questions.length - 1) {
      this.currentQuestionIdx++;
      this.renderCurrentQuestion();
    }
  }

  prevQuestion() {
    if (this.currentQuestionIdx > 0) {
      this.currentQuestionIdx--;
      this.renderCurrentQuestion();
    }
  }

  submitQuiz() {
    this.isSubmitted = true;
    const questions = this.currentQuiz.questions;
    let score = 0;

    questions.forEach(q => {
      if (this.userAnswers[q.id] === q.correctIndex) {
        score++;
      }
    });

    // Record to storage
    if (window.adaStorage) {
      window.adaStorage.recordQuizResult({
        topic: this.currentQuiz.topic,
        category: this.currentQuiz.category,
        difficulty: this.currentQuiz.difficulty,
        score,
        total: questions.length,
        language: this.currentQuiz.language
      });
    }

    // Show Results Card
    const runnerCard = document.getElementById('quiz-runner-card');
    const resultsCard = document.getElementById('quiz-results-card');

    if (runnerCard) runnerCard.classList.add('hidden');
    if (resultsCard) {
      resultsCard.classList.remove('hidden');
      const percent = Math.round((score / questions.length) * 100);

      const scoreEl = document.getElementById('quiz-result-score');
      const percentEl = document.getElementById('quiz-result-percent');
      const badgeEl = document.getElementById('quiz-result-badge');

      if (scoreEl) scoreEl.textContent = `${score} / ${questions.length}`;
      if (percentEl) percentEl.textContent = `${percent}%`;

      if (badgeEl) {
        if (percent >= 80) badgeEl.textContent = '🌟 Excellent! Outstanding Mastery';
        else if (percent >= 60) badgeEl.textContent = '👍 Good Job! Solid Understanding';
        else badgeEl.textContent = '📚 Keep Practicing! Review the curriculum';
      }
    }
  }

  retryQuiz() {
    const setupCard = document.getElementById('quiz-setup-card');
    const runnerCard = document.getElementById('quiz-runner-card');
    const resultsCard = document.getElementById('quiz-results-card');

    if (resultsCard) resultsCard.classList.add('hidden');
    if (runnerCard) runnerCard.classList.add('hidden');
    if (setupCard) setupCard.classList.remove('hidden');
  }
}

window.adaQuiz = new QuizController();
