import Joi from "joi";

export const createDiaryNoteSchema = Joi.object({
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

    date: Joi.date().default(() => new Date()).messages({
      "date.base": 'Поле "{#label}" повинно бути датою',
    }),

    userId: Joi.string().messages({
    'string.base'  : 'The "{#label}" field must be a string',
  }),

     emotions: Joi.array().items(Joi.string().messages({
    'string.base'  : 'The "{#label}" field must be a string',
  })),
});
