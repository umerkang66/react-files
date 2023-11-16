import { combineReducers } from 'redux';

const songReducer = () => {
  return [
    { title: 'Something just like this', duration: '4:05' },
    { title: 'Faded', duration: '3:25' },
    { title: 'Life goes on', duration: '3:45' },
    { title: 'Film out', duration: '3:15' },
  ];
};

const selectedSongReducer = (selectedSong = null, action) => {
  if (action.type === 'SONG_SELECTED') return action.payload;

  return selectedSong;
};

export default combineReducers({
  songs: songReducer,
  selectedSong: selectedSongReducer,
});
