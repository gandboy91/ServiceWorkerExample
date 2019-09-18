import { ENQUEUE_EDIT, ENQUEUE_ADD } from '../actions/queue';

const initialState = {}

export default function queue(state = initialState, action) {
  const { payload } = action
  switch (action.type) {
    case ENQUEUE_EDIT:
      return {
        ...state,
        [action.key]: action.payload
      }
    case ENQUEUE_ADD:
      return {
        ...state,
        [action.key]: action.payload
      }
    default:
      return state
  }
}