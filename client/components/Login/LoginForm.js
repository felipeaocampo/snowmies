import React, { useCallback, useEffect, useState } from 'react';

import './LoginForm.css';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [logingIn, setLogingIn] = useState(false);

  const fetchData = useCallback(async (path) => {
    const response = await fetch(`/api/users/maxmiller`);
    const data = await response.json();
    console.log(data);
    setLogingIn(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [logingIn]);

  const usernameChangeHandler = (e) => {
    setUsername(e.target.value);
  };
  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  const submitLoginFormHandler = (e) => {
    e.preventDefault();

    fetchData(`/api/users/maxmiller`);

    setLogingIn(true);
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
