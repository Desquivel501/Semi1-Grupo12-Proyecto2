import { Router } from "express";
import { PostController } from "../controllers/post";

export const postRouter = Router();

postRouter.post("/translate", PostController.translateText);
postRouter.post("/create", PostController.createPost);
postRouter.post("/addComment", PostController.addComment);
postRouter.post("/addTag", PostController.addTagToPost);
postRouter.get("/:email", PostController.getPosts);
postRouter.get("/:post/comments", PostController.getPostComments);
