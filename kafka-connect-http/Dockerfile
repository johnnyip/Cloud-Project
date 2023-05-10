# Start from the confluentinc/cp-kafka-connect-base:latest image
FROM confluentinc/cp-kafka-connect-base:latest

# Download and install the connector
RUN confluent-hub install --no-prompt confluentinc/kafka-connect-http:latest

# Expose the Kafka Connect service port
EXPOSE 8083