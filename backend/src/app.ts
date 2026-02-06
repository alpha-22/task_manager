import express from "express";
import cors from "cors";
import taskRoutes from "./routes/tasks";
import authRoutes from "./routes/auth";
import goalsRoutes from "./routes/goals";
const app = express();

app.use(cors());
app.use(express.json());

app.use("/tasks", taskRoutes);
app.use("/auth", authRoutes);
app.use("/goals", goalsRoutes);
export default app;
