#!/bin/bash

sed -i "s|{{MONGODB_URL}}|${MONGODB_URL}|g" /etc/kafka-connect/mongo-sink.json
sed -i "s|{{OPENFAAS_PASSWORD}}|${PASSWORD}|g" /etc/kafka-connect/http-sink.json
sed -i "s|{{OPENFAAS_URL}}|${OPENFAAS_URL}|g" /etc/kafka-connect/http-sink.json
sed -i "s|{{CONNECT_BOOTSTRAP_SERVERS}}|${CONNECT_BOOTSTRAP_SERVERS}|g" /etc/kafka-connect/http-sink.json

# Start Kafka Connect in the background
bash /etc/confluent/docker/run &

# Wait for Kafka Connect to start, or print the curled message
while ! curl -s http://localhost:8083/ | grep -q 'version'; do
  echo "Waiting for Kafka Connect to start..."
  sleep 5
done

# Deploy the MongoDB Sink Connector
curl -X POST -H "Content-Type: application/json" -d @/etc/kafka-connect/mongo-sink.json http://localhost:8083/connectors
curl -X POST -H "Content-Type: application/json" -d @/etc/kafka-connect/http-sink.json http://localhost:8083/connectors

# Wait for the Kafka Connect process to complete
wait
