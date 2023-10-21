import { Message } from "../customTypes/types";
import { checkRows } from "../utils/checkRows";
import { getSuccessfullMessage } from "../utils/successfullMessage";
import { connector } from "./database/connection";

export class ChatFriendModel {
  static async SaveMessage(message: Message) {
    try {
      const data = await connector.promise().query(
        "CALL AddMessageFriend(?,?,?)",
        [message.friendship, message.sender, message.content],
      );
      console.log(data);
      return getSuccessfullMessage(data);
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  static async getMessages(room: number) {
    try {
      const data = await connector.promise().query(
        "CALL GetChatMessages(?)",
        [room],
      );
      return checkRows(data);
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
