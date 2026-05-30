// Typ för en todo som kommer från backend (med _id och completed)
export type TodoType = {
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  completed: boolean;
  _id: string;
};

// Typ för att skapa en ny todo (utan _id och completed som sätts i backend)
export type NewTodo = {
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
};
