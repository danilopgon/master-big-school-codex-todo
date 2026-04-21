"use client";

import { useMemo, useState } from "react";
import TodoCounter from "@/components/TodoCounter";
import TodoFilters from "@/components/TodoFilters";
import TodoInput from "@/components/TodoInput";
import TodoList from "@/components/TodoList";
import { useTodos } from "@/hooks/useTodos";
import type { Todo } from "@/types/todo";

type Filter = "all" | "active" | "completed";
type Sort = "date" | "priority";

const priorityOrder: Record<Todo["priority"], number> = {
  high: 3,
  medium: 2,
  low: 1,
};

export default function TodoApp() {
  const { todos, addTodo, toggleTodo, deleteTodo } = useTodos();
  const [filter, setFilter] = useState<Filter>("all");
  const [sort, setSort] = useState<Sort>("date");

  const visibleTodos = useMemo(() => {
    const filtered = todos.filter((todo) => {
      if (filter === "active") {
        return !todo.completed;
      }

      if (filter === "completed") {
        return todo.completed;
      }

      return true;
    });

    return filtered.toSorted((a, b) => {
      if (sort === "priority") {
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      }

      return b.createdAt - a.createdAt;
    });
  }, [filter, sort, todos]);

  const activeCount = useMemo(
    () => todos.filter((todo) => !todo.completed).length,
    [todos],
  );

  return (
    <section className="w-full max-w-2xl px-3 py-8 text-[#0c0c0b] sm:px-6">
      <div className="mb-4 border-4 border-black bg-white p-4">
        <h1 className="font-mono text-2xl uppercase">Todo List</h1>
        <p className="font-mono text-xs uppercase text-black/70">
          RAW MODE. NO FLUFF. GET THINGS DONE.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <TodoInput onAddTodo={addTodo} />
        <div className="flex items-center justify-between gap-3">
          <TodoCounter activeCount={activeCount} />
          <div className="border-4 border-black bg-[#f55033] px-3 py-2 font-mono text-xs uppercase text-white">
            {todos.length} TOTAL
          </div>
        </div>
        <TodoFilters
          filter={filter}
          sort={sort}
          onFilterChange={setFilter}
          onSortChange={setSort}
        />
        <TodoList todos={visibleTodos} onToggle={toggleTodo} onDelete={deleteTodo} />
      </div>
    </section>
  );
}
