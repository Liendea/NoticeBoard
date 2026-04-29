import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGODB_URI || "");
    console.log(`✅ MongoDB ansluten: ${conn.connection.host}`);
  } catch (error: any) {
    console.error(` Fel vid anslutning: ${error.message}`);
    process.exit(1); // Stoppa appen om vi inte kan nå databasen
  }
};

export default connectDB;
