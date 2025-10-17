import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import tasksRoute from "./routes/taskRoutes.js";
import profileRoute from "./routes/profileRoutes.js";
import authRoute from "./routes/authRoutes.js";
import { verifyToken } from "./middleware/authMiddleware.js";

dotenv.config();

const app = express();

app.use(cors());

// Middleware
app.use(express.json());

// Connect the route
app.use("/api/auth", authRoute);
app.use("/tasks", verifyToken, tasksRoute);
app.use("/profiles", verifyToken, profileRoute);

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
