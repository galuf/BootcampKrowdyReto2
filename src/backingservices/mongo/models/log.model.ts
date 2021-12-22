import mongoose, { Schema, Types } from "mongoose";
import { LogsMongoDB } from "../connection";

const Log = new Schema({
  eventDate: {type: Date, default: Date.now},
  typeEvent: {type: String, enum: ['POST', 'PUT', 'GET', 'DEL']},
  endpoint: {type: String},
  query: {type: String},
  body: {type: Schema.Types.Mixed},
  response: {type: String}
});

const LogsSchema = new Schema(
  {
    key: {type: String},
    logs: {type: Log}
  }
);

const LogsModel = LogsMongoDB.model("Logs", LogsSchema);

export { LogsModel };
