import { Router } from "express";
import * as todoController from "../controllers/todoController.js";

const router = Router();

// Alla routes som har med To-Do att göra'

// Hämta alla todos
router.get("/", todoController.getTodos);
// Skapa en ny todo
router.post("/", todoController.createTodo);
// Ändra en todo
router.patch("/:id", todoController.updateTodo);
// Ta bort en todo
router.delete("/:id", todoController.deleteTodo);

export default router;
