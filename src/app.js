const express = require("express");
const helmet = require("helmet");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const compression = require("compression");
const cors = require("cors");
const passport = require("passport");
const httpStatus = require("http-status");
const config = require("./config/config");
const morgan = require("./config/morgan");
const { jwtStrategy } = require("./config/passport");
const { authLimiter } = require("./middlewares/rateLimiter");
const routes = require("./routes");
const { errorConverter, errorHandler } = require("./middlewares/error");
const ApiError = require("./utils/ApiError");

const app = express();

if (config.env !== "test") {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// set security HTTP headers
app.use(helmet());

// parse JSON request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());
app.use(mongoSanitize());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.use("*", cors());

// jwt authentication
app.use(passport.initialize());
passport.use("jwt", jwtStrategy);

// limit repeated failed requests to auth endpoints
if (config.env === "production") {
  app.use("/login", authLimiter);
  app.use("/register", authLimiter);
  app.use("/logout", authLimiter);
  app.use("/refresh-tokens", authLimiter);
  app.use("/verify-email", authLimiter);
  app.use("/forgot-password", authLimiter);
  app.use("/reset-password", authLimiter);
  app.use("/send-verification-email", authLimiter);
}

// api routes/endpoints
app.use("/", routes);

// 404 error for unknown request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not Found"));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;
