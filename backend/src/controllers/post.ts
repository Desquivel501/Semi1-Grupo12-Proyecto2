import { Request, Response } from "express";
import { TranslateText } from "../customTypes/types";
import { translateText } from "../libs/lambdaTranslate";
import { PostModel } from "../models/post";
import { detectLabels } from "../libs/rekognitionClient";
//import { translateText } from "../libs/translateClient";

export class PostController {
  static async createPost(req: Request, res: Response) {
    try {
      const { email, text } = req.body;
      const img = req.file as Express.MulterS3.File;
      console.log(text);
      if (!email || img.location.endsWith("f")) {
        return res.status(400).json({ MESSAGE: "Faltan datos" });
      }
      const message = await PostModel.createPost(email, text, img);
      if (message != null) {
        // getLabels
        const labels: string[] = await detectLabels(img.location);
        labels.forEach(async (tag) => {
          // console.log(tag)
          await PostModel.addTagToPost(message.ID, tag);
        });
        return res.status(200).json(message);
      }
      res.status(400).json({ MESSAGE: "Error al crear publicación" });
    } catch (error) {
      console.log(error);
      res.status(400).json({ MESSAGE: "Error al crear publicación" });
    }
  }

  static async addComment(req: Request, res: Response) {
    try {
      const { email, text, post } = req.body;
      if (!email || !text || !post) {
        res.status(400).json({ MESSAGE: "Faltan datos" });
      }
      const message = await PostModel.addComment(email, post, text);
      if (message != null) {
        return res.status(200).json(message);
      }
      res.status(400).json({ MESSAGE: "Error al comentar publicación" });
    } catch (error) {
      console.log(error);
      res.status(400).json({ MESSAGE: "Error al comentar publicación" });
    }
  }

  static async addTagToPost(req: Request, res: Response) {
    try {
      const { tag, post } = req.body;
      if (!tag || !post) {
        res.status(400).json({ MESSAGE: "Faltan datos" });
      }
      const message = await PostModel.addTagToPost(post, tag);
      if (message != null) {
        return res.status(200).json(message);
      }
      res.status(400).json({ MESSAGE: "Error al agregar tag a publicación" });
    } catch (error) {
      console.log(error);
      res.status(400).json({ MESSAGE: "Error al agregar tag a publicación" });
    }
  }

  static async translateText(req: Request, res: Response) {
    try {
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
      if (translatedText) {
        return res.status(200).json({ translatedText });
      }
      res.status(400).json({ MESSAGE: "Error al traducir" });
    } catch (error) {
      console.log(error);
      res.status(400).json({ MESSAGE: "Error al traducir" });
    }
  }

  static async getPosts(req: Request, res: Response) {
    try {
      const { email } = req.params;
      if (!email) {
        res.status(400).json({ MESSAGE: "Faltan el correo" });
      }
      const message = await PostModel.getPosts(email);
      if (message != null) {
        return res.status(200).json(message);
      }
      res.status(400).json({ MESSAGE: "Error al obtener publicaciones" });
    } catch (error) {
      console.log(error);
      res.status(400).json({ MESSAGE: "Error al obtener publicaciones" });
    }
  }

  static async getPostComments(req: Request, res: Response) {
    try {
      const { post } = req.params;
      if (!post) {
        res.status(400).json({ MESSAGE: "Faltan el id de la publicación" });
      }
      const message = await PostModel.getPostComments(parseInt(post));
      if (message != null) {
        return res.status(200).json(message);
      }
      res.status(400).json({ MESSAGE: "Error al obtener commentarios" });
    } catch (error) {
      console.log(error);
      res.status(400).json({ MESSAGE: "Error al obtener commentarios" });
    }
  }

  static async getAllTags(req: Request, res: Response) {
    try {
      const message = await PostModel.getAllTags();
      if (message != null) {
        return res.status(200).json(message);
      }
      res.status(400).json({ MESSAGE: "Error al obtener etiquetas" });
    } catch (error) {
      console.log(error);
      res.status(400).json({ MESSAGE: "Error al obtener etiquetas" });
    }
  }
}
