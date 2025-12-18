// middleware/validate.js
export const validateBody = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, {
    abortEarly: false,   // return all errors, not just first
    stripUnknown: true,  // remove unknown fields
  });

  if (error) {
    return res.status(400).json({
      message: 'Validation error',
      errors: error.details.map((d) => d.message),
    });
  }

  req.body = value; // sanitized data
  next();
};
