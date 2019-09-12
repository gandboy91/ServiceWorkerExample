import { all, call, put, select, takeLatest } from 'redux-saga/effects'
import {startFetching, stopFetching} from "../actions"
import {FETCH_CARDS_REQUEST, fetchCardsSuccess, LIKE_CARD_REQUEST, likeCardsSuccess} from "../actions/cards";
import {getCards, like} from "../requests/cards";
import {getPreparedCards} from "../helpers/cards";

function* cardsFetchWorker() {
    try {
        yield put(startFetching)
        const { posts: cards } = yield call(getCards)
        yield put(fetchCardsSuccess(getPreparedCards(cards)))
    } catch (error) {
        console.warn(error.message || error)
    } finally {
        yield put(stopFetching)
    }
}

function* likeCardWorker({ payload: likedId }) {
    try {
        const { post: { id, total_likes: likes } } = yield call(like, likedId)
        yield put(likeCardsSuccess(id, likes))
    } catch (error) {
        console.warn(error.message || error)
    }
}

function* cardsWatcher() {
    yield all([
        takeLatest(FETCH_CARDS_REQUEST, cardsFetchWorker),
        takeLatest(LIKE_CARD_REQUEST, likeCardWorker),
    ])
}

export default cardsWatcher