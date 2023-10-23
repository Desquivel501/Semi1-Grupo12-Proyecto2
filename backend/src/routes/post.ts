import { Router } from "express";
import { PostController } from "../controllers/post";
import multer from "multer";
import { s3Storage } from "../libs/s3client";

const upload = multer({storage:s3Storage})
export const postRouter = Router();

postRouter.post("/translate", PostController.translateText);
postRouter.post("/create",upload.single("img"), PostController.createPost);
postRouter.post("/addComment", PostController.addComment);
postRouter.post("/addTag", PostController.addTagToPost);
postRouter.get("/tags", PostController.getAllTags);
postRouter.get("/:email", PostController.getPosts);
postRouter.get("/:post/comments", PostController.getPostComments);
