import Joi from 'joi';

export const createTaskSchema = Joi.object({
  title: Joi.string().required().min(3).max(100).messages({
    'any.required': 'Title is required',
    'string.empty': 'Title cannot be an empty field',
    'string.min': 'Title must be at least 3 characters long',
    'string.max': 'Title cannot exceed 100 characters',
  }),
  description: Joi.string().optional().max(1000).messages({
    'string.max': 'Description cannot exceed 1000 characters',
  }),
});

export const updateTaskStatusSchema = Joi.object({
  status: Joi.string()
    .valid('pending', 'in-progress', 'completed')
    .required()
    .messages({
      'any.required': 'Status is required',
      'string.empty': 'Status cannot be an empty field',
      'any.only': 'Status must be one of: pending, in-progress, completed',
    }),
});
