import {Router} from "express";
import { getUser , getUsers , getUserDetails} from "../controllers/user.controllers.js";
import {getUserPosts} from "../controllers/post.controllers.js";
import authMiddleware from "../middlewares/auth.middlewares.js";

const router = Router();

router.get("/" , getUsers);

// get current profile
router.get("/profile" , authMiddleware , getUserDetails);

router.get("/:id" , getUser);
router.get("/:id/posts", getUserPosts);

export default router;