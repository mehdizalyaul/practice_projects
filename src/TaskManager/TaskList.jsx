import React from "react";
import TaskItem from "../TaskItem";

const TaskList = React.memo(function TaskList({ tasks, toggleTask }) {
  console.log("From TaskList");
  console.log(tasks);
  return (
    <>
      {tasks.map((task) => {
        return <TaskItem key={task.id} task={task} toggleTask={toggleTask} />;
      })}
    </>
  );
});

export default TaskList;
