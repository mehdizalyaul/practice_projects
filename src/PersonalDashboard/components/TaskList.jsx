import { Link } from "react-router-dom";
import "../styles/TaskPage.css";

export default function TaskList({ tasks, toggleTask, deleteTask }) {
  return (
    <ul className="tasks-list">
      {tasks.map((task) => (
        <li key={task.id} className="tasks-item">
          <div>
            <Link to={`/tasks/${task.id}`}>{task.title}</Link>
            <p>{task.completed ? "Completed" : "Incompleted"}</p>
          </div>

          <div>
            <button onClick={() => toggleTask(task.id)}>Toggle</button>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
}
