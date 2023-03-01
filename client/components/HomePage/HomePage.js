import React from 'react';

import './HomePage.css';
import UserInfo from './UserInfo';
import MtnFeed from './MtnFeed';

const HomePage = () => {
  return (
    <section className="home-page">
      <UserInfo />
      <MtnFeed />
    </section>
  );
};

export default HomePage;
