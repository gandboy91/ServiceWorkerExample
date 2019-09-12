import React from 'react'
import {connect} from 'react-redux'
import { registerRequest } from "../actions/user";
import RegisterForm from "../components/RegisterForm"

const mapStateToProps = ({ user: { errors, isProcessing } }) => ({
    errors,
    isProcessing
});

const mapDispatchToProps = {
    registerRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm)