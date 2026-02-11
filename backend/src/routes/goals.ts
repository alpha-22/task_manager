import express from "express";
import {
  getGoals,
  addGoal,
  updateGoalProgress,
  removeGoal,
} from "../controllers/goalController";

const router = express.Router();

router.get("/", getGoals);
router.post("/", addGoal);
router.put("/:id/progress", updateGoalProgress);
router.delete("/:id", removeGoal);

export default router;
