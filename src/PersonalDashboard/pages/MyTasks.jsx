import { useContext, useState, useCallback, useEffect } from "react";
import { TaskContext } from "../context/TaskContext";
import TaskList from "../components/TaskList";
import Spinner from "../components/Spinner";
import "../styles/TaskPage.css";
import "../styles/Notification.css";
import { motion } from "framer-motion";
import { AuthContext } from "../context/AuthContext";
import { TaskApi } from "../services/index";
import NoTasks from "../components/NoTasks";

export default function MyTasks() {
  const { loading, setLoading, error, setError, dispatch } =
    useContext(TaskContext);
  const { user, logout, token } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await TaskApi.getTasksById(token, user);
        setTasks(res.tasks);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchTasks();
  }, [token, user]);

  console.log(tasks);
  if (!user) {
    logout();
  }
  const toggleTask = useCallback(
    async (id) => {
      setLoading(true);
      setError(null);
      try {
        await TaskApi.updateTaskStatus(token, id);

        dispatch({ type: "TOGGLE_TASK", payload: id });
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    },
    [dispatch, tasks]
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
    [dispatch]
  );
  if (loading) return <Spinner />;
  if (error) return <Error error={error} />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="tasks-container"
    >
      <h1>My Tasks Page</h1>
      {tasks.length > 0 ? (
        <TaskList
          tasks={tasks}
          toggleTask={toggleTask}
          deleteTask={deleteTask}
        />
      ) : (
        <NoTasks />
      )}
    </motion.div>
  );
}
