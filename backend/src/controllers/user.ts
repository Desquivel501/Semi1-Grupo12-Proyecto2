import { Request, Response } from "express";
import { User } from "../customTypes/types";
import { UserModel } from "../models/user";

export class UserController {
  static async createUser(req: Request, res: Response) {
    try {
      const newUser = req.body as User;
      newUser.avatar = req.file as Express.MulterS3.File;
      if (!newUser) {
        return res.status(400).json({ MESSAGE: "Faltan datos" });
      }
      const message = await UserModel.register(newUser);
      if (message != null) {
        message["avatar"] = newUser.avatar.location
        return res.status(200).json(message);
      }
      res.status(400).json({ MESSAGE: "Error al crear usuario" });
    } catch (error) {
      console.log(error);
      res.status(400).json({ MESSAGE: "Error al crear usuario" });
    }
  }

  static async getUser(req: Request, res: Response) {
    try {
      const { email } = req.params;
      if (!email) {
        return res.status(400).json({ MESSAGE: "Faltan el correo" });
      }
      const message = await UserModel.getUser(email);
      if (message != null) {
        return res.status(200).json(message);
      }
      res.status(400).json({ MESSAGE: "Error al obtener usuario" });
    } catch (error) {
      console.log(error);
      res.status(400).json({ MESSAGE: "Error al obtener usuario" });
    }
  }

  static async updateUser(req: Request, res: Response) {
    try {
      const newUser = req.body as User;
      newUser.avatar = req.file as Express.MulterS3.File;
      const message = await UserModel.updateUser(newUser);
      if (message != null) {
        return res.status(200).json(message);
      }
      res.status(400).json({ MESSAGE: "Error al actualizar usuario" });
    } catch (error) {
      console.log(error);
      res.status(400).json({ MESSAGE: "Error al actualizar usuario" });
    }
  }

  static async deleteUser(req: Request, res: Response) {
    try {
      const { email } = req.params;
      if (!email) {
        return res.status(400).json({ MESSAGE: "Faltan el correo" });
      }
      const message = await UserModel.deleteUser(email);
      if (message != null) {
        return res.status(200).json(message);
      }
      res.status(400).json({ MESSAGE: "Error al eliminar usuario" });
    } catch (error) {
      console.log(error);
      res.status(400).json({ MESSAGE: "Error al eliminar usuario" });
    }
  }

}
