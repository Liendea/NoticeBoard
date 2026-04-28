import type { Request, Response } from "express";
import { Todo } from "../models/Todo.js";

// HÄmta alla To-Do
// med query filter, t.ex ?completed=true eller ?search=ikaffe
export const getTodos = async (req: Request, res: Response) => {
  try {
    const { completed, search } = req.query;
    let queryFilter: any = {};

    if (completed !== undefined) {
      queryFilter.completed = completed === "true";
    }

    if (search) {
      queryFilter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }
    const todos = await Todo.find(queryFilter);
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: "Fel vid hämtning av todos" });
  }
};

// SKapa en ny To-do + retiurnera den skapade todon så att ui kan uppdaetras korrekt
export const createTodo = async (req: Request, res: Response) => {
  const newTodo = new Todo(req.body);
  await newTodo.save();
  res.status(201).json(newTodo);
};

// Ändra en To-do
export const updateTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedTodo = await Todo.findByIdAndUpdate(id, req.body, {
      returnDocument: "after",
      runValidators: true,
    });
    if (!updatedTodo) return res.status(404).json({ message: "Hittade ej" });
    res.json(updatedTodo);
  } catch (error) {
    res.status(400).json({ message: "Fel vid uppdatering" });
  }
};

// Ta bort en To-do + returnera den borttagna todon så att UI kan uppdateras korrekt
export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
    res.json(deletedTodo);
  } catch (err) {
    res.status(500).json({ message: "Fel vid radering" });
  }
};

// Räkna todos
export const getTotalInDb = async (req: Request, res: Response) => {
  try {
    const total = await Todo.countDocuments();
    res.json({ count: total });
  } catch (error) {
    res.status(500).json({ error: "Kunde inte räkna todos" });
  }
};
