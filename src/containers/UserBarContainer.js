import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { logoutRequest, currentUserRequest } from '../actions/user';
import UserBar from '../components/UserBar';
import { getUser } from '../selectors/user';
import { pushQueue } from '../actions/queue';
import { selectIsOnline } from '../selectors/connection';
import { selectQueueSize } from '../selectors/queue';

const userBarContainer = React.memo(
  ({
    user,
    isOnline,
    queueSize,
    logoutRequest: logout,
    pushQueue: pushQueueRequest,
    currentUserRequest: userRequest,
  }) => {
    const { id, token } = user;
    useEffect(() => token && !id && userRequest(), [token]);

    return (
      <UserBar
        user={user}
        isOnline={isOnline}
        queueSize={queueSize}
        pushQueueRequest={pushQueueRequest}
        logoutRequest={logout}
      />
    );
  }
);

const mapStateToProps = (state) => ({
  user: getUser(state),
  queueSize: selectQueueSize(state),
  isOnline: selectIsOnline(state),
});

const mapDispatchToProps = {
  pushQueue,
  logoutRequest,
  currentUserRequest,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(userBarContainer);
