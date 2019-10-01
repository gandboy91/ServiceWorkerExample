import {
  deleteWithToken,
  getWithToken,
  postWithToken,
  putWithToken,
} from './index';

export const getCards = (body = null) => getWithToken({ url: 'posts', body });

export const like = (id) => postWithToken({ url: `posts/${id}/like` });

export const saveCard = (card) => postWithToken({ url: `posts`, body: card });

export const changeCard = ({ id, card }) =>
  putWithToken({ url: `posts/${id}`, body: card });

export const removeCard = (id) => deleteWithToken({ url: `posts/${id}` });
