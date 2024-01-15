const express = require("express");
const authController = require("../controllers/auth.controller");

const route = express.Router();

route.post("login", authController.login);
route.post("register", authController.register);
route.post("verify-email", authController.verifyEmail);
route.post("forget-password", authController.forgetPassword);
route.post("reset-password", authController.resetPassword);

module.exports = route;
