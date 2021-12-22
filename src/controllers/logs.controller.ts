import mongoose from "mongoose";
import { LogsModel } from "../backingservices/mongo/models/log.model";

const { Types } = mongoose;

class LOG {
  async getLogByIdFromMongo(id) {
    try {
      const matchRecordByIdByFinOne = await LogsModel.findOne({
        _id: Types.ObjectId(id),
      }).lean();

      return {
        ...(matchRecordByIdByFinOne ? { record: matchRecordByIdByFinOne } : {}),
      };
    } catch (error) {
      throw error;
    }
  }

  async addLogToMongoDB(record) {
    try {
      //console.log(record);
      const data = await LogsModel.insertMany(record);
      //console.log(data)
      return { success: true, data };
    } catch (error) {
      throw error;
    }
  }

  async getAllLogFromMongo() {
    try {
      const data = await LogsModel.find();
      return {
        ...(data ? { elements: data.length, logs: data.reverse() } : {}),
      };
    } catch (error) {
      throw error;
    }
  }
}
const logController = new LOG();

export { logController };
