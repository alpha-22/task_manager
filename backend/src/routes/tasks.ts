import { Router } from "express";
import * as controller from "../controllers/taskController";
import { protect } from "../middlewares/authMiddleware";

const router = Router();

router.get("/", protect, controller.getTasks);
router.post("/", protect, controller.addTask);
router.put("/:id", protect, controller.toggleTask);
router.delete("/:id", protect, controller.removeTask);

export default router;
