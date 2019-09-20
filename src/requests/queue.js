import { postSelfRequest, post } from ".";
import { getFromStorage } from '../helpers/storage';
import { TOKEN_STORAGE_KEY } from '../constants/storage';

export const pushQueue = (queue) => post({
  url: 'pushQueue',
  body: { queue, token: getFromStorage(TOKEN_STORAGE_KEY) }
})
