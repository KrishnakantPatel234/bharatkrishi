import {Router} from "express"
import { chatWithAI } from "../controllers/chatbot.controllers.js"

const router = Router();

router.post("/" , chatWithAI);

export default router