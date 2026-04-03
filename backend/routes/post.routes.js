import {Router} from "express";
import authMiddleware from "../middlewares/auth.middlewares.js"
import { getAllPosts , createNewPost, getMyPosts } from "../controllers/post.controllers.js";

const router = Router();

router.get("/", getAllPosts);
router.post("/" , authMiddleware , createNewPost);
router.get("/my-posts" , authMiddleware , getMyPosts);

export default router;