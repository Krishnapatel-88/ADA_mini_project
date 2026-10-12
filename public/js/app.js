/**
 * ADA Explorer - Application Bootstrap
 * Initializes all controllers, global search, theme toggle, and keyboard shortcuts.
 */

class AppBootstrap {
  init() {
    this.initTheme();
    this.initSearch();
    this.initSubsystems();
    this.setupKeyboardShortcuts();
  }

  initTheme() {
    const prefs = window.adaStorage ? window.adaStorage.getPreferences() : { theme: 'light' };
    this.applyTheme(prefs.theme || 'light');

    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    if (themeToggleBtn) {
      themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
        this.applyTheme(nextTheme);
        if (window.adaStorage) {
          window.adaStorage.updatePreferences({ theme: nextTheme });
        }
      });
    }
  }

  applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const themeIcon = document.getElementById('theme-toggle-icon');
    if (themeIcon) {
      themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
  }

  initSearch() {
    const searchInput = document.getElementById('global-search-input');
    const searchDropdown = document.getElementById('global-search-dropdown');

    if (!searchInput || !searchDropdown) return;

    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.trim();
      if (!q) {
        searchDropdown.classList.add('hidden');
        return;
      }

      const results = window.searchAlgorithms ? window.searchAlgorithms(q) : [];
      if (results.length === 0) {
        searchDropdown.innerHTML = `<div class="search-no-results">No algorithms found matching "${q}"</div>`;
        searchDropdown.classList.remove('hidden');
        return;
      }

      searchDropdown.innerHTML = results.map(r => `
        <div class="search-result-item" onclick="window.adaNavigation.navigateTo('algorithm/${r.id}'); document.getElementById('global-search-dropdown').classList.add('hidden'); document.getElementById('global-search-input').value = '';">
          <div class="search-result-title">${r.name}</div>
          <div class="search-result-cat">${r.category} • ${r.timeComplexity.worst}</div>
        </div>
      `).join('');

      searchDropdown.classList.remove('hidden');
    });

    document.addEventListener('click', (e) => {
      if (!searchInput.contains(e.target) && !searchDropdown.contains(e.target)) {
        searchDropdown.classList.add('hidden');
      }
    });
  }

  initSubsystems() {
    window.adaNavigation?.init();
    window.adaVisualizer?.init();
    window.adaComplexity?.init();
    window.adaSolver?.init();
    window.adaTutor?.init();
    window.adaQuiz?.init();
    window.adaProgress?.init();
  }

  setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      // '/' focuses search unless already in input/textarea
      if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
        e.preventDefault();
        const searchInput = document.getElementById('global-search-input');
        if (searchInput) searchInput.focus();
      }

      // Escape closes search or floating drawer
      if (e.key === 'Escape') {
        const searchDropdown = document.getElementById('global-search-dropdown');
        if (searchDropdown) searchDropdown.classList.add('hidden');

        const floatDrawer = document.getElementById('ai-floating-drawer');
        if (floatDrawer) floatDrawer.classList.remove('open');
      }
    });
  }
}

window.adaApp = new AppBootstrap();

document.addEventListener('DOMContentLoaded', () => {
  window.adaApp.init();
});
