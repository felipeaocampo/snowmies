import React, { useCallback, useContext, useState } from 'react';

import { FcLikePlaceholder, FcLike } from 'react-icons/fc';
import { BsTrash } from 'react-icons/bs';

import './Comment.css';
import store from '../../context/store';

const Comment = ({
  username,
  content,
  liked,
  date,
  commentId,
  mtnId,
  hideDelete,
}) => {
  // console.log(date);
  // console.log(hideDelete);

  const { handleMountainDataUpdate } = useContext(store);

  const sendPatchCommentRequest = useCallback(async (commentId, endpoint) => {
    const response = await fetch(`/api/mountains/${mtnId}/${endpoint}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ commentId }),
    });
    const data = await response.json();

    const dataCorrectedFormat = {
      status: data.status,
      data: [data.data],
    };
    // console.log(`DATA AFTER LIKED `, data);
    // console.log(`CORRECTED `, dataCorrectedFormat);
    handleMountainDataUpdate(dataCorrectedFormat);
  }, []);

  const likeClickedHandler = () => {
    // MAKE PATCH CALL
    sendPatchCommentRequest(commentId, `liked`);
  };

  const trashClickedHandler = () => {
    //
    sendPatchCommentRequest(commentId, `deletecomment`);
  };

  return (
    <div className="comment">
      <div className="comment__icons--container">
        <div className="comment__like-icon--container">
          {liked ? (
            <FcLike onClick={likeClickedHandler} />
          ) : (
            <FcLikePlaceholder onClick={likeClickedHandler} />
          )}
        </div>
        {hideDelete ? null : (
          <div className="comment__delete-icon--container">
            <BsTrash onClick={trashClickedHandler} />
          </div>
        )}
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
