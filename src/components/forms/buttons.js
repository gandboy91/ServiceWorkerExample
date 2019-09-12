import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faSignInAlt, faSignOutAlt} from "@fortawesome/free-solid-svg-icons"
import { Link } from 'react-router-dom'
import React from "react"

export const LogoutButton = ({ handleLogout, ...props }) => <button className='btn btn-link' onClick={handleLogout}>
    <FontAwesomeIcon icon={faSignOutAlt} {...props} />
</button>

export const LoginRedirectButton = ({ loginUrl, ...props }) => <Link to={loginUrl} className='btn btn-link' >
    <FontAwesomeIcon icon={faSignInAlt} {...props} />
</Link>