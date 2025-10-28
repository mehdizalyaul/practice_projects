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
import { arrayMove } from "@dnd-kit/sortable";

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

    const activeId = active.id;
    const overId = over.id;

    // Find task objects
    const activeTask = tasks.find((t) => t.id === activeId);
    const overTask = tasks.find((t) => t.id === overId);

    // Determine fromStatus (where the dragged task came from)
    const fromStatus = active.data?.current?.status ?? activeTask?.status;

    // Determine toStatus:
    // - if over is a droppable column, over.id will be that column id (we set it)
    // - if over is another task, use that task's status
    let toStatus =
      over.data?.current?.status || (overTask ? overTask.status : overId);

    // If somehow toStatus is still an item id, fallback: try find that item and use its status
    if (!["todo", "in_progress", "review", "done"].includes(toStatus)) {
      const maybe = tasks.find((t) => t.id === overId);
      if (maybe) toStatus = maybe.status;
    }

    // If no valid statuses, abort
    if (!fromStatus || !toStatus) return;

    // If same column: handle reorder
    if (fromStatus === toStatus) {
      const columnTasks = tasks.filter((t) => t.status === fromStatus);
      const oldIndex = columnTasks.findIndex((t) => t.id === activeId);
      const newIndex = columnTasks.findIndex((t) => t.id === overId);

      // If overId is the column id itself (dropped on empty area), put it at end
      const resolvedNewIndex =
        newIndex === -1 ? columnTasks.length - 1 : newIndex;

      if (oldIndex !== resolvedNewIndex && oldIndex !== -1) {
        const reordered = arrayMove(columnTasks, oldIndex, resolvedNewIndex);

        // Build new tasks array: replace the column slice with reordered
        const newTasks = [
          ...tasks.filter((t) => t.status !== fromStatus),
          ...reordered,
        ];

        // Dispatch an action to set tasks (adjust to your reducer)
        dispatch({ type: "SET_MY_TASKS", payload: newTasks });

        // (Optional) persist ordering to backend if you store order — otherwise skip API
      }
      setActiveTask(null);
      return;
    }

    // Cross-column move
    // Remove from source and add to destination (insert at top)
    const sourceList = tasks.filter((t) => t.status === fromStatus);
    const targetList = tasks.filter((t) => t.status === toStatus);

    const movingTask = activeTask;
    if (!movingTask) {
      setActiveTask(null);
      return;
    }

    const newSource = sourceList.filter((t) => t.id !== activeId);
    const newTarget = [{ ...movingTask, status: toStatus }, ...targetList];

    // Build new tasks list preserving other tasks
    const otherTasks = tasks.filter(
      (t) => t.status !== fromStatus && t.status !== toStatus
    );
    const newTasks = [...otherTasks, ...newSource, ...newTarget];

    // Optimistically update UI
    dispatch({ type: "SET_MY_TASKS", payload: newTasks });

    // Persist change to backend (use robust API; catch errors and rollback if needed)
    updateTaskStatus(token, activeId, toStatus).catch((err) => {
      console.error("Failed to update status on server:", err);
      // rollback: simplest approach - refetch from server or reverse optimistic update
      // e.g. dispatch({ type: "REFRESH_TASKS_FROM_SERVER" }) or refetch tasks
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
