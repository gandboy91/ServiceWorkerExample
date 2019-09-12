import React, { useCallback } from 'react'
import {SimpleInput} from "./forms/inputs"
import useAuthorizationForm from "../hooks/useAuthorizationForm"
import "../styles/user.css"
import {AUTH_ERROR_KEY} from "../constants/validation";
import Spinner from "./common/Spinner";

const RegisterForm = React.memo(({ errors, registerRequest, isProcessing = false }) => {
    const { name, email, password, changeEmailHandler, changePasswordHandler, changeNameHandler } = useAuthorizationForm()
    const handleRegisterRequest = useCallback(
        () => registerRequest({ email, password, name }), [email, password, name]
    )

    return <div className='card loginForm shadow text-center'>
            <div className='card-header bg-warning'>
                <h4 className='mb-0'>Register to Cards app</h4>
            </div>
            {
                isProcessing
                    ? <Spinner/>
                    : <div className='card-body'>
                        {
                            errors.includes(AUTH_ERROR_KEY)
                            && <div className="alert alert-warning" role="alert">
                                User not found. Check your auth data
                            </div>
                        }
                        <SimpleInput value={name}
                                     placeholder={'name'}
                                     onChange={changeNameHandler}
                                     className={`mb-2 ${errors.includes('name') ? 'is-invalid' : ''}`}
                        />
                        <SimpleInput value={email}
                                     placeholder={'email'}
                                     onChange={changeEmailHandler}
                                     className={`mb-2 ${errors.includes('email') ? 'is-invalid' : ''}`}
                        />
                        <SimpleInput value={password}
                                     type='password'
                                     placeholder={'password'}
                                     onChange={changePasswordHandler}
                                     className={`mb-2 ${errors.includes('password') ? 'is-invalid' : ''}`}
                        />
                        <button className='btn btn-secondary btn-block' onClick={handleRegisterRequest}>
                            Register
                        </button>
                    </div>
            }
        </div>
})

export default RegisterForm