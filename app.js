import express from "express";
import morgan from "morgan";
import config from "./config/env.config.js"
import UserRoute from "./routes/user.Route.js";
import AppError from "./utils/appError.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import globalErroHandller from "./controllers/error.Controller.js";


const app = express();

// Middleware's
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cors());
app.use(cookieParser());

// Setting Morgan Middleware for Logging
if (config.NODE_ENV.trim() == "development") {
  app.use(morgan("dev"));
}

// API ENDPOINT FOR USER

/******************************************************
 * @AUTH_ROUTES
 * @Route_1   /api/v1/user/signup
 * @Route_2   /api/v1/user/signin
 * @Route_3   /api/v1/user/signout
 * @Route_4   /api/v1/user/password/forgot
 * @Route_5   /api/v1/user/password/:resetToken
 * @Route_6   /api/v1/user/password/change
 ******************************************************/
app.use("/api/v1/user",UserRoute);



// ERROR HANDLER FOR NOT SERVER URL

app.all("*", (req, _res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});




/**************************************************
* @UniversalGlobalHandler

* Using this function we can handle the error from
* Entire project by using CatchAsync Function
**************************************************/
app.use(globalErroHandller);

export default app;
