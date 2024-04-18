import React, { useEffect, useState } from "react";
import { AiFillEye } from "react-icons/ai";
import request from "../../Api";
import moment from "moment";
import numeral from "numeral";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Col, Row } from "react-bootstrap";
import "./VideoHorizontal.css";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
const VideoHorizontal = ({ video, searchScreen }) => {
  const {
    id,
    snippet: {
      channelId,
      channelTitle,
      description,
      title,
      publishedAt,
      thumbnails: { medium },
    },
  } = video;
  const _videoid = id?.videoId || id;
  const isVideo = !(id.kind === "youtube#channel");

  const [views, setViews] = useState(null);
  const [duration, setDuration] = useState(null);
  // eslint-disable-next-line
  const [channelIcon, setChannelIcon] = useState(null);
  const seconds = moment.duration(duration).asSeconds();
  const _duration = moment.utc(seconds * 1000).format("mm:ss");

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

  const navigate = useNavigate();
  const handleClick = () => {
    isVideo ? navigate(`/watch/${_videoid}`) : navigate(`/channel/${_videoid}`);
  };
  const thumbnail = !isVideo && "videoHorizontal-channelT";

  return (
    <>
      <Helmet>
        <title>{video?.snippet?.title}</title>  
      </Helmet>
      <Row
        className="videoHorizontal py-2 m-1 align-items-center"
        onClick={handleClick}
      >
        <Col xs={20} md={searchScreen ? 4 : 5} className="videoHorizontal-left">
          <LazyLoadImage
            src={medium.url}
            effect="blur"
            className={`videoHorizontal-thumbnail ${thumbnail} `}
            wrapperClassName="videoHorizontal-wrapper"
          />
          {isVideo && (
            <span className="videoHorizontal-duration ">{_duration}</span>
          )}
        </Col>
        <Col
          xs={25}
          md={searchScreen ? 8 : 7}
          videoHorizontal
          className="videoHorizontal-Right p-0"
        >
          <p className="videoHorizontal-title ">{title}</p>

          {isVideo && (
            <div className="videoHorizontal-details">
              <AiFillEye />
              {numeral(views).format("0.a")} views .
              {moment(publishedAt).fromNow()}
            </div>
          )}
          {searchScreen && (
            <p className="mt-1 videoHorizontal-desc">{description}</p>
          )}
          <div className="videoHorizontal-channel d-flex align-items-center my-1">
            {searchScreen && (
              <LazyLoadImage src={channelIcon?.url} effect="blur" />
            )}
            <p className="mb-0  videoHorizontal-channelName">{channelTitle}</p>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default VideoHorizontal;
