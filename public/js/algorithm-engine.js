/**
 * ADA Explorer - Algorithm Execution Engine
 * Pure deterministic algorithms that generate rich, verifiable step-by-step traces
 * for interactive visualizers and numerical solvers.
 */

class AlgorithmEngine {
  // ==========================================
  // SORTING ALGORITHM TRACES
  // ==========================================

  static traceBubbleSort(inputArray) {
    const arr = [...inputArray];
    const n = arr.length;
    const steps = [];
    let comparisons = 0;
    let swaps = 0;

    steps.push({
      type: 'init',
      array: [...arr],
      indices: [],
      sortedIndices: [],
      comparisons,
      swaps,
      description: `Initial array with ${n} elements. Starting Bubble Sort passes.`
    });

    const sortedIndices = [];

    for (let i = 0; i < n - 1; i++) {
      let swapped = false;
      for (let j = 0; j < n - i - 1; j++) {
        comparisons++;
        steps.push({
          type: 'compare',
          array: [...arr],
          indices: [j, j + 1],
          sortedIndices: [...sortedIndices],
          comparisons,
          swaps,
          description: `Pass ${i + 1}: Comparing arr[${j}] (${arr[j]}) and arr[${j + 1}] (${arr[j + 1]}).`
        });

        if (arr[j] > arr[j + 1]) {
          // Swap
          const temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          swaps++;
          swapped = true;

          steps.push({
            type: 'swap',
            array: [...arr],
            indices: [j, j + 1],
            sortedIndices: [...sortedIndices],
            comparisons,
            swaps,
            description: `Swapped arr[${j}] and arr[${j + 1}] because ${arr[j + 1]} < ${arr[j]}.`
          });
        }
      }

      sortedIndices.push(n - 1 - i);
      steps.push({
        type: 'pass_complete',
        array: [...arr],
        indices: [n - 1 - i],
        sortedIndices: [...sortedIndices],
        comparisons,
        swaps,
        description: `Pass ${i + 1} complete. Element ${arr[n - 1 - i]} at index ${n - 1 - i} is placed in its final sorted position.`
      });

      if (!swapped) {
        steps.push({
          type: 'early_exit',
          array: [...arr],
          indices: [],
          sortedIndices: Array.from({ length: n }, (_, idx) => idx),
          comparisons,
          swaps,
          description: `Optimization triggered: No swaps occurred in pass ${i + 1}. Array is fully sorted!`
        });
        break;
      }
    }

    steps.push({
      type: 'complete',
      array: [...arr],
      indices: [],
      sortedIndices: Array.from({ length: n }, (_, idx) => idx),
      comparisons,
      swaps,
      description: `Bubble Sort finished. Total comparisons: ${comparisons}, Total swaps: ${swaps}.`
    });

    return steps;
  }

