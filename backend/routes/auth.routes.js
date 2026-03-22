import { registerUser, loginUser, logoutUser } from "../controllers/auth.controllers.js";
import {Router} from "express";
const router = Router();

router.post("/register" , registerUser);
router.post("/login" , loginUser);
router.get("/logout" , logoutUser);

export default router;