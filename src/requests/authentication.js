import {post} from ".";
import {isObject} from "../helpers/types";
import {AUTH_ERROR_KEY} from "../constants/validation";

export const login = ({ email, password }) => post({ url: 'login', body: { email, password }})

export const register = ({ email, password, name }) => post({ url: 'register', params: { email, password, name }})