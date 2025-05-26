import mongoose from "mongoose";
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/weatherApp")
    console.log('MongoDB connected');
  } catch (error) {
    console.error('DB Connection Error:', error);
  }
};

export default connectDB;
