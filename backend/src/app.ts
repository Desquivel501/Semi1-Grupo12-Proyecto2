import express, { Request } from "express";
import cors from "cors";
import "dotenv/config";
import { authRouter } from "./routes/auth";
import { userRouter } from "./routes/user";
import { postRouter } from "./routes/post";
import { friendsRouter } from "./routes/friend";
import { checkToken } from "./middlewares/jwt";

const app = express();
app.use(cors());
app.use(express.json());
app.use((req:Request,res,next)=>{
  console.log(`- [${req.method}] "${req.path}"`)
  next()
})

app.use("/api", authRouter);
app.use("/api/users",checkToken, userRouter);
app.use("/api/friends",checkToken, friendsRouter);
app.use("/api/posts",checkToken, postRouter);

app.get("/", (req, res) => {
  res.status(200).send("<h1>Hola mundo</h1>");
});

export default app;
