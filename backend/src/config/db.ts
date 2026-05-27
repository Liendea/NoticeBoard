import mongoose from "mongoose";

const DATABASE_URL = process.env.DATABASE_URL || "";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(DATABASE_URL || "");
    console.log(`✅ MongoDB ansluten: ${conn.connection.host}`);
  } catch (error: Error | unknown) {
    console.error(
      ` Fel vid anslutning: ${error instanceof Error ? error.message : "Okänt fel"}`,
    );
    process.exit(1); // Stoppa appen om vi inte kan nå databasen
  }
};

export default connectDB;
