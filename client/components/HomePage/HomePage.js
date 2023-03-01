import React from 'react';

import './HomePage.css';
import UserInfo from './UserInfo';
import MtnFeed from './MtnFeed';

const HomePage = ({ active }) => {
  return (
    <section className={`home-page ${active ? 'home-page__active' : ''} `}>
      <UserInfo />
      <MtnFeed />
    </section>
  );
};

export default HomePage;
