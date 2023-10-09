import express from "express";
import cors from "cors";
import "dotenv/config";
import { authRouter } from "./routes/auth";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", authRouter);
//app.use("/api/users", userRouter);
//app.use("/api/posts", songRouter);

app.get("/", (req, res) => {
  res.status(200).send("<h1>Hola mundo</h1>");
});

export default app;
