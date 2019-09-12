import React, { useEffect } from 'react'
import {connect} from 'react-redux'
import {logoutRequest, currentUserRequest} from "../actions/user"
import UserBar from "../components/UserBar"
import {getToken, getUser} from "../selectors/user";

const userBarContainer = React.memo(({ user, logoutRequest, currentUserRequest }) => {
    const { id, token } = user
    useEffect(() => {
        token && !id && currentUserRequest()
    }, [token])

    return <UserBar user={user} logoutRequest={logoutRequest} />
})

const mapStateToProps = (state) => ({
    user: getUser(state)
})

const mapDispatchToProps = {
    logoutRequest,
    currentUserRequest
}


export default connect(mapStateToProps, mapDispatchToProps)(userBarContainer);