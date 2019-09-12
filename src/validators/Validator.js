import {isFunction} from "../helpers/types";

/**
 * Common validator. Performs like interface
 * Ensures validate function is function and validate method name is 'validate'
 */
export default class Validator {
    constructor(validateFunction) {
        if (!isFunction(validateFunction)) {
            throw 'Invalid type: validator expects function as argument.'
        }
        this.validateFunction = validateFunction
    }

    validate = val => this.validateFunction(val)
}
