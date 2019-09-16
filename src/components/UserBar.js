import React, { useCallback, useEffect } from 'react';
import {
    ConnectionStatusButton,
    LoginRedirectButton,
    LogoutButton,
} from './forms/buttons';
import { STATUS_ONLINE } from '../constants/connection';

const UserBar = React.memo(({ user: { name, id }, connectionStatus, logoutRequest }) => {
    const handleLogout = useCallback(() => logoutRequest(), []);
    const buttonProps = {
        style: { color: 'white' },
        size: '2x',
    };

    return (
        <nav className="navbar navbar-dark bg-dark fixed-top px-4">
            <div className="navbar-item">
                {id ? (
                    <LogoutButton handleLogout={handleLogout} {...buttonProps} />
                ) : (
                    <LoginRedirectButton loginUrl="/login" {...buttonProps} />
                )}
                <span className="text-light">{id ? `you logged in as ${name}` : `you haven't logged in`}</span>
            </div>
            <div className="navbar-brand">
                <ConnectionStatusButton isOnline={connectionStatus === STATUS_ONLINE} />
            </div>
        </nav>
    );
});

export default UserBar;
