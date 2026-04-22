import { registerUser, loginUser, logoutUser } from "../controllers/auth.controllers.js";
import authMiddleware from "../middlewares/auth.middlewares.js";
import upload from "../config/multer.js";
import getProfileDetails from "../controllers/profile.controllers.js";
import {Router} from "express";
const router = Router();

router.post("/register", upload.single("avatar") , registerUser);
router.post("/login" , loginUser);
router.get("/logout" , logoutUser);

// get current profile
router.get("/profile", authMiddleware, getProfileDetails);


export default router;