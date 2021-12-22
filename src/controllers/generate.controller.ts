import mongoose from "mongoose";
import { GenerateModel } from "../backingservices/mongo/models/generate.model";

const { Types } = mongoose;

class GENERATE {
  async addGenerateToMongoDB(record) {
    try {
      const data = await GenerateModel.insertMany(record);
      return { success: true, data };
    } catch (error) {
      throw error;
    }
  }

  async getGenerateByIdFromMongo(id) {
    try {
      const matchHashByIdByFinOne = await GenerateModel.findOne({
        _id: Types.ObjectId(id),
      }).lean();

      return {
        ...(matchHashByIdByFinOne ? { hash: matchHashByIdByFinOne } : {}),
      };
    } catch (error) {
      throw error;
    }
  }

  async getAllGenerateFromMongo(type) {
    try {
      const allUuid = await GenerateModel.find({
        type: type,
      }).lean();
      return {
        ...(allUuid ? { elements: allUuid.length, [type]: allUuid } : {}),
      };
    } catch (error) {
      throw error;
    }
  }
}
const generateController = new GENERATE();

export { generateController };
