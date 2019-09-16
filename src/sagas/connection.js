import { take, put, call } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'

function connectionEventsChannel() {
  return eventChannel(emit => {
        const emitter = (event) => emit({
          status: navigator.onLine ? 'online' : 'offline'
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
  const channel = yield call(connectionEventsChannel, value)
  try {
    while (true) {
      const { status } = yield take(channel)
      console.log(`status: ${status}`)
    }
  } catch (error) {
    console.log('chanel error: ', error)
  }
}

export default connectionWatcher