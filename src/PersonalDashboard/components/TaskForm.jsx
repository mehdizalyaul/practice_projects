import { useEffect, useRef } from "react";
import "../styles/TaskPage.css";
import { motion } from "framer-motion";

export default function TaskForm({ handleAddTask, title, setTitle }) {
  const inputRef = useRef();

  // Focus input when component renders or after adding a task
  useEffect(() => {
    inputRef.current.focus();
  }, [handleAddTask]);

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
    >
      <input
        type="text"
        value={title}
        ref={inputRef}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter a new task"
      />
      <button className="add-button" onClick={handleAddTask}>
        Add Task
      </button>
    </motion.div>
  );
}
