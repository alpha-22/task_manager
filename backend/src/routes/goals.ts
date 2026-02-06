import express from "express";
import { auth } from "../middlewares/authMiddleware";
import prisma from "../prisma";

const router = express.Router();

router.get("/", auth, async (req: any, res) => {
  const goals = await prisma.goal.findMany({
    where: { userId: req.user.id }
  });
  res.json(goals);
});

router.post("/", auth, async (req: any, res) => {
  const goal = await prisma.goal.create({
    data: {
      title: req.body.title,
      userId: req.user.id
    }
  });
  res.json(goal);
});

router.put("/:id", auth, async (req, res) => {
  const goal = await prisma.goal.update({
    where: { id: Number(req.params.id) },
    data: { progress: req.body.progress }
  });
  res.json(goal);
});

router.delete("/:id", auth, async (req, res) => {
  await prisma.goal.delete({ where: { id: Number(req.params.id) } });
  res.sendStatus(204);
});

export default router;
