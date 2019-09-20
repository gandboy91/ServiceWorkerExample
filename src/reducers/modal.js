import { OPEN_MODAL, CLOSE_MODAL } from '../actions/modal';

const initialState = {
  open: false,
  text: '',
  acceptTitle: '',
  declineTitle: '',
  onAccept: null,
  onDecline: null,
}

export default function modal(state = initialState, action) {
  switch (action.type) {
    case OPEN_MODAL:
      return {
        ...state,
        ...action.payload,
        open: true,
      }
    case CLOSE_MODAL:
      return initialState
    default:
      return state
  }
}