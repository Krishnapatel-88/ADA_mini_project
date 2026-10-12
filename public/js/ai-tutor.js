/**
 * ADA Explorer - AI Tutor Client Controller
 * Powers both the dedicated AI Tutor page and universal floating chat widget.
 * Communicates with backend /api/chat and /api/explain securely.
 */

class AiTutorController {
  constructor() {
    this.messages = [];
    this.activeContext = null;
    this.isLoading = false;
    this.backendHealth = { groqConfigured: false, checked: false };
  }

  async init() {
    this.setupEventListeners();
    await this.checkHealth();
  }

  async checkHealth() {
    try {
      const res = await fetch('/api/health');
      if (res.ok) {
        const data = await res.json();
        this.backendHealth = { groqConfigured: data.groqConfigured, model: data.model, checked: true };
        this.updateConfigBanner();
      }
    } catch (e) {
      console.warn('Backend health check failed:', e);
      this.backendHealth = { groqConfigured: false, checked: true };
      this.updateConfigBanner();
    }
  }

  updateConfigBanner() {
    const banners = document.querySelectorAll('.groq-status-banner');
    banners.forEach(b => {
      if (!this.backendHealth.groqConfigured) {
        b.innerHTML = `
          <div class="alert alert-warning banner-inner">
            <div class="banner-text">
              <strong>⚡ AI Engine Setup:</strong> To enable live AI responses, add your API key in <code>.env</code> (<code>GROQ_API_KEY=gsk_...</code>).
              <em>Deterministic lessons, visualizers, and solvers work 100% without an API key.</em>
            </div>
          </div>
        `;
        b.classList.remove('hidden');
      } else {
        // Hide banner when connected cleanly, or show subtle connected status
        b.classList.add('hidden');
      }
    });

    const activeModelLabel = document.getElementById('ai-active-model-label');
    if (activeModelLabel && this.backendHealth.groqConfigured) {
      activeModelLabel.textContent = `Model: ${this.backendHealth.model || 'AI Assistant'} (Active)`;
    }
  }

