import {Router} from "express";
import { getUser , getUsers} from "../controllers/user.controllers.js";

const router = Router();

// router.get("/farmers" , getFarmers);
// router.get("/buyers" , getBuyers);

router.get("/" , getUsers);
router.get("/:id" , getUser);

export default router;