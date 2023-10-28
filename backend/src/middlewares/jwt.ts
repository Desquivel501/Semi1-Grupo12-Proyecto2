import { Request, Response } from "express";
import { verifier } from "../libs/cognitoclient";

const NOT_CHECK_PATH = ["/api/users/create"]

export async function checkToken(req: Request, res: Response, next: any) {
  try {
    if(NOT_CHECK_PATH.includes(req.originalUrl)){
      console.log(true)
      next()
      return null
    }

    if(req.method == "DELETE"){
      next()
      return null
    }

    const token = req.headers.authorization?.split(" ")[1];
    if (!token || token == "") {
      res.status(401).json({ MESSAGE: "No tiene autorización" });
      return null
    }
    const payload = await verifier.verify(token);
    console.log("Token is valid. Payload:", payload);
    next();
  } catch (error) {
    console.log("Token not valid!", { error });
    res.status(401).json({ MESSAGE: "No tiene autorización" });
  }
}
