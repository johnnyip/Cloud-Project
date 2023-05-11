const MongoClient = require('mongodb').MongoClient;

const mongoUrl = process.env.MONGODB_URL || 'mongodb://localhost:27017';
const mongoDbName = process.env.MONGO_DB_NAME || 'test-db';
const mongoCollectionName = process.env.MONGO_COLLECTION_NAME || 'test-collection';

module.exports = async (event, context) => {
    // The Kafka message is supplied in the event parameter
    const message = event.body;

    console.log(`Kafka message: ${message}`);

    // Connect to MongoDB
    const url = mongoUrl
    const client = new MongoClient(url);

    try {
        await client.connect();
        const db = client.db(mongoDbName); // Please replace with your database name
        const collection = db.collection(mongoCollectionName); // Please replace with your collection name

        // Insert the Kafka message into the MongoDB collection
        let doc = { message: message };
        const result = await collection.insertOne(doc);
        console.log(`Successfully inserted: ${result.insertedId}`);
    } finally {
        await client.close();
    }
}