import { useState } from "react";

export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");

  const submit = () => {
    if (!title) return;
    onAdd(title);
    setTitle("");
  };

  return (
    <div className="flex gap-2">
      <input
        className="border p-2 w-full"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New Task..."
      />
      <button onClick={submit} className="bg-black text-white px-4 py-2 rounded-md text-sm font-medium 
  hover:bg-gray-900 transition cursor-pointer">
        Add
      </button>
    </div>
  );
}