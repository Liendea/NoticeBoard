import "dotenv/config"; // Importera miljövariablar högst upp
import { Server } from "http";
import mongoose from "mongoose";
import connectDB from "./config/db.js";
import app from "./app.js";

const PORT = process.env.PORT || 3000;

//  variabel för att hålla server-instansen
let server: Server | null = null;

// START-FUNKTION
const startApp = async () => {
  try {
    // 1. Vänta på anslutning databasen
    await connectDB();

    // 2. Starta servern och SPARA INSTANSEN i server variabel!
    server = app.listen(PORT, () => {
      console.log(`🚀 Servern körs på http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(" Kunde inte starta appen pga databasfel:", error);
    process.exit(1);
  }
};

// --- GRACEFUL SHUTDOWN LOGIK ---
const gracefulShutdown = async (signal: string) => {
  console.log(`\n♻️  Tagit emot ${signal}. Påbörjar snygg avstängning...`);

  if (server) {
    // 1. Stoppa servern från att ta emot nya anrop
    server.close(async () => {
      console.log("HTTP-servern stängd.");

      // 2. Stäng MongoDB-anslutningen
      try {
        await mongoose.connection.close();
        console.log("MongoDB-anslutning stängd.");
        process.exit(0); // Avsluta framgångsrikt
      } catch (err) {
        console.error("Fel vid stängning av databas:", err);
        process.exit(1);
      }
    });
  } else {
    // Om servern inte ens hann starta stänger vi bara ner direkt
    process.exit(0);
  }
};

// Lyssna på signaler från terminalen (t.ex. Ctrl+C)
process.on("SIGINT", () => gracefulShutdown("SIGINT"));
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));

startApp();
