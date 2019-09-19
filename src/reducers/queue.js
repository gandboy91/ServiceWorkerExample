import { ENQUEUE_EDIT, ADD_TO_QUEUE, REMOVE_FROM_QUEUE } from '../actions/queue';

const initialState = {}

export default function queue(state = initialState, action) {
  const { payload } = action
  switch (action.type) {
    case ENQUEUE_EDIT:
      return {
        ...state,
        [action.key]: action.payload
      }
    case ADD_TO_QUEUE:
      return {
        ...state,
        [action.key]: action.payload
      }
    case REMOVE_FROM_QUEUE:
      const queue = { ...state }
      delete queue[action.key]
      return queue
    default:
      return state
  }
}