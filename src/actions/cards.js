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

export const CHANGE_CARD = 'CHANGE_CARD'
export const changeCard = (id, card) => ({
    type: CHANGE_CARD,
    payload: {
        id,
        card
    }
})

export const REMOVE_CARD = 'REMOVE_CARD'
export const removeCard = id => ({
    type: REMOVE_CARD,
    payload: id
})
