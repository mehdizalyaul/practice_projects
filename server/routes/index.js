import express from "express";

import tasksRoute from "./taskRoutes.js";
import profileRoute from "./profileRoutes.js";
import authRoute from "./authRoutes.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use("/api/auth", authRoute);

router.use(authenticate);
router.use("/api/tasks", tasksRoute);
router.use("/api/profiles", profileRoute);

export default router;
