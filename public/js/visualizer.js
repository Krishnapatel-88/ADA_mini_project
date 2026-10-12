/**
 * ADA Explorer - Interactive Algorithm Visualizer Controller
 * Controls animations, step navigation, visual rendering of arrays, graphs, DP tables, and backtracking.
 */

class VisualizerController {
  constructor() {
    this.currentCategory = 'sorting'; // 'sorting' | 'searching' | 'graph' | 'dp' | 'backtracking'
    this.currentAlgo = 'bubble-sort';
    this.steps = [];
    this.currentStepIdx = 0;
    this.isPlaying = false;
    this.playbackTimer = null;
    this.playbackSpeed = 500; // ms per step
    this.arrayData = [35, 12, 48, 20, 9, 27, 44, 15];

    // Dual comparison mode
    this.isCompareMode = false;
    this.compareAlgo1 = 'bubble-sort';
    this.compareAlgo2 = 'quick-sort';
    this.stepsCompare1 = [];
    this.stepsCompare2 = [];
  }

  init() {
    this.setupEventListeners();
    this.loadAlgorithm(this.currentAlgo);
  }

  setupEventListeners() {
    // Playback Controls
    const btnPlay = document.getElementById('viz-btn-play');
    const btnPause = document.getElementById('viz-btn-pause');
    const btnNext = document.getElementById('viz-btn-next');
    const btnPrev = document.getElementById('viz-btn-prev');
    const btnReset = document.getElementById('viz-btn-reset');
    const btnFinish = document.getElementById('viz-btn-finish');
    const speedSlider = document.getElementById('viz-speed-slider');

    if (btnPlay) btnPlay.addEventListener('click', () => this.play());
    if (btnPause) btnPause.addEventListener('click', () => this.pause());
    if (btnNext) btnNext.addEventListener('click', () => this.stepNext());
    if (btnPrev) btnPrev.addEventListener('click', () => this.stepPrev());
    if (btnReset) btnReset.addEventListener('click', () => this.reset());
    if (btnFinish) btnFinish.addEventListener('click', () => this.runToCompletion());

    if (speedSlider) {
      speedSlider.addEventListener('input', (e) => {
        // Invert scale: higher slider value = faster animation (smaller ms delay)
        const val = parseInt(e.target.value, 10);
        this.playbackSpeed = Math.max(50, 1100 - val * 100);
        const speedValLabel = document.getElementById('viz-speed-val');
        if (speedValLabel) speedValLabel.textContent = `${val}x`;
        if (this.isPlaying) {
          this.pause();
          this.play();
        }
      });
    }

    // Input configuration controls
    const btnRandomArray = document.getElementById('viz-btn-random');
    const btnApplyCustom = document.getElementById('viz-btn-apply-custom');
    const btnPresetSorted = document.getElementById('viz-btn-preset-sorted');
    const btnPresetReversed = document.getElementById('viz-btn-preset-reversed');
    const arraySizeSlider = document.getElementById('viz-size-slider');

    if (btnRandomArray) {
      btnRandomArray.addEventListener('click', () => {
        const size = arraySizeSlider ? parseInt(arraySizeSlider.value, 10) : 10;
        this.generateRandomArray(size);
      });
    }

    if (btnApplyCustom) {
      btnApplyCustom.addEventListener('click', () => {
        const customInput = document.getElementById('viz-custom-input');
        if (customInput && customInput.value.trim()) {
          const parsed = customInput.value
            .split(',')
            .map(s => parseInt(s.trim(), 10))
            .filter(n => !isNaN(n) && n > 0 && n <= 100);
          if (parsed.length >= 3) {
            this.arrayData = parsed.slice(0, 30);
            this.reset();
          } else {
            alert('Please enter at least 3 positive integers (up to 100), separated by commas.');
          }
        }
      });
    }

    if (btnPresetSorted) {
      btnPresetSorted.addEventListener('click', () => {
        this.arrayData = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50];
        this.reset();
      });
    }

    if (btnPresetReversed) {
      btnPresetReversed.addEventListener('click', () => {
        this.arrayData = [50, 45, 40, 35, 30, 25, 20, 15, 10, 5];
        this.reset();
      });
    }

