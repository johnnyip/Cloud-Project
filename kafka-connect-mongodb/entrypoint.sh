#!/bin/bash

sed -i "s/{{MONGODB_URL}}/${MONGODB_URL}/g" /etc/kafka-connect/mongo-sink.json

# Start Kafka Connect in the background
/connect-distributed.sh /etc/kafka-connect/connect-distributed.properties &

# Wait for Kafka Connect to start
sleep 20

# Deploy the MongoDB Sink Connector
curl -X POST -H "Content-Type: application/json" -d @/etc/kafka-connect/mongo-sink.json http://localhost:8083/connectors

# Wait for the Kafka Connect process to complete
wait
