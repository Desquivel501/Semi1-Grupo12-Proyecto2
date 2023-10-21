import { Server, Socket } from "socket.io";
import { ChatFriendModel } from "../models/chatFriend";

export function chat(io: Server) {
  //Chat es el "endpoint" donde se manejan los chats
  io.of("/chat").on("connection", (socket: Socket) => {
    console.log("New user connected!");
    // Evento para cambiar de chat
    socket.on("change room", async (room) => {
      // Abandonamos los chats
      socket.rooms.forEach((room) => socket.leave(room));
      // Ingresamos a uno
      socket.join(room);
      const messages = await ChatFriendModel.getMessages(room);
      console.log(messages)
      if (messages?.length) {
        socket.emit("change room", messages);
      }
    });
    // Al desconectar
    socket.on("disconnect", () => {
      console.log("an user has disconnected");
    });
    // Evento de mensaje
    socket.on("message", async (sender, content, room) => {
      console.log({ sender, content, room });
      // Respondemos por /chat al room objetivo
      if (room) {
        // Obtenemos los mensajes anteriores
        const res = await ChatFriendModel.SaveMessage({
          sender,
          content,
          friendship: room,
        });
        console.log({res})
        if (res != null) {
          io.of("/chat").to(room).emit("message", content);
        }
      }
    });
  });
}
