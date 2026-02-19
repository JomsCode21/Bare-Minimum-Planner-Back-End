import { Router } from "express";
import { getTask, createTask, deleteTask, updateTask } from "@/controllers/task.controller";
import { verifyToken } from "@/middlewares/verify-token.middleware";

const router = Router();
router.get("/", getTask);
router.post("/", verifyToken, createTask);
router.delete("/:id", verifyToken, deleteTask);
router.put("/:id", verifyToken, updateTask);

export default router;