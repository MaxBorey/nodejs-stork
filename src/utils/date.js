export function toUtcMidnight(input) {
  if (input instanceof Date) {
    return new Date(Date.UTC(
      input.getUTCFullYear(),
      input.getUTCMonth(),
      input.getUTCDate()
    ));
  }

  // DD.MM.YYYY
  const m1 = /^(\d{2})\.(\d{2})\.(\d{4})$/.exec(input);
  if (m1) {
    const d = Number(m1[1]), m = Number(m1[2]), y = Number(m1[3]);
    const dt = new Date(Date.UTC(y, m - 1, d));
    if (dt.getUTCFullYear() === y && dt.getUTCMonth() === m - 1 && dt.getUTCDate() === d) return dt;
    throw new Error('Invalid calendar date');
  }

  // YYYY-MM-DD
  const m2 = /^(\d{4})-(\d{2})-(\d{2})$/.exec(input);
  if (m2) {
    const y = Number(m2[1]), m = Number(m2[2]), d = Number(m2[3]);
    const dt = new Date(Date.UTC(y, m - 1, d));
    if (dt.getUTCFullYear() === y && dt.getUTCMonth() === m - 1 && dt.getUTCDate() === d) return dt;
    throw new Error('Invalid calendar date');
  }

  throw new Error('Unsupported date format');
}
