/**
 * ADA Explorer - Complexity Lab
 * Interactive Asymptotic Growth Curves (SVG), Algorithm Comparison Matrix,
 * and Live In-Browser Runtime Benchmark using performance.now().
 */

class ComplexityLab {
  constructor() {
    this.maxN = 40;
    this.selectedFunctions = {
      'O(1)': true,
      'O(log n)': true,
      'O(n)': true,
      'O(n log n)': true,
      'O(n^2)': true,
      'O(n^3)': false,
      'O(2^n)': false,
      'O(n!)': false
    };

    this.benchmarkRunning = false;
  }

  init() {
    this.setupEventListeners();
    this.renderGrowthGraph();
    this.renderComparisonTable();
  }

  setupEventListeners() {
    const sliderN = document.getElementById('complexity-slider-n');
    if (sliderN) {
      sliderN.addEventListener('input', (e) => {
        this.maxN = parseInt(e.target.value, 10);
        const label = document.getElementById('complexity-val-n');
        if (label) label.textContent = `n = ${this.maxN}`;
        this.renderGrowthGraph();
      });
    }

    const checkboxes = document.querySelectorAll('.curve-toggle-checkbox');
    checkboxes.forEach(cb => {
      cb.addEventListener('change', (e) => {
        this.selectedFunctions[e.target.value] = e.target.checked;
        this.renderGrowthGraph();
      });
    });

    // Algorithm Comparison Selectors
    const compSelect1 = document.getElementById('comp-matrix-algo1');
    const compSelect2 = document.getElementById('comp-matrix-algo2');
    const compSelect3 = document.getElementById('comp-matrix-algo3');

    if (compSelect1) compSelect1.addEventListener('change', () => this.renderComparisonTable());
    if (compSelect2) compSelect2.addEventListener('change', () => this.renderComparisonTable());
    if (compSelect3) compSelect3.addEventListener('change', () => this.renderComparisonTable());

    // Benchmark Run Button
    const btnRunBenchmark = document.getElementById('btn-run-benchmark');
    if (btnRunBenchmark) {
      btnRunBenchmark.addEventListener('click', () => this.runLiveBenchmark());
    }
  }

