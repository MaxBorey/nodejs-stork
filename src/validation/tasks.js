import Joi from 'joi';
import { toUtcMidnight } from '../utils/date.js';

export const createTaskSchema = Joi.object({
  title: Joi.string().trim().min(1).max(160).required(),
  date: Joi.string()
    .required()
    .custom((value, helpers) => {
      try { return toUtcMidnight(value); } // повертає Date (UTC 00:00)
      catch { return helpers.error('any.invalid'); }
    })
    .messages({
      'any.required': 'date is required',
      'any.invalid': 'date must be DD.MM.YYYY or YYYY-MM-DD'
    }),
  completed: Joi.boolean().default(false),
  userId: Joi.forbidden(),
}).prefs({ convert: true, stripUnknown: true });


export const setCompletedSchema = Joi.object({
  completed: Joi.boolean().required(),
});
