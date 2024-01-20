const httpStatus = require("http-status");
const { User } = require("../models");
const ApiError = require("../utils/ApiError");

const getUserByEmail = async (email) => {
  return User.findOne({ email });
};

const getUserById = async (id) => {
  return User.findById(id);
};

const create = async (userBody) => {
  const emailTaken = await User.isEmailTaken(userBody.email);
  if (emailTaken) {
    let message = "Email already taken";
    throw new ValidationError(
      httpStatus.UNPROCESSABLE_ENTITY,
      message,
      true,
      "",
      { email: message }
    );
  }

  const passwordNotMatch =
    userBody.password !== userBody.passwordConfirmation ? true : false;
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

  return await User.create(userBody);
};

const update = async (userId, updateBody) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
    let message = "Email already taken";
    throw new ValidationError(
      httpStatus.UNPROCESSABLE_ENTITY,
      message,
      true,
      "",
      { email: message }
    );
  }

  Object.assign(user, updateBody);
  await user.save();
  return user;
};

module.exports = {
  getUserByEmail,
  getUserById,
  create,
  update,
};
