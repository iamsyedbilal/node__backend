import mongoose from "mongoose";

export async function connectDB() {
  try {
    const connectionInstance = await mongoose.connect(process.env.MONGODB_URI);
    console.log(
      `MongoDB connected to the ${connectionInstance.connection.host}`,
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}
