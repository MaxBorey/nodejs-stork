import Joi from "joi";


export const createDiaryEntrySchema = Joi.object({
  title: Joi.string()
    .trim()
    .min(1)
    .max(64)
    .required()
    .messages({
      'string.base': 'Поле "{#label}" повинно бути рядком',
      'string.empty': 'Поле "{#label}" не може бути порожнім',
      'string.min': 'Поле "{#label}" повинно містити мінімум {#limit} символ',
      'string.max': 'Поле "{#label}" повинно містити максимум {#limit} символів',
      'any.required': 'Поле "{#label}" є обовʼязковим',
    }),

  description: Joi.string()
    .trim()
    .min(1)
    .max(1000)
    .required()
    .messages({
      'string.base': 'Поле "{#label}" повинно бути рядком',
      'string.empty': 'Поле "{#label}" не може бути порожнім',
      'string.min': 'Поле "{#label}" повинно містити мінімум {#limit} символ',
      'string.max': 'Поле "{#label}" повинно містити максимум {#limit} символів',
      'any.required': 'Поле "{#label}" є обовʼязковим',
    }),

  // Обовʼязково, формат лише YYYY-MM-DD
  date: Joi.forbidden().messages({
    'any.unknown': 'Поле "date" встановлюється автоматично та не передається',
  }),

  emotions: Joi.array()
    .items(
      Joi.string()
        .hex()
        .length(24)
        .required()
        .messages({
          'string.base': 'Поле "{#label}" повинно бути рядком',
          'string.hex': 'ID емоції має бути шістнадцятковим',
          'string.length': 'ID емоції повинен містити рівно {#limit} символи',
          'any.required': 'Кожен елемент масиву емоцій є обовʼязковим',
        })
    )
    .min(1)
    .max(12)
    .unique()
    .required()
    .messages({
      'array.base': 'Поле "{#label}" повинно бути масивом',
      'array.min': 'Потрібно вибрати хоча б одну емоцію',
      'array.max': 'Можна вибрати не більше ніж {#limit} емоцій',
      'array.unique': 'Емоції не повинні повторюватися',
      'any.required': 'Поле "{#label}" є обовʼязковим',
    }),
})
.prefs({ stripUnknown: true });


export const updateDiaryEntrySchema = Joi.object({
  title: Joi.string()
    .trim()
    .min(1)
    .max(64)
    .messages({
      'string.base': 'Поле "{#label}" повинно бути рядком',
      'string.min': 'Поле "{#label}" повинно містити мінімум {#limit} символ',
      'string.max': 'Поле "{#label}" повинно містити максимум {#limit} символів',
    }),

  description: Joi.string()
    .trim()
    .min(1)
    .max(1000)
    .messages({
      'string.base': 'Поле "{#label}" повинно бути рядком',
      'string.min': 'Поле "{#label}" повинно містити мінімум {#limit} символ',
      'string.max': 'Поле "{#label}" повинно містити максимум {#limit} символів',
    }),


  date: Joi.forbidden().messages({
    'any.unknown': 'Поле "date" не змінюється для запису щоденника',
  }),

  emotions: Joi.array()
    .items(
      Joi.string()
        .hex()
        .length(24)
        .messages({
          'string.base': 'Поле "{#label}" повинно бути рядком',
          'string.hex': 'ID емоції має бути шістнадцятковим',
          'string.length': 'ID емоції повинен містити рівно {#limit} символи',
        })
    )
    .min(1)
    .max(12)
    .unique()
    .messages({
      'array.base': 'Поле "{#label}" повинно бути масивом',
      'array.min': 'Потрібно вибрати хоча б одну емоцію',
      'array.max': 'Можна вибрати не більше ніж {#limit} емоцій',
      'array.unique': 'Емоції не повинні повторюватися',
    }),
})
  .min(1)
  .messages({
    'object.min': 'Передайте хоча б одне поле для оновлення',
  })
  .prefs({ stripUnknown: true });
