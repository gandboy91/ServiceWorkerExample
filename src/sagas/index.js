import { all, call } from 'redux-saga/effects'
import userWatcher from "./user"
import cardsWatcher from "./cards"

export default function* rootSaga() {
    yield all([
        call(userWatcher),
        call(cardsWatcher)
    ])
}