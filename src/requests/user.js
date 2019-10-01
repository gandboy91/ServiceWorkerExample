import { getWithToken } from '.';

export const getUserByToken = () => getWithToken({ url: 'user' });

export const getUserById = (id) => getWithToken({ url: `users/${id}` });
