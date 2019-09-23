import { take, select, put, call } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import { setConnectionStatus } from '../actions/connection'
import { STATUS_OFFLINE, STATUS_ONLINE } from '../constants/connection'
import { callWorker } from '../helpers/postMessage'
import { selectQueue } from '../selectors/queue'
import { getFromStorage } from '../helpers/storage'
import { TOKEN_STORAGE_KEY } from '../constants/storage'
import { getIsIos } from '../selectors/user'
import { openModal } from '../actions/modal'

function connectionEventsChannel() {
  return eventChannel((emit) => {
    const emitter = (event) =>
        emit({
          status: navigator.onLine ? STATUS_ONLINE : STATUS_OFFLINE,
        })

    window.addEventListener('online', emitter, false)
    window.addEventListener('offline', emitter, false)
    // The subscriber must return an unsubscribe function
    return () => {
      window.removeEventListener('online', emitter, false)
      window.removeEventListener('offline', emitter, false)
    }
  })
}

function* commonCallWorker(status) {
  const queue = yield select(selectQueue)
  const token = getFromStorage(TOKEN_STORAGE_KEY)
  yield call(callWorker, {
    type: status,
    payload: status === STATUS_ONLINE ? { queue, token } : {},
  })
}

function* iosCallWorker(status) {
  const queue = yield select(selectQueue)
  const queueLength = queue.length
  const text = `you have ${queueLength || 'no'} changes made in offline. ${queueLength ? 'Synchronize ?' : 'Continue ?' }`

  if (status === STATUS_ONLINE) {
    yield put(
        openModal({
          text,
          acceptTitle: 'yes, please',
          declineTitle: 'f*ck',
        })
    )
  }
}

function* connectionWatcher() {
  const channel = yield call(connectionEventsChannel)
  try {
    while (true) {
      const { status } = yield take(channel)
      const isIos = yield select(getIsIos)
      yield call(isIos ? iosCallWorker : commonCallWorker, status)
      yield put(setConnectionStatus(status))
    }
  } catch (error) {
    console.log('chanel error: ', error)
  }
}

export default connectionWatcher
