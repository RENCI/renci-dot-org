/**
 * create a slug string from a date
 * @example ```js
 * slugFromDate(new Date("2023-02-01"))   // "2023/02/01"
 * ```
 */
export const dateToSlug = (d) => {
  const date = new Date(d);
  const [day, month, year] = [
    date.getUTCDate(),
    date.getUTCMonth() + 1,
    date.getUTCFullYear(),
  ];
  return `${year}/${month}/${day}`;
};
