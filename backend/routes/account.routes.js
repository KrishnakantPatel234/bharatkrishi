import authMiddleware from "../middlewares/auth.middlewares.js";
import getAccountDetails from "../controllers/account.controllers.js";
import {Router} from "express";
const router = Router();

router.get("/:accountId" , authMiddleware , getAccountDetails);

export default router;