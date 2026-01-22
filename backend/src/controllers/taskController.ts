import { Request, Response } from "express";
import * as taskModel from "../models/taskModel";

export const getTasks = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const tasks = await taskModel.getAllTasks(userId);
  res.json(tasks);
};

export const addTask = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const { title } = req.body;

  const task = await taskModel.createTask(title, userId);
  res.json(task);
};

export const toggleTask = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const id = Number(req.params.id);

  const updatedTask = await taskModel.toggleTask(id, userId);
  res.json(updatedTask);
};


export const removeTask = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const id = Number(req.params.id);

  await taskModel.deleteTask(id, userId);
  res.json({ success: true });
};
