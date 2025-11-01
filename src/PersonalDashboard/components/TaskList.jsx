import { AnimatePresence } from "framer-motion";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState, useCallback, useEffect } from "react";
import { TaskItem, AddTaskButton, Modal, TaskForm } from "./";

import "../styles/TaskList.css";

export default function TaskList({
  id,
  title,
  tasks,
  toggleTask,
  deleteTask,
  handleAddTask,
}) {
  const { setNodeRef } = useDroppable({ id });
  const [modal, setModal] = useState({ open: false, task: null });

  useEffect(() => {
    const handleKeyDown = (e) => e.key === "Escape" && handleCloseModal();
    if (modal.open) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [modal.open]);

  const handleOpenModal = useCallback((task) => {
    setModal({ open: true, task });
  }, []);

  const handleCloseModal = useCallback(() => {
    setModal({ open: false, task: null });
  });
  return (
    <div ref={setNodeRef} className="task-column">
      <div>
        <h2 className="task-column-title">{title}</h2>

        {tasks.length === 0 ? (
          <p className="no-tasks-text">No tasks in this section</p>
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
      {modal.open && modal.task && (
        <Modal closeModal={handleCloseModal}>
          <TaskForm task={modal.task} handleAddTask={handleAddTask} />
        </Modal>
      )}
      <AddTaskButton />
    </div>
  );
}
