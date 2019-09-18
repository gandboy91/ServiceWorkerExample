import { uniqueId } from 'lodash/utils'

export const ENQUEUE_EDIT = 'ENQUEUE_EDIT'
export const enqueueEditRequest = ({ url, method, body }) => ({
  type: ENQUEUE_EDIT,
  key: url,
  payload: {
    url,
    method,
    body,
  }
})

export const ENQUEUE_ADD = 'ENQUEUE_ADD'
export const enqueueAddRequest = ({ url, method, body }) => ({
  type: ENQUEUE_ADD,
  key: uniqueId('add_'),
  payload: {
    url,
    method,
    body,
  }
})