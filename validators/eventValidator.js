const Joi = require("joi");

exports.createEventSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  location: Joi.string().required(),
  date: Joi.date().required(),
  description: Joi.string().optional(), // ✅ ADD THIS
});
