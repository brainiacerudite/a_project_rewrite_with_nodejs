const httpStatus = require("http-status");
const catchAync = require("../utils/catchAsync");

const login = catchAync(async (req, res) => {
  // validation

  // autheticate

  res.status(httpStatus.NO_CONTENT);
});

const register = catchAync(async (req, res) => {
  // validation

  // save user

  // authenticate

  res.status(httpStatus.NO_CONTENT);
});

const logout = catchAync(async (req, res) => {
  res.status(httpStatus.OK);
});

const refreshTokens = catchAync(async (req, res) => {
  res.send("token");
});

const forgetPassword = catchAync(async (req, res) => {
  // validation

  // logic

  res.status(httpStatus.NO_CONTENT);
});

const resetPassword = catchAync(async (req, res) => {
  // validation

  // logic

  res.status(httpStatus.NO_CONTENT);
});

const sendVerificationEmail = catchAync(async (req, res) => {
  res.status(httpStatus.NO_CONTENT).send();
});

const verifyEmail = catchAync(async (req, res) => {
  // validation

  // logic

  res.status(httpStatus.NO_CONTENT);
});

module.exports = {
  login,
  register,
  logout,
  refreshTokens,
  forgetPassword,
  resetPassword,
  sendVerificationEmail,
  verifyEmail,
};
