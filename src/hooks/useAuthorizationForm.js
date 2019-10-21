import React, { useState, useCallback } from 'react';

export default function useAuthorizationFrom() {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return {
    name,
    email,
    lastName,
    password,
    changeNameHandler: useCallback(
      ({ target: { value } }) => setName(value),
      []
    ),
    changeLastNameHandler: useCallback(
      ({ target: { value } }) => setLastName(value),
      []
    ),
    changeEmailHandler: useCallback(
      ({ target: { value } }) => setEmail(value),
      []
    ),
    changePasswordHandler: useCallback(
      ({ target: { value } }) => setPassword(value),
      []
    ),
  };
}
