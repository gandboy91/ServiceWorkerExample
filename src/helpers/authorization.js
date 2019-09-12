import {getFromStorage} from "./storage"
import {TOKEN_STORAGE_KEY} from "../constants/storage"

export const withToken = requestFunction => (argsObject) => {
    const token = getFromStorage(TOKEN_STORAGE_KEY)
    return requestFunction.call(null, { ...argsObject, token })
}