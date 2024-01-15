const httpStatus = require("http-status");

function login(req, res) {
  // validation

  // autheticate

  return res.statusCode(httpStatus.NO_CONTENT);
}

function register(req, res) {
  // validation

  // save user

  // authenticate

  return res.statusCode(httpStatus.NO_CONTENT);
}

function verifyEmail(req, res) {
  // validation

  // logic

  return res.statusCode(httpStatus.NO_CONTENT);
}

function forgetPassword(req, res) {
  // validation

  // logic

  return res.statusCode(httpStatus.NO_CONTENT);
}

function resetPassword(req, res) {
  // validation

  // logic

  return res.statusCode(httpStatus.NO_CONTENT);
}

module.exports = {
  login,
  register,
  verifyEmail,
  forgetPassword,
  resetPassword,
};
