import { Router } from "express";
import { ChatBotController } from "../controllers/chatBot";

export const chatBotRouter = Router()

chatBotRouter.post("/send",ChatBotController.sendMessage)
