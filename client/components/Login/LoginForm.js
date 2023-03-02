import React, { useCallback, useContext, useState } from 'react';
import store from '../../context/store';

import './LoginForm.css';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // const [logingIn, setLogingIn] = useState(false);
  const { handleUserDataUpdate } = useContext(store);

  const fetchData = useCallback(async (username, password) => {
    const response = await fetch(`/api/users/login`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();

    handleUserDataUpdate(data);
  }, []);

  const usernameChangeHandler = (e) => {
    setUsername(e.target.value);
  };
  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  const submitLoginFormHandler = (e) => {
    e.preventDefault();

    const trimmedUsername = username.trim();
    if (trimmedUsername === ``) return;

    fetchData(trimmedUsername, password);
  };

  return (
    <form
      className="login-form"
      action="/users"
      method="POST"
      onSubmit={submitLoginFormHandler}
    >
      <div className="form-item-container">
        <label htmlFor="username" className="username-label">
          Username:
        </label>
        <input
          type="text"
          className="username-input"
          name="username"
          onChange={usernameChangeHandler}
        />
      </div>
      <div className="form-item-container">
        <label htmlFor="password" className="password-label">
          Password:
        </label>
        <input
          type="password"
          className="password-input"
          name="password"
          onChange={passwordChangeHandler}
        />
      </div>
      <button type="submit" className="login-form__submit-btn">
        Log in
      </button>
    </form>
  );
};

export default LoginForm;
