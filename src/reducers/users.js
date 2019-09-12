// import {
//     LOGIN_FAILED,
//     LOGIN_REQUEST,
//     LOGIN_SUCCESS,
//     LOGOUT_SUCCESS,
//     SET_USER
// } from "../actions/user"
// import {STOP_FETCHING} from "../actions";
// import {getFromStorage} from "../helpers/storage";
// import {TOKEN_STORAGE_KEY} from "../constants/storage";
//
// const userDefault = {
//     id: null,
//     email: '',
//     name: '',
//     role: '',
// }
//
// const initialState = {
//     ...userDefault,
//     token: getFromStorage(TOKEN_STORAGE_KEY) || '',
//     errors: [],
//     isProcessing: false,
// }
//
// export default function user(state = initialState, action) {
//     switch (action.type) {
//         case LOGIN_REQUEST:
//             return {
//                 ...state,
//                 isProcessing: true
//             }
//         case LOGOUT_SUCCESS:
//             return {
//                 ...state,
//                 ...userDefault,
//                 token: ''
//             }
//         case LOGIN_SUCCESS:
//             return {
//                 ...state,
//                 errors: [],
//                 token: action.payload
//             }
//         case LOGIN_FAILED:
//             return {
//                 ...state,
//                 errors: action.payload,
//                 token: ''
//             }
//         case SET_USER:
//             return {
//                 ...state,
//                 ...action.payload
//             }
//         case STOP_FETCHING:
//             return {
//                 ...state,
//                 isProcessing: false
//             }
//         default:
//             return state
//     }
// }