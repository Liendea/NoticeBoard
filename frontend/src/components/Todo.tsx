import Button from "./Button";
import "../styles/post-it.css";

type TodoProps = {
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  completed: boolean;
  _id: string;
  onDelete: (id: string) => void;
  updateTodo: (
    id: string,
    updates?: {
      title?: string;
      description?: string;
      priority?: "low" | "medium" | "high";
    },
  ) => void;
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
        backgroundColor: completed ? "#B7FB87" : colorMap[priority],
      }}
    >
      <div className="todo-top">
        <div className="priority-dots">
          {(["low", "medium", "high"] as const).map((p) => (
            <button
              key={p}
              className={`priority-dot${priority === p ? " active" : ""}`}
              style={{ backgroundColor: colorMap[p] }}
              onClick={() => updateTodo(_id, { priority: p })}
              aria-label={p}
            />
          ))}
        </div>
        <p className="status">Status: {completed ? "Klar" : "Ej klar"}</p>
      </div>

      <div className="todo">
        <h3
          className="todo-title"
          contentEditable
          spellCheck="false"
          suppressContentEditableWarning
          onBlur={(e) => {
            const newTitle = e.currentTarget.textContent ?? "";
            if (newTitle !== title) updateTodo(_id, { title: newTitle });
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              e.currentTarget.blur();
            }
          }}
        >
          {title}
        </h3>
        <p
          className="todo-description"
          contentEditable
          spellCheck="false"
          suppressContentEditableWarning
          onBlur={(e) => {
            const newDesc = e.currentTarget.textContent ?? "";
            if (newDesc !== description)
              updateTodo(_id, { description: newDesc });
          }}
        >
          {description}
        </p>
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
