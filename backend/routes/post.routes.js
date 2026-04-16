import {Router} from "express";
import authMiddleware from "../middlewares/auth.middlewares.js"
import { getAllPosts , createNewPost } from "../controllers/post.controllers.js";
import upload from "../config/multer.js";

const router = Router();
// public routes
router.get("/", getAllPosts);

// protected routes
router.post("/" , authMiddleware , upload.single("picture") , createNewPost);


export default router;