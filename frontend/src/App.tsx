import "./styles/app.css";
import "./styles/buttons.css";
import Create from "./components/Create";
import Todo from "./components/Todo";
import useTodos from "./hooks/useTodos";
import Search from "./components/Search";
import Legend from "./components/Legend";
import Display from "./components/Display";

// DND (Drag and Drop)
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  rectSwappingStrategy,
} from "@dnd-kit/sortable";
import { SortableTodo } from "./components/DND-Component/SortableTodo";

export default function App() {
  const {
    todos,
    getTodos,
    deleteTodo,
    updateTodo,
    setTodos,
    createTodo,
    totalInDb,
  } = useTodos();

  // DND SETTINGS
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
  );
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setTodos((items) => {
        const oldIndex = items.findIndex((t) => t._id === active.id);
        const newIndex = items.findIndex((t) => t._id === over.id);

        // arrayMove är en hjälpare som flyttar objektet i arrayen
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <div className="app">
      <section className="post-it-section">
        <div className="post-its-container">
          {/* 1. Omslut allt med DndContext */}
          <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            sensors={sensors}
          >
            {/* 2. Berätta för SortableContext vilka ID:n som finns */}
            <SortableContext
              items={todos.map((t) => t._id)}
              strategy={rectSwappingStrategy}
            >
              {todos.map((todo) => (
                /* 3. Använd SortableTodo som "skal" */
                <SortableTodo key={todo._id} id={todo._id}>
                  <Todo
                    description={todo.description}
                    title={todo.title}
                    priority={todo.priority}
                    completed={todo.completed}
                    _id={todo._id}
                    onDelete={deleteTodo}
                    updateTodo={updateTodo}
                  />
                </SortableTodo>
              ))}
            </SortableContext>
          </DndContext>
        </div>
      </section>

      <section className="sidebar-section">
        <div className="top">
          <Create createTodo={createTodo} />
          <Legend />
        </div>
        <div className="middle">
          <Display todos={todos} totalTodos={totalInDb} />
        </div>
        <div className="bottom">
          <Search onSearch={getTodos} />
        </div>
      </section>
    </div>
  );
}
