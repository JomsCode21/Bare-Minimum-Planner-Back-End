import { Router } from "express";
import { loginUser, getAllUser, updateUser } from "../controllers/user.controller";

const router = Router();
// router.get("/:id", getOneUser);
router.post("/login", loginUser);
router.get("/", getAllUser);
router.put("/:id", updateUser);


export default router;