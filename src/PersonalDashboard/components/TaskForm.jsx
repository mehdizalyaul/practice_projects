import { useRef, useState } from "react";
import "../styles/TaskForm.css";
import { motion } from "framer-motion";

export default function TaskForm({ handleAddTask }) {
  const titleRef = useRef();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;
    handleAddTask(title, description);
    setTitle("");
    setDescription("");
    titleRef.current.focus();
  };

  return (
    <motion.form
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="task-form"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        value={title}
        ref={titleRef}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter the task title"
      />

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter the task description"
        rows={3}
      ></textarea>

      <button type="submit" className="add-button">
        Add Task
      </button>
    </motion.form>
  );
}
