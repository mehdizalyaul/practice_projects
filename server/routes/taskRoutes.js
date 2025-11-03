import express from "express";
import {
  fetchTasks,
  createTask,
  updateTask,
  removeTask,
  getTasksById,
  updateTaskStatus,
} from "../controllers/taskController.js";
import { validateId, validateTask } from "../validators/validateTask.js";
import { validate } from "../middleware/validate.js";
import { authorize } from "../middleware/authMiddleware.js";
const router = express.Router();

// get all Tasks
router.get("/", authorize(["admin"]), fetchTasks);

// get Tasks by ID
router.get(
  "/user/:id",
  validateId,
  validate,
  authorize(["admin", "user"]),
  getTasksById
);

// Add A Task
router.post(
  "/",
  validateTask,
  validate,
  authorize(["admin", "user"]),
  createTask
);
// Update a Task
router.put(
  "/:id",
  validateId,
  validateTask,
  validate,
  authorize(["admin", "user"]),
  updateTask
);
// Toggle Task to Completed or Incompleted
router.patch(
  "/:id",
  validateId,
  validate,
  authorize(["admin", "user"]),
  updateTaskStatus
);
// Delete A Task
router.delete(
  "/:id",
  validateId,
  validate,
  authorize(["admin", "user"]),
  removeTask
);

export default router;
