import { AnimatePresence } from "framer-motion";
import { useDroppable } from "@dnd-kit/core";
import TaskItem from "./TaskItem";
import "../styles/TaskList.css";

export default function TaskList({ id, title, tasks, toggleTask, deleteTask }) {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div ref={setNodeRef} className="task-column">
      <h2 className="task-column-title">{title}</h2>

      {tasks.length === 0 ? (
        <p className="no-tasks-text">No tasks in this section</p>
      ) : (
        <AnimatePresence>
          <ul className="tasks-list">
            {tasks.map((task) => {
              return (
                <TaskItem
                  key={task.id}
                  task={task}
                  toggleTask={toggleTask}
                  deleteTask={deleteTask}
                />
              );
            })}
          </ul>
        </AnimatePresence>
      )}
    </div>
  );
}
