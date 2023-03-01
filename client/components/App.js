import React, { useState, useContext } from 'react';

import store from '../context/store';
import BodyContainer from './containers/bodyContainer';
import ContentContainer from './containers/ContentContainer';
import Login from './login/Login';
import HomePage from './HomePage/HomePage';

import './App.css';
import SignUp from './Signup/SignUp';

const App = () => {
  const [showPic, setShowPic] = useState(true);
  const { userData, mountainData, signUpClicked } = useContext(store);

  const toggleHandler = () => {
    setShowPic(!showPic);
  };

  return (
    <div>
      <BodyContainer>
        <ContentContainer
          active={userData.status === `success`}
          togglePic={toggleHandler}
        >
          {!userData.status && !signUpClicked && <Login />}
          {userData.status && !signUpClicked && (
            <HomePage active={userData.status === `success`} />
          )}
          {userData.status !== `success` && signUpClicked ? <SignUp /> : null}
        </ContentContainer>
      </BodyContainer>
    </div>
  );
};

export default App;
