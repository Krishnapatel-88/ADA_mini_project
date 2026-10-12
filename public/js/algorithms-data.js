/**
 * ADA Explorer - Algorithm Curriculum Configuration Data
 * Comprehensive curriculum across Categories A to M with complete educational data.
 */

const ALGORITHM_CATEGORIES = [
  {
    id: 'fundamentals',
    letter: 'A',
    name: 'Algorithm Fundamentals',
    description: 'Core concepts, characteristics, design principles, pseudocode, flowcharts, correctness, and iterative vs recursive paradigms.',
    icon: 'book-open'
  },
  {
    id: 'asymptotic',
    letter: 'B',
    name: 'Asymptotic Analysis',
    description: 'Big O, Omega, Theta notations, growth orders, time-space bounds, recursion stack space, and amortized complexity.',
    icon: 'activity'
  },
  {
    id: 'searching',
    letter: 'C',
    name: 'Searching Algorithms',
    description: 'Linear, Binary, Jump, and Interpolation search strategies and access bounds.',
    icon: 'search'
  },
  {
    id: 'sorting',
    letter: 'D',
    name: 'Sorting Algorithms',
    description: 'Comparison and distribution sorting, stability, in-place behavior, lower bounds, and performance trade-offs.',
    icon: 'arrow-down-up'
  },
  {
    id: 'divide-conquer',
    letter: 'E',
    name: 'Divide and Conquer',
    description: 'Splitting problems into independent subproblems, combining solutions, Strassen matrix multiplication, and recurrence trees.',
    icon: 'git-branch'
  },
  {
    id: 'greedy',
    letter: 'F',
    name: 'Greedy Algorithms',
    description: 'Locally optimal choices, greedy-choice property, optimal substructure, activity selection, Huffman coding, and spanning trees.',
    icon: 'target'
  },
  {
    id: 'dp',
    letter: 'G',
    name: 'Dynamic Programming',
    description: 'Overlapping subproblems, memoization vs tabulation, state transitions, Knapsack, LCS, Matrix Chain, and Floyd-Warshall.',
    icon: 'grid'
  },
  {
    id: 'graph',
    letter: 'H',
    name: 'Graph Algorithms',
    description: 'Traversals (BFS/DFS), shortest paths (Dijkstra, Bellman-Ford), minimum spanning trees (Prim, Kruskal), and topological sorting.',
    icon: 'share-2'
  },
  {
    id: 'backtracking',
    letter: 'I',
    name: 'Backtracking',
    description: 'State space trees, systematic pruning, constraint satisfaction, N-Queens, Rat in a Maze, Subset Sum, and Graph Coloring.',
    icon: 'corner-up-left'
  },
  {
    id: 'string-matching',
    letter: 'J',
    name: 'String Matching',
    description: 'Exact pattern matching, prefix functions, rolling hashes, Naive, Rabin-Karp, and Knuth-Morris-Pratt (KMP).',
    icon: 'file-text'
  },
  {
    id: 'recurrence',
    letter: 'K',
    name: 'Recurrence Relations',
    description: 'Substitution method, recursion tree analysis, Master Theorem cases, and divide-and-conquer recurrences.',
    icon: 'cpu'
  },
  {
    id: 'branch-bound',
    letter: 'L',
    name: 'Branch and Bound',
    description: 'Bounding functions, state pruning, BFS/Best-First search for NP-hard optimization problems, 0/1 Knapsack, and TSP.',
    icon: 'crosshair'
  },
  {
    id: 'complexity-classes',
    letter: 'M',
    name: 'Complexity Classes',
    description: 'Tractable vs intractable problems, P, NP, NP-Complete, NP-Hard, polynomial reductions, and 3-SAT.',
    icon: 'shield-alert'
  }
];

