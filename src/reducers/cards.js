import { START_FETCHING, STOP_FETCHING } from '../actions';
import {
  CHANGE_CARD_ONLINE,
  CHANGE_CARD_OFFLINE,
  REMOVE_CARD_ONLINE,
  FETCH_CARDS_SUCCESS,
  LIKE_CARD_SUCCESS,
  ADD_CARD_ONLINE,
  ADD_CARD_OFFLINE,
  REMOVE_CARD_OFFLINE,
} from '../actions/cards';
import { PUSH_QUEUE_SUCCESS } from '../actions/queue';

const initialState = {
  cards: {},
  offlineCards: {},
  isProcessing: false,
};

export default function cards(state = initialState, action) {
  const { payload } = action;
  switch (action.type) {
    case START_FETCHING:
      return {
        ...state,
        isProcessing: true,
      };
    case FETCH_CARDS_SUCCESS:
      return {
        ...state,
        cards: payload,
      };
    case LIKE_CARD_SUCCESS:
      const cardToLike = state.cards[payload.id];
      return {
        ...state,
        cards: {
          ...state.cards,
          [payload.id]: {
            ...cardToLike,
            likes: payload.likes,
          },
        },
      };
    case STOP_FETCHING:
      return {
        ...state,
        isProcessing: false,
      };
    case REMOVE_CARD_ONLINE:
      const cards = { ...state.cards };
      delete cards[payload.id];
      return {
        ...state,
        cards,
      };
    case REMOVE_CARD_OFFLINE:
      const offlineCards = { ...state.offlineCards };
      delete offlineCards[payload.id];
      return {
        ...state,
        offlineCards,
      };
    case CHANGE_CARD_ONLINE:
    case ADD_CARD_ONLINE:
      return {
        ...state,
        cards: {
          ...state.cards,
          [payload.id]: payload,
        },
      };
    case ADD_CARD_OFFLINE:
    case CHANGE_CARD_OFFLINE:
      return {
        ...state,
        offlineCards: {
          ...state.offlineCards,
          [action.payload.id]: action.payload,
        },
      };
    case PUSH_QUEUE_SUCCESS:
      return {
        ...state,
        offlineCards: {},
      };
    default:
      return state;
  }
}