    if (arraySizeSlider) {
      arraySizeSlider.addEventListener('input', (e) => {
        const size = parseInt(e.target.value, 10);
        const label = document.getElementById('viz-size-val');
        if (label) label.textContent = `${size} items`;
        this.generateRandomArray(size);
      });
    }

    // Algorithm Selector dropdown
    const algoSelect = document.getElementById('viz-algo-select');
    if (algoSelect) {
      algoSelect.addEventListener('change', (e) => {
        this.loadAlgorithm(e.target.value);
      });
    }

    // Category Tabs
    const catTabs = document.querySelectorAll('.viz-category-tab');
    catTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        catTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const cat = tab.dataset.category;
        this.switchCategory(cat);
      });
    });

    // Compare Mode Toggle
    const compareToggle = document.getElementById('viz-toggle-compare');
    if (compareToggle) {
      compareToggle.addEventListener('change', (e) => {
        this.isCompareMode = e.target.checked;
        const compareContainer = document.getElementById('viz-compare-container');
        const singleContainer = document.getElementById('viz-single-container');
        if (this.isCompareMode) {
          if (compareContainer) compareContainer.classList.remove('hidden');
          if (singleContainer) singleContainer.classList.add('hidden');
          this.initCompareMode();
        } else {
          if (compareContainer) compareContainer.classList.add('hidden');
          if (singleContainer) singleContainer.classList.remove('hidden');
          this.reset();
        }
      });
    }

    // Compare Mode dropdowns
    const compSelect1 = document.getElementById('viz-compare-algo1');
    const compSelect2 = document.getElementById('viz-compare-algo2');
    if (compSelect1) compSelect1.addEventListener('change', (e) => { this.compareAlgo1 = e.target.value; this.initCompareMode(); });
    if (compSelect2) compSelect2.addEventListener('change', (e) => { this.compareAlgo2 = e.target.value; this.initCompareMode(); });
  }

  generateRandomArray(size = 10) {
    const arr = [];
    for (let i = 0; i < size; i++) {
      arr.push(Math.floor(Math.random() * 85) + 10);
    }
    this.arrayData = arr;
    const customInput = document.getElementById('viz-custom-input');
    if (customInput) customInput.value = arr.join(', ');
    this.reset();
  }

  switchCategory(category) {
    this.currentCategory = category;
    this.pause();

    // Show/hide category-specific panels
    const sortingControls = document.getElementById('viz-sorting-controls');
    const searchingControls = document.getElementById('viz-searching-controls');
    const graphControls = document.getElementById('viz-graph-controls');
    const dpControls = document.getElementById('viz-dp-controls');
    const btControls = document.getElementById('viz-backtracking-controls');

    if (sortingControls) sortingControls.classList.toggle('hidden', category !== 'sorting');
    if (searchingControls) searchingControls.classList.toggle('hidden', category !== 'searching');
    if (graphControls) graphControls.classList.toggle('hidden', category !== 'graph');
    if (dpControls) dpControls.classList.toggle('hidden', category !== 'dp');
    if (btControls) btControls.classList.toggle('hidden', category !== 'backtracking');

    // Update algo dropdown options based on category
    const algoSelect = document.getElementById('viz-algo-select');
    if (algoSelect) {
      algoSelect.innerHTML = '';
      let defaultAlgo = 'bubble-sort';

      if (category === 'sorting') {
        algoSelect.innerHTML = `
          <option value="bubble-sort">Bubble Sort</option>
          <option value="selection-sort">Selection Sort</option>
          <option value="insertion-sort">Insertion Sort</option>
          <option value="merge-sort">Merge Sort</option>
          <option value="quick-sort">Quick Sort</option>
          <option value="heap-sort">Heap Sort</option>
        `;
        defaultAlgo = 'bubble-sort';
      } else if (category === 'searching') {
        algoSelect.innerHTML = `
          <option value="linear-search">Linear Search</option>
          <option value="binary-search">Binary Search</option>
        `;
        defaultAlgo = 'binary-search';
      } else if (category === 'graph') {
        algoSelect.innerHTML = `
          <option value="dijkstra">Dijkstra Shortest Path</option>
          <option value="bfs">Breadth-First Search (BFS)</option>
          <option value="dfs">Depth-First Search (DFS)</option>
        `;
        defaultAlgo = 'dijkstra';
      } else if (category === 'dp') {
        algoSelect.innerHTML = `
          <option value="knapsack-01">0/1 Knapsack DP Table</option>
          <option value="lcs">Longest Common Subsequence</option>
        `;
        defaultAlgo = 'knapsack-01';
      } else if (category === 'backtracking') {
        algoSelect.innerHTML = `
          <option value="n-queens">N-Queens Problem</option>
        `;
        defaultAlgo = 'n-queens';
      }

      algoSelect.value = defaultAlgo;
      this.loadAlgorithm(defaultAlgo);
    }
  }

  loadAlgorithm(algoId) {
    this.currentAlgo = algoId;
    this.pause();

    // Map algoId to category if loaded directly
    if (['bubble-sort', 'selection-sort', 'insertion-sort', 'merge-sort', 'quick-sort', 'heap-sort'].includes(algoId)) {
      this.currentCategory = 'sorting';
    } else if (['linear-search', 'binary-search'].includes(algoId)) {
      this.currentCategory = 'searching';
    } else if (['dijkstra', 'bfs', 'dfs'].includes(algoId)) {
      this.currentCategory = 'graph';
    } else if (['knapsack-01', 'lcs'].includes(algoId)) {
      this.currentCategory = 'dp';
    } else if (['n-queens'].includes(algoId)) {
      this.currentCategory = 'backtracking';
    }

    this.reset();
  }

  reset() {
    this.pause();
    this.currentStepIdx = 0;

    if (this.isCompareMode && this.currentCategory === 'sorting') {
      this.initCompareMode();
      return;
    }

    // Generate steps according to algorithm
    if (this.currentCategory === 'sorting') {
      if (this.currentAlgo === 'bubble-sort') {
        this.steps = window.adaEngine.traceBubbleSort(this.arrayData);
      } else if (this.currentAlgo === 'selection-sort') {
        this.steps = window.adaEngine.traceSelectionSort(this.arrayData);
      } else if (this.currentAlgo === 'insertion-sort') {
        this.steps = window.adaEngine.traceInsertionSort(this.arrayData);
      } else if (this.currentAlgo === 'merge-sort') {
        this.steps = window.adaEngine.traceMergeSort(this.arrayData);
      } else if (this.currentAlgo === 'quick-sort') {
        this.steps = window.adaEngine.traceQuickSort(this.arrayData);
      } else if (this.currentAlgo === 'heap-sort') {
        this.steps = window.adaEngine.traceHeapSort(this.arrayData);
      }
    } else if (this.currentCategory === 'searching') {
      const targetInput = document.getElementById('viz-search-target');
      const target = targetInput ? parseInt(targetInput.value, 10) || 20 : 20;

      let searchArr = [...this.arrayData];
      if (this.currentAlgo === 'binary-search') {
        searchArr.sort((a, b) => a - b);
      }

      if (this.currentAlgo === 'linear-search') {
        const result = window.adaEngine.traceLinearSearch(searchArr, target);
        this.steps = result.steps;
      } else {
        const result = window.adaEngine.traceBinarySearch(searchArr, target);
        this.steps = result.steps;
      }
    } else if (this.currentCategory === 'dp') {
      if (this.currentAlgo === 'knapsack-01') {
        const cap = 7;
        const weights = [2, 3, 4, 5];
        const values = [3, 4, 5, 8];
        const res = window.adaEngine.traceKnapsack01(cap, weights, values);
        this.steps = res.steps;
      } else {
        const s1 = 'ABCBDAB';
        const s2 = 'BDCABA';
        const res = window.adaEngine.traceLCS(s1, s2);
        this.steps = res.steps;
      }
    } else if (this.currentCategory === 'backtracking') {
      const nQueensSelect = document.getElementById('viz-queens-n');
      const n = nQueensSelect ? parseInt(nQueensSelect.value, 10) || 4 : 4;
      const res = window.adaEngine.traceNQueens(n);
      this.steps = res.steps;
    } else if (this.currentCategory === 'graph') {
      this.setupGraphDemo();
      return;
    }

    this.renderCurrentStep();
  }

  setupGraphDemo() {
    // Built-in graph node states for interactive visualization
    this.steps = [
      {
        type: 'graph_init',
        nodes: [
          { id: '0', label: 'A (Src)', x: 60, y: 120, dist: 0, status: 'current' },
          { id: '1', label: 'B', x: 180, y: 50, dist: '∞', status: 'unvisited' },
          { id: '2', label: 'C', x: 180, y: 190, dist: '∞', status: 'unvisited' },
          { id: '3', label: 'D', x: 320, y: 50, dist: '∞', status: 'unvisited' },
          { id: '4', label: 'E', x: 320, y: 190, dist: '∞', status: 'unvisited' },
          { id: '5', label: 'F (Dest)', x: 440, y: 120, dist: '∞', status: 'unvisited' }
        ],
        edges: [
          { u: '0', v: '1', w: 4, status: 'default' },
          { u: '0', v: '2', w: 2, status: 'default' },
          { u: '1', v: '2', w: 1, status: 'default' },
          { u: '1', v: '3', w: 5, status: 'default' },
          { u: '2', v: '4', w: 8, status: 'default' },
          { u: '2', v: '3', w: 10, status: 'default' },
          { u: '3', v: '5', w: 6, status: 'default' },
          { u: '4', v: '5', w: 3, status: 'default' },
          { u: '3', v: '4', w: 2, status: 'default' }
        ],
        description: 'Graph initialized with 6 nodes. Source node A initialized with distance 0; all other nodes ∞.'
      },
      {
        type: 'graph_step',
        nodes: [
          { id: '0', label: 'A', x: 60, y: 120, dist: 0, status: 'visited' },
          { id: '1', label: 'B', x: 180, y: 50, dist: 4, status: 'candidate' },
          { id: '2', label: 'C', x: 180, y: 190, dist: 2, status: 'current' },
          { id: '3', label: 'D', x: 320, y: 50, dist: '∞', status: 'unvisited' },
          { id: '4', label: 'E', x: 320, y: 190, dist: '∞', status: 'unvisited' },
          { id: '5', label: 'F', x: 440, y: 120, dist: '∞', status: 'unvisited' }
        ],
        edges: [
          { u: '0', v: '1', w: 4, status: 'relaxed' },
          { u: '0', v: '2', w: 2, status: 'active_path' },
          { u: '1', v: '2', w: 1, status: 'default' },
          { u: '1', v: '3', w: 5, status: 'default' },
          { u: '2', v: '4', w: 8, status: 'default' },
          { u: '2', v: '3', w: 10, status: 'default' },
          { u: '3', v: '5', w: 6, status: 'default' },
          { u: '4', v: '5', w: 3, status: 'default' },
          { u: '3', v: '4', w: 2, status: 'default' }
        ],
        description: 'Visited A. Relaxed edges to B (dist: 4) and C (dist: 2). Extracted node C (min distance = 2).'
      },
      {
        type: 'graph_step',
        nodes: [
          { id: '0', label: 'A', x: 60, y: 120, dist: 0, status: 'visited' },
          { id: '1', label: 'B', x: 180, y: 50, dist: 3, status: 'current' },
          { id: '2', label: 'C', x: 180, y: 190, dist: 2, status: 'visited' },
          { id: '3', label: 'D', x: 320, y: 50, dist: 12, status: 'unvisited' },
          { id: '4', label: 'E', x: 320, y: 190, dist: 10, status: 'candidate' },
          { id: '5', label: 'F', x: 440, y: 120, dist: '∞', status: 'unvisited' }
        ],
        edges: [
          { u: '0', v: '1', w: 4, status: 'default' },
          { u: '0', v: '2', w: 2, status: 'active_path' },
          { u: '1', v: '2', w: 1, status: 'active_path' },
          { u: '1', v: '3', w: 5, status: 'default' },
          { u: '2', v: '4', w: 8, status: 'relaxed' },
          { u: '2', v: '3', w: 10, status: 'default' },
          { u: '3', v: '5', w: 6, status: 'default' },
          { u: '4', v: '5', w: 3, status: 'default' },
          { u: '3', v: '4', w: 2, status: 'default' }
        ],
        description: 'From C, edge to B with weight 1 relaxed dist[B] = min(4, 2 + 1) = 3! Extracted node B.'
      },
      {
        type: 'graph_complete',
        nodes: [
          { id: '0', label: 'A', x: 60, y: 120, dist: 0, status: 'shortest' },
          { id: '1', label: 'B', x: 180, y: 50, dist: 3, status: 'shortest' },
          { id: '2', label: 'C', x: 180, y: 190, dist: 2, status: 'shortest' },
          { id: '3', label: 'D', x: 320, y: 50, dist: 8, status: 'shortest' },
          { id: '4', label: 'E', x: 320, y: 190, dist: 10, status: 'visited' },
          { id: '5', label: 'F', x: 440, y: 120, dist: 14, status: 'shortest' }
        ],
        edges: [
          { u: '0', v: '2', w: 2, status: 'active_path' },
          { u: '2', v: '1', w: 1, status: 'active_path' },
          { u: '1', v: '3', w: 5, status: 'active_path' },
          { u: '3', v: '5', w: 6, status: 'active_path' },
          { u: '0', v: '1', w: 4, status: 'default' },
          { u: '2', v: '4', w: 8, status: 'default' },
          { u: '4', v: '5', w: 3, status: 'default' }
        ],
        description: 'Shortest path found! Optimal route from A to F is A -> C -> B -> D -> F with total cost = 14.'
      }
    ];

    this.renderCurrentStep();
  }

  play() {
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.updatePlayPauseUI();

    this.playbackTimer = setInterval(() => {
      if (this.currentStepIdx < this.steps.length - 1) {
        this.currentStepIdx++;
        this.renderCurrentStep();
      } else {
        this.pause();
      }
    }, this.playbackSpeed);
  }

  pause() {
    this.isPlaying = false;
    if (this.playbackTimer) {
      clearInterval(this.playbackTimer);
      this.playbackTimer = null;
    }
    this.updatePlayPauseUI();
  }

  stepNext() {
    this.pause();
    if (this.currentStepIdx < this.steps.length - 1) {
      this.currentStepIdx++;
      this.renderCurrentStep();
    }
  }

  stepPrev() {
    this.pause();
    if (this.currentStepIdx > 0) {
      this.currentStepIdx--;
      this.renderCurrentStep();
    }
  }

  runToCompletion() {
    this.pause();
    this.currentStepIdx = this.steps.length - 1;
    this.renderCurrentStep();
  }

  updatePlayPauseUI() {
    const btnPlay = document.getElementById('viz-btn-play');
    const btnPause = document.getElementById('viz-btn-pause');
    if (btnPlay && btnPause) {
      btnPlay.classList.toggle('hidden', this.isPlaying);
      btnPause.classList.toggle('hidden', !this.isPlaying);
    }
  }

  renderCurrentStep() {
    if (!this.steps || this.steps.length === 0) return;
    const step = this.steps[this.currentStepIdx];
    if (!step) return;

    // Update step counter & description
    const stepCounter = document.getElementById('viz-step-counter');
    const stepDesc = document.getElementById('viz-step-desc');
    const compCounter = document.getElementById('viz-stat-comparisons');
    const swapCounter = document.getElementById('viz-stat-swaps');

    if (stepCounter) stepCounter.textContent = `Step ${this.currentStepIdx + 1} of ${this.steps.length}`;
    if (stepDesc) stepDesc.textContent = step.description || '';
    if (compCounter) compCounter.textContent = step.comparisons !== undefined ? step.comparisons : '-';
    if (swapCounter) swapCounter.textContent = step.swaps !== undefined ? step.swaps : '-';

    // Dispatch to specific renderer
    const canvasContainer = document.getElementById('viz-canvas');
    if (!canvasContainer) return;

    if (this.currentCategory === 'sorting') {
      this.renderSortingArray(canvasContainer, step);
    } else if (this.currentCategory === 'searching') {
      this.renderSearchingArray(canvasContainer, step);
    } else if (this.currentCategory === 'graph') {
      this.renderGraphSvg(canvasContainer, step);
    } else if (this.currentCategory === 'dp') {
      this.renderDpTable(canvasContainer, step);
    } else if (this.currentCategory === 'backtracking') {
      this.renderChessboard(canvasContainer, step);
    }
  }

  // --- Sorting Visualizer Renderer ---
  renderSortingArray(container, step) {
    const arr = step.array || [];
    const maxVal = Math.max(...arr, 100);
    const indices = step.indices || [];
    const sortedIndices = step.sortedIndices || [];

    let html = `<div class="viz-bars-wrapper">`;

    arr.forEach((val, idx) => {
      let stateClass = '';
      if (sortedIndices.includes(idx)) {
        stateClass = 'bar-sorted';
      } else if (indices.includes(idx)) {
        if (step.type === 'swap') stateClass = 'bar-swap';
        else if (step.type === 'compare' || step.type === 'compare_pivot') stateClass = 'bar-compare';
        else if (step.type === 'pivot_selected' || step.type === 'pivot_locked') stateClass = 'bar-pivot';
        else stateClass = 'bar-active';
      }

      const heightPercent = Math.max(12, Math.round((val / maxVal) * 88));

      html += `
        <div class="viz-bar-col">
          <div class="viz-bar ${stateClass}" style="height: ${heightPercent}%;">
            <span class="viz-bar-val">${val}</span>
          </div>
          <span class="viz-bar-idx">${idx}</span>
        </div>
      `;
    });

    html += `</div>`;
    container.innerHTML = html;
  }

  // --- Searching Visualizer Renderer ---
  renderSearchingArray(container, step) {
    const arr = step.array || [];
    const target = step.target;
    const currentIdx = step.currentIndex;
    const mid = step.mid;
    const low = step.low;
    const high = step.high;

    let html = `
      <div class="viz-search-status-bar">
        <span>Target: <strong>${target}</strong></span>
        ${low !== undefined ? `<span>Range: [${low} .. ${high}]</span>` : ''}
        ${mid !== undefined && mid >= 0 ? `<span>Midpoint: index <strong>${mid}</strong> (${arr[mid]})</span>` : ''}
      </div>
      <div class="viz-search-grid">
    `;

    arr.forEach((val, idx) => {
      let stateClass = '';
      let badge = '';

      if (this.currentAlgo === 'binary-search') {
        if (idx === mid) {
          stateClass = val === target ? 'cell-match' : 'cell-mid';
          badge = '<span class="cell-tag tag-mid">MID</span>';
        } else if (idx === low) {
          stateClass = 'cell-bound';
          badge = '<span class="cell-tag tag-low">LOW</span>';
        } else if (idx === high) {
          stateClass = 'cell-bound';
          badge = '<span class="cell-tag tag-high">HIGH</span>';
        } else if (idx < low || idx > high) {
          stateClass = 'cell-inactive';
        }
      } else {
        if (idx === currentIdx) {
          stateClass = step.isMatch ? 'cell-match' : 'cell-active';
          badge = step.isMatch
            ? '<span class="cell-tag tag-match">MATCH</span>'
            : '<span class="cell-tag tag-check">CHECK</span>';
        } else if (idx < currentIdx) {
          stateClass = 'cell-inactive';
        }
      }

      html += `
        <div class="viz-search-cell ${stateClass}">
          ${badge}
          <div class="search-cell-val">${val}</div>
          <div class="search-cell-idx">idx: ${idx}</div>
        </div>
      `;
    });

    html += `</div>`;
    container.innerHTML = html;
  }

  // --- Graph Visualizer Renderer (SVG) ---
  renderGraphSvg(container, step) {
    const nodes = step.nodes || [];
    const edges = step.edges || [];

    let svg = `
      <div class="viz-graph-wrapper">
        <svg viewBox="0 0 520 250" class="viz-graph-svg">
          <defs>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="glow"/>
              <feComposite in="SourceGraphic" in2="glow" operator="over"/>
            </filter>
          </defs>
    `;

    // Draw edges
    edges.forEach(edge => {
      const uNode = nodes.find(n => n.id === edge.u);
      const vNode = nodes.find(n => n.id === edge.v);
      if (!uNode || !vNode) return;

      let edgeClass = 'edge-default';
      if (edge.status === 'active_path') edgeClass = 'edge-active-path';
      else if (edge.status === 'relaxed') edgeClass = 'edge-relaxed';

      const midX = (uNode.x + vNode.x) / 2;
      const midY = (uNode.y + vNode.y) / 2;

      svg += `
        <line x1="${uNode.x}" y1="${uNode.y}" x2="${vNode.x}" y2="${vNode.y}" class="graph-edge ${edgeClass}" />
        <rect x="${midX - 10}" y="${midY - 10}" width="20" height="20" rx="4" class="edge-weight-bg" />
        <text x="${midX}" y="${midY + 4}" text-anchor="middle" class="edge-weight-text">${edge.w}</text>
      `;
    });

    // Draw nodes
    nodes.forEach(node => {
      let nodeClass = 'node-unvisited';
      if (node.status === 'current') nodeClass = 'node-current';
      else if (node.status === 'visited') nodeClass = 'node-visited';
      else if (node.status === 'candidate') nodeClass = 'node-candidate';
      else if (node.status === 'shortest') nodeClass = 'node-shortest';

      svg += `
        <g class="graph-node-group" transform="translate(${node.x}, ${node.y})">
          <circle r="22" class="graph-node-circle ${nodeClass}" />
          <text text-anchor="middle" dy="-3" class="node-label">${node.label.slice(0, 1)}</text>
          <text text-anchor="middle" dy="12" class="node-dist">d:${node.dist}</text>
        </g>
      `;
    });

    svg += `
        </svg>
        <div class="viz-graph-table">
          <h4>Distance Table</h4>
          <table class="ada-data-table">
            <thead><tr><th>Vertex</th><th>Distance</th><th>Status</th></tr></thead>
            <tbody>
              ${nodes.map(n => `
                <tr class="${n.status === 'current' ? 'row-highlight' : ''}">
                  <td><strong>${n.label}</strong></td>
                  <td>${n.dist}</td>
                  <td><span class="badge badge-${n.status}">${n.status}</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;

    container.innerHTML = svg;
  }

  // --- Dynamic Programming Table Renderer ---
  renderDpTable(container, step) {
    const table = step.dpTable || [];
    const currentI = step.currentI;
    const currentJ = step.currentW !== undefined ? step.currentW : step.currentJ;
    const sourceCells = step.sourceCells || [];

    let html = `
      <div class="viz-dp-wrapper">
        <div class="viz-dp-formula-banner">
          ${step.formula ? `<strong>Recurrence:</strong> <code>${step.formula}</code>` : `<strong>Formula:</strong> State Transition Matrix`}
        </div>
        <div class="viz-table-scroll">
          <table class="viz-dp-matrix">
            <thead>
              <tr>
                <th>i \\ w</th>
                ${table[0].map((_, col) => `<th>${col}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
    `;

    table.forEach((row, rIdx) => {
      html += `<tr><th>${rIdx}</th>`;
      row.forEach((cellVal, cIdx) => {
        let cellClass = '';
        if (rIdx === currentI && cIdx === currentJ) {
          cellClass = 'dp-cell-current';
        } else if (sourceCells.some(sc => sc.r === rIdx && sc.c === cIdx)) {
          cellClass = 'dp-cell-source';
        }

        html += `<td class="${cellClass}">${cellVal}</td>`;
      });
      html += `</tr>`;
    });

    html += `
            </tbody>
          </table>
        </div>
      </div>
    `;

    container.innerHTML = html;
  }

  // --- Backtracking Chessboard Renderer ---
  renderChessboard(container, step) {
    const board = step.board || [];
    const n = board.length;
    const currentRow = step.row;
    const currentCol = step.col;

    let html = `
      <div class="viz-chessboard-wrapper">
        <div class="viz-board-header">
          <span>Chessboard: <strong>${n} x ${n}</strong></span>
          ${step.conflictReason ? `<span class="badge badge-conflict">Conflict: ${step.conflictReason}</span>` : ''}
          ${step.type === 'solution_found' ? `<span class="badge badge-success">Solution Discovered!</span>` : ''}
        </div>
        <div class="viz-board-grid" style="grid-template-columns: repeat(${n}, 1fr);">
    `;

    for (let r = 0; r < n; r++) {
      for (let c = 0; c < n; c++) {
        const isDark = (r + c) % 2 === 1;
        const hasQueen = board[r][c] === 'Q';
        const isCurrent = r === currentRow && c === currentCol;

        let squareClass = isDark ? 'sq-dark' : 'sq-light';
        if (isCurrent) {
          squareClass += step.type === 'conflict' ? ' sq-conflict' : ' sq-eval';
        }
        if (hasQueen) {
          squareClass += ' sq-queen';
        }

        html += `
          <div class="viz-board-square ${squareClass}">
            ${hasQueen ? '<span class="queen-icon">♛</span>' : ''}
          </div>
        `;
      }
    }

    html += `
        </div>
      </div>
    `;

    container.innerHTML = html;
  }

  // --- Side-by-side Sorting Compare Mode ---
  initCompareMode() {
    if (this.currentCategory !== 'sorting') return;

    if (this.compareAlgo1 === 'bubble-sort') this.stepsCompare1 = window.adaEngine.traceBubbleSort(this.arrayData);
    else if (this.compareAlgo1 === 'selection-sort') this.stepsCompare1 = window.adaEngine.traceSelectionSort(this.arrayData);
    else if (this.compareAlgo1 === 'insertion-sort') this.stepsCompare1 = window.adaEngine.traceInsertionSort(this.arrayData);
    else if (this.compareAlgo1 === 'merge-sort') this.stepsCompare1 = window.adaEngine.traceMergeSort(this.arrayData);
    else if (this.compareAlgo1 === 'quick-sort') this.stepsCompare1 = window.adaEngine.traceQuickSort(this.arrayData);
    else if (this.compareAlgo1 === 'heap-sort') this.stepsCompare1 = window.adaEngine.traceHeapSort(this.arrayData);

    if (this.compareAlgo2 === 'bubble-sort') this.stepsCompare2 = window.adaEngine.traceBubbleSort(this.arrayData);
    else if (this.compareAlgo2 === 'selection-sort') this.stepsCompare2 = window.adaEngine.traceSelectionSort(this.arrayData);
    else if (this.compareAlgo2 === 'insertion-sort') this.stepsCompare2 = window.adaEngine.traceInsertionSort(this.arrayData);
    else if (this.compareAlgo2 === 'merge-sort') this.stepsCompare2 = window.adaEngine.traceMergeSort(this.arrayData);
    else if (this.compareAlgo2 === 'quick-sort') this.stepsCompare2 = window.adaEngine.traceQuickSort(this.arrayData);
    else if (this.compareAlgo2 === 'heap-sort') this.stepsCompare2 = window.adaEngine.traceHeapSort(this.arrayData);

    const finish1 = this.stepsCompare1[this.stepsCompare1.length - 1];
    const finish2 = this.stepsCompare2[this.stepsCompare2.length - 1];

    const c1El = document.getElementById('compare-canvas-1');
    const c2El = document.getElementById('compare-canvas-2');
    const c1Stats = document.getElementById('compare-stats-1');
    const c2Stats = document.getElementById('compare-stats-2');

    if (c1El && finish1) this.renderSortingArray(c1El, finish1);
    if (c2El && finish2) this.renderSortingArray(c2El, finish2);

    if (c1Stats && finish1) {
      c1Stats.innerHTML = `
        <div class="stat-badge">Total Steps: <strong>${this.stepsCompare1.length}</strong></div>
        <div class="stat-badge">Comparisons: <strong>${finish1.comparisons}</strong></div>
        <div class="stat-badge">Swaps/Writes: <strong>${finish1.swaps}</strong></div>
      `;
    }

    if (c2Stats && finish2) {
      c2Stats.innerHTML = `
        <div class="stat-badge">Total Steps: <strong>${this.stepsCompare2.length}</strong></div>
        <div class="stat-badge">Comparisons: <strong>${finish2.comparisons}</strong></div>
        <div class="stat-badge">Swaps/Writes: <strong>${finish2.swaps}</strong></div>
      `;
    }
  }
}

window.adaVisualizer = new VisualizerController();