  setupEventListeners() {
    // Dedicated AI Tutor Form
    const tutorForm = document.getElementById('ai-tutor-form');
    const tutorInput = document.getElementById('ai-tutor-input');

    if (tutorForm) {
      tutorForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (tutorInput && tutorInput.value.trim()) {
          this.sendMessage(tutorInput.value.trim(), 'tutor');
          tutorInput.value = '';
        }
      });
    }

    // Quick Prompt Pills
    const promptPills = document.querySelectorAll('.prompt-pill');
    promptPills.forEach(pill => {
      pill.addEventListener('click', () => {
        const promptText = pill.dataset.prompt || pill.textContent.trim();
        this.sendMessage(promptText, 'tutor');
      });
    });

    // Clear Chat
    const btnClearChat = document.getElementById('ai-clear-chat');
    if (btnClearChat) {
      btnClearChat.addEventListener('click', () => {
        this.messages = [];
        this.renderMessages('tutor');
      });
    }

    // Floating Widget Toggle
    const btnFloatToggle = document.getElementById('btn-floating-ai');
    const floatDrawer = document.getElementById('ai-floating-drawer');
    const btnFloatClose = document.getElementById('ai-floating-close');

    if (btnFloatToggle && floatDrawer) {
      btnFloatToggle.addEventListener('click', () => {
        floatDrawer.classList.toggle('open');
      });
    }

    if (btnFloatClose && floatDrawer) {
      btnFloatClose.addEventListener('click', () => {
        floatDrawer.classList.remove('open');
      });
    }

    // Floating Form
    const floatForm = document.getElementById('ai-floating-form');
    const floatInput = document.getElementById('ai-floating-input');
    if (floatForm) {
      floatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (floatInput && floatInput.value.trim()) {
          this.sendMessage(floatInput.value.trim(), 'floating');
          floatInput.value = '';
        }
      });
    }
  }

  setContext(contextObj) {
    this.activeContext = contextObj;
    const badge = document.getElementById('ai-context-badge');
    if (badge && contextObj) {
      badge.textContent = `Context: ${contextObj.algorithm || 'General'}`;
      badge.classList.remove('hidden');
    }
  }

  async sendMessage(userText, targetView = 'tutor') {
    if (!userText || this.isLoading) return;

    this.messages.push({ role: 'user', content: userText, timestamp: new Date() });
    this.renderMessages(targetView);

    this.isLoading = true;
    this.renderLoading(targetView, true);

    const prefs = window.adaStorage ? window.adaStorage.getPreferences() : { language: 'English', skillLevel: 'Intermediate' };

    try {
      const payload = {
        messages: this.messages.map(m => ({ role: m.role, content: m.content })),
        context: this.activeContext,
        language: prefs.language,
        skillLevel: prefs.skillLevel
      };

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.code === 'GROQ_KEY_MISSING') {
          // Provide pedagogical fallback explanation
          const fallbackReply = this.generateFallbackAnswer(userText, prefs.language);
          this.messages.push({
            role: 'assistant',
            content: fallbackReply,
            isFallback: true,
            timestamp: new Date()
          });
        } else {
          throw new Error(data.error || 'Server error occurred');
        }
      } else {
        this.messages.push({
          role: 'assistant',
          content: data.reply,
          timestamp: new Date()
        });
      }
    } catch (err) {
      console.error('Chat error:', err);
      this.messages.push({
        role: 'assistant',
        content: `⚠️ **Connection Error:** ${err.message}\n\nPlease verify that your server is running and your \`GROQ_API_KEY\` is valid in \`.env\`.`,
        isError: true,
        timestamp: new Date()
      });
    } finally {
      this.isLoading = false;
      this.renderLoading(targetView, false);
      this.renderMessages(targetView);
    }
  }

  generateFallbackAnswer(query, language) {
    const q = query.toLowerCase();
    if (language === 'Hindi') {
      return `ℹ️ **Offline Mode Demonstration:**\n\n*(Real-time API key set nahi hai. Set \`GROQ_API_KEY\` in \`.env\` for live model answers.)*\n\n**Aapke sawaal ka mukhya nishkarsh:**\n- **Time Complexity:** Merge Sort aur Heap Sort humesha O(n log n) lete hain. Quick Sort average case mein O(n log n) aur worst case mein O(n²) hota hai.\n- **Space Complexity:** Merge Sort ko O(n) auxiliary memory chahiye, jabki Quick Sort aur Heap Sort in-place hain.\n- **AlgoVista Visualizer:** Aap website ke **Visualizer** tab mein jaakar step-by-step intermediate states ko visual form mein dekh sakte hain!`;
    }
    return `ℹ️ **Offline Mode Demonstration:**\n\n*(Server is running without an API key configured in \`.env\`)*\n\n**Algorithm Highlights for "${query}":**\n- **Time Complexity:** Divide & Conquer algorithms like Merge Sort run in guaranteed $\\Theta(n \\log n)$, while Quick Sort averages $O(n \\log n)$ with an $O(n^2)$ worst case.\n- **Space Complexity:** Merge Sort requires $O(n)$ auxiliary array space, whereas Quick Sort uses $O(\\log n)$ stack space.\n- **Interactive Execution:** Explore the **Algorithm Visualizer** or **Numerical Solver** tabs in AlgoVista to inspect exact step-by-step calculations and intermediate states!`;
  }

  renderLoading(targetView, show) {
    const containerId = targetView === 'floating' ? 'ai-floating-messages' : 'ai-tutor-messages';
    const container = document.getElementById(containerId);
    if (!container) return;

    const existingSpinner = container.querySelector('.ai-typing-indicator');
    if (show && !existingSpinner) {
      const typingEl = document.createElement('div');
      typingEl.className = 'ai-typing-indicator message-assistant';
      typingEl.innerHTML = `<span class="dot"></span><span class="dot"></span><span class="dot"></span> <em>ADA Tutor is thinking...</em>`;
      container.appendChild(typingEl);
      container.scrollTop = container.scrollHeight;
    } else if (!show && existingSpinner) {
      existingSpinner.remove();
    }
  }

  renderMessages(targetView) {
    const containerId = targetView === 'floating' ? 'ai-floating-messages' : 'ai-tutor-messages';
    const container = document.getElementById(containerId);
    if (!container) return;

    if (this.messages.length === 0) {
      container.innerHTML = `
        <div class="chat-empty-state">
          <div class="chat-empty-icon">🤖</div>
          <h4>Welcome to ADA AI Tutor</h4>
          <p>Ask any doubt about time complexity, recurrences, code traces, or proofs in English or Hindi!</p>
        </div>
      `;
      return;
    }

    let html = '';
    this.messages.forEach(msg => {
      const isUser = msg.role === 'user';
      const formattedContent = this.formatMarkdown(msg.content);

      html += `
        <div class="chat-message ${isUser ? 'message-user' : 'message-assistant'}">
          <div class="message-sender">${isUser ? 'You' : 'AlgoVista AI'}</div>
          <div class="message-body">${formattedContent}</div>
          ${!isUser ? `<button class="btn-copy-msg" onclick="navigator.clipboard.writeText(\`${encodeURIComponent(msg.content)}\`)">Copy</button>` : ''}
        </div>
      `;
    });

    container.innerHTML = html;
    container.scrollTop = container.scrollHeight;
  }

  formatMarkdown(rawText) {
    if (!rawText) return '';
    let text = rawText;

    // Preserve code blocks before escaping HTML
    const codeBlocks = [];
    text = text.replace(/```([a-z0-9_-]*)\s*([\s\S]*?)```/gi, (match, lang, code) => {
      const idx = codeBlocks.length;
      const cleanLang = (lang || 'code').toUpperCase();
      const escapedCode = code
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .trim();
      codeBlocks.push(`
        <div class="chat-code-wrapper">
          <div class="chat-code-header">
            <span>${cleanLang}</span>
            <button class="chat-code-copy-btn" onclick="navigator.clipboard.writeText(this.parentElement.nextElementSibling.innerText)">Copy</button>
          </div>
          <pre class="chat-code-block"><code>${escapedCode}</code></pre>
        </div>
      `);
      return `__CODE_BLOCK_${idx}__`;
    });

    // Escape basic HTML
    text = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // Restore code blocks (already escaped)
    text = text.replace(/__CODE_BLOCK_(\d+)__/g, (match, idx) => {
      return codeBlocks[parseInt(idx, 10)] || '';
    });

    // Inline code
    text = text.replace(/`([^`]+)`/g, '<code class="chat-inline-code">$1</code>');

    // Headers
    text = text.replace(/^#### (.*$)/gim, '<h5 class="chat-heading-5">$1</h5>');
    text = text.replace(/^### (.*$)/gim, '<h4 class="chat-heading-4">$1</h4>');
    text = text.replace(/^## (.*$)/gim, '<h3 class="chat-heading-3">$1</h3>');
    text = text.replace(/^# (.*$)/gim, '<h2 class="chat-heading-2">$1</h2>');

    // Bold & Italic
    text = text.replace(/\*\*\*([^*]+)\*\*\*/g, '<strong><em>$1</em></strong>');
    text = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    text = text.replace(/\*([^*]+)\*/g, '<em>$1</em>');

    // Blockquotes
    text = text.replace(/^\s*&gt;\s*(.*$)/gim, '<blockquote class="chat-quote">$1</blockquote>');

    // Bullet points: grouping lines starting with -, * or + into <ul>
    text = text.replace(/(?:^\s*[-*+]\s+.*(?:\r?\n|$))+/gm, (listMatch) => {
      const items = listMatch
        .trim()
        .split(/\r?\n/)
        .map(line => line.replace(/^\s*[-*+]\s+/, '').trim())
        .map(item => `<li>${item}</li>`)
        .join('');
      return `<ul class="chat-bullet-list">${items}</ul>`;
    });

    // Numbered lists: lines starting with 1., 2. etc into <ol>
    text = text.replace(/(?:^\s*\d+\.\s+.*(?:\r?\n|$))+/gm, (listMatch) => {
      const items = listMatch
        .trim()
        .split(/\r?\n/)
        .map(line => line.replace(/^\s*\d+\.\s+/, '').trim())
        .map(item => `<li>${item}</li>`)
        .join('');
      return `<ol class="chat-ordered-list">${items}</ol>`;
    });

    // Paragraph breaks
    text = text.replace(/\n\s*\n/g, '<div class="chat-paragraph-gap"></div>');
    text = text.replace(/\n/g, '<br>');

    // Clean up br tags right after/before block tags
    text = text.replace(/<\/h[2-5]><br>/g, (m) => m.replace('<br>', ''));
    text = text.replace(/<\/(ul|ol|pre|div|blockquote)><br>/g, (m) => m.replace('<br>', ''));
    text = text.replace(/<br><(h[2-5]|ul|ol|pre|div|blockquote)/g, '<$1');

    return text;
  }
}

window.adaTutor = new AiTutorController();
