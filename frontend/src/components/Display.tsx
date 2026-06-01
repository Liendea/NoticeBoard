import type { TodoType } from "@/types/Types";
import "@/styles/display.css";

type DisplayProps = {
  todos: TodoType[];
  totalTodos: number;
};

export default function Display({ todos, totalTodos }: DisplayProps) {
  return (
    <>
      <h3>Visar antal post-its:</h3>
      <div className="display">
        {todos.length} av {totalTodos}
      </div>
    </>
  );
}
