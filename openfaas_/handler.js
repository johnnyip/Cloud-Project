const { Kafka } = require('kafkajs');
const { MongoClient } = require('mongodb');

const kafkaBrokers = process.env.KAFKA_BROKERS || 'localhost:9092';
const kafkaTopic = process.env.KAFKA_TOPIC || 'test-topic';
const mongoUrl = process.env.MONGODB_URL || 'mongodb://localhost:27017';
const mongoDbName = process.env.MONGO_DB_NAME || 'test-db';
const mongoCollectionName = process.env.MONGO_COLLECTION_NAME || 'test-collection';

const kafka = new Kafka({
    clientId: 'kafka-mongo-function',
    brokers: kafkaBrokers.split(',')
});

const mongoClient = new MongoClient(mongoUrl);

async function saveMessageToMongo(message) {
    await mongoClient.connect();
    const db = mongoClient.db(mongoDbName);
    const collection = db.collection(mongoCollectionName);
    await collection.insertOne(message);
    await mongoClient.close();
}

async function consumeFromKafka() {
    const consumer = kafka.consumer({ groupId: 'kafka-mongo-function-group' });
    await consumer.connect();
    await consumer.subscribe({ topic: kafkaTopic });

    await consumer.run({
        eachMessage: async ({ message }) => {
            const parsedMessage = JSON.parse(message.value.toString());
            await saveMessageToMongo(parsedMessage);
        }
    });
}

module.exports = async (event, context) => {
    try {
        await consumeFromKafka();
        return context
            .status(200)
            .succeed('Kafka consumer is running and saving messages to MongoDB');
    } catch (error) {
        return context
            .status(500)
            .fail(`Error: ${error.message}`);
    }
};


