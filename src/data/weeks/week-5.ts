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
    }
  ],
  
  topics: [
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
