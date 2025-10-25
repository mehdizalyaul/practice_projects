import { Link } from "react-router-dom";
import "../styles/TaskPage.css";
import { motion, AnimatePresence } from "framer-motion";

export default function TaskList({ tasks, toggleTask, deleteTask }) {
  return (
    <AnimatePresence>
      <ul className="tasks-list">
        {tasks.map((task) => (
          <motion.li
            key={task.id}
            initial={{ opacity: 0, y: 20 }} // start slightly below and invisible
            animate={{ opacity: 1, y: 0 }} // fade and slide up
            exit={{ opacity: 0.25, y: -20 }} // fade and slide out on delete
            transition={{ duration: 1.3 }}
            className="tasks-item"
          >
            <div className="tasks-item_info">
              <Link to={`/tasks/${task.id}`}>{task.title}</Link>
              <p>{task.description}</p>
              <p style={{ color: task.completed ? "green" : "red" }}>
                {task.completed ? "Completed" : "Incompleted"}
              </p>
            </div>

            <div className="tasks-item_buttons">
              <button onClick={() => toggleTask(task.id)}>Toggle</button>
              <button onClick={() => deleteTask(task.id)}>Delete</button>
            </div>
          </motion.li>
        ))}
      </ul>
    </AnimatePresence>
  );
}
