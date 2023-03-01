import React from 'react';

import './SignInForm.css';

const SignInForm = () => {
  return (
    <>
      <h2 className="sign-in-form__header1">Welcome to Snowmies</h2>
      <h3 className="sign-in-form__header2">
        ...connect with your home mtn homies...
      </h3>
      <form className="sign-in-form" action="/users" method="POST">
        <div className="form-item-container">
          <label htmlFor="username" className="username-label">
            Username:
          </label>
          <input type="text" className="username-input" name="username" />
        </div>
        <div className="form-item-container">
          <label htmlFor="password" className="password-label">
            Password:
          </label>
          <input type="password" className="password-input" name="password" />
        </div>
      </form>
      <div className="create-acc">
        <p className="create-acc__text">
          not registered? &rarr; Click
          <a href="/signup" className="create-acc-link">
            HERE
          </a>{' '}
          to create an account and learn more about Snowmies
        </p>
      </div>
    </>
  );
};

export default SignInForm;
