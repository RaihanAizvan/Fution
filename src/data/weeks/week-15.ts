import type { WeekData } from '../types'

export const week15Data: WeekData = {
  weekKey: 'week15',
  weekNumber: 15,
  title: 'DSA - 3',
  subtitle: 'Advanced DSA',
  
  topics: [
    {
      type: 'heading',
      title: 'Advanced Data Structures'
    },
    {
      title: 'Trees - Binary Trees',
      difficulty: 'Intermediate',
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">
        Tell the reviewer: A binary tree is a hierarchical data structure where each node has at most two children.
      </blockquote>
      <div class="space-y-3 text-gray-300">
        <p>Key concepts:</p>
        <ul class="list-disc list-inside ml-4">
          <li>Root, Parent, Child nodes</li>
          <li>Leaf nodes (no children)</li>
          <li>Height and Depth of tree</li>
          <li>Binary Search Tree (BST) properties</li>
        </ul>
      </div>`
    },
    {
      title: 'Tree Traversals',
      difficulty: 'Intermediate',
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">
        Tell the reviewer: Tree traversal means visiting all nodes in a specific order. There are three main types.
      </blockquote>
      <div class="space-y-3 text-gray-300">
        <p>Traversal types:</p>
        <ul class="list-disc list-inside ml-4">
          <li><strong>Inorder</strong> (Left, Root, Right) - gives sorted order in BST</li>
          <li><strong>Preorder</strong> (Root, Left, Right) - used for copying trees</li>
          <li><strong>Postorder</strong> (Left, Right, Root) - used for deleting trees</li>
          <li><strong>Level Order</strong> - breadth-first traversal</li>
        </ul>
      </div>`
    },
    {
      title: 'Graphs - Representation',
      difficulty: 'Advanced',
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">
        Tell the reviewer: Graphs consist of vertices (nodes) connected by edges. They can represent networks, relationships, and paths.
      </blockquote>
      <div class="space-y-3 text-gray-300">
        <p>Graph representations:</p>
        <ul class="list-disc list-inside ml-4">
          <li><strong>Adjacency Matrix</strong> - 2D array, good for dense graphs</li>
          <li><strong>Adjacency List</strong> - Array of lists, good for sparse graphs</li>
        </ul>
        <div class="bg-gray-900 text-sm p-4 rounded-xl border border-gray-700">
          <pre><code class="text-white">// Adjacency List
const graph = {
  0: [1, 2],
  1: [0, 3],
  2: [0, 3],
  3: [1, 2]
};</code></pre>
        </div>
      </div>`
    },
    {
      title: 'Graph Traversals - DFS and BFS',
      difficulty: 'Advanced',
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">
        Tell the reviewer: DFS and BFS are fundamental graph traversal algorithms used to explore all vertices.
      </blockquote>
      <div class="space-y-3 text-gray-300">
        <p>Comparison:</p>
        <ul class="list-disc list-inside ml-4">
          <li><strong>DFS (Depth-First Search)</strong> - Uses stack, goes deep first</li>
          <li><strong>BFS (Breadth-First Search)</strong> - Uses queue, explores level by level</li>
        </ul>
        <p>BFS is used for shortest path in unweighted graphs.</p>
      </div>`
    },
    {
      type: 'heading',
      title: 'Advanced Algorithms'
    },
    {
      title: 'Dynamic Programming Basics',
      difficulty: 'Advanced',
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">
        Tell the reviewer: Dynamic Programming solves problems by breaking them into overlapping subproblems. It stores results to avoid redundant calculations.
      </blockquote>
      <div class="space-y-3 text-gray-300">
        <p>Key concepts:</p>
        <ul class="list-disc list-inside ml-4">
          <li><strong>Memoization</strong> - Top-down approach with caching</li>
          <li><strong>Tabulation</strong> - Bottom-up approach with table</li>
          <li>Optimal substructure property</li>
          <li>Overlapping subproblems</li>
        </ul>
        <p>Classic examples: Fibonacci, Knapsack, Longest Common Subsequence</p>
      </div>`
    },
    {
      title: 'Greedy Algorithms',
      difficulty: 'Intermediate → Advanced',
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">
        Tell the reviewer: Greedy algorithms make locally optimal choices at each step, hoping to find a global optimum.
      </blockquote>
      <div class="space-y-3 text-gray-300">
        <p>Characteristics:</p>
        <ul class="list-disc list-inside ml-4">
          <li>Make the best choice at each step</li>
          <li>Never reconsider previous choices</li>
          <li>Simpler than dynamic programming</li>
          <li>Doesn't always give optimal solution</li>
        </ul>
        <p>Examples: Activity Selection, Huffman Coding, Dijkstra's Algorithm</p>
      </div>`
    },
    {
      title: 'Backtracking',
      difficulty: 'Advanced',
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">
        Tell the reviewer: Backtracking is a technique to find all solutions by trying possibilities and abandoning ("backtracking") when constraints are violated.
      </blockquote>
      <div class="space-y-3 text-gray-300">
        <p>Approach:</p>
        <ul class="list-disc list-inside ml-4">
          <li>Build solution incrementally</li>
          <li>Abandon solution if constraints violated</li>
          <li>Try all possibilities recursively</li>
        </ul>
        <p>Classic problems: N-Queens, Sudoku Solver, Permutations, Subsets</p>
      </div>`
    },
    {
      title: 'Heap Data Structure',
      difficulty: 'Intermediate → Advanced',
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">
        Tell the reviewer: A heap is a complete binary tree that satisfies the heap property. Used for priority queues.
      </blockquote>
      <div class="space-y-3 text-gray-300">
        <p>Types:</p>
        <ul class="list-disc list-inside ml-4">
          <li><strong>Max Heap</strong> - Parent ≥ Children</li>
          <li><strong>Min Heap</strong> - Parent ≤ Children</li>
        </ul>
        <p>Operations: Insert O(log n), Extract-Max/Min O(log n), Peek O(1)</p>
        <p>Used in: Heap Sort, Priority Queue, Dijkstra's Algorithm</p>
      </div>`
    }
  ],
  
  proTips: [
    { text: "Practice on LeetCode, HackerRank, or CodeForces daily. Start with easy problems and gradually increase difficulty.", color: "green" },
    { text: "Master the basics before jumping to advanced topics. Strong foundation in arrays, strings, and linked lists is crucial.", color: "blue" },
    { text: "Draw diagrams! Visualizing trees, graphs, and recursion trees helps understand the problem better.", color: "blue" },
    { text: "Learn to identify problem patterns: Two Pointers, Sliding Window, Fast & Slow Pointers, etc. Many problems follow similar patterns.", color: "green" },
    { text: "Time and space complexity matter! Always analyze your solution's Big O notation. Interviewers expect this.", color: "red" },
    { text: "Don't just memorize solutions. Understand the 'why' behind each algorithm. This helps in solving variations.", color: "blue" },
    { text: "Use recursion wisely. Sometimes iterative solutions are better. Consider stack space for recursive calls.", color: "blue" },
    { text: "For graph problems, always clarify: Is it directed or undirected? Weighted or unweighted? Connected or disconnected?", color: "green" }
  ],
  
  practicals: []
}
