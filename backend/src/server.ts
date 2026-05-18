import "dotenv/config"; // Importera miljövariablar högst upp
import mongoose from "mongoose"; // Behövs för att stänga DB-anslutningen
import connectDB from "./config/db.js";
import app from "app.js";

const PORT = process.env.PORT || 3000;
// Vi skapar en variabel för att hålla server-instansen
let server: any;
// START-FUNKTION
const startApp = async () => {
  try {
    // 1. Vänta på anslutning databasen
    await connectDB();

    // 2. Starta servern först när DB är redo
    app.listen(PORT, () => {
      console.log(` Servern körs på http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(" Kunde inte starta appen pga databasfel:", error);
    process.exit(1);
  }
};

// --- GRACEFUL SHUTDOWN LOGIK ---
// Denna funktion hanterar snygg avstängning
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
    process.exit(0);
  }
};

// Lyssna på signaler från terminalen (t.ex. Ctrl+C)
process.on("SIGINT", () => gracefulShutdown("SIGINT")); // manuell avstängning
process.on("SIGTERM", () => gracefulShutdown("SIGTERM")); // automatiskt avstämngnng tex om databasen låg på molntjänst som behöver starta om

startApp();
