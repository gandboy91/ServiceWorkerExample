export const MIN_TITLE_LENGTH = 2
export const MAX_TITLE_LENGTH = 20
export const MIN_TEXT_LENGTH = 3
export const MAX_TEXT_LENGTH = 200
export const AUTH_ERROR_KEY = 'authenticate'

export const minLength = (value, limit) => value.length > limit
export const maxLength = (value, limit) => value.length < limit

export const validateTitle = title => minLength(title, MIN_TITLE_LENGTH)
export const validateText = text => minLength(text, MIN_TEXT_LENGTH)

export const TITLE_ERROR_MESSAGE = `Title must be at least ${MIN_TITLE_LENGTH} char length`
export const TEXT_ERROR_MESSAGE = `Text must be at least ${MIN_TEXT_LENGTH} char length`