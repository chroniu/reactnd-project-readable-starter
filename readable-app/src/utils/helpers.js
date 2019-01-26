
export const arrayToIndexedObject = (array, indexProperty) =>
    array.reduce((obj, item) => (obj[item[indexProperty]] = item, obj), {});

