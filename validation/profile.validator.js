const Joi = require('joi');

const userSchema = Joi.object({
  fname: Joi.string().required().min(3).max(10),
  lname: Joi.string().required().min(3).max(10),
  email: Joi.string().required(),
  password: Joi.string().required().min(6),
  role : Joi.string().required()
});

module.exports = userSchema;
