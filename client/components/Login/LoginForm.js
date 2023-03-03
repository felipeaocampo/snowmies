import React, { useCallback, useContext, useState } from 'react';
import store from '../../context/store';

import './LoginForm.css';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState(false);

  const { handleUserDataUpdate } = useContext(store);

  // console.log(isError);

  const fetchData = useCallback(async (username, password) => {
    try {
      const response = await fetch(`/api/users/login`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();

      // console.log(data);
      if (data.status === 400) {
        throw new Error();
      }

      handleUserDataUpdate(data);
    } catch (error) {
      setIsError(true);
    }
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
    if (trimmedUsername === `` || password === ``) return;

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
          className={`username-input ${isError ? `error` : ``}`}
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
          className={`password-input ${isError ? `error` : ``}`}
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
