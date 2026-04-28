import { Router } from "express";
import * as todoController from "../controllers/todoController.js";

const router = Router();

// Alla routes som har med To-Do att göra
// OBS ordnignen är VIKTIG!

// 1. Specifika rutter först
//Räkna antal todos i db
router.get("/count", todoController.getTotalInDb);

// 2. Allmänna rutter sen
// Hämta alla todos
router.get("/", todoController.getTodos);
// Skapa en ny todo
router.post("/", todoController.createTodo);

// 3. Rutter med ID-parametrar sist
// Ändra en todo
router.patch("/:id", todoController.updateTodo);
// Ta bort en todo
router.delete("/:id", todoController.deleteTodo);

export default router;
