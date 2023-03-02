import React, { useContext, useEffect, useState, useCallback } from 'react';
import { RiSendPlane2Line } from 'react-icons/ri';

import './MtnFeed.css';
import Comment from './Comment';
import store from '../../context/store';

const MtnFeed = () => {
  const { mountainData, userData, handleMountainDataUpdate } =
    useContext(store);
  const [renderedComments, setRenderedComments] = useState([]);
  const [enteredComment, setEnteredComment] = useState('');
  const [mountainName, setMountainName] = useState('');

  const postNewComment = useCallback(async (newCommentObj, mtnId) => {
    const response = await fetch(`/api/mountains/${mtnId}/addcomment`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ comment: newCommentObj }),
    });
    const data = await response.json();

    const dataCorrectedFormat = {
      status: data.status,
      data: [data.data],
    };

    handleMountainDataUpdate(dataCorrectedFormat);
  }, []);

  const getMountainDataById = useCallback(async (mtnId) => {
    const response = await fetch(`/api/mountains/id/${mtnId}`);
    const data = await response.json();

    const dataCorrectedFormat = {
      status: data.status,
      data: [data.data],
    };
    // console.log(`GOT DATA BY ID: `, data);
    handleMountainDataUpdate(dataCorrectedFormat);
  }, []);

  useEffect(() => {
    if (mountainData.data) {
      // console.log(mountainData.data[0]);

      const mtnId = mountainData.data[0]._id;
      const newComments = mountainData.data[0].comments
        .map((comment) => {
          let hideDelete = false;

          if (comment.username !== userData.data.username) {
            hideDelete = true;
          }

          return (
            <Comment
              username={comment.username}
              content={comment.content}
              liked={comment.liked}
              date={comment.date}
              commentId={comment._id}
              mtnId={mtnId}
              hideDelete={hideDelete}
              key={comment._id}
            />
          );
        })
        .reverse();
      setRenderedComments(newComments);
      setMountainName(mountainData.data[0].name);
    }
  }, [mountainData]);

  const newCommentSubmitHandler = (e) => {
    e.preventDefault();

    const newComment = {
      username: userData.data.username,
      content: enteredComment,
    };
    const mtnId = mountainData.data[0]._id;
    // console.log(`NEW COMMENT `, newComment);
    postNewComment(newComment, mtnId);
    setEnteredComment('');
  };

  const commentTextareaChangeHandler = (e) => {
    setEnteredComment(e.target.value);
  };

  const refreshClickHandler = () => {
    const mtnId = mountainData.data[0]._id;
    getMountainDataById(mtnId);
  };

  return (
    <div className="mtn-feed">
      <div className="mtn-feed__content-container">
        <div className="mtn-feed__heading-n-btn--container">
          <div className="mtn-feed__headings--container">
            <h2 className="mtn-feed__heading1">Mtn Feed</h2>
            <h3 className="mtn-feed__heading2">{`@${mountainName}`}</h3>
          </div>
          <button className="mtn-feed__reset-btn" onClick={refreshClickHandler}>
            Refresh Feed
          </button>
        </div>
        <div className="mtn-feed__comments--container">{renderedComments}</div>
      </div>
      <div className="mtn-feed__enter-comment-container">
        <form
          action="/HOMEMTN/MTNFEEDCOMMENTS"
          className="mtn-feed__comment-form"
          onSubmit={newCommentSubmitHandler}
          id="submit-new-comment"
        >
          <textarea
            name="comment"
            className="mtn-feed__textarea"
            placeholder={`Let your snowmies know what's going down...`}
            wrap="soft"
            maxLength="300"
            onChange={commentTextareaChangeHandler}
            value={enteredComment}
          ></textarea>
          <button type="submit" className="mtn-feed__submit-btn">
            <div className="mtn-feed__enter-comment--icon-container">
              <RiSendPlane2Line className="mtn-feed__enter-comment--icon" />
            </div>
          </button>
        </form>
      </div>
    </div>
  );
};

export default MtnFeed;
