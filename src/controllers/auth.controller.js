const httpStatus = require("http-status");
const catchAync = require("../utils/catchAsync");
const { authService, tokenService, userService } = require("../services");

const login = catchAync(async (req, res) => {
  const {
    body: { email, password },
  } = req;

  const user = await authService.attemptLogin(email, password);
  const tokens = await tokenService.generateAuthTokens(user);
  res.status(httpStatus.OK).send({ user, tokens });
});

const register = catchAync(async (req, res) => {
  const user = await userService.create(req.body);
  const tokens = await tokenService.generateAuthTokens(user);

  res.status(httpStatus.CREATED).send({ user, tokens });
});

const logout = catchAync(async (req, res) => {
  await authService.logout(req.body.refreshToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const refreshTokens = catchAync(async (req, res) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken);
  res.send({ ...tokens });
});

const forgotPassword = catchAync(async (req, res) => {
  const token = await tokenService.generateResetPasswordToken(req.body.email);
  //TODO: send email to user to reset the password
  res.status(httpStatus.NO_CONTENT).send();
});

const resetPassword = catchAync(async (req, res) => {
  await authService.resetPassword(
    req.query.token,
    req.body.password,
    req.body.passwordConfirmation
  );

  res.status(httpStatus.NO_CONTENT).send();
});

const sendVerificationEmail = catchAync(async (req, res) => {
  const token = await tokenService.generateVerifyEmailToken(req.user);
  //TODO: send email to user
  res.status(httpStatus.NO_CONTENT).send();
});

const verifyEmail = catchAync(async (req, res) => {
  await authService.verifyEmail(req.query.token);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  login,
  register,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  sendVerificationEmail,
  verifyEmail,
};
