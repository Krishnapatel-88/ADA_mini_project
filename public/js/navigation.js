/**
 * ADA Explorer - Navigation & SPA Routing Controller
 * Seamless hash-based client routing, sidebar menu handling,
 * and standard algorithm learning page renderer.
 */

class NavigationController {
  constructor() {
    this.currentRoute = 'dashboard';
    this.curriculumFilter = { query: '', letter: 'ALL', status: 'ALL' };
  }

  init() {
    window.addEventListener('hashchange', () => this.handleRoute());
    this.setupSidebarLinks();
    this.handleRoute(); // Handle initial route
  }

  setupSidebarLinks() {
    const navLinks = document.querySelectorAll('.sidebar-nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const route = link.dataset.route;
        if (route) {
          this.navigateTo(route);
        }
      });
    });

    // Mobile sidebar toggle
    const btnToggle = document.getElementById('btn-mobile-menu');
    const sidebar = document.getElementById('ada-sidebar');
    if (btnToggle && sidebar) {
      btnToggle.addEventListener('click', () => {
        sidebar.classList.toggle('mobile-open');
      });
    }

    // Close mobile sidebar when clicking backdrop
    const backdrop = document.getElementById('sidebar-backdrop');
    if (backdrop && sidebar) {
      backdrop.addEventListener('click', () => {
        sidebar.classList.remove('mobile-open');
      });
    }
  }

  navigateTo(route) {
    window.location.hash = route;
    const sidebar = document.getElementById('ada-sidebar');
    if (sidebar) sidebar.classList.remove('mobile-open');
  }

  handleRoute() {
    const rawHash = window.location.hash.slice(1).trim() || 'dashboard';
    const parts = rawHash.split('/');
    const mainSection = parts[0];
    const param = parts[1];

    this.currentRoute = mainSection;

    // Update active nav link
    const navLinks = document.querySelectorAll('.sidebar-nav-link');
    navLinks.forEach(link => {
      const isMatch = link.dataset.route === mainSection || (mainSection === 'algorithm' && link.dataset.route === 'learn');
      link.classList.toggle('active', isMatch);
    });

    // Hide all view containers
    const views = document.querySelectorAll('.ada-view');
    views.forEach(v => v.classList.add('hidden'));

    // Route views
    if (mainSection === 'dashboard') {
      const view = document.getElementById('view-dashboard');
      if (view) view.classList.remove('hidden');
      window.adaProgress?.renderDashboardMetrics();
    } else if (mainSection === 'learn') {
      const view = document.getElementById('view-learn');
      if (view) view.classList.remove('hidden');
      this.renderCurriculumList();
    } else if (mainSection === 'algorithm') {
      const view = document.getElementById('view-algorithm-detail');
      if (view) view.classList.remove('hidden');
      this.renderAlgorithmDetail(param || 'merge-sort');
    } else if (mainSection === 'visualizer') {
      const view = document.getElementById('view-visualizer');
      if (view) view.classList.remove('hidden');
      if (param) window.adaVisualizer?.loadAlgorithm(param);
    } else if (mainSection === 'complexity') {
      const view = document.getElementById('view-complexity');
      if (view) view.classList.remove('hidden');
      window.adaComplexity?.renderGrowthGraph();
    } else if (mainSection === 'solver') {
      const view = document.getElementById('view-solver');
      if (view) view.classList.remove('hidden');
      if (param) window.adaSolver?.switchProblemType(param);
    } else if (mainSection === 'ai-tutor') {
      const view = document.getElementById('view-ai-tutor');
      if (view) view.classList.remove('hidden');
    } else if (mainSection === 'quiz') {
      const view = document.getElementById('view-quiz');
      if (view) view.classList.remove('hidden');
    } else if (mainSection === 'resources') {
      const view = document.getElementById('view-resources');
      if (view) view.classList.remove('hidden');
      this.renderResourcesPage(param);
    } else if (mainSection === 'progress') {
      const view = document.getElementById('view-progress');
      if (view) view.classList.remove('hidden');
      window.adaProgress?.renderDashboardMetrics();
    } else if (mainSection === 'settings') {
      const view = document.getElementById('view-settings');
      if (view) view.classList.remove('hidden');
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // --- Curriculum Listing Page Renderer ---
  renderCurriculumList() {
    const container = document.getElementById('curriculum-categories-list');
    if (!container) return;

    if (!this.curriculumFilter) {
      this.curriculumFilter = { query: '', letter: 'ALL', status: 'ALL' };
    }

    const categories = window.ALGORITHM_CATEGORIES || [];
    const allAlgos = window.ALGORITHMS_DATA || [];
    const completed = window.adaStorage ? window.adaStorage.getCompletedTopics() : [];

    const totalAlgos = allAlgos.length;
    const completedCount = allAlgos.filter(a => completed.includes(a.id)).length;
    const progressPercent = totalAlgos > 0 ? Math.round((completedCount / totalAlgos) * 100) : 0;

    const query = (this.curriculumFilter.query || '').toLowerCase().trim();
    const filterLetter = this.curriculumFilter.letter || 'ALL';
    const filterStatus = this.curriculumFilter.status || 'ALL';

    // Top Overview Banner
    let html = `
      <div class="curriculum-overview-banner">
        <div class="curriculum-stats-row">
          <div>
            <h3 style="margin: 0 0 6px 0; font-size: 20px; font-weight: 800;">Academic ADA Curriculum (Categories A to M)</h3>
            <p style="margin: 0; color: var(--text-secondary); font-size: 13.5px;">
              Master complete theoretical frameworks, step-by-step intermediate traces, complexity derivations, and technical interview problems.
            </p>
          </div>
          <div class="curriculum-stat-group">
            <div class="curriculum-stat-item">
              <span class="curriculum-stat-num">${totalAlgos}</span>
              <span class="curriculum-stat-lbl">Total Topics</span>
            </div>
            <div class="curriculum-stat-item">
              <span class="curriculum-stat-num">${completedCount}</span>
              <span class="curriculum-stat-lbl">Mastered</span>
            </div>
            <div class="curriculum-stat-item">
              <span class="curriculum-stat-num">${progressPercent}%</span>
              <span class="curriculum-stat-lbl">Syllabus Covered</span>
            </div>
          </div>
        </div>
        <div class="curriculum-progress-track">
          <div class="curriculum-progress-fill" style="width: ${progressPercent}%;"></div>
        </div>
      </div>

      <!-- Interactive Filters & Letter Jump Bar -->
      <div class="curriculum-filter-panel">
        <div class="curriculum-filter-top">
          <div class="curriculum-search-box">
            <svg class="curriculum-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input type="text" id="curriculum-search-input" class="curriculum-search-input" placeholder="Search topics, algorithms (e.g. Master Theorem, Dijkstra, DP)..." value="${this.escapeHtml(this.curriculumFilter.query)}">
          </div>
          <div class="status-filter-pills">
            <button class="status-pill-btn ${filterStatus === 'ALL' ? 'active' : ''}" onclick="window.adaNavigation.setCurriculumStatusFilter('ALL')">All (${totalAlgos})</button>
            <button class="status-pill-btn ${filterStatus === 'COMPLETED' ? 'active' : ''}" onclick="window.adaNavigation.setCurriculumStatusFilter('COMPLETED')">Completed (${completedCount})</button>
            <button class="status-pill-btn ${filterStatus === 'PENDING' ? 'active' : ''}" onclick="window.adaNavigation.setCurriculumStatusFilter('PENDING')">Pending (${totalAlgos - completedCount})</button>
          </div>
        </div>
        <div class="letter-jump-bar">
          <span class="letter-jump-label">Category:</span>
          <button class="letter-jump-btn ${filterLetter === 'ALL' ? 'active' : ''}" style="width: auto; padding: 0 10px;" onclick="window.adaNavigation.setCurriculumLetterFilter('ALL')">All (A–M)</button>
          ${categories.map(cat => `
            <button class="letter-jump-btn ${filterLetter === cat.letter ? 'active' : ''}" title="${cat.name}" onclick="window.adaNavigation.setCurriculumLetterFilter('${cat.letter}')">
              ${cat.letter}
            </button>
          `).join('')}
        </div>
      </div>
    `;

    // Filter categories & algorithms
    let renderedCount = 0;
    categories.forEach(cat => {
      if (filterLetter !== 'ALL' && cat.letter !== filterLetter) return;

      let algos = allAlgos.filter(a => a.categoryId === cat.id);

      if (filterStatus === 'COMPLETED') {
        algos = algos.filter(a => completed.includes(a.id));
      } else if (filterStatus === 'PENDING') {
        algos = algos.filter(a => !completed.includes(a.id));
      }

      if (query) {
        algos = algos.filter(a =>
          a.name.toLowerCase().includes(query) ||
          a.simpleIntro.toLowerCase().includes(query) ||
          a.category.toLowerCase().includes(query) ||
          (a.timeComplexity?.worst && a.timeComplexity.worst.toLowerCase().includes(query)) ||
          (a.prerequisites && a.prerequisites.some(p => p.toLowerCase().includes(query)))
        );
      }

      if (algos.length === 0) return;
      renderedCount += algos.length;

      const catCompletedCount = algos.filter(a => completed.includes(a.id)).length;

      html += `
        <div class="curriculum-category-section" id="cat-section-${cat.letter}">
          <div class="category-header">
            <span class="category-letter-badge">${cat.letter}</span>
            <div class="category-header-text">
              <div class="category-title-row">
                <h3>${cat.letter}. ${cat.name}</h3>
                <span class="category-meta-badge">${algos.length} Topics${catCompletedCount > 0 ? ` • ${catCompletedCount} Done` : ''}</span>
              </div>
              <p class="category-desc">${cat.description}</p>
            </div>
          </div>
          <div class="algorithm-cards-grid">
            ${algos.map(algo => {
              const isDone = completed.includes(algo.id);
              const hasViz = algo.visualizerType;
              return `
                <div class="algo-card ${isDone ? 'algo-card-completed' : ''}" onclick="window.adaNavigation.navigateTo('algorithm/${algo.id}')">
                  <div class="algo-card-top">
                    <h4>${algo.name}</h4>
                    ${isDone ? '<span class="status-done-badge">✓ Done</span>' : ''}
                  </div>
                  <p class="algo-card-intro">${algo.simpleIntro.slice(0, 95)}...</p>
                  <div class="algo-card-meta-row">
                    <span class="time-badge">${algo.timeComplexity?.worst || 'O(n)'}</span>
                    <span class="space-badge">${algo.spaceComplexity?.auxiliary || 'O(1)'}</span>
                  </div>
                  <div class="algo-card-footer">
                    <span class="btn-read-more">Learn Topic →</span>
                    ${hasViz ? `
                      <button class="btn-card-viz" onclick="event.stopPropagation(); window.adaNavigation.navigateTo('visualizer/${algo.id}')" title="Open Interactive Visualizer">
                        ▶ Visualizer
                      </button>
                    ` : ''}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;
    });

    if (renderedCount === 0) {
      html += `
        <div class="curriculum-category-section" style="text-align: center; padding: 48px 24px;">
          <h3 style="color: var(--text-secondary); margin-bottom: 8px;">No matching topics found</h3>
          <p style="color: var(--text-subtle); margin-bottom: 16px;">Try adjusting your search terms or filter selection.</p>
          <button class="btn btn-secondary btn-sm" onclick="window.adaNavigation.resetCurriculumFilters()">Reset Filters</button>
        </div>
      `;
    }

    container.innerHTML = html;

    // Attach search input listener
    const searchInput = document.getElementById('curriculum-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.curriculumFilter.query = e.target.value;
        this.renderCurriculumList();
        // Restore focus to input
        const reInput = document.getElementById('curriculum-search-input');
        if (reInput) {
          reInput.focus();
          reInput.setSelectionRange(reInput.value.length, reInput.value.length);
        }
      });
    }
  }

  // --- 23-Field Standard Algorithm Detail Page Renderer ---
  renderAlgorithmDetail(algoId) {
    const container = document.getElementById('algorithm-detail-container');
    if (!container) return;

    const all = window.ALGORITHMS_DATA || [];
    const algo = all.find(a => a.id === algoId) || all.find(a => a.id === 'merge-sort') || all[0];
    if (!algo) return;

    // Record as recently viewed
    if (window.adaStorage) {
      window.adaStorage.addRecentTopic(algo.id);
    }

    const isCompleted = window.adaStorage ? window.adaStorage.isTopicCompleted(algo.id) : false;

    // Fetch verified resources for this algorithm
    const resData = window.adaResources
      ? window.adaResources.getComprehensiveResources(algo.id, algo.name, 'Both')
      : null;

    let html = `
      <div class="algo-detail-wrapper">
        <!-- Header & Action Bar -->
        <div class="algo-detail-header">
          <div class="header-breadcrumb">
            <a href="#learn">Curriculum</a> / <span>${algo.category}</span>
          </div>
          <div class="algo-title-row">
            <div>
              <h1 class="algo-main-heading">${algo.name}</h1>
              <span class="badge badge-category">${algo.category}</span>
            </div>
            <div class="algo-actions-top">
              <button class="btn btn-secondary" onclick="window.adaNavigation.openAiForAlgo('${algo.id}')">
                Ask AI Tutor
              </button>
              <button class="btn btn-outline" onclick="window.adaNavigation.navigateTo('quiz')">
                Take Quiz
              </button>
              <button class="btn ${isCompleted ? 'btn-success' : 'btn-primary'}" id="btn-toggle-complete" onclick="window.adaNavigation.toggleComplete('${algo.id}')">
                ${isCompleted ? '✓ Completed' : 'Mark as Completed'}
              </button>
            </div>
          </div>
        </div>

        <!-- 2. Simple Introduction -->
        <div class="content-card">
          <h3 class="section-title">Introduction</h3>
          <p class="lead-text">${algo.simpleIntro}</p>
        </div>

        <!-- 3 & 4. Why Useful & Real-World Application -->
        <div class="content-grid-2">
          <div class="content-card">
            <h4>💡 Why is it Useful?</h4>
            <p>${algo.whyUseful}</p>
          </div>
          <div class="content-card">
            <h4>🌍 Real-World Applications</h4>
            <p>${algo.realWorldApp}</p>
          </div>
        </div>

        <!-- 5. Prerequisites & 6. Core Idea -->
        <div class="content-card">
          <h4>Prerequisites</h4>
          <div class="prereq-tags">
            ${algo.prerequisites.map(p => `<span class="tag-pill">${p}</span>`).join('')}
          </div>
          <h4 style="margin-top: 16px;">Core Idea</h4>
          <p class="core-idea-box">${algo.coreIdea}</p>
        </div>

        <!-- 7. How it Works Step by Step -->
        <div class="content-card">
          <h3 class="section-title">Step-by-Step Algorithm Walkthrough</h3>
          <ol class="step-walkthrough-list">
            ${algo.stepByStep.map(s => `<li>${s}</li>`).join('')}
          </ol>
        </div>

        <!-- 8 & 9. Pseudocode & JavaScript Implementation -->
        <div class="content-grid-2">
          <div class="content-card">
            <div class="code-header">
              <h4>Pseudocode</h4>
            </div>
            <pre class="code-view"><code>${algo.pseudocode}</code></pre>
          </div>
          <div class="content-card">
            <div class="code-header">
              <h4>JavaScript Implementation</h4>
              <button class="btn-copy-code" id="btn-copy-code-algo" onclick="window.adaNavigation.copyCode('${algo.id}')">Copy Code</button>
            </div>
            <pre class="code-view"><code id="code-block-algo">${algo.jsImplementation}</code></pre>
          </div>
        </div>

        <!-- 10 & 11. Example Input & Worked Example -->
        <div class="content-card">
          <h3 class="section-title">Worked Example</h3>
          <p><strong>Example Input:</strong> <code>${algo.exampleInput}</code></p>
          <div class="worked-example-trace">
            ${algo.workedExample.map(w => `<div class="trace-row"><span class="trace-bullet">•</span><span>${w}</span></div>`).join('')}
          </div>
          ${algo.visualizerType ? `
            <div class="viz-jump-box">
              <span>Ready to see this execute interactively?</span>
              <button class="btn btn-primary" onclick="window.adaNavigation.navigateTo('visualizer/${algo.id}')">
                Open in Algorithm Visualizer →
              </button>
            </div>
          ` : ''}
        </div>

        <!-- 13, 14, 15. Complexity Analysis -->
        <div class="content-card">
          <h3 class="section-title">Asymptotic Complexity Analysis</h3>
          <div class="complexity-stat-cards">
            <div class="comp-card">
              <span class="comp-label">Best-Case Time</span>
              <span class="comp-value">${algo.timeComplexity.best}</span>
            </div>
            <div class="comp-card">
              <span class="comp-label">Average-Case Time</span>
              <span class="comp-value">${algo.timeComplexity.average}</span>
            </div>
            <div class="comp-card">
              <span class="comp-label">Worst-Case Time</span>
              <span class="comp-value">${algo.timeComplexity.worst}</span>
            </div>
            <div class="comp-card">
              <span class="comp-label">Auxiliary Space</span>
              <span class="comp-value">${algo.spaceComplexity.auxiliary}</span>
            </div>
          </div>
          <p class="comp-explanation-text"><strong>Derivation:</strong> ${algo.timeComplexity.explanation}</p>
        </div>

        <!-- 16 & 17. Advantages & Limitations -->
        <div class="content-grid-2">
          <div class="content-card">
            <h4>Advantages</h4>
            <ul class="bullet-list">
              ${algo.advantages.map(a => `<li>${a}</li>`).join('')}
            </ul>
          </div>
          <div class="content-card">
            <h4>Limitations</h4>
            <ul class="bullet-list">
              ${algo.limitations.map(l => `<li>${l}</li>`).join('')}
            </ul>
          </div>
        </div>

        <!-- 18. Common Mistakes -->
        <div class="content-card alert-mistakes">
          <h4>⚠️ Common Student Mistakes & Misconceptions</h4>
          <ul class="bullet-list">
            ${algo.commonMistakes.map(m => `<li>${m}</li>`).join('')}
          </ul>
        </div>

        <!-- 19. Interview Questions with Accordion Answers -->
        <div class="content-card">
          <h3 class="section-title">Technical Interview & Exam Questions</h3>
          <div class="interview-accordion-list">
            ${algo.interviewQuestions.map((iq, idx) => `
              <details class="interview-accordion">
                <summary class="interview-q">${iq.q}</summary>
                <div class="interview-a">${iq.a}</div>
              </details>
            `).join('')}
          </div>
        </div>

        <!-- 20. Related YouTube Learning Resources (Hindi & English) -->
        <div class="content-card">
          <h3 class="section-title">Curated Video Tutorials (Hindi & English)</h3>
          ${this.renderVideoCards(resData)}
        </div>
      </div>
    `;

    container.innerHTML = html;
  }

  renderVideoCards(resData) {
    if (!resData || resData.verified.length === 0) {
      return `
        <div class="alert alert-info">
          No individual verified video entry for this exact topic yet.<br>
          <a href="${resData?.searchLinks.hindi.url}" target="_blank" class="search-yt-link">🔍 ${resData?.searchLinks.hindi.label}</a> |
          <a href="${resData?.searchLinks.english.url}" target="_blank" class="search-yt-link">🔍 ${resData?.searchLinks.english.label}</a>
        </div>
      `;
    }

    return `
      <div class="video-cards-grid">
        ${resData.verified.map(v => `
          <div class="video-card">
            <div class="video-thumb-wrap">
              <img src="${v.thumbnail}" alt="${v.title}" class="video-thumb" loading="lazy">
              <span class="video-duration">${v.duration}</span>
            </div>
            <div class="video-card-body">
              <div class="video-card-meta">
                <span class="badge badge-lang">${v.language}</span>
                <span class="badge badge-tag">${v.tag}</span>
              </div>
              <h4 class="video-card-title">${v.title}</h4>
              <p class="video-card-channel">${v.channel}</p>
              <p class="video-card-desc">${v.description.slice(0, 95)}...</p>
              <a href="${v.url}" target="_blank" class="btn-watch-yt">Watch on YouTube ↗</a>
            </div>
          </div>
        `).join('')}
      </div>
      <div class="yt-search-fallbacks">
        <p class="text-subtle">Want more options? Search YouTube directly:</p>
        <a href="${resData.searchLinks.hindi.url}" target="_blank" class="search-yt-link">🔍 ${resData.searchLinks.hindi.label}</a> •
        <a href="${resData.searchLinks.english.url}" target="_blank" class="search-yt-link">🔍 ${resData.searchLinks.english.label}</a>
      </div>
    `;
  }

  // Dedicated Resources Page
  renderResourcesPage(filterTopicId) {
    const container = document.getElementById('resources-catalog-grid');
    if (!container) return;

    const allResources = window.adaResources?.resources || [];
    const langSelect = document.getElementById('res-filter-lang');
    const selectedLang = langSelect ? langSelect.value : 'Both';

    let filtered = allResources;
    if (selectedLang !== 'Both') {
      filtered = filtered.filter(r => r.language === selectedLang);
    }

    if (filterTopicId) {
      filtered = filtered.filter(r => r.topicId === filterTopicId);
    }

    container.innerHTML = filtered.map(v => `
      <div class="video-card">
        <div class="video-thumb-wrap">
          <img src="${v.thumbnail}" alt="${v.title}" class="video-thumb" loading="lazy">
          <span class="video-duration">${v.duration}</span>
        </div>
        <div class="video-card-body">
          <div class="video-card-meta">
            <span class="badge badge-lang">${v.language}</span>
            <span class="badge badge-tag">${v.tag}</span>
          </div>
          <h4 class="video-card-title">${v.title}</h4>
          <p class="video-card-channel">${v.channel}</p>
          <p class="video-card-desc">${v.description}</p>
          <a href="${v.url}" target="_blank" class="btn-watch-yt">Watch on YouTube ↗</a>
        </div>
      </div>
    `).join('');
  }

  toggleComplete(algoId) {
    if (!window.adaStorage) return;
    const isNowComplete = window.adaStorage.toggleTopicCompleted(algoId);

    const btn = document.getElementById('btn-toggle-complete');
    if (btn) {
      btn.className = isNowComplete ? 'btn btn-success' : 'btn btn-primary';
      btn.textContent = isNowComplete ? '✓ Completed' : 'Mark as Completed';
    }

    window.adaProgress?.renderDashboardMetrics();
  }

  copyCode(algoId) {
    const algo = window.ALGORITHMS_DATA?.find(a => a.id === algoId);
    if (algo && algo.jsImplementation) {
      navigator.clipboard.writeText(algo.jsImplementation).then(() => {
        const btn = document.getElementById('btn-copy-code-algo');
        if (btn) {
          const originalText = btn.textContent;
          btn.textContent = '✓ Copied!';
          setTimeout(() => { btn.textContent = originalText; }, 2000);
        }
      }).catch(err => {
        console.error('Copy failed:', err);
      });
    }
  }

  openAiForAlgo(algoId) {
    const algo = window.ALGORITHMS_DATA?.find(a => a.id === algoId);
    if (algo && window.adaTutor) {
      window.adaTutor.setContext({
        algorithm: algo.name,
        category: algo.category,
        details: `Time: ${algo.timeComplexity.average}, Space: ${algo.spaceComplexity.auxiliary}`
      });
      this.navigateTo('ai-tutor');
    }
  }

  setCurriculumStatusFilter(status) {
    if (!this.curriculumFilter) this.curriculumFilter = { query: '', letter: 'ALL', status: 'ALL' };
    this.curriculumFilter.status = status;
    this.renderCurriculumList();
  }

  setCurriculumLetterFilter(letter) {
    if (!this.curriculumFilter) this.curriculumFilter = { query: '', letter: 'ALL', status: 'ALL' };
    this.curriculumFilter.letter = letter;
    this.renderCurriculumList();
    if (letter !== 'ALL') {
      const section = document.getElementById(`cat-section-${letter}`);
      if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  resetCurriculumFilters() {
    this.curriculumFilter = { query: '', letter: 'ALL', status: 'ALL' };
    this.renderCurriculumList();
  }

  escapeHtml(str) {
    if (!str) return '';
    return String(str).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
}

window.adaNavigation = new NavigationController();
