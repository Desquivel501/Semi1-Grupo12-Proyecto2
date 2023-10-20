import express from "express";
import logger from "morgan";

const PORT = process.env.PORT ?? 3001;

const app = express();

app.use(logger("dev"));

app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/client/index.html");
});

app.listen(PORT, () => {
  console.log("Server on port:", PORT);
});
