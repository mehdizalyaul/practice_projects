import {
  getAllTasks,
  addTask,
  toggleTask,
  deleteTask,
} from "../models/taskModel.js";

// Get all tasks
export const fetchTasks = async (req, res, next) => {
  try {
    const tasks = await getAllTasks();
    res.json(tasks);
  } catch (err) {
    next(error);
  }
};

// Add task
export const createTask = async (req, res, next) => {
  try {
    const { title } = req.body;
    if (!title) return res.status(400).json({ error: "Title is required" });

    const newTask = await addTask(title);
    res.status(201).json(newTask);
  } catch (err) {
    next(error);
  }
};

// Toggle task completion
export const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    await toggleTask(id);
    res.json({ message: "Task updated successfully" });
  } catch (err) {
    next(error);
  }
};

// Delete task
export const removeTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    await deleteTask(id);
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    next(error);
  }
};
