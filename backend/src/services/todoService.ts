import { Todo } from "../models/Todo.js";

type CreateTodoInput = {
  title: string;
  description?: string;
  completed?: boolean;
};

// -----  Business lgoic för att hämta todos -----//
export const getTodosService = async (completed?: string, search?: string) => {
  const queryFilter: Record<string, unknown> = {};

  // Logik för att filtrera på status
  if (completed !== undefined) {
    queryFilter.completed = completed === "true";
  }

  // Logik för sökning — escapa specialtecken för att förhindra regex-injektion/ReDoS
  if (search) {
    const safeSearch = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    queryFilter.$or = [
      { title: { $regex: safeSearch, $options: "i" } },
      { description: { $regex: safeSearch, $options: "i" } },
    ];
  }

  // Utför själva sökningen i databasen
  return await Todo.find(queryFilter);
};

// -----  Business logic för att skapa en ny todo ----- //
export const createTodoService = async (todoData: CreateTodoInput) => {
  // Här kan du lägga till extra logik innan sparande
  const newTodo = new Todo(todoData);

  // .save() kommer validera mot Mongoose-schemat
  await newTodo.save();
  return newTodo;
};

// -----  Businesslogic för att uppdatera ----- //
export const updateTodoService = async (
  id: string,
  updateData: Partial<CreateTodoInput>,
) => {
  const updatedTodo = await Todo.findByIdAndUpdate(id, updateData, {
    returnDocument: "after",
    runValidators: true,
  });

  if (!updatedTodo) throw new Error("Todo not found");
  return updatedTodo;
};

// ----- Business logic för att radera ----- //
export const deleteTodoService = async (id: string) => {
  const deletedTodo = await Todo.findByIdAndDelete(id);
  if (!deletedTodo) throw new Error("Todo not found");
  return deletedTodo;
};

// -----  Business logic för att räkna alla todos ----- //
export const getTotalTodosService = async () => {
  return await Todo.countDocuments();
};
