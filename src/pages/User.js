import React, { useEffect } from 'react'
import {connect} from 'react-redux'
import Title from "../components/common/Title"
import { Redirect } from 'react-router-dom'
import {ADMIN_ACCESS_LEVEL} from "../constants/access";

const UserPage = ({ match: { params: {id} }}) => {
    //<UserContainer id={id} />
}

export default UserPage;