  // --- Asymptotic Growth Curve SVG Generator ---
  renderGrowthGraph() {
    const svgContainer = document.getElementById('complexity-svg-container');
    if (!svgContainer) return;

    const width = 640;
    const height = 340;
    const padX = 55;
    const padY = 35;
    const plotW = width - padX - 25;
    const plotH = height - padY - 25;

    // Define mathematical functions (with safety ceilings)
    const funcs = {
      'O(1)': { color: '#10B981', fn: (n) => 1 },
      'O(log n)': { color: '#06B6D4', fn: (n) => Math.log2(Math.max(1, n)) },
      'O(n)': { color: '#3B82F6', fn: (n) => n },
      'O(n log n)': { color: '#6366F1', fn: (n) => n * Math.log2(Math.max(1, n)) },
      'O(n^2)': { color: '#F59E0B', fn: (n) => Math.pow(n, 2) },
      'O(n^3)': { color: '#EC4899', fn: (n) => Math.pow(n, 3) },
      'O(2^n)': { color: '#EF4444', fn: (n) => Math.pow(2, Math.min(n, 25)) },
      'O(n!)': {
        color: '#8B5CF6',
        fn: (n) => {
          let fact = 1;
          for (let i = 2; i <= Math.min(n, 10); i++) fact *= i;
          return fact;
        }
      }
    };

    // Calculate maximum Y scale based on active curves at n = maxN
    let maxY = 100;
    for (const [name, config] of Object.entries(funcs)) {
      if (this.selectedFunctions[name]) {
        const valAtMax = config.fn(this.maxN);
        if (Number.isFinite(valAtMax) && valAtMax > maxY) {
          maxY = Math.min(valAtMax, 4000); // Clamp upper display ceiling
        }
      }
    }

    const scaleX = (n) => padX + (n / this.maxN) * plotW;
    const scaleY = (y) => height - padY - (Math.min(y, maxY) / maxY) * plotH;

    let svg = `
      <svg viewBox="0 0 ${width} ${height}" class="complexity-chart-svg">
        <!-- Axes -->
        <line x1="${padX}" y1="${height - padY}" x2="${width - 20}" y2="${height - padY}" class="axis-line" />
        <line x1="${padX}" y1="${height - padY}" x2="${padX}" y2="20" class="axis-line" />

        <!-- Grid Lines & Y-Ticks -->
        <line x1="${padX}" y1="${scaleY(maxY * 0.25)}" x2="${width - 20}" y2="${scaleY(maxY * 0.25)}" class="grid-line" />
        <text x="${padX - 8}" y="${scaleY(maxY * 0.25) + 4}" text-anchor="end" class="axis-tick-text">${Math.round(maxY * 0.25)}</text>

        <line x1="${padX}" y1="${scaleY(maxY * 0.5)}" x2="${width - 20}" y2="${scaleY(maxY * 0.5)}" class="grid-line" />
        <text x="${padX - 8}" y="${scaleY(maxY * 0.5) + 4}" text-anchor="end" class="axis-tick-text">${Math.round(maxY * 0.5)}</text>

        <line x1="${padX}" y1="${scaleY(maxY * 0.75)}" x2="${width - 20}" y2="${scaleY(maxY * 0.75)}" class="grid-line" />
        <text x="${padX - 8}" y="${scaleY(maxY * 0.75) + 4}" text-anchor="end" class="axis-tick-text">${Math.round(maxY * 0.75)}</text>

        <line x1="${padX}" y1="${scaleY(maxY)}" x2="${width - 20}" y2="${scaleY(maxY)}" class="grid-line" />
        <text x="${padX - 8}" y="${scaleY(maxY) + 4}" text-anchor="end" class="axis-tick-text">${Math.round(maxY)}</text>

        <!-- X-Ticks -->
        <text x="${padX}" y="${height - padY + 18}" text-anchor="middle" class="axis-tick-text">0</text>
        <text x="${scaleX(this.maxN * 0.5)}" y="${height - padY + 18}" text-anchor="middle" class="axis-tick-text">${Math.round(this.maxN * 0.5)}</text>
        <text x="${scaleX(this.maxN)}" y="${height - padY + 18}" text-anchor="middle" class="axis-tick-text">${this.maxN}</text>

        <text x="${width / 2}" y="${height - 6}" text-anchor="middle" class="axis-title">Input Size (n)</text>
        <text x="15" y="${height / 2}" text-anchor="middle" transform="rotate(-90, 15, ${height / 2})" class="axis-title">Operations Count f(n)</text>
    `;

    // Draw active curves
    for (const [name, config] of Object.entries(funcs)) {
      if (!this.selectedFunctions[name]) continue;

      let pathD = '';
      const samples = 60;
      for (let s = 1; s <= samples; s++) {
        const nVal = (s / samples) * this.maxN;
        const yVal = config.fn(nVal);
        const px = scaleX(nVal);
        const py = scaleY(yVal);
        pathD += s === 1 ? `M ${px} ${py}` : ` L ${px} ${py}`;
      }

      svg += `
        <path d="${pathD}" fill="none" stroke="${config.color}" stroke-width="2.5" stroke-linecap="round" class="growth-curve" />
        <circle cx="${scaleX(this.maxN)}" cy="${scaleY(config.fn(this.maxN))}" r="4" fill="${config.color}" />
        <text x="${scaleX(this.maxN) - 5}" y="${scaleY(config.fn(this.maxN)) - 8}" fill="${config.color}" text-anchor="end" font-size="11" font-weight="600">${name}</text>
      `;
    }

    svg += `</svg>`;
    svgContainer.innerHTML = svg;
  }

