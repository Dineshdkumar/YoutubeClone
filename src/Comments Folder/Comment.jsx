import moment from "moment";
import React from "react";
import "./Comment.css";
const Comment = ({ comment }) => {
  const { authorDisplayName, authorProfileImageUrl, publishedAt, textDisplay } =
    comment;
  return (
    <div className="Comment d-flex p-2 ">
      <img
        src={authorProfileImageUrl}
        alt=""
        height={55}
        className="mr-4 rounded-circle"
      />
      <div className="Comment-body ">
        <p className="Comment-header mb-0">
          {authorDisplayName}
          .{moment(publishedAt).fromNow()}
        </p>
        <p className="mb-0  ">{textDisplay}</p>
      </div>
    </div>
  );
};

export default Comment;
