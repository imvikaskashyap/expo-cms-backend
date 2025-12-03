export const validateJoi = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,   // return all errors
      stripUnknown: true,  // remove unknown fields
    });

    if (error) {
      const errors = error.details.map((d) => ({
        field: d.context.key,
        message: d.message,
      }));
      return res.status(422).json({ errors });
    }

    req.body = value;
    next();
  };
};
