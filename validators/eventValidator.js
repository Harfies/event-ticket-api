const Joi = require("joi");

exports.createEventSchema = Joi.object({
  name: Joi.string().required(),

  price: Joi.number().min(0).required(),

  location: Joi.string().required(),

  date: Joi.string()
    .pattern(/^\d{4}-\d{2}-\d{2}$/)
    .custom((value, helpers) => {
      // Check that the date is a real calendar date.
      const parsedDate = new Date(`${value}T00:00:00.000Z`);

      if (
        Number.isNaN(parsedDate.getTime()) ||
        parsedDate.toISOString().slice(0, 10) !== value
      ) {
        return helpers.error("date.format");
      }

      // Get today's date in Nigeria (Africa/Lagos).
      const today = new Intl.DateTimeFormat("en-CA", {
        timeZone: "Africa/Lagos",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).format(new Date());

      // Reject dates before today.
      if (value <= today) {
        return helpers.error("date.min");
      }

      return value;
    })
    .required()
    .messages({
      "string.pattern.base":
        "Date must use YYYY-MM-DD format, e.g. 2027-05-21.",
      "date.format": "Please enter a valid calendar date.",
      "date.min":
        "Event date cannot be in the past. Choose today or a future date.",
      "any.required": "Event date is required.",
    }),

  description: Joi.string().optional(),
});
