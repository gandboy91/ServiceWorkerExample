/**
 * checks if passed argument is function
 * @param fnToCheck
 * @returns {*|boolean}
 */
export const isFunction = fnToCheck => fnToCheck && ({}.toString.call(fnToCheck) === '[object Function]')

/**
 * checks if passed argument is function
 * @param objToCheck
 * @returns {*|boolean}
 */
export const isObject = objToCheck => objToCheck && ({}.toString.call(objToCheck) === '[object Object]')

export const isString = strToCheck => (typeof strToCheck === 'string')