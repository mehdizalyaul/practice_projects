import { useSortable } from "@dnd-kit/sortable";
import { motion } from "framer-motion";
import { Trash, SquarePen, GripVertical } from "lucide-react";
import getStatusColor from "../utils/getStatusColor";
import "../styles/TaskItem.css";

export default function TaskItem({ task, toggleTask, deleteTask, openModal }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        transition,
      }
    : undefined;
  const statusStyle = {
    borderLeft: `10px solid ${getStatusColor(task.status)}`,
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

      <div className="tasks-item_info">
        <p>{task.title}</p>
        <p>{task.description.slice(0, 30)}</p>
      </div>

      <div className="tasks-item_buttons">
        <SquarePen
          className="button button-edit"
          onClick={(e) => {
            e.stopPropagation();
            openModal(task);

            // toggleTask(task.id);
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
