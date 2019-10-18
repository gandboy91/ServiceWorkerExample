import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { SimpleInput } from './forms/inputs';
import useAuthorizationForm from '../hooks/useAuthorizationForm';
import '../styles/user.css';
import { AUTH_ERROR_KEY } from '../constants/validation';
import Spinner from './common/Spinner';

const LoginForm = React.memo(
  ({ errors, loginRequest, isProcessing = false }) => {
    const {
      email,
      password,
      changeEmailHandler,
      changePasswordHandler,
    } = useAuthorizationForm();
    const handleLoginRequest = useCallback(
      () => loginRequest(email, password),
      [email, password]
    );

    return (
      <div className="card loginForm shadow text-center">
        <div className="card-header bg-warning">
          <h4 className="mb-0">Log in to Cards app</h4>
        </div>
        {isProcessing ? (
          <Spinner />
        ) : (
          <div className="card-body">
            {errors.includes(AUTH_ERROR_KEY) && (
              <div className="alert alert-warning" role="alert">
                User not found. Check your auth data
              </div>
            )}
            <SimpleInput
              value={email}
              placeholder="email"
              onChange={changeEmailHandler}
              className={`mb-2 ${errors.includes('email') ? 'is-invalid' : ''}`}
            />
            <SimpleInput
              value={password}
              type="password"
              placeholder="password"
              onChange={changePasswordHandler}
              className={`mb-2 ${
                errors.includes('password') ? 'is-invalid' : ''
              }`}
            />
            <button
              className="btn btn-secondary btn-block"
              onClick={handleLoginRequest}
            >
              Log in
            </button>
            <Link className="btn btn-secondary btn-block" to="/register">
              Click to Register
            </Link>
          </div>
        )}
      </div>
    );
  }
);

export default LoginForm;
