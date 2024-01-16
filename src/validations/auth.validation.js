const Joi = require("joi");
const { customPassword } = require("./custom.validation");

const login = {
  body: Joi.object().keys({
    email: Joi.required().string().email(),
    password: Joi.required().string().custom(customPassword),
  }),
};

const register = {
  body: Joi.object().keys({
    username: Joi.required().string().alphanum().min(3).max(30),
    email: Joi.required().string().email(),
    password: Joi.required().string().custom(customPassword),
    passwordConfirmation: Joi.ref(),
  }),
};
