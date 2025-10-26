import "../styles/NoTasks.css";

export default function NoTasks({ isForm, setIsForm }) {
  return (
    !isForm && (
      <div className="no-tasks_container">
        <div className="no-tasks_wrapper">
          <p className="no-tasks_text">You have no tasks</p>
          <button
            className="no-tasks_button"
            onClick={() => setIsForm((prev) => !prev)}
          >
            Add A Task
          </button>
        </div>
      </div>
    )
  );
}
