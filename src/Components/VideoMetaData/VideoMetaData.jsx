import moment from "moment";
import numeral from "numeral";
import React, { useEffect } from "react";
import { MdThumbDown, MdThumbUp } from "react-icons/md";
import "./VideoMetaData.css";
import ShowMoreText from "react-show-more-text";
import { useDispatch, useSelector } from "react-redux";
import { getChannelDetails } from "../../actions/ChannelAction";
import { Helmet } from "react-helmet";

const VideoMetaData = ({ video: { snippet, statistics }, videoId }) => {
  const { channelId, channelTitle, description, title, publishedAt } = snippet;
  const { viewCount, likeCount, dislikeCount } = statistics;

  const dispatch = useDispatch();

  const { channel } = useSelector((state) => state.channelDetails) ?? {};
  const { snippet: channelSnippet, statistics: channelStatistics } =
    channel ?? {};

  useEffect(() => {
    dispatch(getChannelDetails(channelId));
  }, [dispatch, channelId]);

  return (
    <>
      <Helmet>
        <title>{snippet?.title}</title>
      </Helmet>
      <div className="VideoMetaData py-2">
        <div className="videoMetaData-top">
          <h5>{title}</h5>
          <div className="py-1 d-flex justify-content-between align-items-center">
            <span>
              {numeral(viewCount).format("0.a")} Views •{" "}
              {moment(publishedAt).fromNow()}
            </span>

            <div>
              <span className="mr-3">
                <MdThumbUp size={26} /> {numeral(likeCount).format("0.a")}
              </span>
              <span className="mr-3">
                <MdThumbDown size={26} /> {numeral(dislikeCount).format("0.a")}
              </span>
            </div>
          </div>
        </div>
        <div className="videoMetaData-Channel py-3 my-2 d-flex justify-content-between align-items-center">
          <div className="d-flex">
            <img
              src={channelSnippet?.thumbnails?.default?.url}
              alt=""
              height={55}
              className="rounded-circle mr-3"
            />
            <div className="d-flex flex-column">
              <span>{channelTitle}</span>
              <span>
                {" "}
                {numeral(channelStatistics?.subscriberCount).format("0.a")}{" "}
                Subscribers
              </span>
            </div>
          </div>
          <button className={`p-2 m-2 border-0 btn btn-danger`}>
            Subscribe
          </button>
        </div>
        <div className="videoMetaData-description">
          <ShowMoreText
            lines={3}
            more="SHOW MORE"
            less="SHOW LESS"
            anchorClass="showMoreText"
            expanded={false}
          >
            {description}
          </ShowMoreText>
        </div>
      </div>
      /
    </>
  );
};

export default VideoMetaData;
