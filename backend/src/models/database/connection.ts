import { createConnection } from "mysql";

export const connector = createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DB,
});
connector.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return null;
  }
  console.log("connected as id " + connector.threadId);
});
