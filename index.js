// Import modules
import './env.js';
import express from 'express';
import debug from 'debug';
import { ConnectDB } from './db/connection.js';
import { globalError } from './src/middleware/globalError.js';
import logRouter from './src/modules/log/log.router.js';
import { consumeLogs } from './src/kafka/consumer.js';
import { connectProducer } from './src/kafka/producer.js'; // ✅ أضفنا هذا السطر

// Create server
const app = express();
const port = 3001;
const logger = debug('node-kafka:server');

// Middleware
app.use(express.json());

// Routes
app.use('/api/log', logRouter);

// Global error handler
app.use(globalError);

// Start server
const start = async () => {
  try {
    await ConnectDB();
    await connectProducer();       
    await consumeLogs();           
    app.listen(port,'0.0.0.0', () => logger(`Server running on port ${port}`));
  } catch (error) {
    console.error(' Server failed to start:', error);
  }
};

start();
