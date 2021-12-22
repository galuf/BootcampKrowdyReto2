import { Router } from "restify-router";
import RecordRouter from "./record.router";
import ResolveRouter from "./resolve.router";
import GenerateRouter from "./generate.router";
const RouterManager = new Router();

RouterManager.add("/logs", RecordRouter);
RouterManager.add("/resolve", ResolveRouter);
RouterManager.add("/generate", GenerateRouter);

export default RouterManager;
