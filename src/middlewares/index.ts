import { logController } from "../controllers/logs.controller";
import logger from "morgan";

export const loggerRegister = logger(async (tokens, req,res)=>{

  let url = (tokens.url (req, res)).split('?')
  let endPoint = url[0]
  let query = url[1] ? "?"+url[1] : ''

  const log =  {
    "key": req.key,
    "logs": {
      "typeEvent": tokens.method (req, res),
      "endpoint": endPoint,
      "query": query,
      "body": req.body,
      "response": req.responseLogger,
  }}

  const response = await logController.addLogToMongoDB(log);
})