"use client";

import { useEffect, useReducer } from "react";
import type { Priority, Todo } from "@/types/todo";

type Action =
  | { type: "ADD"; payload: { text: string; priority: Priority } }
  | { type: "TOGGLE"; payload: { id: string } }
  | { type: "DELETE"; payload: { id: string } };

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
    default:
      return state;
  }
}

function initialTodos(): Todo[] {
  if (typeof window === "undefined") {
    return [];
  }

  const stored = localStorage.getItem("todos");
  if (!stored) {
    return [];
  }

  try {
    const parsed: unknown = JSON.parse(stored);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(
      (item): item is Todo =>
        typeof item === "object" &&
        item !== null &&
        "id" in item &&
        "text" in item &&
        "completed" in item &&
        "priority" in item &&
        "createdAt" in item,
    );
  } catch {
    return [];
  }
}

export function useTodos() {
  const [todos, dispatch] = useReducer(reducer, [], initialTodos);

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
