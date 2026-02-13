import { Router } from "express";
import { registerUser, loginUser, getAllUser, updateUser } from "../controllers/user.controller";

const router = Router();
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/", getAllUser);
router.put("/:id", updateUser);


export default router;