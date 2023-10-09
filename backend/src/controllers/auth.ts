import { Request, Response } from "express";
import { AuthModel } from "../models/auth";
import { Credentials } from "../customTypes/types";

export class AuthController {
  static login(req: Request, res: Response) {
    const { email, password, photo } = req.body as Credentials;
    if (!email) {
      return res.status(401).json({ message: "Falta el correo" });
    }
    if (!password){
      return res.status(401).json({ message: "Falta la contraseña" });
    } 
    // Login
    AuthModel.login({ email, password }, (response: any, ok: boolean) => {
      // Respuesta
      if (ok) {
        //const token = newToken({ email, response });
        //response["TOKEN"] = token;
      }
      res.status(ok ? 200 : 400).json(response);
    });
  }
  static logout(req: Request, res: Response) {
    const { id } = req.params;
    res.json({ message: "Adiós" });
  }
}
