const Joi = require("joi");

const ValidateArticle = Joi.object({
  title: Joi.string().min(5).required(),
  content: Joi.string().min(10).required(),
});

const ValidateupdatedArticle = Joi.object({
  title: Joi.string().min(5).optional(),
  content: Joi.string().min(10).optional(),
});

module.exports = {
  ValidateArticle,
  ValidateupdatedArticle,
};
