import { Router } from "express";
import { loginUser, getAllUser, updateUser, findUser, logoutUser } from "../controllers/user.controller";

const router = Router();
router.post("/logout", logoutUser);
router.post("/forgotpassword", findUser);
router.post("/login", loginUser);
router.get("/", getAllUser);
router.put("/:id", updateUser);



export default router;