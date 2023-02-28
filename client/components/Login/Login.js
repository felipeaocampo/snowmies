import React from 'react';

import Logo from '../UX/Logo';
import SignInForm from './SignInForm';

import './Login.css';

const Login = ({ showPic }) => {
  return (
    <section className="login">
      {showPic ? <Logo styles={`logo logo-login`} /> : <SignInForm />}
      {/* <SignInForm /> */}
    </section>
  );
};

export default Login;
