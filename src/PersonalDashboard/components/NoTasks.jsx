import "../styles/NoTasks.css";

export default function NoTasks({ handleOpenModal }) {
  return (
    <div className="no-tasks_container">
      <div className="no-tasks_wrapper">
        <p className="no-tasks_text">You have no tasks</p>
        <button className="no-tasks_button" onClick={handleOpenModal}>
          Add A Task
        </button>
      </div>
    </div>
  );
}