  // --- Multi-Algorithm Comparison Matrix ---
  renderComparisonTable() {
    const tableContainer = document.getElementById('comp-matrix-container');
    if (!tableContainer) return;

    const id1 = document.getElementById('comp-matrix-algo1')?.value || 'merge-sort';
    const id2 = document.getElementById('comp-matrix-algo2')?.value || 'quick-sort';
    const id3 = document.getElementById('comp-matrix-algo3')?.value || 'heap-sort';

    const algo1 = window.ALGORITHMS_DATA.find(a => a.id === id1) || window.ALGORITHMS_DATA[6];
    const algo2 = window.ALGORITHMS_DATA.find(a => a.id === id2) || window.ALGORITHMS_DATA[7];
    const algo3 = window.ALGORITHMS_DATA.find(a => a.id === id3) || window.ALGORITHMS_DATA[8];

    const algos = [algo1, algo2, algo3];

    let html = `
      <div class="table-responsive">
        <table class="ada-data-table matrix-table">
          <thead>
            <tr>
              <th style="width: 22%;">Metric / Property</th>
              ${algos.map(a => `<th><span class="matrix-algo-title">${a.name}</span><br><span class="text-subtle">${a.category}</span></th>`).join('')}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Best-Case Time</strong></td>
              ${algos.map(a => `<td><span class="complexity-pill best">${a.timeComplexity.best}</span></td>`).join('')}
            </tr>
            <tr>
              <td><strong>Average-Case Time</strong></td>
              ${algos.map(a => `<td><span class="complexity-pill avg">${a.timeComplexity.average}</span></td>`).join('')}
            </tr>
            <tr>
              <td><strong>Worst-Case Time</strong></td>
              ${algos.map(a => `<td><span class="complexity-pill worst">${a.timeComplexity.worst}</span></td>`).join('')}
            </tr>
            <tr>
              <td><strong>Auxiliary Space</strong></td>
              ${algos.map(a => `<td><code>${a.spaceComplexity.auxiliary}</code></td>`).join('')}
            </tr>
            <tr>
              <td><strong>Algorithmic Paradigm</strong></td>
              ${algos.map(a => `<td>${a.category}</td>`).join('')}
            </tr>
            <tr>
              <td><strong>Key Advantages</strong></td>
              ${algos.map(a => `<td><ul class="matrix-list">${a.advantages.slice(0, 2).map(adv => `<li>${adv}</li>`).join('')}</ul></td>`).join('')}
            </tr>
            <tr>
              <td><strong>Primary Limitations</strong></td>
              ${algos.map(a => `<td><ul class="matrix-list">${a.limitations.slice(0, 2).map(lim => `<li>${lim}</li>`).join('')}</ul></td>`).join('')}
            </tr>
          </tbody>
        </table>
      </div>
    `;

    tableContainer.innerHTML = html;
  }

