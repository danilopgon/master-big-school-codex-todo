"use client";

import type { Todo } from "@/types/todo";

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

const priorityLabel: Record<Todo["priority"], string> = {
  high: "[HIGH]",
  medium: "[MEDIUM]",
  low: "[LOW]",
};

const priorityClass: Record<Todo["priority"], string> = {
  high: "text-[#f55033]",
  medium: "text-black",
  low: "text-black/50",
};

export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <li className="border-b-4 border-black last:border-b-0">
      <div
        className="grid grid-cols-[1fr_auto] items-center gap-3 px-3 py-3 hover:translate-x-[2px] hover:translate-y-[2px]"
      >
        <button
          type="button"
          onClick={() => onToggle(todo.id)}
          className="flex items-center gap-3 text-left"
          aria-label={`Toggle ${todo.text}`}
        >
          <span
            aria-hidden
            className={`inline-flex h-5 w-5 items-center justify-center border-2 border-black text-xs ${
              todo.completed ? "bg-[#f55033] text-white" : "bg-white text-black"
            }`}
          >
            {todo.completed ? "X" : ""}
          </span>
          <span
            className={`font-mono text-sm uppercase ${
              todo.completed ? "line-through opacity-50" : ""
            }`}
          >
            {todo.text}
          </span>
        </button>

        <div className="flex items-center gap-3">
          <span className={`font-mono text-xs uppercase ${priorityClass[todo.priority]}`}>
            {priorityLabel[todo.priority]}
          </span>
          <button
            type="button"
            onClick={() => onDelete(todo.id)}
            className="border-2 border-black px-2 py-1 font-mono text-xs uppercase text-black transition-transform hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-[#f55033] hover:text-white"
            aria-label={`Delete ${todo.text}`}
          >
            ✕
          </button>
        </div>
      </div>
    </li>
  );
}
