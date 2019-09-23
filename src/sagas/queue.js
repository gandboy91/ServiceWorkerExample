import { takeLatest, select, put, call } from 'redux-saga/effects'
import { selectQueue } from '../selectors/queue'
import { PUSH_QUEUE, pushQueueSuccess } from '../actions/queue';
import { pushQueue } from '../requests/queue';
import { fetchCardsRequest } from '../actions/cards';

function* pushQueueWorker() {
  const queue = yield select(selectQueue)
  try {
    yield call(pushQueue, queue)
    yield put(pushQueueSuccess())
    yield put(fetchCardsRequest())
  } catch (error) {
    console.warn('error while pushing queue: ',  error)
  }
}

function* queueWatcher() {
  yield takeLatest(PUSH_QUEUE, pushQueueWorker)
}

export default queueWatcher
