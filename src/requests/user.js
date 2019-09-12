import {get, getWithToken} from ".";
import {isObject} from "../helpers/types";
import {AUTH_ERROR_KEY} from "../constants/validation";

export const getUserByToken = token => getWithToken({ url: 'user' })

export const getUserById = id => getWithToken({ url: `users/${id}` })
