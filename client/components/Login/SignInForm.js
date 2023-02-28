import React from 'react';

import './SignInForm.css';

const SignInForm = () => {
  return (
    <>
      <h2 className="sign-in-form__header1">Welcome to Snowmies</h2>
      <h3 className="sign-in-form__header2">sign in below...</h3>
      <form className="sign-in-form" action="/users" method="POST">
        <div className="form-item-container">
          <label htmlFor="username" className="username-label">
            Username:
          </label>
          <input type="text" className="username-input" />
        </div>
        <div className="form-item-container">
          <label htmlFor="password" className="password-label">
            Password:
          </label>
          <input type="password" className="password-input" />
        </div>
      </form>
    </>
  );
};

export default SignInForm;
