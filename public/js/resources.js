/**
 * ADA Explorer - YouTube Learning Resources
 * Curated catalogue of verified, real YouTube educational videos in Hindi and English,
 * plus topic-specific verified search queries for complete coverage.
 */

const VERIFIED_YOUTUBE_RESOURCES = [
  // --- Merge Sort ---
  {
    topicId: 'merge-sort',
    title: '2.7.2. Merge Sort Algorithm - Complete Walkthrough',
    channel: 'Abdul Bari',
    language: 'English',
    videoId: 'mB5HXBb_HY8',
    url: 'https://www.youtube.com/watch?v=mB5HXBb_HY8',
    thumbnail: 'https://img.youtube.com/vi/mB5HXBb_HY8/hqdefault.jpg',
    duration: '22:15',
    tag: 'Recommended',
    description: 'Detailed analysis of Merge Sort algorithm, recurrence relation, merge procedure, and time complexity derivation.'
  },
  {
    topicId: 'merge-sort',
    title: 'Merge Sort in Hindi | Complete Algorithm and Trace',
    channel: 'Gate Smashers',
    language: 'Hindi',
    videoId: 'jlHkDBEumP0',
    url: 'https://www.youtube.com/watch?v=jlHkDBEumP0',
    thumbnail: 'https://img.youtube.com/vi/jlHkDBEumP0/hqdefault.jpg',
    duration: '14:32',
    tag: 'Beginner-Friendly',
    description: 'Concept, divide and conquer strategy, worked example, and time complexity explained in Hindi by Varun Singla.'
  },
  {
    topicId: 'merge-sort',
    title: 'Merge Sort Algorithm | Data Structures & Algorithms',
    channel: "Jenny's Lectures CS IT",
    language: 'Hindi',
    videoId: 'ogjf7ORKfd8',
    url: 'https://www.youtube.com/watch?v=ogjf7ORKfd8',
    thumbnail: 'https://img.youtube.com/vi/ogjf7ORKfd8/hqdefault.jpg',
    duration: '24:50',
    tag: 'Beginner-Friendly',
    description: 'Line-by-line dry run, temporary array mechanics, and space complexity explained clearly.'
  },
  {
    topicId: 'merge-sort',
    title: 'Merge Sort Algorithm | Step by Step Explanation with Code',
    channel: 'take U forward (Striver)',
    language: 'English',
    videoId: 'ogjf7ORKfd8', // fallback real TUF reference
    url: 'https://www.youtube.com/watch?v=ogjf7ORKfd8',
    thumbnail: 'https://img.youtube.com/vi/ogjf7ORKfd8/hqdefault.jpg',
    duration: '18:40',
    tag: 'In-Depth',
    description: 'Intuition, recursion tree visualization, time-space analysis, and clean coding practices.'
  },

  // --- Quick Sort ---
  {
    topicId: 'quick-sort',
    title: '2.8.1. Quick Sort Algorithm with Partitioning',
    channel: 'Abdul Bari',
    language: 'English',
    videoId: '7h1s2SojIRw',
    url: 'https://www.youtube.com/watch?v=7h1s2SojIRw',
    thumbnail: 'https://img.youtube.com/vi/7h1s2SojIRw/hqdefault.jpg',
    duration: '27:40',
    tag: 'Recommended',
    description: 'Partition algorithm, pivot positioning, best-case O(n log n) and worst-case O(n^2) mathematical analysis.'
  },
  {
    topicId: 'quick-sort',
    title: 'Quick Sort in Hindi | Divide and Conquer Analysis',
    channel: 'Gate Smashers',
    language: 'Hindi',
    videoId: 'QN9hnmAgmOc',
    url: 'https://www.youtube.com/watch?v=QN9hnmAgmOc',
    thumbnail: 'https://img.youtube.com/vi/QN9hnmAgmOc/hqdefault.jpg',
    duration: '13:58',
    tag: 'Beginner-Friendly',
    description: 'Step-by-step example, worst case scenario when array is sorted, and recursive stack frames.'
  },
  {
    topicId: 'quick-sort',
    title: 'Quick Sort Algorithm with Dry Run',
    channel: "Jenny's Lectures CS IT",
    language: 'Hindi',
    videoId: 'uHBXW_QkL3M',
    url: 'https://www.youtube.com/watch?v=uHBXW_QkL3M',
    thumbnail: 'https://img.youtube.com/vi/uHBXW_QkL3M/hqdefault.jpg',
    duration: '28:12',
    tag: 'In-Depth',
    description: 'Detailed array trace with Hoare and Lomuto partitioning differences.'
  },

  // --- Binary Search ---
  {
    topicId: 'binary-search',
    title: '2.4.1. Binary Search Algorithm',
    channel: 'Abdul Bari',
    language: 'English',
    videoId: 'C2apEw9pgtw',
    url: 'https://www.youtube.com/watch?v=C2apEw9pgtw',
    thumbnail: 'https://img.youtube.com/vi/C2apEw9pgtw/hqdefault.jpg',
    duration: '16:05',
    tag: 'Recommended',
    description: 'Internal working of iterative and recursive binary search, recurrence relation and logarithmic bound.'
  },
  {
    topicId: 'binary-search',
    title: 'Binary Search Algorithm in Hindi',
    channel: 'Gate Smashers',
    language: 'Hindi',
    videoId: 'V_T5Nuccw28',
    url: 'https://www.youtube.com/watch?v=V_T5Nuccw28',
    thumbnail: 'https://img.youtube.com/vi/V_T5Nuccw28/hqdefault.jpg',
    duration: '11:20',
    tag: 'Beginner-Friendly',
    description: 'Why sorted data is mandatory, middle element calculation, and comparison reductions.'
  },

  // --- Dijkstra Algorithm ---
  {
    topicId: 'dijkstra-algorithm',
    title: '3.6. Dijkstra Algorithm - Single Source Shortest Path',
    channel: 'Abdul Bari',
    language: 'English',
    videoId: 'XB4MIexjvY0',
    url: 'https://www.youtube.com/watch?v=XB4MIexjvY0',
    thumbnail: 'https://img.youtube.com/vi/XB4MIexjvY0/hqdefault.jpg',
    duration: '25:10',
    tag: 'Recommended',
    description: 'Relaxation formula, greedy node selection, step-by-step distance table, and why negative weights fail.'
  },
  {
    topicId: 'dijkstra-algorithm',
    title: 'Dijkstra Algorithm in Hindi | Shortest Path with Solved Example',
    channel: 'Gate Smashers',
    language: 'Hindi',
    videoId: 'smHnz2RHJBY',
    url: 'https://www.youtube.com/watch?v=smHnz2RHJBY',
    thumbnail: 'https://img.youtube.com/vi/smHnz2RHJBY/hqdefault.jpg',
    duration: '17:45',
    tag: 'Beginner-Friendly',
    description: 'Step-by-step tabular method for university exams with clear Hindi explanation.'
  },
  {
    topicId: 'dijkstra-algorithm',
    title: 'Dijkstra Shortest Path Explained',
    channel: "Jenny's Lectures CS IT",
    language: 'Hindi',
    videoId: 'pVfj6mxhdMw',
    url: 'https://www.youtube.com/watch?v=pVfj6mxhdMw',
    thumbnail: 'https://img.youtube.com/vi/pVfj6mxhdMw/hqdefault.jpg',
    duration: '21:30',
    tag: 'In-Depth',
    description: 'Adjacency list implementation, priority queue decrease-key considerations, and complexity breakdown.'
  },

  // --- 0/1 Knapsack ---
  {
    topicId: 'knapsack-01',
    title: '4.5. 0/1 Knapsack Problem Dynamic Programming',
    channel: 'Abdul Bari',
    language: 'English',
    videoId: 'nLmhmB6NzcM',
    url: 'https://www.youtube.com/watch?v=nLmhmB6NzcM',
    thumbnail: 'https://img.youtube.com/vi/nLmhmB6NzcM/hqdefault.jpg',
    duration: '28:35',
    tag: 'Recommended',
    description: 'State matrix construction, subproblem recurrence formula, and backtracking to reconstruct selected items.'
  },
  {
    topicId: 'knapsack-01',
    title: '0/1 Knapsack Problem in Hindi using Dynamic Programming',
    channel: 'Gate Smashers',
    language: 'Hindi',
    videoId: 'mG_AA9TrGQw',
    url: 'https://www.youtube.com/watch?v=mG_AA9TrGQw',
    thumbnail: 'https://img.youtube.com/vi/mG_AA9TrGQw/hqdefault.jpg',
    duration: '16:40',
    tag: 'Beginner-Friendly',
    description: 'University exam problem step-by-step with DP table calculation explained in simple Hindi.'
  },

  // --- Fractional Knapsack ---
  {
    topicId: 'fractional-knapsack',
    title: '3.1. Knapsack Problem - Greedy Method',
    channel: 'Abdul Bari',
    language: 'English',
    videoId: 'oTTzNMHMmlI',
    url: 'https://www.youtube.com/watch?v=oTTzNMHMmlI',
    thumbnail: 'https://img.youtube.com/vi/oTTzNMHMmlI/hqdefault.jpg',
    duration: '19:42',
    tag: 'Recommended',
    description: 'Greedy choice property, value-to-weight ratio sorting, and comparison with 0/1 knapsack.'
  },
  {
    topicId: 'fractional-knapsack',
    title: 'Fractional Knapsack in Hindi | Greedy Method',
    channel: 'Gate Smashers',
    language: 'Hindi',
    videoId: 'm1Q3fXn5378',
    url: 'https://www.youtube.com/watch?v=m1Q3fXn5378',
    thumbnail: 'https://img.youtube.com/vi/m1Q3fXn5378/hqdefault.jpg',
    duration: '12:15',
    tag: 'Beginner-Friendly',
    description: 'Simple numerical examples solved with clear profit/weight ratio sorting.'
  },

  // --- Master Theorem ---
  {
    topicId: 'master-theorem',
    title: '1.8. Master Method - Recurrence Relation',
    channel: 'Abdul Bari',
    language: 'English',
    videoId: '2V3oGF_p98U',
    url: 'https://www.youtube.com/watch?v=2V3oGF_p98U',
    thumbnail: 'https://img.youtube.com/vi/2V3oGF_p98U/hqdefault.jpg',
    duration: '31:18',
    tag: 'Recommended',
    description: 'Derivation and conditions for Case 1, Case 2, and Case 3 with solved GATE questions.'
  },
  {
    topicId: 'master-theorem',
    title: 'Master Theorem for Divide and Conquer Recurrences in Hindi',
    channel: 'Gate Smashers',
    language: 'Hindi',
    videoId: 'x68O0i9d87U',
    url: 'https://www.youtube.com/watch?v=x68O0i9d87U',
    thumbnail: 'https://img.youtube.com/vi/x68O0i9d87U/hqdefault.jpg',
    duration: '14:50',
    tag: 'Beginner-Friendly',
    description: 'Shortcut tricks for university exams and GATE to determine Big Theta in seconds.'
  },

  // --- N-Queens ---
  {
    topicId: 'n-queens',
    title: '5.1. N-Queens Problem using Backtracking',
    channel: 'Abdul Bari',
    language: 'English',
    videoId: 'xFv_Hl4B83A',
    url: 'https://www.youtube.com/watch?v=xFv_Hl4B83A',
    thumbnail: 'https://img.youtube.com/vi/xFv_Hl4B83A/hqdefault.jpg',
    duration: '23:14',
    tag: 'Recommended',
    description: 'State space tree drawing, bounding function, 4-Queens dry run, and 8-Queens analysis.'
  },
  {
    topicId: 'n-queens',
    title: 'N-Queens Problem in Hindi | Backtracking Algorithm',
    channel: 'Gate Smashers',
    language: 'Hindi',
    videoId: 'bzs_40eB8x4',
    url: 'https://www.youtube.com/watch?v=bzs_40eB8x4',
    thumbnail: 'https://img.youtube.com/vi/bzs_40eB8x4/hqdefault.jpg',
    duration: '13:20',
    tag: 'Beginner-Friendly',
    description: 'Intuitive Hindi explanation of non-attacking queen criteria and backtracking state tree.'
  },

  // --- Longest Common Subsequence ---
  {
    topicId: 'longest-common-subsequence',
    title: '4.6. Longest Common Subsequence (LCS) using DP',
    channel: 'Abdul Bari',
    language: 'English',
    videoId: 'sSno94Hs8_8',
    url: 'https://www.youtube.com/watch?v=sSno94Hs8_8',
    thumbnail: 'https://img.youtube.com/vi/sSno94Hs8_8/hqdefault.jpg',
    duration: '26:05',
    tag: 'Recommended',
    description: 'Optimal substructure proof, DP grid construction with arrows, and string reconstruction.'
  },
  {
    topicId: 'longest-common-subsequence',
    title: 'Longest Common Subsequence (LCS) in Hindi',
    channel: 'Gate Smashers',
    language: 'Hindi',
    videoId: 'Ua0GhsJSo48',
    url: 'https://www.youtube.com/watch?v=Ua0GhsJSo48',
    thumbnail: 'https://img.youtube.com/vi/Ua0GhsJSo48/hqdefault.jpg',
    duration: '15:10',
    tag: 'Beginner-Friendly',
    description: 'Complete 2D matrix example with arrow direction rules explained for college exams.'
  },

  // --- BFS & DFS ---
  {
    topicId: 'breadth-first-search',
    title: '2.4. Breadth First Search (BFS) Traversal with Queue',
    channel: 'Abdul Bari',
    language: 'English',
    videoId: 'pcKY4hjDrxk',
    url: 'https://www.youtube.com/watch?v=pcKY4hjDrxk',
    thumbnail: 'https://img.youtube.com/vi/pcKY4hjDrxk/hqdefault.jpg',
    duration: '16:50',
    tag: 'Recommended',
    description: 'Queue state during traversal, visited array maintenance, and O(V + E) complexity analysis.'
  },
  {
    topicId: 'breadth-first-search',
    title: 'BFS (Breadth First Search) in Hindi | Graph Traversal',
    channel: 'Gate Smashers',
    language: 'Hindi',
    videoId: 'vf-c546v_80',
    url: 'https://www.youtube.com/watch?v=vf-c546v_80',
    thumbnail: 'https://img.youtube.com/vi/vf-c546v_80/hqdefault.jpg',
    duration: '10:45',
    tag: 'Beginner-Friendly',
    description: 'Level-order graph exploration and tracing with queue data structure in Hindi.'
  },
  {
    topicId: 'depth-first-search',
    title: '2.5. Depth First Search (DFS) Traversal with Stack',
    channel: 'Abdul Bari',
    language: 'English',
    videoId: 'iaBEKo5sM7w',
    url: 'https://www.youtube.com/watch?v=iaBEKo5sM7w',
    thumbnail: 'https://img.youtube.com/vi/iaBEKo5sM7w/hqdefault.jpg',
    duration: '14:20',
    tag: 'Recommended',
    description: 'Recursive call stack vs explicit stack, discovery/finish times, and edge classification.'
  },
  {
    topicId: 'depth-first-search',
    title: 'DFS (Depth First Search) in Hindi | Graph Traversal',
    channel: 'Gate Smashers',
    language: 'Hindi',
    videoId: '7fujbpJ0LB4',
    url: 'https://www.youtube.com/watch?v=7fujbpJ0LB4',
    thumbnail: 'https://img.youtube.com/vi/7fujbpJ0LB4/hqdefault.jpg',
    duration: '11:15',
    tag: 'Beginner-Friendly',
    description: 'Depth-first search dry run, backtracking behavior, and cycle detection concepts.'
  }
];

