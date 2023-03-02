import React, { useCallback, useContext } from 'react';

import { FcLikePlaceholder, FcLike } from 'react-icons/fc';
import { BsTrash } from 'react-icons/bs';

import './Comment.css';
import store from '../../context/store';

const Comment = ({ username, content, liked, date, commentId, mtnId }) => {
  console.log(liked);
  console.log(date);
  console.log(`COMMENT ID`, commentId);
  console.log(`MTN ID`, mtnId);

  const { handleUserDataUpdate } = useContext(store);

  const fetchData = useCallback(async (commentId) => {
    const response = await fetch(`/api/mountains/${mtnId}/liked`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ commentId }),
    });
    const data = await response.json();

    handleUserDataUpdate(data);
  }, []);

  return (
    <div className="comment">
      <div className="comment__icons--container">
        <div className="comment__like-icon--container">
          <FcLikePlaceholder />
        </div>
        <div className="comment__delete-icon--container">
          <BsTrash />
        </div>
      </div>
      <div className="comment__main-info--container">
        <div className="comment__pic-n-username--container">
          <img
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
            alt=""
            className="comment__username-pic"
          />
          <p className="comment__username">{username}</p>
        </div>
        <p className="comment__comment">{content}</p>
      </div>
    </div>
  );
};

export default Comment;
