import type { WeekData } from '../types'

export const week5Data: WeekData = {
  weekKey: 'week5',
  weekNumber: 5,
  title: 'MongoDB',
  subtitle: 'Database',
  
  topics: [
    {
      type: 'heading',
      title: 'MongoDB Basics'
    },
    {
      title: 'What is MongoDB?',
      difficulty: 'Beginner',
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">
        Tell the reviewer: MongoDB is a NoSQL database that stores data in JSON-like documents. It's flexible and scalable.
      </blockquote>
      <div class="space-y-3 text-gray-300">
        <p>MongoDB features:</p>
        <ul class="list-disc list-inside ml-4">
          <li>Document-oriented database</li>
          <li>Schema-less structure</li>
          <li>Horizontal scalability</li>
          <li>Rich query language</li>
        </ul>
      </div>`
    },
    {
      title: 'Installing MongoDB',
      difficulty: 'Beginner',
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">
        Tell the reviewer: MongoDB can be installed locally or used via MongoDB Atlas (cloud).
      </blockquote>
      <div class="space-y-3 text-gray-300">
        <p>Installation options:</p>
        <ul class="list-disc list-inside ml-4">
          <li>Local: Download from <a href="https://www.mongodb.com/try/download/community" class="text-blue-400 hover:underline">MongoDB Community</a></li>
          <li>Cloud: Use <a href="https://www.mongodb.com/cloud/atlas" class="text-blue-400 hover:underline">MongoDB Atlas</a> (free tier available)</li>
        </ul>
      </div>`
    },
    {
      type: 'heading',
      title: 'Mongoose ODM'
    },
    {
      title: 'Connecting to MongoDB with Mongoose',
      difficulty: 'Beginner',
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">
        Tell the reviewer: Mongoose is an ODM (Object Data Modeling) library for MongoDB and Node.js.
      </blockquote>
      <div class="space-y-3 text-gray-300">
        <p>Connect to MongoDB:</p>
        <div class="bg-gray-900 text-sm p-4 rounded-xl border border-gray-700">
          <pre><code class="text-white">const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mydb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Connection error:', err));</code></pre>
        </div>
      </div>`
    },
    {
      title: 'Creating Mongoose Schemas',
      difficulty: 'Intermediate',
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">
        Tell the reviewer: Schemas define the structure of documents in a collection. They provide validation and type casting.
      </blockquote>
      <div class="space-y-3 text-gray-300">
        <p>Example schema:</p>
        <div class="bg-gray-900 text-sm p-4 rounded-xl border border-gray-700">
          <pre><code class="text-white">const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, min: 0 },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);</code></pre>
        </div>
      </div>`
    },
    {
      title: 'CRUD Operations with Mongoose',
      difficulty: 'Intermediate',
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">
        Tell the reviewer: CRUD stands for Create, Read, Update, Delete. These are the basic database operations.
      </blockquote>
      <div class="space-y-3 text-gray-300">
        <p>Basic CRUD operations:</p>
        <div class="bg-gray-900 text-sm p-4 rounded-xl border border-gray-700">
          <pre><code class="text-white">// Create
const user = await User.create({ name: 'John', email: 'john@example.com' });

// Read
const users = await User.find();
const user = await User.findById(id);

// Update
await User.findByIdAndUpdate(id, { name: 'Jane' });

// Delete
await User.findByIdAndDelete(id);</code></pre>
        </div>
      </div>`
    },
    {
      title: 'MongoDB Query Operators',
      difficulty: 'Intermediate',
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">
        Tell the reviewer: Query operators allow filtering and complex queries in MongoDB.
      </blockquote>
      <div class="space-y-3 text-gray-300">
        <p>Common operators:</p>
        <div class="bg-gray-900 text-sm p-4 rounded-xl border border-gray-700">
          <pre><code class="text-white">// Comparison
User.find({ age: { $gt: 18 } }); // greater than
User.find({ age: { $lte: 65 } }); // less than or equal

// Logical
User.find({ $or: [{ age: 18 }, { age: 21 }] });

// Array
User.find({ tags: { $in: ['javascript', 'node'] } });</code></pre>
        </div>
      </div>`
    },
    {
      type: 'heading',
      title: 'Core Fundamentals & Data Structure'
    },
    {
      title: 'SQL vs NoSQL Databases',
      difficulty: 'Beginner',
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">
        Tell the reviewer: SQL and NoSQL are two different approaches to database design. Understanding their differences helps choose the right database for your project.
      </blockquote>
      <div class="space-y-3 text-gray-300">
        <p><strong class="text-blue-400">SQL Databases (Relational):</strong></p>
        <ul class="list-disc list-inside ml-4">
          <li>Structured data with fixed schemas</li>
          <li>Tables with rows and columns</li>
          <li>Use SQL query language</li>
          <li>ACID transactions (Atomicity, Consistency, Isolation, Durability)</li>
          <li>Vertical scaling (increase server power)</li>
          <li>Examples: MySQL, PostgreSQL, SQL Server</li>
        </ul>
        
        <p class="mt-4"><strong class="text-green-400">NoSQL Databases (Non-Relational):</strong></p>
        <ul class="list-disc list-inside ml-4">
          <li>Flexible, dynamic schemas</li>
          <li>Document, key-value, graph, or column-family stores</li>
          <li>Different query languages (MongoDB uses MQL)</li>
          <li>Eventually consistent (in distributed systems)</li>
          <li>Horizontal scaling (add more servers)</li>
          <li>Examples: MongoDB, Redis, Cassandra, Neo4j</li>
        </ul>

        <div class="bg-gray-900 text-sm p-4 rounded-xl border border-gray-700 mt-4">
          <p class="text-yellow-300 font-semibold mb-2">When to use SQL:</p>
          <ul class="list-disc list-inside ml-4 text-sm">
            <li>Complex queries and relationships</li>
            <li>Data integrity is critical (banking, finance)</li>
            <li>Structured data with clear relationships</li>
          </ul>
          
          <p class="text-yellow-300 font-semibold mb-2 mt-3">When to use NoSQL:</p>
          <ul class="list-disc list-inside ml-4 text-sm">
            <li>Rapid development with changing requirements</li>
            <li>Large volumes of unstructured data</li>
            <li>Need for horizontal scaling</li>
            <li>Real-time applications (social media, IoT)</li>
          </ul>
        </div>
      </div>`
    }
  ],
  
  proTips: [
    { text: "Always use MongoDB Atlas for production. It provides automatic backups, monitoring, and scaling.", color: "green" },
    { text: "Use indexes to improve query performance. Add them to fields you frequently query. Example: <code>userSchema.index({ email: 1 })</code>.", color: "blue" },
    { text: "Never store passwords in plain text! Use bcrypt to hash passwords before saving to database.", color: "red" },
    { text: "Use <code>lean()</code> for read-only queries to get plain JavaScript objects instead of Mongoose documents. It's faster!", color: "blue" },
    { text: "Enable mongoose debug mode during development: <code>mongoose.set('debug', true)</code>. It shows all database queries.", color: "blue" },
    { text: "Use virtual properties for computed fields that don't need to be stored in the database.", color: "blue" }
  ],
  
  practicals: []
}
