import type { WeekData } from '../types'

export const week3Data: WeekData = {
  weekKey: 'week3',
  weekNumber: 3,
  title: 'JAVASCRIPT',
  subtitle: 'Manipulation',
  
  topics: [
    // Note: Extract actual topics from week-3.html window.topics array
    // This is a placeholder structure showing the pattern
  ],
  
  proTips: [
    // Add JavaScript-specific pro tips here
  ],
  
  practicals: [
    {
      practicalTopic: "Check All Null Arguments",
      difficulty: "Intermediate",
      details: `
      <div class="space-y-4 text-gray-300">
        <section>
          <h3 class="text-lg font-semibold text-white mb-2">Problem Description</h3>
          <p>Write a function that checks if all arguments passed are null. If they are, throw an error with the message "All arguments are null."</p>
        </section>

        <section>
          <h3 class="text-lg font-semibold text-white mb-2">Examples</h3>
          <div class="space-y-3">
            <div class="bg-gray-900 p-3 rounded-lg border border-gray-700">
              <p><strong class="text-gray-400">Input:</strong> checkAllNull(null, null)</p>
              <p><strong class="text-gray-400">Output:</strong> Error: "All arguments are null."</p>
            </div>
            <div class="bg-gray-900 p-3 rounded-lg border border-gray-700">
              <p><strong class="text-gray-400">Input:</strong> checkAllNull(1, null)</p>
              <p><strong class="text-gray-400">Output:</strong> No error (at least one argument is not null)</p>
            </div>
          </div>
        </section>

        <section>
          <h3 class="text-lg font-semibold text-white mb-2">Solution</h3>
          <div class="bg-gray-900 p-4 rounded-lg border border-gray-700 overflow-x-auto">
            <pre><code class="language-js text-sm">
function checkAllNull(...args) {
  if (args.length > 0 && args.every(arg => arg === null)) {
    throw new Error("All arguments are null.");
  }
}

// try {
//   checkAllNull(null, null);
// } catch (e) {
//   console.error(e.message);
// }
            </code></pre>
          </div>
        </section>
      </div>
    `
    },
    {
      practicalTopic: "Sum of Digits Using Recursion",
      difficulty: "Intermediate",
      details: `
      <div class="space-y-4 text-gray-300">
        <section>
          <h3 class="text-lg font-semibold text-white mb-2">Problem Description</h3>
          <p>Write a recursive function that takes a non-negative integer and returns the sum of its digits. For example, the sum of digits for 123 is 1 + 2 + 3 = 6.</p>
        </section>

        <section>
          <h3 class="text-lg font-semibold text-white mb-2">Examples</h3>
          <div class="space-y-3">
            <div class="bg-gray-900 p-3 rounded-lg border border-gray-700">
              <p><strong class="text-gray-400">Input:</strong> 4321</p>
              <p><strong class="text-gray-400">Output:</strong> 10</p>
            </div>
            <div class="bg-gray-900 p-3 rounded-lg border border-gray-700">
              <p><strong class="text-gray-400">Input:</strong> 9</p>
              <p><strong class="text-gray-400">Output:</strong> 9</p>
            </div>
          </div>
        </section>

        <section>
          <h3 class="text-lg font-semibold text-white mb-2">Solution</h3>
          <div class="bg-gray-900 p-4 rounded-lg border border-gray-700 overflow-x-auto">
            <pre><code class="language-js text-sm">
function sumDigitsRecursively(n) {
  // Base case: if the number is a single digit, return it.
  if (n < 10) {
    return n;
  }
  
  // Recursive step:
  // Get the last digit with the modulo operator (n % 10).
  // Get the rest of the number by removing the last digit.
  const lastDigit = n % 10;
  const remainingDigits = Math.floor(n / 10);
  
  return lastDigit + sumDigitsRecursively(remainingDigits);
}
            </code></pre>
          </div>
        </section>
      </div>
    `
    }
  ]
}
