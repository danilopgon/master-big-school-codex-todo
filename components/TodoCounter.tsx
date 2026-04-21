"use client";

type TodoCounterProps = {
  activeCount: number;
};

export default function TodoCounter({ activeCount }: TodoCounterProps) {
  return (
    <div className="border-4 border-black bg-white px-3 py-2 font-mono text-xs uppercase">
      {activeCount} TASKS LEFT
    </div>
  );
}
