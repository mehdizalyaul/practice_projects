import { AnimatePresence } from "framer-motion";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState, useCallback, useEffect } from "react";
import { TaskItem, AddTaskButton, Modal, TaskForm, StatusMenu } from "./";

import "../styles/TaskList.css";

export default function TaskList({
  id,
  title,
  tasks,
  toggleTask,
  deleteTask,
  handleOpenModal,
}) {
  const { setNodeRef } = useDroppable({ id });
  return (
    <div ref={setNodeRef} className="task-column">
      <div>
        <h2 className="task-column-title" style={{ marginBottom: "25px" }}>
          {title}
        </h2>

        {tasks.length === 0 ? (
          <p className="no-tasks-text" style={{ marginBottom: "25px" }}>
            No tasks in this section
          </p>
        ) : (
          <AnimatePresence>
            <ul className="tasks-list">
              <SortableContext
                id={id}
                items={tasks.map((t) => t.id)} // task IDs for sorting
                strategy={verticalListSortingStrategy} // vertical sorting layout
              >
                {tasks.map((task) => {
                  return (
                    <TaskItem
                      key={task.id}
                      task={task}
                      toggleTask={toggleTask}
                      deleteTask={deleteTask}
                      openModal={handleOpenModal}
                    />
                  );
                })}
              </SortableContext>
            </ul>
          </AnimatePresence>
        )}
      </div>

      <AddTaskButton status={id} onClickAdd={handleOpenModal} />
    </div>
  );
}
