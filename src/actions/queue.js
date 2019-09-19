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

export const ENQUEUE_ADD = 'ENQUEUE_ADD'
export const enqueueAddCard = ({ key, url, method, body }) => ({
  type: ENQUEUE_ADD,
  key: key,
  payload: {
    url,
    method,
    body,
  }
})