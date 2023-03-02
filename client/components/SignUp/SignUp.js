import React, { useContext } from 'react';

import snowmiesTri from '../../assets/imgs/snowmies-tri-compressed.png';
import store from '../../context/store';
import './SignUp.css';
import SignUpForm from './SignUpForm';

const SignUp = () => {
  const { setSignUpClicked } = useContext(store);

  const backToLoginHandler = () => {
    setSignUpClicked(false);
  };

  return (
    <section className="sign-up">
      <h2 className="sign-up__heading">Welcome to Snowmies!</h2>
      <main className="sign-up__main-container">
        <div className="sign-up__form-container">
          <SignUpForm />
        </div>
        <div className="sign-up__img-container">
          <img className="sign-up__img" src={snowmiesTri} alt="Snowmies logo" />
          <div className="sign-up__right-text--container">
            <p>
              Snow sports are AWESOME! You know what makes it more awesome
              though? <strong>Doing it with others.</strong>
            </p>
            <p>
              Although there’s so many people all over the world, Snowmies
              connects us with those who share our home mountain.
            </p>
            <p>
              Let’s get to it then and{' '}
              <span className="sign-up__special-text">sign up</span> so we can
              talk to our snowhomies!
            </p>
          </div>
        </div>
      </main>
      <button className="sign-up__btn" type="submit" form="sign-up">
        Sign Up!
      </button>
      <button className="sign-up__btn--go-back" onClick={backToLoginHandler}>
        back to login
      </button>
    </section>
  );
};

export default SignUp;
