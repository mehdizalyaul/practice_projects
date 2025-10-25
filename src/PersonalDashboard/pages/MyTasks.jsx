import { useContext, useState, useCallback, useEffect, useMemo } from "react";
import { TaskContext } from "../context/TaskContext";
import { AuthContext } from "../context/AuthContext";
import { TaskApi } from "../services/index";
import TaskList from "../components/TaskList";
import Spinner from "../components/Spinner";
import NoTasks from "../components/NoTasks";
import { motion } from "framer-motion";
import "../styles/TaskPage.css";
import "../styles/Notification.css";

export default function MyTasks() {
  const { myTasks: tasks, dispatch } = useContext(TaskContext);
  const { user, logout, token } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");

  if (!user || !token) {
    logout();
    return;
  }

  // ✅  Fix filter logic: must return the condition
  const filteredTasks = useMemo(() => {
    if (!search) return tasks;
    return tasks.filter((task) =>
      task.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [tasks, search]);
  // ✅  toggleTask and deleteTask should include token and dispatch
  const toggleTask = useCallback(
    async (id) => {
      setLoading(true);
      setError(null);
      try {
        await TaskApi.updateTaskStatus(token, id);
        dispatch({ type: "TOGGLE_TASK", payload: id });
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    },
    [dispatch, token, setLoading, setError]
  );

  const deleteTask = useCallback(
    async (id) => {
      setLoading(true);
      setError(null);
      try {
        await TaskApi.deleteTask(token, id);
        dispatch({ type: "DELETE_TASK", payload: id });
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    },
    [dispatch, token, setLoading, setError]
  );

  // ✅  Proper loading and error handling
  if (loading) return <Spinner />;
  if (error) return <div className="error">{error}</div>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="tasks-container"
    >
      <h1>My Tasks</h1>

      {filteredTasks.length > 0 && (
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      )}

      {filteredTasks.length > 0 ? (
        <TaskList
          tasks={filteredTasks}
          toggleTask={toggleTask}
          deleteTask={deleteTask}
        />
      ) : (
        <NoTasks />
      )}
    </motion.div>
  );
}
