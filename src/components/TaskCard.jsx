export default function TaskCard({ task, onDelete, onToggle }) {
  return (
    <div className="p-4 bg-white shadow rounded flex justify-between">
      <span className={task.status === "completed" ? "line-through" : ""}>
        {task.title}
      </span>

      <div className="space-x-2">
        <button onClick={() => onToggle(task)} className="text-green-500 cursor-pointer">
          ✔
        </button>
        <button onClick={() => onDelete(task._id)} className="text-red-500 cursor-pointer">
          ✖
        </button>
      </div>
    </div>
  );
}