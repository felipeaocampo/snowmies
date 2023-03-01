import React from 'react';
import { RiSendPlane2Line } from 'react-icons/ri';

import './MtnFeed.css';
import Comment from './Comment';

const MtnFeed = () => {
  return (
    <div className="mtn-feed">
      <div className="mtn-feed__content-container">
        <div className="mtn-feed__heading-n-btn--container">
          <h2 className="mtn-feed__heading">Mtn Feed</h2>
          <button className="mtn-feed__reset-btn">Refresh Feed</button>
        </div>
        <div className="mtn-feed__comments--container">
          <Comment />
          <Comment />
          <Comment />
          <Comment />
        </div>
      </div>
      <div className="mtn-feed__enter-comment-container">
        <form
          action="/HOMEMTN/MTNFEEDCOMMENTS"
          className="mtn-feed__comment-form"
        >
          <textarea
            name="comment"
            className="mtn-feed__textarea"
            placeholder={`Let your snowmies know what's going down...`}
            wrap="soft"
            maxLength="300"
          ></textarea>
        </form>
        <div className="mtn-feed__enter-comment--icon-container">
          <RiSendPlane2Line className="mtn-feed__enter-comment--icon" />
        </div>
      </div>
    </div>
  );
};

export default MtnFeed;
