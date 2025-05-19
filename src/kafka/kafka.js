import { Kafka } from 'kafkajs';
import dotenv from 'dotenv';
dotenv.config();

console.log('Kafka broker:', process.env.KAFKA_BROKER);

if (!process.env.KAFKA_BROKER) {
  throw new Error('Missing KAFKA_BROKER environment variable');
}

const kafka = new Kafka({
  clientId: 'logs-service',
  brokers: [process.env.KAFKA_BROKER],
});

export default kafka;
