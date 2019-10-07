import { postSelfRequest, post } from '.';
import { getFromStorage } from '../helpers/storage';
import { TOKEN_STORAGE_KEY } from '../constants/storage';
import { API_KEY } from '../constants/keys';

export const pushQueue = (queue) =>
  postSelfRequest({
    url: 'pushQueue',
    body: {
      queue,
      token: getFromStorage(TOKEN_STORAGE_KEY),
      apiKey: API_KEY,
    },
  });
