import express from "express";
import cors from "cors";
import logger from "morgan";
import "dotenv/config";
import { Server } from "socket.io";
import { createServer } from "node:http";

import { authRouter } from "./routes/auth";
import { userRouter } from "./routes/user";
import { postRouter } from "./routes/post";
import { friendsRouter } from "./routes/friend";
import { checkToken } from "./middlewares/jwt";
import { chat } from "./libs/socketIo";

const app = express();
const server = createServer(app);
// Servidor del web socket
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use(cors());
app.use(express.json());
app.use(logger("dev"));

app.use("/api", authRouter);
app.use("/api/users", checkToken, userRouter);
app.use("/api/friends", checkToken, friendsRouter);
app.use("/api/posts", checkToken, postRouter);

chat(io);

app.get("/", (req, res) => {
  res.status(200).send("<h1>Hola mundo</h1>");
});

export default server;
