import joi from "joi";

export const signUpSchema = joi.object({
  name: joi.string().required().min(1),
  email: joi.string().email().required(),
  password: joi.string().min(5).required(),
  confirmPassword: joi.string().min(5).required(),
});
