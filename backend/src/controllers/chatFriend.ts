import { Request, Response } from "express";
import { Message } from "../customTypes/types";
import { ChatFriendModel } from "../models/chatFriend";

export class ChatFriendController {
  static async saveMessage(req: Request, res: Response) {
    try {
      const message = req.body as Message;
      if (!message.friendship || !message.sender || !message.content) {
        res.status(400).json({ MESSAGE: "Faltan datos" });
      }
      const response = await ChatFriendModel.SaveMessage(message);
      if (response != null) {
        return res.status(200).json(response);
      }
      res.status(400).json({ MESSAGE: "Error al guardar mensaje" });
    } catch (error) {
      console.log(error);
      res.status(400).json({ MESSAGE: "Error al guardar mensaje" });
    }
  }
}
