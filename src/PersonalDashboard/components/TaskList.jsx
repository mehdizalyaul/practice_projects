export default function TaskList({ tasks, toggleTask, deleteTask }) {
  return (
    <>
      {tasks &&
        tasks.map((task) => {
          return (
            <li key={task.id}>
              {task.title}
              <button onClick={() => deleteTask(task.id)}>Delete</button>
              <button onClick={() => toggleTask(task.id)}>Toggle</button>
              <p>{task.completed ? "Completed" : "Incompleted"}</p>
            </li>
          );
        })}
    </>
  );
}
