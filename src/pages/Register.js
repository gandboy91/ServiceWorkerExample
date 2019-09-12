import React from 'react'
import { connect } from 'react-redux'
import RegisterFormContainer from '../containers/RegisterFormContainer'
import { Redirect } from 'react-router-dom'

const RegisterPage = React.memo(({ token }) => {
    if (token) {
        return <Redirect to='/' />
    }

    return <RegisterFormContainer />
})

const mapStateToProps = ({ user: { token } }) => ({
    token
})

export default connect(mapStateToProps)(RegisterPage)