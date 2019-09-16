import React, { useEffect } from 'react'
import {connect} from 'react-redux'
import {logoutRequest, currentUserRequest} from "../actions/user"
import UserBar from "../components/UserBar"
import {getToken, getUser} from "../selectors/user";
import { selectConnectionStatus } from '../selectors/connection';

const userBarContainer = React.memo(({ user, connectionStatus, logoutRequest, currentUserRequest }) => {
    const { id, token } = user
    useEffect(() => {
        token && !id && currentUserRequest()
    }, [token])

    return <UserBar user={user} logoutRequest={logoutRequest} connectionStatus={connectionStatus}/>
})

const mapStateToProps = (state) => ({
    user: getUser(state),
    connectionStatus: selectConnectionStatus(state),
})

const mapDispatchToProps = {
    logoutRequest,
    currentUserRequest
}


export default connect(mapStateToProps, mapDispatchToProps)(userBarContainer);