import { deleteWithToken, getWithToken, postWithToken } from './index';

export const getCards = (body = null) => getWithToken({ url: 'posts', body })

export const like = id => postWithToken({ url: `posts/${id}/like` })

export const saveCard = (card) => postWithToken({ url: `posts`, body: card })

export const removeCard = id => deleteWithToken({ url: `posts/${id}` })