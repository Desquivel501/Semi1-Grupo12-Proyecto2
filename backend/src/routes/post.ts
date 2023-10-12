import { Router } from "express";
import { PostController } from "../controllers/post";

export const postRouter = Router()

postRouter.post("/translate",PostController.translateText)
