import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import {
  CURRENT_USER_REQUEST,
  LOGIN_REQUEST,
  loginFailed,
  loginSuccess,
  LOGOUT_REQUEST,
  logoutSuccess,
  REGISTER_REQUEST,
  setUser,
} from '../actions/user';
import { login, register } from '../requests/authentication';
import { getUserByToken } from '../requests/user';
import { saveToStorage } from '../helpers/storage';
import { TOKEN_STORAGE_KEY, USER_STORAGE_KEY } from '../constants/storage';
import { startFetching, stopFetching } from '../actions';
import { AUTH_ERROR_KEY } from '../constants/validation';
import { getIsIos } from '../selectors/user';
import { requestNotificationsPermission } from '../helpers/notifications';

function* logOutWorker() {
  saveToStorage(TOKEN_STORAGE_KEY, '');
  yield put(logoutSuccess());
}

function* authorizeWorker({ payload: { email, password } }) {
  try {
    const isIos = yield select(getIsIos);
    if (!isIos) {
      yield call(requestNotificationsPermission);
    }
    yield put(startFetching);
    const { token } = yield call(login, { email, password });
    saveToStorage(TOKEN_STORAGE_KEY, token || '');
    yield put(loginSuccess(token));
    yield call(getCurrentUser);
  } catch (error) {
    console.warn(error.message || error);
    yield put(
      loginFailed([
        ...error.invalid,
        ...(error.type === AUTH_ERROR_KEY ? [AUTH_ERROR_KEY] : []),
      ])
    );
  } finally {
    yield put(stopFetching);
  }
}

function* registerWorker({ payload: { name, email, password } }) {
  try {
    yield put(startFetching);
    const {
      token,
      user: { created_at, updated_at, ...user },
    } = yield call(register, { email, password, name });
    saveToStorage(TOKEN_STORAGE_KEY, token || '');
    saveToStorage(USER_STORAGE_KEY, user || {});
    yield put(loginSuccess(token));
    yield put(setUser(user));
  } catch (error) {
    console.warn(error.message || error);
    yield put(loginFailed(error.invalid));
  } finally {
    yield put(stopFetching);
  }
}

function* getCurrentUser() {
  const {
    user: { created_at, updated_at, ...user },
  } = yield call(getUserByToken);
  saveToStorage(USER_STORAGE_KEY, user || {});
  yield put(setUser(user));
}

function* userWatcher() {
  yield all([
    takeLatest(LOGIN_REQUEST, authorizeWorker),
    takeLatest(REGISTER_REQUEST, registerWorker),
    takeLatest(LOGOUT_REQUEST, logOutWorker),
    takeLatest(CURRENT_USER_REQUEST, getCurrentUser),
  ]);
}

export default userWatcher;
