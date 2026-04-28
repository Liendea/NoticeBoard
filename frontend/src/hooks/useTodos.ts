import { useState, useEffect } from "react";
import type { TodoType, NewTodo } from "../types/Types";

const API_URL = "http://localhost:3000/api/todos";

export default function useTodos() {
  const [todos, setTodos] = useState<TodoType[]>([]);

  // Hämta todos, alla eller med query
  const getTodos = (query: string = "") => {
    fetch(`${API_URL}${query}`)
      .then((response) => response.json())
      .then((data) => {
        setTodos(data);
      })
      .catch((error) => {
        console.error("Fel vid hämtning av todos:", error);
      });
  };

  // Skapa todo
  const createTodo = async (newTodo: NewTodo) => {
    // Skicka anropet till backend
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo), // Gör om objektet till en textsträng
    });
    return response; // returnera hela response objektet
  };

  // Delete
  const deleteTodo = (id: string) => {
    fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
        } else {
          alert("Något gick fel vid borttagningen");
        }
      })
      .catch((error) => {
        console.error("Nätverksfel:", error);
      });
  };

  // uppdatera
  const updateTodo = (_id: string) => {
    fetch(`${API_URL}/${_id}`, {
      method: "PATCH", // Berätta att vi vill UPPDATERA något
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        completed: !todos.find((todo) => todo._id === _id)?.completed,
      }), // Skicka motsatt värde för att toggla
    })
      .then((response) => {
        if (response.ok) {
          // Vi skapar en ny array baserad på den gamla
          setTodos((prevTodos) =>
            prevTodos.map(
              (todo) =>
                todo._id === _id
                  ? { ...todo, completed: !todo.completed } // Om ID matchar, ändra 'completed'
                  : todo, // Annars, behåll todon som den är
            ),
          );
        } else {
          alert("Något gick fel vid uppdateringen");
        }
      })
      .catch((error) => {
        console.error("Nätverksfel:", error);
      });
  };

  // Hämtar alla todos när komponenten laddas och när en ny todo läggs till
  useEffect(() => {
    getTodos();
  }, []); // Lägg till todos.length som beroende för att uppdatera listan när en ny todo läggs till

  return { todos, getTodos, deleteTodo, updateTodo, setTodos, createTodo };
}
