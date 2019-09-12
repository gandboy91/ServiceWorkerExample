import React, { useState, useCallback } from 'react'

export default function useAuthorizationFrom() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return {
        name,
        email,
        password,
        changeNameHandler: useCallback(({ target: { value } }) => setName(value), []),
        changeEmailHandler: useCallback(({ target: { value } }) => setEmail(value), []),
        changePasswordHandler: useCallback(({ target: { value } }) => setPassword(value),[])
    }
}