export const ADD_TO_QUEUE = 'ADD_TO_QUEUE'
export const addToQueue = ({ key, url, method, body }) => ({
  type: ADD_TO_QUEUE,
  key: key,
  payload: {
    url,
    method,
    body,
  }
})

export const REMOVE_FROM_QUEUE = 'REMOVE_FROM_QUEUE'
export const removeFromQueue = ({ key }) => ({
  type: REMOVE_FROM_QUEUE,
  key: key,
})

export const PUSH_QUEUE = 'PUSH_QUEUE'
export const pushQueue = () => ({
  type: PUSH_QUEUE,
})

export const PUSH_QUEUE_SUCCESS = 'PUSH_QUEUE_SUCCESS'
export const pushQueueSuccess = () => ({
  type: PUSH_QUEUE_SUCCESS,
})