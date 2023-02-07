import { promisify } from "util";
import User from "../models/user.Schema.js";
import JWT from "jsonwebtoken";
import asyncHandler from "../services/asyncHandler.js";
import AppError from "../services/appError.js";
import config from "../config/env.config.js";

export const Authentication = asyncHandler(async (req, _res, next) => {
  // Declaring token so that it could be used in whole block
  let token;

  // Checking token in Cookies & in Bearer Token
  if (
    req.cookies.token ||
    (req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer"))
  ) {
    // Fetching Token Value from either Cookies or From Bearer Token and Storing in "token".
    token = req.cookies.token || req.headers.authorization.split(" ")[1];
  }

  // Checking Whether token (tokenValue) is present or not
  if (!token) {
    return next(
      new AppError(
        "Token is Invalid! Not Authorized to Access this Route.",
        401
      )
    );
  }

  // Verifying Token
  const decodedJwtPayload = JWT.verify(token, config.JWT_SECRET);
  // const decodedJwtPayload = await promisify(jwt.verify)(
  //   token,
  //   config.JWT_SECRET
  // );
  // Finding User based on "_id" and with Selected Fields (Name, Email, Role) and Sending it to req.user
  const user = await User.findById(
    decodedJwtPayload._id,
    "name email address phone isActive role"
  );

  if (!user) {
    return next(
      new AppError(
        "The user belonging to this token does no longer exist.",
        401
      )
    );
  }
  req.user = user;

  next();
});
