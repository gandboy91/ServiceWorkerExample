export const ENQUEUE_EDIT = 'ENQUEUE_EDIT'
export const enqueueEditCard = ({ url, method, body }) => ({
  type: ENQUEUE_EDIT,
  key: url,
  payload: {
    url,
    method,
    body,
  }
})

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