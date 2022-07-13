import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(`MongoDB connected: ${conn.connection.host}`.green.underline);
  } catch (error) {
    console.error(`Error: ${error}`.red.underline.bold);
    process.exit(1);
  }
};

export default connectDB;
