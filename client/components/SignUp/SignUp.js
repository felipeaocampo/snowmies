import React from 'react';

import snowmiesTri from '../../assets/imgs/snowmies-tri-compressed.png';
import './SignUp.css';

const SignUp = () => {
  return (
    <section className="sign-up">
      <main className="sign-up__main-container">
        <div className="sign-up__form-container">
          <form action="/users/signup" method="POST" id="sign-up">
            <div className="form-item-container sign-up__form-item">
              <label htmlFor="sign-up-username">Add username:</label>
              <input
                type="text"
                id="sign-up-username"
                name="username"
                require
              />
            </div>
            <div className="form-item-container sign-up__form-item">
              <label htmlFor="sign-up-email">Add email:</label>
              <input type="email" id="sign-up-email" name="email" require />
            </div>
            <div className="form-item-container sign-up__form-item">
              <label htmlFor="sign-up-password">Add password:</label>
              <input type="password" id="sign-up-password" name="password" />
            </div>
            <div className="form-item-container sign-up__form-item">
              <label htmlFor="sign-up-confirm-password">
                Confirm password:
              </label>
              <input
                type="password"
                id="sign-up-confirm-password"
                name="confirm-password"
              />
            </div>
            <div className="form-item-container sign-up__form-item select-input">
              <label for="pet-select">Home mountain:</label>
              <select name="home-mtn" id="sign-up">
                <option value="">Select one</option>
                <option value="stevens">Stevens Pass - WA</option>
                <option value="crystal">Crystal - WA</option>
                <option value="whistler">Whistler - CA</option>
                <option value="baker">Mt. Baker - WA</option>
              </select>
            </div>
          </form>
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
