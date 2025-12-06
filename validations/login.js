const Joi = require("joi");

const loginUser = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

module.exports = loginUser;
