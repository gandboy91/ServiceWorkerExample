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
                const validator = fieldValidators[field]
                if (!validator.validate(fields[field])) {
                    invalid[field] = validator.getError()
                }
            }
        } catch (e) {
            console.warn(e.message)
        }
        setInvalidFields(invalid)
        return !Object.keys(invalid).length
    }

    return {
        invalidFields,
        validate: useCallback(validate, []),
    }
}