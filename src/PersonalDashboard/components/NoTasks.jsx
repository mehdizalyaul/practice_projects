import { useState } from "react";
import "../styles/NoTasks.css";
import TaskForm from "./TaskForm";
import { useContext, useCallback } from "react";
import { TaskContext } from "../context/TaskContext";
import Spinner from "./Spinner";
import Error from "./Error";
import { NotificationContext } from "../context/NotificationContext";
import { TaskApi } from "../services/index";
import { AuthContext } from "../context/AuthContext";

export default function NoTasks() {
  const [form, setForm] = useState(false);
  const { dispatch } = useContext(TaskContext);
  const { token } = useContext(AuthContext);
  const { showNotification } = useContext(NotificationContext);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddTask = useCallback(
    async (title, description) => {
      console.log(title, description);
      if (title.trim() === "") return;
      if (description.trim() === "") return;

      setLoading(true);
      setError(null);

      try {
        const data = await TaskApi.createTask(token, title, description);
        console.log(data);
        dispatch({ type: "ADD_TASK", payload: data });

        showNotification("Task added successfully!", "success");
      } catch (error) {
        console.log(error.response);
        console.error("Caught error:", error.response);

        setError(error.response || "Unexpected error occurred");
      } finally {
        setLoading(false);
      }
    },
    [dispatch, showNotification]
  );

  if (loading) return <Spinner />;

  return (
    <div className="no-tasks_container">
      {!form && (
        <div className="no-tasks_wrapper">
          <p className="no-tasks_text">You have no tasks</p>
          <button
            className="no-tasks_button"
            onClick={() => {
              setForm((prev) => !prev);
            }}
          >
            Add A Task
          </button>
        </div>
      )}
      {form && <TaskForm handleAddTask={handleAddTask} />}
      {error && <Error message={error} />}
    </div>
  );
}
