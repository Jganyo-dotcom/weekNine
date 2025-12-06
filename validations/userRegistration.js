const Joi = require("joi");
const { model } = require("mongoose");

const validateUser = Joi.object({
  name: Joi.string().min(4).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

module.exports = validateUser;