  static traceSelectionSort(inputArray) {
    const arr = [...inputArray];
    const n = arr.length;
    const steps = [];
    let comparisons = 0;
    let swaps = 0;
    const sortedIndices = [];

    steps.push({
      type: 'init',
      array: [...arr],
      indices: [],
      sortedIndices: [],
      comparisons,
      swaps,
      description: `Initial array with ${n} elements. Starting Selection Sort.`
    });

    for (let i = 0; i < n - 1; i++) {
      let minIdx = i;

      steps.push({
        type: 'select_min',
        array: [...arr],
        indices: [i],
        minIdx,
        sortedIndices: [...sortedIndices],
        comparisons,
        swaps,
        description: `Pass ${i + 1}: Searching for minimum element in unsorted subarray [${i}..${n - 1}]. Initial minimum candidate at index ${i} (${arr[i]}).`
      });

      for (let j = i + 1; j < n; j++) {
        comparisons++;
        steps.push({
          type: 'compare',
          array: [...arr],
          indices: [j],
          minIdx,
          sortedIndices: [...sortedIndices],
          comparisons,
          swaps,
          description: `Comparing arr[${j}] (${arr[j]}) with current minimum arr[${minIdx}] (${arr[minIdx]}).`
        });

        if (arr[j] < arr[minIdx]) {
          minIdx = j;
          steps.push({
            type: 'new_min',
            array: [...arr],
            indices: [j],
            minIdx,
            sortedIndices: [...sortedIndices],
            comparisons,
            swaps,
            description: `Found smaller element at index ${j} (${arr[j]}). Updated minimum candidate.`
          });
        }
      }

      if (minIdx !== i) {
        const temp = arr[i];
        arr[i] = arr[minIdx];
        arr[minIdx] = temp;
        swaps++;

        steps.push({
          type: 'swap',
          array: [...arr],
          indices: [i, minIdx],
          minIdx,
          sortedIndices: [...sortedIndices],
          comparisons,
          swaps,
          description: `Swapped minimum element ${arr[i]} into index ${i}.`
        });
      } else {
        steps.push({
          type: 'no_swap',
          array: [...arr],
          indices: [i],
          minIdx: i,
          sortedIndices: [...sortedIndices],
          comparisons,
          swaps,
          description: `Element at index ${i} (${arr[i]}) was already the minimum in the subarray.`
        });
      }

      sortedIndices.push(i);
    }

    sortedIndices.push(n - 1);
    steps.push({
      type: 'complete',
      array: [...arr],
      indices: [],
      sortedIndices: Array.from({ length: n }, (_, idx) => idx),
      comparisons,
      swaps,
      description: `Selection Sort finished. Total comparisons: ${comparisons}, Total swaps: ${swaps}.`
    });

    return steps;
  }

  static traceInsertionSort(inputArray) {
    const arr = [...inputArray];
    const n = arr.length;
    const steps = [];
    let comparisons = 0;
    let shifts = 0;
    const sortedIndices = [0];

    steps.push({
      type: 'init',
      array: [...arr],
      indices: [0],
      sortedIndices: [0],
      comparisons,
      swaps: shifts,
      description: `Initial state: First element arr[0] (${arr[0]}) is trivially sorted.`
    });

    for (let i = 1; i < n; i++) {
      const key = arr[i];
      let j = i - 1;

      steps.push({
        type: 'pick_key',
        array: [...arr],
        indices: [i],
        key,
        sortedIndices: [...sortedIndices],
        comparisons,
        swaps: shifts,
        description: `Iteration ${i}: Picked key = ${key} at index ${i}. Finding its insertion position in sorted prefix [0..${i - 1}].`
      });

      while (j >= 0) {
        comparisons++;
        steps.push({
          type: 'compare',
          array: [...arr],
          indices: [j, j + 1],
          key,
          sortedIndices: [...sortedIndices],
          comparisons,
          swaps: shifts,
          description: `Comparing sorted element arr[${j}] (${arr[j]}) with key (${key}).`
        });

        if (arr[j] > key) {
          arr[j + 1] = arr[j];
          shifts++;
          steps.push({
            type: 'shift',
            array: [...arr],
            indices: [j + 1],
            key,
            sortedIndices: [...sortedIndices],
            comparisons,
            swaps: shifts,
            description: `Shifted ${arr[j]} right from index ${j} to ${j + 1}.`
          });
          j--;
        } else {
          break;
        }
      }

      arr[j + 1] = key;
      sortedIndices.push(i);

      steps.push({
        type: 'insert',
        array: [...arr],
        indices: [j + 1],
        key,
        sortedIndices: [...sortedIndices],
        comparisons,
        swaps: shifts,
        description: `Inserted key ${key} at index ${j + 1}. Subarray [0..${i}] is now sorted.`
      });
    }

    steps.push({
      type: 'complete',
      array: [...arr],
      indices: [],
      sortedIndices: Array.from({ length: n }, (_, idx) => idx),
      comparisons,
      swaps: shifts,
      description: `Insertion Sort finished. Total comparisons: ${comparisons}, Total shifts: ${shifts}.`
    });

    return steps;
  }

