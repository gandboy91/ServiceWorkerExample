import React from 'react'
import { connect } from 'react-redux'
import LoginFormContainer from '../containers/LoginFormContainer'
import { Redirect } from 'react-router-dom'

const LoginPage = React.memo(({ token }) => {
    if (token) {
        return <Redirect to='/' />
    }

    return <LoginFormContainer />
})

const mapStateToProps = ({ user: { token } }) => ({
    token
})

export default connect(mapStateToProps)(LoginPage)