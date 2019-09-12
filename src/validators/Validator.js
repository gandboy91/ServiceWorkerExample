import {isFunction} from "../helpers/types";

/**
 * Common validator. Performs like interface
 * Ensures validate function is function and validate method name is 'validate'
 */
export default class Validator {
    constructor(validateFunction, errorMessage = '') {
        if (!isFunction(validateFunction)) {
            throw 'Invalid type: validator expects function as argument.'
        }
        this._errorMessage = errorMessage
        this._validateFunction = validateFunction
    }

    validate = val => this._validateFunction(val)
    getError = () => this._errorMessage
}
