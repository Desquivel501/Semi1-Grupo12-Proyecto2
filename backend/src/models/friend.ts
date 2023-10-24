import { connector } from "./database/connection";
import { getSuccessfullMessage } from "../utils/successfullMessage";
import { checkRows } from "../utils/checkRows";

export class FriendModel {
  static async addFriend(email: string, friend: string) {
    try {
      const data = await connector.promise().query(
        "CALL CreateFriendRequest(?,?)",
        [email, friend],
      );
      return getSuccessfullMessage(data);
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  static async acceptNewFriend(email: string, friend: string) {
    try {
      const data = await connector.promise().query(
        "CALL AcceptFriendRequest(?,?)",
        [email, friend],
      );
      return getSuccessfullMessage(data);
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  static async declineNewFriend(email: string, friend: string) {
    try {
      const data = await connector.promise().query(
        "CALL DeclineFriendRequest(?,?)",
        [email, friend],
      );
      return getSuccessfullMessage(data);
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  static async getFriends(email: string) {
    try {
      const data = await connector.promise().query(
        "CALL GetUserFriends(?)",
        [email],
      );
      console.log(data)
      return checkRows(data);
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  static async getNonFriends(email: string) {
    try {
      const data = await connector.promise().query(
        "CALL GetNonFriends(?)",
        [email],
      );
      return checkRows(data);
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  static async getFriendRequests(email: string) {
    try {
      const data = await connector.promise().query(
        "CALL GetFriendRequests(?)",
        [email],
      );
      return checkRows(data);
    } catch (error) {
      console.log(error);
      return null;
    }
  }

}
