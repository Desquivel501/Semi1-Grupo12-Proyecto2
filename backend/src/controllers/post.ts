import { Request, Response } from "express";
import { TranslateText } from "../customTypes/types";
import { translateText } from "../libs/translateClient";

export class PostController {
  static async translateText(req: Request, res: Response) {
    const textToTranslate = req.body as TranslateText;
    if (
      !textToTranslate.text || !textToTranslate.targetLanguage ||
      !textToTranslate.sourceLanguage
    ) {
      return res.status(400).json({
        MESSAGE: "Faltan datos para la traducción",
      });
    }
    // Translate text
    const translatedText = await translateText(textToTranslate);
    if (textToTranslate) {
      return res.status(200).json({translatedText});
    }
    res.status(400).json({ MESSAGE: "Error al traducir" });
  }
}
