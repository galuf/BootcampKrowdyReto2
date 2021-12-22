import { Router } from "restify-router";
import { logController } from "../controllers/logs.controller";
const RecordRouter = new Router();

//http://localhost:5000/api/v1/logs/record?id=xxxx
RecordRouter.get("/record", async (req, res) => {
  try {
    const { id } = req.query;
    const data = await logController.getLogByIdFromMongo(id);
    req.responseLogger = JSON.stringify(data);
    return res.json(data);
  } catch (error) {
    req.responseLogger = JSON.stringify({
      error: true,
      errorMessage: error.message,
    });
    return res.json({
      error: true,
      errorMessage: error.message,
    });
  }
});

//http://localhost:5000/api/v1/logs/recordAll
RecordRouter.get("/recordAll", async (req, res) => {
  try {
    const data = await logController.getAllLogFromMongo();
    return res.json(data);
  } catch (error) {
    return res.json({
      error: true,
      errorMessage: error.message,
    });
  }
});

//http://localhost:5000/api/v1/logs/record
RecordRouter.post("/record", async (req, res) => {
  try {
    const response = await logController.addLogToMongoDB(req.body);
    return res.json(response);
  } catch (error) {
    return res.json({
      error: true,
      errorMessage: error.message,
    });
  }
});

export default RecordRouter;
