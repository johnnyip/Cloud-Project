#!/bin/bash

sed -i "s|{{MONGODB_URI}}|${MONGODB_URI}|g" /etc/kafka-connect/mongo-sink.json

# Initialize MongoDB
echo "Initializing MongoDB..."
mongo --quiet --uri ${MONGODB_URI} <<EOF
use kafka;
db.createCollection("kafka_demo");
EOF
echo "MongoDB initialization completed."

# Start Kafka Connect in the background
/connect-distributed.sh /etc/kafka-connect/connect-distributed.properties &

# Wait for Kafka Connect to start
sleep 20

# Deploy the MongoDB Sink Connector
curl -X POST -H "Content-Type: application/json" -d @/etc/kafka-connect/mongo-sink.json http://localhost:8083/connectors

# Wait for the Kafka Connect process to complete
wait
