const { MongoClient } = require('mongodb');

// Replace the following with your actual MongoDB connection URI
const uri = process.env.MONGODB_URL !== undefined ? process.env.MONGODB_URL : 'mongodb://localhost:27017';

// Replace the following with your actual database and collection names
const dbName = 'kafka';
const collectionName = 'kafka_demo';

async function main() {
    // Connect to MongoDB
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    await client.connect();

    // Create (or use) a database
    const db = client.db(dbName);

    // Create (or use) a collection
    const collection = db.collection(collectionName);

    // Close the connection
    await client.close();
}

main().catch(console.error);
