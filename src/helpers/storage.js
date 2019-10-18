/**
 * checks if storage is available
 * @returns {boolean}
 */
const storageIsAvailable = () => {
  if (!localStorage) {
    throw 'Storage is unavailible';
  }
  return true;
};

/**
 * save to storage value with given key
 * @param key
 * @param value
 * @returns {boolean|void}
 */
export const saveToStorage = (key, value) =>
  storageIsAvailable() && localStorage.setItem(key, JSON.stringify(value));

/**
 * gets value from storage
 * @param key
 * @returns {any}
 */
export const getFromStorage = (key) => {
  return storageIsAvailable() && JSON.parse(localStorage.getItem(key));
};
