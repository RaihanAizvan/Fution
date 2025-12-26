import type { WeekData } from '../types'

export const week1Data: WeekData = {
  weekKey: 'week1',
  weekNumber: 1,
  title: 'HTML & CSS',
  subtitle: 'Fundamentals',
  
  topics: [
    {
      title: "Understand what HTML stands for (Hypertext Markup Language)",
      difficulty: "Beginner",
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">Tell the reviewer: HTML is used to build the structure of webpages. It is the first thing we learn in web development.</blockquote>
      <div class="space-y-3 text-gray-300">
        <p>HTML is the <span class="text-blue-400 font-semibold">skeleton of the web</span>. It defines the structure of a webpage using <span class="text-yellow-400">tags</span>.</p>
        <p class="text-green-400">Hypertext</p> refers to text that links to other content.
        <p class="text-pink-400">Markup</p> is how we describe structure and layout using tags.
        <div class="bg-gray-900 text-sm p-4 rounded-xl border border-gray-700">
          <pre><code class="text-white">&lt;!DOCTYPE html&gt;
&lt;html&gt;
  &lt;head&gt;
    &lt;title&gt;My First Page&lt;/title&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;h1&gt;Hello World&lt;/h1&gt;
  &lt;/body&gt;
&lt;/html&gt;</code></pre>
        </div>
      </div>`
    },
    {
      title: "Learn about the basic structure of an HTML document (DOCTYPE, <html>, <head>, and <body>)",
      difficulty: "Beginner",
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">Tell the reviewer: The HTML structure helps browser understand our webpage. DOCTYPE tells it's HTML5, head holds info, body shows visible content.</blockquote>
      <div class="space-y-3 text-gray-300">
        <p>An HTML document starts with a <span class="text-yellow-300">DOCTYPE</span> declaration, which tells the browser you're writing HTML5.</p>
        <p>Inside the <span class="text-blue-400">&lt;html&gt;</span> tag, you'll find two core sections:</p>
        <ul class="list-disc list-inside ml-4">
          <li><span class="text-green-400">&lt;head&gt;</span> - metadata, links to CSS, title, etc.</li>
          <li><span class="text-green-400">&lt;body&gt;</span> - the visible part of your webpage</li>
        </ul>
        <div class="bg-gray-900 text-sm p-4 rounded-xl border border-gray-700">
          <pre><code class="text-white">&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
  &lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;title&gt;Fution Project&lt;/title&gt;
  &lt;/head&gt;
  &lt;body class="bg-gray-950 text-white"&gt;
    &lt;h1&gt;Let's Learn HTML!&lt;/h1&gt;
  &lt;/body&gt;
&lt;/html&gt;</code></pre>
        </div>
      </div>`
    },
    {
      title: "Explore self-closing tags (e.g., <img>, <input>)",
      difficulty: "Beginner",
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">Tell the reviewer: Some tags don't need closing. They are used alone like img or input. Very common in forms and UI.</blockquote>
      <div class="space-y-3 text-gray-300">
        <p>Some HTML tags don't need a closing tag. They're like <span class="text-pink-400 font-bold">solo players</span>.</p>
        <ul class="list-disc list-inside ml-4">
          <li><span class="text-yellow-300">&lt;img&gt;</span> - Displays an image</li>
          <li><span class="text-yellow-300">&lt;input&gt;</span> - Used in forms</li>
          <li><span class="text-yellow-300">&lt;br&gt;</span> - Line break</li>
        </ul>
        <p>Self-closing format:</p>
        <div class="bg-gray-900 text-sm p-4 rounded-xl border border-gray-700">
          <pre><code class="text-white">&lt;img src="fution-logo.png" alt="Fution Logo" /&gt;
&lt;input type="text" placeholder="Type here..." class="p-2 rounded" /&gt;</code></pre>
        </div>
      </div>`
    },
    {
      title: "Understand the concept of content, padding, border, and margin in the CSS Box Model",
      difficulty: "Beginner",
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">Tell the reviewer: CSS box model explains the full size of any element. It includes content, padding, border and margin.</blockquote>
      <div class="space-y-3 text-gray-300">
        <p>The Box Model is how elements are structured on the page:</p>
        <ul class="list-disc list-inside ml-4">
          <li><span class="text-yellow-300">Content</span> - the actual text/image</li>
          <li><span class="text-yellow-300">Padding</span> - space around content</li>
          <li><span class="text-yellow-300">Border</span> - the border around padding</li>
          <li><span class="text-yellow-300">Margin</span> - space outside the border</li>
        </ul>
        <div class="bg-gray-800 rounded-xl p-6 w-fit mx-auto">
          <div class="bg-white p-8 border-4 border-yellow-400 m-4 text-black text-center">
            <p class="text-sm">This is content</p>
          </div>
        </div>
        <p class="text-sm text-gray-400">Visualized using Tailwind: <code>p-8 border-4 m-4</code></p>
      </div>`
    },
    {
      title: "Learn how to display flex and its properties (justify-content, align-items, etc.)",
      difficulty: "Intermediate",
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">Tell the reviewer: Flexbox makes aligning items easy. We use Flexbox for managing complex UI to simple maintainable structures. We use justify-content and align-items for control.</blockquote>
      <div class="space-y-3 text-gray-300">
        <p>Flexbox arranges items in a row or column:</p>
        <div class="flex justify-between items-center bg-gray-800 p-4 rounded-xl">
          <div class="bg-blue-500 text-white p-2 rounded">1</div>
          <div class="bg-blue-500 text-white p-2 rounded">2</div>
        </div>
        <div class="bg-gray-900 text-sm p-4 rounded-xl border border-gray-700">
          <pre><code class="text-white">.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}</code></pre>
        </div>
        <p class="text-sm text-gray-400">Key properties: <code>justify-content</code>, <code>align-items</code>, <code>flex-direction</code>.</p>
      </div>`
    }
    // Note: Add remaining 35+ topics following the same pattern
    // Truncated for brevity - full data would be extracted from index.html
  ],
  
  proTips: [
    { text: "Don't forget to add comments to your code for better readability.", color: "blue" },
    { text: "Give importance to theory over practical in this week.", color: "blue" },
    { text: "Don't overuse styles like carousels, hover effects, tooltips, etc in your Project", color: "blue" },
    { text: "It's a simple week—aim for the green badge! 🏆", color: "green" },
    { text: "checkout resources like W3Schools and MDN for HTML learning. MDN may be tough for first use. But trust me guys you'll love it once you get used to it", color: "blue" },
    { text: "If you are absolute begginer new to HTML/css refer this video <a href='https://youtu.be/G3e-cpL7ofc?si=flNrXbhGQHWYdYpe' target='_blank' class='text-blue-500'>HTML Crash Course.</a> Do all the assignments he is mentioning even you feel that is too easy.", color: "blue" }
  ],
  
  practicals: [] // Week 1 has no practicals
}
