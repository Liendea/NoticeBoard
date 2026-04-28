import "dotenv/config";
import express from "express";
import cors from "cors";
import type { Request, Response } from "express";
import mongoose from "mongoose";
import todoRoutes from "./routes/todoRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/todos", todoRoutes);

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || "";

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("✅ Ansluten till MongoDB!");
    // Starta servern när anslutningen till MongoDB är framgångsrik
    app.listen(PORT, () => {
      console.log(`🚀 Servern fortfarande körs på http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Fel vid anslutning till MongoDB:", error);
  });

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Backend och Databas är igång!" });
});
