import React, { useEffect } from "react";
import Comment from "./Comment";
import { useDispatch, useSelector } from "react-redux";
import { getCommentsById } from "../actions/comment.action";
import './Comments.css'
const Comments = ({ videoId,totalComments }) => {
  const handleComment = () => {};
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCommentsById(videoId));
  }, [dispatch, videoId]);
  const comments = useSelector((state) => state.commentsList.comments);
  const _comments = comments?.map(
    (comment) => comment.snippet.topLevelComment.snippet
  );
  return (
    <div className="comments">
      <p>{totalComments}Comments</p>
      <div className="commemnt-form d-flex w-100 my-2">
        <img
          src="/Assets/avatar.png"
          alt=""
          height={55}
          className='mr-3 rounded-circle' 
        />
        <form onSubmit={handleComment} className="d-flex flex-grow-1">
          <input
            type="text"
            className="flex-grow-1 "
            placeholder="Write a comment..."
          />
          <button className="border-0 p-2">Comment</button>
        </form>
      </div>
      <div className="Comments-list">
        {_comments?.map((comment, index) => (
          <Comment comment={comment} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Comments;
