import { post } from '.';

export const login = ({ email, password }) =>
  post({ url: 'login', body: { email, password } });

export const register = ({ email, password, name, lastName }) =>
  post({
    url: 'register',
    body: { email, password, name, last_name: lastName },
  });
