#!/bin/bash

# Wait for Kafka Connect to start, or print the curled message
while ! curl -s http://${CONNECT_REST_ADVERTISED_HOST_NAME}:8083/ | grep -q 'version'; do
  echo "Waiting for Kafka Connect to start..."
  sleep 5
done

# Deploy the MongoDB Sink Connector
curl -X POST -H "Content-Type: application/json" -d @/etc/kafka-connect/http-sink.json http://${CONNECT_REST_ADVERTISED_HOST_NAME}:8084/connectors

# Wait for the Kafka Connect process to complete
wait
