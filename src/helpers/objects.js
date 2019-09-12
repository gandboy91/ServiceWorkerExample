/**
 * gets the highest object key. Casts keys to int
 * @param obj
 * @returns {number}
 */
export const getMaxKey = obj => Math.max(...Object.keys(obj).map(key => +key))