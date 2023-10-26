import { Request, Response } from "express";
import { chatBot } from "../libs/lexClient";

export class ChatBotController {
  static async sendMessage(req: Request, res: Response) {
    try {
      const {text,email} = req.body ;
      if (!email || !text) {
        return res.status(400).json({ MESSAGE: "Faltan datos" });
      }
      const response = await chatBot({email,text});
      if (response) {
        return res.status(200).json(response);
      }
      res.status(400).json({ MESSAGE: "Error al enviar mensaje" });
    } catch (error) {
      console.log(error);
      res.status(400).json({ MESSAGE: "Error al enviar mensaje" });
    }
  }
}
