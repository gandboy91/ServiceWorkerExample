import {
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  SET_USER,
} from '../actions/user';
import { START_FETCHING, STOP_FETCHING } from '../actions';
import { getFromStorage } from '../helpers/storage';
import { TOKEN_STORAGE_KEY, USER_STORAGE_KEY } from '../constants/storage';

const userDefault = {
  id: null,
  email: '',
  name: '',
  role: '',
};

const initialState = {
  user: {
    ...userDefault,
    ...getFromStorage(USER_STORAGE_KEY),
  },
  token: getFromStorage(TOKEN_STORAGE_KEY),
  errors: [],
  isProcessing: false,
  isIos:
    navigator.userAgent &&
    /iPad|iPhone|iPod/.test(navigator.userAgent) &&
    !window.MSStream,
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case START_FETCHING:
      return {
        ...state,
        isProcessing: true,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        user: userDefault,
        token: '',
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        errors: [],
        token: action.payload,
      };
    case LOGIN_FAILED:
      return {
        ...state,
        errors: action.payload,
        token: '',
      };
    case SET_USER:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        },
      };
    case STOP_FETCHING:
      return {
        ...state,
        isProcessing: false,
      };
    default:
      return state;
  }
}
