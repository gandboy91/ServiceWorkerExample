export const FETCH_CARDS_REQUEST = 'FETCH_CARDS_REQUEST'
export const fetchCardsRequest = () => ({
    type: FETCH_CARDS_REQUEST,
})

export const FETCH_CARDS_SUCCESS = 'FETCH_CARDS_SUCCESS'
export const fetchCardsSuccess = cards => ({
    type: FETCH_CARDS_SUCCESS,
    payload: cards
})

export const LIKE_CARD_REQUEST = 'LIKE_CARD_REQUEST'
export const likeCardRequest = id => ({
    type: LIKE_CARD_REQUEST,
    payload: id
})

export const LIKE_CARD_SUCCESS = 'LIKE_CARD_SUCCESS'
export const likeCardsSuccess = (id, likes) => ({
    type: LIKE_CARD_SUCCESS,
    payload: {
        id,
        likes
    }
})

export const ADD_CARD_REQUEST = 'ADD_CARD'
export const addCardRequest = ({ card, onSuccess }) => ({
    type: ADD_CARD_REQUEST,
    payload: card,
    onSuccess,
})

export const CHANGE_CARD_REQUEST = 'CHANGE_CARD_REQUEST'
export const changeCardRequest = (id, card) => ({
    type: CHANGE_CARD_REQUEST,
    payload: {
        id,
        card
    }
})

export const REMOVE_CARD_REQUEST = 'REMOVE_CARD_REQUEST'
export const removeCardRequest = id => ({
    type: REMOVE_CARD_REQUEST,
    payload: id
})

export const ADD_CARD_ONLINE = 'ADD_CARD_ONLINE'
export const addCardOnline = ({ card }) => ({
    type: ADD_CARD_ONLINE,
    payload: card,
})

export const ADD_CARD_OFFLINE = 'ADD_CARD_OFFLINE'
export const addCardOffline = ({ card }) => ({
    type: ADD_CARD_OFFLINE,
    payload: card,
})
