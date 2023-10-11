import { Request, Response } from "express";
import { User } from "../customTypes/types";

export class UserController {
  static createUser(req: Request, res: Response) {
    const newUser = req.body as User
    console.log(newUser)
    if (!newUser){
      res.status(400).json({MESSAGE:"Faltan datos"})
    }
    res.status(200).json({MESSAGE:"Creado"})
  }
}
