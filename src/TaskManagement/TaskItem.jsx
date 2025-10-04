import React from "react";

const TaskItem = React.memo(function TaskItem({ task, toggleTask }) {
  console.log(`Rendering TaskItem: ${task.title}`);
  return (
    <li>
      {task.title} — {task.status}
      <button onClick={() => toggleTask(task.id)}>Toggle</button>
    </li>
  );
});

export default TaskItem;
