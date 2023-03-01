import React, { useContext } from 'react';

import Logo from '../UX/Logo';
import store from '../../context/store';
import LoginForm from './LoginForm';
import './Login.css';

const Login = ({ showPic }) => {
  const { setSignUpClicked } = useContext(store);

  const signUpClickHandler = (e) => {
    e.preventDefault();
    setSignUpClicked(true);
  };

  return (
    <section className="login">
      <h2 className="login-form__header1">Welcome to Snowmies</h2>
      <h3 className="login-form__header2">
        ...connect with your home mtn homies...
      </h3>
      <LoginForm />
      <div className="create-acc">
        <p className="create-acc__text">
          not registered? &rarr; Click
          <a
            href="/signup"
            className="create-acc-link"
            onClick={signUpClickHandler}
          >
            HERE
          </a>
          to create an account and learn more about Snowmies
        </p>
      </div>
    </section>
  );
};

export default Login;