  static traceMergeSort(inputArray) {
    const arr = [...inputArray];
    const steps = [];
    let comparisons = 0;
    let writes = 0;

    steps.push({
      type: 'init',
      array: [...arr],
      indices: [],
      comparisons,
      swaps: writes,
      description: `Initial array. Starting Merge Sort with Divide & Conquer.`
    });

    function mergeSortRecursive(start, end) {
      if (start >= end) return;

      const mid = Math.floor((start + end) / 2);

      steps.push({
        type: 'divide',
        array: [...arr],
        indices: [start, mid, end],
        range: [start, end],
        comparisons,
        swaps: writes,
        description: `Dividing subarray [${start}..${end}] at midpoint ${mid}. Left: [${start}..${mid}], Right: [${mid + 1}..${end}].`
      });

      mergeSortRecursive(start, mid);
      mergeSortRecursive(mid + 1, end);

      // Merge step
      const left = arr.slice(start, mid + 1);
      const right = arr.slice(mid + 1, end + 1);
      let i = 0, j = 0, k = start;

      steps.push({
        type: 'merge_start',
        array: [...arr],
        range: [start, end],
        left,
        right,
        comparisons,
        swaps: writes,
        description: `Merging sorted subarrays [${left.join(', ')}] and [${right.join(', ')}].`
      });

      while (i < left.length && j < right.length) {
        comparisons++;
        if (left[i] <= right[j]) {
          arr[k] = left[i];
          writes++;
          steps.push({
            type: 'merge_write',
            array: [...arr],
            indices: [k],
            range: [start, end],
            comparisons,
            swaps: writes,
            description: `Left element ${left[i]} <= Right element ${right[j]}. Placed ${left[i]} at index ${k}.`
          });
          i++;
        } else {
          arr[k] = right[j];
          writes++;
          steps.push({
            type: 'merge_write',
            array: [...arr],
            indices: [k],
            range: [start, end],
            comparisons,
            swaps: writes,
            description: `Right element ${right[j]} < Left element ${left[i]}. Placed ${right[j]} at index ${k}.`
          });
          j++;
        }
        k++;
      }

      while (i < left.length) {
        arr[k] = left[i];
        writes++;
        steps.push({
          type: 'merge_write',
          array: [...arr],
          indices: [k],
          range: [start, end],
          comparisons,
          swaps: writes,
          description: `Copied remaining left element ${left[i]} to index ${k}.`
        });
        i++;
        k++;
      }

      while (j < right.length) {
        arr[k] = right[j];
        writes++;
        steps.push({
          type: 'merge_write',
          array: [...arr],
          indices: [k],
          range: [start, end],
          comparisons,
          swaps: writes,
          description: `Copied remaining right element ${right[j]} to index ${k}.`
        });
        j++;
        k++;
      }
    }

    mergeSortRecursive(0, arr.length - 1);

    steps.push({
      type: 'complete',
      array: [...arr],
      indices: [],
      sortedIndices: Array.from({ length: arr.length }, (_, idx) => idx),
      comparisons,
      swaps: writes,
      description: `Merge Sort complete! Guaranteed O(n log n). Comparisons: ${comparisons}, Array writes: ${writes}.`
    });

    return steps;
  }

