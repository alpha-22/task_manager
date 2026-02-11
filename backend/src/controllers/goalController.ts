import { Request, Response } from "express";
import * as goalModel from "../models/goalModel";

/**
 * Get all goals for logged-in user
 */
export const getGoals = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;

  const goals = await goalModel.getAllGoals(userId);
  res.json(goals);
};

/**
 * Add new goal
 */
export const addGoal = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const { title } = req.body;

  const goal = await goalModel.createGoal(title, userId);
  res.json(goal);
};

/**
 * Update goal progress
 */
export const updateGoalProgress = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const id = Number(req.params.id);
  const { progress } = req.body;

  if (progress < 0 || progress > 100) {
    return res.status(400).json({ message: "Progress must be between 0 and 100" });
  }

  const updatedGoal = await goalModel.updateGoalProgress(id, userId, progress);
  res.json(updatedGoal);
};

/**
 * Delete goal
 */
export const removeGoal = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const id = Number(req.params.id);

  await goalModel.deleteGoal(id, userId);
  res.json({ success: true });
};
