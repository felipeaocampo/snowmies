import React, { useContext, useState } from 'react';

import logo from '../../assets/imgs/snowmies-logo-compressed.png';
import { FiEdit } from 'react-icons/fi';
import './UserInfo.css';
import store from '../../context/store';

const UserInfo = () => {
  const [editDescription, setEditDescription] = useState(false);

  const { resetStoreData } = useContext(store);

  const logoutHandler = () => {
    resetStoreData();
  };

  const editDescriptionHandler = () => {
    setEditDescription((prev) => !prev);
  };

  const editDescriptionForm = (
    <textarea className="user-info__edit-description-form"></textarea>
  );

  return (
    <div className="user-info">
      <button className="user-info__logout-btn" onClick={logoutHandler}>
        Log out
      </button>
      <div className="user-info__profile-pic--container">
        <img
          className="user-info__profile-pic"
          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
          alt="User profile pic"
        />
      </div>
      <div className="user-info__info-container">
        <h2 className="user-info__heading">Logged in as: Username</h2>
        <div className="user-info__description--container">
          <div className="user-info__heading-n-icon--container">
            <h3 className="user-info__description--heading">
              Profile Description
            </h3>
            <div className="icon-container">
              <FiEdit
                className="user-info__edit-icon"
                onClick={editDescriptionHandler}
              />
            </div>
          </div>
          <p className="user-info__description--content">
            Click the edit icon to update your profile description...
          </p>
        </div>
      </div>
      <div className="home-page__img--container">
        <img src={logo} alt="Snowmies logo" className="home-page__img" />
      </div>
    </div>
  );
};

export default UserInfo;
