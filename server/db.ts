import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

const dbUrl = process.env.DATABASE_URL as string;

mongoose.set('strictQuery', false);

export const connectDB = async () => {
  try {
    await mongoose.connect(dbUrl);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export default mongoose;
