import React, { useState, useCallback, useContext, useEffect } from 'react';
import store from '../../context/store';

const SignUpForm = () => {
  const [username, setUsername] = useState(``);
  const [email, setEmail] = useState(``);
  const [password, setPassword] = useState(``);
  const [confirmPassword, setConfirmPassword] = useState(``);
  const [homeMountain, setHomeMountain] = useState('');
  const [timeoutId, setTimeoutId] = useState(null);

  const { handleUserDataUpdate, setSignUpClicked } = useContext(store);

  const postData = useCallback(async (userInfo) => {
    const response = await fetch(`/api/users/signup`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    });
    const data = await response.json();

    // console.log(data);

    handleUserDataUpdate(data);
    setTimeout(() => {
      const id = setSignUpClicked(false);
      setTimeoutId(id);
    }, 500);
  }, []);

  useEffect(() => {
    return () => {
      clearTimeout(timeoutId);
      // console.log(`cleared timeout`);
    };
  }, []);

  const submitFormHandler = (e) => {
    e.preventDefault();

    const trimmedUsername = username.trim();
    const trimmedEmail = email.trim();

    if (trimmedEmail === '' || trimmedUsername === '') return;

    const collectedUserInfo = {
      username: trimmedUsername,
      email: trimmedEmail,
      password,
      confirmPassword,
      homeMountain,
    };

    postData(collectedUserInfo);
  };

  const usernameInputHandler = (e) => {
    setUsername(e.target.value);
  };
  const emailInputHandler = (e) => {
    setEmail(e.target.value);
  };
  const passwordInputHandler = (e) => {
    setPassword(e.target.value);
  };
  const confirmPasswordInputHandler = (e) => {
    setConfirmPassword(e.target.value);
  };
  const homeMountainSelectHandler = (e) => {
    setHomeMountain(e.target.value);
  };

  return (
    <form
      action="/users/signup"
      method="POST"
      id="sign-up"
      onSubmit={submitFormHandler}
    >
      <div className="form-item-container sign-up__form-item">
        <label htmlFor="sign-up-username">Add username:</label>
        <input
          type="text"
          id="sign-up-username"
          name="username"
          required
          onChange={usernameInputHandler}
        />
      </div>
      <div className="form-item-container sign-up__form-item">
        <label htmlFor="sign-up-email">Add email:</label>
        <input
          type="email"
          id="sign-up-email"
          name="email"
          required
          onChange={emailInputHandler}
        />
      </div>
      <div className="form-item-container sign-up__form-item">
        <label htmlFor="sign-up-password">Add password:</label>
        <input
          type="password"
          id="sign-up-password"
          name="password"
          required
          onChange={passwordInputHandler}
        />
      </div>
      <div className="form-item-container sign-up__form-item">
        <label htmlFor="sign-up-confirm-password">Confirm password:</label>
        <input
          type="password"
          id="sign-up-confirm-password"
          name="confirm-password"
          required
          onChange={confirmPasswordInputHandler}
        />
      </div>
      <div className="form-item-container sign-up__form-item select-input">
        <label htmlFor="sign-up__select">Home mountain:</label>
        <select
          name="home-mtn"
          id="sign-up__select"
          required
          onChange={homeMountainSelectHandler}
        >
          <option value="">Select one</option>
          <option value="stevens-pass">Stevens Pass - WA</option>
          <option value="crystal">Crystal - WA</option>
          <option value="whistler">Whistler - CA</option>
          <option value="mt-baker">Mt. Baker - WA</option>
        </select>
      </div>
    </form>
  );
};

export default SignUpForm;
