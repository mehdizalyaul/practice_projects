import express from "express";

import tasksRoute from "./taskRoutes.js";
import profileRoute from "./profileRoutes.js";
import authRoute from "./authRoutes.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use("/api/auth", authRoute);
router.use("/api/tasks", verifyToken, tasksRoute);
router.use("/api/profiles", verifyToken, profileRoute);

export default router;
