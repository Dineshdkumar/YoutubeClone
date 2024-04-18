import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import VideoMetaData from "../../Components/VideoMetaData/VideoMetaData";
import VideoHorizontal from "../../Components/VideoHorizontal/VideoHorizontal";
import Comments from "../../Comments Folder/Comments";
import "./WatchScreen.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPopularVideos, getVideoById } from "../../actions/videos.action";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { Helmet } from "react-helmet";
const WatchScreen = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(getVideoById(id));
    dispatch(getPopularVideos());
  }, [dispatch, id]);
  //eslint-disable-next-line
  const { videos, loading: relativeLoading } = useSelector(
    (state) => state.homeVideos
  );

  const { video, loading } = useSelector((state) => state.selectedVideo);
  return (
    <div>
      <Helmet>
        <title>{video?.snippet?.title}</title>
      </Helmet>

      <Row className="">
        <Col lg={8}>
          <div className="WatchScreen-player">
            <iframe
              src={`https://www.youtube.com/embed/${id}`}
              frameBorder="0"
              title={video?.snippet?.title}
              allowFullScreen
              width="100%"
              height="100%"
            ></iframe>
          </div>
          {!loading ? (
            <VideoMetaData video={video} videoId={id} />
          ) : (
            <h6>Loading...</h6>
          )}
          <Comments
            videoId={id}
            totalComments={video?.statistics?.commentCount}
          />
        </Col>

        <Col lg={4}>
          {!loading ? (
            videos.map((video) => (
              <VideoHorizontal video={video} key={video.id.videoId} />
            ))
          ) : (
            <SkeletonTheme color="#343a40" highlightColor="#3c4147">
              <Skeleton width="100%" height="130px" count={15} />
            </SkeletonTheme>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default WatchScreen;
