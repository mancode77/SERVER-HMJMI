import Joi from "joi";

export const lectureSchema = new Joi.object({
  username: Joi.string()
    .min(5)
    .max(75)
    .required()
    .pattern(new RegExp("^[a-zA-Z0-9_-]{5,75}$")),
  email: Joi.string()
    .min(5)
    .max(50)
    .required()
    .pattern(new RegExp("^[a-zA-Z0-9._%+-]+@gmail.com$"))
    .message("Email Tidak Valid"),
  password: Joi.string().min(8).max(100),
  fullname: Joi.string(),
  gender: Joi.string().valid("Laki - Laki", "Perempuan").messages({
    "message": 'Gender harus "Laki - Laki" atau "Perempuan".',
  }),
  thumbnail: Joi.string(),
});
