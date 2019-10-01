import { SET_CONNECTION_STATUS } from '../actions/connection';
import { STATUS_OFFLINE, STATUS_ONLINE } from '../constants/connection';

const initialState = {
  status: navigator.onLine ? STATUS_ONLINE : STATUS_OFFLINE,
};

export default function connection(state = initialState, action) {
  switch (action.type) {
    case SET_CONNECTION_STATUS:
      return {
        ...state,
        status: action.payload,
      };
    default:
      return state;
  }
}