  // --- Real In-Browser Benchmark Runner ---
  async runLiveBenchmark() {
    if (this.benchmarkRunning) return;
    this.benchmarkRunning = true;

    const btn = document.getElementById('btn-run-benchmark');
    const chartContainer = document.getElementById('benchmark-chart-container');
    const sizeSelect = document.getElementById('benchmark-input-size');
    const inputSize = sizeSelect ? parseInt(sizeSelect.value, 10) || 1000 : 1000;

    if (btn) {
      btn.disabled = true;
      btn.innerHTML = `<span class="spinner"></span> Benchmarking (${inputSize} elements)...`;
    }

    // Generate random test dataset
    const baseArray = [];
    for (let i = 0; i < inputSize; i++) {
      baseArray.push(Math.floor(Math.random() * 100000));
    }

    const testAlgorithms = [
      {
        name: 'Merge Sort',
        theoretical: 'O(n log n)',
        run: (arr) => {
          function ms(a) {
            if (a.length <= 1) return a;
            const mid = Math.floor(a.length / 2);
            const left = ms(a.slice(0, mid));
            const right = ms(a.slice(mid));
            const res = [];
            let i = 0, j = 0;
            while (i < left.length && j < right.length) {
              if (left[i] <= right[j]) res.push(left[i++]);
              else res.push(right[j++]);
            }
            while (i < left.length) res.push(left[i++]);
            while (j < right.length) res.push(right[j++]);
            return res;
          }
          return ms(arr);
        }
      },
      {
        name: 'Quick Sort',
        theoretical: 'O(n log n)',
        run: (arr) => {
          const a = [...arr];
          function qs(l, r) {
            if (l >= r) return;
            const p = a[r];
            let i = l - 1;
            for (let j = l; j < r; j++) {
              if (a[j] <= p) {
                i++;
                const t = a[i]; a[i] = a[j]; a[j] = t;
              }
            }
            const t = a[i + 1]; a[i + 1] = a[r]; a[r] = t;
            const pi = i + 1;
            qs(l, pi - 1);
            qs(pi + 1, r);
          }
          qs(0, a.length - 1);
          return a;
        }
      },
      {
        name: 'Native JS Sort (Timsort)',
        theoretical: 'O(n log n)',
        run: (arr) => [...arr].sort((a, b) => a - b)
      },
      {
        name: 'Insertion Sort',
        theoretical: 'O(n^2)',
        run: (arr) => {
          // If array is huge, limit to max 3000 to prevent browser lockup
          const limit = Math.min(arr.length, 3000);
          const a = arr.slice(0, limit);
          for (let i = 1; i < a.length; i++) {
            const key = a[i];
            let j = i - 1;
            while (j >= 0 && a[j] > key) {
              a[j + 1] = a[j];
              j--;
            }
            a[j + 1] = key;
          }
          return a;
        }
      },
      {
        name: 'Bubble Sort',
        theoretical: 'O(n^2)',
        run: (arr) => {
          const limit = Math.min(arr.length, 2500);
          const a = arr.slice(0, limit);
          const n = a.length;
          for (let i = 0; i < n - 1; i++) {
            let swapped = false;
            for (let j = 0; j < n - i - 1; j++) {
              if (a[j] > a[j + 1]) {
                const temp = a[j]; a[j] = a[j + 1]; a[j + 1] = temp;
                swapped = true;
              }
            }
            if (!swapped) break;
          }
          return a;
        }
      }
    ];

    const results = [];

    // Allow UI to update before blocking JS execution
    await new Promise(r => setTimeout(r, 50));

    for (const test of testAlgorithms) {
      const times = [];
      const iterations = 3;

      for (let iter = 0; iter < iterations; iter++) {
        const copy = [...baseArray];
        const t0 = performance.now();
        test.run(copy);
        const t1 = performance.now();
        times.push(t1 - t0);
      }

      const avgTime = times.reduce((a, b) => a + b, 0) / times.length;
      results.push({
        name: test.name,
        theoretical: test.theoretical,
        timeMs: avgTime
      });
    }

    // Render bar chart results
    const maxTime = Math.max(...results.map(r => r.timeMs), 0.1);

    let chartHtml = `
      <div class="benchmark-results-box">
        <div class="benchmark-meta">
          <span>Benchmarked on <strong>${inputSize}</strong> random integers</span>
          <span>Averaged over <strong>3</strong> runs using <code>performance.now()</code></span>
        </div>
        <div class="benchmark-bars-list">
    `;

    results.forEach(res => {
      const barWidth = Math.max(5, Math.min(100, (res.timeMs / maxTime) * 100));
      const isQuadratic = res.theoretical.includes('n^2');
      const barColor = isQuadratic ? 'var(--color-warning)' : 'var(--color-primary)';

      chartHtml += `
        <div class="benchmark-row">
          <div class="benchmark-info">
            <span class="benchmark-name">${res.name}</span>
            <span class="benchmark-complexity">${res.theoretical}</span>
          </div>
          <div class="benchmark-track">
            <div class="benchmark-fill" style="width: ${barWidth}%; background-color: ${barColor};"></div>
          </div>
          <div class="benchmark-time">${res.timeMs.toFixed(2)} ms</div>
        </div>
      `;
    });

    chartHtml += `
        </div>
        <div class="benchmark-disclaimer">
          <p>⚠️ <em>Note:</em> Practical execution time is subject to browser JavaScript JIT compilation, CPU architecture, memory bandwidth, and garbage collection. While O(n log n) asymptotically dominates O(n^2), constant factors dictate performance for smaller inputs.</p>
        </div>
      </div>
    `;

    if (chartContainer) chartContainer.innerHTML = chartHtml;

    if (btn) {
      btn.disabled = false;
      btn.innerHTML = `Run Live Benchmark`;
    }
    this.benchmarkRunning = false;
  }
}

window.adaComplexity = new ComplexityLab();
