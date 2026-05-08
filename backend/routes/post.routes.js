import {Router} from "express";
import authMiddleware from "../middlewares/auth.middlewares.js"
import { getAllPosts , createNewPost , getPost } from "../controllers/post.controllers.js";
import upload from "../config/multer.js";
import { createComment, getComments } from "../controllers/comments.controllers.js";

const router = Router();
// public routes
router.get("/", getAllPosts);
router.get("/:postId" , getPost);

// protected routes
router.post("/" , authMiddleware , upload.single("picture") , createNewPost);

router.post("/:postId/comments" , authMiddleware , createComment);
router.get("/:postId/comments" , getComments);

export default router;  