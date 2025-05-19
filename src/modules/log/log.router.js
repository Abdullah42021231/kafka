import { Router } from "express";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import { getLogs, postLog } from "./log.controller.js";

const logRouter = Router();

logRouter.post('/send', 
   asyncHandler(postLog)
);

//get log
logRouter.get('/', 
   asyncHandler(getLogs)
)


export default logRouter