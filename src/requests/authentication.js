import { post } from '.';

export const login = ({ email, password }) =>
  post({ url: 'login', body: { email, password } });

export const register = ({ email, password, name }) =>
  post({ url: 'register', params: { email, password, name } });
