import { Router } from "express";
import { getComments , createComment , getReplies , getCommentById , deleteComment , updateComment} from "../controllers/comments.controllers.js";
import authMiddleware from "../middlewares/auth.middlewares.js";

const router = Router();

// Update Comments
router.put("/:commentId" , authMiddleware , updateComment);

// Delete your comment
router.delete("/:commentId" , authMiddleware , deleteComment);

// get comment replies
router.get("/:commentId/replies" , getReplies);


export default router;