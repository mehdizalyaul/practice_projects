import { useContext, useState, useCallback } from "react";

import { TaskContext } from "../context/TaskContext";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import { Link } from "react-router-dom";

export default function TasksPage() {
  const [title, setTitle] = useState("");
  const { state, dispatch } = useContext(TaskContext);
  function handleAddTask() {
    if (title.trim() === "") {
      return;
    }
    const newTask = { id: Date.now(), title, completed: false };
    dispatch({ type: "ADD_TASK", payload: newTask });
    setTitle("");
  }
  const toggleTask = useCallback((id) => {
    dispatch({ type: "TOGGLE_TASK", payload: id });
  }, []);

  const deleteTask = useCallback((id) => {
    dispatch({ type: "DELETE_TASK", payload: id });
  }, []);
  return (
    <div>
      <h1>Tasks Page </h1>
      <Link to="/">Go to Home</Link>
      <TaskForm
        handleAddTask={handleAddTask}
        title={title}
        setTitle={setTitle}
      />
      <TaskList
        tasks={state.tasks}
        toggleTask={toggleTask}
        deleteTask={deleteTask}
      />{" "}
    </div>
  );
}
