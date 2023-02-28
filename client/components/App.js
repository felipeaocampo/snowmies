import React, { useState } from 'react';
import BodyContainer from './containers/bodyContainer';
import ContentContainer from './containers/ContentContainer';
import Login from './login/Login';

import './App.css';

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
        </ContentContainer>
      </BodyContainer>
    </div>
  );
};

export default App;
