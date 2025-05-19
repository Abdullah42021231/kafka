import { produceLog } from "../../kafka/producer.js";
import * as logsService from "./log.service.js"
 const getLogs = async (req, res, next) => {
  try {
    const { userId, action, page = 1, limit = 10 } = req.query;
    const filter = {};

    if (userId) filter.userId = userId;
    if (action) filter.action = action;

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);

    if (isNaN(pageNum) || pageNum < 1) {
      return res.status(400).json({ error: 'Invalid page number' });
    }

    if (isNaN(limitNum) || limitNum < 1) {
      return res.status(400).json({ error: 'Invalid limit number' });
    }

    const logs = await logsService.getLogs(filter, pageNum, limitNum, { timestamp: -1 });
    res.json(logs);
  } catch (error) {
    next(error);
  }
};


const postLog = async (req, res, next) => {
  try {
    const log = req.body;
    await produceLog(log);
    res.status(201).json({ message: 'Log sent to Kafka' });
  } catch (error) {
    next(error);
  }
};

export{
    getLogs,
    postLog
}