  static traceQuickSort(inputArray) {
    const arr = [...inputArray];
    const steps = [];
    let comparisons = 0;
    let swaps = 0;

    steps.push({
      type: 'init',
      array: [...arr],
      indices: [],
      comparisons,
      swaps,
      description: `Starting Quick Sort on array with ${arr.length} elements.`
    });

    function quickSortRecursive(low, high) {
      if (low < high) {
        const pivotVal = arr[high];
        steps.push({
          type: 'pivot_selected',
          array: [...arr],
          indices: [high],
          range: [low, high],
          pivotIdx: high,
          comparisons,
          swaps,
          description: `Subarray [${low}..${high}]: Chosen pivot = ${pivotVal} at index ${high} (Lomuto scheme).`
        });

        let i = low - 1;
        for (let j = low; j < high; j++) {
          comparisons++;
          steps.push({
            type: 'compare_pivot',
            array: [...arr],
            indices: [j, high],
            range: [low, high],
            pivotIdx: high,
            comparisons,
            swaps,
            description: `Comparing arr[${j}] (${arr[j]}) with pivot (${pivotVal}).`
          });

          if (arr[j] <= pivotVal) {
            i++;
            if (i !== j) {
              const temp = arr[i];
              arr[i] = arr[j];
              arr[j] = temp;
              swaps++;
              steps.push({
                type: 'swap',
                array: [...arr],
                indices: [i, j],
                range: [low, high],
                pivotIdx: high,
                comparisons,
                swaps,
                description: `arr[${j}] (${arr[i]}) <= pivot. Swapped with arr[${i}]. Boundary moved to ${i}.`
              });
            }
          }
        }

        // Place pivot in correct place
        const pi = i + 1;
        const temp = arr[pi];
        arr[pi] = arr[high];
        arr[high] = temp;
        swaps++;

        steps.push({
          type: 'pivot_locked',
          array: [...arr],
          indices: [pi],
          range: [low, high],
          pivotIdx: pi,
          comparisons,
          swaps,
          description: `Pivot ${arr[pi]} locked into its final sorted position at index ${pi}.`
        });

        quickSortRecursive(low, pi - 1);
        quickSortRecursive(pi + 1, high);
      }
    }

    quickSortRecursive(0, arr.length - 1);

    steps.push({
      type: 'complete',
      array: [...arr],
      indices: [],
      sortedIndices: Array.from({ length: arr.length }, (_, idx) => idx),
      comparisons,
      swaps,
      description: `Quick Sort complete! Total comparisons: ${comparisons}, Total swaps: ${swaps}.`
    });

    return steps;
  }

  static traceHeapSort(inputArray) {
    const arr = [...inputArray];
    const n = arr.length;
    const steps = [];
    let comparisons = 0;
    let swaps = 0;

    steps.push({
      type: 'init',
      array: [...arr],
      indices: [],
      comparisons,
      swaps,
      description: `Starting Heap Sort. Step 1: Build Max-Heap in O(n) time.`
    });

    function heapify(size, rootIdx) {
      let largest = rootIdx;
      const left = 2 * rootIdx + 1;
      const right = 2 * rootIdx + 2;

      if (left < size) {
        comparisons++;
        if (arr[left] > arr[largest]) largest = left;
      }
      if (right < size) {
        comparisons++;
        if (arr[right] > arr[largest]) largest = right;
      }

      if (largest !== rootIdx) {
        const temp = arr[rootIdx];
        arr[rootIdx] = arr[largest];
        arr[largest] = temp;
        swaps++;

        steps.push({
          type: 'heapify_swap',
          array: [...arr],
          indices: [rootIdx, largest],
          comparisons,
          swaps,
          description: `Heapify: Swapped parent ${arr[largest]} with larger child ${arr[rootIdx]} at index ${largest}.`
        });

        heapify(size, largest);
      }
    }

    // Build max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      heapify(n, i);
    }

    steps.push({
      type: 'heap_built',
      array: [...arr],
      indices: [0],
      comparisons,
      swaps,
      description: `Max-Heap constructed! Root arr[0] (${arr[0]}) is the absolute maximum element.`
    });

    // Extract elements
    for (let i = n - 1; i > 0; i--) {
      const temp = arr[0];
      arr[0] = arr[i];
      arr[i] = temp;
      swaps++;

      steps.push({
        type: 'extract_max',
        array: [...arr],
        indices: [0, i],
        sortedIndices: Array.from({ length: n - i }, (_, k) => n - 1 - k),
        comparisons,
        swaps,
        description: `Extracted root max ${arr[i]} and swapped to position ${i}. Restoring heap on remaining ${i} elements.`
      });

      heapify(i, 0);
    }

