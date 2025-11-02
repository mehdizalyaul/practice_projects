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
import { AuthContext } from "../context/AuthContext";
import { TaskApi } from "../services/index";

export default function TasksPage() {
  const { tasks, dispatch, error, setError, loading, setLoading } =
    useContext(TaskContext);
  const [searchTerm, setSearchTerm] = useState("");
  const searchInputRef = useRef("");
  const { showNotification } = useContext(NotificationContext);
  const { token } = useContext(AuthContext);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [tasks, searchTerm]);

  const handleAddTask = useCallback(
    async (title, description) => {
      if (title.trim() === "") return;
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

  const toggleTask = useCallback(
    async (id) => {
      setLoading(true);
      setError(null);
      try {
        await TaskApi.updateTaskStatus(token, id);

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
        await TaskApi.deleteTask(token, id);

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

      <TaskForm handleAddTask={handleAddTask} />
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
