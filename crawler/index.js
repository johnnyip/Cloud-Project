const axios = require('axios');
const kafka = require('kafka-node');
const client = new kafka.KafkaClient({ kafkaHost: process.env.KAFKA_URL !== undefined ? process.env.KAFKA_URL :'kafka:9092' });

const topicName = "test-topic"
const admin = new kafka.Admin(client);

const sendMessage = require('./sendMessage');

console.log("host: "+process.env.KAFKA_URL )

const topicsToCreate = [
    {
        topic: topicName,
        partitions: 1,
        replicationFactor: 1,
    },
];


admin.createTopics(topicsToCreate, (err, result) => {
    if (err) {
        console.error('Error creating topic:', err);
    } else {
        console.log(`Topic "${topicName}" created successfully`);
    }
    client.close();
});

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
