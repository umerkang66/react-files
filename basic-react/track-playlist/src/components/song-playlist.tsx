import { createRandomSong } from '../data';
import { useTypedSelector } from '../hooks/use-typed-selector';
import { useAppDispatch } from '../hooks/use-app-dispatch';
import { songsActions } from '../store';

export default function SongPlaylist() {
  const appDispatch = useAppDispatch();

  const songPlaylist = useTypedSelector(state => state.songs);

  const handleSongAdd = (song: string) => {
    appDispatch(songsActions.addSong(song));
  };
  const handleSongRemove = (song: string) => {
    appDispatch(songsActions.removeSong(song));
  };

  const renderedSongs = songPlaylist.map(song => {
    return (
      <li key={song}>
        {song}
        <button
          onClick={() => handleSongRemove(song)}
          className="button is-danger"
        >
          X
        </button>
      </li>
    );
  });

  return (
    <div className="content">
      <div className="table-header">
        <h3 className="subtitle is-3">Song Playlist</h3>
        <div className="buttons">
          <button
            onClick={() => handleSongAdd(createRandomSong())}
            className="button is-link"
          >
            + Add Song to Playlist
          </button>
        </div>
      </div>
      <ul>{renderedSongs}</ul>
    </div>
  );
}
