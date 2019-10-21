export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const loginRequest = (email, password) => ({
  type: LOGIN_REQUEST,
  payload: {
    email,
    password,
  },
});

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const loginSuccess = (token) => ({
  type: LOGIN_SUCCESS,
  payload: token,
});

export const LOGIN_FAILED = 'LOGIN_FAILED';
export const loginFailed = (errors) => ({
  type: LOGIN_FAILED,
  payload: errors,
});

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const logoutRequest = () => ({
  type: LOGOUT_REQUEST,
});

export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
});

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const registerRequest = ({ email, password, name, lastName }) => ({
  type: REGISTER_REQUEST,
  payload: {
    email,
    password,
    name,
    lastName,
  },
});

export const CURRENT_USER_REQUEST = 'CURRENT_USER_REQUEST';
export const currentUserRequest = () => ({
  type: CURRENT_USER_REQUEST,
});

export const USER_REQUEST = 'USER_REQUEST';
export const userRequest = (id) => ({
  type: USER_REQUEST,
  payload: id,
});

export const SET_USER = 'SET_USER';
export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

export const CHANGE_EMAIL = 'CHANGE_EMAIL';
export const changeEmail = (email) => ({
  type: CHANGE_EMAIL,
  payload: email,
});

export const CHANGE_PASSWORD = 'CHANGE_PASSWORD';
export const changePassword = (password) => ({
  type: CHANGE_PASSWORD,
  payload: password,
});
