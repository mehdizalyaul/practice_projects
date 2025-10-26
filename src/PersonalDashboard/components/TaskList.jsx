import { Link } from "react-router-dom";
import "../styles/TaskList.css";
import { motion, AnimatePresence } from "framer-motion";

export default function TaskList({ title, tasks, toggleTask, deleteTask }) {
  return (
    <div className="task-column">
      <h2 className="task-column-title">{title}</h2>

      {tasks.length === 0 ? (
        <p className="no-tasks-text">No tasks in this section</p>
      ) : (
        <AnimatePresence>
          <ul className="tasks-list">
            {tasks.map((task) => {
              const statusStyle = {
                color:
                  task.status === "todo"
                    ? "gray"
                    : task.status === "in_progress"
                    ? "orange"
                    : task.status === "review"
                    ? "blue"
                    : task.status === "done"
                    ? "green"
                    : "black",
                fontWeight: "bold",
                fontSize: "18px",
              };

              return (
                <motion.li
                  key={task.id}
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
                        task.status.slice(1)}
                    </p>
                  </div>

                  <div className="tasks-item_buttons">
                    <button onClick={() => toggleTask(task.id)}>Toggle</button>
                    <button onClick={() => deleteTask(task.id)}>Delete</button>
                  </div>
                </motion.li>
              );
            })}
          </ul>
        </AnimatePresence>
      )}
    </div>
  );
}
