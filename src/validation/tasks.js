import Joi from 'joi';
import { toUtcMidnight } from '../utils/date.js';

export const createTaskSchema = Joi.object({
  title: Joi.string().trim().min(1).max(160).required(),
  date: Joi.string()
    .required()
    .custom((value, helpers) => {
      // 1) нормалізуємо у Date (UTC 00:00) або кидаємо помилку формату
      let dt;
      try {
        dt = toUtcMidnight(value); // повертає Date на 00:00:00Z
      } catch {
        return helpers.error('date.format');
      }

      // 2) "сьогодні" на 00:00:00Z
      const now = new Date();
      const todayUTC = new Date(Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate()
      ));

      // 3) забороняємо минулі дати (сьогодні дозволено)
      if (dt < todayUTC) {
        return helpers.error('date.past');
      }

      // 4) повертаємо Date — Joi з convert:true передасть у контролер уже Date
      return dt;
    }, 'parse date & forbid past'),
  completed: Joi.boolean().default(false),
  userId: Joi.forbidden(),
})
  .prefs({ convert: true, stripUnknown: true })
  .messages({
    'any.required': 'date is required',
    'date.format': 'date must be DD.MM.YYYY or YYYY-MM-DD',
    'date.past': 'date cannot be in the past',
  });
