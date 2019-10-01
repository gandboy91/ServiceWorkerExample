import uniqueId from 'lodash/uniqueId';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { startFetching, stopFetching } from '../actions';
import {
  ADD_CARD_REQUEST,
  CHANGE_CARD_REQUEST,
  addCardOffline,
  addCardOnline,
  changeCardOnline,
  changeCardOffline,
  FETCH_CARDS_REQUEST,
  fetchCardsSuccess,
  LIKE_CARD_REQUEST,
  likeCardsSuccess,
  REMOVE_CARD_REQUEST,
  removeCardOffline,
  removeCardOnline,
} from '../actions/cards';
import {
  getCards,
  like,
  removeCard,
  saveCard,
  changeCard,
} from '../requests/cards';
import { getPreparedCard, getPreparedCards } from '../helpers/cards';
import { selectIsOnline } from '../selectors/connection';
import { addToQueue, removeFromQueue } from '../actions/queue';
import { SAVE_CARD_URL } from '../constants/urls';
import { getCard } from '../selectors/cards';
import { getCardUrl } from '../helpers/urls';
import { ADD_CARD_ID_REGEXP } from '../constants/cards';

function* cardsFetchWorker() {
  try {
    yield put(startFetching);
    const { posts: cards } = yield call(getCards);
    yield put(fetchCardsSuccess(getPreparedCards(cards)));
  } catch (error) {
    console.warn(error.message || error);
  } finally {
    yield put(stopFetching);
  }
}

function* deleteCardWorker({ payload: id }) {
  try {
    const isOnline = yield select(selectIsOnline);
    yield call(isOnline ? deleteCardOnline : deleteCardOffline, id);
  } catch (error) {
    console.warn(error.message || error);
  }
}

function* likeCardWorker({ payload: likedId }) {
  try {
    const {
      post: { id, total_likes: likes },
    } = yield call(like, likedId);
    yield put(likeCardsSuccess(id, likes));
  } catch (error) {
    console.warn(error.message || error);
  }
}

function* editCardOnline({ id, ...card }) {
  const { post } = yield call(changeCard, { id, card });
  yield put(changeCardOnline({ card: getPreparedCard(post) }));
}

function* editCardOffline({ id, ...card }) {
  const isAddingRequest = ADD_CARD_ID_REGEXP.test(id);
  yield put(changeCardOffline({ card: getPreparedCard({ ...card, id }) }));
  yield put(
    addToQueue({
      key: isAddingRequest ? id : `edit_${id}`,
      url: isAddingRequest ? SAVE_CARD_URL : getCardUrl(id),
      method: isAddingRequest ? 'POST' : 'PUT',
      body: card,
    })
  );
}

function* saveCardOnline(card) {
  const { post } = yield call(saveCard, card);
  yield put(addCardOnline({ card: getPreparedCard(post) }));
}

function* saveCardOffline(card) {
  const id = uniqueId('add_');
  yield put(addCardOffline({ card: getPreparedCard({ ...card, id }) }));
  yield put(
    addToQueue({
      key: id,
      url: SAVE_CARD_URL,
      method: 'POST',
      body: card,
    })
  );
}

function* deleteCardOnline(id) {
  yield call(removeCard, id);
  yield put(removeCardOnline({ id }));
}

function* deleteCardOffline(id) {
  const card = yield select(getCard, { cardId: id });
  if (card) {
    yield put(removeCardOnline({ id }));
    return yield put(
      addToQueue({
        key: `remove_${id}`,
        url: getCardUrl(id),
        method: 'DELETE',
        body: null,
      })
    );
  }
  yield put(removeCardOffline({ id }));
  yield put(removeFromQueue({ key: id }));
}

function* saveCardWorker({ payload, onSuccess }) {
  try {
    const isOnline = yield select(selectIsOnline);
    yield call(isOnline ? saveCardOnline : saveCardOffline, payload);
    yield call(onSuccess, true);
  } catch (error) {
    console.warn(error.message || error);
  }
}

function* changeCardWorker({ payload, onSuccess }) {
  try {
    const isOnline = yield select(selectIsOnline);
    yield call(isOnline ? editCardOnline : editCardOffline, payload);
    yield call(onSuccess, true);
  } catch (error) {
    console.warn(error.message || error);
  }
}

function* cardsWatcher() {
  yield all([
    takeLatest(FETCH_CARDS_REQUEST, cardsFetchWorker),
    takeLatest(LIKE_CARD_REQUEST, likeCardWorker),
    takeLatest(ADD_CARD_REQUEST, saveCardWorker),
    takeLatest(CHANGE_CARD_REQUEST, changeCardWorker),
    takeLatest(REMOVE_CARD_REQUEST, deleteCardWorker),
  ]);
}

export default cardsWatcher;
