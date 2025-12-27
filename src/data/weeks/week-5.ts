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
      title: 'Collections & Views'
    },
    {
      title: 'Capped Collections',
      difficulty: 'Intermediate',
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">
        Tell the reviewer: Capped collections are fixed-size collections that maintain insertion order and automatically remove oldest documents when size limit is reached. They're perfect for logging and caching.
      </blockquote>
      <div class="space-y-3 text-gray-300">
        <p class="text-blue-400 font-semibold">What are Capped Collections?</p>
        <ul class="list-disc list-inside ml-4">
          <li>Fixed-size collections with a maximum size or document count</li>
          <li>Maintain insertion order (documents stored in order they were inserted)</li>
          <li>Automatically delete oldest documents when limit reached (FIFO - First In, First Out)</li>
          <li>High-performance for insert and read operations</li>
          <li>Cannot be sharded</li>
          <li>Documents cannot grow in size after insertion</li>
        </ul>

        <div class="bg-gray-900 text-sm p-4 rounded-xl border border-gray-700 mt-3">
          <p class="text-yellow-300 font-semibold mb-2">Creating a Capped Collection:</p>
          <pre><code class="text-white">// Create with size limit (in bytes)
db.createCollection("logs", {
  capped: true,
  size: 5242880,  // 5MB
  max: 5000       // Maximum 5000 documents (optional)
})

// Create with only document count limit
db.createCollection("recentActivity", {
  capped: true,
  size: 1048576,  // Still need to specify size
  max: 100
})</code></pre>
        </div>

        <div class="bg-green-900/20 border border-green-500/30 p-4 rounded-xl mt-4">
          <p class="text-green-300 font-semibold mb-2">✅ Best Use Cases:</p>
          <ul class="list-disc list-inside ml-4 text-sm">
            <li><strong>Logging:</strong> Store recent application logs (auto-delete old logs)</li>
            <li><strong>Cache:</strong> Keep recent data in memory-like storage</li>
            <li><strong>Message queues:</strong> FIFO queue implementation</li>
            <li><strong>Real-time feeds:</strong> Recent tweets, posts, notifications</li>
            <li><strong>Session storage:</strong> Temporary user session data</li>
            <li><strong>Metrics:</strong> Recent performance or monitoring data</li>
          </ul>
        </div>

        <div class="bg-gray-900 text-sm p-4 rounded-xl border border-gray-700 mt-4">
          <p class="text-yellow-300 font-semibold mb-2">Operations on Capped Collections:</p>
          <pre><code class="text-white">// Insert (works normally)
db.logs.insertOne({
  timestamp: new Date(),
  level: "INFO",
  message: "User logged in"
})

// Read with tailable cursor (like tail -f in Unix)
const cursor = db.logs.find().tailable({ awaitData: true })

// Check if collection is capped
db.logs.isCapped()  // Returns true

// Get collection stats
db.logs.stats()</code></pre>
        </div>

        <div class="bg-red-900/20 border border-red-500/30 p-4 rounded-xl mt-4">
          <p class="text-red-300 font-semibold mb-2">⚠️ Limitations:</p>
          <ul class="list-disc list-inside ml-4 text-sm">
            <li><strong>No deletes:</strong> Cannot manually delete individual documents</li>
            <li><strong>No updates that increase size:</strong> Updates must not make document larger</li>
            <li><strong>No _id index removal:</strong> _id index is mandatory</li>
            <li><strong>Cannot be sharded:</strong> Not suitable for distributed collections</li>
            <li><strong>Fixed size:</strong> Cannot resize after creation (must recreate)</li>
          </ul>
        </div>

        <div class="bg-gray-900 text-sm p-4 rounded-xl border border-gray-700 mt-4">
          <p class="text-yellow-300 font-semibold mb-2">Converting Regular to Capped Collection:</p>
          <pre><code class="text-white">// Convert existing collection to capped
db.runCommand({
  convertToCapped: "regularCollection",
  size: 10485760  // 10MB
})

// Warning: This operation locks the database!
// Better approach: Create new capped collection and migrate data</code></pre>
        </div>

        <div class="bg-gray-900 text-sm p-4 rounded-xl border border-gray-700 mt-4">
          <p class="text-yellow-300 font-semibold mb-2">Tailable Cursors (Real-time Streaming):</p>
          <pre><code class="text-white">// Node.js with MongoDB driver
const cursor = db.collection('logs').find({}, {
  tailable: true,
  awaitData: true
})

cursor.on('data', (doc) => {
  console.log('New log:', doc)
})

// Like tail -f for log files!
// Cursor stays open and receives new documents as they're inserted</code></pre>
        </div>

        <div class="bg-blue-900/20 border border-blue-500/30 p-4 rounded-xl mt-4">
          <p class="text-blue-300 font-semibold mb-2">Performance Benefits:</p>
          <ul class="list-disc list-inside ml-4 text-sm">
            <li><strong>Fast inserts:</strong> No index updates on deletions (auto-managed)</li>
            <li><strong>Predictable size:</strong> Won't grow beyond specified limit</li>
            <li><strong>Sequential reads:</strong> Natural ordering makes scans faster</li>
            <li><strong>Memory efficient:</strong> Old data automatically purged</li>
          </ul>
        </div>

        <div class="bg-gray-900 text-sm p-4 rounded-xl border border-gray-700 mt-4">
          <p class="text-yellow-300 font-semibold mb-2">Example: Application Logging System:</p>
          <pre><code class="text-white">// Create capped collection for logs
db.createCollection("appLogs", {
  capped: true,
  size: 52428800,  // 50MB
  max: 10000       // Keep only last 10,000 logs
})

// Insert logs (oldest auto-deleted when limit reached)
db.appLogs.insertOne({
  timestamp: new Date(),
  level: "ERROR",
  service: "payment-api",
  message: "Payment gateway timeout",
  userId: "user123"
})

// Query recent logs
db.appLogs.find().sort({ $natural: -1 }).limit(100)
// $natural: -1 returns newest first (reverse insertion order)</code></pre>
        </div>

        <p class="mt-4 text-gray-400 text-sm">
          <strong>Pro Tip:</strong> Use capped collections for data you don't need to keep forever. 
          They're much faster than regular collections with TTL indexes for auto-expiring data. 
          Perfect for logs, cache, and real-time streams!
        </p>
      </div>`
    },
    {
      title: 'Clustered Collections',
      difficulty: 'Advanced',
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">
        Tell the reviewer: Clustered collections store documents physically ordered by cluster key (usually _id). This improves query performance for range queries and reduces index size. Introduced in MongoDB 5.3+.
      </blockquote>
      <div class="space-y-3 text-gray-300">
        <p class="text-blue-400 font-semibold">What are Clustered Collections?</p>
        <ul class="list-disc list-inside ml-4">
          <li>Documents stored in order of cluster key (typically _id)</li>
          <li>No separate index needed for cluster key</li>
          <li>Improved performance for range queries on cluster key</li>
          <li>Reduced storage size (no duplicate _id in index)</li>
          <li>Available in MongoDB 5.3 and later</li>
          <li>Cannot convert existing collections to clustered</li>
        </ul>

        <div class="bg-gray-900 text-sm p-4 rounded-xl border border-gray-700 mt-3">
          <p class="text-yellow-300 font-semibold mb-2">Creating a Clustered Collection:</p>
          <pre><code class="text-white">// Basic clustered collection
db.createCollection("timeseries", {
  clusteredIndex: {
    key: { _id: 1 },
    unique: true
  }
})

// With custom cluster key name (must be _id)
db.createCollection("events", {
  clusteredIndex: {
    key: { _id: 1 },
    unique: true,
    name: "events_cluster_idx"
  }
})

// Clustered collection with validator
db.createCollection("metrics", {
  clusteredIndex: { key: { _id: 1 }, unique: true },
  validator: {
    $jsonSchema: {
      required: ["timestamp", "value"],
      properties: {
        timestamp: { bsonType: "date" },
        value: { bsonType: "number" }
      }
    }
  }
})</code></pre>
        </div>

        <div class="bg-green-900/20 border border-green-500/30 p-4 rounded-xl mt-4">
          <p class="text-green-300 font-semibold mb-2">✅ Best Use Cases:</p>
          <ul class="list-disc list-inside ml-4 text-sm">
            <li><strong>Time-series data:</strong> IoT sensor data, logs with timestamps</li>
            <li><strong>Event streams:</strong> Ordered events by timestamp</li>
            <li><strong>Audit logs:</strong> Sequential log entries</li>
            <li><strong>Financial transactions:</strong> Ordered by transaction time</li>
            <li><strong>Range queries:</strong> Frequent queries on date/time ranges</li>
          </ul>
        </div>

        <div class="bg-gray-900 text-sm p-4 rounded-xl border border-gray-700 mt-4">
          <p class="text-yellow-300 font-semibold mb-2">Clustered vs Regular Collections:</p>
          <pre><code class="text-white">// Regular Collection
// - _id stored in documents
// - Separate B-tree index for _id
// - Documents stored in insertion order
// - Range queries require index scan

// Clustered Collection  
// - Documents physically sorted by _id
// - No separate index needed
// - Direct access via cluster key
// - Range queries are faster (sequential reads)</code></pre>
        </div>

        <div class="bg-blue-900/20 border border-blue-500/30 p-4 rounded-xl mt-4">
          <p class="text-blue-300 font-semibold mb-2">Performance Benefits:</p>
          <ul class="list-disc list-inside ml-4 text-sm">
            <li><strong>Reduced storage:</strong> No duplicate _id data in index</li>
            <li><strong>Faster range queries:</strong> Sequential disk reads</li>
            <li><strong>Better cache efficiency:</strong> Related data stored together</li>
            <li><strong>Fewer index updates:</strong> One less index to maintain</li>
          </ul>
        </div>

        <div class="bg-gray-900 text-sm p-4 rounded-xl border border-gray-700 mt-4">
          <p class="text-yellow-300 font-semibold mb-2">Example: Time-Series Events:</p>
          <pre><code class="text-white">// Create clustered collection with ObjectId containing timestamp
db.createCollection("sensorData", {
  clusteredIndex: { key: { _id: 1 }, unique: true }
})

// Insert with timestamp-based _id
db.sensorData.insertOne({
  _id: new ObjectId(), // Contains timestamp
  sensor: "temp_01",
  temperature: 23.5,
  humidity: 60
})

// Efficient range query (uses cluster key)
const start = ObjectId.createFromTime(Date.now() / 1000 - 3600) // 1 hour ago
const end = ObjectId()

db.sensorData.find({
  _id: { $gte: start, $lte: end }
})
// This query is VERY fast in clustered collections!</code></pre>
        </div>

        <div class="bg-gray-900 text-sm p-4 rounded-xl border border-gray-700 mt-4">
          <p class="text-yellow-300 font-semibold mb-2">Check if Collection is Clustered:</p>
          <pre><code class="text-white">// Using listCollections
db.runCommand({
  listCollections: 1,
  filter: { name: "timeseries" }
})

// Response includes clusteredIndex info
{
  "cursor": {
    "firstBatch": [{
      "name": "timeseries",
      "type": "collection",
      "options": {
        "clusteredIndex": {
          "key": { "_id": 1 },
          "unique": true
        }
      }
    }]
  }
}

// Using collStats
db.timeseries.stats()</code></pre>
        </div>

        <div class="bg-red-900/20 border border-red-500/30 p-4 rounded-xl mt-4">
          <p class="text-red-300 font-semibold mb-2">⚠️ Limitations:</p>
          <ul class="list-disc list-inside ml-4 text-sm">
            <li><strong>MongoDB 5.3+:</strong> Not available in older versions</li>
            <li><strong>Creation only:</strong> Cannot convert existing collections</li>
            <li><strong>_id only:</strong> Cluster key must be _id field</li>
            <li><strong>Unique constraint:</strong> Cluster key must be unique</li>
            <li><strong>No benefits for random access:</strong> Best for sequential/range queries</li>
          </ul>
        </div>

        <div class="bg-gray-900 text-sm p-4 rounded-xl border border-gray-700 mt-4">
          <p class="text-yellow-300 font-semibold mb-2">Mongoose with Clustered Collections:</p>
          <pre><code class="text-white">// Define schema with clustered option
const sensorSchema = new mongoose.Schema({
  sensor: String,
  temperature: Number,
  timestamp: Date
}, {
  clusteredIndex: {
    key: { _id: 1 },
    unique: true
  }
})

// Create model
const Sensor = mongoose.model('Sensor', sensorSchema)

// Mongoose automatically uses clustered collection if supported</code></pre>
        </div>

        <div class="bg-gray-900 text-sm p-4 rounded-xl border border-gray-700 mt-4">
          <p class="text-yellow-300 font-semibold mb-2">When NOT to Use Clustered Collections:</p>
          <ul class="list-disc list-inside ml-4 text-sm">
            <li>Documents accessed randomly (not by _id ranges)</li>
            <li>Frequent updates that change document size</li>
            <li>Need to cluster by field other than _id</li>
            <li>Using MongoDB version older than 5.3</li>
            <li>Small collections (overhead not worth it)</li>
          </ul>
        </div>

        <p class="mt-4 text-gray-400 text-sm">
          <strong>Pro Tip:</strong> Use clustered collections for time-series or event data where you 
          frequently query by time ranges. The performance improvement can be significant (2-3x faster) 
          for sequential scans. Combine with ObjectId timestamps for best results!
        </p>
      </div>`
    },
    {
      title: 'Views (Standard)',
      difficulty: 'Intermediate',
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">
        Tell the reviewer: MongoDB Views are virtual collections based on aggregation pipelines. They don't store data themselves but compute results dynamically from underlying collections.
      </blockquote>
      <div class="space-y-3 text-gray-300">
        <p class="text-blue-400 font-semibold">What are MongoDB Views?</p>
        <ul class="list-disc list-inside ml-4">
          <li>Read-only virtual collections</li>
          <li>Defined using aggregation pipeline</li>
          <li>Compute results on-the-fly from source collection(s)</li>
          <li>No data duplication (no storage overhead)</li>
          <li>Automatically updated when source data changes</li>
          <li>Can be queried like regular collections</li>
        </ul>

        <div class="bg-gray-900 text-sm p-4 rounded-xl border border-gray-700 mt-3">
          <p class="text-yellow-300 font-semibold mb-2">Creating a View:</p>
          <pre><code class="text-white">// Basic view: Active users only
db.createView(
  "activeUsers",           // View name
  "users",                 // Source collection
  [                        // Aggregation pipeline
    { $match: { active: true } },
    { $project: { password: 0 } }  // Hide password field
  ]
)

// Complex view: User statistics
db.createView(
  "userStats",
  "orders",
  [
    {
      $group: {
        _id: "$userId",
        totalOrders: { $sum: 1 },
        totalSpent: { $sum: "$amount" },
        avgOrderValue: { $avg: "$amount" }
      }
    },
    {
      $lookup: {
        from: "users",
        localField: "_id",
        foreignField: "_id",
        as: "userInfo"
      }
    },
    { $unwind: "$userInfo" },
    {
      $project: {
        userName: "$userInfo.name",
        totalOrders: 1,
        totalSpent: 1,
        avgOrderValue: 1
      }
    }
  ]
)</code></pre>
        </div>

        <div class="bg-green-900/20 border border-green-500/30 p-4 rounded-xl mt-4">
          <p class="text-green-300 font-semibold mb-2">✅ Best Use Cases:</p>
          <ul class="list-disc list-inside ml-4 text-sm">
            <li><strong>Data security:</strong> Hide sensitive fields from specific users</li>
            <li><strong>Simplified queries:</strong> Pre-define complex aggregations</li>
            <li><strong>Data transformation:</strong> Present data in different format</li>
            <li><strong>Join collections:</strong> Create denormalized view of related data</li>
            <li><strong>Business logic:</strong> Encapsulate filtering/calculation logic</li>
          </ul>
        </div>

        <div class="bg-gray-900 text-sm p-4 rounded-xl border border-gray-700 mt-4">
          <p class="text-yellow-300 font-semibold mb-2">Querying Views:</p>
          <pre><code class="text-white">// Query view like a regular collection
db.activeUsers.find({ age: { $gt: 25 } })

db.activeUsers.find().limit(10).sort({ name: 1 })

// Aggregation on views
db.userStats.aggregate([
  { $match: { totalOrders: { $gt: 10 } } },
  { $sort: { totalSpent: -1 } }
])

// Count documents
db.activeUsers.countDocuments()

// Views automatically apply their pipeline first,
// then your query is applied to the result</code></pre>
        </div>

        <div class="bg-gray-900 text-sm p-4 rounded-xl border border-gray-700 mt-4">
          <p class="text-yellow-300 font-semibold mb-2">View Management:</p>
          <pre><code class="text-white">// List all views
db.getCollectionNames().filter(name => {
  return db.getCollectionInfos({ name })[0].type === "view"
})

// Get view definition
db.getCollectionInfos({ name: "activeUsers" })

// Drop a view
db.activeUsers.drop()

// Modify view (drop and recreate)
db.activeUsers.drop()
db.createView("activeUsers", "users", [
  { $match: { active: true, verified: true } }
])</code></pre>
        </div>

        <div class="bg-blue-900/20 border border-blue-500/30 p-4 rounded-xl mt-4">
          <p class="text-blue-300 font-semibold mb-2">Advantages of Views:</p>
          <ul class="list-disc list-inside ml-4 text-sm">
            <li><strong>No storage:</strong> Don't consume disk space</li>
            <li><strong>Always current:</strong> Reflect latest source data</li>
            <li><strong>Reusable logic:</strong> Define complex query once, use many times</li>
            <li><strong>Security:</strong> Hide sensitive fields or filter data</li>
            <li><strong>Simplicity:</strong> Abstract complex joins and transformations</li>
          </ul>
        </div>

        <div class="bg-red-900/20 border border-red-500/30 p-4 rounded-xl mt-4">
          <p class="text-red-300 font-semibold mb-2">⚠️ Limitations:</p>
          <ul class="list-disc list-inside ml-4 text-sm">
            <li><strong>Read-only:</strong> Cannot insert, update, or delete documents</li>
            <li><strong>Performance:</strong> Computed on every query (can be slower)</li>
            <li><strong>No indexes:</strong> Cannot create indexes on views</li>
            <li><strong>Pipeline restrictions:</strong> Some stages not allowed ($out, $merge)</li>
            <li><strong>No collation:</strong> Use source collection's collation</li>
          </ul>
        </div>

        <div class="bg-gray-900 text-sm p-4 rounded-xl border border-gray-700 mt-4">
          <p class="text-yellow-300 font-semibold mb-2">Example: E-commerce Dashboard View:</p>
          <pre><code class="text-white">// Create view for product sales summary
db.createView(
  "productSales",
  "orders",
  [
    { $unwind: "$items" },
    {
      $group: {
        _id: "$items.productId",
        totalSold: { $sum: "$items.quantity" },
        revenue: { $sum: "$items.total" },
        avgPrice: { $avg: "$items.price" }
      }
    },
    {
      $lookup: {
        from: "products",
        localField: "_id",
        foreignField: "_id",
        as: "product"
      }
    },
    { $unwind: "$product" },
    {
      $project: {
        productName: "$product.name",
        category: "$product.category",
        totalSold: 1,
        revenue: 1,
        avgPrice: 1
      }
    }
  ]
)

// Query the view
db.productSales.find({ category: "Electronics" })
  .sort({ revenue: -1 })
  .limit(10)</code></pre>
        </div>

        <div class="bg-gray-900 text-sm p-4 rounded-xl border border-gray-700 mt-4">
          <p class="text-yellow-300 font-semibold mb-2">Using Views with Mongoose:</p>
          <pre><code class="text-white">// Views are queryable like regular models
const ActiveUser = mongoose.model('ActiveUser', new Schema({}, { 
  collection: 'activeUsers',
  strict: false 
}))

// Query the view
const users = await ActiveUser.find({ age: { $gt: 25 } })

// Note: You still need to create the view using MongoDB shell or driver
// Mongoose doesn't have built-in view creation yet</code></pre>
        </div>

        <div class="bg-gray-900 text-sm p-4 rounded-xl border border-gray-700 mt-4">
          <p class="text-yellow-300 font-semibold mb-2">Performance Considerations:</p>
          <ul class="list-disc list-inside ml-4 text-sm">
            <li>Views execute pipeline on every query (no caching)</li>
            <li>Use indexes on source collection for better performance</li>
            <li>Keep pipelines simple for faster execution</li>
            <li>For frequently accessed computed data, consider materialized views</li>
            <li>Monitor query performance with explain()</li>
          </ul>
        </div>

        <p class="mt-4 text-gray-400 text-sm">
          <strong>Pro Tip:</strong> Use views to create a "public" version of your collections that hides 
          sensitive data. Perfect for giving read access to analytics tools or external systems without 
          exposing internal fields. Views are great for security and abstraction!
        </p>
      </div>`
    },
    {
      title: 'Materialized Views',
      difficulty: 'Advanced',
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">
        Tell the reviewer: Materialized views store pre-computed aggregation results in a collection. Unlike standard views, they cache results for faster queries but need manual refresh.
      </blockquote>
      <div class="space-y-3 text-gray-300">
        <p class="text-blue-400 font-semibold">What are Materialized Views?</p>
        <ul class="list-disc list-inside ml-4">
          <li>Pre-computed and stored aggregation results</li>
          <li>Created using $merge or $out in aggregation pipeline</li>
          <li>Much faster than standard views (data already computed)</li>
          <li>Can be indexed for even better performance</li>
          <li>Need manual refresh to update (not automatic)</li>
          <li>Consume storage space (unlike standard views)</li>
        </ul>

        <div class="bg-gray-900 text-sm p-4 rounded-xl border border-gray-700 mt-3">
          <p class="text-yellow-300 font-semibold mb-2">Creating a Materialized View with $merge:</p>
          <pre><code class="text-white">// Create/update materialized view
db.orders.aggregate([
  {
    $group: {
      _id: "$userId",
      totalOrders: { $sum: 1 },
      totalSpent: { $sum: "$amount" },
      lastOrderDate: { $max: "$orderDate" }
    }
  },
  {
    $merge: {
      into: "userOrderStats",  // Target collection (materialized view)
      whenMatched: "replace",   // Replace existing docs
      whenNotMatched: "insert"  // Insert new docs
    }
  }
])

// Now query the materialized view (very fast!)
db.userOrderStats.find({ totalOrders: { $gte: 10 } })</code></pre>
        </div>

        <div class="bg-gray-900 text-sm p-4 rounded-xl border border-gray-700 mt-4">
          <p class="text-yellow-300 font-semibold mb-2">Creating with $out (Replaces entire collection):</p>
          <pre><code class="text-white">// Completely replace materialized view
db.products.aggregate([
  {
    $lookup: {
      from: "reviews",
      localField: "_id",
      foreignField: "productId",
      as: "reviews"
    }
  },
  {
    $addFields: {
      avgRating: { $avg: "$reviews.rating" },
      reviewCount: { $size: "$reviews" }
    }
  },
  {
    $project: {
      name: 1,
      category: 1,
      price: 1,
      avgRating: 1,
      reviewCount: 1
    }
  },
  { $out: "productRatings" }  // Replaces entire collection
])

// Query materialized view
db.productRatings.find({ avgRating: { $gte: 4.5 } })</code></pre>
        </div>

        <div class="bg-blue-900/20 border border-blue-500/30 p-4 rounded-xl mt-4">
          <p class="text-blue-300 font-semibold mb-2">Standard View vs Materialized View:</p>
          <div class="bg-gray-900 text-sm p-3 rounded border border-gray-700 mt-2">
            <pre><code class="text-white">Standard View:
✓ Always current (real-time)
✓ No storage overhead
✗ Slower queries (computed on-demand)
✗ Cannot be indexed
✗ Read-only

Materialized View:
✓ Very fast queries (pre-computed)
✓ Can be indexed
✓ Can have additional fields
✗ Stale data (needs refresh)
✗ Storage overhead
✗ Manual maintenance required</code></pre>
          </div>
        </div>

        <div class="bg-green-900/20 border border-green-500/30 p-4 rounded-xl mt-4">
          <p class="text-green-300 font-semibold mb-2">✅ Best Use Cases:</p>
          <ul class="list-disc list-inside ml-4 text-sm">
            <li><strong>Analytics dashboards:</strong> Pre-compute complex reports</li>
            <li><strong>Expensive aggregations:</strong> Cache results of slow queries</li>
            <li><strong>Historical snapshots:</strong> Capture data at specific time</li>
            <li><strong>Data denormalization:</strong> Join and flatten related data</li>
            <li><strong>Search indexes:</strong> Pre-process data for full-text search</li>
          </ul>
        </div>

        <div class="bg-gray-900 text-sm p-4 rounded-xl border border-gray-700 mt-4">
          <p class="text-yellow-300 font-semibold mb-2">Refreshing Materialized Views:</p>
          <pre><code class="text-white">// Option 1: Scheduled refresh (cron job)
// Run aggregation pipeline periodically
setInterval(() => {
  db.orders.aggregate([
    { /* pipeline */ },
    { $merge: { into: "userOrderStats" } }
  ])
}, 3600000) // Every hour

// Option 2: Trigger-based refresh
// Refresh after data changes
db.orders.insertOne({ /* new order */ })
refreshMaterializedView('userOrderStats')

// Option 3: On-demand refresh
// Refresh when user requests
app.get('/api/stats/refresh', async (req, res) => {
  await refreshUserStats()
  res.json({ message: 'Stats refreshed' })
})</code></pre>
        </div>

        <div class="bg-gray-900 text-sm p-4 rounded-xl border border-gray-700 mt-4">
          <p class="text-yellow-300 font-semibold mb-2">Incremental Updates with $merge:</p>
          <pre><code class="text-white">// Update only changed documents
db.orders.aggregate([
  // Only process recent orders
  { $match: { orderDate: { $gte: new Date('2024-01-01') } } },
  {
    $group: {
      _id: "$userId",
      totalOrders: { $sum: 1 },
      totalSpent: { $sum: "$amount" }
    }
  },
  {
    $merge: {
      into: "userOrderStats",
      on: "_id",  // Match on userId
      whenMatched: "merge",  // Merge new values
      whenNotMatched: "insert"
    }
  }
])

// Much faster than full rebuild!</code></pre>
        </div>

        <div class="bg-gray-900 text-sm p-4 rounded-xl border border-gray-700 mt-4">
          <p class="text-yellow-300 font-semibold mb-2">Adding Indexes to Materialized Views:</p>
          <pre><code class="text-white">// Materialized views are regular collections - you can index them!
db.userOrderStats.createIndex({ totalSpent: -1 })
db.userOrderStats.createIndex({ lastOrderDate: -1 })
db.userOrderStats.createIndex({ totalOrders: 1 })

// Now queries are lightning fast
db.userOrderStats.find({ totalSpent: { $gte: 1000 } })
  .sort({ totalSpent: -1 })
  .limit(100)
// Uses index, super fast!</code></pre>
        </div>

        <div class="bg-gray-900 text-sm p-4 rounded-xl border border-gray-700 mt-4">
          <p class="text-yellow-300 font-semibold mb-2">Example: E-commerce Product Analytics:</p>
          <pre><code class="text-white">// Create materialized view combining products, orders, and reviews
db.orders.aggregate([
  { $unwind: "$items" },
  {
    $group: {
      _id: "$items.productId",
      totalSold: { $sum: "$items.quantity" },
      totalRevenue: { $sum: "$items.total" },
      uniqueCustomers: { $addToSet: "$userId" }
    }
  },
  {
    $lookup: {
      from: "products",
      localField: "_id",
      foreignField: "_id",
      as: "product"
    }
  },
  { $unwind: "$product" },
  {
    $lookup: {
      from: "reviews",
      localField: "_id",
      foreignField: "productId",
      as: "reviews"
    }
  },
  {
    $project: {
      productName: "$product.name",
      category: "$product.category",
      totalSold: 1,
      totalRevenue: 1,
      customerCount: { $size: "$uniqueCustomers" },
      avgRating: { $avg: "$reviews.rating" },
      reviewCount: { $size: "$reviews" }
    }
  },
  { $merge: { into: "productAnalytics" } }
])

// Fast analytics queries
db.productAnalytics.find({ category: "Electronics" })
  .sort({ totalRevenue: -1 })
  .limit(10)</code></pre>
        </div>

        <div class="bg-red-900/20 border border-red-500/30 p-4 rounded-xl mt-4">
          <p class="text-red-300 font-semibold mb-2">⚠️ Considerations:</p>
          <ul class="list-disc list-inside ml-4 text-sm">
            <li><strong>Stale data:</strong> Results outdated until refresh</li>
            <li><strong>Storage cost:</strong> Duplicates data (uses disk space)</li>
            <li><strong>Maintenance:</strong> Need strategy for refreshing</li>
            <li><strong>Consistency:</strong> May show outdated results during refresh</li>
            <li><strong>Write conflicts:</strong> Be careful with concurrent refreshes</li>
          </ul>
        </div>

        <div class="bg-gray-900 text-sm p-4 rounded-xl border border-gray-700 mt-4">
          <p class="text-yellow-300 font-semibold mb-2">Refresh Strategies:</p>
          <ul class="list-disc list-inside ml-4 text-sm">
            <li><strong>Scheduled:</strong> Refresh every X minutes/hours (cron)</li>
            <li><strong>Event-driven:</strong> Refresh after significant data changes</li>
            <li><strong>Hybrid:</strong> Scheduled + manual trigger for urgent updates</li>
            <li><strong>Incremental:</strong> Update only changed data ($merge)</li>
            <li><strong>Time-based:</strong> Refresh during off-peak hours</li>
          </ul>
        </div>

        <p class="mt-4 text-gray-400 text-sm">
          <strong>Pro Tip:</strong> Use materialized views for dashboards and reports that don't need 
          real-time data. The query performance improvement can be 10-100x faster! Refresh hourly or 
          daily depending on your needs. Perfect trade-off between speed and freshness.
        </p>
      </div>`
    },
    {
      title: 'Renaming a Collection',
      difficulty: 'Beginner → Intermediate',
      details: `
      <blockquote class="italic text-gray-400 border-l-4 border-blue-500 pl-4 mb-4">
        Tell the reviewer: Renaming collections in MongoDB is straightforward but requires caution. The operation is atomic but can impact running applications if not handled properly.
      </blockquote>
      <div class="space-y-3 text-gray-300">
        <p class="text-blue-400 font-semibold">Why Rename Collections?</p>
        <ul class="list-disc list-inside ml-4">
          <li>Fix typos or naming mistakes</li>
          <li>Follow new naming conventions</li>
          <li>Improve clarity and consistency</li>
          <li>Reorganize database structure</li>
          <li>Implement versioning (e.g., users_v2)</li>
        </ul>

        <div class="bg-gray-900 text-sm p-4 rounded-xl border border-gray-700 mt-3">
          <p class="text-yellow-300 font-semibold mb-2">Basic Rename Operation:</p>
          <pre><code class="text-white">// Rename within same database
db.oldCollectionName.renameCollection("newCollectionName")

// Example: Fix typo
db.usres.renameCollection("users")

// Rename with dropTarget option (careful!)
db.oldName.renameCollection("newName", true)  // true = drop target if exists</code></pre>
        </div>

        <div class="bg-gray-900 text-sm p-4 rounded-xl border border-gray-700 mt-4">
          <p class="text-yellow-300 font-semibold mb-2">Using renameCollection Command:</p>
          <pre><code class="text-white">// More flexible approach
db.adminCommand({
  renameCollection: "myDatabase.oldCollection",
  to: "myDatabase.newCollection",
  dropTarget: false  // Default: false (don't drop existing target)
})

// Rename across databases (replica set only)
db.adminCommand({
  renameCollection: "db1.collection",
  to: "db2.collection"
})  // Only works in replica sets, not standalone</code></pre>
        </div>

        <div class="bg-blue-900/20 border border-blue-500/30 p-4 rounded-xl mt-4">
          <p class="text-blue-300 font-semibold mb-2">What Happens During Rename:</p>
          <ul class="list-disc list-inside ml-4 text-sm">
            <li><strong>Atomic operation:</strong> All or nothing (no partial rename)</li>
            <li><strong>Preserves data:</strong> All documents transferred</li>
            <li><strong>Preserves indexes:</strong> All indexes maintained</li>
            <li><strong>Brief lock:</strong> Database briefly locked during operation</li>
            <li><strong>Namespace change:</strong> Collection gets new namespace</li>
          </ul>
        </div>

        <div class="bg-gray-900 text-sm p-4 rounded-xl border border-gray-700 mt-4">
          <p class="text-yellow-300 font-semibold mb-2">Safe Rename Pattern:</p>
          <pre><code class="text-white">// 1. Check if target collection name already exists
db.getCollectionNames().includes("newName")  // Should return false

// 2. Perform rename
try {
  db.oldCollection.renameCollection("newCollection")
  print("Rename successful!")
} catch (err) {
  print("Rename failed:", err.message)
}

// 3. Verify rename
db.getCollectionNames()  // Check both old and new names</code></pre>
        </div>

        <div class="bg-red-900/20 border border-red-500/30 p-4 rounded-xl mt-4">
          <p class="text-red-300 font-semibold mb-2">⚠️ Important Warnings:</p>
          <ul class="list-disc list-inside ml-4 text-sm">
            <li><strong>Update application code:</strong> Change collection name in all code</li>
            <li><strong>Active connections:</strong> Existing queries to old name will fail</li>
            <li><strong>Database lock:</strong> Brief write blocking during operation</li>
            <li><strong>Cannot undo:</strong> No rollback (rename back manually if needed)</li>
            <li><strong>Sharded collections:</strong> Cannot rename sharded collections</li>
            <li><strong>System collections:</strong> Cannot rename system.* collections</li>
          </ul>
        </div>

        <div class="bg-gray-900 text-sm p-4 rounded-xl border border-gray-700 mt-4">
          <p class="text-yellow-300 font-semibold mb-2">Rename with Mongoose:</p>
          <pre><code class="text-white">// Get MongoDB connection
const db = mongoose.connection.db

// Rename collection
await db.renameCollection('oldUsers', 'newUsers')

// Update model to use new collection name
const User = mongoose.model('User', userSchema, 'newUsers')

// Or update existing model
mongoose.model('User').collection.name = 'newUsers'</code></pre>
        </div>

        <div class="bg-gray-900 text-sm p-4 rounded-xl border border-gray-700 mt-4">
          <p class="text-yellow-300 font-semibold mb-2">Best Practices for Production:</p>
          <pre><code class="text-white">// 1. Maintenance window approach
// - Schedule during low traffic
// - Notify users of brief downtime
// - Have rollback plan ready

// 2. Blue-Green deployment
// - Create new collection with correct name
// - Copy data: db.oldCollection.find().forEach(doc => db.newCollection.insert(doc))
// - Test with new collection
// - Switch application to use new collection
// - Drop old collection after verification

// 3. Alias approach (if supported by driver)
// - Keep old name as alias temporarily
// - Gradually migrate code to new name
// - Remove alias after full migration</code></pre>
        </div>

        <div class="bg-gray-900 text-sm p-4 rounded-xl border border-gray-700 mt-4">
          <p class="text-yellow-300 font-semibold mb-2">Handling Errors:</p>
          <pre><code class="text-white">// Check for common errors
try {
  db.products.renameCollection("items")
} catch (err) {
  if (err.code === 48) {
    print("Error: Target collection already exists")
  } else if (err.code === 26) {
    print("Error: Source collection doesn't exist")
  } else if (err.code === 20) {
    print("Error: Invalid collection name")
  } else {
    print("Unexpected error:", err.message)
  }
}</code></pre>
        </div>

        <div class="bg-green-900/20 border border-green-500/30 p-4 rounded-xl mt-4">
          <p class="text-green-300 font-semibold mb-2">✅ Deployment Checklist:</p>
          <ul class="list-disc list-inside ml-4 text-sm">
            <li>[ ] Backup database before rename</li>
            <li>[ ] Update all application code references</li>
            <li>[ ] Update database migration scripts</li>
            <li>[ ] Update API documentation</li>
            <li>[ ] Test in staging environment first</li>
            <li>[ ] Schedule during maintenance window</li>
            <li>[ ] Notify team and users</li>
            <li>[ ] Monitor for errors after rename</li>
            <li>[ ] Verify indexes preserved</li>
            <li>[ ] Check application logs</li>
          </ul>
        </div>

        <div class="bg-gray-900 text-sm p-4 rounded-xl border border-gray-700 mt-4">
          <p class="text-yellow-300 font-semibold mb-2">Example: Versioned Collection Migration:</p>
          <pre><code class="text-white">// Scenario: Upgrading users collection to v2 with new schema

// 1. Create new collection with correct name
db.createCollection("users_v2")

// 2. Copy and transform data
db.users.find().forEach(doc => {
  db.users_v2.insert({
    _id: doc._id,
    // Transform data to new schema
    fullName: doc.firstName + " " + doc.lastName,
    email: doc.email,
    // Add new fields with defaults
    verified: false,
    createdAt: doc._id.getTimestamp()
  })
})

// 3. Create indexes on new collection
db.users_v2.createIndex({ email: 1 }, { unique: true })

// 4. Update application to use users_v2

// 5. After verification, rename for clean namespace
db.users.renameCollection("users_old_backup")
db.users_v2.renameCollection("users")

// 6. Keep backup for a while, then drop
// db.users_old_backup.drop()  // After 30 days</code></pre>
        </div>

        <div class="bg-gray-900 text-sm p-4 rounded-xl border border-gray-700 mt-4">
          <p class="text-yellow-300 font-semibold mb-2">Alternative: Collection Aliases (driver-specific):</p>
          <pre><code class="text-white">// Some drivers support aliases (not native MongoDB feature)
// Example with application-level aliasing

// Old code
const oldCollection = db.collection('usres')  // typo

// Transition code (works with both)
const collectionName = process.env.USE_NEW_NAME ? 'users' : 'usres'
const collection = db.collection(collectionName)

// New code (after rename)
const newCollection = db.collection('users')</code></pre>
        </div>

        <p class="mt-4 text-gray-400 text-sm">
          <strong>Pro Tip:</strong> For production systems, consider the blue-green approach instead of 
          direct rename. Create new collection, migrate data, test thoroughly, then switch. This gives 
          you a safe rollback path and zero downtime. Direct rename is best for development or maintenance 
          windows.
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
