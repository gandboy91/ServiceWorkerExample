import {getWithToken, postWithToken} from "./index";

export const getCards = (params = null) => getWithToken({ url: 'posts', params })

export const like = id => postWithToken({ url: `posts/${id}/like` })