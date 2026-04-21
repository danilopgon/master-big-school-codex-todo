"use client";

import type { Todo } from "@/types/todo";
import TodoItem from "@/components/TodoItem";

type TodoListProps = {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function TodoList({ todos, onToggle, onDelete }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="border-4 border-black bg-white px-4 py-8 text-center font-mono text-sm uppercase">
        NOTHING HERE. ADD SOMETHING.
      </div>
    );
  }

  return (
    <ul className="border-4 border-black bg-white">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </ul>
  );
}
