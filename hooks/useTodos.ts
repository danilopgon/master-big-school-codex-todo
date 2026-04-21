"use client";

import { useEffect, useReducer } from "react";
import type { Priority, Todo } from "@/types/todo";

type Action =
  | { type: "ADD"; payload: { text: string; priority: Priority } }
  | { type: "TOGGLE"; payload: { id: string } }
  | { type: "DELETE"; payload: { id: string } }
  | { type: "HYDRATE"; payload: { todos: Todo[] } };

function isTodo(item: unknown): item is Todo {
  if (typeof item !== "object" || item === null) {
    return false;
  }

  const candidate = item as Partial<Todo>;

  return (
    typeof candidate.id === "string" &&
    typeof candidate.text === "string" &&
    typeof candidate.completed === "boolean" &&
    (candidate.priority === "low" ||
      candidate.priority === "medium" ||
      candidate.priority === "high") &&
    typeof candidate.createdAt === "number"
  );
}

function loadStoredTodos(): Todo[] {
  const stored = localStorage.getItem("todos");
  if (!stored) {
    return [];
  }

  try {
    const parsed: unknown = JSON.parse(stored);
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(isTodo);
  } catch (error) {
    if (error instanceof SyntaxError) {
      return [];
    }

    return [];
  }
}

function reducer(state: Todo[], action: Action): Todo[] {
  switch (action.type) {
    case "ADD": {
      const nextTodo: Todo = {
        id: crypto.randomUUID(),
        text: action.payload.text,
        completed: false,
        priority: action.payload.priority,
        createdAt: Date.now(),
      };

      return [nextTodo, ...state];
    }
    case "TOGGLE":
      return state.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, completed: !todo.completed }
          : todo,
      );
    case "DELETE":
      return state.filter((todo) => todo.id !== action.payload.id);
    case "HYDRATE":
      return action.payload.todos;
    default:
      return state;
  }
}

export function useTodos() {
  const [todos, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    dispatch({ type: "HYDRATE", payload: { todos: loadStoredTodos() } });
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string, priority: Priority) => {
    const trimmedText = text.trim();
    if (!trimmedText) {
      return;
    }

    dispatch({ type: "ADD", payload: { text: trimmedText, priority } });
  };

  const toggleTodo = (id: string) => {
    dispatch({ type: "TOGGLE", payload: { id } });
  };

  const deleteTodo = (id: string) => {
    dispatch({ type: "DELETE", payload: { id } });
  };

  return {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
  };
}
