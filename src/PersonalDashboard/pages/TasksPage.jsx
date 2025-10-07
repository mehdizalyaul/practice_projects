import { useContext, useState, useCallback, useRef, useEffect } from "react";
import { TaskContext } from "../context/TaskContext";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import { Link, Outlet } from "react-router-dom";
import "../styles/TaskPage.css";

export default function TasksPage() {
  const [title, setTitle] = useState("");
  const { state, dispatch } = useContext(TaskContext);
  const [filteredTasks, setFilteredTasks] = useState(state.tasks);
  const searchInputRef = useRef("");

  // Update filteredTasks whenever tasks or search input changes
  useEffect(() => {
    const searchValue = searchInputRef.current.value.toLowerCase() || "";
    const filtered = state.tasks.filter((task) =>
      task.title.toLowerCase().includes(searchValue)
    );
    setFilteredTasks(filtered);
  }, [state.tasks]);

  const handleAddTask = useCallback(() => {
    if (!title.trim()) return;
    const newTask = { id: Date.now(), title, completed: false };
    dispatch({ type: "ADD_TASK", payload: newTask });
    setTitle("");
  }, [dispatch, title]);

  const handleSearch = () => {
    const value = searchInputRef.current.value.toLowerCase();
    const filtered = state.tasks.filter((task) =>
      task.title.toLowerCase().includes(value)
    );
    setFilteredTasks(filtered);
  };

  const toggleTask = useCallback(
    (id) => {
      dispatch({ type: "TOGGLE_TASK", payload: id });
    },
    [dispatch]
  );

  const deleteTask = useCallback(
    (id) => {
      dispatch({ type: "DELETE_TASK", payload: id });
    },
    [dispatch]
  );

  return (
    <div className="tasks-container">
      <div>
        <input
          type="text"
          placeholder="Search tasks..."
          ref={searchInputRef}
          onChange={handleSearch} // filter as user types
        />
      </div>

      <div className="tasks-header">
        <h1>Tasks Page</h1>
        <Link to="/">← Go to Home</Link>
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
      />

      <Outlet />
    </div>
  );
}
