import { useContext, useState, useCallback, useRef, useMemo } from "react";
import { TaskContext } from "../context/TaskContext";
import { NotificationContext } from "../context/NotificationContext";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import Spinner from "../components/Spinner";
import Error from "../components/Error";

import { Outlet } from "react-router-dom";
import "../styles/TaskPage.css";
import "../styles/Notification.css";
import { motion } from "framer-motion";
import { validateProfile } from "../../../server/validators/validateProfile";

export default function TasksPage() {
  const [title, setTitle] = useState("");
  const { tasks, dispatch, error, setError, loading, setLoading } =
    useContext(TaskContext);
  const [searchTerm, setSearchTerm] = useState("");
  const searchInputRef = useRef("");
  const { showNotification } = useContext(NotificationContext);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [tasks, searchTerm]);

  const handleAddTask = useCallback(async () => {
    if (title.trim() === "") return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("http://localhost:5000/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });

      const data = await res.json();

      if (!res.ok) {
        const message =
          data?.errors?.[0]?.msg || data?.message || "Something went wrong";

        // Attach the entire backend response for debugging
        const err = new Error(message);
        err.response = data;
        throw err;
      }

      dispatch({ type: "ADD_TASK", payload: data });
      showNotification("Task added successfully!", "success");
      setTitle("");
    } catch (error) {
      console.error("Caught error:", error);
      setError(error.response.errors[0].msg || "Unexpected error occurred");
    } finally {
      setLoading(false);
    }
  }, [dispatch, title, showNotification]);

  const toggleTask = useCallback(
    async (id) => {
      setLoading(true);
      setError(null);
      try {
        const task = tasks.find((t) => t.id === id);

        const updated = { ...task, completed: !task.completed };

        await fetch(`http://localhost:5000/tasks/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updated),
        });

        dispatch({ type: "TOGGLE_TASK", payload: id });
        showNotification("Task status updated!", "info");
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    },
    [dispatch, tasks, showNotification]
  );

  const deleteTask = useCallback(
    async (id) => {
      setLoading(true);
      setError(null);
      try {
        await fetch(`http://localhost:5000/tasks/${id}`, { method: "DELETE" });
        dispatch({ type: "DELETE_TASK", payload: id });
        showNotification("Task deleted!", "error");
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    },
    [dispatch]
  );
  if (loading) return <Spinner />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="tasks-container"
    >
      <h1>Tasks Page</h1>
      <div>
        <input
          type="text"
          placeholder="Search tasks..."
          ref={searchInputRef}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <TaskForm
        handleAddTask={handleAddTask}
        title={title}
        setTitle={setTitle}
      />
      {error && <Error message={error} />}

      <TaskList
        tasks={filteredTasks}
        toggleTask={toggleTask}
        deleteTask={deleteTask}
        searchInputRef={searchInputRef}
      />

      <Outlet />
    </motion.div>
  );
}
