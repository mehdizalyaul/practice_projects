import "../styles/NoTasks.css";

export default function NoTasks() {
  return (
    <div className="no-tasks_container">
      <p className="no-tasks_text">You have no tasks</p>
      <button className="no-tasks_button">Add A Task</button>
    </div>
  );
}
