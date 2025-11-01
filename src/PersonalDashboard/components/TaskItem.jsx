import { useSortable } from "@dnd-kit/sortable";
import { motion } from "framer-motion";
import { Trash, SquarePen, GripVertical } from "lucide-react";
import "../styles/TaskItem.css";
import { useEffect } from "react";

export default function TaskItem({ task, toggleTask, deleteTask }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        transition,
      }
    : undefined;
  const statusStyle = {
    borderLeft:
      task.status === "todo"
        ? "10px solid #9CA3AF" // Cool Gray
        : task.status === "in_progress"
        ? "10px solid #F59E0B" // Amber
        : task.status === "review"
        ? "10px solid #3B82F6" // Soft Blue
        : "10px solid #10B981", // Emerald Green
  };

  return (
    <motion.li
      ref={setNodeRef}
      style={{
        ...style,
        borderLeft: statusStyle.borderLeft,
      }}
      {...attributes}
      className="tasks-item"
    >
      {/* Drag Handle */}
      <div className="drag-handle" {...listeners} style={{ cursor: "grab" }}>
        <GripVertical className="drag-handle-grip" size={20} />
      </div>

      <div
        className="tasks-item_info"
        onClick={() => console.log("Parent clicked!")}
      >
        <p>{task.title}</p>
        <p>{task.description.slice(0, 30)}</p>
      </div>

      <div className="tasks-item_buttons">
        <SquarePen
          className="button button-edit"
          onClick={(e) => {
            e.stopPropagation();
            toggleTask(task.id);
          }}
        />
        <Trash
          className="button button-delete"
          onClick={(e) => {
            e.stopPropagation();
            deleteTask(task.id);
          }}
        />
      </div>
    </motion.li>
  );
}
