import type { WeekData } from '../types'

export const week4Data: WeekData = {
  weekKey: 'week4',
  weekNumber: 4,
  title: 'Node JS & Express',
  subtitle: 'The Backend World',
  
  topics: [
    {
      type: 'heading',
      title: 'Node.js Fundamentals'
    },
    {
      title: 'What is Node.js?',
      difficulty: 'Beginner',
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">
        Tell the reviewer: Node.js is a JavaScript runtime built on Chrome's V8 engine. It allows JavaScript to run on the server side.
      </blockquote>
      <div class="space-y-3 text-gray-300">
        <p>Node.js enables:</p>
        <ul class="list-disc list-inside ml-4">
          <li>Server-side JavaScript execution</li>
          <li>Building scalable network applications</li>
          <li>Non-blocking, event-driven architecture</li>
        </ul>
      </div>`
    },
    {
      title: 'NPM (Node Package Manager)',
      difficulty: 'Beginner',
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">
        Tell the reviewer: NPM is the package manager for Node.js. It helps manage project dependencies.
      </blockquote>
      <div class="space-y-3 text-gray-300">
        <p>Common NPM commands:</p>
        <div class="bg-gray-900 text-sm p-4 rounded-xl border border-gray-700">
          <pre><code class="text-white">npm init -y
npm install express
npm install --save-dev nodemon</code></pre>
        </div>
      </div>`
    },
    {
      type: 'heading',
      title: 'Express.js Basics'
    },
    {
      title: 'Setting up Express Server',
      difficulty: 'Beginner',
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">
        Tell the reviewer: Express is a minimal web framework for Node.js. It simplifies building web servers and APIs.
      </blockquote>
      <div class="space-y-3 text-gray-300">
        <p>Basic Express server:</p>
        <div class="bg-gray-900 text-sm p-4 rounded-xl border border-gray-700">
          <pre><code class="text-white">const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});</code></pre>
        </div>
      </div>`
    },
    {
      title: 'Express Routing',
      difficulty: 'Intermediate',
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">
        Tell the reviewer: Routes define how an application responds to client requests at specific endpoints.
      </blockquote>
      <div class="space-y-3 text-gray-300">
        <p>Different HTTP methods:</p>
        <div class="bg-gray-900 text-sm p-4 rounded-xl border border-gray-700">
          <pre><code class="text-white">app.get('/users', (req, res) => { /* GET */ });
app.post('/users', (req, res) => { /* POST */ });
app.put('/users/:id', (req, res) => { /* UPDATE */ });
app.delete('/users/:id', (req, res) => { /* DELETE */ });</code></pre>
        </div>
      </div>`
    },
    {
      title: 'Middleware in Express',
      difficulty: 'Intermediate',
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">
        Tell the reviewer: Middleware functions have access to request and response objects. They execute during the request-response cycle.
      </blockquote>
      <div class="space-y-3 text-gray-300">
        <p>Common middleware:</p>
        <div class="bg-gray-900 text-sm p-4 rounded-xl border border-gray-700">
          <pre><code class="text-white">app.use(express.json()); // Parse JSON
app.use(express.urlencoded({ extended: true }));

// Custom middleware
app.use((req, res, next) => {
  console.log('Request:', req.method, req.path);
  next();
});</code></pre>
        </div>
      </div>`
    },
    {
      title: 'REST API Design',
      difficulty: 'Intermediate',
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">
        Tell the reviewer: REST APIs use HTTP methods to perform CRUD operations. They follow a stateless architecture.
      </blockquote>
      <div class="space-y-3 text-gray-300">
        <p>RESTful principles:</p>
        <ul class="list-disc list-inside ml-4">
          <li>Use proper HTTP methods (GET, POST, PUT, DELETE)</li>
          <li>Use meaningful endpoint names</li>
          <li>Return appropriate status codes</li>
          <li>Use JSON for data exchange</li>
        </ul>
      </div>`
    }
  ],
  
  proTips: [
    { text: "Always use <code>nodemon</code> during development. It automatically restarts your server when files change. Install with <code>npm install -D nodemon</code>.", color: "blue" },
    { text: "Use environment variables for sensitive data like API keys and database credentials. Install <code>dotenv</code> package to manage them.", color: "green" },
    { text: "Learn async/await for cleaner asynchronous code. It makes your Node.js code more readable than callbacks or promises.", color: "blue" },
    { text: "Use Express Router to organize your routes. Create separate route files for different resources (users, posts, etc.).", color: "blue" },
    { text: "Always validate and sanitize user input on the server side. Never trust client-side validation alone!", color: "red" },
    { text: "Use CORS middleware to handle cross-origin requests. Install with <code>npm install cors</code> and use <code>app.use(cors())</code>.", color: "blue" }
  ],
  
  practicals: []
}
