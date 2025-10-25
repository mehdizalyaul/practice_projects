import { useEffect, useRef, useState } from "react";
import "../styles/TaskForm.css";
import { motion } from "framer-motion";

export default function TaskForm({ handleAddTask }) {
  const inputRef = useRef();
  const [title, setTitle] = useState("");
  const [description, setDescripton] = useState("");

  // Focus input when component renders or after adding a task and make title and description empty
  useEffect(() => {
    setTitle("");
    setDescripton("");
    inputRef.current.focus();
  }, [handleAddTask]);

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="task-form"
    >
      <input
        type="text"
        value={title}
        ref={inputRef}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter the task title"
      />
      <input
        type="description"
        value={description}
        ref={inputRef}
        onChange={(e) => setDescripton(e.target.value)}
        placeholder="Enter the task description"
      />
      <button
        className="add-button"
        onClick={() => {
          handleAddTask(title, description);
        }}
      >
        Add Task
      </button>
    </motion.div>
  );
}
