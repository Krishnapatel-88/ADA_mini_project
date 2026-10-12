/**
 * ADA Explorer - Numerical Solver
 * Deterministic step-by-step numerical calculators for ADA university examinations.
 * Supports: Master Theorem, Fractional Knapsack, 0/1 Knapsack, LCS, Matrix Chain Multiplication.
 */

class NumericalSolver {
  init() {
    this.setupEventListeners();
    // Solve default on load
    this.solveMasterTheorem();
  }

  setupEventListeners() {
    // Problem Type Switcher
    const solverTypeSelect = document.getElementById('solver-type-select');
    if (solverTypeSelect) {
      solverTypeSelect.addEventListener('change', (e) => {
        this.switchProblemType(e.target.value);
      });
    }

    // Solve Buttons
    const btnSolveMaster = document.getElementById('btn-solve-master');
    const btnSolveFracKnap = document.getElementById('btn-solve-frac-knap');
    const btnSolve01Knap = document.getElementById('btn-solve-01-knap');
    const btnSolveLCS = document.getElementById('btn-solve-lcs');
    const btnSolveMCM = document.getElementById('btn-solve-mcm');

    if (btnSolveMaster) btnSolveMaster.addEventListener('click', () => this.solveMasterTheorem());
    if (btnSolveFracKnap) btnSolveFracKnap.addEventListener('click', () => this.solveFractionalKnapsack());
    if (btnSolve01Knap) btnSolve01Knap.addEventListener('click', () => this.solve01Knapsack());
    if (btnSolveLCS) btnSolveLCS.addEventListener('click', () => this.solveLCS());
    if (btnSolveMCM) btnSolveMCM.addEventListener('click', () => this.solveMatrixChainMultiplication());
  }

  switchProblemType(type) {
    const panels = document.querySelectorAll('.solver-input-panel');
    panels.forEach(p => p.classList.add('hidden'));

    const activePanel = document.getElementById(`solver-panel-${type}`);
    if (activePanel) activePanel.classList.remove('hidden');

    // Run solver for newly selected type
    if (type === 'master') this.solveMasterTheorem();
    else if (type === 'frac-knapsack') this.solveFractionalKnapsack();
    else if (type === '01-knapsack') this.solve01Knapsack();
    else if (type === 'lcs') this.solveLCS();
    else if (type === 'mcm') this.solveMatrixChainMultiplication();
  }

