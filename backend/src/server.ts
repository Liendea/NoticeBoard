import "dotenv/config"; // Importera miljövariablar högst upp
import connectDB from "./config/db.js";
import app from "app.js";

const PORT = process.env.PORT || 3000;

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
  }
};

startApp();
