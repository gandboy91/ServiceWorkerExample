import { take, put, call } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import { setConnectionStatus } from '../actions/connection';
import { STATUS_OFFLINE, STATUS_ONLINE } from '../constants/connection';

function connectionEventsChannel() {
  return eventChannel(emit => {
        const emitter = (event) => emit({
          status: navigator.onLine ? STATUS_ONLINE : STATUS_OFFLINE
        })

        window.addEventListener('online', emitter, false)
        window.addEventListener('offline', emitter, false)
        // The subscriber must return an unsubscribe function
        return () => {
          window.removeEventListener('online', emitter, false)
          window.removeEventListener('offline', emitter, false)
        }
      }
  )
}

function* connectionWatcher() {
  const channel = yield call(connectionEventsChannel)
  try {
    while (true) {
      const { status } = yield take(channel)
      yield put(setConnectionStatus(status))
    }
  } catch (error) {
    console.log('chanel error: ', error)
  }
}

export default connectionWatcher