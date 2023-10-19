import { User } from "../customTypes/types";
import { connector } from "./database/connection";
import { getSuccessfullMessage } from "../utils/successfullMessage";

export class UserModel {
  static async register(user: User) {
    try {
      const data = await connector.promise().query(
        "CALL Register(?,?,?,?,?,?)",
        [
          user.email,
          user.password,
          user.name,
          user.lastName,
          user.dpi,
          user.avatar.location,
        ],
      );
      return getSuccessfullMessage(data);
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  static async getUser(email: string) {
    try {
      const data = await connector.promise().query(
        "CALL GetUserData(?)",
        [email],
      );
      return getSuccessfullMessage(data);
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  static async updateUser(user: User) {
    try {
      const data = await connector.promise().query(
        "CALL UpdateUser(?,?,?,?,?,?)",
        [
          user.email,
          user.password,
          user.name,
          user.lastName,
          user.dpi,
          user.avatar.location,
        ],
      );
      return getSuccessfullMessage(data);
    } catch (error) {
      console.log(error);
      return null
    }
  }

}
