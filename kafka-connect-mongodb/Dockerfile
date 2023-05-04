FROM confluentinc/cp-kafka-connect:latest

# Create the /etc/apt/sources.list.d directory
RUN mkdir -p /etc/apt/sources.list.d

# Add MongoDB repository
RUN echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/4.4 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-4.4.list && \
    apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 9DA31620334BD75D9DCB49F368818C72E52529D4 && \
    apt-get update

# Install the MongoDB Shell
RUN apt-get install -y mongodb-org-shell

# Install the MongoDB Connector for Apache Kafka
RUN confluent-hub install --no-prompt mongodb/kafka-connect-mongodb:latest

# Copy the custom MongoDB Sink Connector configuration file
COPY mongo-sink.json /etc/kafka-connect/mongo-sink.json

# Copy the custom entrypoint script
COPY entrypoint.sh /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]