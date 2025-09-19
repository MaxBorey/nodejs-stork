import createHttpError from 'http-errors';

export const normalizeDateOrThrow = (raw) => {
  if (raw == null || raw === '') return null;
  if (raw instanceof Date && !isNaN(raw)) return raw;

  const s = String(raw).trim();

  // 1) ISO: YYYY-MM-DD
  const iso = /^(\d{4})-(\d{2})-(\d{2})$/;

  // 2) DMY з будь-яким з цих роздільників: ".", "-", "/"
  //    Інтерпретуємо як Європейський формат: DD-MM-YYYY, НЕ MM-DD-YYYY.
  const dmy = /^(\d{2})[-./](\d{2})[-./](\d{4})$/;

  let y, m, d, mres;

  if ((mres = iso.exec(s))) {
    [, y, m, d] = mres; // YYYY-MM-DD
  } else if ((mres = dmy.exec(s))) {
    const [, dd, mm, yyyy] = mres; // DD-MM-YYYY | DD.MM.YYYY | DD/MM/YYYY
    y = yyyy; m = mm; d = dd;
  } else {
    throw createHttpError(
      400,
      'Невірний формат дати. Використовуйте YYYY-MM-DD, DD.MM.YYYY або DD-MM-YYYY'
    );
  }

  const yi = Number(y), mi = Number(m), di = Number(d);
  if (mi < 1 || mi > 12 || di < 1 || di > 31) {
    throw createHttpError(400, 'Невірна дата');
  }

  // Створюємо дату на 00:00:00Z, щоб уникати зсувів TZ
  const dt = new Date(Date.UTC(yi, mi - 1, di));

  // Перевірка переповзання (напр. 31.02)
  if (
    dt.getUTCFullYear() !== yi ||
    dt.getUTCMonth() !== mi - 1 ||
    dt.getUTCDate() !== di
  ) {
    throw createHttpError(400, 'Такої дати не існує');
  }

  return dt;
};
