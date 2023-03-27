import '../../sass/VideoItem.scss';
import React from 'react';

const VideoItem = ({ video, onVideoSelect }) => {
  // We can also use the other functions because there is not 'this' keyword involved but we are using arrow functions to keep the consistency
  const videoSelect = () => onVideoSelect(video);

  return (
    <div className="video-item item" onClick={videoSelect}>
      <img
        className="ui image"
        src={video.snippet.thumbnails.medium.url}
        alt={video.snippet.title}
      />
      <div className="content">
        <div className="header">
          <h3>{video.snippet.title}</h3>
        </div>
      </div>
    </div>
  );
};

export default VideoItem;
