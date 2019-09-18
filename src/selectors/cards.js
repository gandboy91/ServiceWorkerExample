import { createSelector } from 'reselect'

const getCards = ({ cards }) => cards.cards

export const getCard = ({ cards }, { cardId }) => cards.cards[cardId]

export const getCardsIsProcessing = ({ cards }) => cards.isProcessing

export const getCardsIds = createSelector(
    [ getCards ],
    cards => Object.keys(cards).map( id => +id)
)

export const selectOfflineStats = (state) => {}