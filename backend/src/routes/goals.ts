import express from "express";
import { protect } from "../middlewares/authMiddleware";
import prisma from "../prisma";

const router = express.Router();

router.get("/", protect, async (req: any, res) => {
  const goals = await prisma.goal.findMany({
    where: { userId: req.user.id },
  });
  res.json(goals);
});

router.post("/", protect, async (req: any, res) => {
  const goal = await prisma.goal.create({
    data: {
      title: req.body.title,
      userId: req.user.id,
    },
  });
  res.json(goal);
});

router.put("/:id", protect, async (req, res) => {
  const goal = await prisma.goal.update({
    where: { id: Number(req.params.id) },
    data: { progress: req.body.progress },
  });
  res.json(goal);
});

router.delete("/:id", protect, async (req, res) => {
  await prisma.goal.delete({
    where: { id: Number(req.params.id) },
  });
  res.sendStatus(204);
});

export default router;
