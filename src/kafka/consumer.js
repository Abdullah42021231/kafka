
import { createLog } from '../modules/log/log.service.js';
import kafka from './kafka.js';

const consumer = kafka.consumer({ groupId: 'logs-group' });

export const consumeLogs = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: process.env.KAFKA_TOPIC, fromBeginning: true });

  await consumer.run({
   eachMessage: async ({ message }) => {
  const rawValue = message.value?.toString();

  console.log('Received message:', rawValue);

  if (!rawValue || !rawValue.trim()) {
    console.warn('⚠️ الرسالة فاضية، تم تجاهلها.');
    return;
  }

  try {
    const log = JSON.parse(rawValue);

    if (!log.userId || !log.action) {
      console.error('⚠️ بيانات غير مكتملة: userId أو action ناقص.', log);
      return;
    }

    await createLog(log); 
    console.log('✅ Log saved:', log);

  } catch (error) {
    console.error('❌ خطأ في تحويل الرسالة إلى JSON:', rawValue, error.message);
  }
}

  });
};
