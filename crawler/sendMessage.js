const kafka = require('kafka-node');

const sendMessage = (topicName, message, kafkaHost = 'localhost:9092') => {
    return new Promise((resolve, reject) => {
      const client = new kafka.KafkaClient({ kafkaHost });
      const producer = new kafka.Producer(client);
  
      producer.on('ready', () => {
        const payloads = [
          {
            topic: topicName,
            messages: message,
          },
        ];
  
        producer.send(payloads, (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
          producer.close();
          client.close();
        });
      });
  
      producer.on('error', (err) => {
        reject(err);
      });
    });
  };
  
  module.exports = sendMessage;
  