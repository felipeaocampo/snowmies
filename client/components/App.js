import React, { useState } from 'react';

import BodyContainer from './containers/bodyContainer';
import ContentContainer from './containers/ContentContainer';
import Login from './login/Login';
import HomePage from './HomePage/HomePage';

import './App.css';
import SignUp from './Signup/SignUp';

const App = () => {
  const [showPic, setShowPic] = useState(true);

  const toggleHandler = () => {
    // console.log(`click`);
    setShowPic(!showPic);
  };

  return (
    <div>
      <BodyContainer>
        <ContentContainer togglePic={toggleHandler}>
          <Login showPic={showPic} />
          {/* <SignUp /> */}
          {/* <HomePage /> */}
        </ContentContainer>
      </BodyContainer>
    </div>
  );
};

export default App;
