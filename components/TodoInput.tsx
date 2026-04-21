"use client";

import { useState, type FormEvent } from "react";
import type { Priority } from "@/types/todo";

type TodoInputProps = {
  onAddTodo: (text: string, priority: Priority) => void;
};

export default function TodoInput({ onAddTodo }: TodoInputProps) {
  const [text, setText] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onAddTodo(text, priority);
    setText("");
    setPriority("medium");
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3 border-4 border-black bg-white p-3">
      <label htmlFor="todo-input" className="text-xs font-mono uppercase tracking-wide">
        Task
      </label>
      <input
        id="todo-input"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="WRITE TASK..."
        className="w-full border-2 border-black bg-white px-3 py-2 font-mono text-sm focus:outline-none"
      />

      <div className="grid grid-cols-[1fr_auto] gap-3">
        <select
          value={priority}
          onChange={(event) => setPriority(event.target.value as Priority)}
          className="appearance-none border-2 border-black bg-white px-3 py-2 font-mono text-sm uppercase focus:outline-none"
          aria-label="Select priority"
        >
          <option value="low">LOW</option>
          <option value="medium">MEDIUM</option>
          <option value="high">HIGH</option>
        </select>
        <button
          type="submit"
          className="border-2 border-black bg-white px-5 py-2 font-mono text-sm uppercase transition-transform hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-[#f55033] active:translate-x-[2px] active:translate-y-[2px] active:bg-[#f55033]"
        >
          Add
        </button>
      </div>
    </form>
  );
}
