const Joi = require("joi");

exports.initializePaymentSchema = Joi.object({
  email: Joi.string().email().required(),
  eventId: Joi.string().length(24).required(), // Mongo ObjectId
});
