import Joi from "joi";

export const postSchema = Joi.object({
  title: Joi.string().trim().min(2).required(),
  content: Joi.string().trim().required(),
  excerpt: Joi.string().allow("").optional(),
  status: Joi.string().valid("unpublished", "published").default("unpublished"),
  metaTitle: Joi.string().allow("").optional(),
  metaDescription: Joi.string().allow("").optional(),
  category: Joi.string().allow("").optional(),
  imageUrl: Joi.string().uri().allow("").optional(),
});
