import React, { useContext, useEffect, useState } from 'react';

import logo from '../../assets/imgs/snowmies-logo-compressed.png';
import { FiEdit } from 'react-icons/fi';
import { FiSend } from 'react-icons/fi';
import './UserInfo.css';
import store from '../../context/store';

const UserInfo = () => {
  const [editDescription, setEditDescription] = useState(false);
  const [profileDescriptionText, setProfileDescriptionText] = useState(
    'Click the edit icon to update your profile description...'
  );
  const [username, setUsername] = useState('');

  const { resetStoreData, userData } = useContext(store);

  useEffect(() => {
    if (userData.data) {
      // console.log(userData.data);
      setUsername(userData.data.username);
    }
  }, [userData]);

  const logoutHandler = () => {
    resetStoreData();
  };

  const editDescriptionHandler = () => {
    setEditDescription((prev) => !prev);
  };

  const profileDescriptionTextChangeHandler = (e) => {
    setProfileDescriptionText(e.target.value);
  };

  const editDescriptionForm = (
    <textarea
      className="user-info__edit-description-form"
      value={profileDescriptionText}
      onChange={profileDescriptionTextChangeHandler}
      rows="4"
    ></textarea>
  );

  return (
    <div className="user-info">
      <div className="user-info__main-content--container">
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
          <h2 className="user-info__heading">Logged in as: {username}</h2>
          <div className="user-info__description--container">
            <div className="user-info__heading-n-icon--container">
              <h3 className="user-info__description--heading">
                Rider Description
              </h3>
              <div className="icon-container">
                {editDescription ? (
                  <FiSend
                    className="user-info__edit-icon"
                    onClick={editDescriptionHandler}
                  />
                ) : (
                  <FiEdit
                    className="user-info__edit-icon"
                    onClick={editDescriptionHandler}
                  />
                )}
              </div>
            </div>
            {editDescription ? (
              editDescriptionForm
            ) : (
              <p className="user-info__description--content">
                {/* Click the edit icon to update your profile description... */}
                {profileDescriptionText}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="home-page__img--container">
        <img src={logo} alt="Snowmies logo" className="home-page__img" />
      </div>
    </div>
  );
};

export default UserInfo;
