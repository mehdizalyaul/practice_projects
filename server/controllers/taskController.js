import {
  getAllTasks,
  addTask,
  toggleTask,
  deleteTask,
} from "../models/taskModel.js";

// Get all tasks
export const fetchTasks = async (req, res) => {
  try {
    const tasks = await getAllTasks();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add task
export const createTask = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) return res.status(400).json({ error: "Title is required" });

    const newTask = await addTask(title);
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Toggle task completion
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    await toggleTask(id);
    res.json({ message: "Task updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete task
export const removeTask = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteTask(id);
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