  // ==========================================
  // 1. MASTER THEOREM SOLVER
  // ==========================================
  solveMasterTheorem() {
    const outputContainer = document.getElementById('solver-output');
    if (!outputContainer) return;

    const a = parseFloat(document.getElementById('mt-param-a')?.value) || 2;
    const b = parseFloat(document.getElementById('mt-param-b')?.value) || 2;
    const k = parseFloat(document.getElementById('mt-param-k')?.value) || 1;
    const p = parseFloat(document.getElementById('mt-param-p')?.value) || 0;

    let html = `
      <div class="solver-solution-card">
        <h3>Master Theorem Derivation</h3>
        <p class="solver-intro">Solving recurrence: <code>T(n) = ${a}T(n / ${b}) + Θ(n<sup>${k}</sup>${p > 0 ? ` log<sup>${p}</sup> n` : ''})</code></p>
    `;

    // Validation
    if (a < 1) {
      html += `
        <div class="alert alert-danger">
          <strong>Condition Violation:</strong> Master Theorem requires <code>a ≥ 1</code> (number of subproblems cannot be less than 1).
        </div></div>`;
      outputContainer.innerHTML = html;
      return;
    }

    if (b <= 1) {
      html += `
        <div class="alert alert-danger">
          <strong>Condition Violation:</strong> Master Theorem requires <code>b > 1</code> (subproblem size must strictly decrease).
        </div></div>`;
      outputContainer.innerHTML = html;
      return;
    }

    // Critical exponent
    const cCrit = Math.log(a) / Math.log(b);
    const diff = cCrit - k;
    const tol = 1e-5;

    html += `
      <div class="solver-step">
        <h4>Step 1: Compute the Critical Exponent</h4>
        <p>The watershed function is determined by <code>n<sup>log<sub>b</sub> a</sup></code>:</p>
        <p class="math-callout">log<sub>b</sub> a = log<sub>${b}</sub>(${a}) = ln(${a}) / ln(${b}) ≈ <strong>${cCrit.toFixed(3)}</strong></p>
      </div>

      <div class="solver-step">
        <h4>Step 2: Compare Critical Exponent with f(n)</h4>
        <p>Here <code>f(n) = Θ(n<sup>${k}</sup>${p > 0 ? ` log<sup>${p}</sup> n` : ''})</code>, so <code>k = ${k}</code>.</p>
        <p>Difference <code>(log<sub>b</sub> a - k) = ${cCrit.toFixed(3)} - ${k} = ${(diff).toFixed(3)}</code>.</p>
      </div>
    `;

    let finalComplexity = '';
    let caseExplanation = '';

    if (diff > tol) {
      // Case 1
      finalComplexity = `Θ(n<sup>${cCrit.toFixed(2)}</sup>)`;
      caseExplanation = `
        <div class="case-badge case-1">Case 1: Leaves Dominate</div>
        <p>Since <code>log<sub>b</sub> a > k</code>, there exists ε > 0 such that <code>f(n) = O(n<sup>log<sub>b</sub> a - ε</sup>)</code>.</p>
        <p>The work done at the leaf level of the recursion tree dominates the dividing and combining work at the root.</p>
      `;
    } else if (Math.abs(diff) <= tol) {
      // Case 2
      const newP = p + 1;
      const logTerm = newP === 1 ? 'log n' : `log<sup>${newP}</sup> n`;
      const nTerm = k === 0 ? '' : k === 1 ? 'n ' : `n<sup>${k}</sup> `;
      finalComplexity = `Θ(${nTerm}${logTerm})`;
      caseExplanation = `
        <div class="case-badge case-2">Case 2: Balanced Work Across All Levels</div>
        <p>Since <code>log<sub>b</sub> a = k</code> and <code>p = ${p} ≥ 0</code>:</p>
        <p>The work performed at each of the <code>log<sub>b</sub> n</code> levels of the recursion tree is asymptotically equal.</p>
        <p>Multiplying by the height of the tree adds one logarithmic factor: <code>log<sup>${p}</sup> n → log<sup>${newP}</sup> n</code>.</p>
      `;
    } else {
      // Case 3
      const logTerm = p > 0 ? ` log<sup>${p}</sup> n` : '';
      finalComplexity = `Θ(n<sup>${k}</sup>${logTerm})`;
      caseExplanation = `
        <div class="case-badge case-3">Case 3: Root Dominates</div>
        <p>Since <code>log<sub>b</sub> a < k</code>, there exists ε > 0 such that <code>f(n) = Ω(n<sup>log<sub>b</sub> a + ε</sup>)</code>.</p>
        <p>The root dividing and combining work dominates the subproblems.</p>
        <p><em>Regularity Condition Check:</em> <code>a · f(n/b) ≤ c · f(n)</code> holds for constant c < 1 when f(n) is polynomial.</p>
      `;
    }

    html += `
      <div class="solver-step">
        <h4>Step 3: Applicable Master Theorem Case</h4>
        ${caseExplanation}
      </div>

      <div class="solver-result-box">
        <h4>Final Asymptotic Time Complexity:</h4>
        <div class="final-answer">${finalComplexity}</div>
        <p class="text-subtle">Auxiliary Stack Space: <code>O(log n)</code></p>
      </div>
    </div>`;

    outputContainer.innerHTML = html;
  }

