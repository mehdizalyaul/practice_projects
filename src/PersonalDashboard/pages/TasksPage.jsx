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
  const { state, dispatch } = useContext(TaskContext);
  const [filteredTasks, setFilteredTasks] = useState(state.tasks);
  const [searchTerm, setSearchTerm] = useState("");
  const searchInputRef = useRef("");
  const { showNotification } = useContext(NotificationContext);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(state.tasks));

    const filtered = state.tasks.filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTasks(filtered);
  }, [state.tasks, searchTerm]);

  const handleAddTask = useCallback(() => {
    if (!title.trim()) return;
    const newTask = { id: Date.now(), title, completed: false };
    dispatch({ type: "ADD_TASK", payload: newTask });
    showNotification("Task added successfully!", "success");
    setTitle("");
  }, [dispatch, title]);

  const toggleTask = useCallback(
    (id) => {
      dispatch({ type: "TOGGLE_TASK", payload: id });
      showNotification("Task status updated!", "info");
    },
    [dispatch]
  );

  const deleteTask = useCallback(
    (id) => {
      dispatch({ type: "DELETE_TASK", payload: id });
      showNotification("Task deleted!", "error");
    },
    [dispatch]
  );

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
