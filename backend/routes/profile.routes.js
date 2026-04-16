import authMiddleware from "../middlewares/auth.middlewares.js";
import getProfileDetails from "../controllers/profile.controllers.js";
import { getMyPosts } from "../controllers/post.controllers.js";
import {Router} from "express";
const router = Router();

router.get("/:accountId" , authMiddleware , getProfileDetails);
router.get("/:accountId/posts" , authMiddleware , getMyPosts);


export default router;