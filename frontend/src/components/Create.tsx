import Button from "./Button";
import { useState } from "react";
import "../styles/create.css";

import type { NewTodo } from "../types/Types";

type CreateProps = {
  createTodo: (newTodo: NewTodo) => Promise<Response>;
};

export default function Create({ createTodo }: CreateProps) {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("low");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newTodo: NewTodo = {
      title,
      description,
      priority,
    };

    try {
      const response = await createTodo(newTodo);
      if (response.ok) {
        setTitle("");
        setDescription("");
        setPriority("low");
      } else {
        console.error("Något gick fel vid sparningen");
      }
    } catch (error) {
      console.error("Nätverksfel:", error);
    }
  };

  return (
    <div className="create-post-it">
      <form className="form" onSubmit={handleSubmit}>
        <h2 className="form-title">Create a post-it</h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <select
          value={priority}
          onChange={(e) =>
            setPriority(e.target.value as "low" | "medium" | "high")
          }
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <Button type="submit">Add todo</Button>
      </form>
    </div>
  );
}
