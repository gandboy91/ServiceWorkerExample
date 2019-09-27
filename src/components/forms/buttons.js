import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faSignInAlt, faSignOutAlt, faHome, faSync} from "@fortawesome/free-solid-svg-icons"
import { Link } from 'react-router-dom'
import React from "react"

export const HomeButton = () => <Link className='btn btn-link text-white mx-2' to="/">
    <FontAwesomeIcon icon={faHome} size="2x" />
</Link>

export const LogoutButton = ({ handleLogout, ...props }) => <button className='btn btn-link' onClick={handleLogout}>
    <FontAwesomeIcon icon={faSignOutAlt} {...props} />
</button>

export const LoginRedirectButton = ({ loginUrl, ...props }) => <Link to={loginUrl} className='btn btn-link' >
    <FontAwesomeIcon icon={faSignInAlt} {...props} />
</Link>

export const ConnectionStatusButton = ({ isOnline }) => isOnline
    ? <div className="btn btn-success">online</div>
    : <div className="btn btn-warning">offline</div>

export const SyncButton = ({ onClick, active, ...props }) =>
    <button className={`btn btn-link mx-2 ${active ? 'text-white' : 'text-secondary'}`} onClick={onClick}>
        <FontAwesomeIcon icon={faSync} size="2x" {...props} />
    </button>