import {createSelector} from "reselect"

export const getToken = ({ user: {token} }) => token

export const getUser = ({ user }) => user.user

export const getUserRole = createSelector(
    [ getUser ],
    ({ role }) => role
)