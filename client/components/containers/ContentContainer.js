import React from 'react';

import './ContentContainer.css';

const ContentContainer = ({ active, children }) => {
  return (
    <main className={`content-container ${active ? 'logged-in' : ''}`}>
      {children}
    </main>
  );
};

export default ContentContainer;
