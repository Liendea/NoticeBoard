export type TodoType = {
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  completed: boolean;
  _id: string;
};

export type NewTodo = {
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
};
