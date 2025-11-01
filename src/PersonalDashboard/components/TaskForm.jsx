import { useRef, useState } from "react";
import "../styles/TaskForm.css";

export default function TaskForm({ task, handleAddTask }) {
  const titleRef = useRef();
  const [title, setTitle] = useState(task.title || "");
  const [description, setDescription] = useState(task.description || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;
    handleAddTask(title, description);
    setTitle("");
    setDescription("");
    titleRef.current.focus();
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
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
    </form>
  );
}
