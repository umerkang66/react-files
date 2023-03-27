import React from 'react';

const VideoDetail = ({ video }) => {
  // If there is not video we have to return empty div
  if (!video) return <div>Loading...</div>;

  const { videoId } = video.id;
  const videoSrc = `https://www.youtube.com/embed/${videoId}`;

  return (
    <div>
      <div className="ui embed">
        <iframe title="video-player" src={videoSrc}></iframe>
      </div>
      <div className="ui segment">
        <h4 className="ui header">{video.snippet.title}</h4>
        <p>{video.snippet.description}</p>
      </div>
    </div>
  );
};

export default VideoDetail;
