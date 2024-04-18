import React, { useEffect, useState } from "react";
import "./Video.css";
import { AiFillEye } from "react-icons/ai";
import request from "../../Api";
import moment from "moment";
import numeral from "numeral";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate } from "react-router-dom";

const Video = ({ video }) => {
  const {
    id,
    snippet: {
      channelId,
      channelTitle,
      title,
      publishedAt,
      thumbnails: { medium },
    },
  } = video;
  const _videoid = id?.videoId || id;

  useEffect(() => {
    const getVideoDetails = async () => {
      const {
        data: { items },
      } = await request("/videos", {
        params: {
          part: "contentDetails,statistics",
          id: _videoid,
        },
      });
      setDuration(items[0].contentDetails.duration);
      setViews(items[0].statistics.viewCount);
    };
    getVideoDetails();
  }, [_videoid]);

  useEffect(() => {
    const getChannelIcon = async () => {
      const {
        data: { items },
      } = await request("/channels", {
        params: {
          part: "snippet",
          id: channelId,
        },
      });
      setChannelIcon(items[0].snippet.thumbnails.default);
    };
    getChannelIcon();
  }, [channelId]);

  const [views, setViews] = useState(null);
  const [duration, setDuration] = useState(null);
  const [channelIcon, setChannelIcon] = useState(null);
  const seconds = moment.duration(duration).asSeconds();
  const _duration = moment.utc(seconds * 1000).format("mm:ss");

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/watch/${_videoid}`);
  };
  return (
    <>
      <div className="video" onClick={handleClick}>
        <div className="video-top">
          {/* <img src={medium.url} alt="" /> */}
          <LazyLoadImage src={medium.url} effect="blur" />
          <span className="video-duration">{_duration}</span>
        </div>
        <div className="video-title">{title}</div>
        <div className="video-details">
          <span>
            <AiFillEye />
            {numeral(views).format("0.a")} views .
          </span>
          <span>{moment(publishedAt).fromNow()}</span>
        </div>

        <div className="video-channel">
          {/* <img src={channelIcon?.url} alt="" /> */}
          <LazyLoadImage src={channelIcon?.url} effect="blur" />

          <p>{channelTitle}</p>
        </div>
      </div>
    </>
  );
};

export default Video;
