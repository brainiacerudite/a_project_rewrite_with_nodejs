const express = require("express");
const validate = require("../middlewares/validate");
const requestValidation = require("../validations/auth.validation");
const authController = require("../controllers/auth.controller");
const auth = require("../middlewares/auth");

const router = express.Router();

router.post("login", validate(requestValidation.login), authController.login);
router.post(
  "register",
  validate(requestValidation.register),
  authController.register
);
router.post(
  "logout",
  validate(requestValidation.logout),
  authController.logout
);
router.post(
  "refresh-tokens",
  validate(requestValidation.refreshTokens),
  authController.refreshTokens
);
router.post(
  "verify-email",
  validate(requestValidation.verifyEmail),
  authController.verifyEmail
);
router.post(
  "forgot-password",
  validate(requestValidation.forgotPassword),
  authController.forgotPassword
);
router.post(
  "reset-password",
  validate(requestValidation.resetPassword),
  authController.resetPassword
);
router.post(
  "send-verification-email",
  auth(),
  authController.sendVerificationEmail
);

module.exports = router;
