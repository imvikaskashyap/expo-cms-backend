import Joi from "joi";

export const pageSchema = Joi.object({
  title: Joi.string().trim().min(2).required(),
  content: Joi.string().trim().required(),
  status: Joi.string().valid("unpublished", "published").default("published"),
  metaTitle: Joi.string().allow("").optional(),
  metaDescription: Joi.string().allow("").optional(),
});
