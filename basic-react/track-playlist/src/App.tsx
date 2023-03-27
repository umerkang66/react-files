import MoviePlaylist from './components/movie-playlist';
import SongPlaylist from './components/song-playlist';
import { useAppDispatch } from './hooks/use-app-dispatch';
import { reset } from './store';

export default function App() {
  const appDispatch = useAppDispatch();

  const handleResetClick = () => {
    appDispatch(reset());
  };

  return (
    <div className="container is-fluid">
      <button onClick={() => handleResetClick()} className="button is-danger">
        Reset Both Playlists
      </button>
      <hr />
      <MoviePlaylist />
      <hr />
      <SongPlaylist />
    </div>
  );
}
