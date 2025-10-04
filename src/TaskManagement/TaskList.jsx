import React from "react";
import TaskItem from "./TaskItem";

const TaskList = React.memo(function TaskList({ tasks, toggleTask }) {
  console.log("Rendering TaskList...");
  return (
    <ul>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} toggleTask={toggleTask} />
      ))}
    </ul>
  );
});

export default TaskList;
