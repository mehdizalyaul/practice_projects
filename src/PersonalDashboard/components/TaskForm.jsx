import { useEffect, useRef } from "react";
import "../styles/TaskPage.css";

export default function TaskForm({ handleAddTask, title, setTitle }) {
  const inputRef = useRef();

  // Focus input when component renders or after adding a task
  useEffect(() => {
    inputRef.current.focus();
  }, [handleAddTask]);

  return (
    <div>
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
    </div>
  );
}
