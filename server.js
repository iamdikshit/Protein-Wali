import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });

// Database Connection

// server setup
import app from "./app.js";
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port : ${port}..`);
  console.log(`It is a ${process.env.NODE_ENV} envrionment`);
});
