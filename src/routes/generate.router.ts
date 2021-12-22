import { Router } from "restify-router";
import { v4 } from "uuid";
import { sha256 } from "js-sha256";
import { generateController } from "../controllers/generate.controller";
import { loggerRegister } from "../middlewares";
const GenerateRouter = new Router();

//http://localhost:5000/api/v1/generate/uuid4
GenerateRouter.post("/uuid4", loggerRegister, async (req, res) => {
  try {
    const key = v4();
    const data = { key, ...req.body, type: "uuid" };
    const response = await generateController.addGenerateToMongoDB(data);
    req.responseLogger = JSON.stringify(response);
    req.key = key;
    return res.json(response);
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

//http://localhost:5000/api/v1/generate/sha256
GenerateRouter.post("/sha256", loggerRegister, async (req, res) => {
  try {
    const cad = new Date();
    const key = sha256(String(cad.getTime()));
    const data = { key, ...req.body, type: "sha256" };
    const response = await generateController.addGenerateToMongoDB(data);
    req.responseLogger = JSON.stringify(response);
    req.key = key;
    return res.json(response);
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

export default GenerateRouter;
