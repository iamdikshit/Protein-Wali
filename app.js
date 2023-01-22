import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import test from "./controllers/testController.js";
import userRoute from "./routes/userRoute.js";
import AppError from "./utils/appError.js";
import globalErroHandller from "./controllers/errorController.js";

dotenv.config({ path: "./config.env" });

const app = express();

app.use(express.json());
// console.log("It is production env", process.env.NODE_ENV);
// Setting morgan middleware for logging
if (process.env.NODE_ENV.trim() == "development") {
  app.use(morgan("dev"));
}

app.get("/", test);
/*
  API ENDPOINT FOR USER
*/
app.use("/api/v1/user", userRoute);

/*
  ERROR HANDLER FOR NOT SERVER URL
*/
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Universal global Handler
/**********
 *@UniversalGlobalHandler
 Using this function we can handle the error from
 entire project by using CatchAsync Function
 ***********/
app.use(globalErroHandller);

export default app;
