import { uniqueId } from 'lodash/uniqueId';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { startFetching, stopFetching } from '../actions';
import {
    ADD_CARD_REQUEST,
    addCardOffline,
    addCardOnline,
    FETCH_CARDS_REQUEST,
    fetchCardsSuccess,
    LIKE_CARD_REQUEST,
    likeCardsSuccess,
} from '../actions/cards';
import { getCards, like, saveCard } from '../requests/cards';
import { getPreparedCard, getPreparedCards } from '../helpers/cards';
import {
    selectConnectionStatus,
    selectIsOnline,
} from '../selectors/connection';
import { STATUS_ONLINE } from '../constants/connection';
import { enqueueAddCard } from '../actions/queue';
import { SAVE_CARD_URL } from '../constants/urls';

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

function* saveCardOnline(card) {
    const { post } = yield call(saveCard, card);
    yield put(addCardOnline({ card: getPreparedCard(post) }));
}

function* saveCardOffline(card) {
    const id = uniqueId('offline_add_');
    yield put(addCardOffline({ card: { ...card, id } }));
    yield put(
        enqueueAddCard({
            key: id,
            url: SAVE_CARD_URL,
            method: 'POST',
            body: card,
        })
    );
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

function* cardsWatcher() {
    yield all([
        takeLatest(FETCH_CARDS_REQUEST, cardsFetchWorker),
        takeLatest(LIKE_CARD_REQUEST, likeCardWorker),
        takeLatest(ADD_CARD_REQUEST, saveCardWorker),
    ]);
}

export default cardsWatcher;
