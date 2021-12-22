import mongoose, { Schema, Types } from "mongoose";
import { LogsMongoDB } from "../connection";

const GenerateSchema = new Schema({
  key: { type: String },
  expiredAt: { type: Date, default: Date.now() + 1000 * 3600 * 24 * 30 },
  type: { type: String, enum: ["uuid", "sha256"] },
});

const GenerateModel = LogsMongoDB.model("Hash", GenerateSchema);

export { GenerateModel };
