import { Request, Response } from "express";

export class MultiMediaController {
  static async saveImage(req:Request,res:Response){
    try {
      const  img  = req.file as Express.MulterS3.File 
      if (img.location.endsWith("f")){
        return res.status(400).json({MESSAGE:"Falta la imagen"})
      }
      res.status(200).json({image:img.location})
    } catch (error) {
      console.log(error)
      res.status(400).json({MESSAGE:"Error al subir imagen"}) 
    }
  }
}
