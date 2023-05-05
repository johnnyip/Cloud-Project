const axios = require('axios');
const kafka = require('kafka-node');
const client = new kafka.KafkaClient({ kafkaHost: process.env.KAFKA_URL !== undefined ? process.env.KAFKA_URL : 'kafka:9092' });

const topicName = "test_topic"
const admin = new kafka.Admin(client);

const sendMessage = require('./sendMessage');
const mongodbInit = require('./mongodb');

console.log("host: " + process.env.KAFKA_URL)

const topicsToCreate = [
    { topic: topicName, partitions: 1, replicationFactor: 1, },
    { topic: "config_storage", partitions: 1, replicationFactor: 1, configEntries: [{ name: 'cleanup.policy', value: 'compact' }] },
    { topic: "offset_storage", partitions: 1, replicationFactor: 1, configEntries: [{ name: 'cleanup.policy', value: 'compact' }] },
    { topic: "status_storage", partitions: 1, replicationFactor: 1, configEntries: [{ name: 'cleanup.policy', value: 'compact' }] },
];


admin.createTopics(topicsToCreate, (err, result) => {
    if (err) {
        console.error('Error creating topic:', err);
    } else {
        console.log(`Topic "${topicName}" created successfully`);
    }
    client.close();
});

mongodbInit();

//Post request with json body, with axois, to deploy sink config
//Loop until not refused

// axios.post('http://kafka-connect-mongo:8083/connectors', {
//     "name": "mongo-sink",
//     "config": {
//         "connector.class": "com.mongodb.kafka.connect.MongoSinkConnector",
//         "tasks.max": "1",
//         "topics": "test_topic",
//         "connection.uri": "mongodb://mongodb:27017",
//         "database": "kafka",
//         "collection": "kafka",
//         "key.converter": "org.apache.kafka.connect.json.JsonConverter",
//         "value.converter": "org.apache.kafka.connect.json.JsonConverter",
//         "key.converter.schemas.enable": "false",
//         "value.converter.schemas.enable": "false"
//     }
// })
//     .then((res) => {
//         console.log(`statusCode: ${res.statusCode}`)
//         console.log(res)
//     })
//     .catch((error) => {
//         console.error(error)
//     })


// Define the function to fetch data from the URL
async function fetchData(url) {
    try {
        const response = await axios.get(url);
        sendMessage(topicName, JSON.stringify(response.data))
            .then((data) => {
                console.log('Message sent:', data);
            })
            .catch((err) => {
                console.error('Error sending message:', err);
            });
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
}

// Call the fetchData function every 5 seconds
const urlToFetch = 'https://data.weather.gov.hk/weatherAPI/smart-lamppost/smart-lamppost.php?pi=DF1020&di=04';
setInterval(() => {
    fetchData(urlToFetch);
}, 10000);
