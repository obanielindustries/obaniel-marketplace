// i will run some commands here when i create a new cluster in react;

import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected successfully ✅");
  } catch (error) {
    console.log("Error", error.message);
    process.exit(1); // exit the code entirely
  }
};

export default connectDB;
