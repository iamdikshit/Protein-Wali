import { catchAsync } from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";

const getAllUser = catchAsync((req, res, next) => {
  const value = 5;
  return res.status(200).json({
    msg: "All users",
  });
});

export { getAllUser };
