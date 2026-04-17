import {Router} from "express";
import { getUser , getUsers} from "../controllers/user.controllers.js";

const router = Router();

router.get("/" , getUsers);
router.get("/:id" , getUser);
router.get("/:id/posts" , );

export default router;