import kafka from "./kafka.js";

const producer = kafka.producer();

const connectProducer = async () => {
  await producer.connect();
};

const produceLog = async (log) => {
   console.log('Producing log:', log);
  await producer.send({
    topic: process.env.KAFKA_TOPIC,
    messages: [{ value: JSON.stringify(log) }],
  });
};

export { connectProducer, produceLog };
