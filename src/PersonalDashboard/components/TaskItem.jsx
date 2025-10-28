import { useSortable } from "@dnd-kit/sortable";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "../styles/TaskItem.css";

export default function TaskItem({ task, toggleTask, deleteTask }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: task.id,
    });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        transition,
      }
    : undefined;

  const statusStyle = {
    color:
      task.status === "todo"
        ? "gray"
        : task.status === "in_progress"
        ? "orange"
        : task.status === "review"
        ? "blue"
        : "green",
    fontWeight: "bold",
    fontSize: "18px",
  };

  return (
    <motion.li
      ref={setNodeRef}
      style={{ ...style }}
      {...listeners}
      {...attributes}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0.25, y: -20 }}
      transition={{ duration: 1.3 }}
      className="tasks-item"
    >
      <div className="tasks-item_info">
        <Link to={`/tasks/${task.id}`}>
          {task.title.charAt(0).toUpperCase() + task.title.slice(1)}
        </Link>
        <p>{task.description}</p>
        <p style={statusStyle}>
          {task.status.charAt(0).toUpperCase() +
            task.status.slice(1).replace("_", " ")}
        </p>
      </div>

      <div className="tasks-item_buttons">
        <button onClick={() => toggleTask(task.id)}>Toggle</button>
        <button onClick={() => deleteTask(task.id)}>Delete</button>
      </div>
    </motion.li>
  );
}
