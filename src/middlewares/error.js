const mongoose = require("mongoose");
const httpStatus = require("http-status");
const config = require("../config/config");
const logger = require("../config/logger");
const ApiError = require("../utils/ApiError");
const ValidationError = require("../utils/ValidationError");

const errorConverter = (err, req, res, next) => {
  let error = err;
  if (!(error instanceof ApiError) && !(error instanceof ValidationError)) {
    const statusCode =
      error.statusCode || error instanceof mongoose.Error
        ? httpStatus.BAD_REQUEST
        : httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    error = new ApiError(statusCode, message, false, err.stack);
  }
  next(error);
};

const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;
  if (config.env === "production" && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
  }

  res.locals.errorMessage = err.message;

  const response = {
    code: statusCode,
    message,
    ...(statusCode === httpStatus.UNPROCESSABLE_ENTITY && {
      errors: err.errors,
    }),
    ...(config.env === "development" && { stack: err.stack }),
  };

  // if (config.env === "development") {
  if (statusCode === httpStatus.INTERNAL_SERVER_ERROR) {
    logger.error(err);
  }
  // }

  res.status(statusCode).json(response);
};

module.exports = {
  errorConverter,
  errorHandler,
};
