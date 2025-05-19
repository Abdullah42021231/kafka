import { LOG } from "../../../db/models/log.model.js";
import { AppError } from "../../utils/appError.js";

export const createLog = async (log) => {
  if (!log.userId || !log.action) {
    throw new AppError('Missing required fields: userId or action');
  }
  try {
    console.log('Attempting to save log:', log);
    const savedLog = await LOG.create(log);
    console.log('Log successfully saved:', savedLog);
  } catch (error) {
    console.error('Error saving log to DB:', error);
    throw error;
  }
};
