const userService = require("./user.service");
const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");
const ValidationError = require("../utils/ValidationError");
const { Token } = require("../models");
const { tokenTypes } = require("../config/tokens");
const tokenService = require("./token.service");

const attemptLogin = async (email, password) => {
  const user = await userService.getUserByEmail(email);
  if (!user || !(await user.isPasswordMatch(password))) {
    let message = "These credentials do not match our records.";
    throw new ValidationError(
      httpStatus.UNPROCESSABLE_ENTITY,
      message,
      true,
      "",
      { email: message }
    );
  }
  return user;
};

const logout = async (refreshToken) => {
  const refreshTokenDoc = await Token.findOne({
    token: refreshToken,
    type: tokenTypes.REFRESH,
    blacklisted: false,
  });

  if (!refreshTokenDoc) {
    throw new ApiError(httpStatus.NOT_FOUND, "Not Found");
  }
  await refreshTokenDoc.remove();
};

const refreshAuth = async (refreshToken) => {
  try {
    const refreshTokenDoc = await tokenService.verifyToken(
      refreshToken,
      tokenTypes.REFRESH
    );
    const user = await userService.getUserById(refreshTokenDoc.user);

    if (!user) {
      throw new Error();
    }
    await refreshTokenDoc.remove();
    return tokenService.generateAuthTokens(user);
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Unautheticated");
  }
};

const resetPassword = async (token, newPassword, passwordConfirmation) => {
  try {
    const resetPasswordTokenDoc = await tokenService.verifyToken(
      token,
      tokenTypes.RESET_PASSWORD
    );
    const user = await userService.getUserById(resetPasswordTokenDoc.user);
    if (!user) {
      throw new Error();
    }

    const passwordNotMatch =
      newPassword !== passwordConfirmation ? true : false;
    if (passwordNotMatch) {
      let message = "Password does not match";
      throw new ValidationError(
        httpStatus.UNPROCESSABLE_ENTITY,
        message,
        true,
        "",
        { password: message }
      );
    }

    await userService.update(user.id, { password: newPassword });
    await Token.deleteMany({ user: user.id, type: tokenTypes.RESET_PASSWORD });
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Password reset failed");
  }
};

const verifyEmail = async (token) => {
  try {
    const verifyEmailTokenDoc = await tokenService.verifyToken(
      token,
      tokenTypes.VERIFY_EMAIL
    );
    const user = await userService.getUserById(verifyEmailTokenDoc.user);
    if (!user) {
      throw new Error();
    }

    await Token.deleteMany({ user: user.id, type: tokenTypes.VERIFY_EMAIL });
    await userService.update(user.id, { isEmailVerified: true });
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Email verification failed");
  }
};

module.exports = {
  attemptLogin,
  logout,
  refreshAuth,
  resetPassword,
  verifyEmail,
};
