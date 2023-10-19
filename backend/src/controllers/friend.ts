import { Request, Response } from "express";
import { FriendModel } from "../models/friend";

export class FriendController {

  static async addFriend(req: Request, res: Response) {
    try {
      const { email, friend } = req.body;
      if (!email || !friend) {
        res.status(400).json({ MESSAGE: "Faltan datos" });
      }
      const message = await FriendModel.addFriend(email, friend);
      if (message != null) {
        return res.status(200).json(message);
      }
      res.status(400).json({ MESSAGE: "Error al enviar solicitud" });
    } catch (error) {
      console.log(error);
      res.status(400).json({ MESSAGE: "Error al enviar solicitud" });
    }
  }

  static async acceptNewFriend(req: Request, res: Response) {
    try {
      const { email, friend } = req.body;
      if (!email || !friend) {
        res.status(400).json({ MESSAGE: "Faltan datos" });
      }
      const message = await FriendModel.acceptNewFriend(email, friend);
      if (message != null) {
        return res.status(200).json(message);
      }
      res.status(400).json({ MESSAGE: "Error al aceptar solicitud" });
    } catch (error) {
      console.log(error);
      res.status(400).json({ MESSAGE: "Error al aceptar solicitud" });
    }
  }

  static async declineNewFriend(req: Request, res: Response) {
    try {
      const { email, friend } = req.body;
      if (!email || !friend) {
        res.status(400).json({ MESSAGE: "Faltan datos" });
      }
      const message = await FriendModel.declineNewFriend(email, friend);
      if (message != null) {
        return res.status(200).json(message);
      }
      res.status(400).json({ MESSAGE: "Error al rechazar solicitud" });
    } catch (error) {
      console.log(error);
      res.status(400).json({ MESSAGE: "Error al rechazar solicitud" });
    }
  }

  static async getFriends(req: Request, res: Response) {
    try {
      const { email } = req.params;
      if (!email) {
        res.status(400).json({ MESSAGE: "Faltan el correo" });
      }
      const message = await FriendModel.getFriends(email);
      if (message != null) {
        return res.status(200).json(message);
      }
      res.status(400).json({ MESSAGE: "Error al obtener amigos" });
    } catch (error) {
      console.log(error);
      res.status(400).json({ MESSAGE: "Error al obtener amigos" });
    }
  }

  static async getNonFriends(req: Request, res: Response) {
    try {
      const { email } = req.params;
      if (!email) {
        res.status(400).json({ MESSAGE: "Faltan el correo" });
      }
      const message = await FriendModel.getNonFriends(email);
      if (message != null) {
        return res.status(200).json(message);
      }
      res.status(400).json({ MESSAGE: "Error al obtener amigos" });
    } catch (error) {
      console.log(error);
      res.status(400).json({ MESSAGE: "Error al obtener amigos" });
    }
  }

}
