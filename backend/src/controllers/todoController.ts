import type { Request, Response } from "express";
import {
  updateTodoService,
  deleteTodoService,
  getTotalTodosService,
  createTodoService,
  getTodosService,
} from "../services/todoService.js";

// ----- Hämta alla To-Do ----- //
export const getTodos = async (req: Request, res: Response) => {
  try {
    // Plocka ut query-parametrar från URL:en (t.ex. ?search=kaffe)
    const { completed, search } = req.query as {
      completed?: string;
      search?: string;
    };

    // Anropa servicen med dessa parametrar
    const todos = await getTodosService(completed, search);

    // Skicka tillbaka resultatet till användaren
    res.json(todos);
  } catch (error) {
    console.error("Fel i getTodos controller:", error);
    res.status(500).json({ message: "Fel vid hämtning av todos" });
  }
};

// ----- Skapa ny To-do + returnera den skapade todon så att ui kan uppdaetras korrekt ----- //
export const createTodo = async (req: Request, res: Response) => {
  try {
    // Skicka datan till servicen
    const newTodo = await createTodoService(req.body);

    // Om allt gick bra: 201 Created
    res.status(201).json(newTodo);
  } catch {
    // Om t.ex. valideringen i schemat misslyckas (t.ex. saknad titel)
    res.status(400).json({ message: "Kunde inte skapa todo" });
  }
};

// -----  Ändra en To-do ----- //
export const updateTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string };
    const updatedTodo = await updateTodoService(id, req.body);
    res.json(updatedTodo);
  } catch {
    res.status(400).json({ message: "Fel vid uppdatering" });
  }
};

// ----- Ta bort en To-do + returnera den borttagna todon så att UI kan uppdateras korrekt ----- //
export const deleteTodo = async (req: Request, res: Response) => {
  try {
    // Använd typing för att plocka ut id
    const { id } = req.params as { id: string };
    // Anropa servicen
    const deletedTodo = await deleteTodoService(id);
    // Om allt gick bra returnera den raderade todon
    res.json(deletedTodo);
  } catch (err) {
    // Om servicen kastade "Todo not found", skicka 404
    if (err instanceof Error && err.message === "Todo not found") {
      return res.status(404).json({ message: "Todon hittades inte" });
    }
    // För alla andra fel (t.ex. databasen är nere), skicka 500
    res.status(500).json({ message: "Ett oväntat fel uppstod vid radering" });
  }
};

// ---- Räkna antalet todos i Db ---- //
export const getTotalInDb = async (req: Request, res: Response) => {
  try {
    // Anropa servicen
    const total = await getTotalTodosService();
    res.json({ count: total });
  } catch (error) {
    console.error("Fel i getTotalInDb controller:", error);
    // Om något går fel (t.ex. databasen svarar inte)
    res.status(500).json({ error: "Kunde inte räkna todos" });
  }
};
