import React, { useState, useCallback } from 'react'

/**
 * Validation hook. Takes validators object
 * Provides function which validate fields via given validators
 * return validate callback and array of invalid fields names
 * @param fieldValidators
 * @returns {{invalidFields: Array, validate: (function(*): boolean)}}
 */
export default function useValidation(fieldValidators) {

    const [invalidFields, setInvalidFields] = useState([])

    const validate = fields => {
        const invalid = []
        try {
            for (const field in fieldValidators) {
                !fieldValidators[field].validate(fields[field]) && invalid.push(field)
            }
        } catch (e) {
            console.warn(e.message)
        }
        setInvalidFields(invalid)
        return !invalid.length
    }

    return {
        invalidFields,
        validate: useCallback(validate, []),
    }
}