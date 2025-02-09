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