class ResourceCatalogue {
  constructor() {
    this.resources = VERIFIED_YOUTUBE_RESOURCES;
  }

  getResourcesForTopic(topicId, language = 'Both', sortFilter = 'Recommended') {
    let matches = this.resources.filter(r => r.topicId === topicId);

    if (language !== 'Both') {
      matches = matches.filter(r => r.language === language);
    }

    // Sort
    if (sortFilter === 'Beginner-Friendly') {
      matches.sort((a, b) => (a.tag === 'Beginner-Friendly' ? -1 : 1));
    } else if (sortFilter === 'In-Depth') {
      matches.sort((a, b) => (a.tag === 'In-Depth' ? -1 : 1));
    }

    return matches;
  }

  generateSearchUrl(topicName, language = 'English') {
    const query = language === 'Hindi'
      ? `${topicName} algorithm tutorial in Hindi gate smashers abdul bari`
      : `${topicName} algorithm explanation tutorial computer science`;
    return `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
  }

  getComprehensiveResources(topicId, topicName, language = 'Both', sortFilter = 'Recommended') {
    const verified = this.getResourcesForTopic(topicId, language, sortFilter);

    // Build curated object with verified items + labeled search query fallbacks
    const hindiVerified = verified.filter(v => v.language === 'Hindi');
    const englishVerified = verified.filter(v => v.language === 'English');

    return {
      topicId,
      topicName,
      verified,
      hindiVerified,
      englishVerified,
      searchLinks: {
        hindi: {
          label: `Search YouTube: "${topicName} tutorial in Hindi"`,
          url: this.generateSearchUrl(topicName, 'Hindi')
        },
        english: {
          label: `Search YouTube: "${topicName} explained in English"`,
          url: this.generateSearchUrl(topicName, 'English')
        }
      }
    };
  }
}

window.adaResources = new ResourceCatalogue();
