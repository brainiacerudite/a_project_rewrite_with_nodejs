const express = require("express");
const helmet = require("helmet");
const xss = require("xss-clean");
const compression = require("compression");
const cors = require("cors");
const httpStatus = require("http-status");
const dotenv = require("dotenv");
const config = require("./config/config");
const morgan = require("./config/morgan");
const routes = require("./routes");

const app = express();

if (config.env !== "test") {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// set security HTTP headers
app.use(helmet());

// parse JSON request body
app.use(express.json());

// sanitize request data
app.use(xss());
// app.use(mongoSanitize());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.use("*", cors());

// // jwt authentication
// app.use(passport.initialize());
// passport.use("jwt", jwtStrategy);

// // limit repeated failed requests to auth endpoints
// if (config.env === "production") {
//   app.use("/login", authLimiter);
// }

// api routes/endpoints
app.use("/", routes);

// // 404 error for unknown request
// app.use((req, res, next) => {
//   next(new ApiError(httpStatus.NOT_FOUND, "Not Found"));
// });

// // convert error to ApiError, if needed
// app.use(errorConverter);

// // handle error
// app.use(errorHandler);

module.exports = app;
