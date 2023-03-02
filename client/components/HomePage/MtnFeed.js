import React, { useContext, useEffect, useState } from 'react';
import { RiSendPlane2Line } from 'react-icons/ri';

import './MtnFeed.css';
import Comment from './Comment';
import store from '../../context/store';

const MtnFeed = () => {
  const { mountainData, handleUserDataUpdate } = useContext(store);
  const [renderedComments, setRenderedComments] = useState([]);
  const [enteredComment, setEnteredComment] = useState('');

  const fetchData = useCallback(async (newCommentObj) => {
    const response = await fetch(`/api/mountains/${mtnId}/addcomment`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ comment: newCommentObj }),
    });
    const data = await response.json();

    handleUserDataUpdate(data);
  }, []);

  useEffect(() => {
    if (mountainData.data) {
      console.log(mountainData.data[0]);

      const mtnId = mountainData.data[0]._id;
      const newComments = mountainData.data[0].comments.map((comment) => {
        return (
          <Comment
            username={comment.username}
            content={comment.content}
            liked={comment.liked}
            date={comment.date}
            commentId={comment._id}
            mtnId={mtnId}
            key={comment._id}
          />
        );
      });
      setRenderedComments(newComments);
    }
  }, [mountainData]);

  return (
    <div className="mtn-feed">
      <div className="mtn-feed__content-container">
        <div className="mtn-feed__heading-n-btn--container">
          <h2 className="mtn-feed__heading">Mtn Feed</h2>
          <button className="mtn-feed__reset-btn">Refresh Feed</button>
        </div>
        <div className="mtn-feed__comments--container">{renderedComments}</div>
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
