import { useEffect, useRef } from "react";

export default function TaskForm({ handleAddTask, title, setTitle }) {
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, [handleAddTask]);

  return (
    <>
      <input
        type="text"
        value={title}
        ref={inputRef}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={handleAddTask}>Add Task</button>
    </>
  );
}
