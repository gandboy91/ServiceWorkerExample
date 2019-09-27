import React, { useCallback, useEffect } from 'react';
import {
  ConnectionStatusButton,
  HomeButton,
  LoginRedirectButton,
  LogoutButton,
  SyncButton,
} from './forms/buttons';
import { STATUS_ONLINE } from '../constants/connection';

const UserBar = React.memo(({ user: { name, id }, connectionStatus, logoutRequest, pushQueueRequest }) => {
    const handleLogout = useCallback(() => logoutRequest(), []);
    const handleSync = useCallback(() => pushQueueRequest(), []);
    const buttonProps = {
        style: { color: 'white' },
        size: '2x',
    };

    return (
        <nav className="navbar navbar-dark bg-dark fixed-top px-4">
            <div className="navbar-item">
                {id && <HomeButton />}
                {id ? (
                    <LogoutButton handleLogout={handleLogout} {...buttonProps} />
                ) : (
                    <LoginRedirectButton loginUrl="/login" {...buttonProps} />
                )}
                <span className="text-light">{id ? `${name}` : `log in please`}</span>
            </div>
            <div className="navbar-brand">
                <SyncButton onClick={handleSync} />
                <ConnectionStatusButton isOnline={connectionStatus === STATUS_ONLINE} />
            </div>
        </nav>
    );
});

export default UserBar;
