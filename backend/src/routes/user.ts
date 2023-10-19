import { Router } from "express";
import { s3Storage } from "../libs/s3client";
import multer from "multer";
import { UserController } from "../controllers/user";

const upload = multer({storage:s3Storage})
export const userRouter = Router()

userRouter.post("/create",upload.single("avatar"),UserController.createUser)
userRouter.get("/:email",UserController.getUser)
userRouter.patch("/update",upload.single("avatar"),UserController.updateUser)
