import { Router } from "express";
import { MultiMediaController } from "../controllers/multimedia";
import multer from "multer";
import { s3Storage } from "../libs/s3client";

const upload = multer({storage:s3Storage})
export const multiMediaRouter = Router()

multiMediaRouter.post("/img",upload.single("upload"),MultiMediaController.saveImage)
