import Joi from "joi";

export const createDiaryEntrySchema = Joi.object({
    title: Joi.string().min(1).max(64).required().messages({
    "string.base": 'Поле "{#label}" повинно бути рядком',
    "string.empty": 'Поле "{#label}" не може бути порожнім',
    "string.min": 'Поле "{#label}" повинно містити мінімум {#limit} символ',
    "string.max": 'Поле "{#label}" повинно містити максимум {#limit} символів',
    "any.required": 'Поле "{#label}" є обовʼязковим',
    }),

    description: Joi.string().min(1).max(1000).required().messages({
    "string.base": 'Поле "{#label}" повинно бути рядком',
    "string.empty": 'Поле "{#label}" не може бути порожнім',
    "string.min": 'Поле "{#label}" повинно містити мінімум {#limit} символ',
    "string.max": 'Поле "{#label}" повинно містити максимум {#limit} символів',
    "any.required": 'Поле "{#label}" є обовʼязковим',
    }),

    date: Joi.date().optional().default(() => new Date()).messages({
      "date.base": 'Поле "{#label}" повинно бути датою',
    }),

     emotions: Joi.array().min(1).max(12).items(Joi.string().required().messages({
    'string.base'  : 'Поле "{#label}" повинно бути рядком',
  })).messages({
    "array.min": 'Потрібно вибрати хоча б одну емоцію',
    "array.max": 'Можна вибрати не більше ніж {#limit} емоцій',
    "array.base": 'Поле "{#label}" повинно бути масивом',
  }),
});

export const updateDiaryEntrySchema = Joi.object({
    title: Joi.string().min(1).max(64).optional().messages({
    "string.base": 'Поле "{#label}" повинно бути рядком',
    "string.min": 'Поле "{#label}" повинно містити мінімум {#limit} символ',
    "string.max": 'Поле "{#label}" повинно містити максимум {#limit} символів',
    }),

    description: Joi.string().min(1).max(1000).optional().messages({
    "string.base": 'Поле "{#label}" повинно бути рядком',
    "string.min": 'Поле "{#label}" повинно містити мінімум {#limit} символ',
    "string.max": 'Поле "{#label}" повинно містити максимум {#limit} символів',
    }),

    date: Joi.date().optional().default(() => new Date()).messages({
      "date.base": 'Поле "{#label}" повинно бути датою',
    }),

     emotions: Joi.array().min(1).max(12).items(Joi.string().optional().messages({
    'string.base'  : 'Поле "{#label}" повинно бути рядком',
  })).messages({
    "array.min": 'Потрібно вибрати хоча б одну емоцію',
    "array.max": 'Можна вибрати не більше ніж {#limit} емоцій',
    "array.base": 'Поле "{#label}" повинно бути масивом',
  }),
});
