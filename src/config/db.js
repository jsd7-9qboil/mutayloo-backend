import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();  // Make sure this is at the top

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected successfully 🟢");
  } catch (error) {
    console.error("Error connecting to MongoDB 🔴:", error);
    process.exit(1);
  }
};

export default connectDB;
