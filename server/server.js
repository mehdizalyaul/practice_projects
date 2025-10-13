import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import tasksRoute from "./routes/taskRoutes.js"; // import route
import profileRoute from "./routes/profileRoutes.js"; // import route

dotenv.config();

const app = express();

app.use(cors());

// Middleware
app.use(express.json());

// Connect the route
app.use("/tasks", tasksRoute);
app.use("/profiles", profileRoute);

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
