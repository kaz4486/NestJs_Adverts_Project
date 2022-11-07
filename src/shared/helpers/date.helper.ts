/* eslint-disable prettier/prettier */
export const dateToArray = (date: Date): Array<number> => {
  return [
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
  ];
};

export const arrayToDate = (array: any): Date => {
  if (!Array.isArray(array) || array.length !== 6 || array.some(i => typeof i !== 'number')) return new Date();
  return new Date(array[0], array[1], array[2], array[3], array[4], array[5]);
};
