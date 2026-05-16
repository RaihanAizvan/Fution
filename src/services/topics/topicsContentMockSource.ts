import type { TopicContent } from './topicContentService'

const mockTopicContent: Record<string, TopicContent> = {
  'variables': {
    topic: {
      slug: 'variables',
      title: 'Variables',
      isActive: true
    },
    markdown: `# Variables

Variables are containers for storing data values.

## Declaring Variables

Use \`let\` or \`const\` to declare variables:

\`\`\`javascript
let name = "John";
const age = 25;
\`\`\`

## Variable Types

JavaScript has different data types:

- **String**: Text values
- **Number**: Numeric values
- **Boolean**: true/false values
- **Array**: Ordered collections
- **Object**: Key-value pairs

## Best Practices

- Use \`const\` by default
- Use descriptive names
- Avoid global variables when possible`,
    html: `<h1>Variables</h1>
<p>Variables are containers for storing data values.</p>
<h2>Declaring Variables</h2>
<p>Use <code>let</code> or <code>const</code> to declare variables:</p>
<pre><code class="language-javascript">let name = "John";
const age = 25;</code></pre>
<h2>Variable Types</h2>
<p>JavaScript has different data types:</p>
<ul>
<li><strong>String</strong>: Text values</li>
<li><strong>Number</strong>: Numeric values</li>
<li><strong>Boolean</strong>: true/false values</li>
<li><strong>Array</strong>: Ordered collections</li>
<li><strong>Object</strong>: Key-value pairs</li>
</ul>
<h2>Best Practices</h2>
<ul>
<li>Use <code>const</code> by default</li>
<li>Use descriptive names</li>
<li>Avoid global variables when possible</li>
</ul>`
  },
  'functions': {
    topic: {
      slug: 'functions',
      title: 'Functions',
      isActive: true
    },
    markdown: `# Functions

Functions are reusable blocks of code that perform specific tasks.

## Function Declaration

\`\`\`javascript
function greet(name) {
  return \`Hello, \${name}!\`;
}
\`\`\`

## Arrow Functions

\`\`\`javascript
const greet = (name) => \`Hello, \${name}!\`;
\`\`\`

## Function Parameters

Functions can accept parameters:

\`\`\`javascript
function add(a, b) {
  return a + b;
}
\`\`\`

## Return Values

Functions can return values using the \`return\` statement.`,
    html: `<h1>Functions</h1>
<p>Functions are reusable blocks of code that perform specific tasks.</p>
<h2>Function Declaration</h2>
<pre><code class="language-javascript">function greet(name) {
  return \`Hello, \${name}!\`;
}</code></pre>
<h2>Arrow Functions</h2>
<pre><code class="language-javascript">const greet = (name) => \`Hello, \${name}!\`;</code></pre>
<h2>Function Parameters</h2>
<p>Functions can accept parameters:</p>
<pre><code class="language-javascript">function add(a, b) {
  return a + b;
}</code></pre>
<h2>Return Values</h2>
<p>Functions can return values using the <code>return</code> statement.</p>`
  },
  'closures': {
    topic: {
      slug: 'closures',
      title: 'Closures',
      isActive: true
    },
    markdown: `# Closures

A closure is a function that has access to variables in its outer scope.

## Basic Example

\`\`\`javascript
function outerFunction() {
  let count = 0;

  function innerFunction() {
    count++;
    return count;
  }

  return innerFunction;
}

const counter = outerFunction();
console.log(counter()); // 1
console.log(counter()); // 2
\`\`\`

## Practical Use Cases

- Data privacy
- Event handlers
- Callbacks
- Module pattern

## Key Concept

Closures "remember" the environment in which they were created.`,
    html: `<h1>Closures</h1>
<p>A closure is a function that has access to variables in its outer scope.</p>
<h2>Basic Example</h2>
<pre><code class="language-javascript">function outerFunction() {
  let count = 0;

  function innerFunction() {
    count++;
    return count;
  }

  return innerFunction;
}

const counter = outerFunction();
console.log(counter()); // 1
console.log(counter()); // 2</code></pre>
<h2>Practical Use Cases</h2>
<ul>
<li>Data privacy</li>
<li>Event handlers</li>
<li>Callbacks</li>
<li>Module pattern</li>
</ul>
<h2>Key Concept</h2>
<p>Closures "remember" the environment in which they were created.</p>`
  }
}

export const createMockTopicContentSource = () => ({
  async getTopicContent(slug: string): Promise<TopicContent> {
    const content = mockTopicContent[slug]
    if (!content) {
      throw new Error('Content not found')
    }
    return content
  }
})