  // ==========================================
  // 2. FRACTIONAL KNAPSACK SOLVER
  // ==========================================
  solveFractionalKnapsack() {
    const outputContainer = document.getElementById('solver-output');
    if (!outputContainer) return;

    const capacity = parseFloat(document.getElementById('fk-capacity')?.value) || 50;
    const rawItems = document.getElementById('fk-items')?.value || '10:60, 20:100, 30:120';

    // Parse items (format "wt:val, wt:val")
    const items = [];
    const pairs = rawItems.split(',');
    pairs.forEach((pair, idx) => {
      const parts = pair.split(':');
      if (parts.length === 2) {
        const wt = parseFloat(parts[0].trim());
        const val = parseFloat(parts[1].trim());
        if (!isNaN(wt) && !isNaN(val) && wt > 0 && val >= 0) {
          items.push({ id: idx + 1, name: `Item ${idx + 1}`, weight: wt, value: val, ratio: val / wt });
        }
      }
    });

    if (items.length === 0) {
      outputContainer.innerHTML = `<div class="alert alert-danger">Please enter valid items in the format: weight:value, weight:value</div>`;
      return;
    }

    // Step 1: Sort by ratio
    items.sort((a, b) => b.ratio - a.ratio);

    let html = `
      <div class="solver-solution-card">
        <h3>Fractional Knapsack (Greedy Approach)</h3>
        <p class="solver-intro">Knapsack Capacity W = <strong>${capacity}</strong></p>

        <div class="solver-step">
          <h4>Step 1: Calculate Value-to-Weight Ratio and Sort Descending</h4>
          <table class="ada-data-table">
            <thead><tr><th>Rank</th><th>Item</th><th>Weight (w<sub>i</sub>)</th><th>Value (v<sub>i</sub>)</th><th>Ratio (v<sub>i</sub> / w<sub>i</sub>)</th></tr></thead>
            <tbody>
              ${items.map((it, idx) => `
                <tr>
                  <td>${idx + 1}</td>
                  <td>${it.name}</td>
                  <td>${it.weight}</td>
                  <td>${it.value}</td>
                  <td><strong>${it.ratio.toFixed(2)}</strong></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <div class="solver-step">
          <h4>Step 2: Greedily Take Items</h4>
          <table class="ada-data-table">
            <thead><tr><th>Step</th><th>Item Selected</th><th>Weight Taken</th><th>Fraction Taken (x<sub>i</sub>)</th><th>Value Gained</th><th>Remaining Capacity</th></tr></thead>
            <tbody>
    `;

    let remCap = capacity;
    let totalProfit = 0;

    items.forEach((it, idx) => {
      if (remCap <= 0) {
        html += `<tr><td>${idx + 1}</td><td>${it.name}</td><td>0</td><td>0.00</td><td>0</td><td>0 (Full)</td></tr>`;
        return;
      }

      if (it.weight <= remCap) {
        // Take 100%
        remCap -= it.weight;
        totalProfit += it.value;
        html += `
          <tr class="row-highlight">
            <td>${idx + 1}</td>
            <td>${it.name}</td>
            <td>${it.weight}</td>
            <td>1.00 (100%)</td>
            <td>+${it.value}</td>
            <td>${remCap}</td>
          </tr>
        `;
      } else {
        // Take fraction
        const frac = remCap / it.weight;
        const valGain = it.value * frac;
        totalProfit += valGain;
        const wtTaken = remCap;
        remCap = 0;
        html += `
          <tr class="row-highlight">
            <td>${idx + 1}</td>
            <td>${it.name}</td>
            <td>${wtTaken.toFixed(1)}</td>
            <td>${frac.toFixed(2)} (${(frac * 100).toFixed(1)}%)</td>
            <td>+${valGain.toFixed(2)}</td>
            <td>0</td>
          </tr>
        `;
      }
    });

    html += `
            </tbody>
          </table>
        </div>

        <div class="solver-result-box">
          <h4>Maximum Achievable Total Profit:</h4>
          <div class="final-answer">${totalProfit.toFixed(2)}</div>
          <p class="text-subtle">Time Complexity: <code>O(n log n)</code> (sorting) | Auxiliary Space: <code>O(1)</code></p>
        </div>
      </div>
    `;

    outputContainer.innerHTML = html;
  }

  // ==========================================
  // 3. 0/1 KNAPSACK DP SOLVER
  // ==========================================
  solve01Knapsack() {
    const outputContainer = document.getElementById('solver-output');
    if (!outputContainer) return;

    const capacity = parseInt(document.getElementById('dp-capacity')?.value, 10) || 7;
    const rawWeights = document.getElementById('dp-weights')?.value || '2, 3, 4, 5';
    const rawValues = document.getElementById('dp-values')?.value || '3, 4, 5, 8';

    const weights = rawWeights.split(',').map(s => parseInt(s.trim(), 10)).filter(n => !isNaN(n));
    const values = rawValues.split(',').map(s => parseInt(s.trim(), 10)).filter(n => !isNaN(n));

    if (weights.length !== values.length || weights.length === 0) {
      outputContainer.innerHTML = `<div class="alert alert-danger">Error: Weights and Values lists must have identical lengths.</div>`;
      return;
    }

    const n = weights.length;
    const dp = Array.from({ length: n + 1 }, () => Array(capacity + 1).fill(0));

    for (let i = 1; i <= n; i++) {
      const wt = weights[i - 1];
      const val = values[i - 1];
      for (let w = 0; w <= capacity; w++) {
        if (wt <= w) {
          dp[i][w] = Math.max(dp[i - 1][w], val + dp[i - 1][w - wt]);
        } else {
          dp[i][w] = dp[i - 1][w];
        }
      }
    }

    // Backtrack selected items
    const selected = [];
    let remW = capacity;
    for (let i = n; i > 0; i--) {
      if (dp[i][remW] !== dp[i - 1][remW]) {
        selected.push({ index: i, weight: weights[i - 1], value: values[i - 1] });
        remW -= weights[i - 1];
      }
    }

    let html = `
      <div class="solver-solution-card">
        <h3>0/1 Knapsack Dynamic Programming Solution</h3>
        <p class="solver-intro">Items count: <strong>${n}</strong>, Knapsack Capacity: <strong>${capacity}</strong></p>

        <div class="solver-step">
          <h4>Step 1: Recurrence Formula</h4>
          <p class="math-callout">
            <code>V[i, w] = max(V[i-1, w], value[i] + V[i-1, w - weight[i]])</code> if <code>weight[i] ≤ w</code><br>
            <code>V[i, w] = V[i-1, w]</code> otherwise.
          </p>
        </div>

        <div class="solver-step">
          <h4>Step 2: Completed DP State Matrix V[i, w]</h4>
          <div class="table-responsive">
            <table class="ada-data-table matrix-table">
              <thead>
                <tr>
                  <th>Item i (wt, val)</th>
                  ${Array.from({ length: capacity + 1 }, (_, w) => `<th>w=${w}</th>`).join('')}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>i = 0</strong> (No items)</td>
                  ${dp[0].map(v => `<td>${v}</td>`).join('')}
                </tr>
                ${dp.slice(1).map((row, idx) => `
                  <tr>
                    <td><strong>Item ${idx + 1}</strong> (w:${weights[idx]}, v:${values[idx]})</td>
                    ${row.map((val, colIdx) => `
                      <td class="${colIdx === capacity && idx === n - 1 ? 'dp-opt-cell' : ''}">${val}</td>
                    `).join('')}
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <div class="solver-step">
          <h4>Step 3: Backtracking Optimal Solution</h4>
          <p>Tracing back from <code>V[${n}, ${capacity}] = ${dp[n][capacity]}</code>:</p>
          <ul>
            ${selected.map(s => `<li>Included <strong>Item ${s.index}</strong> (Weight: ${s.weight}, Value: ${s.value})</li>`).join('')}
          </ul>
        </div>

        <div class="solver-result-box">
          <h4>Maximum Total Value:</h4>
          <div class="final-answer">${dp[n][capacity]}</div>
          <p class="text-subtle">Time Complexity: <code>Θ(n · W)</code> | Space Complexity: <code>Θ(n · W)</code></p>
        </div>
      </div>
    `;

    outputContainer.innerHTML = html;
  }

  // ==========================================
  // 4. LONGEST COMMON SUBSEQUENCE SOLVER
  // ==========================================
  solveLCS() {
    const outputContainer = document.getElementById('solver-output');
    if (!outputContainer) return;

    const s1 = (document.getElementById('lcs-str1')?.value || 'ABCBDAB').toUpperCase().trim();
    const s2 = (document.getElementById('lcs-str2')?.value || 'BDCABA').toUpperCase().trim();

    const m = s1.length;
    const n = s2.length;
    const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        if (s1[i - 1] === s2[j - 1]) {
          dp[i][j] = 1 + dp[i - 1][j - 1];
        } else {
          dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
        }
      }
    }

    // Reconstruct LCS string
    let lcsStr = '';
    let i = m, j = n;
    while (i > 0 && j > 0) {
      if (s1[i - 1] === s2[j - 1]) {
        lcsStr = s1[i - 1] + lcsStr;
        i--;
        j--;
      } else if (dp[i - 1][j] >= dp[i][j - 1]) {
        i--;
      } else {
        j--;
      }
    }

    let html = `
      <div class="solver-solution-card">
        <h3>Longest Common Subsequence (LCS)</h3>
        <p class="solver-intro">String X: <code>"${s1}"</code> (len ${m}) | String Y: <code>"${s2}"</code> (len ${n})</p>

        <div class="solver-step">
          <h4>DP State Table L[i, j]</h4>
          <div class="table-responsive">
            <table class="ada-data-table matrix-table">
              <thead>
                <tr>
                  <th>X \\ Y</th>
                  <th>Ø</th>
                  ${s2.split('').map((c, idx) => `<th>${c} (${idx + 1})</th>`).join('')}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>Ø</th>
                  ${dp[0].map(v => `<td>${v}</td>`).join('')}
                </tr>
                ${s1.split('').map((c, rIdx) => `
                  <tr>
                    <th>${c} (${rIdx + 1})</th>
                    ${dp[rIdx + 1].map((v, cIdx) => `
                      <td class="${rIdx + 1 === m && cIdx === n ? 'dp-opt-cell' : ''}">${v}</td>
                    `).join('')}
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <div class="solver-result-box">
          <h4>LCS Length: ${dp[m][n]} | Reconstructed Sequence:</h4>
          <div class="final-answer">"${lcsStr}"</div>
          <p class="text-subtle">Time Complexity: <code>Θ(m · n)</code> | Space Complexity: <code>Θ(m · n)</code></p>
        </div>
      </div>
    `;

    outputContainer.innerHTML = html;
  }

  // ==========================================
  // 5. MATRIX CHAIN MULTIPLICATION SOLVER
  // ==========================================
  solveMatrixChainMultiplication() {
    const outputContainer = document.getElementById('solver-output');
    if (!outputContainer) return;

    const rawDims = document.getElementById('mcm-dims')?.value || '10, 20, 30, 40, 30';
    const p = rawDims.split(',').map(s => parseInt(s.trim(), 10)).filter(n => !isNaN(n));

    if (p.length < 3) {
      outputContainer.innerHTML = `<div class="alert alert-danger">Please enter at least 3 dimensions (representing 2 or more matrices).</div>`;
      return;
    }

    const n = p.length - 1; // Number of matrices
    const m = Array.from({ length: n + 1 }, () => Array(n + 1).fill(0));
    const s = Array.from({ length: n + 1 }, () => Array(n + 1).fill(0));

    // l is chain length
    for (let l = 2; l <= n; l++) {
      for (let i = 1; i <= n - l + 1; i++) {
        const j = i + l - 1;
        m[i][j] = Infinity;
        for (let k = i; k < j; k++) {
          const q = m[i][k] + m[k + 1][j] + p[i - 1] * p[k] * p[j];
          if (q < m[i][j]) {
            m[i][j] = q;
            s[i][j] = k;
          }
        }
      }
    }

    function printOptimalParens(i, j) {
      if (i === j) return `A${i}`;
      return `(${printOptimalParens(i, s[i][j])} · ${printOptimalParens(s[i][j] + 1, j)})`;
    }

    const optimalParens = printOptimalParens(1, n);

    let html = `
      <div class="solver-solution-card">
        <h3>Matrix Chain Multiplication Dynamic Programming</h3>
        <p class="solver-intro">Chain of <strong>${n}</strong> Matrices: ${Array.from({ length: n }, (_, i) => `A<sub>${i + 1}</sub>(${p[i]}×${p[i + 1]})`).join(', ')}</p>

        <div class="solver-step">
          <h4>Minimum Multiplications Table m[i, j]</h4>
          <div class="table-responsive">
            <table class="ada-data-table matrix-table">
              <thead>
                <tr>
                  <th>i \\ j</th>
                  ${Array.from({ length: n }, (_, j) => `<th>j = ${j + 1}</th>`).join('')}
                </tr>
              </thead>
              <tbody>
                ${Array.from({ length: n }, (_, i) => `
                  <tr>
                    <th>i = ${i + 1}</th>
                    ${Array.from({ length: n }, (_, j) => {
                      const row = i + 1;
                      const col = j + 1;
                      if (row > col) return `<td class="text-subtle">-</td>`;
                      const isTarget = row === 1 && col === n;
                      return `<td class="${isTarget ? 'dp-opt-cell' : ''}">${m[row][col]}</td>`;
                    }).join('')}
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <div class="solver-result-box">
          <h4>Minimum Scalar Multiplications: ${m[1][n]}</h4>
          <h4>Optimal Parenthesization:</h4>
          <div class="final-answer">${optimalParens}</div>
          <p class="text-subtle">Time Complexity: <code>Θ(n<sup>3</sup>)</code> | Space Complexity: <code>Θ(n<sup>2</sup>)</code></p>
        </div>
      </div>
    `;

    outputContainer.innerHTML = html;
  }
}

window.adaSolver = new NumericalSolver();
