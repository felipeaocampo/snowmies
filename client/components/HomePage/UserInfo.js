import React, { useContext, useEffect, useState, useCallback } from 'react';

import logo from '../../assets/imgs/snowmies-logo-compressed.png';
import { FiEdit } from 'react-icons/fi';
import { FiSend } from 'react-icons/fi';
import './UserInfo.css';
import store from '../../context/store';

const UserInfo = () => {
  const [editDescription, setEditDescription] = useState(false);
  const [profileDescriptionText, setProfileDescriptionText] = useState('');
  const [username, setUsername] = useState('');

  const { resetStoreData, userData, handleUserDataUpdate } = useContext(store);

  const sendPatchDescriptionRequest = useCallback(
    async (userId, description) => {
      const response = await fetch(
        `/api/users/${userId}/update-profile-description`,
        {
          method: 'PATCH',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({ profileDescription: description }),
        }
      );
      const data = await response.json();

      // const dataCorrectedFormat = {
      //   status: data.status,
      //   data: [data.data],
      // };
      // // console.log(`DATA AFTER PATCH `, data);
      // // console.log(`CORRECTED `, dataCorrectedFormat);
      // handleUserDataUpdate(dataCorrectedFormat);
    },
    []
  );

  useEffect(() => {
    if (userData.data) {
      // console.log(userData.data);
      setUsername(userData.data.username);
      setProfileDescriptionText(userData.data.profileDescription);
    }
  }, [userData]);

  const logoutHandler = () => {
    resetStoreData();
  };

  const toggleEditDescriptionHandler = () => {
    setEditDescription((prev) => !prev);
  };

  const profileDescriptionTextChangeHandler = (e) => {
    setProfileDescriptionText(e.target.value);
  };

  const submitAndToggleHandler = () => {
    const trimmedDescription = profileDescriptionText.trim();

    if (trimmedDescription !== '') {
      sendPatchDescriptionRequest(userData.data._id, profileDescriptionText);
    }
    toggleEditDescriptionHandler();
  };

  const editDescriptionForm = (
    <textarea
      className="user-info__edit-description-form"
      value={profileDescriptionText}
      onChange={profileDescriptionTextChangeHandler}
      rows="4"
      placeholder="Click the edit icon to update your profile description..."
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
          <h2 className="user-info__heading">
            Logged in as:{' '}
            <span className="user-info__heading--special">{username}</span>
          </h2>
          <div className="user-info__description--container">
            <div className="user-info__heading-n-icon--container">
              <h3 className="user-info__description--heading">
                Rider Description
              </h3>
              <div className="icon-container">
                {editDescription ? (
                  <FiSend
                    className="user-info__edit-icon"
                    onClick={submitAndToggleHandler}
                  />
                ) : (
                  <FiEdit
                    className="user-info__edit-icon"
                    onClick={toggleEditDescriptionHandler}
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
