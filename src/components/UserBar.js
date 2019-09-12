import React, { useCallback, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt, faSignInAlt } from '@fortawesome/free-solid-svg-icons'
import Spinner from "./common/Spinner";
import {LoginRedirectButton, LogoutButton} from "./forms/buttons";

const UserBar = React.memo(({ user: {name, id}, logoutRequest }) => {
    const handleLogout = useCallback(() => logoutRequest(), [])
    const buttonProps = {
        style: { color: 'white' },
        size: '2x'
    }

    return <nav className="navbar navbar-dark bg-dark fixed-top">
        <div className="navbar-header">
            {
                id
                    ? <LogoutButton handleLogout={handleLogout} {...buttonProps} />
                    : <LoginRedirectButton loginUrl='/login' {...buttonProps} />
            }
            <div className="navbar-brand">
                {
                    id
                        ? `you logged in as ${name}`
                        : `you haven't logged in`
                }
            </div>
        </div>
    </nav>
})

export default UserBar