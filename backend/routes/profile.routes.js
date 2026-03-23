import authMiddleware from "../middlewares/auth.middlewares.js";
import getProfileDetails from "../controllers/profile.controllers.js";
import {Router} from "express";
const router = Router();

router.get("/:accountId" , authMiddleware , getProfileDetails);



export default router;