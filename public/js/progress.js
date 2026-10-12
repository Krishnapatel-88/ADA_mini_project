/**
 * ADA Explorer - Progress & Recommendations Controller
 * Tracks mastery across all curriculum categories, quiz scores, and recommends next topics.
 */

class ProgressController {
  init() {
    this.setupEventListeners();
    this.renderDashboardMetrics();
  }

  setupEventListeners() {
    // Reset Progress Button
    const btnReset = document.getElementById('btn-reset-progress');
    if (btnReset) {
      btnReset.addEventListener('click', () => {
        if (confirm('Are you sure you want to reset all your learning progress, completed topics, and quiz history? This cannot be undone.')) {
          if (window.adaStorage) {
            window.adaStorage.resetAllProgress();
            this.renderDashboardMetrics();
            alert('Your progress has been reset.');
          }
        }
      });
    }

    // Preferences form
    const prefForm = document.getElementById('preferences-form');
    if (prefForm) {
      prefForm.addEventListener('change', () => {
        const theme = document.getElementById('pref-theme')?.value;
        const language = document.getElementById('pref-language')?.value;
        const skillLevel = document.getElementById('pref-skill')?.value;
        const goal = document.getElementById('pref-goal')?.value;

        if (window.adaStorage) {
          window.adaStorage.updatePreferences({ theme, language, skillLevel, goal });
          if (theme) window.adaApp?.applyTheme(theme);
          this.renderDashboardMetrics();
        }
      });
    }
  }

  renderDashboardMetrics() {
    if (!window.adaStorage) return;

    const completed = window.adaStorage.getCompletedTopics();
    const quizHistory = window.adaStorage.getQuizHistory();
    const streak = window.adaStorage.getActivityData();
    const allAlgos = window.ALGORITHMS_DATA || [];
    const categories = window.ALGORITHM_CATEGORIES || [];

    const totalTopics = allAlgos.length || 1;
    const completedCount = completed.length;
    const percentage = Math.round((completedCount / totalTopics) * 100);

    // Update progress numbers on Home Dashboard and My Progress
    const percElements = document.querySelectorAll('.stat-val-progress');
    percElements.forEach(el => el.textContent = `${percentage}%`);

    const countElements = document.querySelectorAll('.stat-val-completed');
    countElements.forEach(el => el.textContent = `${completedCount} / ${totalTopics}`);

    const streakElements = document.querySelectorAll('.stat-val-streak');
    streakElements.forEach(el => el.textContent = `${streak.streakDays || 1} Days`);

    // Category progress bars
    const catContainer = document.getElementById('category-progress-grid');
    if (catContainer) {
      let html = '';
      categories.forEach(cat => {
        const catAlgos = allAlgos.filter(a => a.categoryId === cat.id);
        const catTotal = catAlgos.length;
        const catDone = catAlgos.filter(a => completed.includes(a.id)).length;
        const catPct = catTotal > 0 ? Math.round((catDone / catTotal) * 100) : 0;

        html += `
          <div class="category-progress-card">
            <div class="cat-header">
              <span class="cat-letter">${cat.letter}</span>
              <span class="cat-name">${cat.name}</span>
              <span class="cat-fraction">${catDone} / ${catTotal}</span>
            </div>
            <div class="progress-track">
              <div class="progress-fill" style="width: ${catPct}%;"></div>
            </div>
          </div>
        `;
      });
      catContainer.innerHTML = html;
    }

    // Recent Quiz History Table
    const quizTableBody = document.getElementById('recent-quizzes-tbody');
    if (quizTableBody) {
      if (quizHistory.length === 0) {
        quizTableBody.innerHTML = `<tr><td colspan="5" class="text-center text-subtle">No quizzes taken yet. Generate your first quiz!</td></tr>`;
      } else {
        quizTableBody.innerHTML = quizHistory.slice(0, 5).map(q => {
          const dateStr = new Date(q.date).toLocaleDateString();
          return `
            <tr>
              <td><strong>${q.topic}</strong></td>
              <td>${q.difficulty}</td>
              <td>${q.score} / ${q.total}</td>
              <td><span class="badge ${q.percentage >= 70 ? 'badge-success' : 'badge-warning'}">${q.percentage}%</span></td>
              <td>${dateStr}</td>
            </tr>
          `;
        }).join('');
      }
    }

    // Render Prerequisite-based Recommended Topics
    this.renderRecommendedTopics(completed, allAlgos);
  }

  renderRecommendedTopics(completedIds, allAlgos) {
    const container = document.getElementById('recommended-topics-list');
    if (!container) return;

    // Find incomplete topics whose prerequisites are met
    const recommendations = allAlgos.filter(algo => {
      if (completedIds.includes(algo.id)) return false;
      if (!algo.prerequisites || algo.prerequisites.length === 0) return true;
      return algo.prerequisites.some(prereq => completedIds.includes(prereq));
    }).slice(0, 4);

    if (recommendations.length === 0) {
      // If none match, show top fundamental topics
      const defaults = allAlgos.slice(0, 3);
      container.innerHTML = defaults.map(algo => `
        <div class="recommended-card" onclick="window.adaNavigation.navigateTo('algorithm/${algo.id}')">
          <div class="rec-icon">💡</div>
          <div class="rec-details">
            <h4>${algo.name}</h4>
            <p>${algo.simpleIntro.slice(0, 75)}...</p>
          </div>
          <span class="rec-arrow">→</span>
        </div>
      `).join('');
    } else {
      container.innerHTML = recommendations.map(algo => `
        <div class="recommended-card" onclick="window.adaNavigation.navigateTo('algorithm/${algo.id}')">
          <div class="rec-icon">🎯</div>
          <div class="rec-details">
            <h4>${algo.name}</h4>
            <span class="rec-badge">${algo.category}</span>
            <p>${algo.coreIdea.slice(0, 75)}...</p>
          </div>
          <span class="rec-arrow">→</span>
        </div>
      `).join('');
    }
  }
}

window.adaProgress = new ProgressController();
