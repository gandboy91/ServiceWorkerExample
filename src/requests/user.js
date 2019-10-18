import { getWithToken, postWithToken } from '.';

export const getUserByToken = () => getWithToken({ url: 'user' });

export const getUserById = (id) => getWithToken({ url: `users/${id}` });

export const subscribe = (vapidPublicKey) =>
  postWithToken({ url: 'subscribe', body: { vapidPublicKey } });
