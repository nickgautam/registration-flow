import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Mongo Database Connected Successfully");
  } catch (err) {
    throw new Error("Unable to connect database");
  }
};
