import { useState, useEffect, useCallback } from "react";
import type { TodoType, NewTodo } from "../types/Types";

const API_URL = "http://localhost:3000/api/todos";

export default function useTodos() {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [totalInDb, setTotalInDb] = useState<number>(0);

  // Hämta todos (wrappad i callback)
  const getTodos = useCallback((query: string = "") => {
    fetch(`${API_URL}${query}`)
      .then((response) => response.json())
      .then((data) => setTodos(data))
      .catch((err) => console.error(err));
  }, []);

  // hämta antal document i DB (wrappad i callback)
  const fetchTotalCount = useCallback(() => {
    fetch(`${API_URL}/count`)
      .then((res) => res.json())
      .then((data) => setTotalInDb(data.count))
      .catch((err) => console.error("Count error:", err));
  }, []);

  // UseEffect som hämtar todos när appen startar
  useEffect(() => {
    getTodos();
    fetchTotalCount();
  }, [getTodos, fetchTotalCount]);

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

    if (response.ok) {
      // Hämta den nyskapade todon från backend-svaret
      const createdTodo = await response.json();
      // Uppdatera statet genom att lägga till den nya todon i listan
      setTodos((prevTodos) => [...prevTodos, createdTodo]);

      // ANROP DIREKT HÄR:
      fetchTotalCount();
    }

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
          // ANROP DIREKT HÄR:
          fetchTotalCount();
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

  return {
    todos,
    totalInDb,
    getTodos,
    deleteTodo,
    updateTodo,
    setTodos,
    createTodo,
  };
}
