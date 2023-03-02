import React from 'react';

import snowmiesTri from '../../assets/imgs/snowmies-tri-compressed.png';
import './SignUp.css';
import SignUpForm from './SignUpForm';

const SignUp = () => {
  return (
    <section className="sign-up">
      <main className="sign-up__main-container">
        <div className="sign-up__form-container">
          <SignUpForm />
        </div>
        <div className="sign-up__img-container">
          <img className="sign-up__img" src={snowmiesTri} alt="Snowmies logo" />
        </div>
      </main>
      <button className="sign-up__btn" type="submit" form="sign-up">
        Sign Up!
      </button>
    </section>
  );
};

export default SignUp;