const ALGORITHMS_DATA = [
  // =========================================================================
  // CATEGORY A: ALGORITHM FUNDAMENTALS
  // =========================================================================
  {
    id: 'what-is-algorithm',
    name: 'What is an Algorithm?',
    categoryId: 'fundamentals',
    category: 'Algorithm Fundamentals',
    simpleIntro: 'An algorithm is a finite, unambiguous, ordered sequence of computational steps that transforms a valid input into an intended output.',
    whyUseful: 'Algorithms are the bedrock of computer science. Hardware changes, but algorithmic efficiency dictates what is computationally feasible vs impossible.',
    realWorldApp: 'Route navigation (GPS finding quickest routes), search ranking, video streaming codecs, financial trading execution.',
    prerequisites: ['Basic high-school mathematics', 'Basic programming concepts'],
    coreIdea: 'Think of an algorithm like a foolproof recipe: precise ingredients (input), explicit step-by-step instructions without vagueness, guaranteed termination, and a delicious dish at the end (output).',
    stepByStep: [
      'Accept valid input meeting preconditions.',
      'Execute a deterministic sequence of state transformations.',
      'Terminate within a finite number of operations.',
      'Produce the correct output meeting postconditions.'
    ],
    pseudocode: `// Example: Computing Greatest Common Divisor (Euclid's Algorithm)
Algorithm EuclidGCD(a, b)
    Input: Two non-negative integers a and b (not both 0)
    Output: gcd(a, b)
    while b != 0 do
        remainder = a mod b
        a = b
        b = remainder
    return a`,
    jsImplementation: `function euclidGCD(a, b) {
  // Base case: gcd(a, 0) = a
  while (b !== 0) {
    const remainder = a % b;
    a = b;
    b = remainder;
  }
  return Math.abs(a);
}`,
    exampleInput: 'a = 48, b = 18',
    workedExample: [
      'Initial state: a = 48, b = 18',
      'Iteration 1: 48 % 18 = 12 -> new a = 18, new b = 12',
      'Iteration 2: 18 % 12 = 6 -> new a = 12, new b = 6',
      'Iteration 3: 12 % 6 = 0 -> new a = 6, new b = 0',
      'Terminates because b == 0. Output GCD is 6.'
    ],
    visualizerType: null,
    timeComplexity: {
      best: 'O(1)',
      average: 'O(log(min(a, b)))',
      worst: 'O(log(min(a, b))) (occurs for consecutive Fibonacci numbers)',
      explanation: 'Lamé Theorem states Euclid takes at most 5 times the number of decimal digits of the smaller number.'
    },
    spaceComplexity: {
      auxiliary: 'O(1)',
      total: 'O(1)',
      explanation: 'Iterative version only uses two primitive integer variables.'
    },
    advantages: ['Guaranteed termination', 'Deterministic and provably correct', 'Foundation of cryptography (RSA)'],
    limitations: ['Requires integers; non-integer inputs must be converted or scaled'],
    comparisonWithRelated: ['Subtraction-based Euclid is slower (O(max(a, b))) compared to modulo-based O(log(min(a, b)))'],
    commonMistakes: ['Forgetting that b can be 0 initially', 'Negative inputs without Math.abs()'],
    interviewQuestions: [
      { q: 'What are the 5 essential characteristics of an algorithm defined by Knuth?', a: 'Finiteness, Definiteness, Input, Output, and Effectiveness.' },
      { q: 'When does Euclid algorithm hit its worst case?', a: 'When inputs are consecutive Fibonacci numbers (e.g. 55 and 34), producing remainders that cascade step-by-step.' }
    ],
    recommendedNext: ['algorithm-characteristics', 'iterative-vs-recursive', 'big-o-notation']
  },

  {
    id: 'algorithm-characteristics',
    name: 'Characteristics of an Algorithm',
    categoryId: 'fundamentals',
    category: 'Algorithm Fundamentals',
    simpleIntro: 'Donald Knuth formulated the five canonical criteria an algorithm must satisfy: Input, Output, Definiteness, Finiteness, and Effectiveness.',
    whyUseful: 'Distinguishes true algorithmic procedures from heuristics, infinite loops, and vague human instructions.',
    realWorldApp: 'Safety-critical software (flight controls, medical devices) where non-terminating procedures could cause catastrophic failure.',
    prerequisites: ['what-is-algorithm'],
    coreIdea: 'Every valid algorithm must produce an answer, stop eventually, be 100% clear at every step, and only require feasible operations.',
    stepByStep: [
      'Input: 0 or more externally supplied quantities.',
      'Output: At least 1 quantity having a specified relation to the inputs.',
      'Definiteness: Each instruction must be clear and unambiguous.',
      'Finiteness: The procedure must terminate after a finite number of steps for all inputs.',
      'Effectiveness: Each operation must be basic enough to be done exactly in finite time.'
    ],
    pseudocode: `Algorithm CheckFiniteness(n)
    while n > 1 do
        if n % 2 == 0 then n = n / 2
        else n = 3*n + 1
    return n`,
    jsImplementation: `function collatzSteps(n) {
  let steps = 0;
  while (n > 1) {
    n = (n % 2 === 0) ? n / 2 : 3 * n + 1;
    steps++;
  }
  return steps;
}`,
    exampleInput: 'n = 6',
    workedExample: [
      'n = 6 (even) -> 3',
      'n = 3 (odd) -> 10',
      'n = 10 (even) -> 5',
      'n = 5 (odd) -> 16',
      'n = 16 -> 8 -> 4 -> 2 -> 1',
      'Terminates in 8 steps.'
    ],
    visualizerType: null,
    timeComplexity: {
      best: 'O(1) for n = 1',
      average: 'Empirically finite',
      worst: 'Finite for all tested integers up to 2^68',
      explanation: 'Empirically terminates for all tested numbers, though unproven mathematically.'
    },
    spaceComplexity: { auxiliary: 'O(1)', total: 'O(1)', explanation: 'Single counter' },
    advantages: ['Strict standards prevent bugs', 'Ensures formal verification is possible'],
    limitations: ['Heuristics may violate strict finiteness/effectiveness in exchange for practical speed'],
    comparisonWithRelated: ['Algorithm vs Heuristic: Algorithms guarantee correctness; heuristics sacrifice optimality for speed.'],
    commonMistakes: ['Confusing infinite loops in software with valid algorithms'],
    interviewQuestions: [
      { q: 'Is an operating system an algorithm?', a: 'No, an OS is designed to be an ongoing reactive process that runs indefinitely until powered off, violating finiteness.' }
    ],
    recommendedNext: ['iterative-vs-recursive', 'big-o-notation']
  },

  {
    id: 'algorithm-correctness',
    name: 'Algorithm Design & Correctness',
    categoryId: 'fundamentals',
    category: 'Algorithm Fundamentals',
    simpleIntro: 'An algorithm is correct if, for every valid input instance, it halts with the correct output. Proving correctness relies heavily on Loop Invariants and mathematical induction.',
    whyUseful: 'Testing can show the presence of bugs, but only formal correctness proofs can prove their absence.',
    realWorldApp: 'Cryptographic protocols (RSA key generation), compilers, blockchain smart contract verification.',
    prerequisites: ['what-is-algorithm'],
    coreIdea: 'A loop invariant is a statement about program state that is true before the loop starts (Initialization), remains true before the next iteration (Maintenance), and yields the desired correctness when the loop terminates (Termination).',
    stepByStep: [
      'Initialization: Prior to the first iteration of the loop, the invariant holds.',
      'Maintenance: If the invariant is true before an iteration, it remains true before the next iteration.',
      'Termination: When the loop terminates, the invariant provides a useful property that proves the algorithm is correct.'
    ],
    pseudocode: `// Proving correctness of finding Maximum
Algorithm FindMax(A, n)
    maxVal = A[0]
    // Invariant: At start of loop i, maxVal is the maximum of A[0..i-1]
    for i = 1 to n - 1 do
        if A[i] > maxVal then
            maxVal = A[i]
    // At termination (i = n), maxVal is max of A[0..n-1]
    return maxVal`,
    jsImplementation: `function findMaxWithInvariant(arr) {
  if (arr.length === 0) return null;
  let maxVal = arr[0];
  for (let i = 1; i < arr.length; i++) {
    // Invariant: maxVal is maximum of arr[0..i-1]
    if (arr[i] > maxVal) {
      maxVal = arr[i];
    }
  }
  return maxVal;
}`,
    exampleInput: 'arr = [3, 7, 2, 9, 5]',
    workedExample: [
      'Init: i = 1, maxVal = 3 (max of arr[0..0]) -> Invariant holds.',
      'i = 1: arr[1]=7 > 3 -> maxVal = 7 (max of arr[0..1]) -> Invariant maintained.',
      'i = 2: arr[2]=2 <= 7 -> maxVal = 7 (max of arr[0..2]) -> Invariant maintained.',
      'i = 3: arr[3]=9 > 7 -> maxVal = 9 (max of arr[0..3]) -> Invariant maintained.',
      'i = 4: arr[4]=5 <= 9 -> maxVal = 9 (max of arr[0..4]) -> Invariant maintained.',
      'Terminates at i = 5: maxVal = 9 is maximum of entire array. Proved correct!'
    ],
    visualizerType: null,
    timeComplexity: { best: 'O(n)', average: 'O(n)', worst: 'O(n)', explanation: 'Exactly n - 1 comparisons.' },
    spaceComplexity: { auxiliary: 'O(1)', total: 'O(n)', explanation: 'Constant memory' },
    advantages: ['Rigorous mathematical proof of correctness', 'Eliminates edge-case doubts'],
    limitations: ['Formulating the precise loop invariant can be mathematically challenging'],
    comparisonWithRelated: ['Loop Invariants in iteration correspond directly to Inductive Hypotheses in recursion.'],
    commonMistakes: ['Confusing the loop termination condition with the loop invariant'],
    interviewQuestions: [
      { q: 'What are the three mandatory steps to prove a loop invariant?', a: 'Initialization (Base case), Maintenance (Inductive step), and Termination.' }
    ],
    recommendedNext: ['iterative-vs-recursive', 'big-o-notation']
  },

  {
    id: 'iterative-vs-recursive',
    name: 'Iterative vs Recursive Algorithms',
    categoryId: 'fundamentals',
    category: 'Algorithm Fundamentals',
    simpleIntro: 'Iteration achieves repetition using explicit control loops (for, while); recursion achieves repetition by having a function call itself with reduced subproblems until a base case is reached.',
    whyUseful: 'Recursion gives elegant solutions for Divide & Conquer, Trees, and Dynamic Programming, but introduces stack frame overhead.',
    realWorldApp: 'File system traversal (recursive directory search), compiler AST traversal, web browser DOM rendering.',
    prerequisites: ['what-is-algorithm'],
    coreIdea: 'Iteration stores state in local variables and loops; recursion stores state in stack activation records on the system call stack.',
    stepByStep: [
      'Iterative: Initialize counter -> Check termination condition -> Execute body -> Update counter.',
      'Recursive: Check base case -> If true return directly -> Otherwise make one or more smaller self-calls -> Combine returns.'
    ],
    pseudocode: `// Factorial Iterative
Algorithm FactorialIterative(n)
    fact = 1
    for i = 1 to n do fact = fact * i
    return fact

// Factorial Recursive
Algorithm FactorialRecursive(n)
    if n <= 1 return 1
    return n * FactorialRecursive(n - 1)`,
    jsImplementation: `// Iterative
function factorialIterative(n) {
  let fact = 1;
  for (let i = 2; i <= n; i++) fact *= i;
  return fact;
}

// Recursive
function factorialRecursive(n) {
  if (n <= 1) return 1;
  return n * factorialRecursive(n - 1);
}`,
    exampleInput: 'n = 5',
    workedExample: [
      'Recursive call stack: fact(5) calls fact(4) calls fact(3) calls fact(2) calls fact(1)',
      'fact(1) returns 1 (base case)',
      'fact(2) = 2 * 1 = 2',
      'fact(3) = 3 * 2 = 6',
      'fact(4) = 4 * 6 = 24',
      'fact(5) = 5 * 24 = 120 (final unwound result)'
    ],
    visualizerType: null,
    timeComplexity: {
      best: 'O(n)',
      average: 'O(n)',
      worst: 'O(n)',
      explanation: 'Both perform exactly n - 1 multiplications.'
    },
    spaceComplexity: {
      auxiliary: 'O(1) Iterative, O(n) Recursive stack space',
      total: 'O(1) vs O(n)',
      explanation: 'Recursive approach pushes n stack frames onto the execution call stack.'
    },
    advantages: ['Recursion is mathematically clean and mirrors inductive definitions', 'Iteration is faster and cannot overflow call stack'],
    limitations: ['Deep recursion causes RangeError: Maximum call stack size exceeded'],
    comparisonWithRelated: ['Tail recursion can be optimized by compilers into loops, eliminating auxiliary stack space.'],
    commonMistakes: ['Missing base case in recursion causing infinite stack recursion'],
    interviewQuestions: [
      { q: 'Can every recursive algorithm be converted to an iterative one?', a: 'Yes. Any recursive algorithm can be transformed using an explicit stack data structure or loop.' }
    ],
    recommendedNext: ['big-o-notation', 'divide-conquer']
  },

  // =========================================================================
  // CATEGORY B: ASYMPTOTIC ANALYSIS
  // =========================================================================
  {
    id: 'big-o-notation',
    name: 'Big O Notation (O)',
    categoryId: 'asymptotic',
    category: 'Asymptotic Analysis',
    simpleIntro: 'Big O notation describes an asymptotic UPPER BOUND on the growth rate of an algorithm\'s runtime or space as input size n tends to infinity.',
    whyUseful: 'Allows comparing algorithm efficiency independently of CPU clock speed, compiler optimizations, programming language, or operating system.',
    realWorldApp: 'Selecting between O(n log n) database indexing and O(n^2) nested loops when designing large-scale backends.',
    prerequisites: ['what-is-algorithm'],
    coreIdea: 'f(n) = O(g(n)) means for large enough n, f(n) never grows faster than c * g(n) for some positive constant c.',
    stepByStep: [
      'Formal definition: f(n) = O(g(n)) if there exist positive constants c and n0 such that 0 <= f(n) <= c * g(n) for all n >= n0.',
      'Drop lower-order terms (e.g. 3n^2 + 5n + 10 -> 3n^2).',
      'Drop leading constant multipliers (3n^2 -> n^2).',
      'Express in canonical Big O classification (O(n^2)).'
    ],
    pseudocode: `// Demonstrating O(n^2) growth
Algorithm BubblePasses(A, n)
    count = 0
    for i = 0 to n-1 do
        for j = 0 to n-1 do
            count = count + 1 // Executes n * n times
    return count`,
    jsImplementation: `function demonstrateGrowth(n) {
  return {
    constant: 1,
    logarithmic: Math.log2(n),
    linear: n,
    linearithmic: n * Math.log2(n),
    quadratic: Math.pow(n, 2),
    cubic: Math.pow(n, 3),
    exponential: Math.pow(2, Math.min(n, 30))
  };
}`,
    exampleInput: 'n = 100',
    workedExample: [
      'For n = 100:',
      'O(log n) ≈ 6.64 operations',
      'O(n) = 100 operations',
      'O(n log n) ≈ 664 operations',
      'O(n^2) = 10,000 operations',
      'O(2^n) = 1.26 * 10^30 operations (impossible on any supercomputer)'
    ],
    visualizerType: null,
    timeComplexity: {
      best: 'N/A (Metatheory)',
      average: 'N/A',
      worst: 'N/A',
      explanation: 'Big O is an analytical framework, not an algorithm itself.'
    },
    spaceComplexity: { auxiliary: 'O(1)', total: 'O(1)', explanation: 'N/A' },
    advantages: ['Focuses on scalability without hardware bias', 'Simplifies mathematical analysis'],
    limitations: ['Hides large constant factors (e.g. 1000000n is O(n), but n^2 might be faster for small n)'],
    comparisonWithRelated: ['Big O = Upper bound (<=), Big Omega = Lower bound (>=), Big Theta = Tight bound (==)'],
    commonMistakes: ['Thinking Big O ALWAYS means worst case. Big O can represent an upper bound of best, worst, or average cases.'],
    interviewQuestions: [
      { q: 'Is 2^(n+1) = O(2^n)?', a: 'Yes, because 2^(n+1) = 2 * 2^n, with constant c = 2.' },
      { q: 'Is 2^(2n) = O(2^n)?', a: 'No, 2^(2n) = (2^n)^2 = 4^n, which grows strictly faster than any c * 2^n.' }
    ],
    recommendedNext: ['omega-theta-notation', 'best-average-worst-cases', 'master-theorem']
  },

  {
    id: 'omega-theta-notation',
    name: 'Big Omega (Ω) and Big Theta (Θ)',
    categoryId: 'asymptotic',
    category: 'Asymptotic Analysis',
    simpleIntro: 'Big Omega provides an asymptotic lower bound (algorithm takes at least this long), while Big Theta provides an asymptotically tight bound (sandwiched from above and below).',
    whyUseful: 'Big Theta gives the complete and exact asymptotic rate of growth without ambiguity.',
    realWorldApp: 'Proving theoretical lower bounds (e.g. any comparison-based sort requires Ω(n log n) comparisons in the worst case).',
    prerequisites: ['big-o-notation'],
    coreIdea: 'Theta = Tight sandwich: c1 * g(n) <= f(n) <= c2 * g(n) for all n >= n0. If f(n) = O(g(n)) AND f(n) = Ω(g(n)), then f(n) = Θ(g(n)).',
    stepByStep: [
      'Big Omega: 0 <= c * g(n) <= f(n) for all n >= n0.',
      'Big Theta: 0 <= c1 * g(n) <= f(n) <= c2 * g(n) for all n >= n0.',
      'Theorem: f(n) = Θ(g(n)) if and only if f(n) = O(g(n)) and f(n) = Ω(g(n)).'
    ],
    pseudocode: `// Decision tree theorem: Any comparison sort is Omega(n log n) in worst case.`,
    jsImplementation: `function verifyTheta(f, g, nRange = [10, 1000]) {
  const ratios = [];
  for (let n = nRange[0]; n <= nRange[1]; n += 50) {
    ratios.push(f(n) / g(n));
  }
  const minRatio = Math.min(...ratios);
  const maxRatio = Math.max(...ratios);
  return { isBounded: minRatio > 0 && Number.isFinite(maxRatio), minRatio, maxRatio };
}`,
    exampleInput: 'f(n) = 3n^2 + 2n, g(n) = n^2',
    workedExample: [
      'For n >= 1: 3n^2 <= 3n^2 + 2n <= 5n^2',
      'Here c1 = 3, c2 = 5, n0 = 1',
      'Since 3 * n^2 <= f(n) <= 5 * n^2 for all n >= 1, f(n) is Θ(n^2).'
    ],
    visualizerType: null,
    timeComplexity: { best: 'N/A', average: 'N/A', worst: 'N/A', explanation: 'Theoretical notation' },
    spaceComplexity: { auxiliary: 'O(1)', total: 'O(1)', explanation: 'N/A' },
    advantages: ['Gives unambiguous tight characterization', 'Proves optimality when upper bound matches lower bound'],
    limitations: ['Not all functions have tight Theta bounds (e.g., oscillating functions)'],
    comparisonWithRelated: ['O(g(n)): upper bound; Ω(g(n)): lower bound; Θ(g(n)): tight bound.'],
    commonMistakes: ['Using Big O when a tight Big Theta bound is known'],
    interviewQuestions: [
      { q: 'Is it correct to say Merge Sort is O(n^2)?', a: 'Yes! Big O is merely an upper bound, so O(n^2) is mathematically true, but Θ(n log n) is the tight, most informative bound.' }
    ],
    recommendedNext: ['best-average-worst-cases', 'master-theorem']
  },

  {
    id: 'best-average-worst-cases',
    name: 'Best, Average, and Worst Cases',
    categoryId: 'asymptotic',
    category: 'Asymptotic Analysis',
    simpleIntro: 'Algorithms take different amounts of time depending not just on input size, but on input configuration (e.g. already sorted vs reversed).',
    whyUseful: 'Knowing worst-case prevents denial-of-service vulnerabilities; knowing average-case predicts real-world server throughput.',
    realWorldApp: 'QuickSort is preferred in practice because its average case is O(n log n) with tiny constant factors, but requires randomized pivots to prevent worst-case O(n^2) attacks.',
    prerequisites: ['big-o-notation'],
    coreIdea: 'Best case = ideal input; Worst case = most adversarial input; Average case = expected time across all uniformly distributed permutations.',
    stepByStep: [
      'Identify algorithm step count as a function of input configuration.',
      'Find the input permutation minimizing step count (Best Case).',
      'Find the input permutation maximizing step count (Worst Case).',
      'Compute expectation E[T(n)] over probability distribution of inputs (Average Case).'
    ],
    pseudocode: `// Linear Search Case Analysis
Algorithm LinearSearch(A, n, target)
    for i = 0 to n-1 do
        if A[i] == target then return i
    return -1`,
    jsImplementation: `function linearSearchAnalysis(arr, target) {
  let comparisons = 0;
  for (let i = 0; i < arr.length; i++) {
    comparisons++;
    if (arr[i] === target) {
      return { found: true, index: i, comparisons, caseType: i === 0 ? 'Best' : (i === arr.length - 1 ? 'Worst' : 'Average') };
    }
  }
  return { found: false, index: -1, comparisons, caseType: 'Worst (Not Found)' };
}`,
    exampleInput: 'Array: [10, 20, 30, 40, 50], target = 10',
    workedExample: [
      'Target 10 is at index 0 -> 1 check -> Best Case O(1).',
      'Target 99 is absent -> 5 checks -> Worst Case O(n).'
    ],
    visualizerType: null,
    timeComplexity: {
      best: 'Dependent on algorithm (e.g. Insertion Sort best is O(n))',
      average: 'Expected value over input space',
      worst: 'Maximum possible operations',
      explanation: 'Distinguishes practical performance from catastrophic edge cases.'
    },
    spaceComplexity: { auxiliary: 'O(1)', total: 'O(n)', explanation: 'N/A' },
    advantages: ['Realistic prediction of performance profile'],
    limitations: ['Average-case assumes uniform input distribution which may not reflect real user data'],
    comparisonWithRelated: ['Amortized analysis averages worst-case over a sequence of operations instead of random inputs.'],
    commonMistakes: ['Confusing Big O with Worst Case. Big O is a mathematical upper bound; worst case is a behavioral input scenario.'],
    interviewQuestions: [
      { q: 'Why is Insertion Sort preferred over QuickSort for nearly sorted data?', a: 'Insertion Sort runs in O(n) linear time on nearly sorted arrays, whereas naive QuickSort can degrade to O(n^2).' }
    ],
    recommendedNext: ['linear-search', 'bubble-sort', 'insertion-sort']
  },

  // =========================================================================
  // CATEGORY C: SEARCHING ALGORITHMS
  // =========================================================================
  {
    id: 'linear-search',
    name: 'Linear Search',
    categoryId: 'searching',
    category: 'Searching Algorithms',
    simpleIntro: 'Sequentially checks each element of a collection from beginning to end until a match is found or the collection is exhausted.',
    whyUseful: 'Works on unsorted arrays, linked lists, and streams where random access or sorting is unavailable.',
    realWorldApp: 'Finding a specific item in an unsorted array of short size (<50 elements), sensor event logs.',
    prerequisites: ['what-is-algorithm'],
    coreIdea: 'Walk one element at a time from index 0 to n-1. Compare each with the target value.',
    stepByStep: [
      'Start at index 0.',
      'Compare element at current index with target value.',
      'If equal, return current index.',
      'If not equal, increment index by 1.',
      'If end of array is reached without a match, return -1.'
    ],
    pseudocode: `Algorithm LinearSearch(A, n, target)
    Input: Array A of n elements, target value
    Output: Index of target, or -1 if not found
    for i = 0 to n - 1 do
        if A[i] == target then
            return i
    return -1`,
    jsImplementation: `function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i; // Target found
    }
  }
  return -1; // Target absent
}`,
    exampleInput: 'arr = [14, 33, 27, 10, 35, 19, 42, 44], target = 35',
    workedExample: [
      'Step 1: Check index 0 -> 14 != 35',
      'Step 2: Check index 1 -> 33 != 35',
      'Step 3: Check index 2 -> 27 != 35',
      'Step 4: Check index 3 -> 10 != 35',
      'Step 5: Check index 4 -> 35 == 35 (Match found at index 4 in 5 comparisons).'
    ],
    visualizerType: 'searching',
    timeComplexity: {
      best: 'O(1) (target is at the very first position)',
      average: 'O(n) ((n + 1) / 2 comparisons on average)',
      worst: 'O(n) (target is at the last position or not present)',
      explanation: 'Every element may need to be inspected in the worst case.'
    },
    spaceComplexity: {
      auxiliary: 'O(1)',
      total: 'O(n)',
      explanation: 'Only a loop counter variable is maintained.'
    },
    advantages: ['Requires no preprocessing or sorting', 'Works on linked lists and streams', 'Extremely simple to implement'],
    limitations: ['Inefficient on large datasets (1 million items = up to 1 million checks)'],
    comparisonWithRelated: ['Binary Search is exponentially faster (O(log n)), but requires sorted random-access data.'],
    commonMistakes: ['Off-by-one errors in loop boundaries', 'Comparing objects with == instead of deep equality'],
    interviewQuestions: [
      { q: 'Can Linear Search be optimized for sorted arrays?', a: 'Yes; you can terminate early as soon as an element greater than the target is encountered.' }
    ],
    recommendedNext: ['binary-search']
  },

  {
    id: 'binary-search',
    name: 'Binary Search',
    categoryId: 'searching',
    category: 'Searching Algorithms',
    simpleIntro: 'A divide-and-conquer search algorithm that repeatedly halves the search space of a sorted array by comparing the target with the middle element.',
    whyUseful: 'Logarithmic search time O(log n): can find an item among 4 billion entries in only ~32 comparisons.',
    realWorldApp: 'Database B-Tree indexing, Git bisect to find regression commits, standard library lower_bound/upper_bound.',
    prerequisites: ['what-is-algorithm', 'big-o-notation'],
    coreIdea: 'If the array is sorted, comparing target with mid tells you whether the target can only exist in the left half or the right half. Discard the other half immediately.',
    stepByStep: [
      'Initialize low = 0, high = n - 1.',
      'While low <= high, compute mid = low + Math.floor((high - low) / 2).',
      'If arr[mid] == target, return mid.',
      'If arr[mid] < target, set low = mid + 1 (target is in right half).',
      'If arr[mid] > target, set high = mid - 1 (target is in left half).',
      'If low > high, target is not present; return -1.'
    ],
    pseudocode: `Algorithm BinarySearch(A, n, target)
    low = 0
    high = n - 1
    while low <= high do
        mid = low + (high - low) / 2
        if A[mid] == target then
            return mid
        else if A[mid] < target then
            low = mid + 1
        else
            high = mid - 1
    return -1`,
    jsImplementation: `function binarySearch(arr, target) {
  let low = 0;
  let high = arr.length - 1;

  while (low <= high) {
    // Prevent integer overflow: low + Math.floor((high - low) / 2)
    const mid = low + Math.floor((high - low) / 2);

    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] < target) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  return -1;
}`,
    exampleInput: 'arr = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91], target = 23',
    workedExample: [
      'Initial: low = 0, high = 9. mid = 4 (value = 16). 16 < 23 -> low = 5.',
      'Iteration 2: low = 5, high = 9. mid = 7 (value = 56). 56 > 23 -> high = 6.',
      'Iteration 3: low = 5, high = 6. mid = 5 (value = 23). 23 == 23! Target found at index 5 in 3 comparisons.'
    ],
    visualizerType: 'searching',
    timeComplexity: {
      best: 'O(1) (target is at the initial middle)',
      average: 'O(log n)',
      worst: 'O(log n)',
      explanation: 'Search space reduces by factor of 2 every step: n, n/2, n/4, ..., 1. log2(n) steps.'
    },
    spaceComplexity: {
      auxiliary: 'O(1) iterative, O(log n) recursive stack space',
      total: 'O(n) for input array',
      explanation: 'Iterative version uses low, high, and mid pointers.'
    },
    advantages: ['Extremely fast for large collections', 'Minimal memory overhead'],
    limitations: ['Array MUST be sorted first', 'Requires random access (inefficient on linked lists)'],
    comparisonWithRelated: ['Linear search takes O(n); Binary search takes O(log n).'],
    commonMistakes: ['Integer overflow when calculating (low + high) / 2 in fixed-size languages', 'Using low < high instead of low <= high causing missing single-element checks'],
    interviewQuestions: [
      { q: 'Why do we write mid = low + (high - low) / 2 instead of (low + high) / 2?', a: 'To prevent integer overflow when low + high exceeds the maximum 32-bit signed integer limit (2^31 - 1).' }
    ],
    recommendedNext: ['merge-sort', 'quick-sort']
  },

  // =========================================================================
  // CATEGORY D: SORTING ALGORITHMS
  // =========================================================================
  {
    id: 'bubble-sort',
    name: 'Bubble Sort',
    categoryId: 'sorting',
    category: 'Sorting Algorithms',
    simpleIntro: 'A simple comparison-based sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.',
    whyUseful: 'Excellent pedagogical tool for introducing sorting invariants, comparisons, and algorithmic optimization (swapped flag).',
    realWorldApp: 'Educational demonstrations and detecting if a list is already sorted with O(n) check.',
    prerequisites: ['what-is-algorithm', 'big-o-notation'],
    coreIdea: 'In each pass through the array, the largest unsorted element "bubbles up" to its correct final position at the end of the array.',
    stepByStep: [
      'Loop through array from pass i = 0 to n - 2.',
      'Maintain a boolean flag swapped = false.',
      'Inner loop j from 0 to n - 2 - i: compare arr[j] and arr[j + 1].',
      'If arr[j] > arr[j + 1], swap them and set swapped = true.',
      'If no swaps occurred during the entire inner loop, the array is already sorted; terminate early.'
    ],
    pseudocode: `Algorithm BubbleSort(A, n)
    for i = 0 to n - 2 do
        swapped = false
        for j = 0 to n - 2 - i do
            if A[j] > A[j + 1] then
                swap(A[j], A[j + 1])
                swapped = true
        if not swapped then break`,
    jsImplementation: `function bubbleSort(arr) {
  const n = arr.length;
  let swapped;
  for (let i = 0; i < n - 1; i++) {
    swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        swapped = true;
      }
    }
    if (!swapped) break;
  }
  return arr;
}`,
    exampleInput: 'arr = [64, 34, 25, 12, 22, 11, 90]',
    workedExample: [
      'Pass 1: 64 swaps with 34, 25, 12, 22, 11 -> [34, 25, 12, 22, 11, 64, 90]. 90 is placed.',
      'Pass 2: 34 bubbles up -> [25, 12, 22, 11, 34, 64, 90].',
      'Pass 3: 25 bubbles up -> [12, 22, 11, 25, 34, 64, 90].',
      'Pass 4: [12, 11, 22, 25, 34, 64, 90].',
      'Pass 5: [11, 12, 22, 25, 34, 64, 90]. Sorted.'
    ],
    visualizerType: 'sorting',
    timeComplexity: {
      best: 'O(n) (when array is already sorted, with swapped flag optimization)',
      average: 'O(n^2)',
      worst: 'O(n^2) (when array is in reverse order)',
      explanation: 'Takes n*(n-1)/2 comparisons in worst case.'
    },
    spaceComplexity: { auxiliary: 'O(1)', total: 'O(n)', explanation: 'In-place sort' },
    advantages: ['Stable sort', 'In-place (O(1) auxiliary space)', 'Adaptive (O(n) on sorted arrays)'],
    limitations: ['Very slow O(n^2) for large inputs'],
    comparisonWithRelated: ['Selection Sort does at most O(n) swaps; Bubble Sort can do O(n^2) swaps.'],
    commonMistakes: ['Forgetting the swapped flag optimization causing best-case to remain O(n^2)'],
    interviewQuestions: [
      { q: 'Is Bubble Sort stable?', a: 'Yes, because elements are only swapped when arr[j] > arr[j+1], never when they are equal.' }
    ],
    recommendedNext: ['selection-sort', 'insertion-sort', 'merge-sort']
  },

  {
    id: 'selection-sort',
    name: 'Selection Sort',
    categoryId: 'sorting',
    category: 'Sorting Algorithms',
    simpleIntro: 'Divides the array into a sorted subarray and an unsorted subarray. In each step, finds the minimum element from the unsorted subarray and places it at the beginning.',
    whyUseful: 'Minimizes the number of write operations (at most n - 1 swaps total), which is optimal when write operations are extremely costly (e.g. Flash memory).',
    realWorldApp: 'EEPROM or Flash memory sorting where write cycles degrade physical storage cells.',
    prerequisites: ['what-is-algorithm', 'big-o-notation'],
    coreIdea: 'Scan the unsorted prefix to find the index of the minimum element. Swap it once into its designated position.',
    stepByStep: [
      'Outer loop i from 0 to n - 2.',
      'Assume minIndex = i.',
      'Inner loop j from i + 1 to n - 1: if arr[j] < arr[minIndex], minIndex = j.',
      'If minIndex != i, swap arr[i] with arr[minIndex].'
    ],
    pseudocode: `Algorithm SelectionSort(A, n)
    for i = 0 to n - 2 do
        minIndex = i
        for j = i + 1 to n - 1 do
            if A[j] < A[minIndex] then minIndex = j
        if minIndex != i then swap(A[i], A[minIndex])`,
    jsImplementation: `function selectionSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIndex]) minIndex = j;
    }
    if (minIndex !== i) {
      const temp = arr[i];
      arr[i] = arr[minIndex];
      arr[minIndex] = temp;
    }
  }
  return arr;
}`,
    exampleInput: 'arr = [29, 10, 14, 37, 13]',
    workedExample: [
      'Pass 0: Min is 10 at idx 1. Swap with 29 -> [10, 29, 14, 37, 13].',
      'Pass 1: Min is 13 at idx 4. Swap with 29 -> [10, 13, 14, 37, 29].',
      'Pass 2: Min is 14 at idx 2. No swap needed -> [10, 13, 14, 37, 29].',
      'Pass 3: Min is 29 at idx 4. Swap with 37 -> [10, 13, 14, 29, 37]. Sorted.'
    ],
    visualizerType: 'sorting',
    timeComplexity: {
      best: 'O(n^2)',
      average: 'O(n^2)',
      worst: 'O(n^2)',
      explanation: 'Must always compare every pair in unsorted section to confirm minimum, regardless of initial order.'
    },
    spaceComplexity: { auxiliary: 'O(1)', total: 'O(n)', explanation: 'In-place sort' },
    advantages: ['Performs at most O(n) memory writes', 'In-place'],
    limitations: ['Always O(n^2) comparisons', 'Default array implementation is unstable'],
    comparisonWithRelated: ['Insertion sort is adaptive (O(n) on sorted data); Selection sort always takes Θ(n^2) comparisons.'],
    commonMistakes: ['Assuming selection sort is stable by default'],
    interviewQuestions: [
      { q: 'Why is standard Selection Sort not stable?', a: 'Example: [4a, 4b, 1]. In first pass, 4a swaps with 1, yielding [1, 4b, 4a], swapping the relative order of 4a and 4b.' }
    ],
    recommendedNext: ['insertion-sort', 'merge-sort']
  },

  {
    id: 'insertion-sort',
    name: 'Insertion Sort',
    categoryId: 'sorting',
    category: 'Sorting Algorithms',
    simpleIntro: 'Builds the final sorted array one item at a time by consuming one input element per repetition and growing a sorted output list, exactly like sorting playing cards in hand.',
    whyUseful: 'Fastest sorting algorithm for small arrays (n < 20 to 50) and nearly sorted data. Used as the base case in hybrid production sorters (Timsort, Introsort).',
    realWorldApp: 'Used inside Python and Java\'s default sort algorithms (Timsort) for small partitions; real-time streaming data insertion.',
    prerequisites: ['what-is-algorithm', 'big-o-notation'],
    coreIdea: 'Take element key at index i, shift all elements in sorted prefix 0..i-1 that are greater than key one position to the right, then insert key.',
    stepByStep: [
      'Iterate i from 1 to n - 1.',
      'Store key = arr[i] and initialize j = i - 1.',
      'While j >= 0 and arr[j] > key, shift arr[j + 1] = arr[j], and decrement j.',
      'Insert key at arr[j + 1].'
    ],
    pseudocode: `Algorithm InsertionSort(A, n)
    for i = 1 to n - 1 do
        key = A[i]
        j = i - 1
        while j >= 0 and A[j] > key do
            A[j + 1] = A[j]
            j = j - 1
        A[j + 1] = key`,
    jsImplementation: `function insertionSort(arr) {
  const n = arr.length;
  for (let i = 1; i < n; i++) {
    const key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}`,
    exampleInput: 'arr = [12, 11, 13, 5, 6]',
    workedExample: [
      'i = 1, key = 11: 12 > 11 -> shift 12 -> [11, 12, 13, 5, 6]',
      'i = 2, key = 13: 12 <= 13 -> no shifts -> [11, 12, 13, 5, 6]',
      'i = 3, key = 5: shift 13, 12, 11 -> insert 5 at index 0 -> [5, 11, 12, 13, 6]',
      'i = 4, key = 6: shift 13, 12, 11 -> insert 6 at index 1 -> [5, 6, 11, 12, 13]. Sorted.'
    ],
    visualizerType: 'sorting',
    timeComplexity: {
      best: 'O(n) (when array is already sorted, 1 comparison per element)',
      average: 'O(n^2)',
      worst: 'O(n^2) (when array is reversed)',
      explanation: 'Number of shifts equals the number of inversions in the array.'
    },
    spaceComplexity: { auxiliary: 'O(1)', total: 'O(n)', explanation: 'In-place sort' },
    advantages: ['Stable and in-place', 'O(n) adaptive on sorted or nearly-sorted data', 'Fastest algorithm for small arrays'],
    limitations: ['O(n^2) scaling for large unsorted lists'],
    comparisonWithRelated: ['Insertion sort beats Bubble sort and Selection sort in practical speed on small datasets.'],
    commonMistakes: ['Shifting key inside loop instead of holding in variable and writing at end'],
    interviewQuestions: [
      { q: 'Why is Insertion Sort O(n) on nearly-sorted data?', a: 'If each element is at most k positions from its sorted position, each element shifts at most k times, running in O(k * n) = O(n) for constant k.' }
    ],
    recommendedNext: ['merge-sort', 'quick-sort']
  },

  {
    id: 'merge-sort',
    name: 'Merge Sort',
    categoryId: 'sorting',
    category: 'Sorting Algorithms',
    simpleIntro: 'A classic Divide and Conquer algorithm that recursively divides the input array into two halves, sorts each half, and then merges the two sorted halves into a single sorted array.',
    whyUseful: 'Guaranteed O(n log n) worst-case time complexity, stable, and highly suited for sorting linked lists and external disk datasets.',
    realWorldApp: 'Java\'s Arrays.sort() for objects, Git merge conflict resolutions, external sorting of multi-gigabyte files exceeding RAM.',
    prerequisites: ['divide-conquer', 'big-o-notation'],
    coreIdea: 'Dividing until array length is 1 is trivial (an array of length 1 is already sorted). The magic happens during the merge step, where two sorted arrays can be combined in linear O(n) time.',
    stepByStep: [
      'If low < high:',
      'Find mid = low + Math.floor((high - low) / 2).',
      'Recursively sort left half: MergeSort(arr, low, mid).',
      'Recursively sort right half: MergeSort(arr, mid + 1, high).',
      'Merge the two sorted halves: Merge(arr, low, mid, high).'
    ],
    pseudocode: `Algorithm MergeSort(A, low, high)
    if low < high then
        mid = low + (high - low) / 2
        MergeSort(A, low, mid)
        MergeSort(A, mid + 1, high)
        Merge(A, low, mid, high)`,
    jsImplementation: `function mergeSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    const mid = Math.floor((low + high) / 2);
    mergeSort(arr, low, mid);
    mergeSort(arr, mid + 1, high);
    merge(arr, low, mid, high);
  }
  return arr;
}

function merge(arr, low, mid, high) {
  const left = arr.slice(low, mid + 1);
  const right = arr.slice(mid + 1, high + 1);

  let i = 0, j = 0, k = low;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      arr[k++] = left[i++];
    } else {
      arr[k++] = right[j++];
    }
  }

  while (i < left.length) arr[k++] = left[i++];
  while (j < right.length) arr[k++] = right[j++];
}`,
    exampleInput: 'arr = [38, 27, 43, 3, 9, 82, 10]',
    workedExample: [
      'Divide: [38, 27, 43, 3] and [9, 82, 10]',
      'Divide further until singletons: [38], [27], [43], [3] ...',
      'Merge pairs: [27, 38], [3, 43], [9, 82], [10]',
      'Merge 4-tuples: [3, 27, 38, 43] and [9, 10, 82]',
      'Final merge: [3, 9, 10, 27, 38, 43, 82]. Sorted in O(n log n).'
    ],
    visualizerType: 'sorting',
    timeComplexity: {
      best: 'Θ(n log n)',
      average: 'Θ(n log n)',
      worst: 'Θ(n log n)',
      explanation: 'Recurrence T(n) = 2T(n/2) + Θ(n). By Master Theorem Case 2, T(n) = Θ(n log n) in all cases.'
    },
    spaceComplexity: {
      auxiliary: 'O(n) for auxiliary temporary array buffers, plus O(log n) stack space',
      total: 'O(n)',
      explanation: 'Standard array merge sort requires O(n) extra memory buffer.'
    },
    advantages: ['Guaranteed Θ(n log n) performance even on adversarial inputs', 'Stable sort', 'Ideal for linked lists and sequential disk streams'],
    limitations: ['Requires O(n) auxiliary memory space', 'Slower in practice than QuickSort for in-memory arrays due to memory allocations'],
    comparisonWithRelated: ['QuickSort is in-place (O(log n) space) and faster in cache, but MergeSort guarantees O(n log n) worst-case and is stable.'],
    commonMistakes: ['Not using <= in merge comparison, which breaks stability', 'Allocating new arrays on every recursive frame instead of reusing a single buffer'],
    interviewQuestions: [
      { q: 'Why is MergeSort preferred for Linked Lists?', a: 'Linked lists allow O(1) in-place pointer updates during merge without needing auxiliary array buffers, and random access is not required.' }
    ],
    recommendedNext: ['quick-sort', 'heap-sort']
  },

  {
    id: 'quick-sort',
    name: 'Quick Sort',
    categoryId: 'sorting',
    category: 'Sorting Algorithms',
    simpleIntro: 'A highly efficient Divide and Conquer algorithm that picks a pivot element, partitions the array such that elements smaller than the pivot are on the left and larger on the right, then recursively sorts the sub-arrays.',
    whyUseful: 'Fastest general-purpose comparison sort in practice due to excellent CPU cache locality and in-place partitioning.',
    realWorldApp: 'C standard library qsort(), C++ std::sort (as Introsort), V8 engine (for large primitive arrays).',
    prerequisites: ['divide-conquer', 'big-o-notation'],
    coreIdea: 'Partitioning puts the pivot element into its final sorted position. Then solve the left and right partitions independently.',
    stepByStep: [
      'Choose a pivot element (Lomuto, Hoare, or Median-of-three).',
      'Partition array: move smaller elements to left, greater to right.',
      'Place pivot in its correct sorted index p.',
      'Recursively sort QuickSort(arr, low, p - 1).',
      'Recursively sort QuickSort(arr, p + 1, high).'
    ],
    pseudocode: `Algorithm QuickSort(A, low, high)
    if low < high then
        pi = Partition(A, low, high)
        QuickSort(A, low, pi - 1)
        QuickSort(A, pi + 1, high)`,
    jsImplementation: `function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    const pi = partition(arr, low, high);
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
  return arr;
}

function partition(arr, low, high) {
  const pivot = arr[high]; // Lomuto pivot choice
  let i = low - 1;
  for (let j = low; j < high; j++) {
    if (arr[j] <= pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}`,
    exampleInput: 'arr = [10, 80, 30, 90, 40, 50, 70]',
    workedExample: [
      'Pivot = 70. Partitioning compares each element to 70.',
      'Elements <= 70: [10, 30, 40, 50]. Elements > 70: [80, 90].',
      'Swap pivot into index 4 -> [10, 30, 40, 50, 70, 90, 80]. 70 is locked in place.',
      'Recurse on [10, 30, 40, 50] and [90, 80]. Fully sorted.'
    ],
    visualizerType: 'sorting',
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n^2) (already sorted array with naive pivot)',
      explanation: 'Average recurrence T(n) = 2T(n/2) + O(n). Worst recurrence T(n) = T(n-1) + O(n) = O(n^2).'
    },
    spaceComplexity: {
      auxiliary: 'O(log n) stack space average, O(n) worst case',
      total: 'O(n)',
      explanation: 'In-place array modifications; memory used solely by the recursion call stack.'
    },
    advantages: ['Extremely fast in practice (low constant factor)', 'In-place sorting', 'Cache-friendly spatial locality'],
    limitations: ['Worst case is O(n^2)', 'Not stable'],
    comparisonWithRelated: ['MergeSort has guaranteed O(n log n) worst case and is stable, but requires O(n) extra memory. QuickSort is faster in RAM.'],
    commonMistakes: ['Selecting first or last element as pivot on already sorted arrays'],
    interviewQuestions: [
      { q: 'How can you prevent QuickSort worst-case O(n^2) runtime?', a: 'Use Randomized Pivot selection or Median-of-Three pivot, or switch to HeapSort if recursion depth exceeds 2*log(n) (Introsort).' }
    ],
    recommendedNext: ['heap-sort']
  },

  {
    id: 'heap-sort',
    name: 'Heap Sort',
    categoryId: 'sorting',
    category: 'Sorting Algorithms',
    simpleIntro: 'A comparison-based sorting technique based on a Binary Heap data structure. It builds a Max-Heap from the array, then repeatedly extracts the maximum element and places it at the end.',
    whyUseful: 'Combines the best features of QuickSort (in-place, O(1) auxiliary space) and MergeSort (guaranteed O(n log n) worst-case time).',
    realWorldApp: 'Embedded systems with hard real-time guarantees where O(n log n) is strictly required without extra RAM allocation.',
    prerequisites: ['what-is-algorithm', 'big-o-notation'],
    coreIdea: 'Max-Heap property: parent node is always >= its children. Root is always the maximum. Swap root to the end, shrink heap size, and heapify down.',
    stepByStep: [
      'Build a Max-Heap from the input array in O(n) time.',
      'The largest item is at root arr[0].',
      'Swap arr[0] with arr[i] where i starts at n - 1 down to 1.',
      'Reduce the heap size by 1.',
      'Call heapify(arr, i, 0) to restore Max-Heap property on remaining heap.',
      'Repeat until heap size is 1.'
    ],
    pseudocode: `Algorithm HeapSort(A, n)
    for i = floor(n / 2) - 1 down to 0 do Heapify(A, n, i)
    for i = n - 1 down to 1 do
        swap(A[0], A[i])
        Heapify(A, i, 0)`,
    jsImplementation: `function heapSort(arr) {
  const n = arr.length;
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    heapify(arr, i, 0);
  }
  return arr;
}

function heapify(arr, n, i) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;
  if (left < n && arr[left] > arr[largest]) largest = left;
  if (right < n && arr[right] > arr[largest]) largest = right;
  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, n, largest);
  }
}`,
    exampleInput: 'arr = [12, 11, 13, 5, 6, 7]',
    workedExample: [
      'Build Max Heap: [13, 11, 12, 5, 6, 7]',
      'Extract 13: swap with 7 -> [7, 11, 12, 5, 6, | 13]. Heapify -> [12, 11, 7, 5, 6, | 13]',
      'Extract 12: swap with 6 -> [6, 11, 7, 5, | 12, 13]. Heapify -> [11, 6, 7, 5, | 12, 13]',
      'Continue until fully sorted: [5, 6, 7, 11, 12, 13].'
    ],
    visualizerType: 'sorting',
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n log n)',
      explanation: 'Building heap takes O(n). Extracting n elements takes n * O(log n) = O(n log n).'
    },
    spaceComplexity: { auxiliary: 'O(1)', total: 'O(n)', explanation: 'Pure in-place sorting.' },
    advantages: ['Strict O(n log n) worst-case guarantee', 'O(1) auxiliary space (no external buffers)', 'Zero worst-case quadratic degradation'],
    limitations: ['Not stable', 'Poorer cache locality than QuickSort due to large index jumps'],
    comparisonWithRelated: ['QuickSort is ~2-3x faster in practice on RAM due to cache lines, but HeapSort eliminates QuickSort\'s O(n^2) worst case.'],
    commonMistakes: ['Thinking building a heap takes O(n log n) instead of mathematical proof of O(n)'],
    interviewQuestions: [
      { q: 'Why does Build-Heap take O(n) instead of O(n log n)?', a: 'Most nodes are near the leaves where height is small: sum over heights h of (n / 2^(h+1)) * O(h) converges to O(n).' }
    ],
    recommendedNext: ['fractional-knapsack']
  },

  // =========================================================================
  // CATEGORY F: GREEDY ALGORITHMS
  // =========================================================================
  {
    id: 'fractional-knapsack',
    name: 'Fractional Knapsack',
    categoryId: 'greedy',
    category: 'Greedy Algorithms',
    simpleIntro: 'Given weights and values of n items, put these items in a knapsack of capacity W to get the maximum total value. In fractional knapsack, you can break items into fractions.',
    whyUseful: 'Demonstrates the Greedy Choice Property: choosing the highest value-per-unit-weight item first is provably optimal.',
    realWorldApp: 'Liquid inventory allocation, raw material slicing, resource scheduling with fractional shares.',
    prerequisites: ['what-is-algorithm', 'big-o-notation'],
    coreIdea: 'Compute ratio = value / weight for each item. Sort items in descending order of ratio. Take as much of the top item as possible until the knapsack is full.',
    stepByStep: [
      'Calculate ratio = item.value / item.weight for each item.',
      'Sort all items descending by this ratio.',
      'Initialize currentCapacity = W, totalValue = 0.',
      'For each item in sorted order: if item.weight <= remaining, take whole item; else take fraction.'
    ],
    pseudocode: `Algorithm FractionalKnapsack(W, items, n)
    for each item in items do item.ratio = item.value / item.weight
    Sort items descending by ratio
    totalValue = 0.0
    for each item in items do
        if item.weight <= W then
            W = W - item.weight
            totalValue = totalValue + item.value
        else
            totalValue = totalValue + item.value * (W / item.weight)
            break
    return totalValue`,
    jsImplementation: `function fractionalKnapsack(capacity, items) {
  const sorted = items
    .map(item => ({ ...item, ratio: item.value / item.weight }))
    .sort((a, b) => b.ratio - a.ratio);

  let totalValue = 0;
  let remainingCapacity = capacity;
  const taken = [];

  for (const item of sorted) {
    if (remainingCapacity <= 0) break;
    if (item.weight <= remainingCapacity) {
      remainingCapacity -= item.weight;
      totalValue += item.value;
      taken.push({ ...item, fraction: 1 });
    } else {
      const fraction = remainingCapacity / item.weight;
      totalValue += item.value * fraction;
      taken.push({ ...item, fraction });
      remainingCapacity = 0;
      break;
    }
  }
  return { totalValue, remainingCapacity, taken };
}`,
    exampleInput: 'Capacity W = 50, Items: A(wt: 10, val: 60), B(wt: 20, val: 100), C(wt: 30, val: 120)',
    workedExample: [
      'Ratios: A = 6.0, B = 5.0, C = 4.0.',
      'Take item A: wt = 10 <= 50 -> 100%. Rem = 40, Val = 60.',
      'Take item B: wt = 20 <= 40 -> 100%. Rem = 20, Val = 160.',
      'Item C: wt = 30 > 20 -> take fraction 20/30 = 2/3. Val += 120 * (2/3) = 80.',
      'Final total value = 240.'
    ],
    visualizerType: 'solver',
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n log n)',
      explanation: 'Dominated by sorting items by ratio in O(n log n). Greedy traversal is O(n).'
    },
    spaceComplexity: { auxiliary: 'O(1) to O(n) for sorting buffer', total: 'O(n)', explanation: 'Minimal memory' },
    advantages: ['Guaranteed mathematically optimal solution', 'Very fast O(n log n) execution'],
    limitations: ['Only works when items can be divided into arbitrary fractions (doesn\'t work for 0/1 Knapsack)'],
    comparisonWithRelated: ['0/1 Knapsack CANNOT be solved greedily; it requires Dynamic Programming O(nW) or Branch & Bound.'],
    commonMistakes: ['Applying greedy ratio approach to 0/1 knapsack where whole items must be taken'],
    interviewQuestions: [
      { q: 'Why does the greedy choice fail for 0/1 Knapsack?', a: 'Because leaving empty space in the knapsack due to indivisibility can cause higher-ratio items to yield less total value than a combination of lower-ratio items that pack tightly.' }
    ],
    recommendedNext: ['knapsack-01', 'dijkstra-algorithm']
  },

  {
    id: 'dijkstra-algorithm',
    name: 'Dijkstra\'s Shortest Path',
    categoryId: 'greedy',
    category: 'Greedy Algorithms',
    simpleIntro: 'Computes the shortest paths from a single source vertex to all other vertices in a weighted graph with non-negative edge weights.',
    whyUseful: 'The universal foundational algorithm for map routing, network packet routing, and navigation software.',
    realWorldApp: 'Google Maps driving directions, OSPF network routing protocol, telecommunications routing.',
    prerequisites: ['graph-algorithms', 'heap-sort'],
    coreIdea: 'Greedily visit the unvisited node with the smallest known tentative distance. Relax all its outgoing edges. Once visited, its distance is finalized.',
    stepByStep: [
      'Set dist[source] = 0, dist[v] = Infinity for all other vertices.',
      'Insert all vertices into a Priority Queue keyed by distance.',
      'While Priority Queue is not empty: extract vertex u with minimum dist[u].',
      'For each unvisited neighbor v of u: relax edge (u, v).'
    ],
    pseudocode: `Algorithm Dijkstra(Graph, source)
    dist[source] = 0
    Q = PriorityQueue of all vertices
    while Q is not empty do
        u = Q.extractMin()
        for each neighbor v of u do
            if dist[u] + weight(u, v) < dist[v] then
                dist[v] = dist[u] + weight(u, v)`,
    jsImplementation: `function dijkstra(numNodes, edges, startNode) {
  const adj = Array.from({ length: numNodes }, () => []);
  for (const [u, v, w] of edges) {
    adj[u].push({ node: v, weight: w });
    adj[v].push({ node: u, weight: w });
  }

  const dist = Array(numNodes).fill(Infinity);
  const visited = Array(numNodes).fill(false);
  dist[startNode] = 0;

  for (let i = 0; i < numNodes; i++) {
    let u = -1;
    for (let j = 0; j < numNodes; j++) {
      if (!visited[j] && (u === -1 || dist[j] < dist[u])) u = j;
    }
    if (dist[u] === Infinity) break;
    visited[u] = true;

    for (const edge of adj[u]) {
      const { node: v, weight: w } = edge;
      if (!visited[v] && dist[u] + w < dist[v]) {
        dist[v] = dist[u] + w;
      }
    }
  }
  return dist;
}`,
    exampleInput: 'Nodes: 0, 1, 2, 3. Edges: (0-1: 4), (0-2: 1), (2-1: 2), (1-3: 1). Start: 0',
    workedExample: [
      'Init: dist[0] = 0, others = Inf',
      'Step 1: Pick 0 (dist 0). Relax to 1 (4) and 2 (1).',
      'Step 2: Pick 2 (dist 1). Relax to 1: min(4, 1 + 2) = 3!',
      'Step 3: Pick 1 (dist 3). Relax to 3: 3 + 1 = 4!',
      'Final shortest distances: [0:0, 1:3, 2:1, 3:4].'
    ],
    visualizerType: 'graph',
    timeComplexity: {
      best: 'O((V + E) log V) with Binary Heap',
      average: 'O(E + V log V) with Fibonacci Heap',
      worst: 'O(V^2) with array',
      explanation: 'Extracting min takes V * log V, relaxing edges takes E * log V.'
    },
    spaceComplexity: { auxiliary: 'O(V + E)', total: 'O(V + E)', explanation: 'Stores graph and tracking tables.' },
    advantages: ['Optimal shortest paths on non-negative weighted graphs', 'Fast with binary min-heaps'],
    limitations: ['Fails on graphs with negative edge weights! Use Bellman-Ford for negative weights.'],
    comparisonWithRelated: ['BFS is for unweighted graphs; Dijkstra handles non-negative weights; Bellman-Ford handles negative weights.'],
    commonMistakes: ['Applying Dijkstra to graphs with negative edges'],
    interviewQuestions: [
      { q: 'Why does Dijkstra fail with negative edge weights?', a: 'Dijkstra permanently marks a vertex as visited assuming its distance can never be decreased later. A negative weight edge discovered later can invalidate this greedy assumption.' }
    ],
    recommendedNext: ['knapsack-01', 'breadth-first-search']
  },

  // =========================================================================
  // CATEGORY G: DYNAMIC PROGRAMMING
  // =========================================================================
  {
    id: 'knapsack-01',
    name: '0/1 Knapsack Problem',
    categoryId: 'dp',
    category: 'Dynamic Programming',
    simpleIntro: 'Given weights and values of n items, determine the maximum value subset of items that fits into a knapsack of capacity W, where each item can either be taken completely (1) or left behind (0).',
    whyUseful: 'The quintessential dynamic programming problem illustrating state representation, optimal substructure, and overlapping subproblems.',
    realWorldApp: 'Budget optimization, cargo container loading, investment portfolio selection with discrete projects.',
    prerequisites: ['what-is-algorithm', 'big-o-notation'],
    coreIdea: 'For each item i and capacity w, we have two choices: exclude item i (keep value dp[i-1][w]) or include item i if wt[i] <= w (value = val[i] + dp[i-1][w - wt[i]]). Take the maximum.',
    stepByStep: [
      'Create a 2D table dp[n + 1][W + 1] initialized to 0.',
      'Outer loop: i from 1 to n (considering first i items).',
      'Inner loop: w from 0 to W (capacity).',
      'If weights[i-1] <= w: dp[i][w] = Math.max(dp[i-1][w], values[i-1] + dp[i-1][w - weights[i-1]]).',
      'Else: dp[i][w] = dp[i-1][w].',
      'dp[n][W] contains the optimal total value.'
    ],
    pseudocode: `Algorithm Knapsack01(W, wt, val, n)
    Initialize DP[n + 1][W + 1] with 0
    for i = 1 to n do
        for w = 0 to W do
            if wt[i - 1] <= w then
                DP[i][w] = max(DP[i - 1][w], val[i - 1] + DP[i - 1][w - wt[i - 1]])
            else
                DP[i][w] = DP[i - 1][w]
    return DP[n][W]`,
    jsImplementation: `function knapsack01(capacity, weights, values) {
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
  return dp[n][capacity];
}`,
    exampleInput: 'W = 4, weights = [1, 2, 3], values = [10, 20, 30]',
    workedExample: [
      'Item 1 (wt 1, val 10): fills capacities 1..4 with value 10.',
      'Item 2 (wt 2, val 20): for w=3: max(10, 20+10)=30; for w=4: max(10, 20+10)=30.',
      'Item 3 (wt 3, val 30): for w=4: max(30, 30+10)=40!',
      'Final answer: dp[3][4] = 40 (Items 1 and 3 selected).'
    ],
    visualizerType: 'dp',
    timeComplexity: {
      best: 'Θ(n * W)',
      average: 'Θ(n * W)',
      worst: 'Θ(n * W)',
      explanation: 'Fills an n by W matrix where each entry takes O(1) time. This is Pseudo-polynomial time.'
    },
    spaceComplexity: { auxiliary: 'O(n * W), reducible to O(W)', total: 'O(n * W)', explanation: 'Matrix storage' },
    advantages: ['Finds guaranteed global optimal solution', 'Can be space-optimized to O(W)'],
    limitations: ['Pseudo-polynomial: if W is huge (e.g. 2^64), DP table is infeasible (NP-Complete)'],
    comparisonWithRelated: ['Fractional knapsack is solved greedily in O(n log n); 0/1 knapsack is NP-Complete, solved via DP in O(nW).'],
    commonMistakes: ['Thinking O(nW) is polynomial time (W is numeric value, not input bits)'],
    interviewQuestions: [
      { q: 'How can space complexity of 0/1 Knapsack be reduced to O(W)?', a: 'Use a single 1D array of size W+1 and iterate capacity backwards from W down to wt[i] to prevent reusing the same item in the same step.' }
    ],
    recommendedNext: ['longest-common-subsequence']
  },

  {
    id: 'longest-common-subsequence',
    name: 'Longest Common Subsequence (LCS)',
    categoryId: 'dp',
    category: 'Dynamic Programming',
    simpleIntro: 'Finds the longest subsequence present in two sequences in the same relative order, though not necessarily contiguously.',
    whyUseful: 'Powers file comparison tools (diff, git diff), bioinformatics DNA alignment, and version control merging.',
    realWorldApp: 'git diff, Unix diff command, BLAST DNA sequence alignment, speech recognition phoneme matching.',
    prerequisites: ['what-is-algorithm', 'big-o-notation'],
    coreIdea: 'If last characters match: LCS length is 1 + LCS of remaining prefixes. If they differ: take max(LCS dropping char from first, LCS dropping char from second).',
    stepByStep: [
      'Let strings be X of length m and Y of length n.',
      'Initialize table dp[m+1][n+1] with 0.',
      'If X[i-1] == Y[j-1]: dp[i][j] = 1 + dp[i-1][j-1].',
      'Else: dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]).',
      'dp[m][n] holds the LCS length.'
    ],
    pseudocode: `Algorithm LCS(X, Y, m, n)
    Initialize DP[m + 1][n + 1] with 0
    for i = 1 to m do
        for j = 1 to n do
            if X[i - 1] == Y[j - 1] then
                DP[i][j] = 1 + DP[i - 1][j - 1]
            else
                DP[i][j] = max(DP[i - 1][j], DP[i][j - 1])
    return DP[m][n]`,
    jsImplementation: `function lcs(str1, str2) {
  const m = str1.length;
  const n = str2.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = 1 + dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }
  return dp[m][n];
}`,
    exampleInput: 'str1 = "ABCBDAB", str2 = "BDCABA"',
    workedExample: [
      'Bottom-right cell dp[7][6] evaluates to 4.',
      'Backtracking yields sequence "BCBA" (or "BDAB", both length 4).'
    ],
    visualizerType: 'dp',
    timeComplexity: { best: 'Θ(m * n)', average: 'Θ(m * n)', worst: 'Θ(m * n)', explanation: 'Evaluates each of the (m + 1) * (n + 1) cells in O(1) time.' },
    spaceComplexity: { auxiliary: 'O(m * n)', total: 'O(m * n)', explanation: 'Table storage' },
    advantages: ['Quadratic time replaces brute force exponential 2^(m+n)'],
    limitations: ['O(m * n) space can be high for long DNA genomes'],
    comparisonWithRelated: ['Longest Common Substring requires contiguous matching; Subsequence allows gaps.'],
    commonMistakes: ['Confusing subsequence (can skip letters) with substring (must be adjacent)'],
    interviewQuestions: [
      { q: 'How does git diff use LCS?', a: 'git diff converts each line of a file into a token and computes the LCS of the two versions to identify added and deleted lines.' }
    ],
    recommendedNext: ['breadth-first-search', 'n-queens']
  },

  // =========================================================================
  // CATEGORY H: GRAPH ALGORITHMS
  // =========================================================================
  {
    id: 'breadth-first-search',
    name: 'Breadth-First Search (BFS)',
    categoryId: 'graph',
    category: 'Graph Algorithms',
    simpleIntro: 'A graph traversal algorithm that explores all vertices at the current distance level before moving on to vertices at the next distance level, using a Queue.',
    whyUseful: 'Finds the shortest path on any unweighted graph, detects bipartiteness, and discovers connected components.',
    realWorldApp: 'Social network degrees of separation (LinkedIn connections), web crawlers, GPS unweighted hops.',
    prerequisites: ['what-is-algorithm'],
    coreIdea: 'Start at source node, mark visited, push to Queue. Repeatedly pop front node, inspect all unvisited neighbors, mark visited, and enqueue.',
    stepByStep: [
      'Initialize visited array and Queue.',
      'Enqueue starting vertex and mark as visited.',
      'While Queue is not empty: dequeue front u, explore all unvisited neighbors v, mark visited, enqueue.'
    ],
    pseudocode: `Algorithm BFS(Graph, startNode)
    Create Queue Q
    mark startNode as visited
    Q.enqueue(startNode)
    while Q is not empty do
        u = Q.dequeue()
        for each neighbor v of u do
            if v is not visited then
                mark v as visited
                Q.enqueue(v)`,
    jsImplementation: `function bfs(adjList, startNode) {
  const visited = new Set();
  const queue = [startNode];
  const order = [];

  visited.add(startNode);
  while (queue.length > 0) {
    const u = queue.shift();
    order.push(u);
    for (const v of adjList[u] || []) {
      if (!visited.has(v)) {
        visited.add(v);
        queue.push(v);
      }
    }
  }
  return order;
}`,
    exampleInput: 'Nodes 0, 1, 2, 3 with edges (0-1), (0-2), (1-3)',
    workedExample: [
      'Queue: [0]. Pop 0 -> Enqueue 1, 2.',
      'Queue: [1, 2]. Pop 1 -> Enqueue 3.',
      'Queue: [2, 3]. Pop 2, Pop 3.',
      'Order: [0, 1, 2, 3].'
    ],
    visualizerType: 'graph',
    timeComplexity: { best: 'O(V + E)', average: 'O(V + E)', worst: 'O(V + E)', explanation: 'Every vertex is enqueued once O(V), every edge explored once O(E).' },
    spaceComplexity: { auxiliary: 'O(V) for queue and visited set', total: 'O(V + E)', explanation: 'Graph plus queue' },
    advantages: ['Guarantees shortest path on unweighted graphs'],
    limitations: ['High memory consumption O(V) for wide graphs'],
    comparisonWithRelated: ['BFS uses Queue (FIFO); DFS uses Stack (LIFO).'],
    commonMistakes: ['Marking node visited upon dequeuing instead of enqueuing'],
    interviewQuestions: [
      { q: 'Why does BFS guarantee the shortest path on unweighted graphs?', a: 'Because BFS processes vertices in strictly increasing order of their distance from the source.' }
    ],
    recommendedNext: ['depth-first-search']
  },

  {
    id: 'depth-first-search',
    name: 'Depth-First Search (DFS)',
    categoryId: 'graph',
    category: 'Graph Algorithms',
    simpleIntro: 'A graph traversal algorithm that explores as far as possible along each branch before backtracking, using recursion or an explicit Stack.',
    whyUseful: 'Fundamental for topological sorting, cycle detection, strongly connected components, and maze solving.',
    realWorldApp: 'Compiler build order dependency resolution, cycle detection in package managers, solving mazes.',
    prerequisites: ['what-is-algorithm', 'iterative-vs-recursive'],
    coreIdea: 'Dive deep into the first neighbor recursively until a dead end is reached, then backtrack to explore sibling branches.',
    stepByStep: [
      'Mark current vertex u as visited.',
      'Process vertex u.',
      'For each unvisited neighbor v of u: recursively call DFS(v).',
      'When all neighbors are visited, backtrack.'
    ],
    pseudocode: `Algorithm DFS(Graph, u)
    mark u as visited
    for each neighbor v of u do
        if v is not visited then DFS(Graph, v)`,
    jsImplementation: `function dfs(adjList, startNode) {
  const visited = new Set();
  const order = [];

  function explore(u) {
    visited.add(u);
    order.push(u);
    for (const v of adjList[u] || []) {
      if (!visited.has(v)) explore(v);
    }
  }

  explore(startNode);
  return order;
}`,
    exampleInput: 'Nodes 0, 1, 2, 3 with edges (0-1), (1-2), (0-3)',
    workedExample: [
      'Visit 0 -> Explore 1 -> Explore 2 (Dead end) -> Backtrack to 0 -> Explore 3.',
      'Order: [0, 1, 2, 3].'
    ],
    visualizerType: 'graph',
    timeComplexity: { best: 'O(V + E)', average: 'O(V + E)', worst: 'O(V + E)', explanation: 'Every vertex and edge inspected once.' },
    spaceComplexity: { auxiliary: 'O(V) for recursion stack', total: 'O(V + E)', explanation: 'Call stack' },
    advantages: ['Low memory consumption on deep trees', 'Detects cycles naturally via back-edges'],
    limitations: ['Does not find shortest paths'],
    comparisonWithRelated: ['BFS finds shortest path; DFS is optimal for topological sorting and cycle checks.'],
    commonMistakes: ['Not tracking visited set causing infinite loops in cyclic graphs'],
    interviewQuestions: [
      { q: 'How do you detect a cycle in a directed graph using DFS?', a: 'Maintain three states: Unvisited, Visiting (in recursion stack), and Visited. Encountring a Visiting node indicates a back-edge (cycle).' }
    ],
    recommendedNext: ['n-queens', 'master-theorem']
  },

  // =========================================================================
  // CATEGORY I: BACKTRACKING
  // =========================================================================
  {
    id: 'n-queens',
    name: 'N-Queens Problem',
    categoryId: 'backtracking',
    category: 'Backtracking',
    simpleIntro: 'The challenge of placing N non-attacking chess queens on an N×N chessboard so that no two queens threaten each other (no two queens share the same row, column, or diagonal).',
    whyUseful: 'The classical textbook problem for understanding constraint satisfaction, state-space tree traversal, and pruning via backtracking.',
    realWorldApp: 'VLSI chip layout placement, register allocation in compilers, constraint satisfaction solvers.',
    prerequisites: ['what-is-algorithm', 'iterative-vs-recursive'],
    coreIdea: 'Place queens row by row. For each row, try each column. If safe, place queen and recurse to next row. If no column works, backtrack and move previous queen.',
    stepByStep: [
      'Start in row 0.',
      'If row == N: all queens placed safely; record board configuration.',
      'For col = 0 to N - 1: check if safe; if safe place and recurse; backtrack by removing queen.'
    ],
    pseudocode: `Algorithm SolveNQueens(row, N, board)
    if row == N then recordSolution(board); return
    for col = 0 to N - 1 do
        if isSafe(row, col, board, N) then
            board[row][col] = 1
            SolveNQueens(row + 1, N, board)
            board[row][col] = 0 // Backtrack`,
    jsImplementation: `function solveNQueens(n) {
  const solutions = [];
  const board = Array.from({ length: n }, () => Array(n).fill('.'));

  function isSafe(row, col) {
    for (let i = 0; i < row; i++) if (board[i][col] === 'Q') return false;
    for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) if (board[i][j] === 'Q') return false;
    for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) if (board[i][j] === 'Q') return false;
    return true;
  }

  function place(row) {
    if (row === n) {
      solutions.push(board.map(r => r.join('')));
      return;
    }
    for (let col = 0; col < n; col++) {
      if (isSafe(row, col)) {
        board[row][col] = 'Q';
        place(row + 1);
        board[row][col] = '.'; // Backtrack
      }
    }
  }

  place(0);
  return solutions;
}`,
    exampleInput: 'N = 4',
    workedExample: [
      'Row 0: Q at (0, 0)',
      'Row 1: Try col 2 -> Q at (1, 2)',
      'Row 2: All columns threatened! Conflict! -> Backtrack to Row 1!',
      'Row 1: Try col 3 -> Q at (1, 3)',
      'Row 2: Q at (2, 1)',
      'Row 3: No valid square -> Backtrack to Row 0!',
      'Row 0: Try col 1 -> Q at (0, 1) -> Solution found: [(0,1), (1,3), (2,0), (3,2)].'
    ],
    visualizerType: 'backtracking',
    timeComplexity: { best: 'O(N!) with pruning', average: 'O(N!)', worst: 'O(N!)', explanation: 'Pruned upper bound is O(N!).' },
    spaceComplexity: { auxiliary: 'O(N) for recursion stack', total: 'O(N^2)', explanation: 'Board and stack' },
    advantages: ['Finds all valid solutions', 'Prunes billions of invalid states early'],
    limitations: ['Exponential time; infeasible for large N (>25)'],
    comparisonWithRelated: ['Branch & Bound uses bounding functions; Backtracking uses depth-first constraint pruning.'],
    commonMistakes: ['Forgetting to undo the choice (backtrack) before next column'],
    interviewQuestions: [
      { q: 'How many solutions exist for N = 8?', a: '92 distinct solutions (12 unique fundamental solutions under rotation and reflection).' }
    ],
    recommendedNext: ['master-theorem']
  },

  // =========================================================================
  // CATEGORY K: RECURRENCE RELATIONS
  // =========================================================================
  {
    id: 'master-theorem',
    name: 'Master Theorem',
    categoryId: 'recurrence',
    category: 'Recurrence Relations',
    simpleIntro: 'A mathematical formula providing cookbook asymptotic solutions (Big Theta) for divide-and-conquer recurrence relations of the form T(n) = a*T(n/b) + f(n).',
    whyUseful: 'Instantly determines Big Theta runtime of algorithms like Merge Sort, Binary Search, and Strassen\'s multiplication without drawing full recursion trees.',
    realWorldApp: 'Algorithm performance modeling, distributed map-reduce queries, hardware cache hierarchy analysis.',
    prerequisites: ['big-o-notation', 'divide-conquer'],
    coreIdea: 'Compares the work done by leaf subproblems (n^(log_b a)) against the work done at the root to divide and combine (f(n)). Whichever dominates determines the overall runtime.',
    stepByStep: [
      'Verify recurrence is in form: T(n) = a * T(n / b) + f(n), with a >= 1 and b > 1.',
      'Compute the critical exponent: c_crit = log_b(a). The watershed function is n^(log_b a).',
      'Case 1: If f(n) = O(n^(c_crit - epsilon)): T(n) = Θ(n^(log_b a)) [Leaves dominate].',
      'Case 2: If f(n) = Θ(n^(c_crit) * log^k(n)): T(n) = Θ(n^(log_b a) * log^(k + 1)(n)) [Balanced work].',
      'Case 3: If f(n) = Ω(n^(c_crit + epsilon)) and regularity condition holds: T(n) = Θ(f(n)) [Root dominates].'
    ],
    pseudocode: `Algorithm MasterTheoremSolver(a, b, k, p)
    c_crit = log(a) / log(b)
    if c_crit > k then return "Case 1: Theta(n^" + c_crit + ")"
    else if c_crit == k then return "Case 2: Theta(n^" + k + " * log^" + (p + 1) + "(n))"
    else return "Case 3: Theta(n^" + k + ")"`,
    jsImplementation: `function solveMasterTheorem(a, b, k, p = 0) {
  if (a < 1 || b <= 1) return { valid: false, error: 'a >= 1 and b > 1 required.' };
  const cCrit = Math.log(a) / Math.log(b);
  const diff = cCrit - k;
  const tol = 1e-6;

  if (diff > tol) return { caseNum: 1, complexity: \`Θ(n^\${cCrit.toFixed(2)})\` };
  if (Math.abs(diff) <= tol) return { caseNum: 2, complexity: \`Θ(n^\${k} log^\${p + 1} n)\` };
  return { caseNum: 3, complexity: \`Θ(n^\${k})\` };
}`,
    exampleInput: 'Merge Sort: T(n) = 2T(n/2) + Θ(n) -> a = 2, b = 2, k = 1, p = 0',
    workedExample: [
      'Step 1: a = 2, b = 2, f(n) = n^1.',
      'Step 2: c_crit = log_2(2) = 1.',
      'Step 3: Compare c_crit (1) with k (1): Equal!',
      'Step 4: Case 2 with p = 0 -> T(n) = Θ(n log n).'
    ],
    visualizerType: 'solver',
    timeComplexity: { best: 'O(1)', average: 'O(1)', worst: 'O(1)', explanation: 'Constant time algebraic formula evaluation.' },
    spaceComplexity: { auxiliary: 'O(1)', total: 'O(1)', explanation: 'N/A' },
    advantages: ['Instant analytical solution without drawing recursion trees', 'Standard in university examinations'],
    limitations: ['Cannot be applied if a is non-constant, b <= 1, or difference is not polynomial (e.g. n / log n)'],
    comparisonWithRelated: ['Akra-Bazzi method extends Master Theorem to non-integer divisions like T(n) = T(n/3) + T(2n/3) + O(n).'],
    commonMistakes: ['Forgetting that the difference between n^(log_b a) and f(n) must be polynomial (n^epsilon), not logarithmic'],
    interviewQuestions: [
      { q: 'Can Master Theorem solve T(n) = 2T(n/2) + n/log(n)?', a: 'No, because the gap between n and n/log(n) is logarithmic, not polynomial.' }
    ],
    recommendedNext: ['merge-sort', 'binary-search']
  },
  // =========================================================================
  // ADDITIONAL EXPANDED CURRICULUM TOPICS (CATEGORIES E THROUGH M)
  // =========================================================================
{
  "id": "strassen-matrix",
  "name": "Strassen's Matrix Multiplication",
  "categoryId": "divide-conquer",
  "category": "Divide and Conquer",
  "simpleIntro": "Strassen’s algorithm computes the product of two n x n matrices using 7 recursive submatrix multiplications instead of the standard 8, reducing asymptotic complexity below O(n³).",
  "whyUseful": "Standard matrix multiplication requires O(n³) operations. Strassen was the first to prove that matrix multiplication can be strictly faster than cubic time, paving the way for sub-cubic algorithms.",
  "realWorldApp": "Computer graphics transformations, 3D rendering pipelines, deep neural network training matrix engines, scientific linear algebra solvers.",
  "prerequisites": [
    "Basic Matrix Multiplication",
    "Divide and Conquer Concept",
    "Master Theorem"
  ],
  "coreIdea": "Instead of dividing matrices into 8 subproblems: A*B = [C11 C12; C21 C22], Strassen creatively combines additions and subtractions into 7 intermediate products (P1 through P7) that yield C.",
  "stepByStep": [
    "Partition each input n x n matrix into four (n/2) x (n/2) submatrices: A11, A12, A21, A22 and B11, B12, B21, B22.",
    "Compute 10 submatrix addition and subtraction terms (e.g. S1 = B12 - B22, S2 = A11 + A12, etc.).",
    "Recursively compute 7 matrix products P1 = A11 * S1, P2 = S2 * B22, ... P7 = S9 * S10.",
    "Combine P1..P7 using matrix additions to form the four quadrants C11, C12, C21, C22 of product matrix C."
  ],
  "pseudocode": "Algorithm StrassenMultiply(A, B, n)\n    if n == 1 then\n        return [[A[0][0] * B[0][0]]]\n    Partition A into A11, A12, A21, A22\n    Partition B into B11, B12, B21, B22\n    P1 = StrassenMultiply(A11, B12 - B22, n/2)\n    P2 = StrassenMultiply(A11 + A12, B22, n/2)\n    P3 = StrassenMultiply(A21 + A22, B11, n/2)\n    P4 = StrassenMultiply(A22, B21 - B11, n/2)\n    P5 = StrassenMultiply(A11 + A22, B11 + B22, n/2)\n    P6 = StrassenMultiply(A12 - A22, B21 + B22, n/2)\n    P7 = StrassenMultiply(A11 - A21, B11 + B12, n/2)\n    C11 = P5 + P4 - P2 + P6\n    C12 = P1 + P2\n    C21 = P3 + P4\n    C22 = P5 + P1 - P3 - P7\n    return C",
  "jsImplementation": "function strassenMultiply2x2(A, B) {\n  // Base 2x2 implementation demonstrating the 7-multiplication formulas\n  const p1 = A[0][0] * (B[0][1] - B[1][1]);\n  const p2 = (A[0][0] + A[0][1]) * B[1][1];\n  const p3 = (A[1][0] + A[1][1]) * B[0][0];\n  const p4 = A[1][1] * (B[1][0] - B[0][0]);\n  const p5 = (A[0][0] + A[1][1]) * (B[0][0] + B[1][1]);\n  const p6 = (A[0][1] - A[1][1]) * (B[1][0] + B[1][1]);\n  const p7 = (A[0][0] - A[1][0]) * (B[0][0] + B[0][1]);\n\n  const C = [\n    [p5 + p4 - p2 + p6, p1 + p2],\n    [p3 + p4, p5 + p1 - p3 - p7]\n  ];\n  return C;\n}",
  "exampleInput": "A = [[1, 2], [3, 4]], B = [[5, 6], [7, 8]]",
  "workedExample": [
    "Input: 2x2 matrices A and B",
    "Compute P1 = 1 * (6 - 8) = -2",
    "Compute P2 = (1 + 2) * 8 = 24",
    "Compute P3 = (3 + 4) * 5 = 35",
    "Compute P4 = 4 * (7 - 5) = 8",
    "Compute P5 = (1 + 4) * (5 + 8) = 65",
    "Compute P6 = (2 - 4) * (7 + 8) = -30",
    "Compute P7 = (1 - 3) * (5 + 6) = -22",
    "C11 = 65 + 8 - 24 + (-30) = 19; C12 = -2 + 24 = 22",
    "C21 = 35 + 8 = 43; C22 = 65 + (-2) - 35 - (-22) = 50",
    "Result C = [[19, 22], [43, 50]] exactly matches standard matrix multiplication!"
  ],
  "visualizerType": null,
  "timeComplexity": {
    "best": "O(n^2.8074)",
    "average": "O(n^2.8074)",
    "worst": "O(n^2.8074)",
    "explanation": "Recurrence T(n) = 7T(n/2) + O(n^2). Applying Master Theorem Case 1: n^(log_2(7)) ≈ n^2.8074, strictly better than standard O(n^3)."
  },
  "spaceComplexity": {
    "auxiliary": "O(n^2)",
    "total": "O(n^2)",
    "explanation": "Requires auxiliary space for intermediate submatrices at each recursion depth."
  },
  "advantages": [
    "Asymptotically faster than standard O(n³) matrix multiplication for very large matrices",
    "Historical breakthrough proving O(n³) is not the theoretical lower bound"
  ],
  "limitations": [
    "Substantial constant factor overhead due to extra matrix additions and memory allocations",
    "In practice, only outperforms standard multiplication for matrices n > 500-1000",
    "Less numerically stable due to floating-point roundoff errors"
  ],
  "comparisonWithRelated": [
    "Standard matrix multiplication is O(n³) with minimal memory overhead.",
    "Coppersmith-Winograd algorithm achieves O(n^2.376) but with impractically massive constant factors."
  ],
  "commonMistakes": [
    "Confusing the indices for P1..P7 combinations and signs (+ vs -)",
    "Assuming Strassen is faster on small 3x3 or 4x4 matrices (it is much slower due to overhead)"
  ],
  "interviewQuestions": [
    {
      "q": "Why does Strassen use 7 multiplications instead of 8?",
      "a": "Standard divide-and-conquer splits into 8 subproblems of size n/2 giving T(n)=8T(n/2)+O(n^2) => O(n^3). Reducing multiplications to 7 gives T(n)=7T(n/2)+O(n^2) => O(n^(log_2 7)) ≈ O(n^2.807)."
    },
    {
      "q": "What is the crossover point for Strassen in real systems?",
      "a": "Usually around n = 512 to 1024, where recursive savings exceed memory allocation and cache miss penalties."
    }
  ],
  "recommendedNext": [
    "master-theorem",
    "matrix-chain-multiplication"
  ]
},
{
  "id": "max-subarray",
  "name": "Maximum Subarray Problem (Divide and Conquer)",
  "categoryId": "divide-conquer",
  "category": "Divide and Conquer",
  "simpleIntro": "Finds the contiguous segment in a 1D numerical array whose total sum is maximized by dividing the array into halves and analyzing cross-boundary sums.",
  "whyUseful": "Demonstrates how Divide and Conquer transforms a brute-force O(n²) problem into O(n log n), contrasting with Kadane’s O(n) Dynamic Programming.",
  "realWorldApp": "Stock market peak gain periods, genomic sequence analysis (identifying GC-rich regions), image signal processing.",
  "prerequisites": [
    "Basic Arrays",
    "Divide and Conquer Principles",
    "Recursion"
  ],
  "coreIdea": "Any maximum subarray either lies entirely in the left half, entirely in the right half, or spans across the midpoint. Solving each recursively yields the global maximum.",
  "stepByStep": [
    "Base Case: If array has only 1 element, return its value.",
    "Divide: Find midpoint mid = floor((low + high) / 2).",
    "Conquer: Recursively find maximum subarray in Left half (low to mid) and Right half (mid+1 to high).",
    "Combine: Calculate maximum crossing subarray spanning across mid to the left and right in linear time.",
    "Return the maximum of (Left Max, Right Max, Cross Max)."
  ],
  "pseudocode": "Algorithm FindMaxSubarray(A, low, high)\n    if low == high then return A[low]\n    mid = floor((low + high) / 2)\n    leftMax = FindMaxSubarray(A, low, mid)\n    rightMax = FindMaxSubarray(A, mid + 1, high)\n    crossMax = FindMaxCrossingSubarray(A, low, mid, high)\n    return max(leftMax, rightMax, crossMax)",
  "jsImplementation": "function maxCrossingSubarray(arr, low, mid, high) {\n  let leftSum = -Infinity, sum = 0;\n  for (let i = mid; i >= low; i--) {\n    sum += arr[i];\n    if (sum > leftSum) leftSum = sum;\n  }\n  let rightSum = -Infinity;\n  sum = 0;\n  for (let j = mid + 1; j <= high; j++) {\n    sum += arr[j];\n    if (sum > rightSum) rightSum = sum;\n  }\n  return leftSum + rightSum;\n}\n\nfunction maxSubarrayDivideConquer(arr, low = 0, high = arr.length - 1) {\n  if (low === high) return arr[low];\n  const mid = Math.floor((low + high) / 2);\n  const leftMax = maxSubarrayDivideConquer(arr, low, mid);\n  const rightMax = maxSubarrayDivideConquer(arr, mid + 1, high);\n  const crossMax = maxCrossingSubarray(arr, low, mid, high);\n  return Math.max(leftMax, rightMax, crossMax);\n}",
  "exampleInput": "[-2, 1, -3, 4, -1, 2, 1, -5, 4]",
  "workedExample": [
    "Input array: [-2, 1, -3, 4, -1, 2, 1, -5, 4]",
    "Left half: [-2, 1, -3, 4], Right half: [-1, 2, 1, -5, 4]",
    "Subarray [4, -1, 2, 1] crosses midpoint.",
    "Left max crossing sum from mid includes [4] = 4.",
    "Right max crossing sum from mid includes [-1, 2, 1] = 2.",
    "Crossing sum: 4 + 2 = 6.",
    "Left internal max is 4, right internal max is 4.",
    "Global maximum sum is 6 from subarray [4, -1, 2, 1]."
  ],
  "visualizerType": null,
  "timeComplexity": {
    "best": "O(n log n)",
    "average": "O(n log n)",
    "worst": "O(n log n)",
    "explanation": "T(n) = 2T(n/2) + O(n). By Master Theorem Case 2, T(n) = O(n log n)."
  },
  "spaceComplexity": {
    "auxiliary": "O(log n)",
    "total": "O(n)",
    "explanation": "Call stack depth is bounded by recursion tree height log_2(n)."
  },
  "advantages": [
    "Easily parallelizable across multiple CPU cores",
    "Guarantees O(n log n) performance even for worst-case pathological inputs"
  ],
  "limitations": [
    "Kadane’s Algorithm accomplishes the same in O(n) linear time with O(1) space"
  ],
  "comparisonWithRelated": [
    "Brute Force: O(n²) checks all pairs.",
    "Divide and Conquer: O(n log n).",
    "Kadane’s DP Algorithm: O(n) time, O(1) space."
  ],
  "commonMistakes": [
    "Starting the right crossing loop from high instead of mid + 1",
    "Forgetting that cross-boundary search must start at mid and expand outward continuously"
  ],
  "interviewQuestions": [
    {
      "q": "How does Divide & Conquer compare to Kadane’s algorithm for this problem?",
      "a": "Divide & Conquer takes O(n log n) and O(log n) stack space, whereas Kadane’s algorithm solves it in O(n) single-pass with O(1) space. However, D&C is easier to parallelize in distributed MapReduce."
    }
  ],
  "recommendedNext": [
    "merge-sort",
    "master-theorem"
  ]
},
{
  "id": "activity-selection",
  "name": "Activity Selection Problem",
  "categoryId": "greedy",
  "category": "Greedy Algorithms",
  "simpleIntro": "Selects the maximum number of mutually compatible activities that share a single resource by greedily picking the activity that finishes earliest.",
  "whyUseful": "Canonical textbook demonstration of the Greedy-Choice Property and Optimal Substructure. Proves why greedy choices lead to globally optimal solutions.",
  "realWorldApp": "Classroom room scheduling, CPU task dispatching, meeting room booking software, satellite imaging task scheduling.",
  "prerequisites": [
    "Sorting",
    "Greedy Choice Property"
  ],
  "coreIdea": "By always scheduling the activity that finishes earliest, you leave maximum available remaining time for subsequent activities. This greedy choice never eliminates a potentially better alternative.",
  "stepByStep": [
    "Sort all activities by their finish times in non-decreasing order.",
    "Select the first activity (it finishes first).",
    "For each subsequent activity, if its start time >= finish time of the previously chosen activity, select it.",
    "Repeat until all activities have been considered."
  ],
  "pseudocode": "Algorithm ActivitySelection(s, f, n)\n    Sort activities by finish time f in ascending order\n    selected = [activity 0]\n    lastFinish = f[0]\n    for i = 1 to n - 1 do\n        if s[i] >= lastFinish then\n            selected.append(activity i)\n            lastFinish = f[i]\n    return selected",
  "jsImplementation": "function selectActivities(activities) {\n  // activities is an array of { id, start, finish }\n  const sorted = [...activities].sort((a, b) => a.finish - b.finish);\n  const selected = [sorted[0]];\n  let lastFinish = sorted[0].finish;\n\n  for (let i = 1; i < sorted.length; i++) {\n    if (sorted[i].start >= lastFinish) {\n      selected.push(sorted[i]);\n      lastFinish = sorted[i].finish;\n    }\n  }\n  return selected;\n}",
  "exampleInput": "Activities: [(1, 4), (3, 5), (0, 6), (5, 7), (3, 9), (5, 9), (6, 10), (8, 11), (8, 12), (2, 14), (12, 16)]",
  "workedExample": [
    "Step 1: Sort by finish time: (1,4), (3,5), (0,6), (5,7), (3,9), (5,9), (6,10), (8,11), (8,12), (2,14), (12,16)",
    "Step 2: Pick (1,4). Last finish = 4.",
    "Step 3: Check (3,5): 3 < 4 (conflict, skip).",
    "Step 4: Check (0,6): 0 < 4 (conflict, skip).",
    "Step 5: Check (5,7): 5 >= 4 (compatible!). Pick (5,7). Last finish = 7.",
    "Step 6: Check (8,11): 8 >= 7 (compatible!). Pick (8,11). Last finish = 11.",
    "Step 7: Check (12,16): 12 >= 11 (compatible!). Pick (12,16). Last finish = 16.",
    "Final schedule: 4 activities selected: [(1,4), (5,7), (8,11), (12,16)]. Maximum possible!"
  ],
  "visualizerType": null,
  "timeComplexity": {
    "best": "O(n log n)",
    "average": "O(n log n)",
    "worst": "O(n log n)",
    "explanation": "Sorting n activities takes O(n log n). The greedy linear scan takes O(n). Overall O(n log n)."
  },
  "spaceComplexity": {
    "auxiliary": "O(1)",
    "total": "O(n)",
    "explanation": "O(1) auxiliary memory if sorted in-place, or O(n) to store selected activities list."
  },
  "advantages": [
    "Extremely fast and optimal for single-resource scheduling",
    "Easy to implement with clean linear scan after sorting"
  ],
  "limitations": [
    "Only maximizes total COUNT of activities, not weighted values (Weighted Activity Selection requires DP)"
  ],
  "comparisonWithRelated": [
    "Unweighted: Solved in O(n log n) by Greedy (earliest finish time).",
    "Weighted Interval Scheduling: Greedy fails; requires Dynamic Programming O(n log n) with binary search."
  ],
  "commonMistakes": [
    "Sorting by start time instead of finish time (counterexample: long meeting starting at 0 and ending at 100 blocks all short meetings)",
    "Sorting by shortest duration (fails when short meeting conflicts with two adjacent meetings)"
  ],
  "interviewQuestions": [
    {
      "q": "Why does earliest finish time greedy choice work?",
      "a": "Choosing the activity that finishes earliest frees up the resource as soon as possible, leaving maximum remaining time for remaining activities. Proved by the cut-and-paste exchange argument."
    },
    {
      "q": "What if activities have different values or profits?",
      "a": "Greedy fails. You must use Dynamic Programming with binary search (Weighted Interval Scheduling) in O(n log n)."
    }
  ],
  "recommendedNext": [
    "fractional-knapsack",
    "huffman-coding"
  ]
},
{
  "id": "huffman-coding",
  "name": "Huffman Coding",
  "categoryId": "greedy",
  "category": "Greedy Algorithms",
  "simpleIntro": "A lossless data compression algorithm that assigns variable-length binary prefix codes to characters based on frequencies, where frequent characters get shorter codes.",
  "whyUseful": "Foundation of modern data compression formats (JPEG, MP3, GZIP, PKZIP). Proves how greedy trees minimize expected code length.",
  "realWorldApp": "Deflate compression in ZIP/GZIP, JPEG image Huffman entropy encoding, MP3 audio frames, text compression protocols.",
  "prerequisites": [
    "Binary Trees",
    "Priority Queues / Min-Heaps",
    "Greedy Strategy"
  ],
  "coreIdea": "Build a binary tree from bottom up by repeatedly extracting the two lowest frequency nodes from a min-heap and creating a parent node with their combined frequency.",
  "stepByStep": [
    "Count frequency of each character in text.",
    "Insert all leaf nodes into a min-priority queue keyed by frequency.",
    "While priority queue size > 1: extract two minimum nodes (left and right), create a new interior node with sum frequency, and reinsert it.",
    "Remaining single node is the root of the Huffman Tree.",
    "Traverse tree: assign bit 0 for left branches and bit 1 for right branches to generate prefix codes."
  ],
  "pseudocode": "Algorithm Huffman(C)\n    n = |C|\n    Q = MinPriorityQueue(C)\n    for i = 1 to n - 1 do\n        z = new Node()\n        z.left = x = Q.extractMin()\n        z.right = y = Q.extractMin()\n        z.freq = x.freq + y.freq\n        Q.insert(z)\n    return Q.extractMin() // Root of Huffman Tree",
  "jsImplementation": "class HuffmanNode {\n  constructor(char, freq, left = null, right = null) {\n    this.char = char;\n    this.freq = freq;\n    this.left = left;\n    this.right = right;\n  }\n}\n\nfunction buildHuffmanTree(frequencies) {\n  const heap = Object.entries(frequencies).map(\n    ([char, freq]) => new HuffmanNode(char, freq)\n  );\n\n  while (heap.length > 1) {\n    heap.sort((a, b) => a.freq - b.freq);\n    const left = heap.shift();\n    const right = heap.shift();\n    const parent = new HuffmanNode(null, left.freq + right.freq, left, right);\n    heap.push(parent);\n  }\n  return heap[0];\n}",
  "exampleInput": "Chars: { a: 45, b: 13, c: 12, d: 16, e: 9, f: 5 }",
  "workedExample": [
    "Initial frequencies: f:5, e:9, c:12, b:13, d:16, a:45",
    "Merge f(5) + e(9) = node1(14)",
    "Merge c(12) + b(13) = node2(25)",
    "Merge node1(14) + d(16) = node3(30)",
    "Merge node2(25) + node3(30) = node4(55)",
    "Merge a(45) + node4(55) = root(100)",
    "Resulting Prefix Codes:",
    "  a: \"0\" (1 bit for 45% of text!)",
    "  c: \"100\", b: \"101\", f: \"1100\", e: \"1101\", d: \"111\"",
    "Average bits per character: 2.24 bits vs 3 bits fixed! 25.3% compression ratio achieved."
  ],
  "visualizerType": null,
  "timeComplexity": {
    "best": "O(n log n)",
    "average": "O(n log n)",
    "worst": "O(n log n)",
    "explanation": "Building the tree with a min-heap takes n - 1 extract-min and insert operations, each taking O(log n)."
  },
  "spaceComplexity": {
    "auxiliary": "O(n)",
    "total": "O(n)",
    "explanation": "Stores binary tree with at most 2n - 1 total nodes and priority queue."
  },
  "advantages": [
    "Guaranteed optimal prefix code among all character-by-character encodings",
    "Prefix-free property guarantees unambiguous instantaneous decoding without delimiters"
  ],
  "limitations": [
    "Decoder must know the Huffman tree or character frequency table, adding header overhead for small files",
    "Cannot compress beyond Shannon entropy of individual character distribution"
  ],
  "comparisonWithRelated": [
    "Fixed-length codes (ASCII): 8 bits per character regardless of frequency.",
    "Huffman: Variable length based on frequency; optimal character-level prefix code.",
    "LZW/Deflate: Uses dictionary of strings, compressing multi-character repeated sequences."
  ],
  "commonMistakes": [
    "Assuming left and right branch assignments change the compression optimality (they create mirror trees with identical bit lengths)",
    "Forgetting that Huffman codes must be prefix-free (no code can be a prefix of another)"
  ],
  "interviewQuestions": [
    {
      "q": "What is a prefix-free code and why is it essential in Huffman coding?",
      "a": "No valid codeword is a prefix of another codeword. This allows the decoder to read a stream bit-by-bit and instantly emit characters without lookahead or punctuation."
    },
    {
      "q": "Can Huffman tree be constructed in O(n) time?",
      "a": "Yes, if character frequencies are already sorted, by using two FIFO queues instead of a priority queue."
    }
  ],
  "recommendedNext": [
    "fractional-knapsack",
    "activity-selection"
  ]
},
{
  "id": "matrix-chain-multiplication",
  "name": "Matrix Chain Multiplication (MCM)",
  "categoryId": "dp",
  "category": "Dynamic Programming",
  "simpleIntro": "Determines the optimal parenthesization order for multiplying a sequence of matrices to minimize the total scalar multiplications.",
  "whyUseful": "Matrix multiplication is associative: (A*B)*C = A*(B*C), but computation cost varies drastically depending on grouping order (e.g. 100x difference).",
  "realWorldApp": "Compiler optimization, database query join order planning, neural network tensor operations, linear algebra packages (BLAS/LAPACK).",
  "prerequisites": [
    "Matrix Dimensions",
    "Dynamic Programming Memoization/Tabulation"
  ],
  "coreIdea": "Define m[i, j] as minimum scalar multiplications to compute Ai..Aj. For any split point k between i and j: m[i, j] = min_{i<=k<j} (m[i,k] + m[k+1, j] + p_{i-1} * p_k * p_j).",
  "stepByStep": [
    "Let dimensions array p define matrices where matrix A_i has dimension p[i-1] x p[i].",
    "Initialize m[i, i] = 0 for all i (single matrix requires 0 multiplications).",
    "Iterate over chain lengths L from 2 to n.",
    "For each chain subproblem (i, j), try every split point k from i to j - 1.",
    "Compute cost q = m[i, k] + m[k+1, j] + p[i-1]*p[k]*p[j].",
    "Store minimum cost in m[i, j] and optimal split index in s[i, j]."
  ],
  "pseudocode": "Algorithm MatrixChainOrder(p)\n    n = length(p) - 1\n    let m[1..n, 1..n] and s[1..n-1, 2..n] be new tables\n    for i = 1 to n do m[i, i] = 0\n    for L = 2 to n do // L is chain length\n        for i = 1 to n - L + 1 do\n            j = i + L - 1\n            m[i, j] = infinity\n            for k = i to j - 1 do\n                q = m[i, k] + m[k+1, j] + p[i-1]*p[k]*p[j]\n                if q < m[i, j] then\n                    m[i, j] = q\n                    s[i, j] = k\n    return m and s",
  "jsImplementation": "function matrixChainOrder(p) {\n  const n = p.length - 1;\n  const m = Array.from({ length: n + 1 }, () => Array(n + 1).fill(0));\n  const s = Array.from({ length: n + 1 }, () => Array(n + 1).fill(0));\n\n  for (let L = 2; L <= n; L++) {\n    for (let i = 1; i <= n - L + 1; i++) {\n      const j = i + L - 1;\n      m[i][j] = Infinity;\n      for (let k = i; k < j; k++) {\n        const q = m[i][k] + m[k + 1][j] + p[i - 1] * p[k] * p[j];\n        if (q < m[i][j]) {\n          m[i][j] = q;\n          s[i][j] = k;\n        }\n      }\n    }\n  }\n  return { minCost: m[1][n], costTable: m, splitTable: s };\n}",
  "exampleInput": "p = [10, 30, 5, 60] (Matrices: A1: 10x30, A2: 30x5, A3: 5x60)",
  "workedExample": [
    "Matrices: A1 (10x30), A2 (30x5), A3 (5x60)",
    "Option 1: (A1 * A2) * A3",
    "  Cost A1*A2 = 10 * 30 * 5 = 1,500 operations (result is 10x5)",
    "  Cost (A1*A2) * A3 = 1,500 + (10 * 5 * 60) = 1,500 + 3,000 = 4,500 operations",
    "Option 2: A1 * (A2 * A3)",
    "  Cost A2*A3 = 30 * 5 * 60 = 9,000 operations (result is 30x60)",
    "  Cost A1 * (A2*A3) = 9,000 + (10 * 30 * 60) = 9,000 + 18,000 = 27,000 operations!",
    "Optimal DP Choice: (A1 * A2) * A3 with 4,500 operations (6x faster than Option 2!)."
  ],
  "visualizerType": "solver",
  "timeComplexity": {
    "best": "O(n^3)",
    "average": "O(n^3)",
    "worst": "O(n^3)",
    "explanation": "Three nested loops: chain length L (n), start index i (n), split point k (n). Total operations = O(n^3)."
  },
  "spaceComplexity": {
    "auxiliary": "O(n^2)",
    "total": "O(n^2)",
    "explanation": "Requires two 2D tables of size n x n for optimal costs m and split records s."
  },
  "advantages": [
    "Finds globally optimal parenthesization out of Catalan number C(n-1) exponential options",
    "Saves millions of CPU cycles before performing massive matrix multiplications"
  ],
  "limitations": [
    "O(n³) precomputation cost is only worthwhile if matrix multiplications are large"
  ],
  "comparisonWithRelated": [
    "Brute Force: Tests Catalan number C(n-1) = (2n-2)! / ((n-1)! * n!) ≈ 4^n / n^(1.5) orderings.",
    "Dynamic Programming: Tests all subchains systematically in O(n³) polynomial time."
  ],
  "commonMistakes": [
    "Filling the DP table row-by-row instead of by chain length L (subproblems m[i,k] and m[k+1,j] must be solved before m[i,j])",
    "Off-by-one errors mapping matrix index i to dimension array p[i-1]"
  ],
  "interviewQuestions": [
    {
      "q": "Why cannot the DP table be filled using standard row-by-row iteration?",
      "a": "Computing m[i, j] requires knowing m[i, k] and m[k+1, j]. Filling along increasing chain length L guarantees smaller subchains are resolved first."
    },
    {
      "q": "How many ways are there to parenthesize a chain of n matrices?",
      "a": "The Catalan number C(n-1) = (1/n) * (2n-2 choose n-1), which grows asymptotically as Omega(4^n / n^1.5)."
    }
  ],
  "recommendedNext": [
    "knapsack-01",
    "longest-common-subsequence"
  ]
},
{
  "id": "coin-change",
  "name": "Coin Change Problem (Min Coins & Ways)",
  "categoryId": "dp",
  "category": "Dynamic Programming",
  "simpleIntro": "Determines the minimum number of coins needed to make a target amount, or computes the total number of distinct combinations to form that amount.",
  "whyUseful": "Demonstrates why greedy algorithms fail for arbitrary non-canonical currency denominations and showcases 1D array space optimization in DP.",
  "realWorldApp": "Vending machines, automated payment change calculation, ATM cash dispenser notes allocation, cryptocurrency transaction fees.",
  "prerequisites": [
    "Arrays",
    "Dynamic Programming Fundamentals"
  ],
  "coreIdea": "For minimum coins: dp[a] = min_{c in coins} (dp[a - c] + 1). For total combinations: dp[a] += dp[a - c].",
  "stepByStep": [
    "Initialize dp array of size (amount + 1) filled with Infinity; dp[0] = 0.",
    "For each coin c in coins:",
    "  For each amount a from c to target amount:",
    "    dp[a] = min(dp[a], dp[a - c] + 1).",
    "If dp[amount] is still Infinity, return -1 (impossible), else return dp[amount]."
  ],
  "pseudocode": "Algorithm CoinChangeMin(coins, amount)\n    dp = array of size amount + 1 filled with infinity\n    dp[0] = 0\n    for coin in coins do\n        for a = coin to amount do\n            dp[a] = min(dp[a], dp[a - coin] + 1)\n    return dp[amount] == infinity ? -1 : dp[amount]",
  "jsImplementation": "function coinChangeMin(coins, amount) {\n  const dp = new Array(amount + 1).fill(Infinity);\n  dp[0] = 0;\n\n  for (const coin of coins) {\n    for (let a = coin; a <= amount; a++) {\n      dp[a] = Math.min(dp[a], dp[a - coin] + 1);\n    }\n  }\n  return dp[amount] === Infinity ? -1 : dp[amount];\n}",
  "exampleInput": "coins = [1, 3, 4], amount = 6",
  "workedExample": [
    "Coins = [1, 3, 4], Target = 6",
    "Greedy approach would pick: 4 + 1 + 1 = 3 coins.",
    "DP approach explores: dp[6] = min(dp[5]+1, dp[3]+1, dp[2]+1)",
    "Notice dp[3] = 1 (one 3-coin). dp[6] = dp[3] + 1 = 2 coins (two 3-coins: 3 + 3 = 6).",
    "DP correctly finds optimal answer 2 coins (3 + 3), beating greedy (4 + 1 + 1)!"
  ],
  "visualizerType": null,
  "timeComplexity": {
    "best": "O(n * amount)",
    "average": "O(n * amount)",
    "worst": "O(n * amount)",
    "explanation": "Two nested loops: n coins multiplied by target amount iterations."
  },
  "spaceComplexity": {
    "auxiliary": "O(amount)",
    "total": "O(amount)",
    "explanation": "Only requires a 1D DP table of size amount + 1."
  },
  "advantages": [
    "Always optimal for any arbitrary coin denomination set",
    "Can be compressed into 1D space O(amount)"
  ],
  "limitations": [
    "Pseudopolynomial: if amount is very large (e.g. 10^9), time and space become prohibitive"
  ],
  "comparisonWithRelated": [
    "Greedy Coin Change: Works in O(n) for canonical systems (e.g. US coins [1, 5, 10, 25]), fails on arbitrary coins.",
    "DP Coin Change: Works for all denomination systems in O(n * amount)."
  ],
  "commonMistakes": [
    "Assuming greedy always works for any coin denominations",
    "Swapping loop orders when computing combinations vs permutations"
  ],
  "interviewQuestions": [
    {
      "q": "Why does greedy coin change fail for coins [1, 3, 4] with target 6?",
      "a": "Greedy chooses 4 first, leaving 2, which requires two 1s: total 3 coins. But 3 + 3 = 6 requires only 2 coins."
    }
  ],
  "recommendedNext": [
    "knapsack-01",
    "matrix-chain-multiplication"
  ]
},
{
  "id": "bellman-ford",
  "name": "Bellman-Ford Shortest Path",
  "categoryId": "graph",
  "category": "Graph Algorithms",
  "simpleIntro": "Computes shortest paths from a single source vertex to all other vertices in a directed weighted graph, even with negative edge weights, and detects negative weight cycles.",
  "whyUseful": "Dijkstra fails completely when edges have negative weights. Bellman-Ford solves this and reliably detects infinite arbitrage loops in financial markets.",
  "realWorldApp": "Distance-Vector routing protocol (RIP in Internet routing), forex triangular currency arbitrage detection, network bandwidth delay estimation.",
  "prerequisites": [
    "Graph Representations",
    "Shortest Path Basics",
    "Edge Relaxation"
  ],
  "coreIdea": "In a graph with |V| vertices without negative cycles, any simple shortest path has at most |V| - 1 edges. Relaxing all |E| edges |V| - 1 times guarantees convergence.",
  "stepByStep": [
    "Initialize dist[source] = 0 and dist[v] = Infinity for all other vertices.",
    "Repeat |V| - 1 times: iterate through every directed edge (u, v, weight). If dist[u] + weight < dist[v], set dist[v] = dist[u] + weight.",
    "Negative Cycle Detection: Iterate through all edges one more time. If any edge can still be relaxed (dist[u] + weight < dist[v]), a negative cycle exists!"
  ],
  "pseudocode": "Algorithm BellmanFord(V, E, source)\n    for each v in V do dist[v] = infinity\n    dist[source] = 0\n    for i = 1 to |V| - 1 do\n        for each (u, v, w) in E do\n            if dist[u] != infinity and dist[u] + w < dist[v] then\n                dist[v] = dist[u] + w\n    // 2. Check for negative-weight cycles\n    for each (u, v, w) in E do\n        if dist[u] != infinity and dist[u] + w < dist[v] then\n            return \"Graph contains negative-weight cycle\"\n    return dist",
  "jsImplementation": "function bellmanFord(vertices, edges, source) {\n  const dist = {};\n  for (const v of vertices) dist[v] = Infinity;\n  dist[source] = 0;\n\n  for (let i = 1; i < vertices.length; i++) {\n    for (const { u, v, w } of edges) {\n      if (dist[u] !== Infinity && dist[u] + w < dist[v]) {\n        dist[v] = dist[u] + w;\n      }\n    }\n  }\n\n  // Check for negative-weight cycles\n  for (const { u, v, w } of edges) {\n    if (dist[u] !== Infinity && dist[u] + w < dist[v]) {\n      return { hasNegativeCycle: true, distances: null };\n    }\n  }\n  return { hasNegativeCycle: false, distances: dist };\n}",
  "exampleInput": "V = [A, B, C, D], Edges: A->B: 4, A->C: 5, B->C: -3, C->D: 2, source: A",
  "workedExample": [
    "Init: dist[A]=0, dist[B]=Inf, dist[C]=Inf, dist[D]=Inf",
    "Pass 1:",
    "  Edge A->B (4): dist[B] = 0 + 4 = 4",
    "  Edge A->C (5): dist[C] = 0 + 5 = 5",
    "  Edge B->C (-3): dist[C] = min(5, 4 + (-3)) = 1 (shorter path via B!)",
    "  Edge C->D (2): dist[D] = 1 + 2 = 3",
    "Pass 2: No distances decrease; graph converged.",
    "Check: No edge can be relaxed further => No negative cycle.",
    "Resulting shortest distances from A: B=4, C=1, D=3."
  ],
  "visualizerType": null,
  "timeComplexity": {
    "best": "O(E) (with early termination check)",
    "average": "O(V * E)",
    "worst": "O(V * E)",
    "explanation": "|V| - 1 iterations over all |E| edges. On dense graphs with E = O(V^2), complexity is O(V^3)."
  },
  "spaceComplexity": {
    "auxiliary": "O(V)",
    "total": "O(V + E)",
    "explanation": "Only requires an array of size |V| to store shortest distances."
  },
  "advantages": [
    "Supports negative edge weights gracefully",
    "Reliably detects reachable negative cycles"
  ],
  "limitations": [
    "Slower than Dijkstra: O(V * E) vs O((V + E) log V)"
  ],
  "comparisonWithRelated": [
    "Dijkstra: O((V + E) log V), non-negative edge weights only.",
    "Bellman-Ford: O(V * E), handles negative weights and detects cycles.",
    "Floyd-Warshall: O(V³), all-pairs shortest paths."
  ],
  "commonMistakes": [
    "Thinking Bellman-Ford can calculate shortest paths inside a graph containing reachable negative cycles (it only detects them)",
    "Forgetting the dist[u] != Infinity guard before relaxing edges"
  ],
  "interviewQuestions": [
    {
      "q": "Why does Bellman-Ford run |V| - 1 relaxation iterations?",
      "a": "A simple path in a graph of |V| vertices can contain at most |V| - 1 edges. Each pass guarantees at least one more edge of any shortest path is correctly resolved."
    },
    {
      "q": "How does Bellman-Ford detect negative cycles?",
      "a": "If any distance can still decrease on the |V|-th pass, there must exist an infinite cycle whose total sum is negative."
    }
  ],
  "recommendedNext": [
    "dijkstra-algorithm",
    "breadth-first-search"
  ]
},
{
  "id": "topological-sort",
  "name": "Topological Sorting (Kahn's & DFS)",
  "categoryId": "graph",
  "category": "Graph Algorithms",
  "simpleIntro": "Produces a linear ordering of vertices in a Directed Acyclic Graph (DAG) such that for every directed edge u -> v, vertex u appears before vertex v.",
  "whyUseful": "Fundamental to resolving dependencies where tasks cannot begin until prerequisite tasks are finished.",
  "realWorldApp": "Build dependency systems (npm, make, webpack), course prerequisite enrollment, task scheduling workflows (Airflow), spreadsheet formula evaluation.",
  "prerequisites": [
    "Graph Traversal",
    "Directed Acyclic Graphs (DAG)",
    "In-degree Concept"
  ],
  "coreIdea": "Kahn’s Algorithm iteratively removes vertices with in-degree 0 (no prerequisites) and decrements their neighbors’ in-degrees. If all vertices are removed, ordering is valid.",
  "stepByStep": [
    "Compute in-degree for every vertex in the directed graph.",
    "Enqueue all vertices with in-degree 0 into a FIFO queue.",
    "While queue is not empty: dequeue vertex u, append u to result ordering, and for each outgoing neighbor v, decrement inDegree[v].",
    "If inDegree[v] becomes 0, enqueue v.",
    "If count of ordered vertices equals |V|, return order. Otherwise, graph contains a cycle!"
  ],
  "pseudocode": "Algorithm KahnsTopologicalSort(V, Adj)\n    Calculate inDegree for all vertices\n    queue = [v for v in V if inDegree[v] == 0]\n    topoOrder = []\n    while queue is not empty do\n        u = queue.dequeue()\n        topoOrder.append(u)\n        for each v in Adj[u] do\n            inDegree[v] -= 1\n            if inDegree[v] == 0 then queue.enqueue(v)\n    if length(topoOrder) == |V| then return topoOrder\n    else return \"Cycle detected! Topological sort impossible.\"",
  "jsImplementation": "function kahnsTopologicalSort(vertices, adj) {\n  const inDegree = {};\n  for (const v of vertices) inDegree[v] = 0;\n  for (const u of vertices) {\n    for (const v of (adj[u] || [])) {\n      inDegree[v] = (inDegree[v] || 0) + 1;\n    }\n  }\n\n  const queue = vertices.filter(v => inDegree[v] === 0);\n  const result = [];\n\n  while (queue.length > 0) {\n    const u = queue.shift();\n    result.push(u);\n    for (const v of (adj[u] || [])) {\n      inDegree[v]--;\n      if (inDegree[v] === 0) queue.push(v);\n    }\n  }\n\n  return result.length === vertices.length ? result : null;\n}",
  "exampleInput": "Tasks: [A, B, C, D, E], Dependencies: A->B, A->C, B->D, C->D, D->E",
  "workedExample": [
    "Vertices: [A, B, C, D, E]",
    "In-degrees: A:0, B:1, C:1, D:2, E:1",
    "Queue initially has: [A]",
    "Pop A: add to order [A]. Decrement B (now 0) and C (now 0). Queue: [B, C]",
    "Pop B: add to order [A, B]. Decrement D (2 -> 1). Queue: [C]",
    "Pop C: add to order [A, B, C]. Decrement D (1 -> 0). Enqueue D. Queue: [D]",
    "Pop D: add to order [A, B, C, D]. Decrement E (1 -> 0). Enqueue E. Queue: [E]",
    "Pop E: add to order [A, B, C, D, E].",
    "Valid execution order: A -> B -> C -> D -> E (all dependencies satisfied!)."
  ],
  "visualizerType": null,
  "timeComplexity": {
    "best": "O(V + E)",
    "average": "O(V + E)",
    "worst": "O(V + E)",
    "explanation": "Every vertex is pushed and popped from queue once O(V), and every directed edge is examined once O(E)."
  },
  "spaceComplexity": {
    "auxiliary": "O(V)",
    "total": "O(V + E)",
    "explanation": "Stores in-degree array, queue, and result list."
  },
  "advantages": [
    "Linear time complexity O(V + E)",
    "Simultaneously produces topological ordering and detects cycles"
  ],
  "limitations": [
    "Cannot be applied to undirected graphs or graphs containing directed cycles"
  ],
  "comparisonWithRelated": [
    "Kahn’s Algorithm: BFS-based with in-degrees, intuitive and cycle-detecting.",
    "DFS Topological Sort: Pushes vertices to a stack upon post-order backtrack finish."
  ],
  "commonMistakes": [
    "Trying to topologically sort an undirected graph",
    "Not checking if the output array length equals |V| (silent failure on graphs with cycles)"
  ],
  "interviewQuestions": [
    {
      "q": "Can a graph have more than one valid topological sort?",
      "a": "Yes. If at any step the queue contains more than one vertex with in-degree 0, any of them can be processed next, yielding multiple valid orderings."
    },
    {
      "q": "What does it mean if Kahn’s algorithm terminates with fewer than |V| vertices in the output?",
      "a": "The graph has at least one directed cycle, making a linear prerequisite ordering impossible."
    }
  ],
  "recommendedNext": [
    "breadth-first-search",
    "depth-first-search"
  ]
},
{
  "id": "rat-in-maze",
  "name": "Rat in a Maze",
  "categoryId": "backtracking",
  "category": "Backtracking",
  "simpleIntro": "Finds a feasible path for a rat from top-left (0, 0) to bottom-right (N-1, N-1) through an N x N grid with blocked obstacles using recursive backtracking.",
  "whyUseful": "Classic introduction to state-space tree exploration, boundary conditions, marking visited states, and backtracking upon reaching dead ends.",
  "realWorldApp": "Robot pathfinding through warehouse obstacles, maze game auto-solvers, circuit board PCB trace routing.",
  "prerequisites": [
    "Recursion",
    "2D Arrays / Matrices",
    "Backtracking Strategy"
  ],
  "coreIdea": "Try moving in a direction (e.g. Down, Right). If the move is valid, mark cell as part of solution and recursively explore. If no path forward leads to destination, unmark cell (backtrack) and try another direction.",
  "stepByStep": [
    "Check if current cell (r, c) is destination (N-1, N-1). If yes, mark cell and return true.",
    "Check validity: 0 <= r < N, 0 <= c < N, cell is open (1), and cell is not currently visited.",
    "Mark cell (r, c) in solution path.",
    "Recursively explore neighbors (e.g. Down (r+1, c), Right (r, c+1)).",
    "If any recursive call succeeds, return true.",
    "Backtrack: Unmark cell (r, c) in solution path and return false."
  ],
  "pseudocode": "Algorithm SolveMaze(maze, r, c, sol, N)\n    if r == N - 1 and c == N - 1 then\n        sol[r][c] = 1\n        return true\n    if isSafe(maze, r, c, N) then\n        sol[r][c] = 1\n        if SolveMaze(maze, r + 1, c, sol, N) then return true // Down\n        if SolveMaze(maze, r, c + 1, sol, N) then return true // Right\n        sol[r][c] = 0 // Backtrack\n        return false\n    return false",
  "jsImplementation": "function solveMaze(maze) {\n  const N = maze.length;\n  const sol = Array.from({ length: N }, () => Array(N).fill(0));\n\n  function isSafe(r, c) {\n    return r >= 0 && r < N && c >= 0 && c < N && maze[r][c] === 1;\n  }\n\n  function backtrack(r, c) {\n    if (r === N - 1 && c === N - 1 && maze[r][c] === 1) {\n      sol[r][c] = 1;\n      return true;\n    }\n    if (isSafe(r, c)) {\n      sol[r][c] = 1;\n      if (backtrack(r + 1, c)) return true; // Down\n      if (backtrack(r, c + 1)) return true; // Right\n      sol[r][c] = 0; // Backtrack\n    }\n    return false;\n  }\n\n  return backtrack(0, 0) ? sol : null;\n}",
  "exampleInput": "maze = [[1, 0, 0, 0], [1, 1, 0, 1], [0, 1, 0, 0], [1, 1, 1, 1]]",
  "workedExample": [
    "Start at (0, 0). Value is 1 (open). Move Down to (1, 0).",
    "At (1, 0): Value is 1. Move Down to (2, 0) is blocked (0).",
    "Try Right to (1, 1): Value is 1. Move Down to (2, 1) is open (1).",
    "At (2, 1): Move Down to (3, 1) is open (1).",
    "At (3, 1): Move Right to (3, 2) is open (1).",
    "At (3, 2): Move Right to (3, 3) (Destination reached!).",
    "Solution Path: (0,0) -> (1,0) -> (1,1) -> (2,1) -> (3,1) -> (3,2) -> (3,3)."
  ],
  "visualizerType": null,
  "timeComplexity": {
    "best": "O(N)",
    "average": "O(2^(N^2))",
    "worst": "O(2^(N^2))",
    "explanation": "In worst-case open grid with obstacles forcing full tree search, branching factor is up to 2 (or 4 with 4 directions), bounded by 2^(N^2)."
  },
  "spaceComplexity": {
    "auxiliary": "O(N^2)",
    "total": "O(N^2)",
    "explanation": "Recursion stack depth up to N^2 plus N x N solution matrix."
  },
  "advantages": [
    "Guaranteed to find a path if one exists without visiting cyclic loops",
    "Requires no expensive priority queue or graph precomputation"
  ],
  "limitations": [
    "Exponential worst-case runtime; does not guarantee shortest path (BFS is better for shortest path)"
  ],
  "comparisonWithRelated": [
    "Backtracking (DFS): Finds a path quickly using minimal memory.",
    "BFS: Finds the shortest path in unweighted mazes in O(V + E) time."
  ],
  "commonMistakes": [
    "Forgetting to backtrack (reset sol[r][c] = 0) when a path hits a dead end",
    "Not guarding against infinite loops when 4 directions (Up/Down/Left/Right) are allowed"
  ],
  "interviewQuestions": [
    {
      "q": "How would you find the SHORTEST path in a maze instead of any path?",
      "a": "Use Breadth-First Search (BFS) instead of DFS backtracking. BFS explores in radial waves and guarantees the first path reaching the exit uses minimum steps."
    }
  ],
  "recommendedNext": [
    "n-queens",
    "breadth-first-search"
  ]
},
{
  "id": "subset-sum",
  "name": "Subset Sum Problem (Backtracking)",
  "categoryId": "backtracking",
  "category": "Backtracking",
  "simpleIntro": "Determines whether a subset of non-negative integers exists whose elements sum up exactly to a target sum using state-space tree pruning.",
  "whyUseful": "Shows how ordering array elements allows aggressive pruning (terminating recursion early when current sum exceeds target).",
  "realWorldApp": "Financial portfolio balance matching, cryptography knapsack public key systems, resource budgeting allocations.",
  "prerequisites": [
    "Recursion",
    "State Space Trees",
    "Pruning Principles"
  ],
  "coreIdea": "Sort numbers in ascending order. At each step, decide whether to include or exclude the current element. If current sum exceeds target, prune the entire branch immediately.",
  "stepByStep": [
    "Sort array in non-decreasing order.",
    "At index i: if currentSum == target, solution found.",
    "If currentSum + arr[i] > target, stop exploring (all remaining elements will also exceed target since array is sorted).",
    "Include arr[i]: recurse with index i + 1, currentSum + arr[i].",
    "Exclude arr[i]: recurse with index i + 1, currentSum."
  ],
  "pseudocode": "Algorithm SubsetSum(arr, idx, currentSum, target, subset)\n    if currentSum == target then\n        print(subset); return true\n    for i = idx to length(arr) - 1 do\n        if currentSum + arr[i] > target then\n            break // Prune remaining elements\n        subset.append(arr[i])\n        if SubsetSum(arr, i + 1, currentSum + arr[i], target, subset) then return true\n        subset.pop() // Backtrack\n    return false",
  "jsImplementation": "function findSubsetSum(arr, target) {\n  const sorted = [...arr].sort((a, b) => a - b);\n  const result = [];\n\n  function backtrack(idx, currentSum, subset) {\n    if (currentSum === target) {\n      result.push([...subset]);\n      return true;\n    }\n    for (let i = idx; i < sorted.length; i++) {\n      if (currentSum + sorted[i] > target) break; // Pruning\n      subset.push(sorted[i]);\n      if (backtrack(i + 1, currentSum + sorted[i], subset)) return true;\n      subset.pop(); // Backtrack\n    }\n    return false;\n  }\n\n  backtrack(0, 0, []);\n  return result[0] || null;\n}",
  "exampleInput": "arr = [10, 7, 5, 18, 12, 20, 15], target = 35",
  "workedExample": [
    "Sorted array: [5, 7, 10, 12, 15, 18, 20], Target: 35",
    "Branch 1: Pick 5. Remaining: 30.",
    "  Pick 7. Current sum: 12. Remaining: 23.",
    "  Pick 10. Current sum: 22. Remaining: 13.",
    "  Check 15: 22 + 15 = 37 > 35 (PRUNE!).",
    "  Backtrack 10. Pick 12. Current sum: 24. Remaining: 11.",
    "  Backtrack 7... explore other combinations.",
    "Valid subset found: [15, 20] -> 15 + 20 = 35! Also [5, 12, 18] -> 5 + 12 + 18 = 35!"
  ],
  "visualizerType": null,
  "timeComplexity": {
    "best": "O(1)",
    "average": "O(2^n)",
    "worst": "O(2^n)",
    "explanation": "Binary decision tree of depth n has up to 2^n states, but sorting and pruning reduce the effective search space substantially."
  },
  "spaceComplexity": {
    "auxiliary": "O(n)",
    "total": "O(n)",
    "explanation": "Recursion stack depth at most n."
  },
  "advantages": [
    "Pruning prevents visiting millions of impossible subtrees",
    "Can return all matching subsets or just the first valid one"
  ],
  "limitations": [
    "NP-complete problem; worst case remains exponential O(2^n)"
  ],
  "comparisonWithRelated": [
    "Backtracking: O(2^n) worst case, O(n) space, great for small n or finding all solutions.",
    "Dynamic Programming: O(n * target) pseudopolynomial, requires O(target) memory."
  ],
  "commonMistakes": [
    "Not sorting before pruning (pruning only works if remaining elements are guaranteed >= current element)"
  ],
  "interviewQuestions": [
    {
      "q": "Is Subset Sum problem in P or NP-complete?",
      "a": "Subset Sum is NP-complete. There is no known polynomial-time algorithm, although dynamic programming solves it in pseudopolynomial time O(n * target)."
    }
  ],
  "recommendedNext": [
    "knapsack-01",
    "n-queens"
  ]
},
{
  "id": "naive-string-matching",
  "name": "Naive String Matching Algorithm",
  "categoryId": "string-matching",
  "category": "String Matching",
  "simpleIntro": "Slides the pattern string character-by-character over the text string, comparing characters at each candidate shift.",
  "whyUseful": "The baseline algorithm for pattern matching. Explains why redundant comparisons occur and sets the benchmark that KMP and Boyer-Moore improve upon.",
  "realWorldApp": "Simple text editors with short search terms, DNA short oligonucleotide searches, rudimentary command line grep for tiny files.",
  "prerequisites": [
    "Strings",
    "Loops & Character Comparison"
  ],
  "coreIdea": "Align pattern at start of text. Compare character by character. If match fails at index j, slide pattern right by 1 position (shift s = s + 1) and restart comparison from index 0.",
  "stepByStep": [
    "Let text length be n and pattern length be m.",
    "Loop shift s from 0 to n - m:",
    "  Compare pattern[j] with text[s + j] for j = 0 to m - 1.",
    "  If all m characters match, record match at position s.",
    "  If mismatch occurs, break and increment shift s by 1."
  ],
  "pseudocode": "Algorithm NaiveStringMatcher(T, P)\n    n = length(T); m = length(P)\n    for s = 0 to n - m do\n        j = 0\n        while j < m and P[j] == T[s + j] do\n            j = j + 1\n        if j == m then\n            print \"Pattern occurs with shift \" + s",
  "jsImplementation": "function naiveSearch(text, pattern) {\n  const n = text.length;\n  const m = pattern.length;\n  const matches = [];\n\n  for (let s = 0; s <= n - m; s++) {\n    let j = 0;\n    while (j < m && pattern[j] === text[s + j]) {\n      j++;\n    }\n    if (j === m) {\n      matches.push(s);\n    }\n  }\n  return matches;\n}",
  "exampleInput": "Text = \"AABAACAADAABAABA\", Pattern = \"AABA\"",
  "workedExample": [
    "Text: \"AABAACAADAABAABA\" (n=16), Pattern: \"AABA\" (m=4)",
    "Shift s=0: T[0..3] \"AABA\" matches P[0..3] \"AABA\". Match at index 0!",
    "Shift s=1: T[1] is \"A\", P[0] is \"A\"; T[2] is \"B\", P[1] is \"A\" -> Mismatch at j=1.",
    "Shift s=2: T[2] is \"B\", P[0] is \"A\" -> Mismatch at j=0.",
    "Shift s=3: T[3..6] is \"AACA\", P is \"AABA\" -> Mismatch at j=3 (C != B).",
    "... continues sliding ...",
    "Matches found at indices: 0, 9, 12."
  ],
  "visualizerType": null,
  "timeComplexity": {
    "best": "O(n) (when first character mismatches immediately)",
    "average": "O(n)",
    "worst": "O((n - m + 1) * m)",
    "explanation": "Worst case occurs when text is \"AAAAAAA\" and pattern is \"AAAB\": matches m - 1 characters before failing at every shift."
  },
  "spaceComplexity": {
    "auxiliary": "O(1)",
    "total": "O(1)",
    "explanation": "No precomputation or auxiliary lookup tables needed."
  },
  "advantages": [
    "Zero precomputation time or extra memory required",
    "Extremely simple to implement and optimal for very short texts"
  ],
  "limitations": [
    "Performs redundant comparisons when pattern has internal repeating prefixes",
    "Worst case O(n * m) is too slow for large texts or genome sequencing"
  ],
  "comparisonWithRelated": [
    "Naive: O(n * m) worst case, O(1) space, no preprocessing.",
    "KMP: O(n + m) worst case, O(m) space, uses LPS prefix array.",
    "Rabin-Karp: O(n + m) average, uses rolling hashes."
  ],
  "commonMistakes": [
    "Looping shift s up to n instead of n - m (causes out-of-bounds error on text[s + j])"
  ],
  "interviewQuestions": [
    {
      "q": "Give an example input where Naive String Matching achieves its worst-case O(n * m) runtime.",
      "a": "Text T = \"AAAAAAAAAAAAAAAA\" (all As) and Pattern P = \"AAAAB\". Every shift checks m - 1 matching As before failing on B."
    }
  ],
  "recommendedNext": [
    "kmp-algorithm",
    "rabin-karp"
  ]
},
{
  "id": "kmp-algorithm",
  "name": "Knuth-Morris-Pratt (KMP) Algorithm",
  "categoryId": "string-matching",
  "category": "String Matching",
  "simpleIntro": "Achieves linear-time string searching by precomputing a Longest Prefix Suffix (LPS) array, ensuring the text pointer never backtracks after a mismatch.",
  "whyUseful": "Linear O(n + m) guarantee regardless of input patterns. A masterpiece of algorithmic efficiency taught in all advanced computer science curricula.",
  "realWorldApp": "Fast search in Unix grep, bioinformatics gene matching (BLAST algorithms), intrusion detection packet payload inspection.",
  "prerequisites": [
    "Strings",
    "Prefixes and Suffixes",
    "Finite Automata Basics"
  ],
  "coreIdea": "When a mismatch occurs at pattern[j], the previous j characters pattern[0..j-1] are already known to match the text. The LPS array tells us the longest proper prefix that is also a suffix, allowing us to slide the pattern to LPS[j-1] without rewinding the text pointer.",
  "stepByStep": [
    "Precompute LPS array of size m for the pattern:",
    "  LPS[i] stores the length of the longest proper prefix of pattern[0..i] that is also a suffix of pattern[0..i].",
    "Initialize text index i = 0 and pattern index j = 0.",
    "While i < n:",
    "  If pattern[j] == text[i], advance both i++ and j++.",
    "  If j == m, match found at i - j! Resume search by resetting j = LPS[j - 1].",
    "  If mismatch occurs: if j > 0, set j = LPS[j - 1] (skip redundant checks); else if j == 0, advance i++."
  ],
  "pseudocode": "Algorithm KMP(T, P)\n    n = length(T); m = length(P)\n    lps = ComputeLPS(P, m)\n    i = 0; j = 0\n    while i < n do\n        if P[j] == T[i] then\n            i++; j++\n        if j == m then\n            print \"Match at index \" + (i - j)\n            j = lps[j - 1]\n        else if i < n and P[j] != T[i] then\n            if j != 0 then j = lps[j - 1]\n            else i++",
  "jsImplementation": "function computeLPS(pattern) {\n  const m = pattern.length;\n  const lps = new Array(m).fill(0);\n  let len = 0;\n  let i = 1;\n\n  while (i < m) {\n    if (pattern[i] === pattern[len]) {\n      len++;\n      lps[i] = len;\n      i++;\n    } else {\n      if (len !== 0) {\n        len = lps[len - 1];\n      } else {\n        lps[i] = 0;\n        i++;\n      }\n    }\n  }\n  return lps;\n}\n\nfunction kmpSearch(text, pattern) {\n  const n = text.length;\n  const m = pattern.length;\n  const lps = computeLPS(pattern);\n  const matches = [];\n  let i = 0, j = 0;\n\n  while (i < n) {\n    if (pattern[j] === text[i]) {\n      i++;\n      j++;\n    }\n    if (j === m) {\n      matches.push(i - j);\n      j = lps[j - 1];\n    } else if (i < n && pattern[j] !== text[i]) {\n      if (j !== 0) j = lps[j - 1];\n      else i++;\n    }\n  }\n  return matches;\n}",
  "exampleInput": "Text = \"ABABDABACDABABCABAB\", Pattern = \"ABABCABAB\"",
  "workedExample": [
    "Pattern: \"ABABCABAB\"",
    "Compute LPS Array:",
    "  i=0 \"A\" -> 0",
    "  i=1 \"AB\" -> 0",
    "  i=2 \"ABA\" -> prefix \"A\" matches suffix \"A\" -> LPS[2] = 1",
    "  i=3 \"ABAB\" -> prefix \"AB\" matches suffix \"AB\" -> LPS[3] = 2",
    "  i=4 \"ABABC\" -> no match -> 0",
    "  LPS = [0, 0, 1, 2, 0, 1, 2, 3, 4]",
    "Search in Text:",
    "  At mismatch text \"D\" vs pattern \"C\" (index j=4), j drops to LPS[3] = 2.",
    "  Pattern shifts instantly without text pointer i ever moving backward!",
    "  Match found at index 10 in linear time."
  ],
  "visualizerType": null,
  "timeComplexity": {
    "best": "O(n)",
    "average": "O(n + m)",
    "worst": "O(n + m)",
    "explanation": "Precomputing LPS takes O(m). Main search loop advances text pointer i strictly forward, making at most 2n comparisons. Overall O(n + m)."
  },
  "spaceComplexity": {
    "auxiliary": "O(m)",
    "total": "O(m)",
    "explanation": "Requires an LPS array of size equal to pattern length m."
  },
  "advantages": [
    "Guaranteed linear time O(n + m) under all circumstances",
    "Text pointer never backtracks, making it ideal for streaming data where buffering is impossible"
  ],
  "limitations": [
    "Precomputing LPS table incurs small overhead for very short one-off searches"
  ],
  "comparisonWithRelated": [
    "Naive: O(n * m) worst case, backtracks text pointer.",
    "KMP: O(n + m) worst case, text pointer strictly advances forward.",
    "Boyer-Moore: O(n / m) best case by searching pattern from right to left."
  ],
  "commonMistakes": [
    "Moving text pointer i backward on mismatch (the entire purpose of KMP is i NEVER decrements)",
    "Constructing LPS using full string instead of proper prefixes and suffixes"
  ],
  "interviewQuestions": [
    {
      "q": "Why is KMP especially suitable for streaming network packet analysis?",
      "a": "Because the text pointer i strictly increases and never moves backward. You do not need to buffer previously seen characters in memory."
    },
    {
      "q": "What does the LPS table value LPS[j] represent?",
      "a": "The length of the longest proper prefix of pattern[0..j] that is also a suffix of pattern[0..j]."
    }
  ],
  "recommendedNext": [
    "rabin-karp",
    "naive-string-matching"
  ]
},
{
  "id": "rabin-karp",
  "name": "Rabin-Karp String Search Algorithm",
  "categoryId": "string-matching",
  "category": "String Matching",
  "simpleIntro": "Uses a rolling hash function to quickly eliminate non-matching shifts in O(1) per step, checking actual characters only when hash values match.",
  "whyUseful": "Introduces the powerful concept of rolling hashes and shines in multi-pattern search and plagiarism detection.",
  "realWorldApp": "Plagiarism detection engines (Turnitin, MOSS), virus signature scanning, searching multiple patterns simultaneously.",
  "prerequisites": [
    "Hashing & Modulo Arithmetic",
    "Rolling Hash Intuition",
    "String Matching Basics"
  ],
  "coreIdea": "Compute hash of pattern and hash of first text window of length m. To slide window from text[s] to text[s+1], subtract the outgoing character and add the incoming character in O(1) time: H_{new} = (d * (H_{old} - text[s] * h) + text[s+m]) mod q.",
  "stepByStep": [
    "Choose a base d (e.g. 256 for ASCII) and a prime modulus q to minimize collisions.",
    "Precompute h = d^(m-1) mod q.",
    "Compute hash of pattern p and hash of initial text window t.",
    "Loop s from 0 to n - m:",
    "  If p == t: compare characters one by one. If all match, report match at s.",
    "  If s < n - m: compute rolling hash for next window: t = (d * (t - text[s] * h) + text[s + m]) mod q. If t < 0, add q."
  ],
  "pseudocode": "Algorithm RabinKarp(T, P, d, q)\n    n = length(T); m = length(P)\n    h = (d^(m-1)) mod q\n    p = 0; t = 0\n    for i = 0 to m - 1 do\n        p = (d * p + P[i]) mod q\n        t = (d * t + T[i]) mod q\n    for s = 0 to n - m do\n        if p == t then\n            if T[s..s+m-1] == P then print \"Match at \" + s\n        if s < n - m then\n            t = (d * (t - T[s]*h) + T[s+m]) mod q\n            if t < 0 then t = t + q",
  "jsImplementation": "function rabinKarpSearch(text, pattern, d = 256, q = 101) {\n  const n = text.length;\n  const m = pattern.length;\n  let p = 0, t = 0, h = 1;\n  const matches = [];\n\n  for (let i = 0; i < m - 1; i++) {\n    h = (h * d) % q;\n  }\n\n  for (let i = 0; i < m; i++) {\n    p = (d * p + pattern.charCodeAt(i)) % q;\n    t = (d * t + text.charCodeAt(i)) % q;\n  }\n\n  for (let s = 0; s <= n - m; s++) {\n    if (p === t) {\n      if (text.substring(s, s + m) === pattern) {\n        matches.push(s);\n      }\n    }\n    if (s < n - m) {\n      t = (d * (t - text.charCodeAt(s) * h) + text.charCodeAt(s + m)) % q;\n      if (t < 0) t = t + q;\n    }\n  }\n  return matches;\n}",
  "exampleInput": "Text = \"GEEKS FOR GEEKS\", Pattern = \"GEEK\"",
  "workedExample": [
    "Pattern: \"GEEK\" (m=4), Text: \"GEEKS FOR GEEKS\" (n=15)",
    "Hash of pattern \"GEEK\" mod 101 = 89.",
    "Window 0 (\"GEEK\"): Hash = 89. Hashes match! Verify characters -> Match at 0!",
    "Window 1 (\"EEKS\"): Rolling hash = 34 != 89 -> Skip verification.",
    "Window 2 (\"EKS \"): Rolling hash = 12 != 89 -> Skip verification.",
    "... fast O(1) rolling updates ...",
    "Window 10 (\"GEEK\"): Hash = 89. Hashes match! Verify characters -> Match at 10!"
  ],
  "visualizerType": null,
  "timeComplexity": {
    "best": "O(n + m)",
    "average": "O(n + m)",
    "worst": "O(n * m) (if hash function creates collisions at every shift)",
    "explanation": "Average case requires O(1) work per shift plus O(m) preprocessing. Pathological worst case with all collisions degenerates to Naive matcher O(n * m)."
  },
  "spaceComplexity": {
    "auxiliary": "O(1)",
    "total": "O(1)",
    "explanation": "Only requires integer variables for hashes and multipliers."
  },
  "advantages": [
    "Easily extended to search for multiple patterns simultaneously in O(n + k * m) by storing pattern hashes in a hash set",
    "Very fast in practice with good prime moduli"
  ],
  "limitations": [
    "Hash collisions (spurious hits) degrade performance if modulus is poorly chosen"
  ],
  "comparisonWithRelated": [
    "KMP: O(n + m) deterministic worst case, single pattern.",
    "Rabin-Karp: O(n + m) average, excels at multiple pattern search (plagiarism detection)."
  ],
  "commonMistakes": [
    "Forgetting that modulo arithmetic in JavaScript can produce negative numbers (must add q when t < 0)",
    "Skipping the character-by-character check upon hash match (hash collision does not imply string equality)"
  ],
  "interviewQuestions": [
    {
      "q": "Why is Rabin-Karp preferred over KMP for detecting plagiarism in university assignments?",
      "a": "Rabin-Karp can hash k-grams (phrases) into a Bloom filter / hash set, checking multiple documents and multiple patterns simultaneously in linear time."
    }
  ],
  "recommendedNext": [
    "kmp-algorithm",
    "naive-string-matching"
  ]
},
{
  "id": "recursion-tree-method",
  "name": "Recursion Tree Method",
  "categoryId": "recurrence",
  "category": "Recurrence Relations",
  "simpleIntro": "A visual method to solve recurrence relations by expanding recursive calls into a tree, summing the work done at each level, and finding the total cost across all levels.",
  "whyUseful": "Provides intuitive geometric visualization of where an algorithm spends its computational effort: root-heavy, leaf-heavy, or evenly balanced.",
  "realWorldApp": "Deriving complexities of Merge Sort, Quick Sort, Strassen’s algorithm, and non-uniform divide-and-conquer recurrences.",
  "prerequisites": [
    "Geometric Series",
    "Recurrence Relations",
    "Tree Structures"
  ],
  "coreIdea": "Draw a tree where each node represents non-recursive work at that subproblem. Sum each horizontal level to get level cost. Sum all levels from root (depth 0) to leaves (depth log_b n) using geometric series.",
  "stepByStep": [
    "Write recurrence: T(n) = aT(n/b) + f(n).",
    "Draw root with cost f(n), having a child nodes, each of size n/b with cost f(n/b).",
    "Calculate total cost at depth i: a^i * f(n / b^i).",
    "Determine tree height h = log_b n where subproblem size reaches base case n / b^h = 1.",
    "Count total leaves: a^h = a^(log_b n) = n^(log_b a). Total leaf cost = Theta(n^(log_b a)).",
    "Sum all level costs. Analyze whether the sum is dominated by root, leaves, or evenly distributed."
  ],
  "pseudocode": "// Conceptual Derivation Procedure\nRecurrence: T(n) = 2T(n/2) + c*n\nLevel 0: c*n\nLevel 1: 2 * (c * n/2) = c*n\nLevel 2: 4 * (c * n/4) = c*n\n...\nLevel i: 2^i * (c * n / 2^i) = c*n\nTree Height: log2(n)\nTotal Cost = Sum_{i=0}^{log2 n} (c*n) = c*n * (log2 n + 1) = Theta(n log n)",
  "jsImplementation": "function analyzeRecursionTree(a, b, fType, n) {\n  // Returns tree depth, leaf count, and level costs\n  const depth = Math.round(Math.log(n) / Math.log(b));\n  const leaves = Math.pow(a, depth);\n  const levels = [];\n\n  for (let i = 0; i <= depth; i++) {\n    const nodesAtLevel = Math.pow(a, i);\n    const subproblemSize = n / Math.pow(b, i);\n    levels.push({\n      level: i,\n      nodes: nodesAtLevel,\n      subproblemSize: Math.round(subproblemSize),\n      workDescription: `${nodesAtLevel} subproblems of size ${Math.round(subproblemSize)}`\n    });\n  }\n  return { depth, leaves, levels };\n}",
  "exampleInput": "T(n) = 3T(n/4) + cn²",
  "workedExample": [
    "Recurrence: T(n) = 3T(n/4) + cn²",
    "Level 0 (Root): cn²",
    "Level 1: 3 nodes of size n/4 -> 3 * c*(n/4)² = (3/16) * cn²",
    "Level 2: 9 nodes of size n/16 -> 9 * c*(n/16)² = (9/256) * cn² = (3/16)² * cn²",
    "Level i: (3/16)^i * cn²",
    "Total Sum = cn² * sum_{i=0}^{infty} (3/16)^i",
    "Geometric series ratio r = 3/16 < 1. Sum = cn² * (1 / (1 - 3/16)) = (16/13) * cn².",
    "The root dominates the entire cost! Conclusion: T(n) = Theta(n²)."
  ],
  "visualizerType": null,
  "timeComplexity": {
    "best": "O(1)",
    "average": "O(1)",
    "worst": "O(1)",
    "explanation": "Analytical mathematical derivation method."
  },
  "spaceComplexity": {
    "auxiliary": "O(1)",
    "total": "O(1)",
    "explanation": "Pure theoretical pen-and-paper analysis."
  },
  "advantages": [
    "Provides intuitive geometric insight into where algorithm bottleneck lies",
    "Works for recurrences where Master Theorem does not apply (e.g. T(n) = T(n/3) + T(2n/3) + cn)"
  ],
  "limitations": [
    "Often requires summing non-trivial geometric or arithmetic-geometric progressions",
    "Resulting bound usually needs rigorous verification via mathematical induction (Substitution Method)"
  ],
  "comparisonWithRelated": [
    "Master Theorem: Instant formula for standard divide-and-conquer recurrences.",
    "Recursion Tree: Visual method that works on unbalanced recurrences (e.g. QuickSort).",
    "Substitution Method: Rigorous inductive proof of a guessed bound."
  ],
  "commonMistakes": [
    "Forgetting that tree depth is log_b(n), not log_2(n)",
    "Failing to recognize decreasing geometric series (ratio < 1) vs increasing series (ratio > 1)"
  ],
  "interviewQuestions": [
    {
      "q": "How does the Recursion Tree explain the 3 cases of the Master Theorem?",
      "a": "Case 1: Leaves dominate (ratio > 1), cost is Theta(n^(log_b a)). Case 2: All levels contribute equally (ratio = 1), cost is Theta(f(n) * log n). Case 3: Root dominates (ratio < 1), cost is Theta(f(n))."
    }
  ],
  "recommendedNext": [
    "master-theorem",
    "substitution-method"
  ]
},
{
  "id": "substitution-method",
  "name": "Substitution Method for Recurrences",
  "categoryId": "recurrence",
  "category": "Recurrence Relations",
  "simpleIntro": "Solves recurrence relations by guessing the form of the mathematical solution and using mathematical induction to prove the constants c and n₀.",
  "whyUseful": "The gold standard rigorous mathematical proof technique used in algorithm textbooks (CLRS) to establish asymptotic bounds.",
  "realWorldApp": "Formal verification of safety-critical algorithms, competitive programming complexity proofs, university exam derivations.",
  "prerequisites": [
    "Mathematical Induction",
    "Big-O / Big-Theta Definitions"
  ],
  "coreIdea": "Guess the bound (e.g. T(n) <= c * n log n). Assume inductive hypothesis holds for all values < n. Substitute hypothesis into recurrence and prove inequality holds for n by choosing valid constant c.",
  "stepByStep": [
    "Guess the form of the upper or lower bound (e.g., T(n) <= c * n log n).",
    "Inductive Hypothesis: Assume T(k) <= c * k log k for all k < n.",
    "Inductive Step: Substitute k into the recurrence: T(n) = a * T(n/b) + f(n) <= a * (c * (n/b) log(n/b)) + f(n).",
    "Simplify algebraic expression to verify it satisfies <= c * n log n.",
    "Base Case: Choose c and n₀ sufficiently large to satisfy base conditions."
  ],
  "pseudocode": "// Example: Prove T(n) = 2T(floor(n/2)) + n is O(n log n)\n1. Guess: T(n) <= c * n * log2(n)\n2. Inductive Hypothesis: T(n/2) <= c * (n/2) * log2(n/2)\n3. Substitute:\n   T(n) <= 2 * [c * (n/2) * log2(n/2)] + n\n        = c * n * (log2(n) - log2(2)) + n\n        = c * n * log2(n) - c * n + n\n        = c * n * log2(n) - (c - 1) * n\n4. We need: c * n * log2(n) - (c - 1) * n <= c * n * log2(n)\n   This holds whenever (c - 1) >= 0 => c >= 1.\n5. Base Case: For n = 2, T(2) = 2*T(1) + 2 <= c * 2 * 1 => holds for c >= 2.\n6. Q.E.D. T(n) = O(n log n).",
  "jsImplementation": "function verifySubstitutionBound(n, c, actualFn) {\n  // Verifies empirically that actualFn(n) <= c * n * Math.log2(n)\n  const bound = c * n * Math.log2(n);\n  const actual = actualFn(n);\n  return { n, actual, bound, holds: actual <= bound };\n}",
  "exampleInput": "T(n) = 2T(n/2) + n, Guess: T(n) <= c * n log n",
  "workedExample": [
    "Recurrence: T(n) = 2T(n/2) + n",
    "Guess: T(n) <= c * n log2(n)",
    "Substitute: T(n) <= 2 * (c * (n/2) * log2(n/2)) + n",
    "Simplify: c*n*log2(n) - c*n*log2(2) + n = c*n*log2(n) - c*n + n",
    "Factor: c*n*log2(n) - (c - 1)*n",
    "For this to be <= c*n*log2(n), we require (c - 1)*n >= 0, meaning c >= 1.",
    "Base case verified for n=2,3 with c=2.",
    "Induction complete: T(n) = O(n log n)."
  ],
  "visualizerType": null,
  "timeComplexity": {
    "best": "O(1)",
    "average": "O(1)",
    "worst": "O(1)",
    "explanation": "Analytical proof method."
  },
  "spaceComplexity": {
    "auxiliary": "O(1)",
    "total": "O(1)",
    "explanation": "Theoretical pen-and-paper derivation."
  },
  "advantages": [
    "Completely rigorous mathematical proof of algorithmic complexity",
    "Can prove both upper bounds (O) and lower bounds (Omega)"
  ],
  "limitations": [
    "Requires guessing the correct answer first",
    "Subtle errors can occur if lower-order terms are neglected"
  ],
  "comparisonWithRelated": [
    "Master Theorem: Automated recipe, no guessing required.",
    "Recursion Tree: Good for forming initial guess.",
    "Substitution Method: Rigorous formal proof of that guess."
  ],
  "commonMistakes": [
    "Assuming T(n) <= c*n + n proves O(n) (the \"+ n\" extra term invalidates the inductive step: the form must match strictly!)",
    "Forgetting to verify the base case with explicit constants c and n₀"
  ],
  "interviewQuestions": [
    {
      "q": "What should you do in the substitution method if your inductive step misses by a lower-order term (e.g. <= c*n + n)?",
      "a": "Subtract a lower-order term from your inductive guess! Instead of guessing c*n, guess c*n - d. The extra \"- d\" will absorb the unwanted additive constant."
    }
  ],
  "recommendedNext": [
    "master-theorem",
    "recursion-tree-method"
  ]
},
{
  "id": "branch-and-bound-intro",
  "name": "Branch and Bound Principles",
  "categoryId": "branch-bound",
  "category": "Branch and Bound",
  "simpleIntro": "A state-space search paradigm for discrete optimization problems that systematically enumerates candidate solutions using bounding functions to prune subtrees.",
  "whyUseful": "Solves NP-hard combinatorial optimization problems to guaranteed optimality much faster than exhaustive brute-force search.",
  "realWorldApp": "Integer Linear Programming solvers (CPLEX, Gurobi), airline flight crew scheduling, logistics fleet routing, factory job shop scheduling.",
  "prerequisites": [
    "State Space Trees",
    "Priority Queues",
    "Optimization Problems"
  ],
  "coreIdea": "Branch: Split the search space into smaller subproblems. Bound: Compute an optimistic bound (lower bound for minimization, upper bound for maximization). Prune: If a node’s bound is worse than the best solution found so far, prune the entire subtree.",
  "stepByStep": [
    "Represent the problem as a state space tree with root as initial state.",
    "Maintain best known solution value (BestValue) and an active node list / priority queue.",
    "Select active node according to search strategy (FIFO, LIFO, or Least-Cost LCBB).",
    "Generate children (Branching).",
    "Compute bounding value for each child (Bounding).",
    "Pruning condition: If bound of child is worse than BestValue, discard it. If child is a complete feasible solution and beats BestValue, update BestValue.",
    "Repeat until active list is exhausted."
  ],
  "pseudocode": "Algorithm BranchAndBound(Problem)\n    BestSolution = null; BestValue = -infinity (for max problem)\n    Q = PriorityQueue()\n    Q.insert(RootNode)\n    while Q is not empty do\n        node = Q.extractBest()\n        if node.upperBound <= BestValue then\n            continue // Prune node!\n        for each child in Branch(node) do\n            if isComplete(child) then\n                if child.value > BestValue then\n                    BestValue = child.value\n                    BestSolution = child\n            else\n                child.upperBound = ComputeBound(child)\n                if child.upperBound > BestValue then\n                    Q.insert(child)\n    return BestSolution",
  "jsImplementation": "class BNode {\n  constructor(level, cost, bound, state) {\n    this.level = level;\n    this.cost = cost;\n    this.bound = bound;\n    this.state = state;\n  }\n}\n\nfunction generalBranchAndBound(rootBound, expandFn) {\n  let bestCost = Infinity;\n  let bestSolution = null;\n  const queue = [{ bound: rootBound, path: [] }];\n\n  while (queue.length > 0) {\n    queue.sort((a, b) => a.bound - b.bound); // Min-cost priority\n    const current = queue.shift();\n\n    if (current.bound >= bestCost) continue; // Prune!\n\n    const children = expandFn(current);\n    for (const child of children) {\n      if (child.isLeaf) {\n        if (child.cost < bestCost) {\n          bestCost = child.cost;\n          bestSolution = child;\n        }\n      } else if (child.bound < bestCost) {\n        queue.push(child);\n      }\n    }\n  }\n  return { bestCost, bestSolution };\n}",
  "exampleInput": "Maximization problem with active nodes having bounds [45, 38, 29]. Best known complete solution = 40.",
  "workedExample": [
    "Current Best Known Solution: Value = 40",
    "Examine Node A with Upper Bound = 45: 45 > 40. Potential better solution exists! Branch Node A.",
    "Examine Node B with Upper Bound = 38: 38 <= 40. Even in the absolute best case, Node B can never beat 40. PRUNE immediately!",
    "Examine Node C with Upper Bound = 29: 29 <= 40. PRUNE immediately!",
    "Saves searching thousands of descendant states beneath nodes B and C!"
  ],
  "visualizerType": null,
  "timeComplexity": {
    "best": "O(n) (when optimal branch is explored first and prunes everything else)",
    "average": "O(2^n)",
    "worst": "O(2^n) or O(n!)",
    "explanation": "NP-hard combinatorial optimization. Worst case searches all states, but effective bounding functions prune > 99% of nodes in practice."
  },
  "spaceComplexity": {
    "auxiliary": "O(2^n)",
    "total": "O(2^n)",
    "explanation": "Priority queue of live nodes in LC-Search can store exponential number of frontier states."
  },
  "advantages": [
    "Guarantees finding the globally optimal solution unlike greedy or heuristics",
    "Drastically faster than brute force due to aggressive subtree pruning"
  ],
  "limitations": [
    "Worst-case runtime is still exponential for NP-hard problems",
    "Queue can consume substantial memory in Least-Cost Branch and Bound"
  ],
  "comparisonWithRelated": [
    "Backtracking: Uses DFS, typically solves decision problems (is there a path?), minimal memory O(n).",
    "Branch and Bound: Uses BFS/LCBB with bounds, solves optimization problems (min/max), uses more memory."
  ],
  "commonMistakes": [
    "Using a bounding function that is not optimistic (if bound underestimates in maximization, it might prune the optimal solution!)",
    "Confusing Branch and Bound with Dynamic Programming (DP stores all overlapping subproblem tables; B&B prunes non-optimal paths)"
  ],
  "interviewQuestions": [
    {
      "q": "What is the key difference between Backtracking and Branch & Bound?",
      "a": "Backtracking uses Depth-First Search (DFS) with state undoing, mainly for decision/satisfaction problems. Branch & Bound uses Breadth-First or Best-First search guided by bounding functions for optimization problems."
    }
  ],
  "recommendedNext": [
    "knapsack-01-branch-bound",
    "tsp-branch-bound"
  ]
},
{
  "id": "knapsack-01-branch-bound",
  "name": "0/1 Knapsack with Branch and Bound",
  "categoryId": "branch-bound",
  "category": "Branch and Bound",
  "simpleIntro": "Solves the 0/1 Knapsack optimization problem by computing Fractional Knapsack upper bounds at each node to prune unpromising branches.",
  "whyUseful": "Demonstrates how a polynomial-time greedy algorithm (Fractional Knapsack) serves as an optimal bounding function for an NP-hard problem.",
  "realWorldApp": "Cargo ship container loading, capital budgeting investment decisions, budget-constrained server resource packing.",
  "prerequisites": [
    "0/1 Knapsack Concept",
    "Fractional Knapsack Greedy",
    "Branch and Bound Principles"
  ],
  "coreIdea": "Sort items by profit/weight ratio. At each node in the decision tree, compute an upper bound by greedily taking the fractional knapsack value of remaining capacity. If this bound <= best profit found so far, prune the branch!",
  "stepByStep": [
    "Sort all items in descending order of profit-to-weight ratio (p_i / w_i).",
    "Initialize queue with Root node (level 0, profit 0, weight 0, bound = fractional knapsack of all items).",
    "While queue is not empty, extract node with highest bound.",
    "Branch: Create Left child (including item at level) and Right child (excluding item at level).",
    "For each child, if weight <= capacity and profit > bestProfit, update bestProfit.",
    "Compute upper bound for child. If bound > bestProfit, insert child into priority queue; else PRUNE."
  ],
  "pseudocode": "Algorithm KnapsackBranchAndBound(W, items, n)\n    Sort items by p_i / w_i descending\n    Q = PriorityQueue() // Max heap by bound\n    root = Node(level=0, profit=0, weight=0)\n    root.bound = Bound(root, W, items, n)\n    Q.insert(root)\n    maxProfit = 0\n    while Q is not empty do\n        u = Q.extractMax()\n        if u.bound <= maxProfit then continue\n        // Left: Include item\n        v1 = Node(level = u.level + 1, profit = u.profit + items[u.level].p, weight = u.weight + items[u.level].w)\n        if v1.weight <= W and v1.profit > maxProfit then maxProfit = v1.profit\n        v1.bound = Bound(v1, W, items, n)\n        if v1.bound > maxProfit then Q.insert(v1)\n        // Right: Exclude item\n        v2 = Node(level = u.level + 1, profit = u.profit, weight = u.weight)\n        v2.bound = Bound(v2, W, items, n)\n        if v2.bound > maxProfit then Q.insert(v2)\n    return maxProfit",
  "jsImplementation": "function knapsackBranchAndBound(capacity, items) {\n  // Sort items by profit/weight ratio descending\n  const sorted = [...items].sort((a, b) => (b.profit / b.weight) - (a.profit / a.weight));\n  const n = sorted.length;\n\n  function calculateBound(node) {\n    if (node.weight >= capacity) return 0;\n    let profitBound = node.profit;\n    let j = node.level;\n    let totWeight = node.weight;\n\n    while (j < n && totWeight + sorted[j].weight <= capacity) {\n      totWeight += sorted[j].weight;\n      profitBound += sorted[j].profit;\n      j++;\n    }\n    if (j < n) {\n      profitBound += (capacity - totWeight) * (sorted[j].profit / sorted[j].weight);\n    }\n    return profitBound;\n  }\n\n  let maxProfit = 0;\n  const queue = [{ level: 0, profit: 0, weight: 0, bound: 0 }];\n  queue[0].bound = calculateBound(queue[0]);\n\n  while (queue.length > 0) {\n    queue.sort((a, b) => b.bound - a.bound);\n    const u = queue.shift();\n\n    if (u.bound <= maxProfit || u.level >= n) continue;\n\n    // Left: Include item\n    const leftWeight = u.weight + sorted[u.level].weight;\n    const leftProfit = u.profit + sorted[u.level].profit;\n    if (leftWeight <= capacity) {\n      if (leftProfit > maxProfit) maxProfit = leftProfit;\n      const leftNode = { level: u.level + 1, profit: leftProfit, weight: leftWeight };\n      leftNode.bound = calculateBound(leftNode);\n      if (leftNode.bound > maxProfit) queue.push(leftNode);\n    }\n\n    // Right: Exclude item\n    const rightNode = { level: u.level + 1, profit: u.profit, weight: u.weight };\n    rightNode.bound = calculateBound(rightNode);\n    if (rightNode.bound > maxProfit) queue.push(rightNode);\n  }\n  return maxProfit;\n}",
  "exampleInput": "Capacity = 10, Items: [{ p: 40, w: 2 }, { p: 30, w: 5 }, { p: 50, w: 10 }, { p: 10, w: 5 }]",
  "workedExample": [
    "Ratios: Item 1: 40/2 = 20; Item 2: 30/5 = 6; Item 3: 50/10 = 5; Item 4: 10/5 = 2.",
    "Root node bound: Pick Item 1 (wt 2, p 40) + Item 2 (wt 5, p 30) + 3/10 of Item 3 (wt 3, p 15) = 85.",
    "Branch Left (Include Item 1): profit 40, weight 2. Bound = 85. Update maxProfit = 40.",
    "  Include Item 2: weight 7, profit 70. Bound = 70 + (3/10 * 50) = 85. Update maxProfit = 70.",
    "Branch Right (Exclude Item 1): Bound = 30 + 50 = 80 <= 85.",
    "Leaves explored with bounds < 70 are pruned immediately.",
    "Optimal Profit = 70 (Items 1 and 2, weight 7 <= 10)."
  ],
  "visualizerType": null,
  "timeComplexity": {
    "best": "O(n log n)",
    "average": "O(2^n)",
    "worst": "O(2^n)",
    "explanation": "Initial sorting takes O(n log n). Worst case expands all 2^n binary tree nodes, but tight fractional knapsack bounds prune most nodes."
  },
  "spaceComplexity": {
    "auxiliary": "O(2^n)",
    "total": "O(2^n)",
    "explanation": "Priority queue stores frontier nodes."
  },
  "advantages": [
    "Fractional Knapsack upper bound is very tight, pruning large portions of the search tree",
    "Unlike Dynamic Programming, works well when knapsack capacity W is extremely large (e.g. 10^9)"
  ],
  "limitations": [
    "Worst case remains exponential O(2^n) on adversarial datasets"
  ],
  "comparisonWithRelated": [
    "DP 0/1 Knapsack: O(n * W) time, fails if capacity W is massive (e.g. 10^9).",
    "Branch and Bound: Does not depend on W; runtime depends on item count n and pruning efficiency."
  ],
  "commonMistakes": [
    "Not sorting items by ratio first (ruins the fractional knapsack bounding calculation)"
  ],
  "interviewQuestions": [
    {
      "q": "Why is Fractional Knapsack used as the bounding function for 0/1 Knapsack in Branch and Bound?",
      "a": "Because Fractional Knapsack is a relaxation of 0/1 Knapsack that can be solved greedily in polynomial time and is guaranteed to be >= the optimal 0/1 Knapsack solution."
    }
  ],
  "recommendedNext": [
    "knapsack-01",
    "branch-and-bound-intro"
  ]
},
{
  "id": "tsp-branch-bound",
  "name": "Traveling Salesperson Problem (TSP) Branch & Bound",
  "categoryId": "branch-bound",
  "category": "Branch and Bound",
  "simpleIntro": "Finds the minimum-cost tour visiting every city exactly once and returning to the starting city using reduced cost matrix bounds.",
  "whyUseful": "Benchmark NP-hard optimization problem. Explains matrix reduction techniques for establishing rigorous lower bounds.",
  "realWorldApp": "Package delivery route planning (FedEx, UPS), circuit board automated drilling machines, DNA sequencing fragment assembly.",
  "prerequisites": [
    "Adjacency Matrices",
    "Hamiltonian Cycles",
    "Branch and Bound Principles"
  ],
  "coreIdea": "Row and Column reduction: Subtract minimum element from each row and column. The sum of subtracted constants gives a guaranteed lower bound on any tour in that subproblem. Branch on city transitions with smallest reduced cost.",
  "stepByStep": [
    "Represent edge costs as an n x n matrix with infinity on diagonals.",
    "Reduce the root matrix: subtract min from each row, then min from each column. Sum of reductions = root lower bound.",
    "Create priority queue with root node.",
    "Branch: For current city u, generate child nodes visiting each unvisited city v.",
    "For child transition (u, v): set row u to Inf, col v to Inf, and edge (v, start) to Inf. Reduce matrix to get new lower bound.",
    "If child bound < bestTourCost, enqueue. When a complete tour beats bestTourCost, update it."
  ],
  "pseudocode": "Algorithm TSP_BranchAndBound(costMatrix, n)\n    root = Node(city = 0, path = [0], level = 1)\n    root.matrix = copy(costMatrix)\n    root.bound = ReduceMatrix(root.matrix)\n    Q = PriorityQueue() // Min heap by bound\n    Q.insert(root)\n    minTourCost = infinity\n    while Q is not empty do\n        curr = Q.extractMin()\n        if curr.bound >= minTourCost then continue\n        if curr.level == n then\n            // Complete tour: add return to city 0\n            tourCost = curr.cost + curr.matrix[curr.city][0]\n            if tourCost < minTourCost then minTourCost = tourCost\n        for nextCity = 0 to n - 1 do\n            if nextCity not in curr.path and curr.matrix[curr.city][nextCity] != inf then\n                child = CreateChildNode(curr, nextCity)\n                if child.bound < minTourCost then Q.insert(child)\n    return minTourCost",
  "jsImplementation": "function reduceMatrix(mat, n) {\n  let cost = 0;\n  // Row reduction\n  for (let i = 0; i < n; i++) {\n    let minVal = Infinity;\n    for (let j = 0; j < n; j++) {\n      if (mat[i][j] < minVal) minVal = mat[i][j];\n    }\n    if (minVal !== Infinity && minVal > 0) {\n      cost += minVal;\n      for (let j = 0; j < n; j++) {\n        if (mat[i][j] !== Infinity) mat[i][j] -= minVal;\n      }\n    }\n  }\n  // Column reduction\n  for (let j = 0; j < n; j++) {\n    let minVal = Infinity;\n    for (let i = 0; i < n; i++) {\n      if (mat[i][j] < minVal) minVal = mat[i][j];\n    }\n    if (minVal !== Infinity && minVal > 0) {\n      cost += minVal;\n      for (let i = 0; i < n; i++) {\n        if (mat[i][j] !== Infinity) mat[i][j] -= minVal;\n      }\n    }\n  }\n  return cost;\n}",
  "exampleInput": "4 Cities Cost Matrix: [[Inf, 10, 15, 20], [10, Inf, 35, 25], [15, 35, Inf, 30], [20, 25, 30, Inf]]",
  "workedExample": [
    "Initial 4x4 matrix:",
    "Row reductions: Row 0 min=10, Row 1 min=10, Row 2 min=15, Row 3 min=20. Sum = 55.",
    "Column reductions: Col 1 min=0, Col 2 min=0, Col 3 min=0, Col 4 min=0. Sum = 0.",
    "Root Lower Bound = 55 (any tour must cost at least 55).",
    "Branch from City 0: Child to City 1, City 2, City 3.",
    "Branch to City 1: Cost = 10 + reduced cost bound. Evaluates to 80.",
    "Branch to City 2: Cost = 15 + reduced cost bound. Evaluates to 80.",
    "Optimal symmetric TSP tour: 0 -> 1 -> 3 -> 2 -> 0 with total cost 80."
  ],
  "visualizerType": null,
  "timeComplexity": {
    "best": "O(n^2)",
    "average": "O(2^n * n^2)",
    "worst": "O(n! * n^2)",
    "explanation": "Worst case explores state tree of n! permutations, each performing O(n^2) matrix reduction operations."
  },
  "spaceComplexity": {
    "auxiliary": "O(n! * n^2)",
    "total": "O(n! * n^2)",
    "explanation": "Storing reduced n x n matrices at each live node in priority queue."
  },
  "advantages": [
    "Finds exact optimal tour unlike heuristic genetic algorithms or simulated annealing",
    "Solves instances up to n = 40-50 cities in reasonable time"
  ],
  "limitations": [
    "Factorial worst case; intractable for large n without cutting-plane algorithms"
  ],
  "comparisonWithRelated": [
    "Brute Force: O(n!) checks all (n-1)! / 2 tours.",
    "Held-Karp Dynamic Programming: O(n^2 * 2^n) time, O(n * 2^n) memory.",
    "Branch & Bound: Solves average cases faster than DP by pruning."
  ],
  "commonMistakes": [
    "Setting back-edges (v, start) incorrectly, allowing invalid early sub-tours before all cities are visited"
  ],
  "interviewQuestions": [
    {
      "q": "Why is subtracting a constant from every element in a row of a TSP cost matrix valid for bounding?",
      "a": "Every valid TSP tour must leave each city exactly once (must select exactly one edge from each row). Subtracting a constant reduces the cost of every candidate tour by that exact same constant, preserving relative order while exposing a lower bound."
    }
  ],
  "recommendedNext": [
    "branch-and-bound-intro",
    "p-vs-np-intro"
  ]
},
{
  "id": "p-vs-np-intro",
  "name": "P, NP, and Computational Intractability",
  "categoryId": "complexity-classes",
  "category": "Complexity Classes",
  "simpleIntro": "Explores the fundamental theoretical boundary between problems that can be solved efficiently in polynomial time (P) versus problems whose solutions can be verified efficiently (NP).",
  "whyUseful": "The most important open question in computer science and mathematics (Clay Millennium Prize $1,000,000 problem). Dictates what computers can ever solve efficiently.",
  "realWorldApp": "Cryptography (RSA, elliptic curves rely on NP-hardness of factoring/discrete logs), quantum computing capabilities, drug discovery molecular folding.",
  "prerequisites": [
    "Big-O Notation",
    "Polynomial vs Exponential Growth",
    "Turing Machine Basics"
  ],
  "coreIdea": "P is the set of decision problems solvable by a deterministic Turing machine in O(n^k) time. NP is the set of decision problems verifiable by a deterministic machine in polynomial time given a certificate/witness. Is P = NP?",
  "stepByStep": [
    "Define Decision Problem: Problem with a binary YES/NO answer.",
    "Define Class P: Problems solvable in polynomial time O(n^k) (e.g. Sorting, Shortest Path, Linear Programming).",
    "Define Class NP: Problems where a candidate YES solution (certificate) can be verified in polynomial time O(n^k) (e.g. Sudoku, Traveling Salesperson, 3-SAT).",
    "Observe: Every problem in P is trivially in NP (P ⊆ NP) because if you can solve it in polynomial time, you can verify it in polynomial time.",
    "The Core Question: If a solution can be verified quickly, can it also be found quickly? (P =? NP)."
  ],
  "pseudocode": "// Conceptual Verifier for Hamiltonian Cycle (in NP)\nAlgorithm Verifier_HamiltonianCycle(Graph G, Certificate C)\n    Input: Graph G = (V, E), Certificate C = [v1, v2, ..., vn]\n    1. Check if length(C) == |V|\n    2. Check if all vertices in C are distinct\n    3. Check if edge (C[i], C[i+1]) exists in E for i = 1 to n-1\n    4. Check if edge (C[n], C[1]) exists in E\n    If all checks pass in O(|V| + |E|) polynomial time:\n        return \"VALID CERTIFICATE (YES)\"\n    else:\n        return \"INVALID\"",
  "jsImplementation": "function verifyHamiltonianPath(graph, path) {\n  // Verifier takes polynomial time O(V)\n  const n = graph.length;\n  if (path.length !== n) return false;\n  const visited = new Set();\n\n  for (let i = 0; i < n; i++) {\n    const u = path[i];\n    if (visited.has(u)) return false; // Duplicate vertex\n    visited.add(u);\n    if (i < n - 1) {\n      const v = path[i + 1];\n      if (!graph[u][v]) return false; // Edge does not exist\n    }\n  }\n  // Check return edge to start\n  return graph[path[n - 1]][path[0]] === 1;\n}",
  "exampleInput": "Sudoku: Finding a solution from scratch takes exponential time; verifying a filled 9x9 grid takes O(1) seconds.",
  "workedExample": [
    "Example: 9x9 Sudoku",
    "Solving: Exploring candidate digits across empty cells has exponential state space (brute force backtracking).",
    "Verifying: Handed a completed 9x9 board, verifying each row, column, and 3x3 box contains digits 1-9 takes trivial O(81) operations.",
    "This asymmetry between solving (hard) and verifying (easy) is the essence of NP!"
  ],
  "visualizerType": null,
  "timeComplexity": {
    "best": "Theoretical Class",
    "average": "P ⊆ NP ⊆ PSPACE ⊆ EXPTIME",
    "worst": "Unresolved Millennium Problem",
    "explanation": "Complexity classification theoretical concept."
  },
  "spaceComplexity": {
    "auxiliary": "O(1)",
    "total": "O(1)",
    "explanation": "Theoretical concept."
  },
  "advantages": [
    "Provides theoretical bedrock for determining when to abandon searching for exact polynomial algorithms and switch to heuristics"
  ],
  "limitations": [
    "P = NP remains unproven since Stephen Cook and Leonid Levin formulated it in 1971"
  ],
  "comparisonWithRelated": [
    "P: Solvable in polynomial time.",
    "NP: Verifiable in polynomial time.",
    "NP-Complete: The hardest problems in NP.",
    "NP-Hard: At least as hard as the hardest problems in NP (may not even be in NP)."
  ],
  "commonMistakes": [
    "Thinking NP stands for \"Non-Polynomial\" (it stands for Nondeterministic Polynomial time)",
    "Assuming that if P != NP, NP problems can never be solved in practice (heuristics, SAT solvers, and approximation algorithms solve huge instances daily)"
  ],
  "interviewQuestions": [
    {
      "q": "What does NP stand for and why is it named that?",
      "a": "NP stands for Nondeterministic Polynomial time. It means a problem can be solved in polynomial time by a theoretical Nondeterministic Turing Machine (which can guess the correct certificate)."
    },
    {
      "q": "What would happen to modern Internet security if someone proved P = NP with an efficient constructive algorithm?",
      "a": "Modern public-key cryptography (RSA, ECC, Diffie-Hellman) would collapse, because breaking keys is in NP and would become solvable in polynomial time."
    }
  ],
  "recommendedNext": [
    "np-completeness",
    "three-sat-problem"
  ]
},
{
  "id": "np-completeness",
  "name": "NP-Completeness & Cook-Levin Theorem",
  "categoryId": "complexity-classes",
  "category": "Complexity Classes",
  "simpleIntro": "Identifies the hardest problems in NP where a polynomial-time solution for any one of them would instantly solve all problems in NP in polynomial time.",
  "whyUseful": "When a problem is proven NP-Complete, engineers know not to waste time searching for an exact polynomial algorithm, switching instead to heuristics, approximations, or Branch & Bound.",
  "realWorldApp": "Identifying intractable optimization problems in logistics, circuit layout, network design, compiler register allocation.",
  "prerequisites": [
    "P vs NP Concepts",
    "Polynomial-Time Reductions",
    "Boolean Logic"
  ],
  "coreIdea": "A problem X is NP-Complete if: 1. X is in NP, and 2. Every problem Y in NP is polynomial-time reducible to X (X is NP-hard). The Cook-Levin Theorem proved that SAT is NP-Complete.",
  "stepByStep": [
    "Proving a problem L is NP-Complete requires 2 steps:",
    "Step 1: Prove L is in NP (provide a polynomial-time verifier and certificate).",
    "Step 2: Choose a known NP-Complete problem L_known (e.g. 3-SAT, Vertex Cover, Hamiltonian Cycle).",
    "Step 3: Construct a reduction function f that maps any instance x of L_known to an instance f(x) of L in polynomial time.",
    "Step 4: Prove correctness: x is a YES instance of L_known if and only if f(x) is a YES instance of L.",
    "Conclusion: If L can be solved in polynomial time, L_known can too, proving L is NP-Complete!"
  ],
  "pseudocode": "// Reduction Framework: L_known <=_p L_new\nfunction ProveNPComplete(L_new, L_known) {\n    1. Show L_new has poly-time verifier V(x, certificate) -> L_new in NP\n    2. Construct polynomial mapping f: Instance(L_known) -> Instance(L_new)\n    3. Prove Equivalence:\n       x in L_known <===> f(x) in L_new\n    4. Conclude L_new is NP-Complete!\n}",
  "jsImplementation": "// Conceptual example: Reduction of Independent Set to Vertex Cover\n// A graph G has an Independent Set of size k if and only if\n// G has a Vertex Cover of size |V| - k.\nfunction reduceIndependentSetToVertexCover(graph, k) {\n  const V = graph.length;\n  const vertexCoverTarget = V - k;\n  return {\n    transformedGraph: graph,\n    targetSize: vertexCoverTarget,\n    reductionTime: 'O(1) polynomial reduction'\n  };\n}",
  "exampleInput": "Proving Vertex Cover is NP-Complete by reducing 3-SAT to Vertex Cover in O(n) polynomial steps.",
  "workedExample": [
    "Cook-Levin Theorem (1971):",
    "Stephen Cook proved that Boolean Satisfiability (SAT) is NP-Complete by encoding the step-by-step transition of ANY nondeterministic polynomial-time Turing machine into a Boolean CNF formula.",
    "Richard Karp (1972) published \"Karp’s 21 NP-Complete Problems\" by reducing SAT to 3-SAT, then 3-SAT to Clique, Vertex Cover, Hamiltonian Cycle, Knapsack, and Subset Sum.",
    "This created a massive interconnected web of computational intractability!"
  ],
  "visualizerType": null,
  "timeComplexity": {
    "best": "O(n^k) for verification",
    "average": "NP-Complete",
    "worst": "Super-polynomial unless P = NP",
    "explanation": "Theoretical complexity class."
  },
  "spaceComplexity": {
    "auxiliary": "O(1)",
    "total": "O(1)",
    "explanation": "Theoretical concept."
  },
  "advantages": [
    "Saves millions of engineering hours by definitively proving when exact polynomial algorithms are impossible unless P=NP"
  ],
  "limitations": [
    "Does not mean the problem cannot be solved for practical small or average instances"
  ],
  "comparisonWithRelated": [
    "P: Solvable in polynomial time.",
    "NP-Complete: The hardest decision problems in NP.",
    "NP-Hard: Problems at least as hard as NP-Complete (e.g. Halting Problem, TSP Optimization)."
  ],
  "commonMistakes": [
    "Reducing the new problem to a known problem (the reduction MUST go from Known NP-Complete to New Problem: Known <=_p New!)",
    "Forgetting to prove that the problem is in NP (Step 1)"
  ],
  "interviewQuestions": [
    {
      "q": "In which direction must a polynomial reduction go to prove a problem B is NP-complete?",
      "a": "You must reduce FROM a known NP-complete problem A TO your new problem B (A <=_p B). If B could be solved in polynomial time, A could be solved in polynomial time."
    },
    {
      "q": "What is the significance of the Cook-Levin Theorem?",
      "a": "It was the first proof that an actual NP-complete problem (SAT) exists without relying on any pre-existing NP-complete problems."
    }
  ],
  "recommendedNext": [
    "three-sat-problem",
    "p-vs-np-intro"
  ]
},
{
  "id": "three-sat-problem",
  "name": "3-Satisfiability (3-SAT) Problem",
  "categoryId": "complexity-classes",
  "category": "Complexity Classes",
  "simpleIntro": "Determines whether a Boolean formula in Conjunctive Normal Form with exactly 3 literals per clause has a truth assignment that evaluates to true.",
  "whyUseful": "The starting point for almost all NP-completeness reduction proofs in computer science because of its simple, highly structured clause format.",
  "realWorldApp": "Hardware circuit verification (Intel chip bug detection), software formal verification, automated theorem proving, dependency resolution engines.",
  "prerequisites": [
    "Boolean Logic (AND, OR, NOT)",
    "NP-Completeness Basics",
    "Conjunctive Normal Form (CNF)"
  ],
  "coreIdea": "Given formula phi = (x1 OR NOT x2 OR x3) AND (NOT x1 OR x4 OR NOT x5) AND ... Can we assign true/false to variables such that every clause contains at least one true literal? 2-SAT is in P, but 3-SAT jumps to NP-Complete!",
  "stepByStep": [
    "Formula consists of n Boolean variables and m clauses.",
    "Each clause has exactly 3 literals combined with OR: (l1 OR l2 OR l3).",
    "Clauses are joined by AND: phi = C1 AND C2 AND ... AND Cm.",
    "To evaluate formula: assign truth values to variables.",
    "Check if every clause evaluates to true.",
    "Brute force checks all 2^n possible assignments."
  ],
  "pseudocode": "Algorithm Naive3SATSolver(formula, variables)\n    n = length(variables)\n    for assignment = 0 to 2^n - 1 do\n        truthMap = decodeBinaryToAssignment(assignment, variables)\n        if evaluatesToTrue(formula, truthMap) then\n            return \"SATISFIABLE with \" + truthMap\n    return \"UNSATISFIABLE\"",
  "jsImplementation": "function evaluate3SAT(clauses, assignment) {\n  // clauses is array of arrays: [[1, -2, 3], [-1, 4, -2]]\n  // assignment is object: { 1: true, 2: false, 3: true, ... }\n  for (const clause of clauses) {\n    let clauseSatisfied = false;\n    for (const lit of clause) {\n      const varId = Math.abs(lit);\n      const isPositive = lit > 0;\n      const val = assignment[varId];\n      if ((isPositive && val) || (!isPositive && !val)) {\n        clauseSatisfied = true;\n        break;\n      }\n    }\n    if (!clauseSatisfied) return false;\n  }\n  return true;\n}",
  "exampleInput": "phi = (x1 OR x2 OR x3) AND (NOT x1 OR NOT x2 OR x3) AND (NOT x3 OR NOT x1 OR x2)",
  "workedExample": [
    "Formula: C1 = (x1 OR x2 OR x3), C2 = (NOT x1 OR NOT x2 OR x3), C3 = (NOT x3 OR NOT x1 OR x2)",
    "Try Assignment: x1 = true, x2 = false, x3 = true",
    "  C1 = (T OR F OR T) = True",
    "  C2 = (F OR T OR T) = True",
    "  C3 = (F OR F OR F) = False! (Fails C3)",
    "Try Assignment: x1 = false, x2 = true, x3 = true",
    "  C1 = (F OR T OR T) = True",
    "  C2 = (T OR F OR T) = True",
    "  C3 = (F OR T OR T) = True!",
    "Formula is SATISFIABLE with { x1: false, x2: true, x3: true }."
  ],
  "visualizerType": null,
  "timeComplexity": {
    "best": "O(1)",
    "average": "O(2^n)",
    "worst": "O(2^n)",
    "explanation": "2^n truth assignments. In practice, modern DPLL / CDCL SAT solvers solve instances with millions of variables using clause learning."
  },
  "spaceComplexity": {
    "auxiliary": "O(n + m)",
    "total": "O(n + m)",
    "explanation": "Storage for n variables, m clauses, and truth assignment map."
  },
  "advantages": [
    "Universal benchmark problem: virtually any combinatorial puzzle can be translated into SAT and solved with industrial SAT solvers"
  ],
  "limitations": [
    "Worst-case runtime is exponential unless P=NP"
  ],
  "comparisonWithRelated": [
    "2-SAT: Solvable in O(V + E) linear time using strongly connected components (Kosaraju / Tarjan).",
    "3-SAT: NP-Complete! Adding just 1 literal per clause causes a phase transition from P to NP-Complete."
  ],
  "commonMistakes": [
    "Assuming 2-SAT is also NP-Complete (2-SAT is in P, solvable via graph implication graphs in linear time)",
    "Thinking SAT is only academic (industrial SAT/SMT solvers are used daily in microprocessor hardware design)"
  ],
  "interviewQuestions": [
    {
      "q": "Why is 2-SAT solvable in polynomial time while 3-SAT is NP-Complete?",
      "a": "Clauses with 2 literals (A OR B) can be converted into logical implications: (NOT A => B) and (NOT B => A), forming a directed implication graph. 2-SAT is satisfiable if and only if no variable x and NOT x belong to the same strongly connected component (checked in linear time). 3-SAT cannot be represented as simple directed 2-variable edges."
    }
  ],
  "recommendedNext": [
    "np-completeness",
    "p-vs-np-intro"
  ]
}
];

// Helper functions for easy lookup
function getAlgorithmById(id) {
  return ALGORITHMS_DATA.find(algo => algo.id === id);
}

function getAlgorithmsByCategory(categoryId) {
  return ALGORITHMS_DATA.filter(algo => algo.categoryId === categoryId);
}

function getAllCategories() {
  return ALGORITHM_CATEGORIES;
}

function searchAlgorithms(query) {
  if (!query) return [];
  const q = query.toLowerCase().trim();
  return ALGORITHMS_DATA.filter(algo =>
    algo.name.toLowerCase().includes(q) ||
    algo.category.toLowerCase().includes(q) ||
    algo.simpleIntro.toLowerCase().includes(q)
  );
}

// CRITICAL: Explicitly attach to window object for global availability
window.ALGORITHM_CATEGORIES = ALGORITHM_CATEGORIES;
window.ALGORITHMS_DATA = ALGORITHMS_DATA;
window.getAlgorithmById = getAlgorithmById;
window.getAlgorithmsByCategory = getAlgorithmsByCategory;
window.getAllCategories = getAllCategories;
window.searchAlgorithms = searchAlgorithms;
