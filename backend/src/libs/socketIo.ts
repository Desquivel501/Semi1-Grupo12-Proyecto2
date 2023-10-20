import { Server, Socket } from "socket.io";

export function chat(io: Server) {
  //Chat es el "endpoint" donde se manejan los chats
  io.of("/chat").on("connection", (socket: Socket) => {
    console.log("New user connected!");
    // Evento para cambiar de chat
    socket.on("change room", (room) => {
      // Abandonamos los chats
      socket.rooms.forEach((room) => socket.leave(room));
      // Ingresamos a uno
      socket.join(room);
    });
    // Al desconectar
    socket.on("disconnect", () => {
      console.log("an user has disconnected");
    });
    // Evento de mensaje
    socket.on("message", (message, room) => {
      console.log({ message, room });
      // Respondemos por /chat al room objetivo
      if (room) {
        io.of("/chat").to(room).emit("message", message);
      }
    });
  });
}
