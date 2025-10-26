import { useContext, useState, useCallback, useMemo } from "react";
import { TaskContext } from "../context/TaskContext";
import { AuthContext } from "../context/AuthContext";
import { TaskApi } from "../services/index";
import TaskList from "../components/TaskList";
import Spinner from "../components/Spinner";
import NoTasks from "../components/NoTasks";
import Error from "../components/Error";
import TaskForm from "../components/TaskForm";
import { NotificationContext } from "../context/NotificationContext";
import { motion } from "framer-motion";
import "../styles/Notification.css";
import "../styles/MyTasks.css";

export default function MyTasks() {
  const { myTasks: tasks, dispatch } = useContext(TaskContext);
  const { user, logout, token } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isForm, setIsForm] = useState(false);
  const [search, setSearch] = useState("");
  const { showNotification } = useContext(NotificationContext);

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

  const allTasks = useMemo(
    () => ({
      todo: filteredTasks.filter((t) => t.status === "todo"),
      in_progress: filteredTasks.filter((t) => t.status === "in_progress"),
      review: filteredTasks.filter((t) => t.status === "review"),
      done: filteredTasks.filter((t) => t.status === "done"),
    }),
    [filteredTasks]
  );

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
        setIsForm(false);
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

      {filteredTasks.length > 0 && !isForm ? (
        <>
          <div className="tasks-search-add">
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Search tasks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <button
              className="tasks_add_button"
              onClick={() => {
                setIsForm((prev) => !prev);
              }}
            >
              Add Task
            </button>
          </div>
          <div className="task-lists-grid">
            <TaskList
              title="To Do"
              tasks={allTasks.todo}
              toggleTask={toggleTask}
              deleteTask={deleteTask}
            />
            <TaskList
              title="In Progress"
              tasks={allTasks.in_progress}
              toggleTask={toggleTask}
              deleteTask={deleteTask}
            />
            <TaskList
              title="Done"
              tasks={allTasks.done}
              toggleTask={toggleTask}
              deleteTask={deleteTask}
            />
            <TaskList
              title="Review"
              tasks={allTasks.review}
              toggleTask={toggleTask}
              deleteTask={deleteTask}
            />
          </div>
        </>
      ) : (
        <NoTasks isForm={isForm} setIsForm={setIsForm} />
      )}

      {isForm && <TaskForm handleAddTask={handleAddTask} />}
      {error && <Error message={error} />}
    </motion.div>
  );
}
