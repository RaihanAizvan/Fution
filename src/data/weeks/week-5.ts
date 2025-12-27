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
    },
    {
      title: 'BSON vs JSON',
      difficulty: 'Beginner',
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">
        Tell the reviewer: MongoDB stores data in BSON (Binary JSON) format, not plain JSON. Understanding the difference is important for working with MongoDB effectively.
      </blockquote>
      <div class="space-y-3 text-gray-300">
        <p><strong class="text-blue-400">JSON (JavaScript Object Notation):</strong></p>
        <ul class="list-disc list-inside ml-4">
          <li>Human-readable text format</li>
          <li>Lightweight data interchange format</li>
          <li>Supports: String, Number, Boolean, Array, Object, null</li>
          <li>Easy to read and write</li>
          <li>Widely used in APIs and web applications</li>
        </ul>

        <div class="bg-gray-900 text-sm p-4 rounded-xl border border-gray-700 mt-3">
          <pre><code class="text-white">// JSON Example
{
  "name": "John Doe",
  "age": 25,
  "active": true,
  "hobbies": ["coding", "gaming"]
}</code></pre>
        </div>
        
        <p class="mt-4"><strong class="text-green-400">BSON (Binary JSON):</strong></p>
        <ul class="list-disc list-inside ml-4">
          <li>Binary-encoded serialization of JSON-like documents</li>
          <li>Designed for efficient storage and traversal</li>
          <li>Supports additional data types: Date, Binary, ObjectId, Decimal128, etc.</li>
          <li>Faster to parse and encode than JSON</li>
          <li>Used internally by MongoDB</li>
        </ul>

        <div class="bg-gray-900 text-sm p-4 rounded-xl border border-gray-700 mt-3">
          <pre><code class="text-white">// BSON supports additional types
{
  "_id": ObjectId("507f1f77bcf86cd799439011"),
  "name": "John Doe",
  "age": NumberInt(25),
  "salary": NumberDecimal("50000.50"),
  "joinDate": ISODate("2024-01-15T10:30:00Z"),
  "active": true,
  "profilePic": BinData(0, "base64data...")
}</code></pre>
        </div>

        <div class="bg-blue-900/20 border border-blue-500/30 p-4 rounded-xl mt-4">
          <p class="text-blue-300 font-semibold mb-2">Key Differences:</p>
          <ul class="list-disc list-inside ml-4 text-sm">
            <li><strong>Format:</strong> JSON is text, BSON is binary</li>
            <li><strong>Size:</strong> BSON is usually larger but faster to process</li>
            <li><strong>Data Types:</strong> BSON has more types (Date, ObjectId, Binary, etc.)</li>
            <li><strong>Speed:</strong> BSON is faster for encoding/decoding</li>
            <li><strong>Use:</strong> JSON for APIs, BSON for MongoDB storage</li>
          </ul>
        </div>

        <p class="mt-4 text-gray-400 text-sm">
          <strong>Why MongoDB uses BSON:</strong> BSON allows MongoDB to support rich data types, 
          perform efficient indexing, and traverse documents quickly. When you insert JSON into MongoDB, 
          it's automatically converted to BSON for storage.
        </p>
      </div>`
    },
    {
      title: 'MongoDB Data Types',
      difficulty: 'Beginner → Intermediate',
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">
        Tell the reviewer: MongoDB supports a rich set of data types through BSON. Understanding these types helps in proper data modeling and querying.
      </blockquote>
      <div class="space-y-3 text-gray-300">
        <p class="text-yellow-300 font-semibold">Common MongoDB Data Types:</p>

        <div class="bg-gray-900 text-sm p-4 rounded-xl border border-gray-700">
          <pre><code class="text-white">// 1. String - UTF-8 encoded text
{ "name": "John Doe" }

// 2. Number
{ "age": NumberInt(25) }        // 32-bit integer
{ "price": NumberLong(99999) }  // 64-bit integer
{ "salary": NumberDecimal("50000.99") } // Decimal128

// 3. Boolean
{ "isActive": true }

// 4. Date
{ "createdAt": ISODate("2024-01-15T10:30:00Z") }

// 5. ObjectId - 12-byte unique identifier
{ "_id": ObjectId("507f1f77bcf86cd799439011") }

// 6. Array
{ "hobbies": ["coding", "gaming", "reading"] }

// 7. Embedded Document (Object)
{ 
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "zip": "10001"
  }
}

// 8. Null
{ "middleName": null }

// 9. Binary Data
{ "profilePic": BinData(0, "iVBORw0KGgoAAAANS...") }

// 10. Regular Expression
{ "pattern": /^test/i }

// 11. JavaScript Code
{ "function": Code("function() { return 1; }") }

// 12. Timestamp - Internal MongoDB type
{ "ts": Timestamp(1672531200, 1) }

// 13. MinKey and MaxKey - Comparison purposes
{ "min": MinKey(), "max": MaxKey() }</code></pre>
        </div>

        <div class="bg-green-900/20 border border-green-500/30 p-4 rounded-xl mt-4">
          <p class="text-green-300 font-semibold mb-2">Most Frequently Used Types:</p>
          <ul class="list-disc list-inside ml-4 text-sm">
            <li><strong>String:</strong> Text data (names, descriptions)</li>
            <li><strong>Number:</strong> Ages, quantities, prices</li>
            <li><strong>ObjectId:</strong> Unique document identifiers</li>
            <li><strong>Date:</strong> Timestamps and dates</li>
            <li><strong>Boolean:</strong> True/false flags</li>
            <li><strong>Array:</strong> Lists of values</li>
            <li><strong>Object:</strong> Nested documents</li>
          </ul>
        </div>

        <div class="bg-gray-900 text-sm p-4 rounded-xl border border-gray-700 mt-4">
          <p class="text-yellow-300 font-semibold mb-2">Type Checking in MongoDB:</p>
          <pre><code class="text-white">// Check data type using $type operator
db.users.find({ age: { $type: "int" } })
db.users.find({ createdAt: { $type: "date" } })

// Multiple types
db.collection.find({ field: { $type: ["string", "int"] } })</code></pre>
        </div>

        <p class="mt-4 text-gray-400 text-sm">
          <strong>Pro Tip:</strong> Use NumberDecimal for financial calculations to avoid floating-point 
          precision issues. Use ObjectId for document references instead of strings for better performance.
        </p>
      </div>`
    },
    {
      title: 'The _id Field',
      difficulty: 'Beginner',
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">
        Tell the reviewer: Every MongoDB document must have an _id field that serves as the primary key. It's automatically generated if not provided.
      </blockquote>
      <div class="space-y-3 text-gray-300">
        <p class="text-blue-400 font-semibold">What is _id?</p>
        <ul class="list-disc list-inside ml-4">
          <li>Unique identifier for each document in a collection</li>
          <li>Acts as the primary key</li>
          <li>Automatically indexed for fast lookups</li>
          <li>Immutable - cannot be changed after creation</li>
          <li>Automatically generated if not provided</li>
        </ul>

        <div class="bg-gray-900 text-sm p-4 rounded-xl border border-gray-700 mt-3">
          <pre><code class="text-white">// MongoDB automatically generates _id
db.users.insertOne({ name: "John" })
// Result: { "_id": ObjectId("507f1f77bcf86cd799439011"), "name": "John" }

// You can provide your own _id
db.users.insertOne({ _id: "user123", name: "Jane" })
db.users.insertOne({ _id: 42, name: "Bob" })

// _id must be unique within a collection
db.users.insertOne({ _id: "user123", name: "Alice" }) // ERROR: Duplicate key</code></pre>
        </div>

        <p class="mt-4 text-yellow-300 font-semibold">ObjectId Structure (12 bytes):</p>
        <div class="bg-gray-900 text-sm p-4 rounded-xl border border-gray-700">
          <pre><code class="text-white">ObjectId("507f1f77bcf86cd799439011")
         └─┬─┘└─┬┘└┬┘└──┬─┘
           │    │  │    └─ 3-byte counter (random)
           │    │  └────── 2-byte process id
           │    └───────── 3-byte machine identifier
           └────────────── 4-byte timestamp (seconds since epoch)</code></pre>
        </div>

        <div class="bg-green-900/20 border border-green-500/30 p-4 rounded-xl mt-4">
          <p class="text-green-300 font-semibold mb-2">ObjectId Properties:</p>
          <ul class="list-disc list-inside ml-4 text-sm">
            <li><strong>Globally unique:</strong> No collisions across different machines/processes</li>
            <li><strong>Time-sortable:</strong> Documents inserted later have higher ObjectIds</li>
            <li><strong>Lightweight:</strong> Only 12 bytes</li>
            <li><strong>Embedded timestamp:</strong> Creation time is built-in</li>
          </ul>
        </div>

        <div class="bg-gray-900 text-sm p-4 rounded-xl border border-gray-700 mt-4">
          <p class="text-yellow-300 font-semibold mb-2">Working with ObjectId:</p>
          <pre><code class="text-white">// Get timestamp from ObjectId
const id = ObjectId("507f1f77bcf86cd799439011");
id.getTimestamp() // Returns Date object

// Convert to string
id.toString() // "507f1f77bcf86cd799439011"

// Query by _id
db.users.findOne({ _id: ObjectId("507f1f77bcf86cd799439011") })

// In Mongoose
const user = await User.findById("507f1f77bcf86cd799439011");
// Mongoose automatically converts string to ObjectId</code></pre>
        </div>

        <div class="bg-blue-900/20 border border-blue-500/30 p-4 rounded-xl mt-4">
          <p class="text-blue-300 font-semibold mb-2">Custom _id Types:</p>
          <p class="text-sm mb-2">You can use different types for _id:</p>
          <ul class="list-disc list-inside ml-4 text-sm">
            <li><strong>String:</strong> <code>_id: "user_john_123"</code></li>
            <li><strong>Number:</strong> <code>_id: 12345</code></li>
            <li><strong>Date:</strong> <code>_id: ISODate("2024-01-15")</code></li>
            <li><strong>Custom:</strong> <code>_id: { userId: 123, version: 1 }</code></li>
          </ul>
          <p class="text-sm mt-2 text-gray-400">However, ObjectId is recommended for most use cases.</p>
        </div>

        <p class="mt-4 text-gray-400 text-sm">
          <strong>Important:</strong> The _id field is automatically indexed. Don't create another index on it. 
          Always use _id for lookups instead of custom identifier fields for best performance.
        </p>
      </div>`
    },
    {
      title: 'Namespace',
      difficulty: 'Beginner',
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">
        Tell the reviewer: In MongoDB, a namespace is the concatenation of database name and collection name. It uniquely identifies a collection within a MongoDB instance.
      </blockquote>
      <div class="space-y-3 text-gray-300">
        <p class="text-blue-400 font-semibold">Namespace Format:</p>
        <div class="bg-gray-900 text-sm p-4 rounded-xl border border-gray-700">
          <pre><code class="text-white">// Namespace format: database.collection
myDatabase.users
myDatabase.products
testDB.orders

// Example
use myDatabase
db.users.insertOne({ name: "John" })
// Namespace: myDatabase.users</code></pre>
        </div>

        <p class="mt-4 text-yellow-300 font-semibold">Understanding Namespaces:</p>
        <ul class="list-disc list-inside ml-4">
          <li><strong>Database:</strong> Container for collections (like a folder)</li>
          <li><strong>Collection:</strong> Group of MongoDB documents (like a table in SQL)</li>
          <li><strong>Namespace:</strong> Full path to a collection (database.collection)</li>
          <li><strong>Unique identifier:</strong> Each namespace is unique in a MongoDB instance</li>
        </ul>

        <div class="bg-gray-900 text-sm p-4 rounded-xl border border-gray-700 mt-4">
          <pre><code class="text-white">// Different namespaces
ecommerce.users        // Users in ecommerce database
ecommerce.products     // Products in ecommerce database
blog.users             // Users in blog database (different from ecommerce.users)

// Commands using namespaces
show dbs               // List all databases
use ecommerce          // Switch to database
show collections       // List collections in current database

// In MongoDB shell
db.users.find()        // Current database: ecommerce, Collection: users
                       // Namespace: ecommerce.users</code></pre>
        </div>

        <div class="bg-green-900/20 border border-green-500/30 p-4 rounded-xl mt-4">
          <p class="text-green-300 font-semibold mb-2">Namespace Limits:</p>
          <ul class="list-disc list-inside ml-4 text-sm">
            <li><strong>Length:</strong> Namespace (database.collection) cannot exceed 120 bytes</li>
            <li><strong>Database name:</strong> Max 64 characters</li>
            <li><strong>Collection name:</strong> Should be meaningful and descriptive</li>
            <li><strong>Reserved names:</strong> Don't use "system" prefix (reserved by MongoDB)</li>
          </ul>
        </div>

        <div class="bg-gray-900 text-sm p-4 rounded-xl border border-gray-700 mt-4">
          <p class="text-yellow-300 font-semibold mb-2">System Namespaces:</p>
          <pre><code class="text-white">// MongoDB creates special system collections
myDatabase.system.indexes    // Deprecated in MongoDB 4.4+
myDatabase.system.profile    // Profiling data
myDatabase.system.users      // User authentication data

// Don't manually modify system collections!</code></pre>
        </div>

        <div class="bg-blue-900/20 border border-blue-500/30 p-4 rounded-xl mt-4">
          <p class="text-blue-300 font-semibold mb-2">Namespace in Connection String:</p>
          <pre><code class="text-white">// MongoDB Connection String includes database
mongodb://localhost:27017/myDatabase

// Using Mongoose
mongoose.connect('mongodb://localhost:27017/ecommerce');
// Default namespace: ecommerce.[collection]

// Accessing specific collection
const User = mongoose.model('User', userSchema);
// Namespace: ecommerce.users (lowercase, pluralized)</code></pre>
        </div>

        <p class="mt-4 text-gray-400 text-sm">
          <strong>Best Practice:</strong> Use clear, descriptive names for databases and collections. 
          Avoid special characters and spaces. Use camelCase or snake_case consistently.
        </p>
      </div>`
    },
    {
      title: 'Default Port Number',
      difficulty: 'Beginner',
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">
        Tell the reviewer: MongoDB runs on port 27017 by default. Understanding port configuration is essential for connecting applications and managing multiple MongoDB instances.
      </blockquote>
      <div class="space-y-3 text-gray-300">
        <p class="text-blue-400 font-semibold">MongoDB Default Ports:</p>
        <ul class="list-disc list-inside ml-4">
          <li><strong>27017:</strong> Default MongoDB server port</li>
          <li><strong>27018:</strong> Default port for MongoDB shard server</li>
          <li><strong>27019:</strong> Default port for MongoDB config server</li>
          <li><strong>28017:</strong> Default port for web status page (deprecated)</li>
        </ul>

        <div class="bg-gray-900 text-sm p-4 rounded-xl border border-gray-700 mt-3">
          <pre><code class="text-white">// Default connection string
mongodb://localhost:27017

// With database name
mongodb://localhost:27017/myDatabase

// MongoDB Atlas (cloud)
mongodb+srv://username:password@cluster.mongodb.net/myDatabase</code></pre>
        </div>

        <p class="mt-4 text-yellow-300 font-semibold">Changing the Default Port:</p>
        <div class="bg-gray-900 text-sm p-4 rounded-xl border border-gray-700">
          <pre><code class="text-white">// Start MongoDB on custom port
mongod --port 27018

// In configuration file (mongod.conf)
net:
  port: 27018
  bindIp: 127.0.0.1

// Connect to custom port
mongodb://localhost:27018/myDatabase</code></pre>
        </div>

        <div class="bg-green-900/20 border border-green-500/30 p-4 rounded-xl mt-4">
          <p class="text-green-300 font-semibold mb-2">Why Change the Port?</p>
          <ul class="list-disc list-inside ml-4 text-sm">
            <li><strong>Multiple instances:</strong> Run several MongoDB servers on same machine</li>
            <li><strong>Security:</strong> Use non-standard port to reduce automated attacks</li>
            <li><strong>Port conflicts:</strong> Another application already using 27017</li>
            <li><strong>Network policies:</strong> Firewall restrictions on certain ports</li>
          </ul>
        </div>

        <div class="bg-gray-900 text-sm p-4 rounded-xl border border-gray-700 mt-4">
          <p class="text-yellow-300 font-semibold mb-2">Connecting with Different Ports:</p>
          <pre><code class="text-white">// Node.js with Mongoose
mongoose.connect('mongodb://localhost:27018/myDB');

// MongoDB Shell
mongosh "mongodb://localhost:27018"

// Python with PyMongo
client = MongoClient('mongodb://localhost:27018/')

// Check which port MongoDB is running on
netstat -an | grep 27017
# or
lsof -i :27017</code></pre>
        </div>

        <div class="bg-blue-900/20 border border-blue-500/30 p-4 rounded-xl mt-4">
          <p class="text-blue-300 font-semibold mb-2">Production Configuration:</p>
          <pre><code class="text-white">// MongoDB Atlas (managed service)
// Uses SRV record, port is handled automatically
mongodb+srv://cluster.mongodb.net/

// Replica Set with multiple ports
mongodb://host1:27017,host2:27017,host3:27017/?replicaSet=myReplSet

// With authentication
mongodb://user:password@localhost:27017/admin</code></pre>
        </div>

        <div class="bg-red-900/20 border border-red-500/30 p-4 rounded-xl mt-4">
          <p class="text-red-300 font-semibold mb-2">⚠️ Security Warning:</p>
          <ul class="list-disc list-inside ml-4 text-sm">
            <li>Never expose MongoDB directly to the internet</li>
            <li>Always use authentication in production</li>
            <li>Use firewall rules to restrict access</li>
            <li>Bind to specific IPs, not 0.0.0.0 (all interfaces)</li>
            <li>Use SSL/TLS for encrypted connections</li>
          </ul>
        </div>

        <p class="mt-4 text-gray-400 text-sm">
          <strong>Pro Tip:</strong> In production, use MongoDB Atlas or ensure your MongoDB instance is 
          behind a firewall. Never leave port 27017 open to the public internet without proper authentication 
          and encryption.
        </p>
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
