import { useContext, useState, useCallback, useMemo } from "react";
import { TaskContext } from "../context/TaskContext";
import { AuthContext } from "../context/AuthContext";
import { TaskApi } from "../services/index";
import TaskList from "../components/TaskList";
import TaskItem from "../components/TaskItem";
import Spinner from "../components/Spinner";
import NoTasks from "../components/NoTasks";
import Error from "../components/Error";
import TaskForm from "../components/TaskForm";
import { NotificationContext } from "../context/NotificationContext";
import { motion } from "framer-motion";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { useDroppable } from "@dnd-kit/core";

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
  const [activeTask, setActiveTask] = useState(null);

  if (!user || !token) {
    logout();
    return;
  }

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
      if (!title.trim() || !description.trim()) return;

      setLoading(true);
      setError(null);

      try {
        const data = await TaskApi.createTask(token, title, description);
        dispatch({ type: "ADD_TASK", payload: data });
        setIsForm(false);
        showNotification("Task added successfully!", "success");
      } catch (error) {
        setError(error.response || "Unexpected error occurred");
      } finally {
        setLoading(false);
      }
    },
    [dispatch, showNotification, token]
  );

  const toggleTask = useCallback(
    async (taskId, status) => {
      setLoading(true);
      setError(null);
      try {
        TaskApi.updateTaskStatus(token, task.id, status);
        dispatch({
          type: "UPDATE_TASK_STATUS",
          payload: { id: taskId, status: status },
        });
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    },
    [dispatch, token]
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
    [dispatch, token]
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const fromStatus = active.data.current?.status;
    const toStatus = over.id;

    if (fromStatus === toStatus) return;

    const task = tasks.find((t) => t.id === active.id);

    if (!task) return;

    TaskApi.updateTaskStatus(token, task.id, toStatus);
    dispatch({
      type: "UPDATE_TASK_STATUS",
      payload: { id: task.id, status: toStatus },
    });

    setActiveTask(null);
  };

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

      <div className="tasks-search-add">
        <input
          type="text"
          name="search"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={() => setIsForm((prev) => !prev)}>Add Task</button>
      </div>

      {isForm && <TaskForm handleAddTask={handleAddTask} />}

      {filteredTasks.length > 0 && (
        <DndContext
          onDragStart={(event) => {
            const { active } = event;
            const task = tasks.find((t) => t.id === active.id);
            setActiveTask(task);
          }}
          onDragEnd={handleDragEnd}
        >
          <div className="task-lists-grid">
            {["todo", "in_progress", "review", "done"].map((status) => (
              <TaskList
                key={status}
                id={status}
                title={status
                  .replace("_", " ")
                  .replace(/\b\w/g, (c) => c.toUpperCase())}
                tasks={allTasks[status]}
                toggleTask={toggleTask}
                deleteTask={deleteTask}
              />
            ))}
          </div>

          <DragOverlay>
            {activeTask && (
              <TaskItem
                task={activeTask}
                toggleTask={toggleTask}
                deleteTask={deleteTask}
              />
            )}
          </DragOverlay>
        </DndContext>
      )}

      {filteredTasks.length === 0 && !isForm && (
        <NoTasks isForm={isForm} setIsForm={setIsForm} />
      )}

      {error && <Error message={error} />}
    </motion.div>
  );
}
