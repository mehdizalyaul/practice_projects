import React from "react";

const TaskItem = React.memo(function TaskItem({ task, toggleTask }) {
  console.log(`From TaskItem ${task.title}`);
  console.log(task);

  return (
    <li>
      {task.title} {task.status}
      <button onClick={() => toggleTask(task.id)}>Toggle</button>
    </li>
  );
});

export default TaskItem;
