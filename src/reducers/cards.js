import {START_FETCHING, STOP_FETCHING} from "../actions";
import {CHANGE_CARD, REMOVE_CARD, FETCH_CARDS_REQUEST, FETCH_CARDS_SUCCESS, LIKE_CARD_SUCCESS} from "../actions/cards";
import {CURRENT_USER_REQUEST} from "../actions/user";

const initialState = {
    cards: {},
    isProcessing: false,
}

export default function cards(state = initialState, action) {
    const { payload } = action
    switch (action.type) {
        case START_FETCHING:
            return {
                ...state,
                isProcessing: true
            }
        case FETCH_CARDS_SUCCESS:
            return {
                ...state,
                cards: payload
            }
        case LIKE_CARD_SUCCESS:
            const cardToLike = state.cards[payload.id]
            return {
                ...state,
                cards: {
                    ...state.cards,
                    [payload.id]: {
                        ...cardToLike,
                        likes: payload.likes
                    }
                }
            }
        case STOP_FETCHING:
            return {
                ...state,
                isProcessing: false
            }
        case CHANGE_CARD:
            return {
                ...state,
                cards: {
                    ...state.cards,
                    [payload.id]: payload.card
                }
            }
        case REMOVE_CARD:
            const cards = {...state.cards}
            delete cards[payload.id]
            return {
                ...state,
                cards
            }
        default:
            return state
    }
}