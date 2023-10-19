import { checkRows } from "../utils/checkRows";
import { getSuccessfullMessage } from "../utils/successfullMessage";
import { connector } from "./database/connection";

export class PostModel {
  static async createPost(
    email: string,
    desc: string,
    img: Express.MulterS3.File,
  ) {
    try {
      const message = await connector.promise().query(
        "CALL CreatePublication(?,?,?)",
        [email, img.location, desc],
      );
      return getSuccessfullMessage(message);
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  static async addComment(email: string, post: number, desc: string) {
    try {
      const message = await connector.promise().query(
        "CALL AddComment(?,?,?)",
        [email, post, desc],
      );
      return getSuccessfullMessage(message);
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  static async getPosts(email: string) {
    try {
      const message = await connector.promise().query(
        "CALL GetPublications(?)",
        [email],
      );
      return checkRows(message);
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  static async getPostComments(post: number) {
    try {
      const message = await connector.promise().query(
        "CALL GetPublicationComments(?)",
        [post],
      );
      return checkRows(message);
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  static async addTagToPost(post: number, tag: string) {
    try {
      const message = await connector.promise().query(
        "CALL AddTagToPublication(?,?)",
        [post, tag],
      );
      return getSuccessfullMessage(message);
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
