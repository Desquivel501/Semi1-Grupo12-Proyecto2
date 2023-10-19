import { Router } from "express";
import { FriendController } from "../controllers/friend";

export const friendsRouter = Router();

friendsRouter.post("/addFriend", FriendController.addFriend);
friendsRouter.post("/acceptFriend", FriendController.acceptNewFriend);
friendsRouter.post("/declineFriend", FriendController.declineNewFriend);
friendsRouter.get("/:email", FriendController.getFriends);
friendsRouter.get("/not/:email", FriendController.getNonFriends);
