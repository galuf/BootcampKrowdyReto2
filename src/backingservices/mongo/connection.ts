import mongoose from "mongoose";

let endpointMongoDB = process.env.ENDPOINT_MONGO_DB;

const LogsMongoDB = mongoose.createConnection(endpointMongoDB);

export { LogsMongoDB };