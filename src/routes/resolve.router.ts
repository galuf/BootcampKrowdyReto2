import { Router } from "restify-router";
import { generateController } from "../controllers/generate.controller";
import { loggerRegister } from "../middlewares";
const ResolveRouter = new Router();

//http://localhost:5000/api/v1/resolve/uuid4All
ResolveRouter.get("/uuid4All", async (req, res) => {
  try {
    const data = await generateController.getAllGenerateFromMongo("uuid");
    return res.json(data);
  } catch (error) {
    return res.json({
      error: true,
      errorMessage: error.message,
    });
  }
});

//http://localhost:5000/api/v1/resolve/sha256All
ResolveRouter.get("/sha256All", async (req, res) => {
  try {
    const data = await generateController.getAllGenerateFromMongo("sha256");
    return res.json(data);
  } catch (error) {
    return res.json({
      error: true,
      errorMessage: error.message,
    });
  }
});

//http://localhost:5000/api/v1/resolve/uuid4?id=xxxx
ResolveRouter.get("/uuid4", loggerRegister, async (req, res) => {
  try {
    const { id } = req.query;
    const data = await generateController.getGenerateByIdFromMongo(id);
    req.key = data.hash.key;
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

//http://localhost:5000/api/v1/resolve/sha256?id=xxxx
ResolveRouter.get("/sha256", loggerRegister, async (req, res) => {
  try {
    const { id } = req.query;
    const data = await generateController.getGenerateByIdFromMongo(id);
    req.key = data.hash.key;
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

export default ResolveRouter;
