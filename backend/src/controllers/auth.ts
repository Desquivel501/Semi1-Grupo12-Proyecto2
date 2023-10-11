import { Request, Response } from "express";
import { AuthModel } from "../models/auth";
import { Credentials } from "../customTypes/types";
import { compareFaces } from "../libs/rekognitionClient";

export class AuthController {
  static async login(req: Request, res: Response) {
    const { email, password } = req.body as Credentials;
    const photo = req.file as Express.Multer.File;
    if (!email) {
      return res.status(401).json({ message: "Falta el correo" });
    }
    if (photo) {
      const source = AuthModel.getAvatarByEmail(email);
      const ok = await compareFaces(photo, source);
      return res.status(ok ? 200 : 400).json(ok);
    }
    if (!password) {
      return res.status(401).json({ message: "Falta la contraseña" });
    }
    // Login
    AuthModel.login({ email, password }, (response: any, ok: boolean) => {
      // Respuesta
      if (ok) {
        //const token = newToken({ email, response });
        //response["TOKEN"] = token;
      }
      //res.status(ok ? 200 : 400).json(response);
    });
    res.status(200).json();
  }
  static logout(req: Request, res: Response) {
    const { id } = req.params;
    res.json({ message: "Adiós" });
  }
}
