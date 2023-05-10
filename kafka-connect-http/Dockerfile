# Start from the confluentinc/cp-kafka-connect-base:latest image
FROM confluentinc/cp-kafka-connect-base:latest

# Download and install the connector
RUN confluent-hub install --no-prompt confluentinc/kafka-connect-http:latest

# Set environment variables
ENV CONNECT_GROUP_ID=test_group \
    CONNECT_CONFIG_STORAGE_TOPIC=config_storage2 \
    CONNECT_OFFSET_STORAGE_TOPIC=offset_storage2 \
    CONNECT_STATUS_STORAGE_TOPIC=status_storage2 \
    CONNECT_KEY_CONVERTER=org.apache.kafka.connect.json.JsonConverter \
    CONNECT_VALUE_CONVERTER=org.apache.kafka.connect.json.JsonConverter \
    CONNECT_INTERNAL_KEY_CONVERTER=org.apache.kafka.connect.json.JsonConverter \
    CONNECT_INTERNAL_VALUE_CONVERTER=org.apache.kafka.connect.json.JsonConverter 

# Expose the Kafka Connect service port
EXPOSE 8083

# Copy the custom MongoDB Sink Connector configuration file
COPY http-sink.json /etc/kafka-connect/http-sink.json

# Copy the custom entrypoint script
COPY entrypoint.sh /entrypoint.sh


ENTRYPOINT ["/entrypoint.sh"]
