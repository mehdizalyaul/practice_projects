import { useState, useCallback } from "react";
import TaskList from "./TaskList";

export default function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  function handleAddTask() {
    if (!title.trim()) {
      return;
    }
    console.log(title);

    setTasks((prev) => [
      ...prev,
      { id: Date.now(), title, status: "Incompleted" },
    ]);
    setTitle("");
  }

  const toggleTask = useCallback((id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              status: task.status === "Completed" ? "Incompleted" : "Completed",
            }
          : task
      )
    );
  }, []);

  return (
    <>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        name={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={handleAddTask}>Add a task</button>
      <TaskList tasks={tasks} toggleTask={toggleTask} />
    </>
  );
}
