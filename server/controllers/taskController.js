import * as Task from "../models/taskModel.js";

// Get all tasks
export const fetchTasks = async (req, res, next) => {
  try {
    const tasks = await Task.getAll();
    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

// Add task
export const createTask = async (req, res, next) => {
  try {
    const newTask = req.body;
    console.log(newTask);
    if (!newTask) return res.status(400).json({ error: "Title is required" });
    const userId = req.user.userId;
    if (!userId) return res.status(400).json({ error: "User is not found" });

    const task = await Task.add(newTask, userId);
    console.log(task);
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

// Update task
export const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json("ID Not in params Provided");
    }
    const updatedTask = req.body;
    if (!updatedTask) {
      res.status(400).json("Updated Task Not Provided");
    }
    await Task.update(updatedTask);
    res.json({ message: "Task updated successfully" });
  } catch (error) {
    next(error);
  }
};

// Delete task
export const removeTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Task.deleteOne(id);
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const getTasksById = async (req, res, next) => {
  console.log("getTasksById");
  try {
    const { id } = req.params;
    const tasks = await Task.getTasksById(id);
    res.status(200).json({ tasks });
  } catch (error) {
    next(error);
  }
};

// Toggle task completion
export const updateTaskStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json("ID Not in params Provided");
    }
    const { status } = req.body;
    if (!status) {
      res.status(400).json("Status Not Provided");
    }
    await Task.updateStatus(id, status);
    res.json({ message: "Status updated successfully" });
  } catch (error) {
    next(error);
  }
};
