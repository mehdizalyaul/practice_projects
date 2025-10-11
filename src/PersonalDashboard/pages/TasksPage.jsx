import { useContext, useState, useCallback, useRef, useEffect } from "react";
import { TaskContext } from "../context/TaskContext";
import { NotificationContext } from "../context/NotificationContext";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import { Outlet } from "react-router-dom";
import "../styles/TaskPage.css";
import "../styles/Notification.css";
import { motion } from "framer-motion";

export default function TasksPage() {
  const [title, setTitle] = useState("");
  const { tasks, dispatch, error, setError, loading, setLoading } =
    useContext(TaskContext);
  const [filteredTasks, setFilteredTasks] = useState(tasks);
  const [searchTerm, setSearchTerm] = useState("");
  const searchInputRef = useRef("");
  const { showNotification } = useContext(NotificationContext);

  useEffect(() => {
    const filtered = tasks.filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTasks(filtered);
  }, [tasks, searchTerm]);

  const handleAddTask = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("http://localhost:5000/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, completed: false }),
      });

      const newTask = await res.json();

      dispatch({ type: "ADD_TASK", payload: newTask });

      showNotification("Task added successfully!", "success");

      setTitle("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [dispatch, title, showNotification]);

  const toggleTask = useCallback(
    async (id) => {
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
        setError(true);
      }
    },
    [dispatch, tasks, showNotification]
  );

  const deleteTask = useCallback(
    async (id) => {
      try {
        await fetch(`http://localhost:5000/tasks/${id}`, { method: "DELETE" });
        dispatch({ type: "DELETE_TASK", payload: id });
        showNotification("Task deleted!", "error");
      } catch (error) {
        setError(true);
      }
    },
    [dispatch]
  );

  if (loading) return <p>Loading tasks...</p>;
  if (error) return <p className="error">{error}</p>;

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
