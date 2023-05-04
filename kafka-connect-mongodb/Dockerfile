FROM confluentinc/cp-kafka-connect:latest

# Install the MongoDB Connector for Apache Kafka
RUN confluent-hub install --no-prompt mongodb/kafka-connect-mongodb:latest

# Set environment variables
ENV CONNECT_GROUP_ID=your_connect_group_id \
    CONNECT_CONFIG_STORAGE_TOPIC=your_config_storage_topic \
    CONNECT_OFFSET_STORAGE_TOPIC=your_offset_storage_topic \
    CONNECT_STATUS_STORAGE_TOPIC=your_status_storage_topic \
    CONNECT_KEY_CONVERTER=org.apache.kafka.connect.json.JsonConverter \
    CONNECT_VALUE_CONVERTER=org.apache.kafka.connect.json.JsonConverter \
    CONNECT_INTERNAL_KEY_CONVERTER=org.apache.kafka.connect.json.JsonConverter \
    CONNECT_INTERNAL_VALUE_CONVERTER=org.apache.kafka.connect.json.JsonConverter

# Copy the custom MongoDB Sink Connector configuration file
COPY mongo-sink.json /etc/kafka-connect/mongo-sink.json

# Copy the custom entrypoint script
COPY entrypoint.sh /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
