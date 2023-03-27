import Joi from "joi";

export const collageValidationSchema = new Joi.object({
  email: Joi.string()
    .email()
    .required()
    .pattern(new RegExp("^[a-zA-Z0-9._%+-]+@gmail.com$"))
    .message("Email Tidak Valid"),
  password: Joi.string().min(8),
  username: Joi.string()
    .min(5)
    .max(75)
    .required()
    .pattern(new RegExp("^[a-zA-Z0-9_-]{5,75}$")),
  status: Joi.string().valid("Aktif", "Alumni").required(),
  fullname: Joi.string().min(5).max(100).optional(),
  gender: Joi.string().valid("Laki - Laki", "Perempuan").optional(),
  thumbnail: Joi.string().optional(),
  workcollage: Joi.array().items(Joi.string()),
  createdAt: Joi.date().optional(),
  updatedAt: Joi.date().optional(),
});

export const workValidationSchema = new Joi.object({
  title: Joi.string().required(),
  desc: Joi.string().required(),
  link: Joi.string().required(),
  thumbnail: Joi.string(),
  createdAt: Joi.date().optional(),
  updatedAt: Joi.date().optional(),
});
