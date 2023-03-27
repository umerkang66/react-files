import React from 'react';
import { connect } from 'react-redux';

const SongDetail = ({ song }) => {
  if (!song) return <div>Select a Song</div>;

  return (
    <div>
      <h3>{song.title}</h3>
      <h4>{song.duration}</h4>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    song: state.selectedSong,
  };
};

export default connect(mapStateToProps)(SongDetail);
