import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { logoutRequest, currentUserRequest } from "../actions/user"
import UserBar from "../components/UserBar"
import { getUser } from "../selectors/user";
import { pushQueue } from '../actions/queue';
import { selectConnectionStatus } from '../selectors/connection';

const userBarContainer = React.memo(({ user, connectionStatus, logoutRequest, pushQueue, currentUserRequest }) => {
    const { id, token } = user
    useEffect(() => {
        token && !id && currentUserRequest()
    }, [token])

    return <UserBar
        user={user}
        pushQueueRequest={pushQueue}
        logoutRequest={logoutRequest}
        connectionStatus={connectionStatus}
    />
})

const mapStateToProps = (state) => ({
    user: getUser(state),
    connectionStatus: selectConnectionStatus(state),
})

const mapDispatchToProps = {
    pushQueue,
    logoutRequest,
    currentUserRequest
}


export default connect(mapStateToProps, mapDispatchToProps)(userBarContainer);