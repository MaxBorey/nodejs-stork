import Joi from 'joi';

export const updateUsersMeSchema = Joi.object({
  name: Joi.string().trim().optional(),
  email: Joi.string().email().trim().optional(),
  gender: Joi.string().valid('boy', 'girl', 'null').optional(),
  dueDate: Joi.string().trim().optional(),
});
