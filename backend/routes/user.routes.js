import {Router} from "express";
import { getUser , getBuyers , getFarmers } from "../controllers/user.controllers.js";

const router = Router();

router.get("/farmers" , getFarmers);
router.get("/buyers" , getBuyers);
router.get("/:id" , getUser);

export default router;