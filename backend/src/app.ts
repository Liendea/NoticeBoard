import express from "express";
import cors from "cors";
import type { Request, Response } from "express";
import todoRoutes from "./routes/todoRoutes.js";

const app = express();

// --- MIDDLEWARE ---
// Funktioner som körs på varje inkommande anrop innan det når routsen
app.use(cors()); // Aktiverar CORS så att frontenden (som körs på annan port) får tillåtelse att prata med backenden
app.use(express.json()); // Gör att Express kan tolka inkommande JSON-data i anropets body (req.body)
// Utan denna skulle JSON-data från t.ex. fetch() vara undefined

// --- ROUTES ---
app.use("/api/todos", todoRoutes); // Kopplar på alla rutter som definierats i todoRoutes-filen

// En enkel "Health Check"-route för att snabbt kunna verifiera att servern svarar
// Denna ligger direkt på roten (http://localhost:3000/)
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Backend är igång!" });
});

export default app;
