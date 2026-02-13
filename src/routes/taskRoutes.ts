import { Router } from "express";
import { getTask, createTask, deleteTask, updateTask } from "@/controllers/task.controller";

const router = Router();
router.get("/", getTask);
router.post("/", createTask);
router.delete("/:id", deleteTask);
router.put("/:id", updateTask);

export default router;