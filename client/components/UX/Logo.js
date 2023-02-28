import React from 'react';

import logo from '../../assets/imgs/snowmies-logo-compressed.png';

const Logo = ({ styles }) => {
  return (
    <>
      <img className={styles} src={logo} />
    </>
  );
};

export default Logo;
