/**
 * Return a new array without the item at the specified index
 */
export const deleteIndexFromArray = (array, i) => {
  const a = array.slice();
  a.splice(i, 1);
  return a;
};
