const express = require("express");
const authController = require("../controllers/auth.controller");

const router = express.Router();

router.post("login", authController.login);
router.post("register", authController.register);
router.post("verify-email", authController.verifyEmail);
router.post("forget-password", authController.forgetPassword);
router.post("reset-password", authController.resetPassword);
router.post("logout", authController.logout);

module.exports = router;
