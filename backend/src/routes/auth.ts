import { Router } from "express";
import { AuthController } from "../controllers/auth";
import multer from "multer";

export const authRouter = Router();
const upload = multer()

authRouter.post("/login", upload.single("webcam"),AuthController.login);

authRouter.get("/logout",AuthController.logout);
