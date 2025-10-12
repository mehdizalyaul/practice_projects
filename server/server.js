import express from "express";
import dotenv from "dotenv";
import tasksRoute from "./routes/tasks.js"; // import route

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Connect the route
app.use("/tasks", tasksRoute);

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
