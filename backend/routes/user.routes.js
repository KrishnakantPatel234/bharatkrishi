import {Router} from "express";
import { getUser , getUsers} from "../controllers/user.controllers.js";
import {getMyPosts} from "../controllers/post.controllers.js";

const router = Router();

router.get("/" , getUsers);
router.get("/:id" , getUser);
router.get("/:id/posts" , getMyPosts);

export default router;