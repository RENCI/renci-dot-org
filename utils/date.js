/**
 * Checks if a JS Date object is valid
 */
export const isValidDate = (d) => {
  if (!(d instanceof Date)) return false;
  return d.toUTCString() !== "Invalid Date";
};

const dateOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", dateOptions);
};
