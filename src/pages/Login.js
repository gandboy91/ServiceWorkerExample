import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import LoginFormContainer from '../containers/LoginFormContainer';

const LoginPage = React.memo(({ token }) => {
  if (token) {
    return <Redirect to="/" />;
  }

  return <LoginFormContainer />;
});

const mapStateToProps = ({ user: { token } }) => ({
  token,
});

export default connect(mapStateToProps)(LoginPage);
