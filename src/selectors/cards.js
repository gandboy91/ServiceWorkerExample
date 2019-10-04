import { createSelector } from 'reselect';

const getCards = ({ cards }) => cards.cards;

const getOfflineCards = ({ cards }) => cards.offlineCards;

export const getCard = ({ cards }, { cardId }) =>
  cards.cards[cardId] || cards.offlineCards[cardId] || null;

export const getOnlineCard = ({ cards }, { cardId }) =>
  cards.cards[cardId] || null;

export const getOfflineCard = ({ cards }, { cardId }) =>
  cards.offlineCards[cardId] || null;

export const getCardsIsProcessing = ({ cards }) => cards.isProcessing;

export const getCardsIds = createSelector(
  [getCards],
  (cards) => Object.keys(cards).map((id) => +id)
);

export const getOfflineCardsIds = createSelector(
  [getOfflineCards],
  (offlineCards) => Object.keys(offlineCards) || []
);
