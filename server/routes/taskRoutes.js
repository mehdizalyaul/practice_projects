import express from "express";
import {
  fetchTasks,
  createTask,
  updateTask,
  removeTask,
  getTasksById,
} from "../controllers/taskController.js";
import { validateId, validateTask } from "../validators/validateTask.js";
import { validate } from "../middleware/validate.js";
const router = express.Router();

router.get("/", fetchTasks);
router.get("/user/:id", validateId, validate, getTasksById);
router.post("/", validateTask, validate, createTask);
router.put("/:id", validateId, validate, updateTask);
router.delete("/:id", validateId, validate, removeTask);

export default router;
