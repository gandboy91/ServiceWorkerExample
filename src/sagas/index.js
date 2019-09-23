import { all, call } from 'redux-saga/effects'
import userWatcher from "./user"
import cardsWatcher from "./cards"
import queueWatcher from "./queue"
import connectionWatcher from "./connection"

export default function* rootSaga() {
    yield all([
        call(userWatcher),
        call(cardsWatcher),
        call(connectionWatcher),
        call(queueWatcher)
    ])
}