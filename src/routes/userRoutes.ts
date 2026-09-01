import { Router } from "express";
import { loginUser, getAllUser, updateUser, findUser, resetPassword, savePushSubscription, logoutUser, checkEmail, registerUser, checkAuth, googleLogin } from "../controllers/user.controller";
import { verifyToken } from "@/middlewares/verify-token.middleware";

const router = Router();

router.get("/check-auth", verifyToken, checkAuth);
router.post("/google", googleLogin);
router.post("/register", registerUser);
router.post("/check-email", checkEmail);
router.post("/push-subscriptions", verifyToken, savePushSubscription);
router.post("/logout", logoutUser);
router.post("/forgotpassword", findUser);
router.post("/resetpassword/:token", resetPassword);
router.post("/login", loginUser);
router.get("/", getAllUser);
router.put("/:id", verifyToken, updateUser);



export default router;
