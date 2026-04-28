import Button from "./Button";
import "../styles/post-it.css";

type TodoProps = {
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  completed: boolean;
  _id: string;
  onDelete: (id: string) => void;
  updateTodo: (id: string) => void;
};

const colorMap: Record<TodoProps["priority"], string> = {
  low: "#F4F99C",
  medium: "#ACEFFD",
  high: "#FE83DB",
};

export default function Todo({
  title,
  description,
  priority = "low",
  completed,
  _id,
  onDelete,
  updateTodo,
}: TodoProps) {
  return (
    <div
      className="todo-container"
      style={{
        backgroundColor: completed ? "#B7FB87" : `${colorMap[priority]}`,
      }}
    >
      <p className="status">Status: {completed ? "Klar" : "Ej klar"}</p>

      <div className="todo">
        <h3 className="todo-title">{title}</h3>
        <p className="todo-description">{description}</p>
      </div>

      <div className="btn-container">
        <Button type="button" onClick={() => updateTodo(_id)}>
          {completed ? "Markera som Ej klar" : "Markera som Klar"}
        </Button>
        <Button type="button" onClick={() => onDelete(_id)}>
          Ta bort
        </Button>
      </div>
    </div>
  );
}
