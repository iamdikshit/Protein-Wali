const handleCastError = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

// status code 401 is for Unauthorised
const handleJsonWebTokenError = () => {
  new AppError("Invalid token. Please log in again!", 401);
};

const handleTokenExpiredError = () => {
  new AppError("Your token has expired! Please login again", 401);
};

/*
 * @sendErrorDeve function
 * @Parameter : err and res
 * @Return : this function will return error message for development env
 */
const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

/*
 * @sendErrorProd function
 * @Parameter : err and res
 * @Return : this function will return error message for production env
 */
const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.statusCode,
      message: err.message,
    });
  }
};

/*
 * @globalErroHandller function
 * @Parameter : err,req,res,next
 * @Return : this function will return error message for production and dev environment
 */

const globalErroHandller = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV.trim() === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV.trim() === "production") {
    let error = { ...err };
    if (error.name === "CastError") error = handleCastError(error);
    if (error.name === "JsonWebTokenError") error = handleJsonWebTokenError();
    if (error.name === "TokenExpiredError") error = handleTokenExpiredError();

    sendErrorProd(error, res);
  }
};

export default globalErroHandller;