    steps.push({
      type: 'complete',
      array: [...arr],
      indices: [],
      sortedIndices: Array.from({ length: n }, (_, idx) => idx),
      comparisons,
      swaps,
      description: `Heap Sort complete! In-place O(n log n). Total comparisons: ${comparisons}, Total swaps: ${swaps}.`
    });

    return steps;
  }

  // ==========================================
  // SEARCHING ALGORITHM TRACES
  // ==========================================

  static traceLinearSearch(arr, target) {
    const steps = [];
    let comparisons = 0;

    steps.push({
      type: 'init',
      array: [...arr],
      target,
      currentIndex: -1,
      comparisons,
      description: `Starting Linear Search for target = ${target} across ${arr.length} elements.`
    });

    for (let i = 0; i < arr.length; i++) {
      comparisons++;
      const isMatch = arr[i] === target;

      steps.push({
        type: isMatch ? 'found' : 'compare',
        array: [...arr],
        target,
        currentIndex: i,
        comparisons,
        isMatch,
        description: `Checking index ${i}: arr[${i}] = ${arr[i]}. ${isMatch ? `MATCH FOUND! Target ${target} located.` : `${arr[i]} != ${target}. Continuing search.`}`
      });

      if (isMatch) {
        steps.push({
          type: 'complete',
          array: [...arr],
          target,
          foundIndex: i,
          comparisons,
          description: `Search completed successfully in ${comparisons} comparison(s). Element is at index ${i}.`
        });
        return { steps, found: true, index: i, comparisons };
      }
    }

    steps.push({
      type: 'not_found',
      array: [...arr],
      target,
      foundIndex: -1,
      comparisons,
      description: `Target ${target} was not found after checking all ${arr.length} elements (${comparisons} comparisons).`
    });

    return { steps, found: false, index: -1, comparisons };
  }

  static traceBinarySearch(inputArray, target) {
    const arr = [...inputArray];
    const steps = [];
    let comparisons = 0;

    let low = 0;
    let high = arr.length - 1;

    steps.push({
      type: 'init',
      array: [...arr],
      target,
      low,
      high,
      mid: -1,
      comparisons,
      description: `Starting Binary Search for target = ${target}. Initial range: [0..${high}].`
    });

    while (low <= high) {
      const mid = low + Math.floor((high - low) / 2);
      comparisons++;
      const midVal = arr[mid];

      steps.push({
        type: 'inspect_mid',
        array: [...arr],
        target,
        low,
        high,
        mid,
        comparisons,
        description: `Calculated mid = ${mid} (value = ${midVal}). Comparing arr[${mid}] with target ${target}.`
      });

      if (midVal === target) {
        steps.push({
          type: 'found',
          array: [...arr],
          target,
          low,
          high,
          mid,
          comparisons,
          description: `MATCH FOUND! arr[${mid}] (${midVal}) == ${target} at index ${mid} in ${comparisons} comparisons.`
        });
        return { steps, found: true, index: mid, comparisons };
      } else if (midVal < target) {
        low = mid + 1;
        steps.push({
          type: 'adjust_range',
          array: [...arr],
          target,
          low,
          high,
          mid,
          comparisons,
          description: `${midVal} < ${target}. Target must be in the right half. New range: [${low}..${high}].`
        });
      } else {
        high = mid - 1;
        steps.push({
          type: 'adjust_range',
          array: [...arr],
          target,
          low,
          high,
          mid,
          comparisons,
          description: `${midVal} > ${target}. Target must be in the left half. New range: [${low}..${high}].`
        });
      }
    }

    steps.push({
      type: 'not_found',
      array: [...arr],
      target,
      low,
      high,
      mid: -1,
      comparisons,
      description: `Search space exhausted (low ${low} > high ${high}). Target ${target} is not in the array.`
    });

    return { steps, found: false, index: -1, comparisons };
  }

  // ==========================================
  // DYNAMIC PROGRAMMING TRACES
  // ==========================================

  static traceKnapsack01(capacity, weights, values) {
    const n = weights.length;
    const dp = Array.from({ length: n + 1 }, () => Array(capacity + 1).fill(0));
    const steps = [];

    steps.push({
      type: 'init',
      capacity,
      weights,
      values,
      dpTable: JSON.parse(JSON.stringify(dp)),
      currentI: 0,
      currentW: 0,
      description: `Initialized (n+1) x (W+1) = ${n + 1} x ${capacity + 1} DP table with 0s.`
    });

    for (let i = 1; i <= n; i++) {
      const wt = weights[i - 1];
      const val = values[i - 1];

      for (let w = 0; w <= capacity; w++) {
        if (wt <= w) {
          const excludeVal = dp[i - 1][w];
          const includeVal = val + dp[i - 1][w - wt];
          dp[i][w] = Math.max(excludeVal, includeVal);

          steps.push({
            type: 'cell_update',
            capacity,
            weights,
            values,
            dpTable: JSON.parse(JSON.stringify(dp)),
            currentI: i,
            currentW: w,
            sourceCells: [{ r: i - 1, c: w }, { r: i - 1, c: w - wt }],
            formula: `max(exclude=${excludeVal}, include=${val}+${dp[i - 1][w - wt]}=${includeVal}) = ${dp[i][w]}`,
            description: `Item ${i} (wt:${wt}, val:${val}), Capacity ${w}: wt <= w. Calculated dp[${i}][${w}] = ${dp[i][w]}.`
          });
        } else {
          dp[i][w] = dp[i - 1][w];
          steps.push({
            type: 'cell_copy',
            capacity,
            weights,
            values,
            dpTable: JSON.parse(JSON.stringify(dp)),
            currentI: i,
            currentW: w,
            sourceCells: [{ r: i - 1, c: w }],
            formula: `dp[${i - 1}][${w}] = ${dp[i - 1][w]} (Item weight ${wt} exceeds capacity ${w})`,
            description: `Item ${i} too heavy for capacity ${w}. Copied previous value dp[${i - 1}][${w}] = ${dp[i][w]}.`
          });
        }
      }
    }

    // Backtrack to find chosen items
    const selected = [];
    let remCap = capacity;
    for (let i = n; i > 0; i--) {
      if (dp[i][remCap] !== dp[i - 1][remCap]) {
        selected.push(i - 1);
        remCap -= weights[i - 1];
      }
    }

    steps.push({
      type: 'complete',
      capacity,
      weights,
      values,
      dpTable: JSON.parse(JSON.stringify(dp)),
      maxValue: dp[n][capacity],
      selectedItems: selected,
      description: `DP Table complete. Maximum achievable value is ${dp[n][capacity]}. Selected items: [${selected.map(idx => `Item ${idx + 1}`).join(', ')}].`
    });

    return { steps, maxValue: dp[n][capacity], selected, table: dp };
  }

  static traceLCS(str1, str2) {
    const m = str1.length;
    const n = str2.length;
    const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
    const steps = [];

    steps.push({
      type: 'init',
      str1,
      str2,
      dpTable: JSON.parse(JSON.stringify(dp)),
      currentI: 0,
      currentJ: 0,
      description: `Initialized ${m + 1} x ${n + 1} DP table for strings "${str1}" and "${str2}".`
    });

    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        const c1 = str1[i - 1];
        const c2 = str2[j - 1];

        if (c1 === c2) {
          dp[i][j] = 1 + dp[i - 1][j - 1];
          steps.push({
            type: 'match',
            str1,
            str2,
            dpTable: JSON.parse(JSON.stringify(dp)),
            currentI: i,
            currentJ: j,
            matchChar: c1,
            sourceCells: [{ r: i - 1, c: j - 1 }],
            description: `Char match: "${c1}" at str1[${i - 1}] == str2[${j - 1}]. dp[${i}][${j}] = 1 + dp[${i - 1}][${j - 1}] = ${dp[i][j]}.`
          });
        } else {
          dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
          steps.push({
            type: 'no_match',
            str1,
            str2,
            dpTable: JSON.parse(JSON.stringify(dp)),
            currentI: i,
            currentJ: j,
            sourceCells: [{ r: i - 1, c: j }, { r: i, c: j - 1 }],
            description: `Chars differ ("${c1}" != "${c2}"). dp[${i}][${j}] = max(dp[${i - 1}][${j}], dp[${i}][${j - 1}]) = ${dp[i][j]}.`
          });
        }
      }
    }

    // Reconstruct LCS string
    let seq = '';
    let i = m, j = n;
    while (i > 0 && j > 0) {
      if (str1[i - 1] === str2[j - 1]) {
        seq = str1[i - 1] + seq;
        i--;
        j--;
      } else if (dp[i - 1][j] >= dp[i][j - 1]) {
        i--;
      } else {
        j--;
      }
    }

    steps.push({
      type: 'complete',
      str1,
      str2,
      dpTable: JSON.parse(JSON.stringify(dp)),
      lcsLength: dp[m][n],
      lcsSequence: seq,
      description: `LCS computation complete! Length = ${dp[m][n]}, Sequence = "${seq}".`
    });

    return { steps, length: dp[m][n], sequence: seq, table: dp };
  }

  // ==========================================
  // BACKTRACKING TRACES (N-QUEENS)
  // ==========================================

  static traceNQueens(n) {
    const steps = [];
    const board = Array.from({ length: n }, () => Array(n).fill('.'));
    let stepCount = 0;
    const solutions = [];

    steps.push({
      type: 'init',
      n,
      board: board.map(r => [...r]),
      row: 0,
      col: -1,
      description: `Initialized ${n}x${n} empty chessboard. Placing queens row-by-row.`
    });

    function isSafe(row, col) {
      for (let i = 0; i < row; i++) {
        if (board[i][col] === 'Q') return { safe: false, reason: `Column conflict with Q at (${i}, ${col})` };
      }
      for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
        if (board[i][j] === 'Q') return { safe: false, reason: `Upper-left diagonal conflict with Q at (${i}, ${j})` };
      }
      for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
        if (board[i][j] === 'Q') return { safe: false, reason: `Upper-right diagonal conflict with Q at (${i}, ${j})` };
      }
      return { safe: true };
    }

    function placeQueen(row) {
      if (row === n) {
        solutions.push(board.map(r => r.join('')));
        steps.push({
          type: 'solution_found',
          n,
          board: board.map(r => [...r]),
          row,
          solutionNumber: solutions.length,
          description: `🎉 Solution #${solutions.length} discovered! All ${n} queens placed with zero conflicts.`
        });
        return;
      }

      for (let col = 0; col < n; col++) {
        stepCount++;
        const check = isSafe(row, col);

        if (check.safe) {
          board[row][col] = 'Q';
          steps.push({
            type: 'queen_placed',
            n,
            board: board.map(r => [...r]),
            row,
            col,
            description: `Placed Queen at Row ${row}, Col ${col}. Moving to Row ${row + 1}.`
          });

          placeQueen(row + 1);

          // Backtrack
          board[row][col] = '.';
          steps.push({
            type: 'backtrack',
            n,
            board: board.map(r => [...r]),
            row,
            col,
            description: `Backtracked: Removed Queen from Row ${row}, Col ${col} to explore next column.`
          });
        } else {
          steps.push({
            type: 'conflict',
            n,
            board: board.map(r => [...r]),
            row,
            col,
            conflictReason: check.reason,
            description: `Cannot place at Row ${row}, Col ${col}: ${check.reason}.`
          });
        }
      }
    }

    placeQueen(0);

    steps.push({
      type: 'complete',
      n,
      board: board.map(r => [...r]),
      totalSolutions: solutions.length,
      solutions,
      description: `Backtracking exploration finished. Found ${solutions.length} total valid solution(s) for N = ${n}.`
    });

    return { steps, solutions };
  }
}

window.adaEngine = AlgorithmEngine;
