import { Item } from "@/models/items";
import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    if (process.env.MONGODB_URI && mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log("db connected");
    }
  } catch (error) {
    console.error(error);
  }
};

export const resetDB = async () => {
  try {
    if (process.env.MONGODB_URI && mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log("db connected");
    }

    await Item.collection.dropIndexes();
    console.log("Indexes dropped.");

    await Item.syncIndexes();
    console.log("New indexes created.");

    mongoose.connection.close();
  } catch (error) {
    console.error("Error resetting DB:", error);
  }
};
