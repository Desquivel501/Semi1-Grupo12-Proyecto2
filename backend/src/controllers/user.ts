import { Request, Response } from "express"
import { User} from "../customTypes/types"
import { CognitoUserAttribute } from "amazon-cognito-identity-js"
import { getAttributeList } from "../utils/getAttributeList"
import { cognito } from "../libs/cognitoclient"
import { encrypt } from "../libs/object-hash"

export class UserController {
  static createUser(req: Request, res: Response) {
    const newUser = req.body as User
    const attributeList: CognitoUserAttribute[] = getAttributeList(newUser)
    const password = encrypt(newUser.password);
    
    cognito.signUp(
      newUser.email,
      password as string,
      attributeList,
      null!,
      (err, data) => {
        if (err)
          return res
            .status(500)
            .json({ MESSAGE: err.name})

        return res.status(200).json({MESSAGE: 'El usuario ha sido registrado exitosamente'})
      }
    )
    // console.log(newUser)
    // if (!newUser){
    //   res.status(400).json({MESSAGE:"Faltan datos"})
    // }
    // res.status(200).json({MESSAGE:"Creado"})
  }
}
