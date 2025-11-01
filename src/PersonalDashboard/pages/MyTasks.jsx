import { useContext, useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import {
  AuthContext,
  TaskContext,
  SearchContext,
  NotificationContext,
} from "../context";
import { TaskApi } from "../services/index";
import { TaskList, TaskItem, Spinner, NoTasks, Error } from "../components";
import "../styles/Notification.css";
import "../styles/MyTasks.css";

export default function MyTasks() {
  const { myTasks: tasks, dispatch } = useContext(TaskContext);
  const { user, logout, token } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isForm, setIsForm] = useState(false);
  const { search } = useContext(SearchContext);
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
      console.log(id);

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

    const activeTask = tasks.find((t) => t.id === activeId);
    const overTask = tasks.find((t) => t.id === overId);

    const fromStatus = active.data?.current?.status || activeTask?.status;
    const toStatus = over.data?.current?.status || overTask?.status || overId;

    if (!(fromStatus && toStatus)) return;

    // clone to avoid mutating state
    const updatedTasks = structuredClone(allTasks);

    const columnTasks = updatedTasks[toStatus];
    const oldIndex = columnTasks.findIndex((t) => t.id === activeId);
    const newIndex = columnTasks.findIndex((t) => t.id === overId);

    // 🟦 CASE 1: Same column → reorder
    if (fromStatus === toStatus) {
      if (oldIndex === newIndex) return;

      const reordered = arrayMove(columnTasks, oldIndex, newIndex);
      updatedTasks[toStatus] = [...reordered];
    } else {
      // 🟩 CASE 2: Move between columns
      updatedTasks[fromStatus] = updatedTasks[fromStatus].filter(
        (t) => t.id !== activeTask.id
      );

      updatedTasks[toStatus] = [
        ...updatedTasks[toStatus].slice(0, newIndex),
        { ...activeTask, status: toStatus },
        ...updatedTasks[toStatus].slice(newIndex),
      ];
    }

    // rebuild and dispatch
    const newTasks = Object.values(updatedTasks).flat();
    dispatch({ type: "SET_MY_TASKS", payload: newTasks });

    // persist to backend
    TaskApi.updateTaskStatus(token, activeId, toStatus).catch(console.error);

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

      {/*{isForm && <TaskForm handleAddTask={handleAddTask} />}*/}

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
                handleAddTask={handleAddTask}
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
