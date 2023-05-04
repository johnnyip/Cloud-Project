FROM confluentinc/cp-kafka-connect:latest

# Install the MongoDB Connector for Apache Kafka
RUN confluent-hub install --no-prompt mongodb/kafka-connect-mongodb:latest

# Copy the custom MongoDB Sink Connector configuration file
COPY mongo-sink.json /etc/kafka-connect/mongo-sink.json

# Copy the custom entrypoint script
COPY entrypoint.sh /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]