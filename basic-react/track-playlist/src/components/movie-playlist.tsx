import { createRandomMovie } from '../data';
import { useAppDispatch } from '../hooks/use-app-dispatch';
import { useTypedSelector } from '../hooks/use-typed-selector';
import { moviesActions } from '../store';

export default function MoviePlaylist() {
  const appDispatch = useAppDispatch();

  const moviePlaylist = useTypedSelector(state => state.movies);

  const handleMovieAdd = (movie: string) => {
    appDispatch(moviesActions.addMovie(movie));
  };
  const handleMovieRemove = (movie: string) => {
    appDispatch(moviesActions.removeMovie(movie));
  };

  const renderedMovies = moviePlaylist.map(movie => {
    return (
      <li key={movie}>
        {movie}
        <button
          onClick={() => handleMovieRemove(movie)}
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
        <h3 className="subtitle is-3">Movie Playlist</h3>
        <div className="buttons">
          <button
            onClick={() => handleMovieAdd(createRandomMovie())}
            className="button is-link"
          >
            + Add Movie to Playlist
          </button>
        </div>
      </div>
      <ul>{renderedMovies}</ul>
    </div>
  );
}
