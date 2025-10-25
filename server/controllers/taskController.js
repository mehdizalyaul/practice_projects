import * as Task from "../models/taskModel.js";

// Get all tasks
export const fetchTasks = async (req, res, next) => {
  try {
    const tasks = await Task.getAll();
    res.json(tasks);
  } catch (err) {
    next(error);
  }
};

// Add task
export const createTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    if (!title) return res.status(400).json({ error: "Title is required" });
    const userId = req.user.userId;
    if (!userId) return res.status(400).json({ error: "User is not found" });
    const newTask = await Task.add(title, description, userId);
    res.status(201).json(newTask);
  } catch (err) {
    next(error);
  }
};

// Toggle task completion
export const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Task.toggle(id);
    res.json({ message: "Task updated successfully" });
  } catch (err) {
    next(error);
  }
};

// Delete task
export const removeTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Task.deleteOne(id);
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    next(error);
  }
};

export const getTasksById = async (req, res, next) => {
  console.log("getTasksById");
  try {
    const { id } = req.params;
    const tasks = await Task.getTasksById(id);
    res.status(200).json({ tasks });
  } catch (err) {
    next(error);
  }
};
