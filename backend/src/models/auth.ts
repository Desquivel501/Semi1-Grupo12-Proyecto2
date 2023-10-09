import { Credentials } from "../customTypes/types";
import { encrypt } from "../libs/bcrypt";
//import { connector } from "./database/connection";

export class AuthModel {
  static async login(credentials: Credentials, callback: Function) {
    try {
      const password = await encrypt(credentials.password);
      console.log(password);
      /*connector.query(
        "CALL Login(?,?)",
        [credentials.email, password],
        (err, result) => {
          if (err) throw err;
          if (result[0][0].TYPE == "ERROR") callback(result[0][0], false);
          else {
            callback(result[0][0], true);
          }
        },
      );*/
    } catch (error) {
      console.log(error);
      callback(error, false);
    }
  }
  static logout({ id }: { id: number }) {
  }
}
