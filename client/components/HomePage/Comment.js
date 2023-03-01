import React from 'react';

import { FcLikePlaceholder, FcLike } from 'react-icons/fc';
import { BsTrash } from 'react-icons/bs';

import './Comment.css';

const Comment = () => {
  //
  return (
    <div className="comment">
      <div className="comment__like-icon--container">
        <FcLikePlaceholder />
      </div>
      <div className="comment__main-info--container">
        <div className="comment__pic-n-username--container">
          <img
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
            alt=""
            className="comment__username-pic"
          />
          <p className="comment__username">username</p>
        </div>
        <p className="comment__comment">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum, minima
          quasi molestiae vitae obcaecati perspiciatis distinctio esse tenetur
          animi numquam voluptate laboriosam non assumenda quas ea similique
          consectetur facilis repudiandae!
        </p>
      </div>
      <div className="comment__delete-icon--container">
        <BsTrash />
      </div>
    </div>
  );
};

export default Comment;
