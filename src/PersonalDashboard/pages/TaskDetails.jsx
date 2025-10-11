import { useParams, Link } from "react-router-dom";
import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import "../styles/TaskDetails.css";

export default function TaskDetails() {
  const { id } = useParams();
  const { tasks, loading } = useContext(TaskContext);

  if (loading) {
    return (
      <div className="task-details">
        <p>Loading task...</p>
        <Link to="/tasks">← Back to Tasks</Link>
      </div>
    );
  }

  if (!tasks || tasks.length === 0) {
    return (
      <div className="task-details">
        <p>No tasks available.</p>
        <Link to="/tasks">← Back to Tasks</Link>
      </div>
    );
  }

  const task = tasks.find((t) => t.id === id);
  if (!task) {
    return (
      <div className="task-details">
        <p>Task not found.</p>
        <Link to="/tasks">← Back to Tasks</Link>
      </div>
    );
  }

  return (
    <div className="task-details">
      <h3>Task Detail</h3>
      <p>
        <strong>Title:</strong> {task.title}
      </p>
      <p>
        <strong>Status:</strong>{" "}
        <span className={task.completed ? "completed" : "incompleted"}>
          {task.completed ? "Completed" : "Incompleted"}
        </span>
      </p>
      <Link to="/tasks">← Back to Tasks</Link>
    </div>
  );
}
